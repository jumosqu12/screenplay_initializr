import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePageView from "./views/HomePageView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<HomePageView />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}