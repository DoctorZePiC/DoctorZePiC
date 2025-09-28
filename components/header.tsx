"use client"

import { TransitionLink } from "./transition-link"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

gsap.registerPlugin(ScrollToPlugin)

export function Header() {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 2,
    })
  }, [])

  return (
    <motion.header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md p-4 rounded-full border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <TransitionLink href="/" className="text-white font-bold text-xl">
          <div className="flex items-center gap-3">
            <motion.div
              className="relative w-10 h-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image src="/xworld-logo.png" alt="xWorld Roleplay" width={40} height={40} className="drop-shadow-lg" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse" />
            </motion.div>
            <span className="hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
              xWorld Roleplay
            </span>
          </div>
        </TransitionLink>

        <nav className="hidden md:flex items-center gap-6 text-white">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <TransitionLink href="/" className="hover:text-cyan-400 transition-all duration-300 relative group">
              {t("nav.home")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </TransitionLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <TransitionLink href="#features" className="hover:text-cyan-400 transition-all duration-300 relative group">
              {t("nav.features")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </TransitionLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <TransitionLink
              href="#how-to-join"
              className="hover:text-cyan-400 transition-all duration-300 relative group"
            >
              {t("nav.join")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </TransitionLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <TransitionLink href="#faq" className="hover:text-cyan-400 transition-all duration-300 relative group">
              {t("nav.faq")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </TransitionLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <a
              href="https://forum.xworld-roleplay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-all duration-300 relative group"
            >
              {t("nav.forum")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <TransitionLink href="#partner" className="hover:text-cyan-400 transition-all duration-300 relative group">
              {t("nav.partner")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </TransitionLink>
          </motion.div>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          <motion.a
            href="https://discord.gg/xworld-roleplay"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <motion.button
              className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-purple-500/25 border border-purple-400/30 backdrop-blur-sm overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(147, 51, 234, 0.8), 0 0 80px rgba(147, 51, 234, 0.4)",
                borderColor: "rgba(147, 51, 234, 1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-30"
                animate={{
                  background: [
                    "linear-gradient(45deg, #8b5cf6, #ec4899, #6366f1)",
                    "linear-gradient(45deg, #ec4899, #6366f1, #8b5cf6)",
                    "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />

              {/* Discord logo animation */}
              <div className="relative flex items-center gap-3">
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </motion.svg>
                <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent font-bold">
                  Discord
                </span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </motion.button>
          </motion.a>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="md:hidden absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
        >
          <nav className="flex flex-col gap-4 text-white">
            <TransitionLink href="/" className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10">
              {t("nav.home")}
            </TransitionLink>
            <TransitionLink
              href="#features"
              className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10"
            >
              {t("nav.features")}
            </TransitionLink>
            <TransitionLink
              href="#how-to-join"
              className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10"
            >
              {t("nav.join")}
            </TransitionLink>
            <TransitionLink href="#faq" className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10">
              {t("nav.faq")}
            </TransitionLink>
            <a
              href="https://forum.xworld-roleplay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10"
            >
              {t("nav.forum")}
            </a>
            <TransitionLink
              href="#partner"
              className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10"
            >
              {t("nav.partner")}
            </TransitionLink>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <LanguageSelector />
              <a href="https://discord.gg/xworld-roleplay" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-purple-500/25">
                  Discord
                </button>
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
