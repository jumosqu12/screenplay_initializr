import type { Request, Response } from "express";
import { smartCapitalize } from "../utils/capitalize";
const { exec } = require("child_process");
import fs from "fs";
import { param } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

export class ComandController {
  static createProject = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { projectName, groupId, principalPackage, type } = req.body;
    const command =
      `gradle screenPlayArchitecture ` +
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static createFeature = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { name, nameSubFolder, examples } = req.body;
    const command =
      `gradle generateFeature ` +
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static createRunners = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { name, folderName } = req.body;
    const command =
      `gradle generateRunner ` +
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static createRestInteraction = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { typeInteraction, nameInteraction } = req.body;

    let command =
      `gradle generateRestInteraction ` +
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error no controlado" });
    }
  };

  static createTask = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { name, typeTask, method } = req.body;
    const nameCapitalize = smartCapitalize(name);

    let command =
      `gradle generateTask ` +
      `--name=${nameCapitalize} ` +
      `--typeTask=${typeTask} `;
    if (typeTask === "REST") {
      const methodCapitalize = smartCapitalize(method);
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static createPipeline = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { name, type } = req.body;
    const command =
      `gradle generatePipeline ` + `--name=${name} ` + `--type=${type}`;
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static createDataBase = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static createCritalRoot = async (req: Request, res: Response) => {
    const projectPath = process.env.ROOT;
    const { componentName, features, language } = req.body;

    const featureStrings = features
      .map((feature) => {
        return `${feature.folderName}/${feature.featureName}`;
      })
      .join(",");

    const command =
      `gradle generateCriticalRoot ` +
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
          message: "Comando ejecutado correctamente",
        });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static getFoldersFeature = async (req: Request, res: Response) => {
    const projectPath = `${process.env.ROOT}/src/test/resources/features`;
    try {
      fs.readdir(projectPath, { withFileTypes: true }, (err, archivos) => {
        if (err) {
          return res.status(500).json({ error: "Error al leer la ruta" });
        }

        const folders = archivos
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);

        res.status(200).json({ folders });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };

  static getListFeature = async (req: Request, res: Response) => {
    const {folder} = req.params

    const projectPath = `${process.env.ROOT}/src/test/resources/features/${folder}`;
    try {
      fs.readdir(projectPath, { withFileTypes: true }, (err, items) => {
        if (err) {
          return res.status(500).json({ error: "Error al leer la ruta" });
        }

        const files = items
          .filter((item) => item.isFile())
          .map((item) => item.name);

        res.status(200).json({ files });
      });
    } catch (error) {
      res.status(400).json({ error: "Hubo un error no controlado" });
    }
  };
}
