import React, { useState } from "react";
import FooterCom from "../components/Footer";
import ContactHeroImg from "../assets/Contact-Hero.jpeg";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="relative">
        <img
          src={ContactHeroImg}
          alt="contact-hero"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">CONTACT ME</h1>
          <p className="text-lg md:text-xl">Let's start a conversation</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get in Touch
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Zaryab Ali is a full stack developer with 2+ years of professional experience specializing in the MERN stack. He builds scalable web applications and shares insights on modern development practices.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">P</div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">3323231690</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">E</div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">zaryab249@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">L</div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">Katlang, Mardan, KPK, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
              <h3 className="text-2xl font-bold text-gray-900">Send a Message</h3>
              {submitted && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
                  Message sent successfully!
                </div>
              )}
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
                placeholder="Your Name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
                placeholder="Your Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
                placeholder="Your Message"
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="map-container bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194170912925!2d-122.41826768467905!3d37.779276279758175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c9e8b2c0d%3A0x41a3be5396cc1b39!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1659130354851!5m2!1sen!2sus"
          style={{ border: 0 }}
          loading="lazy"
          className="w-full h-[300px] md:h-[400px]"
        ></iframe>
      </section>

      <FooterCom />
    </>
  );
};

export default Contact;
