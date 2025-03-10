
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
// import Demo from './components/Demo';
import AboutSection from './components/AboutSection';


const App = () => {
  
  return (
    <div>
     <Navbar/>
     <div className="max-w-7xl mx-auto pt-20 px-6">
     <section id="home">
          <HeroSection />
        </section>
        
        <section id="features">
          <FeatureSection />
        </section>

        {/* <section id="demo">
          <Demo />
        </section> */}

        <section id="about">
          <AboutSection/>
        </section>
     {/* <HeroSection/>
     <FeatureSection/>
     <Demo/>
     */}
     </div>
    
    </div>
  );
};

export default App;
