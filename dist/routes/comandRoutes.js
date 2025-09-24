"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComandController_1 = require("../controllers/ComandController");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Valid types
const projectTypes = ["REST", "UX"];
const taskAllowedMethod = ["GET", "POST", "PUT", "PATCH", "OPTIONS", "GENERIC"];
const dbAllowedType = ["MYSQL", "POSTGRESQL", "ORACLE", "SQLSERVER", "AS400"];
const pipelineAllowedType = ["AZURE"];
const criticalRootLanAllowed = ["ES", "EN"];
router.post("/createProject", (0, express_validator_1.body)("projectName")
    .notEmpty()
    .withMessage("Project name is required")
    .matches(/^[a-zA-Z_-]+$/)
    .withMessage("projectName can only contain letters without spaces"), (0, express_validator_1.body)("groupId")
    .notEmpty()
    .withMessage("groupId is required")
    .matches(/^[a-zA-Z]+(\.[a-zA-Z]+)*$/)
    .withMessage("groupId can only contain letters and dots"), (0, express_validator_1.body)("principalPackage")
    .notEmpty()
    .withMessage("principalPackage is required")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("principalPackage can only contain letters without spaces"), (0, express_validator_1.body)("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(projectTypes)
    .withMessage(`type must be one of: ${projectTypes.join(", ")}`), validation_1.handleInputErrors, ComandController_1.ComandController.createProject);
router.post("/createFeature", (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("Feature name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Name cannot contain special characters"), (0, express_validator_1.body)("nameSubFolder")
    .notEmpty()
    .withMessage("nameSubFolder is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("nameSubFolder cannot contain special characters"), (0, express_validator_1.body)("examples")
    .notEmpty()
    .withMessage("examples is required")
    .isBoolean()
    .withMessage("examples can only be True or False"), validation_1.handleInputErrors, ComandController_1.ComandController.createFeature);
router.post("/createRunners", (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("Runner name is required")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Name cannot contain special characters"), (0, express_validator_1.body)("folderName")
    .notEmpty()
    .withMessage("folderName is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("folderName cannot contain special characters"), validation_1.handleInputErrors, ComandController_1.ComandController.createRunners);
router.post("/createInteraction", (0, express_validator_1.body)("typeInteraction")
    .toUpperCase()
    .notEmpty()
    .withMessage("Interaction type is required")
    .isIn(taskAllowedMethod)
    .withMessage("Invalid interaction type"), (0, express_validator_1.body)("nameInteraction").custom((value, { req }) => {
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
}), validation_1.handleInputErrors, ComandController_1.ComandController.createRestInteraction);
router.post("/createTask", (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("Task name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Task name cannot contain special characters"), (0, express_validator_1.body)("typeTask")
    .toUpperCase()
    .notEmpty()
    .withMessage("typeTask is required")
    .isIn(projectTypes)
    .withMessage("Invalid task type"), (0, express_validator_1.body)("method")
    .toUpperCase()
    .custom((value, { req }) => {
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
}), validation_1.handleInputErrors, ComandController_1.ComandController.createTask);
router.post("/createPipeline", (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("Pipeline name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Pipeline name cannot contain special characters"), (0, express_validator_1.body)("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(pipelineAllowedType)
    .withMessage("Invalid pipeline type"), validation_1.handleInputErrors, ComandController_1.ComandController.createPipeline);
router.post("/createDataBase", (0, express_validator_1.body)("type")
    .toUpperCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(dbAllowedType)
    .withMessage("Invalid database type"), validation_1.handleInputErrors, ComandController_1.ComandController.createDataBase);
router.post("/createCritalRoot", (0, express_validator_1.body)("componentName")
    .notEmpty()
    .withMessage("Component name is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Component name cannot contain special characters"), (0, express_validator_1.body)("features").isArray({ min: 1 }), (0, express_validator_1.body)("features.*.featureName")
    .notEmpty()
    .withMessage("Each feature must have a name")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Feature name cannot contain special characters"), (0, express_validator_1.body)("features.*.folderName")
    .optional()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Folder name cannot contain special characters"), (0, express_validator_1.body)("language")
    .toUpperCase()
    .notEmpty()
    .withMessage("language is required")
    .isIn(criticalRootLanAllowed)
    .withMessage("Invalid language"), validation_1.handleInputErrors, ComandController_1.ComandController.createCritalRoot);
router.get("/getFolderFeature", ComandController_1.ComandController.getFoldersFeature);
router.get("/getFolderFeature/:folder", (0, express_validator_1.param)("folder").notEmpty().withMessage("Folder name is required"), ComandController_1.ComandController.getListFeature);
exports.default = router;
//# sourceMappingURL=comandRoutes.js.map