'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const drugs = [
  { name: 'Aspirin', image: '/assets/aspirin.png' },
  { name: 'Ibuprofen', image: '/assets/ibuprofen.jpeg' },
  { name: 'Paracetamol', image: '/assets/paracetamol.png' },
  { name: 'Amoxicillin', image: '/assets/Amoxicillin.jpeg' },
  { name: 'Omeprazole', image: '/assets/omeprazole.webp' },
];

export default function DrugInvestmentSlider() {
  const swiperRef = useRef(null);

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Explore Investment Opportunities
        </h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-12"
          >
            {drugs.map((drug, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                  <Image
                    src={drug.image || '/placeholder.svg'}
                    alt={drug.name}
                    width={400}
                    height={300}
                    className="w-[300px] h-[300px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{drug.name}</h3>
                    <p className="text-gray-600 mb-4">
                      Invest in the production and distribution of {drug.name}.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="absolute top-1/2 -left-4 z-10 bg-white rounded-full p-3 shadow-md hidden md:block"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaArrowLeft className="text-blue-600" />
          </button>
          <button
            className="absolute top-1/2 -right-4 z-10 bg-white rounded-full p-3 shadow-md hidden md:block"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaArrowRight className="text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
