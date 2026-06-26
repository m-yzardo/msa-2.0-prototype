import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { MarconeLogoText } from "../MarconeLogoText";
import { Menu, X } from "lucide-react";

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <MarconeLogoText />
              <span className="text-xl font-semibold text-stone-900">MSA World</span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Desktop nav links */}
              <Link to="/about" className="hidden md:inline text-stone-700 hover:text-stone-900 px-4 py-2">
                About
              </Link>
              <Link to="/convention" className="hidden md:inline text-stone-700 hover:text-stone-900 px-4 py-2">
                Convention
              </Link>
              <Link to="/login" className="hidden md:inline text-stone-700 hover:text-stone-900 px-4 py-2">
                Login
              </Link>
              <Link to="/join" className="hidden md:inline bg-[#D7272D] text-white px-6 py-2.5 rounded-full hover:bg-[#b92127] transition-colors">
                Join MSA
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-full bg-stone-800 text-white transition-colors hover:bg-stone-700"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-100 bg-white px-4 py-4 space-y-1 shadow-lg">
            <Link to="/about" className="block px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium transition-colors">
              About
            </Link>
            <Link to="/convention" className="block px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium transition-colors">
              Convention
            </Link>
            <Link to="/login" className="block px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium transition-colors">
              Login
            </Link>
            <div className="pt-2">
              <Link to="/join" className="block text-center bg-[#D7272D] text-white px-6 py-3 rounded-full hover:bg-[#b92127] transition-colors font-semibold">
                Join MSA
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MarconeLogoText />
                <span className="font-semibold">MSA World</span>
              </div>
              <p className="text-stone-400 text-sm">
                The membership platform for the Marcone Servicers Association
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white">Technical Documents</a></li>
                <li><a href="#" className="hover:text-white">Webinars</a></li>
                <li><a href="#" className="hover:text-white">Training</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white">Ask a Trainer</a></li>
                <li><a href="#" className="hover:text-white">MSA Hotline</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link to="/about" className="hover:text-white">About MSA</Link></li>
                <li><Link to="/convention" className="hover:text-white">Annual Conference</Link></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-800 text-sm text-stone-400 text-center">
            © 2026 Marcone Servicers Association. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
