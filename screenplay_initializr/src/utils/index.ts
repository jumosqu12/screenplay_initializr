import { z } from "zod"

export type Task = {
    title: string,
    comand: string,
    icon: string
}

export const LIST_TASK: Task[] = [
    { title: "Project", comand: "runProject", icon: "project-management"},
    { title: "Feature", comand: "runFeature", icon: "cucumber"},
    { title: "Runners", comand: "runRunners", icon: "play-button"},
    { title: "Interaction", comand: "runInteraction", icon: "social-network"},
    { title: "Task", comand: "runTask", icon: "checklist"},
    { title: "Pipeline", comand: "runPipeline", icon: "water-pipe"},
    { title: "Critical Root", comand: "runCriticalRoot", icon: "route"},
    { title: "Data Base connection", comand: "runDataBaseConnection", icon: "database"}
]

export const LIST_TYPE_PROJECTS : {[key: string] : string } = {
    REST: 'Microservicios Rest',
    UX: 'Interfaces de usuario UI'
}


export const projectComandSchema = z.object({
    projectName: z.string(),
    groupId: z.string(),
    principalPackage: z.string(),
    type: z.string(),
})

export const featureComandSchema = z.object({
    name: z.string(),
    example: z.boolean(),
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
    dataBase: z.string(),
})

export const criticalRootComandSchema = z.object({
    componentName: z.string(),
    features: z.string(),
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