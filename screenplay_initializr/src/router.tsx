import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import GenerateProject from "./components/FormComand/GenerateProject";
import GenerateFeature from "./components/FormComand/GenerateFeature";
import GenerateRunner from "./components/FormComand/GenerateRunner";
import GenerateInteraction from "./components/FormComand/GenerateInteraction";
import GenerateTask from "./components/FormComand/GenerateTask";
import GeneratePipeline from "./components/FormComand/GeneratePipeline";
import GenerateCriticalRoot from "./components/FormComand/GenerateCriticalRoot";
import GenerateDb from "./components/FormComand/GenerateDb";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<GenerateProject />} index/>
                    <Route path="/generateFeature" element={<GenerateFeature />} />
                    <Route path="/generateRunner" element={<GenerateRunner />} />
                    <Route path="/generateInteraction" element={<GenerateInteraction />} />
                    <Route path="/generateTask" element={<GenerateTask />} />
                    <Route path="/generatePipeline" element={<GeneratePipeline />} />
                    <Route path="/generateCriticalRoot" element={<GenerateCriticalRoot />} />
                    <Route path="/generateDbConection" element={<GenerateDb />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}