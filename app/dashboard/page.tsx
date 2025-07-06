'use client'
import React, { useEffect } from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useConvex } from 'convex/react'
import { useUser } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api'

const Dashboard = () => {
  const convex = useConvex()
  const {user} : any = useUser()
  // const getUser = useQuery(api.user.getUser, {email: user?.primaryEmailAddress?.emailAddress})
  const createUser = useMutation(api.user.createUser)

  useEffect(() => {
    if (user) {
      // console.log(getUser)
      checkUser()
    }
  }, [user])

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, {email: user?.primaryEmailAddress?.emailAddress})
    if (!result.length) {
      createUser({
        fullName: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImage: user.imageUrl
      }).then(res => {
        console.log(res);
      })
    }
  }


  return (
    <div>
      Dashboard
      <div className='bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 w-fit px-2 py-1 rounded'>
        <SignOutButton />
      </div>
    </div>
  )
}

export default Dashboard