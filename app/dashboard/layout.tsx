'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'

const layout = ({ children }: any) => {

    return (
        <SidebarProvider>
        <div className='flex flex-row w-[100vw]'>
                <AppSidebar />
            <div className='w-[100%]'>
                <Navbar />
                {children}
            </div>
        </div>
        </SidebarProvider>
    )
}

export default layout
