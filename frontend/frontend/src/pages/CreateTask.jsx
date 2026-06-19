import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateTask() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [estimatedHours, setEstimatedHours] = useState("");
    const [loadingAi, setLoadingAi] = useState(false);

    const generateSuggestion = async () => {

        if (!title) {

            alert("Enter task title first");
            return;
        }

        try {

            setLoadingAi(true);

            const token =
                localStorage.getItem("token");

            const response =
                await api.post(
                    "/api/ai/suggest",
                    {
                        title
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setDescription(
                response.data.suggestion
            );

        } catch (error) {

            console.log(error);

            alert("AI Suggestion Failed");

        } finally {

            setLoadingAi(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/api/tasks",
                {
                    title,
                    description,
                    priority,
                    dueDate,
                    status: "TODO",
                    estimatedHours
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Task Created Successfully"
            );

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Failed To Create Task");
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
                    Create Task
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
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

                    <button
                        type="button"
                        onClick={generateSuggestion}
                        className="
                        mb-4
                        bg-purple-600
                        hover:bg-purple-700
                        px-4
                        py-2
                        rounded-xl
                        text-white
                        transition
                        "
                    >
                        {
                            loadingAi
                                ? "Generating..."
                                : "✨ AI Suggest"
                        }
                    </button>

                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        className="
                        w-full
                        bg-[#0f0f18]
                        border
                        border-purple-500/30
                        rounded-xl
                        p-3
                        text-white
                        mb-4
                        h-40
                        "
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(
                                e.target.value
                            )
                        }
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

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(
                                e.target.value
                            )
                        }
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
                            setEstimatedHours(
                                e.target.value
                            )
                        }
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
                        Create Task
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateTask;