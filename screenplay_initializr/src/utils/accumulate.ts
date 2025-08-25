import type { CriticalRequest } from ".";

export function mergeFeatures(arr: CriticalRequest[]): CriticalRequest {
  return arr.reduce(
    (acc, curr) => {
      // Inicializar solo una vez
      if (!acc.componentName) {
        acc.componentName = curr.componentName;
        acc.language = curr.language;
        acc.features = [];
      }

      // Acumular features
      acc.features!.push(...(curr.features ?? []));

      return acc;
    },
    {} as CriticalRequest
  );
}