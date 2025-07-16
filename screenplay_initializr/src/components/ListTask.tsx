import type { Task } from "../utils";

type ListTaskProps = {
    task: Task 
}

export default function ListTask({task}: ListTaskProps ) {
  return (
    <>
      <div
        className="flex flex-col items-center  
               rounded-3xl p-5 bg-gray-light hover:bg-gray-300 cursor-pointer">
        <img src={task.icon + ".png"} alt="" className="w-12" />
        <p className="text-center">
          Generate <span>{task.title}</span>
        </p>
      </div>
    </>
  );
}
