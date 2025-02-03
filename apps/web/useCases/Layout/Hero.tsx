import FeatureCard from "@utils/components/self/featureCard";
import { Download, Palette, Shapes, Sparkles, Wand2 } from "lucide-react";
import { UserPlus as Follow } from "lucide-react";
export default function Hero() {
  return (
    <>
      <header className="pt-60 pb-40 relative bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Create, Collaborate, and Sketch in Sync!
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Transform your creative vision into stunning digital artwork with our professional-grade tools.
              Experience the freedom of limitless possibilities.
            </p>
            <div className="flex justify-center space-x-6">
              <button className="bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 px-8 py-4 rounded-full font-medium text-lg text-black transition-all hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/50 group">
                <span className="flex items-center">
                  Start Creating Free
                  <Wand2 className="w-5 h-5 ml-2 transition-transform group-hover:rotate-12" />
                </span>
              </button>
              <button className="border border-white/20 hover:border-cyan-400 px-8 py-4 rounded-full font-medium text-lg transition-all hover:bg-white/10">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to bring your artistic vision to life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Palette}
              title="Professional Tools"
              description="Access a comprehensive suite of brushes, pens, and tools designed for professional artists."
            />
            <FeatureCard
              icon={Sparkles}
              title="AI Enhancement"
              description="Enhance your artwork with AI-powered tools that help perfect your creations."
            />
            <FeatureCard
              icon={Shapes}
              title="Vector Support"
              description="Create scalable artwork with full vector support and shape manipulation."
            />
          </div>
        </div>
      </section>

      <section id="gallery" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">Featured Artworks</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover what artists are creating with Canvas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1000&q=80",
            ].map((src, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/40">
                <img
                  src={src}
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Artist Name</h3>
                    <p className="text-gray-300">Created with Canvas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center relative overflow-hidden shadow-lg shadow-cyan-500/20">
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                Start Your Creative Journey
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Join thousands of artists who have already discovered their creative potential with Canvas.
              </p>
              <button className="bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black hover:opacity-90 px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50 group">
                <span className="flex items-center">
                  Follow Me
                  <Follow className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
