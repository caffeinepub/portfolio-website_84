import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
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
  type Actor = {
    bio : Text;
    about : Text;
    heroSection : Text;
    profileImage : Text;
    projects : Map.Map<Text, Project>;
    userProfiles : Map.Map<Principal, UserProfile>;
    contactInfo : ContactInfo;
  };

  public func run(_old : {}) : Actor {
    let projects = Map.empty<Text, Project>();
    let userProfiles = Map.empty<Principal, UserProfile>();

    {
      bio = "I am a passionate developer specializing in the Internet Computer blockchain. My portfolio demonstrates cutting-edge dApps built with Motoko, Rust, and TypeScript. Welcome to my world of innovation and smart contracts!";
      about = "Currently working at Google L4, Oxford alumni.";
      heroSection = "Software Developer & Blockchain Enthusiast";
      profileImage = "https://ih0.redbubble.net/image.994404769.8866/flat,1000x1000,075,f.u3.jpg";
      projects;
      userProfiles;
      contactInfo = {
        email = "kristof@example.com";
        phone = "+44 123 456 7890";
        github = "https://github.com/kristof";
        location = "United Kingdom";
      };
    };
  };
};
