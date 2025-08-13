import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { LIST_TYPE_REST, type RestInterComand } from "../../utils";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createInteraction } from "@/services/ComandsApi";
import { toast } from "sonner";

export default function GenerateInteraction() {
  const initialValue: RestInterComand = {
    nameInteraction: "",
    typeInteraction: "",
  };
  const [requestName, setRequestName] = useState(false);
  const [typeInteraction, setTypeInteraction] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const mutation = useMutation({
    mutationFn: createInteraction,
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

  const handleForm = async (formData: RestInterComand) => {
    formData.typeInteraction = typeInteraction
    mutation.mutate(formData);
  };

  const handleChange= async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setTypeInteraction(value)
    value === 'GENERIC' ? setRequestName(true):setRequestName(false)
  };


  return (
    <form
      className="mt-10  p-10 rounded-lg"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-5 space-y-3">
        <label htmlFor="groupId" className="text-sm uppercase font-bold">
          Type interaction
        </label>
        <select
          className="w-full p-3 bg-white border border-gray-300"
          defaultValue={""}
          onChange={handleChange}
        >
          <option value="" selected>--- Choose value --- </option>
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
            Interaction Name
          </label>
          <input
            id="nameInteraction"
            className="w-full p-3  border border-gray-200"
            type="text"
            {...register("nameInteraction", {
              required:
                "The name interaction is required",
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
