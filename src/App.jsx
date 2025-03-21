import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Features from './components/Features';
import CodeLab from './components/CodeLab';
import CaesarCipherCompiler from './components/CaesarCipherCompiler';
import AnimatedEllipticCurve from './components/AnimatedEllipticCurve'; // Import the new component

// Layout component that includes Navbar and the background animation
const Layout = () => {
  return (
    <>
      <AnimatedEllipticCurve /> {/* Add the background animation */}
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6 relative z-10">
        <Outlet />
      </div>
    </>
  );
};

// HomePage component
const HomePage = () => {
  return (
    <>
      <section id="home">
        <HeroSection />
      </section>
      
      <section id="features">
        <Features />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
    </>
  );
};

// Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'codelab',
        element: <CodeLab />
      },
      {
        path: 'codelab/:algorithmId',
        element: <CaesarCipherCompiler />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;