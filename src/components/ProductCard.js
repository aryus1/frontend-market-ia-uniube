export default function ProductCard({ nome, preco, quantidade, imagem, onAddToCart, disabled }) {
  const handleClick = () => {
    if (onAddToCart && !disabled && quantidade > 0) {
      onAddToCart();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 hover:shadow-lg transition">
      <img
        src={imagem}
        alt={nome}
        className="w-24 h-24 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{nome}</h3>
      <p className="text-gray-600 text-sm">
        Estoque: {quantidade}
        {quantidade === 0 && (
          <span className="text-red-500 font-medium ml-2">(Esgotado)</span>
        )}
      </p>
      <p className="text-green-600 font-bold text-lg mt-2">
        R$ {preco.toFixed(2)}
      </p>
      <button 
        onClick={handleClick}
        disabled={disabled || quantidade === 0}
        className={`mt-4 w-full px-4 py-2 rounded-lg transition ${
          disabled || quantidade === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
        }`}
      >
        {disabled ? 'Processando...' : 
         quantidade === 0 ? 'Indisponível' : 
         'Adicionar ao Carrinho'}
      </button>
    </div>
  );
}
