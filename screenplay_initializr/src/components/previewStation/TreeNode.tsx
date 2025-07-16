import { useState } from "react";

export default function TreeNode({ node }: any) {
  const [open, setOpen] = useState(false);
  const isFile = node.type === "file";
  
  return (
    <li className="relative pl-6 text-[20px]">
      <div
        className={`cursor-pointer select-none flex items-center gap-1 ${
          isFile ? "" : "hover:font-medium"
        }`}
        onClick={() => !isFile && setOpen(!open)}
      >
        <span className="absolute left-3">
          {isFile ? "📄" : open ? "📂" : "📁"}
        </span>
        <p className="ml-4">{node.name}</p>
        
      </div>

      {!isFile && node.children && (
        <ul
          className={`pl-3 mt-1 relative space-y-1 ${
            open ? "block" : "hidden"
          }`}
        >
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
