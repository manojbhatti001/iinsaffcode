import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const BrandScrolling = () => {
  const brands = [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
    { id: 3, name: 'Brand 3' },
    { id: 4, name: 'Brand 4' },
    { id: 5, name: 'Brand 5' },
    { id: 6, name: 'Brand 6' },
    { id: 7, name: 'Brand 7' },
    { id: 8, name: 'Brand 8' },
    { id: 9, name: 'Brand 9' }
  ];

  return (
    <div className="relative w-full flex flex-col gap-8 overflow-hidden">
      {/* First Slider (Left to Right) */}
      <div className="w-full h-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="mySwiper"
          style={{ transitionTimingFunction: 'linear !important' }} // Inline CSS for transition
        >
          {brands.map((brand) => (
            <SwiperSlide
              key={brand.id}
              className="text-center text-lg font-semibold bg-white flex flex-col items-center justify-center p-4 h-[300px] border shadow-md"
            >
                <span className="text-3xl text-gray-500">Logo</span> {/* Placeholder logo */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Second Slider (Right to Left) */}
      <div className="w-full h-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          style={{
            direction: 'rtl',
            transitionTimingFunction: 'linear !important', // Inline CSS for transition
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide
              key={brand.id}
              className="text-center text-lg font-semibold bg-white flex flex-col items-center justify-center p-4 h-[300px] border shadow-md"
            >
                <span className="text-3xl text-gray-500">Logo</span> {/* Placeholder logo */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandScrolling;
