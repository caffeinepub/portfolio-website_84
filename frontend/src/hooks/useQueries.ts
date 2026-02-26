import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Project, ContactInfo, UserProfile } from '@/backend';

// ─── Profile ────────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Hero Section ────────────────────────────────────────────────────────────

export function useGetHeroSection() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['heroSection'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getHeroSection();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHeroSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newHero: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHeroSection(newHero);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroSection'] });
    },
  });
}

// ─── Bio ─────────────────────────────────────────────────────────────────────

export function useGetBio() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['bio'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getBio();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateBio() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBio: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBio(newBio);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bio'] });
    },
  });
}

// ─── About ───────────────────────────────────────────────────────────────────

export function useGetAbout() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['about'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getAbout();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAbout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAbout: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAbout(newAbout);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
    },
  });
}

// ─── Contact Info ─────────────────────────────────────────────────────────────

export function useGetContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInfo>({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) {
        return { email: '', phone: '', github: '', location: '' };
      }
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContact: ContactInfo) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateContactInfo(newContact);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
    },
  });
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Project) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addProject(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, project }: { id: string; project: Project }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProject(id, project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// ─── Admin check ──────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
