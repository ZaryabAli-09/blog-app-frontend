import React from "react";
import FooterCom from "../components/Footer";
import ContactHeroImg from "../assets/Contact-Hero.jpeg";
const Contact = () => {
  return (
    <>
      <section className="relative">
        <img
          src={ContactHeroImg}
          alt="about-hero-img"
          className="w-full h-[400px] md:h-[500px] object-cover "
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">CONTACT ME</h1>
        </div>
      </section>
      <section className="flex flex-col items-center w-full mt-5 md:flex-row ">
        <div className=" space-y-2  px-10 w-full md:w-[50%]">
          <h3 className=" text-2xl  md:text-4xl md:text-left">
            Send me a message for business inquiries
          </h3>
          <p className="">
            I am Zaryab Ali, a final-year Software Engineering student at Iqra
            National University, Peshawar, with roots in Katlang, a vibrant area
            in the Mardan district of Khyber Pakhtunkhwa, Pakistan.
            <br /> <br />
            katlang mardan kpk pakistan
            <br /> <br />
            Phone: 3323231690
            <br /> <br />
            Email: zaryab249@gmail.com@hotmail.com
          </p>
        </div>
        <div className="w-full p-5 md:w-[50%] ">
          <form action="" className="flex flex-col gap-4">
            {" "}
            <h3 className=" text-2xl   md:text-4xl md:text-left">CONTACT US</h3>
            <input
              className="border rounded border-gray-200"
              placeholder="Enter your name"
              type="text"
              required
            />
            <input
              className="border rounded border-gray-200"
              placeholder="Enter your email"
              type="text"
              required
            />
            <textarea
              className="border border-gray-200 rounded"
              placeholder="Enter your message here"
              cols="5"
              rows="5"
              required
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                alert("Query submitted successfully");
              }}
              className="rounded bg-purple-600 text-white p-3"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <section className="map-container mt-10 p-20 bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194170912925!2d-122.41826768467905!3d37.779276279758175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c9e8b2c0d%3A0x41a3be5396cc1b39!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1659130354851!5m2!1sen!2sus"
          style={{ border: 0 }}
          loading="lazy"
          className="w-full h-[300px]"
        ></iframe>
      </section>

      <FooterCom />
    </>
  );
};

export default Contact;
