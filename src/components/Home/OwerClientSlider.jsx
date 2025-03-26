import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import company1 from '../../assets/companylogo/mehartech.png';
import company2 from '../../assets/companylogo/iinfra icon.png';
import company3 from '../../assets/companylogo/gju.png';
import company4 from '../../assets/companylogo/iinsaf blood logo.png';
import bgimgcompany1 from '../../assets/backgroundimages/meharetech_back.webp';
import bgimgcompany2 from '../../assets/backgroundimages/iifra_back.webp';
import bgimgcompany3 from '../../assets/backgroundimages/gju_back.webp';
import bgimgcompany4 from '../../assets/backgroundimages/blood banner.jpg';

const OwerClientSlider = () => {
    const [backgroundImage, setBackgroundImage] = useState(bgimgcompany1);
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: "John Doe",
            profession: "Software Engineer",
            rating: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollitia fugit nihil, aperiam maxime minima consequuntur!",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            background: bgimgcompany1,
            company: "Tech Solutions Inc."
        },
        {
            name: "Jane Smith",
            profession: "Graphic Designer",
            rating: 4,
            text: "Nam iste eius velit perferendis voluptatem at atque neque soluta.",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            background: bgimgcompany2,
            company: "Creative Studios"
        },
        {
            name: "Sam Wilson",
            profession: "Marketing Specialist",
            rating: 4,
            text: "Voluptatem at atque neque soluta recusandae aperiam corporis.",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            background: bgimgcompany3,
            company: "Digital Marketing Pro"
        },
        {
            name: "Alex Johnson",
            profession: "Business Analyst",
            rating: 5,
            text: "Amazing service! I highly recommend them for all your business needs.",
            image: "https://randomuser.me/api/portraits/men/4.jpg",
            background: bgimgcompany4,
            company: "Business Solutions Ltd"
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        beforeChange: (current, next) => {
            setBackgroundImage(testimonials[next].background);
            setActiveIndex(next);
        },
        dotsClass: "slick-dots custom-dots",
        customPaging: i => (
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-blue-500 w-8' : 'bg-gray-400'}`} />
        ),
    };

    useEffect(() => {
        // Add custom styles for dots
        const style = document.createElement('style');
        style.textContent = `
            .custom-dots {
                bottom: -40px;
            }
            .custom-dots li {
                margin: 0 5px;
            }
            .slick-active button {
                background: linear-gradient(to right, #3B82F6, #8B5CF6);
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div id='reviews' className="relative text-white py-24">
                {/* Dynamic Background Image with improved overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-700 ease-in-out transform scale-105"
                    style={{ 
                        backgroundImage: `url('${backgroundImage}')`,
                        animation: 'slowZoom 20s infinite alternate'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="mb-16">
                        <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
                        <h2 className="text-5xl font-bold mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            What Our Clients Say
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Discover how we've helped our clients achieve their goals and transform their businesses.
                        </p>
                    </div>

                    {/* Slick Slider with enhanced styling */}
                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="focus:outline-none px-4">
                                <div className="backdrop-blur-lg bg-white/10 text-white p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto transform transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/10">
                                    <div className="mb-8">
                                        <svg className="w-12 h-12 text-blue-400 mb-6 mx-auto opacity-75" fill="currentColor" viewBox="0 0 32 32">
                                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                        </svg>
                                        <p className="text-xl italic leading-relaxed">{testimonial.text}</p>
                                    </div>
                                    <div className="flex items-center justify-center space-x-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-75"></div>
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-24 h-24 rounded-full border-4 border-white/30 shadow-xl relative z-10 transform transition-all duration-300 hover:scale-110"
                                            />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-blue-300 text-lg mb-1">{testimonial.profession}</p>
                                            <p className="text-gray-400 text-sm">{testimonial.company}</p>
                                            <div className="text-yellow-400 mt-2 text-xl flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`transition-all duration-300 ${i < testimonial.rating ? 'text-yellow-400 scale-110' : 'text-gray-500'}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Enhanced Company Logos Section */}
            <div className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Our Partners</span>
                        <h3 className="text-4xl font-bold mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Trusted by Industry Leaders
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
                    </div>
                    
                    <div className="flex items-center justify-center flex-wrap gap-16">
                        {[company1, company2, company3, company4].map((company, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-xl group-hover:blur-2xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                                <img 
                                    className="h-28 transform transition-all duration-500 hover:scale-110 rounded-xl p-3 bg-white/5 backdrop-blur-lg hover:bg-white/20"
                                    src={company} 
                                    alt={`Partner Company ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slowZoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default OwerClientSlider;
