const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Python / FastAPI', level: 80 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    category: 'Tools & Cloud',
    skills: [
      { name: 'Docker / Kubernetes', level: 82 },
      { name: 'AWS / GCP', level: 80 },
      { name: 'Git / CI/CD', level: 90 },
      { name: 'Figma / Design', level: 70 },
    ],
  },
];

const TECH_TAGS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
  'Docker', 'AWS', 'GraphQL', 'REST APIs', 'Tailwind', 'Next.js',
  'Redis', 'Kubernetes', 'CI/CD', 'Figma',
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-mono font-medium tracking-widest uppercase mb-3">
            // my_skills
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            What I Do
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Skill Bars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                {cat.category}
              </h3>
              <div className="space-y-5">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-gold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold-bright transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Tags */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 font-mono">Technologies I work with:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-border text-muted-foreground hover:border-gold/50 hover:text-gold transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
