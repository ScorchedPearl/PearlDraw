import { Paintbrush2, Twitter, Dribbble, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Paintbrush2 className="w-7 h-7 text-cyan-400" />
              <span className="text-2xl font-bold text-white">Canvas</span>
            </div>
            <p className="text-gray-400">
              Empowering artists to create without limits.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Support", "Gallery"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
            { title: "Resources", links: ["Community", "Guides", "FAQs", "Partners"] },
            { title: "Legal", links: ["Privacy", "Terms", "Licensing", "Security"] },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/20 transition duration-300"
            >
              <Twitter className="w-5 h-5 text-gray-300 hover:text-cyan-400" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/20 transition duration-300"
            >
              <Dribbble className="w-5 h-5 text-gray-300 hover:text-cyan-400" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/20 transition duration-300"
            >
              <Github className="w-5 h-5 text-gray-300 hover:text-cyan-400" />
            </a>
          </div>
          <p>&copy; 2025 Canvas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
