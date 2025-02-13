import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundPosition: "bottom",
        }}
      ></div>

      {/* Header */}
      <header className="bg-white shadow-sm relative z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PrePal AI
          </motion.h1>
          <div>
            <Link to="/login">
              <Button variant="outline" className="mr-2">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 relative z-10 text-center">
        <motion.h2
          className="text-5xl font-extrabold text-black-600 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Revolutionize Your Study Habits with AI
        </motion.h2>
        <p className="text-xl text-gray-800 mb-8">
          Personalized schedules, AI-generated flashcards, and progress tracking to supercharge your learning.
        </p>
        <Link to="/signup">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button className="text-lg px-8 py-3">Get Started</Button>
          </motion.div>
        </Link>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "AI-Generated Flashcards",
            description: "Our AI analyzes your study materials and creates personalized flashcards to enhance your learning.",
          },
          {
            title: "Smart Study Planner",
            description: "Create and manage your study schedule with our intelligent planner that adapts to your progress.",
          },
          {
            title: "Progress Tracking",
            description: "Visualize your learning journey with detailed analytics and progress reports.",
          },
          {
            title: "Cloud Sync",
            description: "Access your study materials and progress from any device, anytime, anywhere.",
          },
          {
            title: "Collaborative Learning",
            description: "Share study plans and flashcards with friends or study groups to learn together.",
          },
          {
            title: "Spaced Repetition",
            description: "Optimize your memory retention with our scientifically-backed spaced repetition system.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PrePalAI. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link className="hover:underline" to="/terms">
              Terms
            </Link>
            <Link className="hover:underline" to="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
