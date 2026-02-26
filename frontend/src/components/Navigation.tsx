import { useState, useEffect } from 'react';
import { Menu, X, Code2, LogIn, LogOut, Loader2 } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['home', 'about', 'skills', 'portfolio', 'contact'];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-card'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-serif font-semibold text-lg text-foreground group-hover:text-gold transition-colors">
            Alex<span className="text-gold">.</span>Dev
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'text-gold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-200"
          >
            Hire Me
          </a>
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 disabled:opacity-50 ${
              isAuthenticated
                ? 'border border-border text-muted-foreground hover:border-gold/40 hover:text-gold'
                : 'bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'
            }`}
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isAuthenticated ? (
              <LogOut className="w-4 h-4" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border shadow-card">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-gold bg-gold/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="block px-4 py-3 text-sm font-medium text-center rounded-md border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all"
              >
                Hire Me
              </a>
            </li>
            <li className="pt-1">
              <button
                onClick={() => { setIsMenuOpen(false); handleAuth(); }}
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-all disabled:opacity-50 ${
                  isAuthenticated
                    ? 'border border-border text-muted-foreground hover:border-gold/40 hover:text-gold'
                    : 'bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'
                }`}
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isAuthenticated ? (
                  <LogOut className="w-4 h-4" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
