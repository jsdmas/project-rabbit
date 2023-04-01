import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;