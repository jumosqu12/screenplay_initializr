import { useForm } from "react-hook-form";
import { LIST_TYPE_PIPELINE, type PipelineComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createPipeline } from "@/services/ComandsApi";
import { toast } from "sonner";
import { useState } from "react";

export default function GeneratePipeline() {
  const initialValue: PipelineComand = {
    name: "",
    type: "",
  };
  const [type, setType] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const mutation = useMutation({
    mutationFn: createPipeline,
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

  const handleForm = async (formData: PipelineComand) => {
    formData.type = type
    mutation.mutate(formData);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setType(value)
  };

  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Pipeline name
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("name", {
            required: "The pipeline name is required",
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="type" className="text-sm uppercase font-bold">
          Pipeline Type
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleChange}
        >
          <option selected>--- Choose value ---</option>
          {LIST_TYPE_PIPELINE.map((pipeline) => (
            <option key={pipeline} value={pipeline}>
              {pipeline}
            </option>
          ))}
        </select>

        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </div>

      <input
        type="submit"
        value="Create Pipeline"
        className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                text-white uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
}
