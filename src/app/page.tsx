"use client"

import Image from "next/image"
import { toast } from "sonner"
import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FAQSection } from "@/components/faq-section"
import Footer from "@/components/Footer"

const videoSources = ["/h9.webm", "/h8.webm", "/h7.webm", "/h10.webm"]

export default function Home() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [email, setEmail] = useState("")

  const [isValid, setIsValid] = useState(true)

  const validateEmail = useCallback((email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsValid(validateEmail(newEmail))
  }, [validateEmail])

  const handleClick = async ()=> {
    const toastID = toast.loading("Adding to waitlist");

    let res = await fetch('/api/join-waitinglist', {
      method: 'POST',
      body: JSON.stringify({
        email : email
      })
    })

    res = await res.json()

    toast.success(res?.message, {
        id: toastID
    });
   }
  

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videoSources.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20 opacity-50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4">
        <div className="flex flex-col items-center pt-8">
          {/* Logo with hover effect */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image src="/meraxes logo.png" alt="Meraxes Logo" width={64} height={64} className="mb-4 invert" />
          </motion.div>

          {/* Subtitle with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-base font-light tracking-wide text-gray-300"
          >
            Create TikToks, Youtube Shorts and Reels in just one click.
          </motion.p>

          {/* Main headline with stagger animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ lineHeight: "1.1" }}
          >
            GENERATE VIRAL CLIPS
            <br />
            FROM YOUR STREAMS IN{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              REAL-TIME
            </span>
          </motion.h1>

          {/* Main content grid */}
          <div className="relative grid w-full max-w-6xl grid-cols-1 gap-24 px-4 lg:grid-cols-[1fr,auto,1fr]">
            {/* Video grid with hover effects */}
            <div className="grid grid-cols-2 gap-4">
              {videoSources.map((src, index) => (
                <motion.div
                  key={src}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <video
                    src={src}
                    className={`h-[240px] w-full object-cover transition-all duration-700 ${
                      activeVideo === index ? "opacity-100" : "opacity-60"
                    }`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Video overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Animated Arrow */}
            <div className="hidden items-center justify-center lg:flex">
              <motion.div 
                animate={{ 
                  x: [0, 12, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 opacity-50 blur-lg" />
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* CTA card with glassmorphism effect */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-xl">
                <h2 className="mb-6 text-2xl font-bold">Join the Waitlist</h2>
                <p className="mb-8 text-sm text-gray-300">
                  Be the first to access our AI-powered viral clip generator and transform your content game forever.
                </p>
                <div className="space-y-4">
                  <Input
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    className="h-10 border-white/20 bg-white/10 text-sm text-white placeholder:text-gray-400"
                  />
                  {!isValid && (
                    <p id="email-error" className="text-sm text-red-600" role="alert">
                      Please enter a valid email address.
                    </p>
                  )}
                  <Button
                    onClick={handleClick}
                    className="h-10 w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-sm font-semibold text-white transition-all hover:opacity-90"
                    size="default"
                  >
                    Get Early Access
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Second Box */}
          <div className="mt-24 w-full max-w-[1380px] rounded-[18px] bg-[#F5F5F7] px-6 py-11">
            <div className="relative flex min-h-[680px]">
              <div className="max-w-[500px] mt-28 text-center">
                <h2 className="text-[21px] text-black">
                  Launch the <span className="inline-flex items-center justify-center border border-black rounded-[14px] px-3 py-1 font-normal text-black">plugin</span>
                </h2>

                <h1 className="mt-6 text-[32px] font-medium leading-tight">
                  <span className="bg-gradient-to-r from-[#6790BC] to-[#91B7D9] bg-clip-text text-transparent">
                    Initiate the stream. <br /> Do your thing.
                  </span>
                </h1>

                <h2 className="text-[16px] font-normal mt-7 text-black">
                  Our AI will be looking and constantly monitoring the stream in real-time, keeping up and working in sync with the stream delay set in place by you.
                </h2>

                <div className="flex items-center justify-center space-x-4 mt-16">
                  <button className="bg-[#000000] text-white px-5 py-1.5 rounded-[20px] hover:scale-105 transition-transform duration-300 active:scale-95 text-[13px] hover:shadow-md active:shadow-sm">
                    Get Started
                  </button>
                  <Link
                    href="/learnmore"
                    className="text-[#000000] hover:text-[#000000] transition-all duration-300 relative group text-[15px]"
                  >
                    Learn more
                    <span className="absolute bottom-[-3px] left-0 w-0 h-[0.5px] bg-[#000000] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              </div>

              <div className="absolute right-0 top-20 bottom-8 w-[700px]">
                <Image
                  src="/plugin.avif"
                  alt="Plugin"
                  fill
                  className="rounded-tl-2xl rounded-bl-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Captions Box */}
          <div className="mt-24 w-full max-w-[1380px] rounded-[18px] bg-[#F5F5F7] px-16 py-16">
            <div className="relative h-[680px]">
              <Image
                src="/captions5.avif"
                alt="Captions"
                fill
                className="rounded-[18px] object-cover"
              />
            </div>
          </div>

          {/* Edit and Chat Analysis Boxes */}
          <div className="mt-24 mb-24 flex w-full max-w-[1380px] justify-center space-x-8">
            <div className="relative h-[550px] w-[670px] overflow-hidden rounded-[18px] bg-[#F5F5F7]">
              <Image
                src="/edit5.avif"
                alt="Automatic Edit"
                fill
                className="rounded-[18px] object-cover"
              />
            </div>
            <div className="relative h-[550px] w-[670px] overflow-hidden rounded-[18px] bg-[#F5F5F7]">
              <Image
                src="/chat7.avif"
                alt="Chat Analysis"
                fill
                className="rounded-[18px] object-cover"
              />
            </div>
          </div>

          <div className="w-full">
            <FAQSection />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

