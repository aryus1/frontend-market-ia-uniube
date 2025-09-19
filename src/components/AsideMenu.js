import { useState, useEffect } from "react";
import { FaPlus, FaMicrophone, FaSignOutAlt, FaCheck } from "react-icons/fa";
import ModalAddVoice from "./ModalAddVoice";
import ModalVoiceCommands from "./ModalVoiceCommands";
import { Link } from "react-router-dom";
import apiService from "../services/api";

export default function AsideMenu() {
  const [isAddVoiceModalOpen, setIsAddVoiceModalOpen] = useState(false);
  const [isVoiceCommandsModalOpen, setIsVoiceCommandsModalOpen] = useState(false);
  const [userVoice, setUserVoice] = useState(null);
  
  // Verificar se há voz registrada
  useEffect(() => {
    const checkUserVoice = async () => {
      try {
        // Primeiro, verificar localStorage (compatibilidade)
        const savedVoice = localStorage.getItem('userVoice');
        if (savedVoice) {
          const localVoice = JSON.parse(savedVoice);
          setUserVoice(localVoice);
          
          // Tentar verificar também na API
          try {
            const apiVoice = await apiService.getVozUsuario(localVoice.userName);
            if (apiVoice) {
              // Usar dados da API se disponíveis
              setUserVoice({
                userName: apiVoice.userName,
                recordingTime: apiVoice.recordingTime,
                timestamp: apiVoice.timestamp
              });
            }
          } catch (apiError) {
            // Se não encontrar na API, manter dados locais
            console.log('Voz não encontrada na API, usando dados locais');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar voz do usuário:', error);
      }
    };
    
    checkUserVoice();
    
    // Verificar periodicamente por atualizações
    const interval = setInterval(checkUserVoice, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-60 bg-blue-200 min-h-screen p-4 shadow-md">
      <h1 className="text-lg font-bold text-gray-800 mb-6">Name-In-Dev</h1>

      <nav className="flex flex-col gap-4">
        <button
          onClick={() => setIsAddVoiceModalOpen(true)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow transition-all ${
            userVoice 
              ? 'bg-blue-100 hover:bg-blue-200 text-gray-800' 
              : 'bg-green-100 hover:bg-green-200 text-gray-800'
          }`}
        >
          {userVoice ? (
            <FaCheck className="text-blue-600 text-lg" />
          ) : (
            <FaPlus className="text-green-600 text-lg" />
          )}
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">
              {userVoice ? 'Voz registrada' : 'Adicionar minha voz'}
            </span>
            {userVoice && (
              <span className="text-xs text-gray-600">
                {userVoice.userName}
              </span>
            )}
          </div>
        </button>

        <button
          onClick={() => setIsVoiceCommandsModalOpen(true)}
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
        isOpen={isAddVoiceModalOpen}
        onClose={() => setIsAddVoiceModalOpen(false)}
      />

      <ModalVoiceCommands
        isOpen={isVoiceCommandsModalOpen}
        onClose={() => setIsVoiceCommandsModalOpen(false)}
      />
    </aside>
  );
}
