import { Link } from "react-router-dom";
import type { Task } from "../utils";

type ListTaskProps = {
    task: Task 
}

export default function ListTask({task}: ListTaskProps ) {
  return (
    <>
      <Link to={`${task.to}`}
        className="flex flex-col items-center   
               rounded-3xl p-2 bg-gray-light hover:bg-gray-300 cursor-pointer" >
        <img src={task.icon + ".png"} alt="" className="w-10" />
        <p className="text-center text-xs">
          Generate <span>{task.title}</span>
        </p>
      </Link>
    </>
  );
}
