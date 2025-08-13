import { useForm } from "react-hook-form";
import { LIST_TYPE_PROJECTS, type ProjectComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProject } from "@/services/ComandsApi";
import { useState } from "react";

export default function GenerateProject() {
  const initialValue: ProjectComand = {
    projectName: "",
    groupId: "",
    principalPackage: "",
    type: "",
  };

  const [select, setSelect] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      if (Array.isArray(error)) {
        error.forEach((err: any) => {
          toast.error(err.msg)
        })
        
      }
    },
    onSuccess(data) {
      toast.success(data.message)
    }
  })

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelect(e.target.value)
  };

  const handleForm = async (formData: ProjectComand) => {
    formData.type = select
    mutation.mutate(formData)
  };

  return (
    <form
      className="mt-5 px-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Project Name
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("projectName", {
            required: "The project name is required",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>
      <div className="mb-5 space-y-3">
        <label htmlFor="groupId" className="text-sm uppercase font-bold">
          Group ID
        </label>
        <input
          id="groupId"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("groupId", {
            required: "The project GroupID is required",
          })}
        />

        {errors.groupId && (
          <ErrorMessage>{errors.groupId.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="principalPackage" className="text-sm uppercase font-bold">
          Main package name
        </label>
        <input
          id="principalPackage"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("principalPackage", {
            required: "The main project package name is required",
          })}
        />

        {errors.principalPackage && (
          <ErrorMessage>{errors.principalPackage.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Type project
        </label>

        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleSelect}
        >
          <option value="" selected>--- Choose Value ---</option>
          {Object.entries(LIST_TYPE_PROJECTS).map(([key, value]) => (
            <option key={key} value={key}>
              {" "}
              {value}{" "}
            </option>
          ))}
        </select>

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <input
            type="submit"
            value="Create Project"
            className="bg-blue-500 hover:bg-blue-400 w-full p-3
                text-white uppercase font-bold cursor-pointer transition-colors"
          />
    </form>
  );
}
