export const personalInfo = {
  name: "Abhay Kant",
  role: "Full Stack Developer & CS Student",
  taglines: [
    "Building scalable web applications",
    "Solving complex problems with code",
    "Turning ideas into reality",
    "Passionate about clean architecture",
  ],
  about: `I'm a B.Tech Computer Science student with a deep passion for software engineering,
  competitive programming, and building products that make an impact. I love working across
  the full stack — from crafting pixel-perfect UIs to designing efficient backend systems.
  When I'm not coding, you'll find me exploring new technologies, contributing to open-source,
  or sharpening my problem-solving skills on coding platforms.`,
  resumeUrl: "/resume.pdf", // TODO: Place your resume.pdf inside frontend/public folder
  email: "abhaykant1030206@gmail.com",
  socials: {
    github: "https://github.com/fun-apricity",
    linkedin: "https://linkedin.com/in/abhay",
    leetcode: "https://leetcode.com/u/_apricity_/"
  }
};

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "C++", icon: "SiCplusplus", level: 90 },
      { name: "Python", icon: "SiPython", level: 85 },
      { name: "JavaScript", icon: "SiJavascript", level: 88 },
      { name: "TypeScript", icon: "SiTypescript", level: 75 },
      { name: "Java", icon: "FaJava", level: 70 },
      { name: "SQL", icon: "SiMysql", level: 80 },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React", icon: "SiReact", level: 88 },
      { name: "Next.js", icon: "SiNextdotjs", level: 75 },
      { name: "Node.js", icon: "SiNodedotjs", level: 82 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", level: 90 },
      { name: "MongoDB", icon: "SiMongodb", level: 78 },
      { name: "Express.js", icon: "SiExpress", level: 80 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", icon: "SiGit", level: 88 },
      { name: "Docker", icon: "SiDocker", level: 65 },
      { name: "Linux", icon: "SiLinux", level: 75 },
      { name: "VS Code", icon: "SiGit", level: 92 },
      { name: "Figma", icon: "SiFigma", level: 60 },
      { name: "Postman", icon: "SiPostman", level: 80 },
    ],
  },
  {
    category: "Core CS",
    items: [
      { name: "DSA", icon: "FaProjectDiagram", level: 90 },
      { name: "OS", icon: "FaDesktop", level: 78 },
      { name: "DBMS", icon: "FaDatabase", level: 82 },
      { name: "CN", icon: "FaNetworkWired", level: 75 },
      { name: "OOP", icon: "FaCubes", level: 88 },
      { name: "System Design", icon: "FaSitemap", level: 70 },
    ],
  },
];

export const projects = [
  {
    title: "Alumnet",
    description:
      "A comprehensive alumni networking platform designed to connect students with graduates. Features include mentorship matching, job boards, and automated networking events.",
    tags: ["React", "Express platform", "MongoDB", "Networking"],
    github: "",
    live: "",
    image: null,
  },
  {
    title: "DevConnect",
    description:
      "A full-stack social platform for developers to share projects, collaborate, and connect. Features real-time chat, project showcases, and developer profiles.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "",
    live: "",
    image: null,
  },
  {
    title: "CodeArena",
    description:
      "An online competitive programming judge supporting multiple languages with real-time submissions, leaderboards, and problem curation.",
    tags: ["Next.js", "Docker", "PostgreSQL", "Redis"],
    github: "",
    live: "",
    image: null,
  },
  {
    title: "FinTrack",
    description:
      "A personal finance tracker with AI-powered spending insights, budget management, and interactive charts for visualizing spending patterns.",
    tags: ["React", "Python", "Flask", "Chart.js"],
    github: "",
    live: "",
    image: null,
  },
  {
    title: "SmartNotes",
    description:
      "An intelligent note-taking app with Markdown support, AI-generated summaries, tagging system, and real-time collaboration features.",
    tags: ["TypeScript", "Next.js", "Prisma", "OpenAI"],
    github: "",
    live: "",
    image: null,
  },
];

export const codingProfiles = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/abhay",
    icon: "FaLinkedin",
    color: "#0077B5",
  },
  {
    name: "GitHub",
    url: "https://github.com/fun-apricity",
    icon: "FaGithub",
    color: "#ffffff",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/_apricity_/",
    icon: "SiLeetcode",
    color: "#FFA116",
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/",
    icon: "SiCodeforces",
    color: "#1F8ACB",
  },
  {
    name: "HackerRank",
    url: "https://hackerrank.com/",
    icon: "FaHackerrank",
    color: "#00EA64",
  },
];

export const navLinks = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Profiles", href: "profiles" },
  { name: "Contact", href: "contact" },
];
