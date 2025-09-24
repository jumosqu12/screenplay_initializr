import { useForm } from "react-hook-form";
import { LIST_TYPE_REST, LIST_TYPE_TASK, type TaskComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { createTask } from "@/services/ComandsApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import ShellCommandBox from "../preconfig/ShellComandBox";

export default function GenerateTask() {
  const initialValue: TaskComand = {
    method: "",
    name: "",
    typeTask: "",
  };

  const [requestMethod, setRequestMethod] = useState(false);
  const [typeTask, setTypeTask] = useState({ typeTask: "", typeMethod: "" });
  const [command, setCommand] = useState('Loding...');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const mutation = useMutation({
    mutationFn: createTask,
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

  const handleForm = async (formData: TaskComand) => {
    formData.typeTask = typeTask.typeTask;
    formData.method = typeTask.typeMethod;
    mutation.mutate(formData);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (e.target.id === "typeTask") {
      setTypeTask({ typeTask: value, typeMethod: "" });
      value === "REST" ? setRequestMethod(true) : setRequestMethod(false);
    } else {
      setTypeTask({ ...typeTask, typeMethod: value });
    }
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
            <label htmlFor="name" className="text-sm uppercase font-bold">
              Task Name
            </label>
            <input
              id="name"
              className="w-full p-3  border border-gray-200"
              type="text"
              {...register("name", {
                required: "Task name is required",
              })}
            />

            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="my-5 space-y-3">
            <label htmlFor="typeTask" className="text-sm uppercase font-bold">
              Type of Task
            </label>
            <select
              id="typeTask"
              className="w-full p-3 bg-white border border-gray-300"
              defaultValue={""}
              onChange={handleChange}
            >
              <option selected>--- Choose value ---</option>
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
            <div className="my-5 space-y-3">
              <label htmlFor="method" className="text-sm uppercase font-bold">
                Rest method Type
              </label>
              <select
                id="method"
                className="w-full p-3 bg-white border border-gray-300"
                defaultValue={""}
                onChange={handleChange}
              >
                <option value="">--- Choose value ---</option>
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

          <div className="flex flex-col">
            {mutation.isPending ? (
              <ArrowPathIcon className="h-15 mt-5 text-gray-800 animate-spin" />
            ) : (
              <input
                type="submit"
                value="Create Task"
                className="w-full p-3 border border-gray-300 hover:bg-gray-800 hover:text-white uppercase font-bold cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
