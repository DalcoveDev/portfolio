import './index.css';
import { motion } from "framer-motion";
import { Code, Server, PenTool, Database, Settings, Wrench } from "lucide-react";
import React from 'react';
function App() {  
  // Removed unused 'open' state variable
  return ( 

      <>
 {/* Navigation */}
 <nav className="fixed top-4 left-4 right-4 bg-white rounded-2xl shadow-lg px-6 py-4 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src="./logo2.jpg" alt="Pot Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-indigo-600">Portfolio</span>
          </div>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li className="text-[#89AC46] hover:text-yellow-800 cursor-pointer">
              <a href="#home">Home</a>
            </li>
            <li className="text-[#89AC46] hover:text-yellow-800 cursor-pointer">
              <a href="#services">Services</a>
            </li>
            <li className="text-[#89AC46] hover:text-yellow-800 cursor-pointer">
              <a href="#projects">Projects</a>
            </li>
            <li className="text-[#89AC46] hover:text-yellow-800 cursor-pointer">
              <a href="#experience">Experience</a>
            </li>
            <li className="text-[#89AC46] hover:text-yellow-800 cursor-pointer">
              <a href="#contact">Contact</a>
            </li>
          </ul>
          {/* Theme Toggle Button */}
        </div>
      </nav>

      {/* Home Section */}
      <section
  id="home"
  className="min-h-screen flex items-center justify-center px-6 pt-32 bg-base-100 text-base-content"
>
  <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
    {/* Text Content */}
    <div className="md:w-1/2 text-center md:text-left space-y-6 animate-fade-in">
      <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
        Hey, I'm <span className="text-indigo-600">Dalcove</span>
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
        Full-stack developer specializing in modern, interactive React frontends
        with seamless backend integrations using PocketBase and Express.js.
      </p>

      {/* You can place buttons or CTA here */}
      <div className="flex justify-center md:justify-start gap-4 mt-4">
        <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition">
         <a href="#projects"> View Worked projects</a>
        </button>
        <button className="border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-100 transition">
          <a href="#contact">Get In Touch</a>
        </button>
      </div>
      <div className="w-[400px] max-w-md md:max-w-lg relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="./side.jpg"
          alt="Animated representation"
          className="w-full h-auto object-cover rounded-3xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      
    </div>

    {/* Image Section */}
    <div className="h-96 md:h-[500px] w-full md:w-1/2 flex justify-center items-center relative animate-fade-in">
      <div className="w-full h-full max-w-md md:max-w-lg relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="./logo.jpeg"
          alt="Animated representation"
          className="w-full  h-full object-cover rounded-3xl transform hover:scale-105 transition-transform duration-300"
        />
        
      </div>
    </div>
  </div>
</section>




<section
  id="services"
  className="min-h-screen flex items-center justify-center px-6 py-20 bg-transparent text-base-content"
>
  <div className="max-w-7xl mx-auto text-center">
    {/* Header */}
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-blue-700">Services</h2>
    </motion.div>

    {/* Service Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Web Development",
          desc: "Interactive, fast, and responsive React apps with modern animations.",
          icon: Code,
        },
        {
          title: "Backend Development",
          desc: "Real-time, scalable logic using Express.js and PocketBase.",
          icon: Server,
        },
        {
          title: "UI/UX Design",
          desc: "User-centered interfaces designed for elegance and usability.",
          icon: PenTool,
        },
        {
          title: "Database Design",
          desc: "Robust schema planning for real-time and secure applications.",
          icon: Database,
        },
        {
          title: "System Analysis",
          desc: "Tech architecture, flow mapping, and performance optimization.",
          icon: Settings,
        },
        {
          title: "Custom Solutions",
          desc: "Your vision built with tailored full-stack development.",
          icon: Wrench,
        },
      ].map((service, i) => {
        const IconComponent = service.icon;
        return (
          <motion.div
            key={i}
            className="bg-transparent border border-[#3a68ff] rounded-2xl shadow-md hover:shadow-xl transition duration-300 h-64 flex flex-col justify-start p-6 text-left group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4 text-[#859667]">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconComponent className="w-6 h-6" />
              </motion.div>
              <h3 className="text-xl font-semibold text-primary">
                {service.title}
              </h3>
            </div>
            <p className="text-base text-gray-700">{service.desc}</p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>





      {/* Projects Section */}
<section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20 bg-base-100 text-base-content">
  <div className="max-w-7xl mx-auto text-center">
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-blue-700">Projects</h2>
      <p className="text-lg text-secondary mt-4">
        A few things I’ve built recently. Check them out!
        <br />
      </p>
    </div>
    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: "Wonderwise",
          desc: "An interactive learning web app built with React, PocketBase, and Framer Motion. It offers a dynamic user experience with real-time data handling and smooth animations, making learning engaging, efficient, and visually appealing across all devices.",
          link: "https://github.com/DalcoveDev/wandawise",
          image: "./s1.jpeg",
        },
        {
          title: "Portfolio Website",
          desc: "A personal animated portfolio built with modern design principles using React, Tailwind CSS, and Framer Motion. It features smooth animations, responsive layouts, and a clean, professional look—perfect for showcasing projects, skills, and experience in an interactive and visually engaging way.",
          link: "https://github.com/DalcoveDev/nextjs-ai-chatbot",
          image: "./Capture.PNG",
        },
        {
          title: "AI chat bot",
          desc: "An AI chatbot built with Express, React, Vite, and Next.js that uses APIs to deliver smart, real-time conversations. It features a fast, responsive UI, secure backend, and seamless integration with AI models—ideal for customer support, personal assistants, or interactive web experiences.",
          link: "#",
          image: "./ai1.jpg",
        },
      ].map((project, i) => (
        <div
          key={i}
          className="bg-base-200 border-b-blue-700  rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 text-left">
            <h3 className="text-2xl font-semibold text-green-800 mb-2">{project.title}</h3>
            <p className="text-base-content text-gray-800 font-bold mb-4">{project.desc}</p>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-xl text-sky-700 font-semibold hover:underline"
            >
              Source C0de 
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



<section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-indigo-600 mb-12">Experience</h2>
        <div className="space-y-10">

          {/* Experience 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="border-l-4 border-indigo-500 bg-white/80 dark:bg-black/20 backdrop-blur-lg pl-6 py-6 px-4 text-left rounded-2xl shadow-md hover:shadow-indigo-400/50 dark:hover:shadow-indigo-600/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400">Full-Stack Developer</h3>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-medium">Wonderwise</span>
              <span>2024 – Present</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Built and maintained a full-stack web app using React, PocketBase, and Express.js. Integrated animated UI and custom backend APIs.
            </p>
          </motion.div>

          {/* Experience 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="border-l-4 border-pink-500 bg-white/80 dark:bg-black/20 backdrop-blur-lg pl-6 py-6 px-4 text-left rounded-2xl shadow-md hover:shadow-pink-400/50 dark:hover:shadow-pink-600/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-pink-700 dark:text-pink-400">Frontend Intern</h3>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-medium">CreativeLabs</span>
              <span>2023</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Worked on responsive UI design with Tailwind CSS and improved website performance. Contributed to reusable React components.
            </p>
          </motion.div>

          {/* Experience 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="border-l-4 border-emerald-500 bg-white/80 dark:bg-black/20 backdrop-blur-lg pl-6 py-6 px-4 text-left rounded-2xl shadow-md hover:shadow-emerald-400/50 dark:hover:shadow-emerald-600/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-400">Freelance Developer</h3>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-medium">Various Clients</span>
              <span>2022 – Present</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Designed and developed custom websites, portfolios, and admin dashboards using React, Framer Motion, and Firebase.
            </p>
          </motion.div>

        </div>
      </div>
    </section>

      {/* Contact Section */}
<section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 bg-base-100 text-base-content">
  <div className="max-w-lg mx-auto text-center">
    <h2 className="text-4xl font-bold text-primary mb-8">Contact</h2>
    <p className="text-lg text-secondary mb-6">
      Feel free to reach out for collaborations or just a friendly chat!
    </p>
    <form className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-3 bg-base-200 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-primary">
          ✍️
        </span>
      </div>
      <div className="relative">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 bg-base-200 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-primary">
          📧
        </span>
      </div>
      <div className="relative">
        <textarea
          placeholder="Your Message"
          className="w-full px-4 py-3 bg-base-200 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        ></textarea>
        <span className="absolute top-4 right-4 text-primary">💬</span>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-primary-content py-3 rounded-md hover:bg-primary-focus transition duration-300"
      >
        Send Message
      </button>
    </form>
    <div className="mt-8">
      <p className="text-sm text-secondary">Or connect with me on:</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="#"
          className="text-primary hover:text-primary-focus transition duration-300"
        >
          LinkedIn
        </a>
        <a
          href="#"
          className="text-primary hover:text-primary-focus transition duration-300"
        >
          GitHub
        </a>
        <a
          href="#"
          className="text-primary hover:text-primary-focus transition duration-300"
        >
          Twitter
        </a>
      </div>
    </div>
  </div>
</section>
<footer>
    <div className="bg-sky-700 text-center py-6 mt-12">
        <p className="text-green">© 2024 ScprintCode org . All rights reserved.</p>
        <p className="text-gray-500">Designed by Dalcove</p>
      </div>
</footer>
      
   
  </>
            );
          }


export default App;
