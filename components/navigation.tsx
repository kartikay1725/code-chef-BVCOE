"use client"

import { useState } from "react"
import { Menu, X, Code } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link';
import Image from 'next/image'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Hero", href: "#hero" },
    { name: "Faculty", href: "#faculty" },
    { name: "Vision", href: "#vision" },
    { name: "Team", href: "#team" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <Image
                src="/CodeChef_Logo.svg.png"
                alt="CodeChef Logo"
                width={100}
                height={0} // This tells Next.js to infer height
                className="h-auto opacity-60"
              />
            <span className="text-lg md:text-xl font-bold font-poppins">CodeChef BVCOE Chapter</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-blue-500 transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800 border-t border-gray-700"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-3 text-gray-300 hover:text-blue-500 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
