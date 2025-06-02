import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDraweropen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDraweropen(!mobileDrawerOpen);
  };

  const handleScroll = (id) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait a moment for the navigation to complete
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Special handler for The-Deep-End
  const handleTheDeepEnd = () => {
    navigate('/thedeepend');
    setMobileDraweropen(false);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              
              <span className="text-xl tracking-tight">N-D-KeyCrypt</span>
            </Link>
          </div>

          {/* Desktop Navbar */}
          <ul className="hidden lg:flex ml-2 space-x-20">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.label === "The-Deep-End" ? (
                  <Link to="/thedeepend">{item.label}</Link>
                ) : (
                  <button onClick={() => handleScroll(item.href)}>{item.label}</button>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link 
              to="/codelab" 
              className="py-2 px-3 border rounded-md hover:bg-orange-500 hover:border-orange-500 transition-colors"
            >
              Code Lab
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  {item.label === "The-Deep-End" ? (
                    <button onClick={handleTheDeepEnd}>
                      {item.label}
                    </button>
                  ) : (
                    <button onClick={() => {
                      handleScroll(item.href);
                      setMobileDraweropen(false);
                    }}>
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <Link 
                to="/codelab" 
                className="py-2 px-3 border rounded-md hover:bg-orange-500 hover:border-orange-500 transition-colors"
                onClick={() => setMobileDraweropen(false)}
              >
                Code Lab
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;