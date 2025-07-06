'use client'
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, Github, Twitter, Briefcase } from "lucide-react";

export default function Home() {
  const { openSignIn, openSignUp } = useClerk()

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#0d0d0d]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-black dark:via-white to-blue-500 rounded-sm" />
          <span className="text-xl font-bold">
            <Link href={`/`}>
              debdraw
            </Link>
          </span>
        </div>

        <div className="space-x-2 text-sm flex items-center">
          <ThemeToggle />
          <SignedIn>
            <Link href={`/dashboard`}>
              <Button>
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button
              variant="outline"
              className="border-gray-500 dark:border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => openSignIn()}
            >
              Sign In
            </Button>
            <Button
              className="bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-gray-900 dark:hover:bg-gray-200"
              onClick={() => openSignUp()}
            >
              Sign Up
            </Button>
          </SignedOut>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-4 relative">
        <div className="absolute top-1/2 left-12 transform -translate-y-1/2 border border-black dark:border-white rounded-full px-4 py-2 text-xs">
          Diagram as Code
        </div>
        <div className="absolute top-1/2 right-12 transform -translate-y-1/2 border border-black dark:border-white rounded-full px-4 py-2 text-xs">
          AI Diagrams
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="text-blue-500">debdraw</span> a whiteboard application<br />and for design diagrams
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Deliver accurate, consistent designs faster
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition"
          >
            Try debdraw →
          </Link>
        </div>
      </section>

      {/* Preview Box */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 transition-colors">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Notices:</p>
          <div className="bg-gray-200 dark:bg-black p-4 rounded text-left">
            <p className="text-gray-900 dark:text-gray-200">
              New ferecheres are coming soon.....
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">Discover what makes debdraw so special</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
            <Image src="/file.svg" alt="Real-time Collaboration" width={50} height={50} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
            <p className="text-gray-700 dark:text-gray-300">Work together with your team in real-time.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
            <Image src="/window.svg" alt="AI-Powered Diagrams" width={50} height={50} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Diagrams</h3>
            <p className="text-gray-700 dark:text-gray-300">Generate diagrams from text prompts.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
            <Image src="/globe.svg" alt="Export to Anywhere" width={50} height={50} className="mx-auto mb-4 dark:invert-0" />
            <h3 className="text-xl font-semibold mb-2">Export to Anywhere</h3>
            <p className="text-gray-700 dark:text-gray-300">Export your diagrams to multiple formats.</p>
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">About The Developer</h2>
        <div className="flex justify-center space-x-6">
          <Link href="https://debojyoti.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
            <Briefcase className="mr-2" />
            Portfolio
          </Link>
          <Link href="https://github.com/debojyoti-tantra" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
            <Github className="mr-2" />
            GitHub
          </Link>
          <Link href="https://x.com/debojyotitantra" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
            <Twitter className="mr-2" />
            Twitter
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-300 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300">&copy; 2025 debdraw. All rights reserved.</p>
      </footer>
    </main>
  );
}