import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {


const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async (e) => {

    e.preventDefault();

    try {

        await api.post(
            "/api/auth/register",
            {
                name,
                email,
                password
            }
        );

        alert("Registration Successful");

        navigate("/");

    } catch (error) {

        console.log(error);

        alert("Registration Failed");
    }
};

return (
    <div className="min-h-screen bg-[#09090f] flex items-center justify-center p-6">

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
                mb-8
                text-center
                "
            >
                Create Account
            </h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
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
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
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
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
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
                    text-white
                    transition
                    "
                >
                    Register
                </button>

            </form>

            <p
                className="
                text-center
                text-gray-400
                mt-6
                "
            >
                Already have an account?
            </p>

            <Link to="/">

                <button
                    className="
                    w-full
                    mt-3
                    border
                    border-purple-500
                    text-purple-300
                    py-3
                    rounded-xl
                    hover:bg-purple-500/10
                    transition
                    "
                >
                    Login
                </button>

            </Link>

        </div>

    </div>
);


}

export default Register;
