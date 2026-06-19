import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post(
            "/api/auth/login",
            {
                email,
                password
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

        alert("Login Successful");

        navigate("/dashboard");

    } catch (error) {

        alert("Login Failed");

        console.log(error);
    }
};

return (
    <div className="min-h-screen bg-[#09090f] flex items-center justify-center">

        <div
            className="
            w-full
            max-w-md
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
                mb-6
                text-center
                "
            >
                AI Task Manager
            </h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)}
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
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)}
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
                    required
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
                    Login
                </button>

            </form>

            <div className="text-center mt-6">

                <p className="text-gray-400">
                    Don't have an account?
                </p>

                <Link
                    to="/register"
                    className="
                    text-purple-400
                    hover:text-purple-300
                    font-semibold
                    transition
                    "
                >
                    Create Account
                </Link>

            </div>

        </div>

    </div>
);


}

export default Login;
