import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import userimage1 from '../../assets/images/DALL·E 2024-10-16 10.14.18 - A detailed headshot of a man with short dark hair, light stubble, and wearing a casual shirt. The image should be a simple and clear profile on a neut.webp'
import userimage2 from '../../assets/images/DALL·E 2024-10-16 10.14.42 - A headshot of a man with light brown hair, clean-shaven, wearing glasses and a collared shirt. The background should be a plain soft color, and the ma.webp'
import userimage3 from '../../assets/images/DALL·E 2024-10-16 10.14.54 - A headshot of a man with dark skin, a short beard, and wearing a casual t-shirt. He has a warm smile and is facing directly at the camera. The backgro.webp'


const testimonials = [
  {
    name: "John Doe",
    text: "This platform helped me connect with top influencers and grow my business by 300% in just 3 months!",
    img: userimage1,
  },
  {
    name: "Jane Smith",
    text: "The best marketing platform out there! It's intuitive, effective, and has really made an impact on my brand.",
    img: userimage2,
  },
  {
    name: "Emily Johnson",
    text: "I've seen incredible results using this platform. Highly recommend to anyone serious about influencer marketing.",
    img: userimage3,
  },
];

const TestimonialSlider = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once while scrolling down
    });
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className=" ml-1 mr-1 bg-white border p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
              data-aos="fade-up" // AOS effect on each testimonial
              data-aos-delay={index * 200} // Adds delay for each item for staggered effect
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 mb-4">&quot;{testimonial.text}&quot;</p>
              <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
