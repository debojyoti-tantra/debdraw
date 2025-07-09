import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SignOutButton, SignedIn, SignedOut, UserButton, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

const Navbar = () => {
  const { openSignIn, openSignUp } = useClerk()

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#0d0d0d]">
      <div className="flex items-center space-x-2">
        <SidebarTrigger />
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
          <div className='bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 w-fit px-2 py-1 rounded'>
            <SignOutButton />
          </div>
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
  )
}

export default Navbar