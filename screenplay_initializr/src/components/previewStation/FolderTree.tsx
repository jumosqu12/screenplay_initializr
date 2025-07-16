import TreeNode from "./TreeNode";

export default function FolderTree() {
  // Estructura del árbol
  const folderData = [
    {
      name: "NameProject",
      children: [
        {
          name: "src",
          children: [
            {
              name: "main",
              type: "folder",
              children: [
                {
                  name: "java",
                  type: "folder",
                  children: [
                    {
                      name: "co",
                      type: "folder",
                      children: [
                        {
                          name: "com",
                          type: "folder",
                          children: [
                            {
                              name: "bancolombia",
                              type: "folder",
                              children: [
                                {
                                  name: "certificacion",
                                  type: "folder",
                                  children: [
                                    {
                                      name: "paquete",
                                      type: "folder",
                                      children: [
                                        {
                                          name: "exceptions",
                                          type: "folder",
                                          children: [{ name: "foto.jpg", type: "file" }],
                                        },
                                        {
                                          name: "integration",
                                          type: "folder",
                                        },
                                        {
                                          name: "interactions",
                                          type: "folder",
                                        },
                                        {
                                          name: "models",
                                          type: "folder",
                                        },
                                        {
                                          name: "question",
                                          type: "folder",
                                        },
                                        {
                                          name: "task",
                                          type: "folder",
                                        },
                                        {
                                          name: "userInterface",
                                          type: "folder",
                                        },
                                        {
                                          name: "utils",
                                          type: "folder",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Test",
          children: [{ name: "foto.jpg", type: "file" }],
        },
      ],
    },
    {
      name: "Descargas",
      children: [{ name: "instalador.exe", type: "file" }],
    },
    {
      name: "Música",
      children: [{ name: "cancion.mp3", type: "file" }],
    },
  ];

  return (
    <div className="max-w absolute">
      <ul className="tree relative pl-3 space-y-1">
        {folderData.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </ul>
    </div>
  );
}
