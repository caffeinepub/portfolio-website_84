import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Integrate access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Project = {
    id : Text;
    title : Text;
    description : Text;
    githubLink : Text;
  };

  type ContactInfo = {
    email : Text;
    phone : Text;
    github : Text;
    location : Text;
  };

  type UserProfile = {
    name : Text;
  };

  // Actor state
  var bio : Text = "I am a passionate developer specializing in the Internet Computer blockchain. My portfolio demonstrates cutting-edge dApps built with Motoko, Rust, and TypeScript. Welcome to my world of innovation and smart contracts!";
  var about : Text = "Currently working at Google L4, Oxford alumni.";
  var heroSection : Text = "Software Developer & Blockchain Enthusiast";
  var profileImage : Text = "https://ih0.redbubble.net/image.994404769.8866/flat,1000x1000,075,f.u3.jpg";

  // Projects stored in persistent Map
  let projects = Map.empty<Text, Project>();

  // User profiles stored in persistent Map
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Contact info stored in a persistent variable
  var contactInfo : ContactInfo = {
    email = "kristof@example.com";
    phone = "+44 123 456 7890";
    github = "https://github.com/kristof";
    location = "United Kingdom";
  };

  // USER PROFILE FUNCTIONS

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // PROJECT FUNCTIONS

  public shared ({ caller }) func addProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add projects");
    };
    projects.add(project.id, project);
  };

  public shared ({ caller }) func updateProject(id : Text, project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    switch (projects.get(id)) {
      case (null) {
        Runtime.trap("Project not found");
      };
      case (?_) {
        projects.add(id, project);
      };
    };
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    projects.remove(id);
  };

  // PUBLIC QUERY FUNCTIONS (no auth required — read-only portfolio data)

  public query func getAllProjects() : async [Project] {
    projects.values().toArray();
  };

  public query func getProject(id : Text) : async ?Project {
    projects.get(id);
  };

  public query func getBio() : async Text {
    bio;
  };

  public query func getAbout() : async Text {
    about;
  };

  public query func getHeroSection() : async Text {
    heroSection;
  };

  public query func getProfileImage() : async Text {
    profileImage;
  };

  public query func getContactInfo() : async ContactInfo {
    contactInfo;
  };

  // ADMIN UPDATE FUNCTIONS

  public shared ({ caller }) func updateBio(newBio : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update bio");
    };
    bio := newBio;
  };

  public shared ({ caller }) func updateAbout(newAbout : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update about");
    };
    about := newAbout;
  };

  public shared ({ caller }) func updateHeroSection(newHero : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update hero section");
    };
    heroSection := newHero;
  };

  public shared ({ caller }) func updateProfileImage(newImage : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update profile image");
    };
    profileImage := newImage;
  };

  public shared ({ caller }) func updateContactInfo(newContact : ContactInfo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update contact info");
    };
    contactInfo := newContact;
  };
};
