// import React, { useEffect } from 'react';
// import Slider from 'react-slick';
// import leftsidejpg from '../../assets/services/BUILD YOUR CAREER.webp';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import CountUp from 'react-countup';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import socialmediaimg from '../../assets/services/socialmedia .webp'
// import performlance from '../../assets/services/Performance Analytics.webp'
// import socialmediacompainimg from '../../assets/services/Social Media Campaigns.webp'

// const ReporterComponent = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1200 });
//   }, []);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     vertical: true,     // This changes the slider orientation to vertical
//     verticalSwiping: true, // This allows swiping in the vertical direction
//   };
//   return (
//     <div className="flex flex-col mt-10 items-center justify-center px-4 md:px-10">
//       <div
//         className="flex flex-col lg:flex-row items-center justify-around bg-gradient-to-r from-[#5f7f89] via-[#c8ccc4] to-[#758b8d] p-6 md:p-10 rounded-lg shadow-lg w-full"
//         data-aos="fade-up"
//       >
//         {/* Left Image Section: Shown on Mobile, Hidden on 1024px */}
//         <div
//           className="block md:hidden lg:block lg:w-1/2 mb-6"
//           data-aos="fade-right"
//         >
//           <img
//             src={leftsidejpg}
//             alt="Illustration"
//             className="rounded-lg w-full object-cover"
//           />
//         </div>

//         {/* Slider Section: Full Width on 1024px screens */}
//         <div
//           className="w-full lg:w-1/2 lg:ml-4 md:w-full"
//           data-aos="fade-left"
//         >
//           <Slider {...sliderSettings}>
//             {/* Slide 1 */}
//             <div className=" flex items-center justify-center p-6 bg-white bg-opacity-10 rounded-lg shadow-md w-full">
//                 <img className='xl:h-[500px] lg:h-96' src={socialmediaimg}/>
//               <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
//                 Empower Reporters
//               </h2>
//               <p className="text-white mb-4">
//                 We aim to empower reporters by providing the best tools and resources to help them
//                 share their stories globally.
//               </p>
              
//               <a
//                 href="#"
//                 className=" px-6 py-3 mt-2 bg-blue-500 text-white text-lg font-medium rounded-md shadow-md hover:bg-blue-600 transition"
//               >
//                 Get Started
//               </a>
//             </div>

//             {/* Slide 2 */}
//             <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md w-full">
//               <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
//               <img className='xl:h-[500px] lg:h-96' src={performlance}/>

//                 Community of Reporters
//               </h2>
//               <p className="text-white mb-4">
//                 Join a community of over 294,965 reporters sharing news and stories across the
//                 globe.
//               </p>
//               <div className="flex items-center gap-4 bg-blue-600 text-white p-4 rounded-lg">
//                 <div className="text-4xl">
//                   <i className="fas fa-users"></i>
//                 </div>
//                 <div>
//                   <h3 className="text-xl md:text-2xl font-semibold">
//                     <CountUp start={1} end={294965} duration={5} separator="," />
//                   </h3>
//                   <p className="text-sm">Reporters</p>
//                 </div>
//               </div>
//             </div>

//             {/* Slide 3 */}
//             <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md w-full">
//             <img className='xl:h-[500px] lg:h-96' src={socialmediacompainimg}/>

//               <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
//                 Stay Updated
//               </h2>
//               <p className="text-white mb-4">
//                 Stay updated with the latest news and trends to report accurate information to your
//                 audience.
//               </p>
//               <a
//                 href="#"
//                 className="inline-block px-6 py-3 mt-2 bg-blue-500 text-white text-lg font-medium rounded-md shadow-md hover:bg-blue-600 transition"
//               >
//                 Learn More
//               </a>
//             </div>
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReporterComponent;

