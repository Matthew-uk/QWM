import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaChartLine,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="trust-pilot w-max bg-white h-max p-1">
          <Image
            src="/assets/Trustpilot.png"
            alt="TrustPilot"
            width={200}
            height={200}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-white mb-4"
            >
              <FaChartLine className="text-2xl" />
              <span className="text-xl font-bold">QWM</span>
            </Link>
            <p className="text-gray-400">
              Innovative investment solutions for the healthcare industry.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Investments
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Investment Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaFacebook className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaTwitter className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaLinkedin className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaInstagram className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Quick Wealth Market. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
