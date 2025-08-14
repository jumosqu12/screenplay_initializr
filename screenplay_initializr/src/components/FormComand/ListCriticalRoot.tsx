import type { Root } from "@/utils/index"
import { XCircleIcon } from "@heroicons/react/16/solid"
import { useState } from "react"


export default function ListCriticalRoot() {

    const [roots , setRoots] = useState<Root[]>([
        {
            component: "df",
            folder: "ewfr",
            feature: "trgrtgt"
        },
        {
            component: "fwew",
            folder: "grttg",
            feature: "sdscfv"
        }
    ])


  return (
    <div>
        {
           roots.map(root => (
            <div className="bg-blue-400 mt-3 p-2 flex justify-between text-white">
                <p>{root.component} </p>
                <span> - </span>
                <p>{root.folder}</p>
                <span> - </span>
                <p>{root.feature}</p>
                <div className="cursor-pointer" >
                   <XCircleIcon className="size-6 text-white" />
                </div>
            </div>
            
           ))
        }
    </div>
  )
}
