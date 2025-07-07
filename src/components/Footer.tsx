import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllNews } from "@/services/api";

const Footer = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllNews();
                const uniqueCats = Array.from(
                    new Set(data.map((item) => item.kategori.trim().toLowerCase()).filter(Boolean))
                );
                setCategories(uniqueCats.slice(0, 30));
            } catch (error) {
                console.error("Gagal ambil kategori untuk footer:", error);
            }
        };
        fetchCategories();
    }, []);

    const layananLinks = [
        { name: "Tentang Zentara", path: "/tentang" },
        { name: "Kebijakan Privasi", path: "/kebijakan-privasi" },
        { name: "Bantuan", path: "/bantuan" },
        { name: "Kontak", path: "/kontak" },
        { name: "FAQ", path: "/faq" },
        { name: "Panduan Komunitas", path: "/panduan-komunitas" },
    ];

    const perColumn = Math.ceil(categories.length / 3);
    const columns = [
        categories.slice(0, perColumn),
        categories.slice(perColumn, perColumn * 2),
        categories.slice(perColumn * 2),
    ];

    return (
        <footer className="bg-white text-black border-t">
            <div className="max-w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Kolom Logo - Mulai dari kolom ke-2, ambil 2 bagian */}
                    <div className="md:col-start-2 md:col-span-2 flex items-start">
                        <img
                            src="/assets/logo.png"
                            alt="Zentara Logo"
                            className="h-8 w-auto cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Kolom Kategori - Ambil 5 bagian */}
                    <div className="md:col-span-6">
                        <h3 className="text-lg font-semibold text-black tracking-wider mb-4">
                            Kategori Berita
                        </h3>
                        <div className="flex gap-6">
                            {columns.map((col, index) => (
                                <ul key={index} className="space-y-2 flex-1">
                                    {col.map((cat) => (
                                        <li key={cat}>
                                            <Link
                                                to={`/kategori/${cat.toLowerCase()}`}
                                                className="hover:text-blue-600 capitalize transition-colors"
                                            >
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/* Kolom Layanan - Ambil 3 bagian */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-black tracking-wider mb-4">Layanan</h3>
                        <ul className="space-y-2">
                            {layananLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-400 text-sm">
                    Copyright © {new Date().getFullYear()} Zentara. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;