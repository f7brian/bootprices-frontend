import About from '@/components/about/About'
import { CommonBanner } from '@/components/ui/CommonBanner'
import React from 'react'
import aboutImg from "@/assets/Rectangle 5336.png"

export default function aboutPage() {
  return (
    <div>
        <CommonBanner title='About Us' backgroundImage={aboutImg}/>
        <About/>
    </div>
  )
}
