import { Router } from "express";
import { ComandController } from "../controllers/ComandController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

// Tipos válidos
const projectTypes = ["REST", "UX"];
const taskAllowedMethod = ["GET", "POST", "PUT", "PATCH", "OPTIONS", "GENERIC"];
const dbAllowedType = ["MYSQL", "POSTGRESQL", "ORACLE", "SQLSERVER", "AS400"];
const pipelineAllowedType = ["AZURE"];
const criticalRootLanAllowed = ["ES", "EN"];

router.post(
  "/createProject",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio")
    .matches(/^[a-zA-Z_-]+$/)
    .withMessage("projectName solo puede contener letras sin espacios"),

  body("groupId")
    .notEmpty()
    .withMessage("groupId es requerido")
    .matches(/^[a-zA-Z]+(\.[a-zA-Z]+)*$/)
    .withMessage("groupId solo puede contener letras y puntos"),

  body("principalPackage")
    .notEmpty()
    .withMessage("principalPackage es requerido")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("principalPackage solo puede contener letras sin espacios"),

  body("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type es requerido")
    .isIn(projectTypes)
    .withMessage(`type debe ser uno de: ${projectTypes.join(", ")}`),
  handleInputErrors,
  ComandController.createProject
);

router.post(
  "/createFeature",
  body("name")
    .notEmpty()
    .withMessage("El nombre del feature es obligatorio")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Name no puede contener caracteres especiales"),

  body("nameSubFolder")
    .notEmpty()
    .withMessage("nameSubFolder es requerido")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("nameSubFolder puede contener caracteres especiales"),

  body("examples")
    .notEmpty()
    .withMessage("examples es requerido")
    .isBoolean()
    .withMessage("examples solo puede ser True o False"),
  handleInputErrors,
  ComandController.createFeature
);

router.post(
  "/createRunners",
  body("name")
    .notEmpty()
    .withMessage("El nombre del runner es obligatorio")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Name no puede contener caracteres especiales"),

  body("folderName")
    .notEmpty()
    .withMessage("nameSubFolder es requerido")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("nameSubFolder puede contener caracteres especiales"),

  handleInputErrors,
  ComandController.createRunners
);

router.post(
  "/createInteraction",
  body("typeInteraction")
    .toUpperCase()
    .notEmpty()
    .withMessage("El tipo de interaction es obligatorio")
    .isIn(taskAllowedMethod)
    .withMessage("El tipo de interaction no es valido"),

  body("nameInteraction")
    .custom((value: string, { req }) => {
    const isGeneric = req.body.typeInteraction?.toUpperCase() === "GENERIC";

    // Si NO es GENERIC y nameInteraction no se envía o viene vacío → válido
    if (!isGeneric) {
      return true;
    }

    // Si es GENERIC, validar que no esté vacío
    if (!value || value.trim().length === 0) {
      throw new Error("Se requiere el nombre de la interaction");
    }

    // Validar solo letras
    if (!/^[a-zA-Z]+$/.test(value)) {
      throw new Error("El nombre no puede contener caracteres especiales");
    }

    return true;
    }),

  handleInputErrors,
  ComandController.createRestInteraction
);

router.post(
  "/createTask",
  body("name")
    .notEmpty()
    .withMessage("El nombre de task es obligatorio")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("El nombre no puede contener caracteres especiales"),

  body("typeTask")
    .toUpperCase()
    .notEmpty()
    .withMessage("typeTask es requerido")
    .isIn(projectTypes)
    .withMessage("El tipo de task no es valido"),

  body("method").toUpperCase()
    .custom((value: string, { req }) => {

      if (req.body.typeTask === "REST") {
        if (value === undefined || value === null || value.trim().length === 0) {
          throw new Error("El campo de tipo de método es requerido");
        }
      
        if (!/^[a-zA-Z]+$/.test(value)) {
          throw new Error(
            "El tipo de método no puede contener caracteres especiales"
          );
        }

        // Validar que esté en la lista solo si se envió
        if (!taskAllowedMethod.includes(value)) {
          throw new Error("El método no es válido");
        }
      }
      // Si no es REST y viene el campo method, lo validamos (opcional)
      if (value !== undefined && value !== null && value.trim() !== '') {
        if (!/^[a-zA-Z]+$/.test(value)) {
          throw new Error("El tipo de método no puede contener caracteres especiales");
        }
      }

      return true;
    }),
  handleInputErrors,
  ComandController.createTask
);

router.post(
  "/createPipeline",
  body("name")
    .notEmpty()
    .withMessage("El nombre del pipeline es obligatorio")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("El nombre no puede contener caracteres especiales"),

  body("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type es requerido")
    .isIn(pipelineAllowedType)
    .withMessage("El tipo de pipeline no es valido"),

  handleInputErrors,
  ComandController.createPipeline
);

router.post(
  "/createDataBase",
  body("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type es requerido")
    .isIn(dbAllowedType).withMessage("El tipo de pipeline no es valido"),

  handleInputErrors,
  ComandController.createDataBase
);

router.post(
  "/createCritalRoot",
  body("componentName")
    .notEmpty()
    .withMessage("El nombre del componente es obligatorio")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("El nombre no puede contener caracteres especiales"),

  body("features")
    .isArray({ min: 1 }),

  body("features.*.featureName")
    .notEmpty()
    .withMessage("Cada feature debe tener un nombre")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("El nombre del feature no puede contener caracteres especiales"),

  body("features.*.folderName")
    .optional()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("El nombre de la carpeta no puede tener caracteres especiales"),

  body("language")
    .toUpperCase()
    .notEmpty()
    .withMessage("language es requerido")
    .isIn(criticalRootLanAllowed)
    .withMessage("El idioma no es valido"),

  handleInputErrors,
  ComandController.createCritalRoot
);

router.get("/getFolderFeature/:folder",
  param("folder").notEmpty().withMessage("El nombre de la carpeta es necesaria"),
  ComandController.getListFeature
);

export default router;
