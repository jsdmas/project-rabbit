import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditThread from "./routes/EditThread";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Thread from "./routes/Thread";
import Write from "./routes/Write";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Login />} />
                <Route path="/write" element={<Write />} />
                <Route path="/thread/:threadid" element={<Thread />} />
                <Route path="/thread/:threadid/edit" element={<EditThread />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;