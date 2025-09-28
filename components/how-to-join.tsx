"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageCircle, Shield, Download, FolderOpen, BookOpen } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Discord joinen",
    description: "Tritt unserem Discord-Server bei und werde Teil unserer Community.",
    details: "Klicke auf den Discord-Link und folge den Anweisungen zur Registrierung.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Discord mit 2FA verbinden",
    description: "Verbinde deinen Discord mit 2FA, akzeptiere die Regeln und hole dir selbstständig die Whitelist ab.",
    details: "Dies ist gegen Multi-Accounts und Cheater, um unsere Spieler zu schützen.",
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "FiveM herunterladen & installieren",
    description: "Lade FiveM von der offiziellen Website herunter und installiere es.",
    details: "Falls FiveM bereits installiert ist, springe zu Schritt 4!",
  },
  {
    icon: <FolderOpen className="w-8 h-8" />,
    title: "FiveM Ordner bereinigen",
    description: "Für einwandfreie Nutzung lösche alle Ordner im FiveM-Verzeichnis.",
    details: "Gehe zu %localappdata%\\FiveM\\FiveM.app\\data (einfach oben im Explorer eingeben)",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Erste Schritte auf dem Server",
    description: "Starte dein Abenteuer mit unserem Einsteiger-Guide.",
    details: "Links zu Regeln & Einsteiger-Guide findest du in unserem Forum und Gitbook.",
  },
]

export function HowToJoin() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const steps = containerRef.current?.querySelectorAll(".step-card")

    if (steps) {
      steps.forEach((step, index) => {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }
  }, [])

  return (
    <section id="how-to-join" className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-6xl" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Wie man{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">beitritt</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-balance">
            Folge diesen einfachen Schritten, um Teil unserer Community zu werden
          </p>
        </motion.div>

        <div className="grid gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card flex flex-col lg:flex-row items-center gap-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-blue-500 to-transparent" />
                  )}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white shadow-lg shadow-blue-500/25">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg mb-4 leading-relaxed">{step.description}</p>
                  <p className="text-blue-400 text-sm font-medium">{step.details}</p>

                  {/* Special buttons for certain steps */}
                  {index === 0 && (
                    <div className="mt-6">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <motion.button
                          className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle size={20} />
                          Discord beitreten
                        </motion.button>
                      </a>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="mt-6">
                      <a href="https://fivem.net" target="_blank" rel="noopener noreferrer">
                        <motion.button
                          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-green-500/25 transition-all duration-300"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(34, 197, 94, 0.5)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download size={20} />
                          FiveM herunterladen
                        </motion.button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Bereit loszulegen?</h3>
            <p className="text-gray-300 mb-6">Folge allen Schritten und starte dein Roleplay-Abenteuer!</p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Zum Discord Server
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
