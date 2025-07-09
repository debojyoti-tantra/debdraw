'use client'
import React, { use, useEffect, useState } from 'react'
import { SignOutButton, useSignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useConvex } from 'convex/react'
import { useUser } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const convex = useConvex()
  const { user }: any = useUser()
  // const getUser = useQuery(api.user.getUser, {email: user?.primaryEmailAddress?.emailAddress})
  const createUser = useMutation(api.user.createUser)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // console.log(getUser)
      checkUser()
    }
  }, [user])

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.primaryEmailAddress?.emailAddress })
    console.log(result);

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


  // redirected the user to create team page
  useEffect(() => {
    if (user) {
      checkTeam()
    }
  }, [user])

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, { email: user?.primaryEmailAddress?.emailAddress })
    if (!result.length) {
      router.push('/team/create')
    }
  }


  return (
    <div>
      Dashboard
      
    </div>
  )
}

export default Dashboard