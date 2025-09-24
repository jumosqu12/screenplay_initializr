import { Router } from "express";
import { ComandController } from "../controllers/ComandController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

// Valid types
const projectTypes = ["REST", "UX"];
const taskAllowedMethod = ["GET", "POST", "PUT", "PATCH", "OPTIONS", "GENERIC"];
const dbAllowedType = ["MYSQL", "POSTGRESQL", "ORACLE", "SQLSERVER", "AS400"];
const pipelineAllowedType = ["AZURE"];
const criticalRootLanAllowed = ["ES", "EN"];

router.post(
  "/createProject",
  body("projectName")
    .notEmpty()
    .withMessage("Project name is required")
    .matches(/^[a-zA-Z_-]+$/)
    .withMessage("projectName can only contain letters without spaces"),

  body("groupId")
    .notEmpty()
    .withMessage("groupId is required")
    .matches(/^[a-zA-Z]+(\.[a-zA-Z]+)*$/)
    .withMessage("groupId can only contain letters and dots"),

  body("principalPackage")
    .notEmpty()
    .withMessage("principalPackage is required")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("principalPackage can only contain letters without spaces"),

  body("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(projectTypes)
    .withMessage(`type must be one of: ${projectTypes.join(", ")}`),
  handleInputErrors,
  ComandController.createProject
);

router.post(
  "/createFeature",
  body("name")
    .notEmpty()
    .withMessage("Feature name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Name cannot contain special characters"),

  body("nameSubFolder")
    .notEmpty()
    .withMessage("nameSubFolder is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("nameSubFolder cannot contain special characters"),

  body("examples")
    .notEmpty()
    .withMessage("examples is required")
    .isBoolean()
    .withMessage("examples can only be True or False"),
  handleInputErrors,
  ComandController.createFeature
);

router.post(
  "/createRunners",
  body("name")
    .notEmpty()
    .withMessage("Runner name is required")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Name cannot contain special characters"),

  body("folderName")
    .notEmpty()
    .withMessage("folderName is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("folderName cannot contain special characters"),

  handleInputErrors,
  ComandController.createRunners
);

router.post(
  "/createInteraction",
  body("typeInteraction")
    .toUpperCase()
    .notEmpty()
    .withMessage("Interaction type is required")
    .isIn(taskAllowedMethod)
    .withMessage("Invalid interaction type"),

  body("nameInteraction").custom((value: string, { req }) => {
    const isGeneric = req.body.typeInteraction?.toUpperCase() === "GENERIC";

    if (!isGeneric) {
      return true;
    }

    if (!value || value.trim().length === 0) {
      throw new Error("Interaction name is required");
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
      throw new Error("Interaction name cannot contain special characters");
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
    .withMessage("Task name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Task name cannot contain special characters"),

  body("typeTask")
    .toUpperCase()
    .notEmpty()
    .withMessage("typeTask is required")
    .isIn(projectTypes)
    .withMessage("Invalid task type"),

  body("method")
    .toUpperCase()
    .custom((value: string, { req }) => {
      if (req.body.typeTask === "REST") {
        if (value === undefined || value === null || value.trim().length === 0) {
          throw new Error("Method type is required");
        }

        if (!/^[a-zA-Z]+$/.test(value)) {
          throw new Error("Method type cannot contain special characters");
        }

        if (!taskAllowedMethod.includes(value)) {
          throw new Error("Invalid method");
        }
      }

      if (value !== undefined && value !== null && value.trim() !== "") {
        if (!/^[a-zA-Z]+$/.test(value)) {
          throw new Error("Method type cannot contain special characters");
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
    .withMessage("Pipeline name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Pipeline name cannot contain special characters"),

  body("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(pipelineAllowedType)
    .withMessage("Invalid pipeline type"),

  handleInputErrors,
  ComandController.createPipeline
);

router.post(
  "/createDataBase",
  body("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(dbAllowedType)
    .withMessage("Invalid database type"),

  handleInputErrors,
  ComandController.createDataBase
);

router.post(
  "/createCritalRoot",
  body("componentName")
    .notEmpty()
    .withMessage("Component name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Component name cannot contain special characters"),

  body("features").isArray({ min: 1 }),

  body("features.*.featureName")
    .notEmpty()
    .withMessage("Each feature must have a name")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Feature name cannot contain special characters"),

  body("features.*.folderName")
    .optional()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Folder name cannot contain special characters"),

  body("language")
    .toUpperCase()
    .notEmpty()
    .withMessage("language is required")
    .isIn(criticalRootLanAllowed)
    .withMessage("Invalid language"),

  handleInputErrors,
  ComandController.createCritalRoot
);

router.get("/getFolderFeature", ComandController.getFoldersFeature);

router.get(
  "/getFolderFeature/:folder",
  param("folder").notEmpty().withMessage("Folder name is required"),
  ComandController.getListFeature
);

export default router;
