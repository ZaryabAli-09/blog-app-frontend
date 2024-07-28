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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.lorem10 Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Minima, sapiente.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore,
            suscipit? Et assumenda molestias distinctio, eaque doloribus enim
            odio corporis dolorum?
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
