import { Link } from "react-router-dom";

export default function WelcomePage() {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
            <h1 className="text-3xl font-semibold">Name In-Dev</h1>
            <h2 className="text-lg">Seu supermercado online 🛒</h2>

            <Link to={"/dashboard"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 transition">
                    Entrar
                </button>
            </Link>
        </div>
    )
}