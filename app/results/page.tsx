'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, RotateCcw, CheckCircle2, AlertCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Results() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [score, setScore] = useState(0)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Animate score
    const result = sessionStorage.getItem('analysisResult')
    const file = sessionStorage.getItem('resumeFileName')
    if (result && file) {
      const data = JSON.parse(result)
      setFileName(file)
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev < data.score) return Math.min(prev + 1, data.score)
          clearInterval(interval)
          return data.score
        })
      }, 20)
      return () => clearInterval(interval)
    }
  }, [])

  const mockIssues = {
    all: [
      { id: 1, level: 'high', title: 'Missing Contact Information', description: 'Add a professional email and phone number at the top' },
      { id: 2, level: 'high', title: 'Weak Action Verbs', description: 'Replace passive language with strong action verbs (Led, Developed, etc.)' },
      { id: 3, level: 'medium', title: 'Inconsistent Date Format', description: 'Standardize all dates to MM/YYYY format' },
      { id: 4, level: 'medium', title: 'Missing Keywords', description: 'Add industry-specific keywords from job description' },
      { id: 5, level: 'low', title: 'Extra Whitespace', description: 'Remove unnecessary gaps between sections' },
    ],
    high: [
      { id: 1, level: 'high', title: 'Missing Contact Information', description: 'Add a professional email and phone number at the top' },
      { id: 2, level: 'high', title: 'Weak Action Verbs', description: 'Replace passive language with strong action verbs (Led, Developed, etc.)' },
    ],
    medium: [
      { id: 3, level: 'medium', title: 'Inconsistent Date Format', description: 'Standardize all dates to MM/YYYY format' },
      { id: 4, level: 'medium', title: 'Missing Keywords', description: 'Add industry-specific keywords from job description' },
    ],
    low: [
      { id: 5, level: 'low', title: 'Extra Whitespace', description: 'Remove unnecessary gaps between sections' },
    ],
  }

  const displayedIssues = mockIssues[activeTab as keyof typeof mockIssues] || mockIssues.all

  const metrics = [
    { label: 'Formatting', score: 88 },
    { label: 'Keywords', score: 92 },
    { label: 'Readability', score: 87 },
    { label: 'Contact', score: 95 },
    { label: 'Experience', score: 89 },
    { label: 'Skills', score: 91 },
  ]

  const foundKeywords = ['leadership', 'project management', 'python', 'data analysis', 'communication']
  const missingKeywords = ['machine learning', 'cloud computing', 'agile', 'system design', 'AWS']

  const scoreLabel = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'

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
              <Link href="/about" className="text-[#1A1A2E] hover:text-[#4A6CF7] text-sm font-medium transition-colors">
                About
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-[#1A1A2E] hover:text-[#4A6CF7] font-medium text-sm">
                Login
              </button>
              <button className="bg-[#1B2B6B] text-white px-6 py-2 font-medium text-sm hover:bg-[#141f4d] transition-colors">
                Sign Up
              </button>
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
              <Link href="/about" className="block text-[#1A1A2E] hover:text-[#4A6CF7] py-2 text-sm font-medium">
                About
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">Analyzed Resume:</p>
            <p className="font-black text-[#1A1A2E]">{fileName}</p>
          </div>
          <Link href="/analyze">
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
              <RotateCcw size={18} />
              Analyze Another Resume
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Score Hero */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-[#1B2B6B] to-[#4A6CF7] rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-gray-300 text-sm sm:text-base mb-6">Your ATS Score</p>
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={`${(score / 100) * 283} 283`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl sm:text-7xl font-black text-white">{score}</span>
                  <span className="text-white font-black text-sm mt-1">{scoreLabel}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {metrics.map((m, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-white font-black text-lg">{m.score}</p>
                  <p className="text-white/70 text-xs font-medium">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issues Panel */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-6">Issues Found</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'high', 'medium', 'low'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-black text-sm uppercase tracking-tight transition-colors ${
                  activeTab === tab
                    ? 'bg-[#1B2B6B] text-white'
                    : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                }`}
              >
                {tab === 'all' ? 'All Issues' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Priority`}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {displayedIssues.map((issue) => (
              <div key={issue.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  {issue.level === 'high' && <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />}
                  {issue.level === 'medium' && <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />}
                  {issue.level === 'low' && <CheckCircle2 className="text-blue-500 flex-shrink-0" size={24} />}
                  <div className="flex-1">
                    <h3 className="font-black text-[#1A1A2E] text-lg mb-2">{issue.title}</h3>
                    <p className="text-gray-600 text-sm">{issue.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-black text-[#1A1A2E] mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-600" size={24} />
              Keywords Found
            </h3>
            <div className="flex flex-wrap gap-2">
              {foundKeywords.map((kw) => (
                <span key={kw} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-[#1A1A2E] mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-600" size={24} />
              Keywords Missing
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw) => (
                <span key={kw} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Wins & Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-black text-[#1A1A2E] text-xl mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} />
              What's Working Well
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={18} />
                <span>Strong professional summary</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={18} />
                <span>Relevant work experience</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={18} />
                <span>Clear formatting and readability</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-black text-[#1A1A2E] text-xl mb-4">Quick Wins</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Add 2-3 more relevant keywords</li>
              <li>• Include quantifiable achievements</li>
              <li>• Standardize date formatting</li>
            </ul>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="font-black text-[#1A1A2E] mb-4">Resume Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">547</p>
              <p className="text-xs text-gray-600 mt-1">Total Words</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">8</p>
              <p className="text-xs text-gray-600 mt-1">Sections</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">42</p>
              <p className="text-xs text-gray-600 mt-1">Keywords</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">1</p>
              <p className="text-xs text-gray-600 mt-1">Page</p>
            </div>
          </div>
        </div>

        {/* Ad Placeholder */}
        <div id="ad-slot-results" className="mt-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-500">Advertisement Space</p>
        </div>
      </div>
    </div>
  )
}
