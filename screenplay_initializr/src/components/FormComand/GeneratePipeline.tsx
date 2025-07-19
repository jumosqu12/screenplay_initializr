import { useForm } from "react-hook-form";
import { LIST_TYPE_PIPELINE, type PipelineComand } from "../../utils";
import ErrorMessage from "../ErrorMessage";


export default function GeneratePipeline() {

    const initialValue: PipelineComand = {
        name: "",
        type: ""
      };
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues: initialValue });
    
      const handleForm = async (formData: PipelineComand) => {};

  return (
    <form
          className="mt-10  p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label htmlFor="name" className="text-sm uppercase font-bold">
              Nombre de Pipeline
            </label>
            <input
              id="name"
              className="w-full p-3  border border-gray-200"
              type="text"
              {...register("name", {
                required: "El nombre del pipeline es obligatorio",
              })}
            />
    
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
    
          <div className="mb-5 space-y-3">
            <label htmlFor="type" className="text-sm uppercase font-bold">
              Tipo de Pipeline
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300"
              defaultValue={""}
              onChange={() => {}}
            >
              <option selected>--- Selecciona una opción ---</option>
              {LIST_TYPE_PIPELINE.map((pipeline) => (
                <option key={pipeline} value={pipeline}>
                  {pipeline}
                </option>
              ))}
            </select>
    
            {errors.type && (
              <ErrorMessage>{errors.type.message}</ErrorMessage>
            )}
          </div>
    
    
          <input
            type="submit"
            value="Crear Pipeline"
            className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
  )
}
