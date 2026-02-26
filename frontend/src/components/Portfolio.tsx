import { useState } from 'react';
import { Plus, Loader2, X, Check } from 'lucide-react';
import { ProjectCard, type ProjectCardData } from './ProjectCard';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import {
  useGetAllProjects,
  useAddProject,
  useUpdateProject,
  useDeleteProject,
} from '@/hooks/useQueries';
import type { Project } from '@/backend';

interface ProjectFormData {
  title: string;
  description: string;
  githubLink: string;
}

const EMPTY_FORM: ProjectFormData = { title: '', description: '', githubLink: '' };

function generateId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

interface ProjectFormProps {
  initial?: ProjectFormData;
  onSave: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
  title: string;
}

function ProjectForm({ initial = EMPTY_FORM, onSave, onCancel, isSaving, title }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>(initial);

  const handleChange = (field: keyof ProjectFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card border border-gold/40 rounded-2xl p-6 space-y-4">
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      <div>
        <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
          Project Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="My Awesome Project"
          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your project..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
          GitHub Link
        </label>
        <input
          type="url"
          value={form.githubLink}
          onChange={(e) => handleChange('githubLink', e.target.value)}
          placeholder="https://github.com/username/repo"
          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onSave(form)}
          disabled={isSaving || !form.title.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save Project
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm font-medium hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export function Portfolio() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: projects = [], isLoading } = useGetAllProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = async (data: ProjectFormData) => {
    const newProject: Project = {
      id: generateId(),
      title: data.title,
      description: data.description,
      githubLink: data.githubLink,
    };
    await addProject.mutateAsync(newProject);
    setShowAddForm(false);
  };

  const handleEdit = (project: ProjectCardData) => {
    const backendProject: Project = {
      id: project.id,
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
    };
    setEditingProject(backendProject);
  };

  const handleUpdate = async (data: ProjectFormData) => {
    if (!editingProject) return;
    await updateProject.mutateAsync({
      id: editingProject.id,
      project: {
        id: editingProject.id,
        title: data.title,
        description: data.description,
        githubLink: data.githubLink,
      },
    });
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProject.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-mono font-medium tracking-widest uppercase mb-3">
            // my_work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-base">
            A selection of projects I've built — from side experiments to production systems
            serving thousands of users.
          </p>
        </div>

        {/* Owner: Add Project Button */}
        {isAuthenticated && !showAddForm && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold/10 border border-gold/40 text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        )}

        {/* Add Project Form */}
        {showAddForm && (
          <div className="mb-8">
            <ProjectForm
              title="Add New Project"
              onSave={handleAdd}
              onCancel={() => setShowAddForm(false)}
              isSaving={addProject.isPending}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4 animate-pulse">
                <div className="h-6 bg-secondary rounded w-3/4" />
                <div className="h-16 bg-secondary rounded" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) =>
              editingProject?.id === project.id ? (
                <div key={project.id} className="md:col-span-2 lg:col-span-3">
                  <ProjectForm
                    title="Edit Project"
                    initial={{
                      title: project.title,
                      description: project.description,
                      githubLink: project.githubLink,
                    }}
                    onSave={handleUpdate}
                    onCancel={() => setEditingProject(null)}
                    isSaving={updateProject.isPending}
                  />
                </div>
              ) : (
                <div key={project.id} className={`relative ${deletingId === project.id ? 'opacity-50 pointer-events-none' : ''}`}>
                  {deletingId === project.id && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-gold" />
                    </div>
                  )}
                  <ProjectCard
                    project={project}
                    onEdit={isAuthenticated ? handleEdit : undefined}
                    onDelete={isAuthenticated ? handleDelete : undefined}
                  />
                </div>
              )
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-base mb-4">No projects yet.</p>
            {isAuthenticated && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Add Your First Project
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
