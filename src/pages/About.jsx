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
          className="w-full h-[400px] md:h-[500px] object-cover "
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">ABOUT ME</h1>
          <p className="text-lg md:text-xl">My story of where it all began</p>
        </div>
      </section>
      <section className="flex flex-col items-center w-full mt-5 md:flex-row ">
        <div className=" space-y-2 pt-10 px-10 w-full md:w-[50%]">
          <h3 className=" text-2xl text-center md:text-4xl md:text-left">
            MY MISSION
          </h3>
          <p className="">
            I am Zaryab Ali, a final-year Software Engineering student at Iqra
            National University, Peshawar, with roots in Katlang, a vibrant area
            in the Mardan district of Khyber Pakhtunkhwa, Pakistan. As a
            full-stack MERN developer, I excel in leading and managing web
            development projects, offering tailored business solutions through
            advanced technologies like React.js, Node.js, and MongoDB. My
            expertise extends to integrating Framer Motion for creating visually
            engaging animations that enhance user experiences on websites.
            Alongside my technical skills, I am proficient in creative tools
            like Canva and Adobe Illustrator, enabling me to bring a unique
            blend of design and development to every project.
          </p>
        </div>
        <div className="w-full p-5 md:w-[50%]">
          <img
            className="overflow-hidden rounded-lg"
            src={aboutMeImg}
            alt="aboutme img"
          />
        </div>
      </section>
      <section className="bg-gray-100 py-20 px-10 mt-10 md:px-20">
        <p>
          “Belief in oneself and knowing who you are, I mean, thats the
          foundation for everything great”
        </p>
        <span>~ZKY</span>
      </section>

      <FooterCom />
    </>
  );
};

export default About;
