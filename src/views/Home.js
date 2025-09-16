import ProductCard from "../components/ProductCard";
import ModalCart from "../components/ModalCart";
import Header from "../components/Header";
import AsideMenu from "../components/AsideMenu";
import { useState } from "react";
import produtosData from "../mocks/products.json";
import arrozImg from "../assets/productImages/arroz.png";
import feijaoImg from "../assets/productImages/feijao.png";
import acucarImg from "../assets/productImages/acucar.png";
import cafeImg from "../assets/productImages/cafe.png";
import oleoImg from "../assets/productImages/oleoSoja.png";
import macarraoImg from "../assets/productImages/macarrao.png";

const imagens = {
    "arroz.png": arrozImg,
    "feijao.png": feijaoImg,
    "acucar.png": acucarImg,
    "cafe.png": cafeImg,
    "oleoSoja.png": oleoImg,
    "macarrao.png": macarraoImg,
};

export default function Home() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [carrinho,] = useState([
        { ...produtosData.produtos[0], quantidade: 2, imagem: imagens["arroz.png"] },
        { ...produtosData.produtos[3], quantidade: 1, imagem: imagens["cafe.png"] },
        { ...produtosData.produtos[5], quantidade: 3, imagem: imagens["macarrao.png"] },
    ]);

    return (
        <div className="flex">
            <AsideMenu />

            <div className="flex-1 flex flex-col">
                <Header
                    onOpenCart={() => setIsCartOpen(true)}
                    cartCount={carrinho.length}
                />

                <main className="flex-1 p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Produtos</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {produtosData.produtos.map((produto) => (
                            <ProductCard
                                key={produto.id}
                                nome={produto.nome}
                                preco={produto.preco}
                                quantidade={produto.quantidade}
                                imagem={imagens[produto.imagem]}
                            />
                        ))}
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