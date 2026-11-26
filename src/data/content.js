export const profile = {
  name: "Hailie Jade Ruiz",
  firstLine: "HAILIE",
  secondLine: "JADE RUIZ",
  program: "BS Information Technology",
  year: "3rd Year Student",
  tagline: "I build small tools in code, and design and edit in Canva and CapCut.",
  about:
    "I’m a third-year BSIT student interested in technology and creative digital work. I can program at a basic level, and I have experience in graphic design and video editing. I’ve also worked as a virtual assistant and in social media management. I’m still picking up new skills and open to opportunities.",
  quote: "I am always willing to learn new skills, explore opportunities, and improve my abilities.",
  birthday: "July 22, 2004",
  phone: "09053186064",
  phoneDisplay: "0905 318 6064",
  phoneHref: "+639053186064",
  email: "202311677@gordoncollege.edu.ph",
};

export const typedStrings = [
  "Programming in C, C# & Python",
  "Graphic design with Canva",
  "Video editing with CapCut",
  "Virtual assistance",
  "Social media management",
];

export const skills = [
  { id: "programming", icon: "code", title: "Programming", items: ["C", "C#", "Python"], note: "Basic" },
  { id: "design", icon: "palette", title: "Graphic Design", items: ["Canva"], note: "Hands-on" },
  { id: "video", icon: "film", title: "Video Editing", items: ["CapCut"], note: "Basic" },
  { id: "va", icon: "headset", title: "Virtual Assistance", items: ["Previous VA experience"], note: "Hands-on" },
  { id: "smm", icon: "megaphone", title: "Social Media Management", items: ["Previous SMM experience"], note: "Hands-on" },
];

export const toolGroups = [
  { title: "Google Workspace", items: ["Google Docs", "Google Sheets", "Google Slides", "Google Drive"] },
  { title: "Microsoft Office", items: ["Microsoft Word", "Excel", "PowerPoint"] },
  { title: "Programming Tools", items: ["Visual Studio Code", "Visual Studio", "Python IDLE"] },
  { title: "Database Tools", items: ["MySQL", "XAMPP", "phpMyAdmin"] },
  { title: "Design Tools", items: ["Canva"] },
  { title: "Video Editing", items: ["CapCut"] },
  { title: "Version Control", items: ["Git", "GitHub"] },
];

export const projects = [
  {
    id: "faithevents",
    title: "FaithEvents",
    subtitle: "Church Event Management and Attendance Tracking",
    description: "A web-based system for planning church events and recording attendance with QR code check-in.",
    points: [
      "Leaders plan events and open check-in",
      "Members check in by scanning a QR code",
      "Live attendance count for every event",
    ],
    tags: ["QR Code", "Event Management", "Attendance Tracking", "Agile", "SDG 11"],
  },
];

export const toolCount = toolGroups.reduce((n, g) => n + g.items.length, 0);
