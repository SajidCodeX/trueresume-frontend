'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, RotateCcw, CheckCircle2, AlertCircle, AlertTriangle, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Results() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [score, setScore] = useState(0)
  const [fileName, setFileName] = useState('')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const result = sessionStorage.getItem('analysisResult')
    const file = sessionStorage.getItem('resumeFileName')
    if (result && file) {
      const parsed = JSON.parse(result)
      setData(parsed)
      setFileName(file)
      const targetScore = parsed.overall_score || 0
      let current = 0
      const interval = setInterval(() => {
        current += 1
        setScore(current)
        if (current >= targetScore) clearInterval(interval)
      }, 20)
      return () => clearInterval(interval)
    }
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No analysis data found.</p>
          <Link href="/analyze">
            <button className="bg-[#1B2B6B] text-white px-6 py-2 font-black">
              Analyze a Resume
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const issues = data.issues || []
  const filteredIssues = activeTab === 'all'
    ? issues
    : issues.filter((i: any) => i.severity === activeTab)

  const sectionScores = data.section_scores || {}
  const metrics = [
    { label: 'Formatting', score: sectionScores.formatting || 0 },
    { label: 'Keywords', score: sectionScores.keywords || 0 },
    { label: 'Readability', score: sectionScores.readability || 0 },
    { label: 'Contact', score: sectionScores.contact_info || 0 },
    { label: 'Experience', score: sectionScores.work_experience || 0 },
    { label: 'Skills', score: sectionScores.skills || 0 },
  ]

  const foundKeywords = data.keywords_found || []
  const missingKeywords = data.keywords_missing || []
  const strengths = data.strengths || []
  const quickWins = data.quick_wins || []

  const scoreLabel =
    score >= 90 ? 'Excellent' :
    score >= 75 ? 'Good' :
    score >= 50 ? 'Fair' : 'Poor'

  const passRateColor =
    data.pass_rate === 'Very High' || data.pass_rate === 'High' ? 'bg-green-100 text-green-800' :
    data.pass_rate === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800'

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b border-gray-200 shadow-sm' : 'bg-white border-b border-gray-100'
      }`}>
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
              <Link href="/" className="text-[#1A1A2E] hover:text-[#4A6CF7] text-sm font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-[#1A1A2E] hover:text-[#4A6CF7] text-sm font-medium transition-colors">About</Link>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="text-[#1A1A2E] hover:text-[#4A6CF7] font-medium text-sm">Login</button>
              <button className="bg-[#1B2B6B] text-white px-6 py-2 font-medium text-sm hover:bg-[#141f4d] transition-colors">Sign Up</button>
            </div>
            <button className="md:hidden text-[#1A1A2E]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-4 border-t border-gray-200 mt-4">
              <Link href="/" className="block text-[#1A1A2E] hover:text-[#4A6CF7] py-2 text-sm font-medium">Home</Link>
              <Link href="/about" className="block text-[#1A1A2E] hover:text-[#4A6CF7] py-2 text-sm font-medium">About</Link>
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
            <p className="text-gray-300 text-sm sm:text-base mb-2">Your ATS Score</p>
            {data.pass_rate && (
              <span className={`inline-block px-4 py-1 rounded-full text-xs font-black mb-6 ${passRateColor}`}>
                ATS Pass Rate: {data.pass_rate}
              </span>
            )}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8"
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
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-6">
            Issues Found ({issues.length})
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'high', 'medium', 'low'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-black text-sm uppercase tracking-tight transition-colors ${
                  activeTab === tab ? 'bg-[#1B2B6B] text-white' : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                }`}
              >
                {tab === 'all' ? 'All Issues' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Priority`}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filteredIssues.length === 0 ? (
              <p className="text-gray-500 text-sm">No issues in this category.</p>
            ) : (
              filteredIssues.map((issue: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {issue.severity === 'high' && <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />}
                    {issue.severity === 'medium' && <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />}
                    {issue.severity === 'low' && <CheckCircle2 className="text-blue-500 flex-shrink-0" size={24} />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-black text-[#1A1A2E] text-lg">{issue.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                          issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>{issue.category}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                      {issue.suggestion && (
                        <p className="text-[#4A6CF7] text-sm font-semibold">
                          💡 {issue.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Keywords */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-black text-[#1A1A2E] mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-600" size={24} />
              Keywords Found ({foundKeywords.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {foundKeywords.map((kw: string) => (
                <span key={kw} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-[#1A1A2E] mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-600" size={24} />
              Keywords Missing ({missingKeywords.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw: string) => (
                <span key={kw} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Quick Wins */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-black text-[#1A1A2E] text-xl mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} />
              What's Working Well
            </h3>
            <ul className="space-y-3">
              {strengths.map((s: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-black text-[#1A1A2E] text-xl mb-4 flex items-center gap-2">
              <Zap className="text-blue-600" size={24} />
              Quick Wins
            </h3>
            <ul className="space-y-3">
              {quickWins.map((w: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-blue-600 font-black">⚡</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-16">
          <h3 className="font-black text-[#1A1A2E] mb-4">Resume Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">{data.word_count || 0}</p>
              <p className="text-xs text-gray-600 mt-1">Total Words</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">{issues.length}</p>
              <p className="text-xs text-gray-600 mt-1">Issues Found</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">{foundKeywords.length}</p>
              <p className="text-xs text-gray-600 mt-1">Keywords Found</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1B2B6B]">{data.pass_rate || 'N/A'}</p>
              <p className="text-xs text-gray-600 mt-1">Pass Rate</p>
            </div>
          </div>
        </div>

        {/* Ad Slot */}
        <div id="ad-slot-results" className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-sm">Advertisement</p>
        </div>
      </div>
    </div>
  )
}
