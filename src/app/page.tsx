import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Mission from './components/Mission';
import About from './components/About';
import VisionExecution from './components/VisionExecution';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-ink text-brand-ivory">
      <Navigation />
      <main>
        <Hero />
        <Mission />
        <Overview />
        <About />
        <VisionExecution />
        <Projects />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
