import { Heart, Code2 } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

export function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'portfolio-website');

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-gold flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-serif font-semibold text-foreground">
              Alex<span className="text-gold">.</span>Dev
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: SiGithub, href: 'https://github.com', label: 'GitHub' },
              { icon: SiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: SiX, href: 'https://x.com', label: 'X' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">
            © {year} Alex Morgan. Built with{' '}
            <Heart className="inline w-3 h-3 text-gold fill-gold" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        {/* Nav Links */}
        <div className="mt-8 pt-6 border-t border-border flex flex-wrap justify-center gap-6">
          {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
