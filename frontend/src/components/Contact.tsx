import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Pencil, Check, X, Loader2 } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX, SiInstagram } from 'react-icons/si';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetContactInfo, useUpdateContactInfo } from '@/hooks/useQueries';
import type { ContactInfo } from '@/backend';

export function Contact() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: contactInfo, isLoading } = useGetContactInfo();
  const updateContactInfo = useUpdateContactInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ContactInfo>({
    email: '',
    phone: '',
    github: '',
    location: '',
  });

  const handleStartEdit = () => {
    if (!contactInfo) return;
    setEditForm({ ...contactInfo });
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateContactInfo.mutateAsync(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const email = contactInfo?.email ?? '';
  const phone = contactInfo?.phone ?? '';
  const location = contactInfo?.location ?? '';
  const github = contactInfo?.github ?? '';

  const CONTACT_ITEMS = [
    { icon: Mail, label: 'Email', value: email, href: email ? `mailto:${email}` : null },
    { icon: MapPin, label: 'Location', value: location, href: null },
    { icon: Phone, label: 'Phone', value: phone, href: phone ? `tel:${phone.replace(/\s/g, '')}` : null },
  ];

  const SOCIAL_LINKS = [
    { icon: SiGithub, label: 'GitHub', href: github, username: github ? github.replace('https://github.com/', '@') : '@github' },
    { icon: SiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', username: 'Alex Morgan' },
    { icon: SiX, label: 'X (Twitter)', href: 'https://x.com', username: '@alexmorgan_dev' },
    { icon: SiInstagram, label: 'Instagram', href: 'https://instagram.com', username: '@alexmorgan' },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-mono font-medium tracking-widest uppercase mb-3">
            // get_in_touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Let's Connect
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-base">
            Have a project in mind or just want to say hello? I'd love to hear from you.
            Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  Contact Information
                </h3>
                {isAuthenticated && !isEditing && !isLoading && (
                  <button
                    onClick={handleStartEdit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground border border-border hover:text-gold hover:border-gold/40 text-xs font-medium transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={editForm.github}
                      onChange={(e) => setEditForm((f) => ({ ...f, github: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={updateContactInfo.isPending}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {updateContactInfo.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={updateContactInfo.isPending}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm font-medium hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {isLoading
                    ? [1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-secondary animate-pulse flex-shrink-0" />
                          <div className="space-y-1.5 flex-1">
                            <div className="h-3 bg-secondary rounded w-16 animate-pulse" />
                            <div className="h-4 bg-secondary rounded w-40 animate-pulse" />
                          </div>
                        </div>
                      ))
                    : CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                        <div key={label} className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                            <Icon className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                            {href ? (
                              <a href={href} className="text-sm font-medium text-foreground hover:text-gold transition-colors">
                                {value || '—'}
                              </a>
                            ) : (
                              <p className="text-sm font-medium text-foreground">{value || '—'}</p>
                            )}
                          </div>
                        </div>
                      ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-5">
                Find Me Online
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, username }) => (
                  <a
                    key={label}
                    href={href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground truncate">{username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Message Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Send a Message
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Fill out the form and I'll get back to you within 24 hours.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-gold"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
