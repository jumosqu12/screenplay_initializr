import { LIST_TYPE_DB, type DataBaseComand } from '../../utils';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';

export default function GenerateDb() {

     const initialValue: DataBaseComand = {
        type: "",
      };
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues: initialValue });
    
      const handleForm = async (formData: DataBaseComand) => {};

  return (
    <form
          className="mt-10  p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          
    
          <div className="mb-5 space-y-3">
            <label htmlFor="type" className="text-sm uppercase font-bold">
              Tipo de Base de Datos
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300"
              defaultValue={""}
              onChange={() => {}}
            >
              <option selected>--- Selecciona una opción ---</option>
              {
                LIST_TYPE_DB.map(db => (
                    <option key={db} value={db}>{db}</option>
                ))
            }
            </select>
            
            {errors.type && (
              <ErrorMessage>{errors.type.message}</ErrorMessage>
            )}
          </div>
    
          
    
          <input
            type="submit"
            value="Crear DATA BASE CONECTION"
            className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                        text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
  )
}
