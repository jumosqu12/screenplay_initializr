import type { RunnerComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";

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

  const handleForm = async (formData: RunnerComand) => {};

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
            Nombre de Runner
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-200"
            type="text"
            {...register("name", {
              required:
                "El nombre de la clase runner es obligatorio",
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
            Nombre de la carpeta de Runners
          </label>
          <input
            id="folderName"
            className="w-full p-3  border border-gray-200"
            type="text"
            {...register("folderName", {
              required:
                "El nombre de la carpeta contenedora de Runners es obligatorio",
            })}
          />

          {errors.folderName && (
            <ErrorMessage>{errors.folderName.message}</ErrorMessage>
          )}
        </div>
      

      <input
        type="submit"
        value="Crear Interaction"
        className="bg-blue-500 hover:bg-blue-400 w-full p-3
                        text-white uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
}
