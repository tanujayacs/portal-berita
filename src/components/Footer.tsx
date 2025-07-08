import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllNews } from "@/services/api";
import {
    Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp, ExternalLink
} from "lucide-react";

const Footer = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
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

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const layananLinks = [
        { name: "Tentang Zentara", path: "/tentang" },
        { name: "Kebijakan Privasi", path: "/kebijakan-privasi" },
        { name: "Bantuan", path: "/bantuan" },
        { name: "Kontak", path: "/kontak" },
        { name: "FAQ", path: "/faq" },
        { name: "Panduan Komunitas", path: "/panduan-komunitas" },
    ];

    const socialLinks = [
        { icon: Facebook, name: "Facebook", url: "https://facebook.com/zentara" },
        { icon: Twitter, name: "Twitter", url: "https://twitter.com/zentara" },
        { icon: Instagram, name: "Instagram", url: "https://instagram.com/zentara" },
        { icon: Youtube, name: "YouTube", url: "https://youtube.com/zentara" },
    ];

    const contactInfo = [
        { icon: Mail, text: "contact@zentara.com" },
        { icon: Phone, text: "+62 812 3456 7890" },
        { icon: MapPin, text: "Yogyakarta, Indonesia" },
    ];

    const perColumn = Math.ceil(categories.length / 3);
    const columns = [
        categories.slice(0, perColumn),
        categories.slice(perColumn, perColumn * 2),
        categories.slice(perColumn * 2),
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white text-black relative overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/zentara.png"
                                alt="Zentara Logo"
                                className="w-12 h-12 object-cover rounded-xl"
                            />
                            <div>
                                <h3 className="text-2xl font-bold">Zentara</h3>
                                <p className="text-gray-500 text-sm">Portal Berita Digital</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Menyajikan informasi terpercaya dan terkini dari berbagai penjuru dunia.
                            Berkomitmen untuk memberikan berita yang akurat, mendalam, dan inspiratif.
                        </p>
                        <div className="space-y-3 mb-6">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 text-gray-600">
                                    <item.icon className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                                    title={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="lg:col-span-5">
                        <h3 className="text-xl font-bold mb-6">Kategori Berita</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {columns.map((col, index) => (
                                <ul key={index} className="space-y-3">
                                    {col.map((cat) => (
                                        <li key={cat}>
                                            <Link
                                                to={`/kategori/${cat.toLowerCase()}`}
                                                className="text-gray-600 hover:text-blue-600 capitalize text-sm"
                                            >
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xl font-bold mb-6">Layanan</h3>
                        <ul className="space-y-3">
                            {layananLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-600 hover:text-blue-600 text-sm flex items-center group"
                                    >
                                        <ExternalLink className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-300 text-center">
                    <p className="text-gray-500 text-sm">
                        Copyright © {new Date().getFullYear()} Zentara. All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Scroll to Top */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition transform hover:scale-110 shadow-lg z-50"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}
        </footer>
    );
};

export default Footer;