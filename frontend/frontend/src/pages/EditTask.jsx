import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditTask() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("TODO");
    const [estimatedHours, setEstimatedHours] = useState("");

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    `/api/tasks/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const task = response.data;

            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setDueDate(task.dueDate);
            setStatus(task.status);
            setEstimatedHours(task.estimatedHours);

        } catch (error) {

            console.log(error);
        }
    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.put(
                `/api/tasks/${id}`,
                {
                    title,
                    description,
                    priority,
                    dueDate,
                    status,
                    estimatedHours
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Task Updated");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Update Failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#09090f] flex items-center justify-center p-6">

            <div
                className="
                w-full
                max-w-2xl
                bg-[#151520]
                border
                border-purple-500/30
                rounded-3xl
                p-8
                shadow-[0_0_25px_rgba(168,85,247,0.15)]
                "
            >

                <h1
                    className="
                    text-4xl
                    font-bold
                    text-purple-400
                    mb-8
                    "
                >
                    Edit Task
                </h1>

                <form onSubmit={handleUpdate}>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)}
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-4
                        "
                    />

                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)}
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-4
                        h-32
                        "
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)}
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-4
                        "
                    >
                        <option>LOW</option>
                        <option>MEDIUM</option>
                        <option>HIGH</option>
                    </select>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)}
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-4
                        "
                    >
                        <option>TODO</option>
                        <option>IN_PROGRESS</option>
                        <option>COMPLETED</option>
                    </select>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)}
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-4
                        "
                    />

                    <input
                        type="number"
                        placeholder="Estimated Hours"
                        value={estimatedHours}
                        onChange={(e) =>
                            setEstimatedHours(e.target.value)}
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-6
                        "
                    />

                    <button
                        type="submit"
                        className="
                        w-full
                        bg-purple-600
                        hover:bg-purple-700
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        "
                    >
                        Update Task
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditTask;