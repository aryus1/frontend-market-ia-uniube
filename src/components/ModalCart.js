import { FaTimes } from "react-icons/fa";

export default function ModalCarrinho({ isOpen, onClose, itens = [] }) {
    if (!isOpen) return null;

    const safeItens = Array.isArray(itens) ? itens : [];

    const total = safeItens.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-xl p-6 relative overflow-y-auto max-h-[80vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Carrinho</h2>

                {safeItens && safeItens.length > 0 ? (
                    <div className="space-y-4">
                        {safeItens.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.imagem}
                                        alt={item.nome}
                                        className="w-12 h-12 object-contain"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{item.nome}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantidade}x R$ {item.preco.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-bold text-green-600">
                                    R$ {(item.preco * item.quantidade).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Seu carrinho está vazio.</p>
                )}

                <div className="flex justify-between items-center border-t pt-4 mt-4">
                    <p className="text-lg font-semibold text-gray-800">Total</p>
                    <p className="text-xl font-bold text-blue-600">R$ {total.toFixed(2)}</p>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-4 transition">
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
}