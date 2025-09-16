import { FaMicrophone, FaTimes } from "react-icons/fa";

export default function ModalAddVoice({ isOpen, onClose }) {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Adicionar minha voz
        </h2>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-inner">
            <FaMicrophone size={40} />
          </div>
          <p className="text-gray-600 text-center text-sm">
            Aqui você poderá adicionar uma simulação da sua voz.  
            (Este é apenas um modal visual).
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}