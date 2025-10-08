'use client'

import React, { useEffect, useState } from 'react'
import Loader from './Loader'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000) // 5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return <>{children}</>
}
