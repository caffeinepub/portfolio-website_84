import { useState } from 'react';
import { MapPin, Mail, Calendar, Coffee, Pencil, Check, X, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetBio, useUpdateBio, useGetAbout, useUpdateAbout } from '@/hooks/useQueries';

export function About() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: bioText, isLoading: bioLoading } = useGetBio();
  const { data: aboutText, isLoading: aboutLoading } = useGetAbout();
  const updateBio = useUpdateBio();
  const updateAbout = useUpdateAbout();

  const [editingBio, setEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState('');

  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutValue, setAboutValue] = useState('');

  const displayBio = bioText ?? '';
  const displayAbout = aboutText ?? '';

  const handleStartEditBio = () => {
    setBioValue(displayBio);
    setEditingBio(true);
  };

  const handleSaveBio = async () => {
    await updateBio.mutateAsync(bioValue);
    setEditingBio(false);
  };

  const handleStartEditAbout = () => {
    setAboutValue(displayAbout);
    setEditingAbout(true);
  };

  const handleSaveAbout = async () => {
    await updateAbout.mutateAsync(aboutValue);
    setEditingAbout(false);
  };

  const PERSONAL_DETAILS = [
    { icon: Mail, label: 'Email', value: 'alex.morgan@example.com', href: 'mailto:alex.morgan@example.com' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null },
    { icon: Calendar, label: 'Experience', value: '5+ Years', href: null },
    { icon: Coffee, label: 'Availability', value: 'Freelance / Full-time', href: null },
  ];

  return (
    <section id="about" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-mono font-medium tracking-widest uppercase mb-3">
            // about_me
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Who I Am
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="space-y-6">
            {/* Main bio from backend */}
            <div className="relative group/bio">
              {editingBio ? (
                <div className="space-y-3">
                  <textarea
                    value={bioValue}
                    onChange={(e) => setBioValue(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gold/60 text-foreground text-sm leading-relaxed focus:outline-none focus:border-gold resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveBio}
                      disabled={updateBio.isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gold text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {updateBio.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBio(false)}
                      disabled={updateBio.isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-muted-foreground text-xs font-medium hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <p className="text-muted-foreground leading-relaxed text-base flex-1">
                    {bioLoading ? (
                      <span className="inline-block w-full h-20 bg-secondary rounded animate-pulse" />
                    ) : (
                      displayBio
                    )}
                  </p>
                  {isAuthenticated && !bioLoading && (
                    <button
                      onClick={handleStartEditBio}
                      className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all opacity-0 group-hover/bio:opacity-100"
                      title="Edit bio"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* About text from backend */}
            <div className="relative group/about">
              {editingAbout ? (
                <div className="space-y-3">
                  <textarea
                    value={aboutValue}
                    onChange={(e) => setAboutValue(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gold/60 text-foreground text-sm leading-relaxed focus:outline-none focus:border-gold resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveAbout}
                      disabled={updateAbout.isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gold text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {updateAbout.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => setEditingAbout(false)}
                      disabled={updateAbout.isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-muted-foreground text-xs font-medium hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <p className="text-muted-foreground leading-relaxed text-base flex-1">
                    {aboutLoading ? (
                      <span className="inline-block w-full h-12 bg-secondary rounded animate-pulse" />
                    ) : (
                      displayAbout
                    )}
                  </p>
                  {isAuthenticated && !aboutLoading && (
                    <button
                      onClick={handleStartEditAbout}
                      className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all opacity-0 group-hover/about:opacity-100"
                      title="Edit about"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-gold font-medium text-sm hover:underline underline-offset-4 transition-all"
              >
                Let's work together →
              </a>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PERSONAL_DETAILS.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold/40 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
