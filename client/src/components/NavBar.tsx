
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-zinc-900/95 backdrop-blur-lg shadow-sm py-3 text-zinc-50' : 'bg-zinc-50 py-3'
      )}
    >
      <div className="container md:px-8 px-4 mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-xl tracking-tight transition-opacity hover:opacity-80 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>
          Product Web App
        </Link>

        <div className="hidden md:flex items-center">
          <Link to="/cart" className="relative">
            <ShoppingBag className="h-6 w-6 transition-all hover:opacity-80" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF0102] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-4">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
