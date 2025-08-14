import { LIST_LANGUAGE, type CriticalComand } from "../../utils";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFeatures, getFoldersFeature } from "@/services/ComandsApi";
import { data } from "react-router-dom";

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

  const [folder, setFolders] = useState("")

  const queryClient = useQueryClient()
  
  const { data:listFolder, isError: foldersError, isLoading:loadFolders } = useQuery({
        queryKey: ['folders'],
        queryFn: getFoldersFeature,
        retry: false
  })

  const { data:featuresList, isError: featuresError, isLoading:loadfeatures } = useQuery({
        queryKey: ['features', folder],
        queryFn: () => getAllFeatures(folder),
        enabled: !!folder,
        retry: false
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: CriticalComand) => {};

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFolders(value)
  };

  if (listFolder) return (
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
          Features folder
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleSelect}
        >
           <option value="">--- Selecciona una opción ---</option>
          {loadFolders && <option disabled>Cargando...</option>}
          {foldersError && <option disabled>Error al cargar</option>}
          {listFolder.folders?.map((folder: string) => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))} 
        
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
          <option selected>--- Choose value ---</option>
          {
            featuresList?.files?.map((feature: string) => (
              <option value={feature}> {feature}</option>
            ))
          }
        </select>

        {errors.features && (
          <ErrorMessage>{errors.features.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="language" className="text-sm uppercase font-bold">
          Feature language
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={() => {}}
        >
          <option selected>--- Choose value ---</option>
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
        value="Create Critical Root"
        className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                    text-white uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
}
