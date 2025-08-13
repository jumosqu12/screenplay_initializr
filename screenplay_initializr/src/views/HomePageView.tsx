import FolderTree from "../components/previewStation/FolderTree";
import ListTask from "../components/ListTask"
import { LIST_TASK } from "../utils"
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";


export default function HomePageView() {
  
  const listTask = LIST_TASK;

  return (
    <div className='flex flex-row gap-5'>
        <div 
          className='basis-1/5 border border-gray-300 rounded-md p-5 flex flex-col gap-4
          '>
         {
          listTask.map(taskList => (
           <ListTask 
              key={taskList.title} 
              task={taskList}/>
          ))
         }
        </div>
        <div className='basis-1/2 border border-gray-300 col-span-5 rounded-md '>
          <Outlet />
        </div>
        <div className='basis-1/2 border border-gray-300 col-span-5 rounded-md '>
          <FolderTree />
        </div>
        <Toaster richColors position="top-right" />
    </div>
  )
}
