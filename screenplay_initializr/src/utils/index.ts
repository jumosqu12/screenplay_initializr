import { z } from "zod"

export type Task = {
    title: string,
    comand: string,
    icon: string,
    to: string
}

export const LIST_TASK: Task[] = [
    { title: "Project", comand: "runProject", icon: "project-management", to: "/"},
    { title: "Feature", comand: "runFeature", icon: "cucumber", to: "/generateFeature"},
    { title: "Runners", comand: "runRunners", icon: "play-button", to: "/generateRunner"},
    { title: "Interaction", comand: "runInteraction", icon: "social-network", to: "/generateInteraction"},
    { title: "Task", comand: "runTask", icon: "checklist", to: "/generateTask"},
    { title: "Pipeline", comand: "runPipeline", icon: "water-pipe", to: "/generatePipeline"},
    { title: "Critical Root", comand: "runCriticalRoot", icon: "route", to: "/generateCriticalRoot"},
    { title: "Data Base connection", comand: "runDataBaseConnection", icon: "database", to: "/generateDbConection"}
]

export const LIST_TYPE_PROJECTS : {[key: string] : string } = {
    REST: 'Rest Api',
    UX: 'UI'
}

export const LIST_TYPE_REST: string[]  = ["GET", "POST", "PUT", "PATCH", "OPTIONS", "GENERIC"]

export const LIST_TYPE_TASK: string[]  = ["REST", "UX"]

export const LIST_TYPE_PIPELINE: string[]  = ["Azure"]

export const LIST_TYPE_DB: string[]  = ["MYSQL", "POSTGRESQL", "ORACLE", "SQLSERVER", "AS400"]

export const LIST_LANGUAGE: {[key: string] : string }  =  {ES: "Spanish", EN: "English"};



export const projectComandSchema = z.object({
    projectName: z.string(),
    groupId: z.string(),
    principalPackage: z.string(),
    type: z.string(),
})

export const featureComandSchema = z.object({
    name: z.string(),
    examples: z.string(),
    nameSubFolder: z.string(),
    
})

export const runnerComandSchema = z.object({
    name: z.string(),
    folderName: z.string()
    
})

export const restInteractionComandSchema = z.object({
    typeInteraction: z.string(),
    nameInteraction: z.string()
    
})

export const taskComandSchema = z.object({
    name: z.string(),
    typeTask: z.string(),
    method: z.string()
    
})

export const pipelineComandSchema = z.object({
    name: z.string(),
    type: z.string()
    
})

export const dataBaseComandSchema = z.object({
    type: z.string(),
})

export const criticalRootComandSchema = z.object({
    componentName: z.string(),
    features: z.array(
        z.object({
            featureName: z.string(),
            folderName: z.string()
        })
    ),
    language: z.string()
    
})

export type ProjectComand = z.infer<typeof projectComandSchema>
export type FeatureComand = z.infer<typeof featureComandSchema>
export type RunnerComand = z.infer<typeof runnerComandSchema>
export type RestInterComand = z.infer<typeof restInteractionComandSchema>
export type TaskComand = z.infer<typeof taskComandSchema>
export type PipelineComand = z.infer<typeof pipelineComandSchema>
export type DataBaseComand = z.infer<typeof dataBaseComandSchema>
export type CriticalComand = z.infer<typeof criticalRootComandSchema>