import { ExternalLink, Github, Pencil, Trash2 } from 'lucide-react';

export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  githubLink: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  onEdit?: (project: ProjectCardData) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const isOwner = !!(onEdit || onDelete);

  return (
    <article className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-card-hover flex flex-col">
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Owner action buttons */}
      {isOwner && (
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="p-1.5 rounded-md bg-card border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-all shadow-sm"
              title="Edit project"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="p-1.5 rounded-md bg-card border border-border text-muted-foreground hover:text-red-400 hover:border-red-400/40 transition-all shadow-sm"
              title="Delete project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-200 pr-16">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          )}
          {!project.githubLink && (
            <span className="text-xs text-muted-foreground/50 italic">No link provided</span>
          )}
          <a
            href={project.githubLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-bright transition-colors ml-auto"
          >
            View Project
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
