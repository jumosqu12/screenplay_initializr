import { useForm } from "react-hook-form";
import { LIST_TYPE_REST, LIST_TYPE_TASK, type TaskComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

export default function GenerateTask() {
  const initialValue: TaskComand = {
    method: "",
    name: "",
    typeTask: "",
  };

  const [requestMethod, setRequestMethod] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: TaskComand) => {};

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "REST"
      ? setRequestMethod(true)
      : setRequestMethod(false);
  };

  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre de Task
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-200"
          type="text"
          {...register("name", {
            required: "El nombre de la clase Task es obligatorio",
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="typeTask" className="text-sm uppercase font-bold">
          Tipo de Task
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleChange}
        >
          <option selected>--- Selecciona una opción ---</option>
          {LIST_TYPE_TASK.map((task) => (
            <option key={task} value={task}>
              {task}
            </option>
          ))}
        </select>

        {errors.typeTask && (
          <ErrorMessage>{errors.typeTask.message}</ErrorMessage>
        )}
      </div>

      {requestMethod && (
        <div className="mb-5 space-y-3">
          <label htmlFor="method" className="text-sm uppercase font-bold">
            Tipo de Método REST
          </label>
          <select
            className="w-full p-3 bg-white border border-gray-300"
            defaultValue={""}
            onChange={handleChange}
          >
            {LIST_TYPE_REST.filter(
              (taskFilter) => taskFilter !== "GENERIC"
            ).map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>

          {errors.method && (
            <ErrorMessage>{errors.method.message}</ErrorMessage>
          )}
        </div>
      )}

      <input
        type="submit"
        value="Crear Interaction"
        className="bg-blue-500 hover:bg-blue-400 w-full p-3
                            text-white uppercase font-bold cursor-pointer transition-colors"
      />
    </form>
  );
}
