import { useForm } from "react-hook-form";
import type { FeatureComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createFeature } from "@/services/ComandsApi";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function GenerateFeature() {
  const [select, setSelect] = useState("");
  const initialValue: FeatureComand = {
    name: "",
    examples: "",
    nameSubFolder: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const mutation = useMutation({
    mutationFn: createFeature,
    onError: (error) => {
      if (Array.isArray(error)) {
        error.forEach((err: any) => {
          toast.error(err.msg);
        });
      }
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  const handleForm = async (formData: FeatureComand) => {
    formData.examples = select;
    mutation.mutate(formData);
  };

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Feature Name
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("name", {
            required: "The feature name is required",
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="groupId" className="text-sm uppercase font-bold">
          Scenario Outline
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleSelect}
        >
          <option value="">--- Choose Value ---</option>
          <option key="true" value="true">
            Yes
          </option>
          <option key="false" value="false">
            No
          </option>
        </select>

        {errors.examples && (
          <ErrorMessage>{errors.examples.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="nameSubFolder" className="text-sm uppercase font-bold">
          Feature folder name
        </label>
        <input
          id="nameSubFolder"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("nameSubFolder", {
            required: "The name feature folder is required",
          })}
        />

        {errors.nameSubFolder && (
          <ErrorMessage>{errors.nameSubFolder.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col">
        {mutation.isPending ? (
          <ArrowPathIcon className="h-15 mt-5 text-gray-800 animate-spin" />
        ) : (
          <input
            type="submit"
            value="Create Feature"
            className="w-full p-3 border border-gray-300 hover:bg-gray-800 hover:text-white uppercase font-bold cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg"
          />
        )}
      </div>
    </form>
  );
}
