import { FaTimes, FaTrash, FaMinus } from "react-icons/fa";
import useStore from "../hooks/useStore";
import { useState } from "react";

export default function ModalCarrinho({ isOpen, onClose, itens = [] }) {
    const { 
        calcularTotalCarrinho, 
        finalizarCompra, 
        limparCarrinho, 
        removerDoCarrinho,
        loading 
    } = useStore();
    
    const [notification, setNotification] = useState(null);
    
    if (!isOpen) return null;

    const safeItens = Array.isArray(itens) ? itens : [];
    const total = calcularTotalCarrinho();

    // Função para remover item do carrinho
    const handleRemoverItem = async (produtoNome, quantidade = null) => {
        const result = await removerDoCarrinho(produtoNome, quantidade);
        showNotification(result.message, result.success ? 'success' : 'error');
    };

    // Função para limpar carrinho
    const handleLimparCarrinho = async () => {
        const result = await limparCarrinho();
        showNotification(result.message, result.success ? 'success' : 'error');
    };

    // Função para finalizar compra
    const handleFinalizarCompra = async () => {
        const result = await finalizarCompra();
        showNotification(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            setTimeout(onClose, 2000); // Fecha modal após 2 segundos
        }
    };

    // Função para exibir notificação
    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-xl p-6 relative overflow-y-auto max-h-[80vh]">
                {/* Notificação */}
                {notification && (
                    <div className={`absolute top-2 left-4 right-4 p-3 rounded-md shadow-lg z-60 ${
                        notification.type === 'success' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                    }`}>
                        {notification.message}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={20} />
                </button>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Carrinho</h2>
                    {safeItens.length > 0 && (
                        <button
                            onClick={handleLimparCarrinho}
                            disabled={loading}
                            className="text-red-500 hover:text-red-600 p-1 rounded transition disabled:opacity-50"
                            title="Limpar carrinho"
                        >
                            <FaTrash size={16} />
                        </button>
                    )}
                </div>

                {safeItens && safeItens.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {safeItens.map((item, index) => (
                            <div
                                key={item.nome || index}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.nome}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantidade}x R$ {item.preco.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleRemoverItem(item.nome, 1)}
                                            disabled={loading}
                                            className="text-red-500 hover:text-red-600 p-1 rounded transition disabled:opacity-50"
                                            title="Remover 1 item"
                                        >
                                            <FaMinus size={12} />
                                        </button>
                                        
                                        <button
                                            onClick={() => handleRemoverItem(item.nome)}
                                            disabled={loading}
                                            className="text-red-500 hover:text-red-600 p-1 rounded transition disabled:opacity-50"
                                            title="Remover item"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                    
                                    <p className="font-bold text-green-600 min-w-[80px] text-right">
                                        R$ {(item.preco * item.quantidade).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Seu carrinho está vazio.</p>
                        <button
                            onClick={onClose}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                        >
                            Continuar Comprando
                        </button>
                    </div>
                )}

                {safeItens.length > 0 && (
                    <>
                        <div className="flex justify-between items-center border-t pt-4 mt-4">
                            <p className="text-lg font-semibold text-gray-800">Total</p>
                            <p className="text-xl font-bold text-blue-600">R$ {total.toFixed(2)}</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition"
                            >
                                Continuar Comprando
                            </button>
                            <button 
                                onClick={handleFinalizarCompra}
                                disabled={loading || safeItens.length === 0}
                                className={`flex-1 py-2 rounded-lg transition ${
                                    loading || safeItens.length === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            >
                                {loading ? 'Processando...' : 'Finalizar Compra'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}