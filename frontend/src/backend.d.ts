import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Project {
    id: string;
    title: string;
    githubLink: string;
    description: string;
}
export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    github: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProject(project: Project): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProject(id: string): Promise<void>;
    getAbout(): Promise<string>;
    getAllProjects(): Promise<Array<Project>>;
    getBio(): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getHeroSection(): Promise<string>;
    getProfileImage(): Promise<string>;
    getProject(id: string): Promise<Project | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAbout(newAbout: string): Promise<void>;
    updateBio(newBio: string): Promise<void>;
    updateContactInfo(newContact: ContactInfo): Promise<void>;
    updateHeroSection(newHero: string): Promise<void>;
    updateProfileImage(newImage: string): Promise<void>;
    updateProject(id: string, project: Project): Promise<void>;
}
