import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Home = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("✅ Subscribed successfully!");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* ✅ HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 w-full">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Book Your Next{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Salon Appointment
              </span>
            </h1>
            <p className="text-lg mb-6 max-w-lg mx-auto md:mx-0">
              Discover top salons near you, book appointments online, and enjoy
              beauty services on your schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/salons"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Salons
              </Link>
              <Link
                to="/auth/register"
                className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <img
              src="https://media.istockphoto.com/id/2216185322/photo/barbershop-working-place-interior-stylish-hairdressing-salon-interior.jpg?s=612x612&w=0&k=20&c=llST3SWx54jbhzv-Bs_8WeP4AR6jYUJrcsQ5I5UvUt0="
              alt="Salon"
              className="rounded-xl shadow-xl max-w-md w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ✅ FEATURES */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose E-Salon?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Booking",
                desc: "Schedule appointments in just a few clicks.",
              },
              {
                title: "Top-Rated Salons",
                desc: "Access verified reviews & ratings.",
              },
              {
                title: "24/7 Access",
                desc: "Book or cancel appointments anytime.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Amaka N.",
                comment: "Found a great salon near me and booked instantly!",
              },
              {
                name: "Chinedu A.",
                comment: "No more waiting! I book at my convenience.",
              },
              {
                name: "Fatima B.",
                comment: "Game changer! Booking is so easy now.",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
              >
                <p className="italic text-gray-600 dark:text-gray-400">
                  “{review.comment}”
                </p>
                <div className="flex items-center gap-3 mt-4 justify-center">
                  <img
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    — {review.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ NEWSLETTER */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">Stay Updated!</h2>
        <p className="mb-6">Subscribe for salon updates & offers.</p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 rounded text-black w-full"
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-200"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* ✅ FOOTER */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              E-Salon
            </h3>
            <p className="mt-2">Your beauty, your time. Book from anywhere.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/salons" className="hover:underline">
                  Browse Salons
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:underline">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:underline">
                  My Appointments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <ul className="space-y-1">
              <li>Email: support@esalon.com</li>
              <li>Instagram: @esalon.ng</li>
              <li>Twitter: @esalon_app</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} E-Salon. All rights reserved.
        </p>
      </footer>

      {/* ✅ Scroll-to-top */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        ↑
      </motion.button>
    </div>
  );
};

export default Home;
