import React from "react";
import FooterCom from "../components/Footer";
import aboutHeroImg from "../assets/About-Hero.jpeg";
import aboutMeImg from "../assets/About-Me.jpg";
const About = () => {
  return (
    <>
      <section className="relative">
        <img
          src={aboutHeroImg}
          alt="about-hero-img"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">ABOUT ME</h1>
          <p className="text-lg md:text-xl">My story of where it all began</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              MY MISSION
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Zaryab Ali is a full stack developer with 2+ years of professional experience specializing in the MERN stack. He builds scalable web applications and shares insights on modern development practices.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With a passion for clean code and intuitive user experiences, Zaryab focuses on creating digital products that solve real-world problems. He believes in continuous learning and sharing knowledge with the developer community.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">React</span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">Node.js</span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">MongoDB</span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">Express</span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              className="w-full rounded-2xl shadow-xl object-cover h-[400px]"
              src={aboutMeImg}
              alt="aboutme img"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-10 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed">
            “Belief in oneself and knowing who you are, I mean, thats the foundation for everything great”
          </blockquote>
          <span className="block mt-6 text-purple-600 font-bold text-lg">~ZKY</span>
        </div>
      </section>

      <FooterCom />
    </>
  );
};

export default About;
