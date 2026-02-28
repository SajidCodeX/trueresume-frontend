'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X, Upload, Star, Check, FileText, Zap, Target, Award, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: 'Format',
      description: 'Check if your resume follows ATS-optimized formatting standards',
      icon: FileText,
    },
    {
      title: 'Sections',
      description: 'Validate all essential resume sections are properly structured',
      icon: Target,
    },
    {
      title: 'Content',
      description: 'Analyze content quality and relevance to job descriptions',
      icon: Zap,
    },
    {
      title: 'Style',
      description: 'Ensure consistent styling and professional appearance',
      icon: Settings,
    },
    {
      title: 'Skills',
      description: 'Identify and validate technical and soft skills',
      icon: Award,
    },
    {
      title: 'Keywords',
      description: 'Check for relevant keywords from job descriptions',
      icon: BarChart3,
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
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#1A1A2E] hover:text-[#4A6CF7] text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-[#1A1A2E] hover:text-[#4A6CF7] text-sm font-medium transition-colors">
                About
              </Link>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-[#1A1A2E] hover:text-[#4A6CF7] font-medium text-sm">
                Login
              </button>
              <button className="bg-[#1B2B6B] text-white px-6 py-2 font-medium text-sm hover:bg-[#141f4d] transition-colors">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#1A1A2E]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-4 border-t border-gray-200 mt-4">
              <Link href="/" className="block text-[#1A1A2E] hover:text-[#4A6CF7] py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="block text-[#1A1A2E] hover:text-[#4A6CF7] py-2 text-sm font-medium">
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

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Content - 60% */}
            <div className="md:col-span-3">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-[#1A1A2E] leading-tight mb-6">
                Get Expert Feedback on your{' '}
                <span className="text-[#4A6CF7]">Resume</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                Our free AI-powered resume checker scores your resume on key criteria recruiters and hiring managers look for. Get actionable steps to revamp your resume and land more interviews.
              </p>

              {/* Upload Box */}
              <Link href="/analyze">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 mb-8 text-center hover:border-[#4A6CF7] transition-colors cursor-pointer">
                  <Upload className="mx-auto mb-3 text-[#4A6CF7]" size={32} />
                  <p className="text-gray-900 font-semibold text-base sm:text-lg mb-1">Drop your resume here or choose a file</p>
                  <p className="text-gray-600 text-sm mb-4">PDF or DOC/DOCX only. Max 5MB file size.</p>
                </div>
              </Link>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#1B2B6B] border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by over one million job seekers globally.</p>
                </div>
              </div>
            </div>

            {/* Right Dashboard Mockup - 40% */}
            <div className="md:col-span-2 flex justify-center md:justify-end">
              <div className="bg-gradient-to-br from-[#1B2B6B] to-[#4A6CF7] rounded-xl p-6 shadow-2xl transform -rotate-2 w-full max-w-sm">
                <div className="bg-white rounded-lg p-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 text-sm mb-4">Your ATS Score</p>
                    <div className="relative w-32 h-32 mx-auto mb-2">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#scoreGradient)"
                          strokeWidth="8"
                          strokeDasharray={`${(92 / 100) * 283} 283`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1B2B6B" />
                            <stop offset="100%" stopColor="#4A6CF7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-[#1B2B6B]">92</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Great Score</p>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-gray-200 text-xs">
                    <div className="flex justify-between text-gray-700">
                      <span>Formatting</span>
                      <span className="font-semibold">88</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-[#4A6CF7]" style={{ width: '88%' }} />
                    </div>
                    <div className="flex justify-between text-gray-700 pt-2">
                      <span>Keywords</span>
                      <span className="font-semibold">92</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-[#4A6CF7]" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Help Section - Navy Background */}
      <section className="bg-[#1B2B6B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Resume Mockup */}
            <div className="flex justify-center order-2 md:order-1">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-xs">
                <div className="space-y-3 text-xs">
                  <div className="font-bold text-[#1A1A2E] text-sm">JOHN DOE</div>
                  <div className="text-[#6B7280] text-xs">john@example.com | (555) 123-4567</div>
                  <div className="h-0.5 bg-[#1B2B6B]" />
                  <div className="space-y-1">
                    <div className="h-1 bg-gray-300" />
                    <div className="h-1 bg-gray-300 w-5/6" />
                    <div className="h-1 bg-gray-300 w-4/6" />
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="h-1 bg-gray-300" />
                    <div className="h-1 bg-gray-300 w-4/6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right List */}
            <div className="space-y-8 order-1 md:order-2">
              <div>
                <div className="text-[#4A6CF7] font-black text-sm mb-3">01</div>
                <h3 className="text-white text-xl sm:text-2xl font-black mb-3">Getting your resume right is not easy</h3>
                <p className="text-gray-300 text-sm sm:text-base">Your resume is often the first impression recruiters have of you. Small formatting issues can cost you the opportunity.</p>
              </div>
              <div>
                <div className="text-[#4A6CF7] font-black text-sm mb-3">02</div>
                <h3 className="text-white text-xl sm:text-2xl font-black mb-3">3 in 5 recruiters reject resumes instantly</h3>
                <p className="text-gray-300 text-sm sm:text-base">Without proper ATS optimization, your resume may never reach human eyes. Our checker helps you beat the bots.</p>
              </div>
              <div>
                <div className="text-[#4A6CF7] font-black text-sm mb-3">03</div>
                <h3 className="text-white text-xl sm:text-2xl font-black mb-3">Our AI uses cutting-edge technology</h3>
                <p className="text-gray-300 text-sm sm:text-base">Our AI-powered resume checker analyzes your resume using industry best practices and real ATS feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4">
              Our AI-Powered <span className="text-[#4A6CF7]">Resume</span> Checker
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              will help you create a resume tailored to the position
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-[#4A6CF7] transition-all">
                  <Icon className="text-[#4A6CF7] mb-4" size={28} />
                  <h3 className="text-[#1A1A2E] font-black text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ATS Understanding - Row 1 */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-6">
                Get an <span className="text-[#4A6CF7]">ATS</span> understanding check
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                ATS (Applicant Tracking Systems) are used by 98% of large companies to screen resumes. Our checker analyzes your resume against real ATS requirements to ensure it passes the initial screening.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 sm:h-72 md:h-80 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <FileText size={48} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">ATS Analysis Mockup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Fixing - Row 2 */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 sm:h-72 md:h-80 flex items-center justify-center order-2 md:order-1">
              <div className="text-gray-400 text-center">
                <Zap size={48} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">AI Recommendations</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-6">
                Fixing the errors by the help of <span className="text-[#4A6CF7]">AI</span>
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Our advanced AI doesn't just point out problems—it provides actionable recommendations to fix them. Get specific suggestions for improving formatting, keywords, and content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Navy */}
      <section className="bg-[#1B2B6B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            Get your <span className="text-[#4A6CF7]">Resume</span> score now!
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-12">
            Upload your resume and you'll get a detailed analysis with actionable recommendations.
          </p>

          <Link href="/analyze">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 cursor-pointer hover:border-[#4A6CF7] transition-colors">
              <Upload className="mx-auto mb-4 text-[#4A6CF7]" size={40} />
              <p className="text-[#1A1A2E] font-black text-lg sm:text-xl mb-2">Drop your Resume here</p>
              <p className="text-gray-600 text-sm mb-6">PDF or DOC/DOCX only. Max 5MB file size.</p>
              <button className="bg-[#1B2B6B] text-white px-8 sm:px-12 py-3 font-black hover:bg-[#0f1a42] transition-colors">
                Analyze My Resume →
              </button>
            </div>
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
