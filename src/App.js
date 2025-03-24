import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment } from '@react-three/drei';
import emailjs from 'emailjs-com';
import Building from './components/Building';
import ProjectCard from './components/ProjectCard';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false); 
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        e.target,
        'YOUR_USER_ID' 
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
        },
        (error) => {
          alert('An error occurred, please try again.');
        }
      );

    e.target.reset(); 
  };

  const projects = [
    {
      id: 'eco-office',
      title: "2-Kanal Residential",
      description: "Sustainable office building with LEED Platinum certification",
      tags: ["Residential", "Sustainable", "LEED"],
      tools: ["AutoCAD", "3Ds Max", "Revit"],
      image: "/images/eco-office.jpg"
    },
    {
      id: 'urban-tower',
      title: "Interior Desgining",
      description: "Mixed-use residential complex with smart home integration",
      tags: ["Residential", "Smart Building", "Urban"],
      tools: ["AutoCAD", "3Ds Max", "Revit"],
      image: "/images/urban-tower.jpg"
    },
    {
      id: 'cultural-center',
      title: "Midrise Mixuse Commerical Building",
      description: "Contemporary cultural space blending traditional and modern elements",
      tags: ["Cultural", "Public Space", "Innovation"],
      tools: ["AutoCAD", "Enscape", "Sketch Up"],
      image: "/images/cultural-center.jpg"
    }
  ];

  return (
    <div className="relative">

      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed w-full bg-gray-900 bg-opacity-90 text-white z-40 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ATdezign Studio
            </h1>
            
          
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm">
              <div className="flex flex-col space-y-4 p-6">
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
                <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors">Projects</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="relative">
       
        <section className="h-screen relative bg-gray-900">
          <div className="absolute inset-0">
            <Canvas>
              <Environment preset="city" />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <Suspense fallback={null}>
                <PresentationControls
                  global
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 400 }}
                  rotation={[0, 0.3, 0]}
                  polar={[-Math.PI / 3, Math.PI / 3]}
                  azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                  <Building />
                </PresentationControls>
              </Suspense>
            </Canvas>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
            <div className="max-w-3xl px-4">
              <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Architectural Innovation
              </h2>
              <p className="text-2xl mb-8 text-gray-300">
                Crafting sustainable and innovative architectural solutions for tomorrow's world
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition transform hover:scale-105"
                >
                  View Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition transform hover:scale-105"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </section>

     
       <section id="about" className="min-h-screen py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6 pt-16">
            <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  As an architectural engineer with over a decade of experience, I blend innovative design 
                  principles with sustainable practices to create spaces that inspire and endure. My work 
                  focuses on the intersection of aesthetic beauty and functional efficiency.
                </p>
                <p className="text-lg leading-relaxed">
                  Every project is an opportunity to push the boundaries of what's possible while 
                  maintaining a deep respect for environmental responsibility and client needs.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Core Expertise</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>AutoCAD</span>
                        <span>97%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded">
                        <div className="h-full w-[95%] bg-blue-500 rounded" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>3D Modeling / 3Ds Max</span>
                        <span>95%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded">
                        <div className="h-full w-[90%] bg-blue-500 rounded" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Sketch up Modeling</span>
                        <span>95%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded">
                        <div className="h-full w-[85%] bg-blue-500 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

   
        <section id="projects" className="min-h-screen py-20 bg-gray-800 text-white">
          <div className="container mx-auto px-6 pt-16">
            <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6 pt-16">
            <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
            <form onSubmit={sendEmail} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

       
        <footer className="bg-black text-white py-8">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="font-bold text-lg mb-4">Talha Amjad Butt</h3>
                <p className="text-gray-400">Architectural Engineer</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white transition-colors">About</button>
                  <button onClick={() => scrollToSection('projects')} className="block text-gray-400 hover:text-white transition-colors">Projects</button>
                  <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors">Contact</button>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <p className="text-gray-400">ar.talhabutt@gmail.com</p>
                <p className="text-gray-400">+923094425087</p>
              </div>
            </div>
            <div className="mt-8">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.8299774814527!2d74.32197682423076!3d31.501356898083653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919055f653840d3%3A0x41ec31c45b542850!2sBarkat%20Market!5e0!3m2!1sen!2s!4v1738006024523!5m2!1sen!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="text-center mt-8 text-gray-400">
              <p>&copy; 2025 ATdezign Studio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;




