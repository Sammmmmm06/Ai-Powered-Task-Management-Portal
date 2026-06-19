import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteTask = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/api/tasks/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#09090f] text-white">

            <div className="max-w-6xl mx-auto p-8">

                {/* Header */}

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-6xl font-bold">
                            AI Task Manager
                        </h1>

                        <p className="text-purple-300 mt-2 text-lg">
                            Manage tasks intelligently and stay productive
                        </p>

                        <p className="text-gray-400 mt-2">
                            Total Tasks: {tasks.length}
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="
                        bg-red-600
                        hover:bg-red-700
                        px-5
                        py-3
                        rounded-xl
                        font-medium
                        transition
                        "
                    >
                        Logout
                    </button>

                </div>

                {/* Create Task */}

                <Link to="/create-task">

                    <button
                        className="
                        bg-purple-600
                        hover:bg-purple-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        shadow-lg
                        shadow-purple-500/30
                        mb-10
                        "
                    >
                        + Create Task
                    </button>

                </Link>

                {/* Empty State */}

                {tasks.length === 0 && (

                    <div
                        className="
                        text-center
                        text-gray-400
                        text-xl
                        mt-10
                        "
                    >
                        No Tasks Found 🚀
                    </div>

                )}

                {/* Tasks */}

                <div className="grid gap-6">

                    {tasks.map(task => (

                        <div
                            key={task.id}
                            className="
                            bg-[#151520]
                            border
                            border-purple-500/30
                            rounded-3xl
                            p-6
                            shadow-[0_0_25px_rgba(168,85,247,0.15)]
                            hover:scale-[1.02]
                            transition
                            "
                        >

                            <h2 className="text-2xl font-bold text-purple-300">
                                ⚡ {task.title}
                            </h2>

                            <p className="text-gray-300 mt-3 whitespace-pre-wrap">
                                {task.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-4">

                                <span
                                    className="
                                    bg-purple-600
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-semibold
                                    "
                                >
                                    Priority: {task.priority}
                                </span>

                                <span
                                    className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    ${
                                        task.status === "COMPLETED"
                                            ? "bg-green-600"
                                            : task.status === "IN_PROGRESS"
                                            ? "bg-yellow-600"
                                            : "bg-gray-700"
                                    }
                                    `}
                                >
                                    {task.status}
                                </span>

                                <span
                                    className="
                                    bg-blue-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    "
                                >
                                    ⏳ {task.estimatedHours} Hours
                                </span>

                            </div>

                            <div className="mt-4 text-gray-400 space-y-1">

                                <p>
                                    📅 Due Date:
                                    {" "}
                                    {
                                        task.dueDate
                                            ? new Date(task.dueDate)
                                                  .toLocaleDateString()
                                            : "Not Set"
                                    }
                                </p>

                                <p>
                                    🕒 Created:
                                    {" "}
                                    {
                                        task.createdAt
                                            ? new Date(task.createdAt)
                                                  .toLocaleDateString()
                                            : "N/A"
                                    }
                                </p>

                            </div>

                            <div className="flex gap-3 mt-6">

                                <Link
                                    to={`/edit-task/${task.id}`}
                                >
                                    <button
                                        className="
                                        bg-purple-600
                                        hover:bg-purple-700
                                        px-4
                                        py-2
                                        rounded-xl
                                        font-medium
                                        transition
                                        "
                                    >
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={() =>
                                        deleteTask(task.id)}
                                    className="
                                    bg-red-600
                                    hover:bg-red-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    font-medium
                                    transition
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;