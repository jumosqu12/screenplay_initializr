
import ListTask from "../components/ListTask"
import { LIST_TASK } from "../utils"
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";


export default function HomePageView() {
  
  const listTask = LIST_TASK;

  return (
    <div className='flex w-full max-w-6xl mx-auto'>
        <div 
          className='border-r border-gray-200 basis-1/5 flex flex-col gap-4 pr-5
          '>
         {
          listTask.map(taskList => (
           <ListTask 
              key={taskList.title} 
              task={taskList}/>
          ))
         }
        </div>
        <div className='basis-4/5'>
          <Outlet />
        </div>
        
        <Toaster richColors position="top-right" />
    </div>
  )
}
