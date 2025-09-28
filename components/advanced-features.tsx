"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Shield, Eye, Shirt, Car, Heart, Gamepad2, Settings, Zap, Crown } from "lucide-react"
import { ImageModal } from "./image-modal"
import { useLanguage } from "@/context/language-context"

gsap.registerPlugin(ScrollTrigger)

export function AdvancedFeatures() {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    title: string
    description: string
  } | null>(null)

  const advancedFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("advanced.uid.title"),
      category: t("category.security"),
      description: t("advanced.uid.description"),
      image: "/identity-system.png",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t("advanced.nextgen.title"),
      category: t("category.innovation"),
      description: t("advanced.nextgen.description"),
      image: "/justice-department.png",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: t("advanced.midcore.title"),
      category: t("category.gameplay"),
      description: t("advanced.midcore.description"),
      image: "/jobs-management.png",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("advanced.height.title"),
      category: t("category.character"),
      description: t("advanced.height.description"),
      image: "/character-height.png",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: t("advanced.mods.title"),
      category: t("category.tech"),
      description: t("advanced.mods.description"),
      image: "/character-customization.png",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t("advanced.anticheat.title"),
      category: t("category.anticheat"),
      description: t("advanced.anticheat.description"),
      image: "/justice-department.png",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Shirt className="w-6 h-6" />,
      title: t("advanced.clothing.title"),
      category: t("category.customization"),
      description: t("advanced.clothing.description"),
      image: "/clothing-system.png",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: t("advanced.vehicles.title"),
      category: t("category.vehicles"),
      description: t("advanced.vehicles.description"),
      image: "/vehicle-garage.png",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t("advanced.medical.title"),
      category: t("category.realism"),
      description: t("advanced.medical.description"),
      image: "/medical-system.png",
      color: "from-rose-500 to-red-500",
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: t("advanced.faction.title"),
      category: t("category.support"),
      description: t("advanced.faction.description"),
      image: "/jobs-management.png",
      color: "from-violet-500 to-purple-500",
    },
  ]

  // ... existing useGSAP and handleImageClick code ...

  useGSAP(() => {
    const grid = gridRef.current
    const cards = grid?.querySelectorAll(".feature-card")

    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotateY: 45,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }
  }, [])

  const handleImageClick = (feature: (typeof advancedFeatures)[0]) => {
    setSelectedImage({
      src: feature.image,
      title: feature.title,
      description: feature.description,
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto max-w-7xl relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            {t("advanced.title").split(" ").slice(0, 2).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
              {t("advanced.title").split(" ").slice(2).join(" ")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto text-balance leading-relaxed">
            {t("advanced.subtitle")}
          </p>
        </motion.div>

        {/* ... existing grid code with advancedFeatures array now using translations ... */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {advancedFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${feature.color} text-white shadow-lg`}
                  >
                    {feature.category}
                  </span>
                </div>

                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => handleImageClick(feature)}>
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${feature.color} rounded-full text-white shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${feature.color} blur-xl -z-10 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full text-blue-400 font-semibold">
            <Zap className="w-5 h-5" />
            <span>Hoch moderne Systeme in der nächsten Generation</span>
          </div>
        </motion.div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        title={selectedImage?.title || ""}
        description={selectedImage?.description || ""}
      />
    </section>
  )
}
