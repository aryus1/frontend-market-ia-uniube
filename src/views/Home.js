import ProductCard from "../components/ProductCard";
import ModalCart from "../components/ModalCart";
import Header from "../components/Header";
import AsideMenu from "../components/AsideMenu";
import { useState, useEffect } from "react";
import useStore from "../hooks/useStore";
import arrozImg from "../assets/productImages/arroz.png";
import feijaoImg from "../assets/productImages/feijao.png";
import acucarImg from "../assets/productImages/acucar.png";
import cafeImg from "../assets/productImages/cafe.png";
import oleoImg from "../assets/productImages/oleoSoja.png";
import macarraoImg from "../assets/productImages/macarrao.png";

const imagens = {
    "Arroz": arrozImg,
    "Feijão": feijaoImg,
    "Açúcar": acucarImg,
    "Café": cafeImg,
    "Óleo de Soja": oleoImg,
    "Macarrão": macarraoImg,
};

export default function Home() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    const {
        produtos,
        carrinho,
        loading,
        error,
        apiOnline,
        adicionarAoCarrinho,
        getQuantidadeTotalCarrinho
    } = useStore();

    // Função para adicionar produto ao carrinho
    const handleAdicionarProduto = async (produtoNome) => {
        const result = await adicionarAoCarrinho(produtoNome, 1);
        setNotification({
            message: result.message,
            type: result.success ? 'success' : 'error'
        });
        
        // Remove notificação após 3 segundos
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // Efeito para esconder notificação de erro após um tempo
    useEffect(() => {
        if (error) {
            setNotification({ message: error, type: 'error' });
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    }, [error]);

    return (
        <div className="flex">
            <AsideMenu />

            <div className="flex-1 flex flex-col">
                <Header
                    onOpenCart={() => setIsCartOpen(true)}
                    cartCount={getQuantidadeTotalCarrinho()}
                />

                <main className="flex-1 p-6 bg-gray-100 min-h-screen relative">
                    {/* Notificação */}
                    {notification && (
                        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
                            notification.type === 'success' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                        }`}>
                            {notification.message}
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
                            
                            {/* Indicador de status da API */}
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                                apiOnline 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    apiOnline ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></div>
                                {apiOnline ? 'API Conectada' : 'Modo Offline'}
                            </div>
                        </div>
                        
                        {loading && (
                            <div className="text-blue-500 font-medium">
                                Carregando...
                            </div>
                        )}
                    </div>

                    {/* Mensagem de erro global */}
                    {error && !notification && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {produtos.length > 0 ? (
                            produtos.map((produto, index) => (
                                <ProductCard
                                    key={produto.nome || index}
                                    nome={produto.nome}
                                    preco={produto.preco}
                                    quantidade={produto.quantidade}
                                    imagem={imagens[produto.nome] || arrozImg}
                                    onAddToCart={() => handleAdicionarProduto(produto.nome)}
                                    disabled={loading}
                                />
                            ))
                        ) : (
                            !loading && (
                                <div className="col-span-full text-center text-gray-500 py-8">
                                    Nenhum produto encontrado
                                </div>
                            )
                        )}
                    </div>
                </main>
            </div>

            <ModalCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                itens={carrinho}
            />
        </div>
    )
}