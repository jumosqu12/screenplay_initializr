import { useForm } from "react-hook-form";
import { LIST_TYPE_PROJECTS, type ProjectComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";

export default function GenerateProject() {
  const initialValue: ProjectComand = {
    projectName: "",
    groupId: "",
    principalPackage: "",
    type: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: ProjectComand) => {};

  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
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
            required: "El GroupID del Proyecto es obligatorio",
          })}
        />

        {errors.groupId && (
          <ErrorMessage>{errors.groupId.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="principalPackage" className="text-sm uppercase font-bold">
          Nombre de paquete principal
        </label>
        <input
          id="principalPackage"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("principalPackage", {
            required: "El nombre del paquete principal del Proyecto es obligatorio",
          })}
        />

        {errors.principalPackage && (
          <ErrorMessage>{errors.principalPackage.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Tipo de proyecto
        </label>

        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={() => {}}
        >
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
            value="Crear Proyecto"
            className="bg-blue-500 hover:bg-blue-400 w-full p-3
                text-white uppercase font-bold cursor-pointer transition-colors"
          />
    </form>
  );
}
