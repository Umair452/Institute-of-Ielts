'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import { motion } from 'framer-motion'; // Add this import

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const COUNTER_DURATION = 2000; // ms

function useCounter(to: number, duration = COUNTER_DURATION) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    }
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [to, duration]);

  return count;
}

export default function Home() {
  // Animated counters
  const takers = useCounter(1100);
  const percent = useCounter(99);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth scroll for header links
  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} bg-white min-h-screen`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md">
        <nav className="max-w-5xl mx-auto flex justify-between items-center py-2 px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/ielts-logo.png"
              alt="IELTS Institute"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-lg font-bold text-blue-700 tracking-tight hidden sm:inline">
              Lalamusa Institute of IELTS
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="#about"
              onClick={handleScroll('about')}
              className="text-red-600 font-semibold hover:text-blue-700 transition-colors text-sm"
            >
              About Us
            </a>
            <a
              href="#location"
              onClick={handleScroll('location')}
              className="text-blue-700 font-semibold hover:text-red-600 transition-colors text-sm"
            >
              Our Location
            </a>
          </div>
        </nav>
      </header>

      {/* Banner */}
      <section
        className="relative flex items-center justify-center min-h-[70vh] sm:min-h-[90vh] w-full"
        style={{
          background:
            "linear-gradient(120deg,rgba(255,0,64,0.7),rgba(0,128,255,0.7)),url('/ielts-banner.png') center/cover no-repeat",
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
            Achieve Your <span className="text-blue-300">IELTS</span> Dreams
          </h1>
          <p className="text-lg sm:text-2xl text-white font-medium mb-8 drop-shadow">
            Professional IELTS Training. Proven Success. Bright Future.
          </p>
          <a
            href="#about"
            onClick={handleScroll('instructors')}
            className="inline-block bg-red-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-colors"
          >
            Our Instructors
          </a>
        </div>
      </section>

      <section
        id="about"
        className="py-16 px-4 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Empowering students with professional language training and test
              preparation for global success.
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
              <div className="h-2 bg-blue-600 rounded-t-2xl -mt-6 -mx-6 mb-4"></div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                IELTS Preparation
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive training for Academic & General modules
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> All four modules
                  covered
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Mock tests &
                  feedback
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Expert guidance
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
              <div className="h-2 bg-red-600 rounded-t-2xl -mt-6 -mx-6 mb-4"></div>
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Spoken English
              </h3>
              <p className="text-gray-600 mb-4">
                From basic to advanced fluency
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Grammar & vocabulary
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Accent refinement
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Interactive sessions
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
              <div className="h-2 bg-blue-600 rounded-t-2xl -mt-6 -mx-6 mb-4"></div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                Special Programs
              </h3>
              <p className="text-gray-600 mb-4">
                Tailored courses for specific needs
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Life Skills (A1 &
                  B1)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> PTE Preparation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Summer Camps
                </li>
              </ul>
            </div>
          </div>

          {/* Teaching Approach */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                  Our Teaching Approach
                </h3>
                <p className="text-gray-700 mb-6">
                  Personalized learning experience with modern methods and
                  flexible schedules.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-700 mb-1">✓</div>
                  <p className="text-sm text-gray-700">Personal Attention</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-700 mb-1">✓</div>
                  <p className="text-sm text-gray-700">Flexible Timing</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-700 mb-1">✓</div>
                  <p className="text-sm text-gray-700">Modern Methods</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-700 mb-1">✓</div>
                  <p className="text-sm text-gray-700">Regular Assessment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="instructors" className="bg-blue-50 py-16 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-12">
          Meet Our Instructors
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Instructor 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <Image
              src="/instructor1.jpeg"
              alt="Instructor 1"
              width={100}
              height={100}
              className="rounded-full border-4 border-blue-600 mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-blue-700">
              Syed Mubeen Raza
            </h3>
            <p className="text-red-600 font-semibold mb-2">
              IELTS Instructor
            </p>
            <p className="text-gray-700">
              Syed Mubeen Raza, founder of Lalamusa Institute, has 14+ years of
              English teaching experience and 5+ years in IELTS and test prep.
              He has successfully trained 500+ students, helping many achieve
              Band 7–9 in IELTS through clear, motivational, and student-focused
              teaching.
            </p>
          </div>
          {/* Instructor 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <Image
              src="/instructor2.jpeg"
              alt="Instructor 2"
              width={100}
              height={100}
              className="rounded-full border-4 border-red-600 mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-red-600">Atika Mubeen</h3>
            <p className="text-blue-700 font-semibold mb-2">
              Lead IELTS Instructor
            </p>
            <p className="text-gray-700">
              Atika Mubeen, co-founder of Lalamusa Institute, has 9+ years of
              experience in language training, including teaching O Level
              English and serving as an Instructional Coach at Beaconhouse. She
              has guided hundreds of students in IELTS, PTE, Spoken English, and
              more, offering trusted services.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <motion.section
        ref={sectionRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-12"
      >
        <div className="w-full mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-center md:text-left text-blue-700 mb-6">
        Success Stories & Results
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-center md:text-left">
        Our success stories are a testament to our commitment to excellence.
        Fatima Liaqat, one of our top students, achieved an impressive 9.0 in
        the IELTS exam, showcasing the effectiveness of our training methods.
          </p>
        </div>
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          className="flex-1 flex justify-center"
        >
          <Image
        src="/9bands.jpg"
        alt="Successful IELTS Students"
        width={400}
        height={300}
        className="rounded-2xl shadow-lg object-cover w-full max-w-xs md:max-w-md transform transition-all duration-300 hover:shadow-2xl"
          />
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="flex-1 flex flex-col items-center md:items-start gap-8"
        >
          <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.1 }}
        className="flex flex-col items-center md:items-start"
          >
        <motion.span
          className="text-5xl sm:text-6xl font-extrabold text-red-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {takers}+
        </motion.span>
        <span className="text-lg font-medium text-gray-700 mt-2">
          Successful IELTS Takers
        </span>
          </motion.div>
          <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.1 }}
        className="flex flex-col items-center md:items-start"
          >
        <motion.span
          className="text-5xl sm:text-6xl font-extrabold text-blue-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          {percent}%
        </motion.span>
        <span className="text-lg font-medium text-gray-700 mt-2">
          Achieved 6+ Band Scores
        </span>
          </motion.div>
        </motion.div>
      </motion.section>

      <main>
        {/* Footer / Location */}
        <footer
          id="location"
          className="bg-gradient-to-r from-blue-700 to-red-600 text-white py-12 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              {/* About Institute */}
              <div>
                <h4 className="text-xl font-bold mb-4">About Our Institute</h4>
                <p className="text-white/90 text-sm mb-4">
                  A premier language learning center in the heart of Lalamusa,
                  dedicated to empowering individuals with the communication
                  skills and test preparation they need to succeed globally.
                </p>
                <p className="text-white/90 text-sm">
                  Our mission is to inspire and equip learners with the language
                  skills, test strategies, and personal confidence they need to
                  achieve their academic, professional, and personal goals.
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                <div className="space-y-3 text-white/90">
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Near Masjid Abuzar Ghifaari, Lalamusa, Gujrat, Pakistan
                  </p>
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +92 322 6408499
                  </p>
                </div>
              </div>
              {/* Social Media */}
              <div>
                <h4 className="text-xl font-bold mb-4">Connect with Us</h4>
                <div className="flex items-center gap-4 mb-4">
                  <a
                    href="https://www.facebook.com/share/16iL61rHeE/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="inline"
                    >
                      <path d="M29 16c0-7.18-5.82-13-13-13S3 8.82 3 16c0 6.48 4.84 11.83 11 12.82V20.5h-3.3v-3h3.3v-2.3c0-3.26 1.94-5.05 4.91-5.05 1.42 0 2.91.25 2.91.25v3.2h-1.64c-1.62 0-2.13 1-2.13 2.03V17.5h3.63l-.58 3H18.8v8.32C24.16 27.83 29 22.48 29 16z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@lalamusainstituteofielts?_t=ZS-8wygZtNz3Em&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-300 transition-colors"
                    aria-label="TikTok"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="inline"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@syednaqvi-g5x?si=PCAucRXzDoziuLaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-300 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="inline"
                    >
                      <path d="M29.4 8.1c-.3-1.1-1.1-1.9-2.2-2.2C25.2 5.1 16 5.1 16 5.1s-9.2 0-11.2.8c-1.1.3-1.9 1.1-2.2 2.2C1.9 10.1 1.9 16 1.9 16s0 5.9.7 7.9c.3 1.1 1.1 1.9 2.2 2.2 2 .8 11.2.8 11.2.8s9.2 0 11.2-.8c1.1-.3 1.9-1.1 2.2-2.2.7-2 .7-7.9.7-7.9s0-5.9-.7-7.9zM13.1 20.5v-9l7.5 4.5-7.5 4.5z" />
                    </svg>
                  </a>
                </div>
                <p className="text-white/90">Follow us for updates and tips!</p>
              </div>
            </div>

            {/* Map
            <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white mb-8">
              <iframe
                title="IELTS Institute Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456789!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df955555555555%3A0x123456789abcdef!2sIELTS%20Institute!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}

            <div className="text-center text-sm opacity-80">
              &copy; {new Date().getFullYear()} Lalamusa Institute of IELTS. All
              rights reserved.
            </div>
          </div>
        </footer>
      </main>
      <a
        href="https://wa.me/923226408499"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.456-4.438 9.891-9.895 9.891zm8.413-18.306A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.678a11.876 11.876 0 005.735 1.459h.005c6.554 0 11.889-5.335 11.893-11.892a11.82 11.82 0 00-3.498-8.418z" />
        </svg>
      </a>
    </div>
  );
}
