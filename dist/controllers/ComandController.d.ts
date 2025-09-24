import type { Request, Response } from "express";
export declare class ComandController {
    static createProject: (req: Request, res: Response) => Promise<void>;
    static createFeature: (req: Request, res: Response) => Promise<void>;
    static createRunners: (req: Request, res: Response) => Promise<void>;
    static createRestInteraction: (req: Request, res: Response) => Promise<void>;
    static createTask: (req: Request, res: Response) => Promise<void>;
    static createPipeline: (req: Request, res: Response) => Promise<void>;
    static createDataBase: (req: Request, res: Response) => Promise<void>;
    static createCritalRoot: (req: Request, res: Response) => Promise<void>;
    static getFoldersFeature: (req: Request, res: Response) => Promise<void>;
    static getListFeature: (req: Request, res: Response) => Promise<void>;
    static getFullTree: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
