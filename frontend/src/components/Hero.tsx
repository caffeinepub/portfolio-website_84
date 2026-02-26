import { useState } from 'react';
import { ArrowDown, Download, Sparkles, Pencil, Check, X, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetHeroSection, useUpdateHeroSection } from '@/hooks/useQueries';

export function Hero() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: heroText, isLoading } = useGetHeroSection();
  const updateHeroSection = useUpdateHeroSection();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const displayText = heroText ?? 'Software Developer & Blockchain Enthusiast';

  const handleStartEdit = () => {
    setEditValue(displayText);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const handleSave = async () => {
    await updateHeroSection.mutateAsync(editValue);
    setIsEditing(false);
  };

  const handleScrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Hero Banner Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1440x600.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(oklch(0.78 0.16 75) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.16 75) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              Available for freelance work
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient-gold">Alex Morgan</span>
            </h1>

            {/* Editable hero subtitle */}
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
              {isEditing ? (
                <div className="flex items-center gap-2 w-full max-w-xl">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-md bg-secondary border border-gold/60 text-foreground text-xl font-mono font-light focus:outline-none focus:border-gold"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    disabled={updateHeroSection.isPending}
                    className="p-1.5 rounded-md bg-gold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {updateHeroSection.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={updateHeroSection.isPending}
                    className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xl md:text-2xl text-muted-foreground font-light font-mono">
                    <span className="text-gold">{'<'}</span>
                    {isLoading ? 'Loading...' : displayText}
                    <span className="text-gold">{' />'}</span>
                  </p>
                  {isAuthenticated && (
                    <button
                      onClick={handleStartEdit}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all"
                      title="Edit hero subtitle"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              I craft elegant, performant web applications with a passion for clean code
              and exceptional user experiences. Specializing in React, Node.js, and
              cloud-native architectures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleScrollToPortfolio}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gold text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-gold"
              >
                View My Work
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border text-foreground font-semibold text-sm hover:border-gold hover:text-gold transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '40+', label: 'Projects Done' },
                { value: '20+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold font-serif text-gold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 scale-110 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-gold/20 scale-125" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold/50 glow-gold">
                <img
                  src="/assets/generated/profile-photo.dim_400x400.png"
                  alt="Alex Morgan - Full-Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-xl px-3 py-2 shadow-card">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Open to work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
