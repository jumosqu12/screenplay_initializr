import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { LIST_TYPE_REST, type RestInterComand } from "../../utils";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createInteraction } from "@/services/ComandsApi";
import { toast } from "sonner";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import ShellCommandBox from "../preconfig/ShellComandBox";

export default function GenerateInteraction() {
  const initialValue: RestInterComand = {
    nameInteraction: "",
    typeInteraction: "",
  };
  const [requestName, setRequestName] = useState(false);
  const [typeInteraction, setTypeInteraction] = useState("");
  const [command, setCommand] = useState('Loding...');

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
      setCommand(data.command)
    },
  });

  const handleForm = async (formData: RestInterComand) => {
    formData.typeInteraction = typeInteraction;
    mutation.mutate(formData);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTypeInteraction(value);
    value === "GENERIC" ? setRequestName(true) : setRequestName(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center p-5">
        <ShellCommandBox command={command}/>

        <form
          className="mt-5 border-t border-gray-200"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="my-5 space-y-3">
            <label htmlFor="groupId" className="text-sm uppercase font-bold">
              Type interaction
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300"
              defaultValue={""}
              onChange={handleChange}
            >
              <option value="" selected>
                --- Choose value ---{" "}
              </option>
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
            <div className="my-5 space-y-3">
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
                  required: "The name interaction is required",
                })}
              />

              {errors.nameInteraction && (
                <ErrorMessage>{errors.nameInteraction.message}</ErrorMessage>
              )}
            </div>
          )}

          <div className="flex flex-col">
            {mutation.isPending ? (
              <ArrowPathIcon className="h-15 mt-5 text-gray-800 animate-spin" />
            ) : (
              <input
                type="submit"
                value="Create Interaction"
                className="w-full p-3 border border-gray-300 hover:bg-gray-800 hover:text-white uppercase font-bold cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
