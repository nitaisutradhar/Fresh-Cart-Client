import { motion } from "framer-motion"
import { Link } from "react-router"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
return (
    <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gray-50 text-gray-700 mt-12 border-t border-gray-200"
    >
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                    <img src="/logo.png" alt="logo" className="h-8 w-8" />
                    <span>FreshCart</span>
                </Link>
                <p className="text-sm mt-2">
                    Your trusted daily price tracker for local markets.
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/" className="hover:text-primary">Home</Link></li>
                    <li><Link to="/all-products" className="hover:text-primary">All Products</Link></li>
                    <li><Link to="/offers" className="hover:text-primary">Offers</Link></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800">Contact</h4>
                <ul className="space-y-2 text-sm">
                    <li>Email: support@freshcart.com</li>
                    <li>Phone: +880 1234 567890</li>
                    <li>Location: Dhaka, Bangladesh</li>
                </ul>
            </div>

            {/* Social / Legal */}
            <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800">Connect With Us</h4>
                <div className="flex gap-4 text-lg text-gray-600">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><FaFacebookF /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><FaInstagram /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><FaTwitter /></a>
                </div>
                <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
            </div>
        </div>
    </motion.footer>
)
}

export default Footer
