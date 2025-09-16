import { FaTimes, FaUserPlus, FaSignInAlt, FaBox, FaCartPlus, FaShoppingCart, FaCashRegister, FaSignOutAlt, FaList } from "react-icons/fa";

export default function ModalVoiceCommands({ isOpen, onClose }) {
  if (!isOpen) return null;

  const commands = [
    {
      category: "Usuário",
      items: [
        { words: "cadastrar", action: "Cadastrar novo usuário", icon: <FaUserPlus /> },
        { words: "login, entrar, acessar", action: "Entrar no sistema", icon: <FaSignInAlt /> },
        { words: "sair, terminar, fechar", action: "Encerrar sistema", icon: <FaSignOutAlt /> },
      ],
    },
    {
      category: "Produtos",
      items: [
        { words: "cadastrar, adicionar", action: "Cadastrar produto", icon: <FaBox /> },
        { words: "listar, mostrar, ver", action: "Listar produtos", icon: <FaList /> },
        { words: "atualizar, alterar, mudar", action: "Atualizar produto", icon: <FaBox /> },
        { words: "remover, excluir, deletar", action: "Remover produto", icon: <FaBox /> },
      ],
    },
    {
      category: "Carrinho",
      items: [
        { words: "comprar, adicionar carrinho", action: "Adicionar ao carrinho", icon: <FaCartPlus /> },
        { words: "carrinho, meu carrinho", action: "Ver carrinho", icon: <FaShoppingCart /> },
        { words: "finalizar, concluir, checkout", action: "Finalizar compra", icon: <FaCashRegister /> },
        { words: "remover, excluir, deletar", action: "Remover do carrinho", icon: <FaBox /> },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-2xl rounded-2xl shadow-xl p-6 relative overflow-y-auto max-h-[80vh]">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎤 Comandos de Voz</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Fale os comandos abaixo para interagir com o sistema.
        </p>

        <div className="space-y-6">
          {commands.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{section.category}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {section.items.map((cmd, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-xl shadow-sm transition"
                  >
                    <div className="text-blue-600 mt-1">{cmd.icon}</div>
                    <div>
                      <p className="font-medium text-gray-800">{cmd.action}</p>
                      <p className="text-sm text-gray-500">Diga: <span className="italic">{cmd.words}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}