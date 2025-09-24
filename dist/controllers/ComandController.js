"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComandController = void 0;
const capitalize_1 = require("../utils/capitalize");
const { exec } = require("child_process");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
class ComandController {
    static createProject = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        console.log(projectPath);
        const { projectName, groupId, principalPackage, type } = req.body;
        const command = `gradle screenPlayArchitecture ` +
            `--projectName=${projectName} ` +
            `--groupId=${groupId} ` +
            `--principalPackage=${principalPackage} ` +
            `--type=${type}`;
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static createFeature = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { name, nameSubFolder, examples } = req.body;
        const command = `gradle generateFeature ` +
            `--name=${name} ` +
            `--nameSubFolder=${nameSubFolder} ` +
            `--examples=${examples}`;
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static createRunners = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { name, folderName } = req.body;
        const command = `gradle generateRunner ` +
            `--name=${name} ` +
            `--folderName=${folderName}`;
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static createRestInteraction = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { typeInteraction, nameInteraction } = req.body;
        let command = `gradle generateRestInteraction ` +
            `--typeInteraction=${typeInteraction} `;
        if (typeInteraction === "GENERIC") {
            command += `--nameInteraction=${nameInteraction}`;
        }
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(500).json({ error: "Unexpected error occurred" });
        }
    };
    static createTask = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { name, typeTask, method } = req.body;
        const nameCapitalize = (0, capitalize_1.smartCapitalize)(name);
        let command = `gradle generateTask ` +
            `--name=${nameCapitalize} ` +
            `--typeTask=${typeTask} `;
        if (typeTask === "REST") {
            const methodCapitalize = (0, capitalize_1.smartCapitalize)(method);
            console.log(methodCapitalize);
            command += `--method=${methodCapitalize}`;
        }
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static createPipeline = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { name, type } = req.body;
        const command = `gradle generatePipeline ` + `--name=${name} ` + `--type=${type}`;
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static createDataBase = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { type } = req.body;
        const command = `gradle dbConnection ` + `--dataBase=${type} `;
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static createCritalRoot = async (req, res) => {
        const projectPath = path_1.default.resolve(process.cwd(), "../../");
        const { componentName, features, language } = req.body;
        const featureStrings = features
            .map((feature) => {
            return `${feature.folderName}/${feature.featureName}`;
        })
            .join(",");
        const command = `gradle generateCriticalRoot ` +
            `--componentName=${componentName} ` +
            `--features=${featureStrings} ` +
            `--language=${language}`;
        try {
            exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (stderr) {
                    return res.status(400).json({ stderr });
                }
                return res.status(200).json({
                    command: command,
                    message: "Command executed successfully",
                });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static getFoldersFeature = async (req, res) => {
        const projectPath = `${path_1.default.resolve(process.cwd(), "../../")}/src/test/resources/features`;
        try {
            fs_1.default.readdir(projectPath, { withFileTypes: true }, (err, archivos) => {
                if (err) {
                    return res.status(500).json({ error: "Error reading path" });
                }
                const folders = archivos
                    .filter((dirent) => dirent.isDirectory())
                    .map((dirent) => dirent.name);
                res.status(200).json({ folders });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static getListFeature = async (req, res) => {
        const { folder } = req.params;
        const projectPath = `${path_1.default.resolve(process.cwd(), "../../")}/src/test/resources/features/${folder}`;
        try {
            fs_1.default.readdir(projectPath, { withFileTypes: true }, (err, items) => {
                if (err) {
                    return res.status(500).json({ error: "Error reading path" });
                }
                const files = items
                    .filter((item) => item.isFile())
                    .map((item) => item.name);
                res.status(200).json({ files });
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unexpected error occurred" });
        }
    };
    static getFullTree = async (req, res) => {
        const projectPath = `${path_1.default.resolve(process.cwd(), "../../")}`;
        const buildTree = (dirPath) => {
            try {
                const stats = fs_1.default.statSync(dirPath);
                const name = path_1.default.basename(dirPath);
                if (stats.isFile()) {
                    return { name, type: "file" };
                }
                const children = fs_1.default
                    .readdirSync(dirPath)
                    .map((child) => buildTree(path_1.default.join(dirPath, child)));
                return { name, type: "folder", children };
            }
            catch (error) {
                res.status(500).json({ error: "Unexpected error occurred" });
            }
        };
        try {
            if (!fs_1.default.existsSync(projectPath)) {
                return res.status(404).json({ error: "Path does not exist" });
            }
            const tree = buildTree(projectPath);
            return res.status(200).json(tree);
        }
        catch (error) {
            return res.status(500).json({ error: "Error generating project structure" });
        }
    };
}
exports.ComandController = ComandController;
//# sourceMappingURL=ComandController.js.map