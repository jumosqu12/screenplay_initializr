import { LIST_LANGUAGE, type CriticalComand, type CriticalRequest } from "../../utils";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllFeatures, getFoldersFeature } from "@/services/ComandsApi";
import ListCriticalRoot from "./ListCriticalRoot";

export default function GenerateCriticalRoot() {
  const initialValue: CriticalComand = {
    componentName: "",
    features: {
      featureName: "",
      folderName: "",
    },
    language: "",
  };

  const [select, setSelect] = useState({
    folder: "",
    features: "",
    language: "",
  });
  const [listComponent, setListComponent] = useState<CriticalRequest>({});

  const {
    data: listFolder,
    isError: foldersError,
    isLoading: loadFolders,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFoldersFeature,
    retry: false,
  });

  const {
    data: featuresList
  } = useQuery({
    queryKey: ["features", select.folder],
    queryFn: () => getAllFeatures(select.folder),
    enabled: !!select.folder,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: CriticalComand) => {
    setListComponent(
      {
        componentName: formData.componentName, 
        language: select.language, 
        features: [{featureName: select.features.replace(/\.feature$/, ""), folderName: select.folder }]
      }
    );
  };

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "folders") {
      setSelect({ ...select, folder: value });
    } else if (id === "features") {
      setSelect({ ...select, features: value });
    } else {
      setSelect({ ...select, language: value });
    }
  };

  if (listFolder)
    return (
      <form
        className="mt-10 p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div className="mb-5 space-y-3">
          <label
            htmlFor="componentName"
            className="text-sm uppercase font-bold"
          >
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
            id="folders"
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
            id="features"
            className="w-full p-3 bg-white border border-gray-300"
            defaultValue={""}
            onChange={handleSelect}
          >
            <option selected>--- Choose value ---</option>
            {featuresList?.files?.map((feature: string) => (
              <option key={feature} value={feature}> {feature}</option>
            ))}
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
            id="language"
            className="w-full p-3 bg-white border border-gray-300"
            defaultValue={""}
            onChange={handleSelect}
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
        

        <ListCriticalRoot listComponent={listComponent} />
      </form>
    );
}
