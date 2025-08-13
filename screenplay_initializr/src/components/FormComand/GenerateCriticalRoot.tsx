import { LIST_LANGUAGE, type CriticalComand } from "../../utils";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFoldersFeature } from "@/services/ComandsApi";

export default function GenerateCriticalRoot() {
  const initialValue: CriticalComand = {
    componentName: "",
    features: [
      {
        featureName: "",
        folderName: "",
      },
    ],
    language: "",
  };

  const [localFolders, setLocalFolders] = useState()

  const { data, isError, isLoading } = useQuery({
        queryKey: ['folders'],
        queryFn: () => getFoldersFeature,
        retry: false
    })
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: CriticalComand) => {};
  return (
    <form
      className="mt-10 p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="componentName" className="text-sm uppercase font-bold">
          Component name
        </label>
        <input
          id="componentName"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("componentName", {
            required: "The component name is required",
          })}
        />

        {errors.componentName && (
          <ErrorMessage>{errors.componentName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="folderName" className="text-sm uppercase font-bold">
          Carpeta de Features
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={() => {}}
        >
          <option selected>--- Selecciona una opción ---</option>
        </select>

        {errors.features && (
          <ErrorMessage>{errors.features.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="featureName" className="text-sm uppercase font-bold">
          Features
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={() => {}}
        >
          <option selected>--- Selecciona una opción ---</option>
        </select>

        {errors.features && (
          <ErrorMessage>{errors.features.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="language" className="text-sm uppercase font-bold">
          idioma de los Features
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={() => {}}
        >
          <option selected>--- Selecciona una opción ---</option>
          {Object.entries(LIST_LANGUAGE).map(([key, value]) => (
            <option key={key} value={key}>
              {" "}
              {value}{" "}
            </option>
          ))}
        </select>

        {errors.language && (
          <ErrorMessage>{errors.language.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Crear Pipeline"
        className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                    text-white uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
}
