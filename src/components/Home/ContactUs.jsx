import React from 'react';
import icon1 from '../../assets/icon/phone-icon.png';
import icon2 from '../../assets/icon/email-icon.png';
import icon3 from '../../assets/icon/location-icon.png';
import contactBottomRight from '../../assets/icon/contact-bottom-right.png';
import contactTopRight from '../../assets/icon/contact-top-right.png';
import outerDivTopRight from '../../assets/icon/contact-dec.png';

const ContactUs = () => {
  return (
    <div id='contact' className="bg-white flex flex-col items-center relative py-16">
      {/* Decorative Top Right Image */}
      <div
        className="absolute right-72 w-40 h-40 bg-no-repeat bg-contain hidden lg:block"
        style={{ backgroundImage: `url(${outerDivTopRight})` }}
      ></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="text-blue-500 font-bold">CONTACT US</div>
        <h2 className="text-3xl lg:text-4xl font-bold mt-2">
          Get In Touch With Us <span className="text-blue-500">Now</span>
        </h2>
        <hr className="border-blue-500 border-t-2 w-20 mx-auto mt-4" />
      </div>

      {/* Main Contact Container */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gray-50 rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Side: Map and Quick Contact */}
            <div className="space-y-8">
              {/* Map Container */}
              <div className="rounded-2xl overflow-hidden shadow-md bg-white p-4">
                <div className="relative" style={{ paddingBottom: "75%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d352.6461089471986!2d75.72805224930323!3d29.175412846261246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1729157057175!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                    style={{ border: '0' }}
                  ></iframe>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
                    <img className="h-6 w-6" src={icon1} alt="Phone" />
                  </div>
                  <p className="text-center text-sm font-medium">+91 999-1992-492</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-pink-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
                    <img className="h-6 w-6" src={icon2} alt="Email" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-center text-sm font-medium truncate hover:text-clip hover:whitespace-normal cursor-pointer transition-all duration-300 hover:text-blue-500">
                      meharetech420@email.com
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
                    <img className="h-6 w-6" src={icon3} alt="Location" />
                  </div>
                  <p className="text-center text-sm font-medium">IINSAF OFFICE</p>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-xl py-3 px-6 hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
