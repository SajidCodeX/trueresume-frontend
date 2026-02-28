'use client'

import React, { useState } from 'react'
import { Menu, X, Upload, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Analyze() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const steps = [
    { label: 'Parsing Resume', icon: FileText },
    { label: 'Analyzing Format', icon: CheckCircle },
    { label: 'Checking Keywords', icon: CheckCircle },
    { label: 'Generating Score', icon: CheckCircle },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert('Please select a resume file')
      return
    }

    setLoading(true)
    setStep(0)

    try {
      // Simulate upload steps
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStep(1)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStep(2)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStep(3)

      // In a real app, send to backend
      // const formData = new FormData()
      // formData.append('resume', resumeFile)
      // if (jobDescription) formData.append('job_description', jobDescription)
      // const response = await fetch('https://trueresume-backend.onrender.com/api/analyze', {
      //   method: 'POST',
      //   body: formData
      // })
      // const data = await response.json()

      // Mock result
      const mockResult = {
        score: 92,
        status: 'Excellent',
        metrics: {
          formatting: 88,
          keywords: 92,
          readability: 87,
          contact: 95,
          experience: 89,
          skills: 91,
        },
      }

      // Store result and navigate
      sessionStorage.setItem('analysisResult', JSON.stringify(mockResult))
      sessionStorage.setItem('resumeFileName', resumeFile.name)

      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/results')
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Error analyzing resume. Please try again.')
      setLoading(false)
    }
  }

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

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {!loading ? (
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A2E] mb-4 text-center">
              Analyze your <span className="text-[#4A6CF7]">Resume</span>
            </h1>
            <p className="text-gray-600 text-center text-base sm:text-lg mb-12">
              Upload your resume to get an instant ATS compatibility score and actionable recommendations.
            </p>

            {/* Resume Upload */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8 hover:border-[#4A6CF7] transition-colors cursor-pointer bg-gray-50"
            >
              <Upload className="mx-auto mb-4 text-[#4A6CF7]" size={48} />
              <p className="text-[#1A1A2E] font-black text-lg mb-2">
                {resumeFile ? resumeFile.name : 'Drop your resume here'}
              </p>
              <p className="text-gray-600 text-sm mb-6">or</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <button className="bg-[#4A6CF7] text-white px-8 py-2 font-black hover:bg-[#3a58d1] transition-colors">
                  Choose File
                </button>
              </label>
              <p className="text-gray-500 text-xs mt-4">PDF or DOC/DOCX only. Max 5MB.</p>
            </div>

            {/* Job Description (Optional) */}
            <div className="mb-8">
              <label className="block text-[#1A1A2E] font-black mb-3">
                Job Description (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get tailored recommendations..."
                className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:border-[#4A6CF7]"
                rows={6}
              />
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!resumeFile}
              className="w-full bg-[#1B2B6B] text-white py-3 font-black hover:bg-[#141f4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-lg"
            >
              Analyze My Resume →
            </button>
          </>
        ) : (
          <div className="py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A2E] mb-12">Analyzing your resume...</h2>
            <div className="space-y-6">
              {steps.map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      step > i ? 'bg-green-50 border border-green-200' : i === step ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon
                      className={`flex-shrink-0 ${
                        step > i ? 'text-green-600' : i === step ? 'text-[#4A6CF7] animate-spin' : 'text-gray-400'
                      }`}
                      size={24}
                    />
                    <span
                      className={`font-semibold ${
                        step > i ? 'text-green-600' : i === step ? 'text-[#4A6CF7]' : 'text-gray-600'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
