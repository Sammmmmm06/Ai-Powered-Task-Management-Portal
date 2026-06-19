import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Register from "./pages/Register";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/create-task"
                    element={<CreateTask />}
                />
                <Route
    path="/edit-task/:id"
    element={<EditTask />}
/>
            <Route
    path="/register"
    element={<Register />}
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;