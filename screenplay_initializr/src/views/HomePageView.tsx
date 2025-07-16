import FolderTree from "../components/previewStation/FolderTree";
import FormConfigurateComand from "../components/FormComand/FormConfigurateComand";
import ListTask from "../components/ListTask"
import { LIST_TASK } from "../utils"


export default function HomePageView() {
  
  const listTask = LIST_TASK;

  return (
    <div className='grid grid-cols-12 gap-4 '>
        <div 
          className='border border-gray-300 col-span-2 rounded-md p-5 flex flex-col gap-4
          '>
         {
          listTask.map(taskList => (
           <ListTask 
              key={taskList.title} 
              task={taskList}/>
          ))
         }
        </div>
        <div className='border border-gray-300 col-span-5 rounded-md '>
          <FormConfigurateComand/>
        </div>
        <div className='border border-gray-300 col-span-5 rounded-md '>
          <FolderTree />
        </div>
    </div>
  )
}
