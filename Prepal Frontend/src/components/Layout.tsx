import type React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "./Button";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PrepPal AI</h1>
          <div className="flex space-x-4">
            <Link to="/dashboard" className="font-medium hover:underline">
              Dashboard
            </Link>
            <Link to="/schedule" className="font-medium hover:underline">
              Study Schedule
            </Link>
            <Link to="/flashcards" className="font-medium hover:underline">
              Flashcards
            </Link>
            <Link to="/roadmap" className="font-medium hover:underline">
              Roadmap
            </Link>
          </div>
          <Link to="/"><Button variant="outline">Log Out</Button></Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet /> {/* This renders nested routes */}
      </main>
    </div>
  );
};

export default Layout;