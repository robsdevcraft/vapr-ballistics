"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "h-12 w-auto transition-opacity hover:opacity-80", width = 200, height = 48 }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use resolvedTheme to get the actual theme (light or dark)
  const currentTheme = mounted ? resolvedTheme : 'dark'
  const logoSrc = currentTheme === 'light' ? '/vapr-ballistics-light.svg' : '/vapr-ballistics.svg'

  return (
    <Image 
      src={logoSrc}
      alt="VAPR Ballistics" 
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
