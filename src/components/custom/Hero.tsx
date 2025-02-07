import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowRight,
  FaChartLine,
  FaShieldAlt,
  FaUserTie,
} from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Revolutionize Your{' '}
              <span className="text-blue-600">Healthcare Investments</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700 leading-relaxed">
              Quick Wealth Market offers unparalleled opportunities in the
              thriving health and pharmaceutical sector with a record breaking
              <span className="text-green-500 font-medium"> 20%</span> Daily
              Return on Investment(DROI). Start your journey to financial growth
              today.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-semibold"
              >
                Create Account and Start Investing
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-300 text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-5/6 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="relative">
              <Image
                src="/assets/doctor.jpg"
                alt="Healthcare Investment"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-2">
                  <FaChartLine className="text-2xl text-blue-600" />
                  <span className="text-xl font-bold text-gray-800">
                    1000% YoY Growth
                  </span>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-2">
                  <FaShieldAlt className="text-2xl text-green-600" />
                  <span className="text-xl font-bold text-gray-800">
                    Secure Investments
                  </span>
                </div>
              </div>
              <div className="absolute top-1/2 -right-16 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-2">
                  <FaUserTie className="text-2xl text-purple-600" />
                  <span className="text-xl font-bold text-gray-800">
                    Expert Guidance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
