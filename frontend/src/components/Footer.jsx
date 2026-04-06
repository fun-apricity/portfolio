import { personalInfo } from "../data/content";

const Footer = () => {
  return (
    <footer className="border-t border-gray-900 bg-transparent pt-16 pb-8">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="opacity-50 hover:opacity-100 transition-opacity">
          <span className="font-sans font-bold text-lg uppercase tracking-tight">
            {personalInfo.name}
          </span>
        </div>

        <div className="flex gap-6">
          <a href={personalInfo.socials?.github || "#"} target="_blank" rel="noopener noreferrer" className="mono-label text-gray-500 hover:text-white transition-colors cursor-none">GitHub</a>
          <a href={personalInfo.socials?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="mono-label text-gray-500 hover:text-white transition-colors cursor-none">LinkedIn</a>
          <a href={personalInfo.socials?.leetcode || "#"} target="_blank" rel="noopener noreferrer" className="mono-label text-gray-500 hover:text-white transition-colors cursor-none">LeetCode</a>
        </div>

        <div>
          <span className="mono-label text-gray-600">
            © {new Date().getFullYear()} — NAVIGATING PIXELS.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
