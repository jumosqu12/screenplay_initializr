import api from "@/libs/axios";
import type { CriticalRequest, DataBaseComand, FeatureComand, PipelineComand, ProjectComand, RestInterComand, RunnerComand, TaskComand } from "@/utils/index";
import { isAxiosError } from "axios";


export async function createProject(formData: ProjectComand) {
    
    try {
        const { data } = await api.post("/createProject", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function createFeature(formData: FeatureComand) {
    
    try {
        const { data } = await api.post("/createFeature", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function createRunners(formData: RunnerComand) {
    
    try {
        const { data } = await api.post("/createRunners", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}


export async function createInteraction(formData: RestInterComand) {
    
    try {
        const { data } = await api.post("/createInteraction", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function createTask(formData: TaskComand) {
    
    try {
        const { data } = await api.post("/createTask", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function createPipeline(formData: PipelineComand) {
    
    try {
        const { data } = await api.post("/createPipeline", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function createDataBase(formData: DataBaseComand) {
    
    try {
        const { data } = await api.post("/createDataBase", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function createCritalRoot(formData: CriticalRequest) {
    
    try {
        const { data } = await api.post("/createCritalRoot", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function getFoldersFeature() {
    
    try {
        const { data } = await api.get("/getFolderFeature")
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}

export async function getAllFeatures(folder: string) {
    
    try {
        const { data } = await api.get(`/getFolderFeature/${folder}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response.data.errors;
        }
    }
}