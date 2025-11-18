import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './theme';
import emailjs from '@emailjs/browser';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const carouselRef = useRef(null);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init({
      publicKey: 'jq1eQvZvnsxlw8F42',
      blockHeadless: false,
      limitRate: {
        id: 'app',
        throttle: 10000
      }
    });
  }, []);

  // Gallery images data
  const galleryImages = [
    {
      title: "Personal Moment 1",
      desc: "A special moment captured",
      image: "/g1.jpg",
    },
    {
      title: "Personal Moment 2",
      desc: "Another great memory",
      image: "/g2.jpg",
    },
    {
      title: "Creative Work",
      desc: "Working on a new project",
      image: "/g3.jpg",
    },
    {
      title: "Team Collaboration",
      desc: "Working with my team",
      image: "/g4.jpg",
    },
    {
      title: "Presentation Day",
      desc: "Presenting to clients",
      image: "/g5.jpg",
    },
    {
      title: "Workspace Setup",
      desc: "My dedicated work area",
      image: "/g6.jpg",
    },
  ];

  // Video data
  const videoItems = [
    {
      title: "My Story",
      desc: "A personal video moment",
      thumbnail: "/g1.jpg",
      url: "/v1.mp4",
    },
    {
      title: "Behind the Scenes",
      desc: "My creative process and workspace",
      thumbnail: "/bg_paper_image.jpg",
      url: "https://www.youtube.com/embed/example1",
    },
    {
      title: "Creative Experiments",
      desc: "Exploring new ideas and concepts",
      thumbnail: "/wonderwise.png",
      url: "https://www.youtube.com/embed/example2",
    },
  ];

  // Auto-slide carousel with creative transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Open image viewer
  const openImageViewer = (image, index) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  // Close image viewer
  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
    setCurrentImage(null);
  };

  // Navigate to next image
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setCurrentImage(galleryImages[nextIndex]);
  };

  // Navigate to previous image
  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIndex);
    setCurrentImage(galleryImages[prevIndex]);
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleMenuClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    // EmailJS parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Dalcove',
      reply_to: formData.email,
    };
    
    console.log('Sending email with params:', templateParams);
    
    // Send email using EmailJS
    emailjs.send(
      'service_78i6bdn', 
      'template_78i6bdn', 
      templateParams, 
      'jq1eQvZvnsxlw8F42'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.error('EmailJS Error:', error);
        
        // More detailed error logging
        if (error && error.response) {
          console.error('Error response:', error.response);
        }
        if (error && error.status) {
          console.error('Error status:', error.status);
        }
        if (error && error.text) {
          console.error('Error text:', error.text);
        }
        
        // Provide specific guidance based on common issues
        let errorMessage = 'Failed to send message. ';
        if (error.status === 404) {
          errorMessage += 'Template not found. Please check your EmailJS template ID. ';
        } else if (error.status === 401) {
          errorMessage += 'Authentication failed. Please check your EmailJS credentials. ';
        } else if (error.status === 429) {
          errorMessage += 'Rate limit exceeded. Please try again later. ';
        } else {
          errorMessage += 'Please check your EmailJS configuration. ';
        }
        
        setSubmitStatus(errorMessage + `Error: ${error.text || error.message || error.status || 'Unknown error'}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-6 py-4 z-50 border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#89AC46] rounded-full"></div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>dalcove</span>
          </div>
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex space-x-8 text-lg font-bold">
              {['home', 'work', 'gallery', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`nav-text ${
                      activeSection === item 
                        ? 'text-[#89AC46]' 
                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
                    } transition-colors`}
                    style={{ fontFamily: 'Kalam, cursive' }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            {/* Theme Toggle Button */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={toggleMobileMenu}
            >
              <div className="w-8 h-8 flex flex-col justify-center space-y-1.5">
                <div className={`w-8 h-1 bg-gray-700 dark:bg-gray-300 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-8 h-1 bg-gray-700 dark:bg-gray-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-8 h-1 bg-gray-700 dark:bg-gray-300 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-20 md:hidden">
          <div className="flex flex-col p-8 space-y-6">
            {['home', 'work', 'gallery', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleMenuClick(item)}
                className={`text-left py-4 text-2xl font-bold ${
                  activeSection === item 
                    ? 'text-[#89AC46]' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}
                style={{ fontFamily: 'Kalam, cursive' }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="note-card">
            <div className="mb-8">
              <div className="inline-block relative">
                <div className="absolute -inset-1 bg-[#89AC46] rounded-lg blur opacity-25"></div>
                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>
                    {formatTime(currentTime)}
                  </span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Hello, I'm</span>
              <span className="block mt-2 text-[#89AC46]" style={{ fontFamily: 'Kalam, cursive' }}>
                Dalcove
              </span>
            </h1>
            
            <p className="text-xl text-gray-900 dark:text-gray-300 max-w-2xl mx-auto mb-10" style={{ fontFamily: 'Kalam, cursive' }}>
              I am a full stackk developer with pasion of creating digital assets that provide solutions to real word problems.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection('work')}
                className="handwritten-btn"
              >
                See my work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="handwritten-btn-secondary"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section
        id="work"
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="note-card">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Kalam, cursive' }}>Selected Projects</h2>
              <p className="text-lg text-gray-900 dark:text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Kalam, cursive' }}>
                A collection of projects that showcase my approach to design and development.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Wonderwise",
                  desc: "Interactive learning platform with real-time collaboration features.",
                  tags: ["React", "PocketBase", "Framer Motion"],
                  image: "/wonder.png"1,
                },
                {
                  title: "Portfolio Website",
                  desc: "Personal portfolio with custom animations and theme switching.",
                  tags: ["React", "Tailwind", "Framer Motion"],
                  image: "/portifolio.png",
                },
                {
                  title: "AI Chat Bot",
                  desc: "Conversational interface powered by machine learning APIs.",
                  tags: ["Express", "React", "Next.js"],
                  image: "/aichatbot.webp",
                },
                {
                  title: "Inkingi Rescue",
                  desc: "Smart emargency responde system based on community.",
                  tags: ["Next js","Nest js","node js", "Postgresql","React Native","AI","React Map"],
                  image: "/inkingirescue.PNG",
                },
              ].map((project, index) => (
                <div 
                  key={index}
                  className="note-card group"
                >
                  <div className="h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 note-title" style={{ fontFamily: 'Kalam, cursive' }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-900 dark:text-gray-300 mb-4" style={{ fontFamily: 'Kalam, cursive' }}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        style={{ fontFamily: 'Kalam, cursive' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="note-card">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 note-title" style={{ fontFamily: 'Kalam, cursive' }}>About Me</h2>
              <div className="space-y-4 text-gray-900 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>
                <p>
                  I'm a full-stack developer with a passion for creating meaningful digital experiences. 
                  My approach combines technical expertise with an eye for design.
                </p>
                <p>
                  I believe in simplicity, functionality, and the power of well-crafted code to solve 
                  real problems. My work reflects a balance between innovation and practicality.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open 
                  source projects, or sketching interface ideas on paper.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 note-title" style={{ fontFamily: 'Kalam, cursive' }}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['React js',"next js","nest js", 'JavaScript', 'Node.js', 'Tailwind', 'Express', 'MongoDB', 'Figma', 'Git',"shadcn","daisyui"].map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      style={{ fontFamily: 'Kalam, cursive' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="note-card relative">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 note-title" style={{ fontFamily: 'Kalam, cursive' }}>Experience</h3>
                <button 
                  onClick={() => window.open('/Ingabire Dalcove (1).pdf', '_blank')}
                  className="text-sm text-[#89AC46] hover:underline"
                  style={{ fontFamily: 'Kalam, cursive' }}
                >
                  View My current CV
                </button>
              </div>
              
              {/* CV Preview Popup */}
              <div className="relative">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>African`s tailking Hackathon at Carneg Mellon University </h4>
                    <p className="text-[#89AC46] text-sm" style={{ fontFamily: 'Kalam, cursive' }}>Wonderwise • 2024 –-3rd place project</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1" style={{ fontFamily: 'Kalam, cursive' }}>
                      Building Ai based web application which make exploring more easy with technology.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Competion</h4>
                    <p className="text-[#89AC46] text-sm" style={{ fontFamily: 'Kalam, cursive' }}>Hacknoel • 2024 --1st place Project</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1" style={{ fontFamily: 'Kalam, cursive' }}>
                      Developed student cards managment system which caries all student info including report through QR code on the card.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Competition</h4>
                    <p className="text-[#89AC46] text-sm" style={{ fontFamily: 'Kalam, cursive' }}>Scrapyyard Hackathon • 2025 --1st projrct </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1" style={{ fontFamily: 'Kalam, cursive' }}>
                      Improved student card managment system to latest version.
                    </p>
                  </div>
                                    <div>
                    <h4 className="font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Game jam</h4>
                    <p className="text-[#89AC46] text-sm" style={{ fontFamily: 'Kalam, cursive' }}>Daydream Hackathon • 2025 --2st projrct </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1" style={{ fontFamily: 'Kalam, cursive' }}>
                     build flight similator game
                    </p>
                  </div>
                </div>
                
                {/* CV Content that appears when clicking View CV */}
                {isCVOpen && (
                  <div className="absolute right-0 top-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-6 z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Curriculum Vitae</h4>
                      <button 
                        onClick={() => setIsCVOpen(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Education</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>B.S. Computer Science • University Name • 2018-2022</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Certifications</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1" style={{ fontFamily: 'Kalam, cursive' }}>
                          <li>AWS Certified Developer</li>
                          <li>Google UX Design Professional</li>
                          <li>Microsoft Azure Fundamentals</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Kalam, cursive' }}>Languages</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>English (Fluent), Spanish (Intermediate)</p>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full handwritten-btn-secondary">
                          Download Full CV
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="note-card">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 note-title" style={{ fontFamily: 'Kalam, cursive' }}>let` Connect</h2>
              <p className="text-lg text-gray-900 dark:text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Kalam, cursive' }}>
                Have a project in mind or just want to say hello? I'd love to hear from you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Kalam, cursive' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="handwritten-input w-full"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Kalam, cursive' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="handwritten-input w-full"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Kalam, cursive' }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="handwritten-input w-full"
                      placeholder="What's on your mind?"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="handwritten-btn w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {submitStatus && (
                    <div className={`text-center p-3 rounded-lg ${submitStatus.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`} style={{ fontFamily: 'Kalam, cursive' }}>
                      {submitStatus}
                    </div>
                  )}
                </form>
              </div>
              
              <div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white note-title" style={{ fontFamily: 'Kalam, cursive' }}>Email</h4>
                    <a 
                      href="mailto:" 
                      className="text-[#89AC46] hover:underline"
                      style={{ fontFamily: 'Kalam, cursive' }}
                    >
                      ingabiredalcove@gmail.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white note-title" style={{ fontFamily: 'Kalam, cursive' }}>Tellphone</h4>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>
                      +250794290360
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white note-title" style={{ fontFamily: 'Kalam, cursive' }}>Location</h4>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>
                      Remote • Available worldwide
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white note-title" style={{ fontFamily: 'Kalam, cursive' }}>Connect</h4>
                    <div className="flex space-x-4 mt-2">
                      <a 
                        href="https://github.com/dalcovedev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        style={{ fontFamily: 'Kalam, cursive' }}
                      >
                        GitHub
                      </a>
                      <a 
                        href="https://linkedin.com/in/ingabiredalcove" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        style={{ fontFamily: 'Kalam, cursive' }}
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://www.discord.com/users/dalcove_23425" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        style={{ fontFamily: 'Kalam, cursive' }}
                      >
                        Discord
                      </a>
                      <a 
                        href="https://www.instagram.com/_dalcov_/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        style={{ fontFamily: 'Kalam, cursive' }}
                      >
                        Instagram
                      </a>
                      <a 
                        href="https://x.com/DalcoveI90335" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        style={{ fontFamily: 'Kalam, cursive' }}
                      >
                        X
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>
                    I'm currently an undergraduate student and available for freelance work and full-time opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 note-title" style={{ fontFamily: 'Kalam, cursive' }}>My Gallery</h2>
            <p className="text-lg text-gray-900 dark:text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Kalam, cursive' }}>
              A collection of moments from my journey as a developer.
            </p>
          </div>
          
          {/* Creative Carousel Container */}
          <div className="relative overflow-visible py-8">
            {/* Creative Carousel Track */}
            <div className="relative h-96 overflow-hidden">
              {galleryImages.map((item, index) => {
                // Calculate position based on current index
                const position = (index - currentIndex + galleryImages.length) % galleryImages.length;
                let translateX = 0;
                let scale = 1;
                let zIndex = 1;
                let opacity = 1;
                
                if (position === 0) {
                  // Center image (current)
                  translateX = 0;
                  scale = 1;
                  zIndex = 10;
                  opacity = 1;
                } else if (position === 1 || position === galleryImages.length - 1) {
                  // Adjacent images
                  translateX = position === 1 ? '110%' : '-110%';
                  scale = 0.8;
                  zIndex = 5;
                  opacity = 0.7;
                } else {
                  // Other images
                  translateX = position < galleryImages.length / 2 ? '150%' : '-150%';
                  scale = 0.6;
                  zIndex = 1;
                  opacity = 0.4;
                }
                
                return (
                  <div 
                    key={index}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-80 cursor-pointer transition-all duration-700 ease-in-out"
                    style={{
                      transform: `translateX(${translateX}) translateX(-50%) scale(${scale})`,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                    onClick={() => openImageViewer(item, index)}
                  >
                    <div className="note-card h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group relative">
                      <div className="h-48 overflow-hidden rounded-lg mb-3 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1" style={{ fontFamily: 'Kalam, cursive' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Kalam, cursive' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Creative Navigation Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#89AC46] w-8' : 'bg-gray-300 dark:bg-gray-600'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Creative Navigation Arrows */}
            <button 
              onClick={() => setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setCurrentIndex((currentIndex + 1) % galleryImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Creative Video Section - Showcasing Developing Moments */}
          <div className="mt-20 relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#89AC46] rounded-full filter blur-3xl"></div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center note-title relative z-10" style={{ fontFamily: 'Kalam, cursive' }}>Developing Moments</h3>
            
            <div className="max-w-4xl mx-auto relative z-10">
              {/* Only show the first video in a creative format */}
              <div className="note-card p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-xl overflow-hidden mb-6 shadow-2xl">
                  {/* Video container with creative styling */}
                  <div className="relative pt-[56.25%] bg-gradient-to-br from-[#89AC46]/20 to-[#6a8a35]/20 rounded-xl">
                    {playingVideo === 0 ? (
                      <iframe
                        className="absolute inset-0 w-full h-full rounded-xl"
                        src={`${videoItems[0].url}?autoplay=1`}
                        title={videoItems[0].title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <>
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <button 
                            className="relative z-10 w-20 h-20 rounded-full bg-[#89AC46] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-xl"
                            onClick={() => setPlayingVideo(0)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <img 
                          src={videoItems[0].thumbnail} 
                          alt={videoItems[0].title} 
                          className="absolute inset-0 w-full h-full object-cover rounded-xl"
                        />
                      </>
                    )}
                  </div>
                </div>
                
                {/* Video info with creative styling */}
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0 w-4 h-4 bg-[#89AC46] rounded-full"></div>
                  <div className="flex-grow">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Kalam, cursive' }}>{videoItems[0].title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-lg" style={{ fontFamily: 'Kalam, cursive' }}>{videoItems[0].desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block px-4 py-2 bg-[#89AC46]/10 text-[#89AC46] rounded-full text-sm font-medium" style={{ fontFamily: 'Kalam, cursive' }}>
                      Featured Moment
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Creative message for future videos */}
              <div className="mt-10 text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <div className="inline-block p-4 rounded-full bg-[#89AC46]/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#89AC46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Kalam, cursive' }}>More Moments Coming Soon</h4>
                <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Kalam, cursive' }}>
                  I'm constantly documenting my journey. Check back soon for more behind-the-scenes glimpses into my creative process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {isImageViewerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            {/* Close button */}
            <button 
              onClick={closeImageViewer}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded-full px-3 py-1 text-sm z-10">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
            
            {/* Image */}
            <div className="flex items-center justify-center h-[80vh]">
              <img 
                src={currentImage?.image} 
                alt={currentImage?.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 p-4 mx-4 rounded-lg">
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Kalam, cursive' }}>{currentImage?.title}</h3>
              <p style={{ fontFamily: 'Kalam, cursive' }}>{currentImage?.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-3 h-3 bg-[#89AC46] rounded-full"></div>
              <span className="text-lg font-medium" style={{ fontFamily: 'Kalam, cursive' }}>dalcove</span>
            </div>
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a 
                href="https://github.com/dalcovedev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/dalcovedev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://discord.com/users/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/your-instagram-handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.644.07-4.849.07-3.26-.149-4.771-1.699-4.919-6.98-.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.949.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/your-twitter-handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">X</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400" style={{ fontFamily: 'Kalam, cursive' }}>
                © {new Date().getFullYear()} Developed by Dalcove. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'Kalam, cursive' }}>
                Crafted with simplicity and intention
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;