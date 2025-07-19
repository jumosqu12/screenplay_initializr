import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { LIST_TYPE_REST, type RestInterComand } from "../../utils";
import { useState } from "react";

export default function GenerateInteraction() {
  const initialValue: RestInterComand = {
    nameInteraction: "",
    typeInteraction: "",
  };
  const [requestName, setRequestName] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: RestInterComand) => {};

  const handleChange= async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'GENERIC' ? setRequestName(true):setRequestName(false)
  };

  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="groupId" className="text-sm uppercase font-bold">
          Tipo de interaction
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleChange}
        >
          {LIST_TYPE_REST.map((rest) => (
            <option key={rest} value={rest}>
              {rest}
            </option>
          ))}
        </select>

        {errors.typeInteraction && (
          <ErrorMessage>{errors.typeInteraction.message}</ErrorMessage>
        )}
      </div>

      {requestName && (
        <div className="mb-5 space-y-3">
          <label
            htmlFor="nameInteraction"
            className="text-sm uppercase font-bold"
          >
            Nombre de Interaction
          </label>
          <input
            id="nameInteraction"
            className="w-full p-3  border border-gray-200"
            type="text"
            {...register("nameInteraction", {
              required:
                "El nombre de la carpeta contenedora de feature es obligatorio",
            })}
          />

          {errors.nameInteraction && (
            <ErrorMessage>{errors.nameInteraction.message}</ErrorMessage>
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
