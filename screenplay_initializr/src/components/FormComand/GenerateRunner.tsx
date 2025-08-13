import { createRunners } from "@/services/ComandsApi";
import type { RunnerComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function GenerateRunner() {
  
  const initialValue: RunnerComand = {
    folderName: "",
    name: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });
  
  const mutation = useMutation({
    mutationFn: createRunners,
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

  const handleForm = async (formData: RunnerComand) => {
    mutation.mutate(formData);
  };

  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
          <label
            htmlFor="name"
            className="text-sm uppercase font-bold"
          >
            Runner Name
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-200"
            type="text"
            {...register("name", {
              required:
                "The class name is required",
            })}
          />

          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

      
        <div className="mb-5 space-y-3">
          <label
            htmlFor="folderName"
            className="text-sm uppercase font-bold"
          >
            Runner Folder name
          </label>
          <input
            id="folderName"
            className="w-full p-3  border border-gray-200"
            type="text"
            {...register("folderName", {
              required:
                "The name runner folder is required",
            })}
          />

          {errors.folderName && (
            <ErrorMessage>{errors.folderName.message}</ErrorMessage>
          )}
        </div>
      

      <input
        type="submit"
        value="Create Runner"
        className="bg-blue-500 hover:bg-blue-400 w-full p-3
                        text-white uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
}
