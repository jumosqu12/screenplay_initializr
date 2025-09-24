import { createCritalRoot } from "@/services/ComandsApi";
import { mergeFeatures } from "@/utils/accumulate";
import type { CriticalRequest } from "@/utils/index";
import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ListCriticalRootProps = {
  listComponent: CriticalRequest;
  setCommand: React.Dispatch<React.SetStateAction<string>>
};

export default function ListCriticalRoot({
  listComponent, setCommand
}: ListCriticalRootProps) {
  const [roots, setRoots] = useState<CriticalRequest[]>([]);

  const mutation = useMutation({
    mutationFn: createCritalRoot,
    onSuccess: (data) => {
      toast.success(data.message);
      setCommand(data.command)
    },
    onError: (errors) => {
      if (Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err.msg));
      }
    },
  });

  useEffect(() => {
    if (listComponent && Object.keys(listComponent).length > 0) {
      setRoots((prev) => [...prev, listComponent]);
    }
  }, [listComponent]);

  const deleteComponent = (index: number) => {
    setRoots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const data = mergeFeatures(roots);
    mutation.mutate(data);
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <input
          type="submit"
          value="Add critical Root"
          className="w-full p-3 border border-gray-300 hover:bg-gray-800 hover:text-white uppercase font-bold cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg"
        />

        {roots.length ? (
          <>
            <div className="flex flex-col">
              {mutation.isPending ? (
                <ArrowPathIcon className="h-15 mt-5 text-gray-800 animate-spin" />
              ) : (
                <input
                  type="button"
                  value="Create Critical Root"
                  onClick={handleSubmit}
                  className="w-full p-3 border border-gray-300 hover:bg-gray-800 hover:text-white uppercase font-bold cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg"
                />
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {roots.map((root, index) => (
        <div className="bg-gray-800 mt-3 p-2 flex justify-between text-white">
          <p>{root.componentName}</p>
          <span> - </span>
          {root.features?.map((files) => (
            <>
              <p key={files.folderName}>{files.folderName}</p>
              <span> - </span>
              <p key={files.featureName}>{files.featureName}</p>
            </>
          ))}
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
