"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { GlowScene } from "./glow-scene"
import { TransitionLink } from "./transition-link"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <GlowScene />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Copyright Section */}
          <div className="flex-1">
            <p className="text-neutral-400 text-sm">
              xWorld Roleplay &copy; {new Date().getFullYear()} Innovate. Create. Inspire. All rights reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-3">Social Media</h4>
              <div className="flex flex-col gap-2">
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Twitter
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Instagram
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  YouTube
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  TikTok
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Discord
                </TransitionLink>
              </div>
            </div>

            {/* Legal & Company Links */}
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-3">Links</h4>
              <div className="flex flex-col gap-2">
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Privacy
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Company
                </TransitionLink>
                <TransitionLink href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Partners
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
