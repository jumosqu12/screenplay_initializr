import { useForm } from "react-hook-form";
import type { FeatureComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";

export default function GenerateFeature() {

    const initialValue: FeatureComand = {
        name: "",
        example: true,
        nameSubFolder: ""
      };
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues: initialValue });
    
      const handleForm = async (formData: FeatureComand) => {};

  return (
    <form
          className="mt-10  p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label htmlFor="name" className="text-sm uppercase font-bold">
              Nombre de Feature
            </label>
            <input
              id="name"
              className="w-full p-3  border border-gray-200"
              type="text"
              {...register("name", {
                required: "El nombre del feature es obligatorio",
              })}
            />
    
            {errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label htmlFor="groupId" className="text-sm uppercase font-bold">
              Esquemas de escenarios
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300"
              defaultValue={""}
              onChange={() => {}}
            >
                <option key='true' value='true'>
                  Crear examples
                </option>
                <option key='true' value='true'>
                  No crear examples
                </option>
            </select>
    
            {errors.example && (
              <ErrorMessage>{errors.example.message}</ErrorMessage>
            )}
          </div>
    
          <div className="mb-5 space-y-3">
            <label htmlFor="nameSubFolder" className="text-sm uppercase font-bold">
              Nombre de carpeta de features
            </label>
            <input
              id="nameSubFolder"
              className="w-full p-3  border border-gray-200"
              type="text"
              {...register("nameSubFolder", {
                required: "El nombre de la carpeta contenedora de feature es obligatorio",
              })}
            />
    
            {errors.nameSubFolder && (
              <ErrorMessage>{errors.nameSubFolder.message}</ErrorMessage>
            )}
          </div>

    
          <input
                type="submit"
                value="Crear Feature"
                className="bg-blue-500 hover:bg-blue-400 w-full p-3
                    text-white uppercase font-bold cursor-pointer transition-colors"
              />
        </form>
  )
}
