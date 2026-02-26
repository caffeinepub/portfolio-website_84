# Specification

## Summary
**Goal:** Add Internet Identity authentication so only the portfolio owner can log in and edit portfolio content, while unauthenticated visitors see the site in read-only mode.

**Planned changes:**
- Add a Login/Logout button to the Navigation bar (desktop and mobile) using the existing `useInternetIdentity` and `useActor` hooks, styled with the amber/gold theme
- Implement backend Motoko stable variables to store editable portfolio content (bio, projects, contact info) with public query functions and owner-principal-gated update functions
- Pre-populate default/seed data in the backend so the site renders correctly before any edits
- Show inline edit controls (text inputs, project add/remove forms) on Hero, About, and Portfolio sections only when the owner is authenticated
- Save edits by calling authenticated backend update functions, with changes persisted in stable variables and reflected via React Query refresh
- Unauthenticated visitors see the portfolio in read-only mode with no edit controls visible

**User-visible outcome:** The portfolio owner can log in with Internet Identity, edit bio, contact details, and project cards directly on the page, and save changes to the backend. All other visitors see the site in read-only mode.
