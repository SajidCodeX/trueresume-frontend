'use client'

import React, { useState } from 'react'
import { Menu, X, CheckCircle, Zap, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const values = [
    {
      icon: CheckCircle,
      title: 'Free Forever',
      description: 'Our basic resume checker is completely free. No credit card required.',
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced machine learning technology to analyze your resume comprehensively.',
    },
    {
      icon: Rocket,
      title: 'Instant Results',
      description: 'Get your resume score and recommendations in seconds, not hours.',
    },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b border-gray-200 shadow-sm'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-0 cursor-pointer">
                <div className="bg-[#1B2B6B] px-3 py-2">
                  <span className="font-black text-white text-sm uppercase tracking-tight">TRUE</span>
                </div>
                <div style={{ border: '2.5px solid #1B2B6B' }} className="bg-white px-3 py-2">
                  <span className="font-black text-[#1B2B6B] text-sm uppercase tracking-tight">RESUME</span>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#1A1A2E] hover:text-[#4A6CF7] text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-[#4A6CF7] text-sm font-medium">
                About
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-[#1A1A2E] hover:text-[#4A6CF7] font-medium text-sm">
                Login
              </Link>
              <Link href="/login" className="bg-[#1B2B6B] text-white px-6 py-2 font-medium text-sm hover:bg-[#141f4d] transition-colors">
                Sign Up
              </Link>
            </div>

            <button
              className="md:hidden text-[#1A1A2E]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-4 border-t border-gray-200 mt-4">
              <Link href="/" className="block text-[#1A1A2E] hover:text-[#4A6CF7] py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="block text-[#4A6CF7] py-2 text-sm font-medium">
                About
              </Link>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-[#1A1A2E] hover:text-[#4A6CF7] font-medium text-sm">
                  Login
                </button>
                <button className="flex-1 bg-[#1B2B6B] text-white px-4 py-2 font-medium text-sm hover:bg-[#141f4d]">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1A1A2E] mb-6">
              We help job seekers get <span className="text-[#4A6CF7]">noticed</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
              At TrueResume, we believe every job seeker deserves a fair chance. Our mission is to help you create a resume that gets past ATS systems and lands interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="bg-white rounded-lg p-8 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                  <Icon className="text-[#4A6CF7] mb-4 mx-auto" size={40} />
                  <h3 className="text-xl font-black text-[#1A1A2E] mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A2E] mb-8">Our Story</h2>
          <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            <p>
              TrueResume was founded because we saw too many qualified job seekers get rejected by machines before humans could even read their resumes. We built a tool that levels the playing field.
            </p>
            <p>
              Our AI analyzes your resume against real ATS systems and provides actionable feedback. Whether it's formatting issues, missing keywords, or structural problems, we help you fix everything that might be holding you back.
            </p>
            <p>
              We're committed to keeping TrueResume free forever because everyone deserves the chance to get noticed by employers. Join millions of job seekers who've already improved their resumes with TrueResume.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B2B6B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">Ready to improve your <span className="text-[#4A6CF7]">resume</span>?</h2>
          <p className="text-gray-300 text-lg sm:text-xl mb-8">Start your free analysis now and get instant feedback on your resume.</p>
          <Link href="/analyze">
            <button className="bg-white text-[#1B2B6B] px-8 sm:px-12 py-3 font-black hover:bg-gray-100 transition-colors">
              Try TrueResume Free →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-0 mb-6">
                <div className="bg-white px-3 py-2">
                  <span className="font-black text-[#1B2B6B] text-sm uppercase tracking-tight">TRUE</span>
                </div>
                <div style={{ border: '2.5px solid white' }} className="bg-[#1B2B6B] px-3 py-2">
                  <span className="font-black text-white text-sm uppercase tracking-tight">RESUME</span>
                </div>
              </div>
              <p className="text-sm">AI-powered resume checker to help you land more interviews.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/analyze" className="hover:text-white transition-colors">Analyze Resume</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 TrueResume. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
