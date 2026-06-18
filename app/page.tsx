import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Games from "@/components/Games";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <Navbar />
      <Hero />
      <Games />
      <Stats />
      <Footer />

    </main>
  );
}