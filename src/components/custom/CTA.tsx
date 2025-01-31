import Link from 'next/link';
import { FaRocket } from 'react-icons/fa';

export default function CTA() {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to Start Your Investment Journey?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Join Quick Wealth Market today and explore the potential of health
          drug store investments.
        </p>
        <Link
          href="#"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition duration-300"
        >
          <FaRocket className="mr-2" />
          Create Your Account
        </Link>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}
