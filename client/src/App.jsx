import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import CustomCursor from './components/common/CustomCursor.jsx';
import LoadingScreen from './components/common/LoadingScreen.jsx';
import WaveDivider from './components/common/WaveDivider.jsx';
import ScrollScene from './components/common/ScrollScene.jsx';

const FloatingGeometry = lazy(() => import('./components/3d/FloatingGeometry.jsx'));
const Hero = lazy(() => import('./components/sections/Hero.jsx'));
const About = lazy(() => import('./components/sections/About.jsx'));
const Skills = lazy(() => import('./components/sections/Skills.jsx'));
const Projects = lazy(() => import('./components/sections/Projects.jsx'));
const Achievements = lazy(() => import('./components/sections/Achievements.jsx'));
const Education = lazy(() => import('./components/sections/Education.jsx'));
const Journey = lazy(() => import('./components/sections/Journey.jsx'));
const Terminal = lazy(() => import('./components/sections/Terminal.jsx'));
const Contact = lazy(() => import('./components/sections/Contact.jsx'));
const GithubActivity = lazy(() => import('./components/sections/GithubActivity.jsx'));

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-dark-900 text-white">
      <Suspense fallback={null}>
        <FloatingGeometry />
      </Suspense>
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      <main className="relative z-10">
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <WaveDivider />
                  <ScrollScene type="about"><About /></ScrollScene>
                  <WaveDivider flip />
                  <ScrollScene type="skills"><Skills /></ScrollScene>
                  <ScrollScene type="projects"><Projects /></ScrollScene>
                  <WaveDivider />
                  <ScrollScene type="achievements"><Achievements /></ScrollScene>
                  <ScrollScene type="education"><Education /></ScrollScene>
                  <ScrollScene type="journey"><Journey /></ScrollScene>
                  <ScrollScene type="terminal"><Terminal /></ScrollScene>
                  <ScrollScene type="github"><GithubActivity /></ScrollScene>
                  <WaveDivider flip />
                  <ScrollScene type="contact"><Contact /></ScrollScene>
                </>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
