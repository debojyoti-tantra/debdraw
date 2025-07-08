import { Briefcase, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footrer = () => {
    return (
        <>
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
        </>
    )
}

export default Footrer