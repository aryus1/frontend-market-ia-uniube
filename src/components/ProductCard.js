export default function ProductCard({ nome, preco, quantidade, imagem }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 hover:shadow-lg transition cursor-pointer">
      <img
        src={imagem}
        alt={nome}
        className="w-24 h-24 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{nome}</h3>
      <p className="text-gray-600 text-sm">Estoque: {quantidade}</p>
      <p className="text-green-600 font-bold text-lg mt-2">
        R$ {preco.toFixed(2)}
      </p>
      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
        Adicionar ao Carrinho
      </button>
    </div>
  );
}