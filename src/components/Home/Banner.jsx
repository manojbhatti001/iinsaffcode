// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import slide1 from '../../assets/services/blue-toned-set-triangular-paper-sheets-with-copy-space (1).jpg';
// import slide2 from '../../assets/services/5153829 (1).jpg';
// import slide3 from '../../assets/services/simple-blue-white-background-with-text-space.jpg';

// const Banner = () => {
//   const [leftSectionStyle, setLeftSectionStyle] = useState({});
//   const [rightSectionStyle, setRightSectionStyle] = useState({});

//   // Function to set styles based on screen size
//   const updateStyles = () => {
//     const width = window.innerWidth;
//     if (width >= 1024) {
//       // Desktop View
//       setLeftSectionStyle({
//         height: '40%',
//         width: '20%',
//         margin: '170px 170px 370px 170px', /* top right bottom left */
//         padding: '16px',
//       });

//       setRightSectionStyle({
//         height: '70%',
//         width: '20%',
//         margin: '170px 170px 200px 170px',
//         padding: '16px',
//       });
//     } else if (width >= 768) {
//       // Tablet View
//       setLeftSectionStyle({
//         height: '40%',
//         width: '45%',
//         margin: '8px 0px 270px  0px',
//         padding: '14px',
//       });

//       setRightSectionStyle({
//         height: '70%',
//         width: '45%',
//         margin: '8px  0px 180px 0px',
//         padding: '14px',
//       });
//     } else {
//       // Mobile View
//       setLeftSectionStyle({
//         height: 'auto',
//         width: '100%',
//         margin: '5px 0',
//         padding: '12px',
//       });

//       setRightSectionStyle({
//         height: 'auto',
//         width: '100%',
//         margin: '5px 0',
//         padding: '12px',
//       });
//     }
//   };

//   // Update styles on window resize
//   useEffect(() => {
//     updateStyles(); // Set initial styles
//     window.addEventListener('resize', updateStyles);

//     return () => window.removeEventListener('resize', updateStyles);
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     pauseOnHover: true,
//   };

//   return (
//     <div className="w-full py-6">
//       <Slider {...settings}>
//         {[slide1, slide2, slide3].map((slide, index) => (
//           <div className="relative" key={index}>
//             <img src={slide} alt={`Banner ${index + 1}`} className="w-full h-[700px] object-cover rounded-lg" />
//             <div className="absolute inset-0 flex flex-wrap md:flex-nowrap items-center p-6 md:justify-between gap-6">
//               {/* Left Section */}
//               <div
//                 className="backdrop-blur-md rounded-lg border-2 border-gray-300"
//                 style={leftSectionStyle}
//               >
//                 <h2 className="text-4xl font-extrabold text-red-600">Rise Your Voice</h2>
//                 <p className="text-2xl font-semibold text-black mt-2">with iinsaf</p>
//                 <div className="flex items-center justify-center mt-4">
//                   <p className="text-black mr-2">Fast upload &#8594;</p>
//                   <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-300">
//                     Get Started
//                   </button>
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div
//                 className="backdrop-blur-md rounded-lg border-2 border-gray-300"
//                 style={rightSectionStyle}
//               >
//                 <h3 className="text-xl font-bold flex items-center justify-center text-black">Notice</h3>
//                 <ul>
//                   <li><strong>Introduction</strong>
//                     <ul>
//                       <li>Overview of the topic</li>
//                       <li>Importance of the subject</li>
//                     </ul>
//                   </li>
//                   <li><strong>Background Information</strong>
//                     <ul>
//                       <li>Historical context</li>
//                       <li>Key definitions</li>
//                     </ul>
//                   </li>
//                   <li><strong>Main Arguments</strong>
//                     <ul>
//                       <li>First key point</li>
//                       <li>Supporting evidence</li>
//                     </ul>
//                   </li>
//                   <li><strong>Counterarguments</strong>
//                     <ul>
//                       <li>Common objections</li>
//                       <li>Rebuttals to these objections</li>
//                     </ul>
//                   </li>
//                   <li><strong>Conclusion</strong>
//                     <ul>
//                       <li>Summary of findings</li>
//                       <li>Final thoughts and implications</li>
//                     </ul>
//                   </li>
//                 </ul>

//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Banner;
