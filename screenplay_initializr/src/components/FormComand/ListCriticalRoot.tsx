import { createCritalRoot } from "@/services/ComandsApi";
import type { CriticalComand, Root } from "@/utils/index";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ListCriticalRootProps = {
  listComponent: CriticalComand[];
};

export default function ListCriticalRoot({
  listComponent,
}: ListCriticalRootProps) {
  const [roots, setRoots] = useState<CriticalComand[]>([]);

  const mutate = useMutation({
    mutationFn: createCritalRoot,
    onSuccess: (data) => {
        toast.success(data.message)
    },
    onError: (data) => {
        toast.error(data.message)
    }
  })

  useEffect(() => {
    if (listComponent && Array.isArray(listComponent)) {
      setRoots((prev) => [...prev, ...listComponent]);
    }
  }, [listComponent]);

  const deleteComponent = (index: number) => {
    setRoots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    mutate()
  }
 
  return (
    <div>
      <div className="flex gap-3 items-center">
        <input
          type="submit"
          value="Add critical Root"
          className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                    text-white uppercase font-bold cursor-pointer transition-colors"
        />

        {roots.length ? (
          <input
            type="button"
            value="Create Critical Root"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-400 w-full p-3
                                    text-white uppercase font-bold cursor-pointer transition-colors"
          />
        ):("")}
      </div>
      {roots.map((root, index) => (
        <div className="bg-blue-400 mt-3 p-2 flex justify-between text-white">
          <p>{root.componentName}</p>
          <span> - </span>
          <p>{root.features.folderName}</p>
          <span> - </span>
          <p>{root.features.featureName}</p>
          <div className="cursor-pointer">
            <XCircleIcon
              onClick={() => deleteComponent(index)}
              className="size-6 text-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
