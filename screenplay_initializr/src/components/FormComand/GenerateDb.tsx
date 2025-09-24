import { LIST_TYPE_DB, type DataBaseComand } from "../../utils";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createDataBase } from "@/services/ComandsApi";
import { toast } from "sonner";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import ShellCommandBox from "../preconfig/ShellComandBox";

export default function GenerateDb() {
  const initialValue: DataBaseComand = {
    type: "",
  };

  const [typedDb, setTypeDb] = useState("");
  const [command, setCommand] = useState('Loding...');

  const mutation = useMutation({
    mutationFn: createDataBase,
    onSuccess: (data) => {
      toast.success(data.message);
      setCommand(data.command)
    },
    onError: (errors) => {
      if (Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err.msg));
      }
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const handleForm = async (formData: DataBaseComand) => {
    formData.type = typedDb;
    mutation.mutate(formData);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeDb(e.target.value);
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
            <label htmlFor="type" className="text-sm uppercase font-bold">
              Type data base
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300"
              defaultValue={""}
              onChange={handleSelect}
            >
              <option selected>--- Choose Option ---</option>
              {LIST_TYPE_DB.map((db) => (
                <option key={db} value={db}>
                  {db}
                </option>
              ))}
            </select>

            {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
          </div>

          <div className="flex flex-col">
            {mutation.isPending ? (
              <ArrowPathIcon className="h-15 mt-5 text-gray-800 animate-spin" />
            ) : (
              <input
                type="submit"
                value="Create DATA BASE CONECTION"
                className="w-full p-3 border border-gray-300 hover:bg-gray-800 hover:text-white uppercase font-bold cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
