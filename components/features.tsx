"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, DollarSign, Shield, Car, Gamepad2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

gsap.registerPlugin(ScrollTrigger)

export function Features() {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const { t } = useLanguage()

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t("features.realistic.title"),
      description: t("features.realistic.description"),
      image: "/realistic-roleplay-scene-in-gta.jpg",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: t("features.community.title"),
      description: t("features.community.description"),
      image: "/community-tournament.jpg",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: t("features.economy.title"),
      description: t("features.economy.description"),
      image: "/economic-system-interface.jpg",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("features.faction.title"),
      description: t("features.faction.description"),
      image: "/faction-structure-organization.jpg",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: t("features.custom.title"),
      description: t("features.custom.description"),
      image: "/custom-vehicles-gta-roleplay.jpg",
    },
  ]

  useGSAP(() => {
    const timeline = timelineRef.current
    const items = timeline?.querySelectorAll(".timeline-item")

    if (items) {
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }
  }, [])

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-6xl" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            {t("features.title").split(" ")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t("features.title").split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-balance">{t("features.subtitle")}</p>
        </motion.div>

        {/* ... existing timeline code with features array now using translations ... */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 hidden lg:block" />

          {features.map((feature, index) => (
            <div
              key={index}
              className={`timeline-item flex items-center mb-16 lg:mb-24 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                <motion.div
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white shadow-lg shadow-blue-500/25">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
                </motion.div>
              </div>

              {/* Timeline dot */}
              <div className="hidden lg:flex w-2/12 justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50 z-10" />
              </div>

              {/* Image */}
              <div className={`w-full lg:w-5/12 mt-6 lg:mt-0 ${index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"}`}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
