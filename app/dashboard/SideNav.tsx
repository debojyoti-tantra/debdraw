'use client'
import { File, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useConvex } from 'convex/react'
import { useUser } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const SideNav = ({ toggle }: any) => {

    const menuList = [
        {
            id: 1,
            name: 'File',
            icon: File,
            path: ''
        },
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const convex = useConvex()
    const { user }: any = useUser()
    const router = useRouter()

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.primaryEmailAddress?.emailAddress })
        if (!result.length) {
            router.push('/team/create')
        }
    }

    return (
        <div className={`shadow-sm border-r h-full w-full md:w-60 p-5 bg-white dark:bg-black absolute md:relative z-10 md:block`}>
            <div className='flex justify-end md:hidden'>
                <X className='h-6 w-6 text-gray-500 dark:text-gray-400 cursor-pointer' onClick={() => toggle(false)} />
            </div>
            <div className='flex justify-center'>
                <Image src={'/file.svg'} alt='logo' width={100} height={100} />
            </div>

            <div className='flex justify-center mt-2'>
                <Button className='w-full justify-start gap-2 font-bold mt-1 bg-blue-600 hover:bg-blue-700'>
                    <Plus className='h-5 w-5' />
                    New File
                </Button>
            </div>

            <div className='mt-7'>
                {
                    menuList.map((item, index) => (
                        <div key={index} onClick={() => toggle(false)} className={`flex gap-2 items-center p-2 mt-1 text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-white cursor-pointer rounded-md ${activeIndex == index ? 'bg-primary text-white' : null}`}>
                            <item.icon className='h-6 w-6' />
                            <h2>{item.name}</h2>
                        </div>
                    ))
                }
            </div>

            <div className='absolute bottom-5'>
                <Button className='w-full justify-start gap-2 font-bold mt-1 bg-red-600 hover:bg-red-700' onClick={() => checkTeam()}>
                    <Plus className='h-5 w-5' />
                    Create Team
                </Button>
            </div>

        </div>
    )
}

export default SideNav
