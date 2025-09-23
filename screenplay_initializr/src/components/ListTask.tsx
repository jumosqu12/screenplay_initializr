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
               rounded-3xl p-2 border border-gray-300 
               hover:bg-gray-800 cursor-pointertransition 
               transform duration-200 hover:scale-105 hover:shadow-lg">
        <img src={task.icon + ".svg"} className="w-10 " />
        <p className="text-center text-xs font-bold ">
          Generate <span>{task.title}</span>
        </p>
      </Link>
    </>
  );
}
