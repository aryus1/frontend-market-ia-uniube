import { useState } from "react";
import { FaPlus, FaMicrophone, FaSignOutAlt } from "react-icons/fa";
import ModalAddVoice from "./ModalAddVoice";
import ModalVoiceCommands from "./ModalVoiceCommands";
import { Link } from "react-router-dom";

export default function AsideMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="w-60 bg-blue-200 min-h-screen p-4 shadow-md">
      <h1 className="text-lg font-bold text-gray-800 mb-6">Name-In-Dev</h1>

      <nav className="flex flex-col gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-green-100 hover:bg-green-200 text-gray-800 px-4 py-3 rounded-lg shadow"
        >
          <FaPlus className="text-green-600 text-lg" />
          <span className="text-sm font-medium">Adicionar minha voz</span>
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-orange-100 hover:bg-orange-200 text-gray-800 px-4 py-3 rounded-lg shadow"
        >
          <FaMicrophone className="text-orange-600 text-lg" />
          <span className="text-sm font-medium">Comandos de voz</span>
        </button>

        <Link to={"/"}>
          <button className="flex items-center gap-3 bg-red-100 hover:bg-red-200 text-gray-800 px-4 py-3 rounded-lg shadow w-full">
            <FaSignOutAlt className="text-red-600 text-lg" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </Link>
      </nav>

      <ModalAddVoice
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ModalVoiceCommands
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}
