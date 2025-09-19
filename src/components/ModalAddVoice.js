import { FaMicrophone, FaTimes, FaPlay, FaStop, FaSave } from "react-icons/fa";
import { useState, useRef } from "react";
import apiService from "../services/api";

export default function ModalAddVoice({ isOpen, onClose }) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [userName, setUserName] = useState('');
    const [recordingTime, setRecordingTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [notification, setNotification] = useState(null);
    
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const chunksRef = useRef([]);

    if (!isOpen) return null;

    // Função para converter Blob para Base64
    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                // Remove o prefixo "data:audio/wav;base64," se presente
                const base64 = result.split(',')[1] || result;
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Função para iniciar gravação
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                
                // Parar todas as faixas de áudio
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            
            // Timer para mostrar tempo de gravação
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            
        } catch (error) {
            console.error('Erro ao acessar microfone:', error);
            showNotification('Erro ao acessar microfone. Verifique as permissões.', 'error');
        }
    };
    
    // Função para parar gravação
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };
    
    // Função para reproduzir áudio
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    
    // Função para parar reprodução
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };
    
    // Função para salvar voz
    const saveVoice = async () => {
        if (!userName.trim()) {
            showNotification('Por favor, insira seu nome.', 'error');
            return;
        }
        
        if (!audioBlob) {
            showNotification('Por favor, grave um áudio primeiro.', 'error');
            return;
        }
        
        try {
            // Converter áudio para base64
            const audioBase64 = await blobToBase64(audioBlob);
            
            const voiceData = {
                userName: userName.trim(),
                audioData: audioBase64,
                recordingTime: recordingTime,
                audioFormat: 'audio/wav'
            };
            
            // Salvar na API
            const response = await apiService.salvarVoz(voiceData);
            
            // Também salvar no localStorage para compatibilidade
            localStorage.setItem('userVoice', JSON.stringify({
                userName: voiceData.userName,
                recordingTime: voiceData.recordingTime,
                timestamp: new Date().toISOString()
            }));
            
            showNotification(response.detail || 'Voz salva com sucesso!', 'success');
            
            // Fechar modal após salvar
            setTimeout(() => {
                handleClose();
            }, 1500);
            
        } catch (error) {
            console.error('Erro ao salvar voz:', error);
            showNotification('Erro ao salvar voz: ' + error.message, 'error');
        }
    };
    
    // Função para mostrar notificações
    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };
    
    // Função para fechar modal e limpar dados
    const handleClose = () => {
        stopRecording();
        stopAudio();
        setUserName('');
        setAudioBlob(null);
        setAudioUrl(null);
        setRecordingTime(0);
        setNotification(null);
        
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        onClose();
    };
    
    // Formatar tempo de gravação
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[500px] relative">
        {/* Notificação */}
        {notification && (
          <div className={`absolute top-2 left-4 right-4 p-3 rounded-md shadow-lg z-10 ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {notification.message}
          </div>
        )}
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          🎤 Adicionar minha voz
        </h2>

        {/* Campo de nome do usuário */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seu nome:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Digite seu nome..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRecording}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Botão de gravação */}
          <div className={`w-32 h-32 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            isRecording 
              ? 'bg-red-100 text-red-600 animate-pulse' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}>
            <FaMicrophone size={60} />
          </div>
          
          {/* Timer de gravação */}
          {(isRecording || audioBlob) && (
            <div className="text-lg font-mono font-bold text-gray-700">
              {formatTime(recordingTime)}
            </div>
          )}
          
          {/* Status */}
          <p className="text-gray-600 text-center text-sm">
            {isRecording 
              ? 'Gravando... Fale agora!' 
              : audioBlob 
                ? 'Gravação concluída!' 
                : 'Clique em "Iniciar Gravação" para começar'
            }
          </p>
        </div>

        {/* Áudio player */}
        {audioUrl && (
          <div className="mt-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}

        {/* Botões de controle */}
        <div className="flex justify-center gap-3 mt-6">
          {!isRecording && !audioBlob && (
            <button
              onClick={startRecording}
              disabled={!userName.trim()}
              className={`px-6 py-2 rounded-lg shadow transition ${
                !userName.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              🎤 Iniciar Gravação
            </button>
          )}
          
          {isRecording && (
            <button
              onClick={stopRecording}
              className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow"
            >
              <FaStop className="inline mr-2" /> Parar Gravação
            </button>
          )}
          
          {audioBlob && !isRecording && (
            <>
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow"
              >
                {isPlaying ? <FaStop className="inline mr-2" /> : <FaPlay className="inline mr-2" />}
                {isPlaying ? 'Parar' : 'Reproduzir'}
              </button>
              
              <button
                onClick={() => {
                  setAudioBlob(null);
                  setAudioUrl(null);
                  setRecordingTime(0);
                }}
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow"
              >
                🔄 Gravar Novamente
              </button>
              
              <button
                onClick={saveVoice}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow"
              >
                <FaSave className="inline mr-2" /> Salvar Voz
              </button>
            </>
          )}
        </div>
        
        {/* Botão cancelar sempre visível */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}