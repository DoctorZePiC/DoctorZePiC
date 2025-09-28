"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { ShoppingBag, Heart, Users } from "lucide-react"

export function TebexButton() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-6 mb-6">
              <motion.div className="flex items-center gap-2 text-cyan-400" whileHover={{ scale: 1.05 }}>
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{t("shop.nopay2win")}</span>
              </motion.div>
              <motion.div className="flex items-center gap-2 text-cyan-400" whileHover={{ scale: 1.05 }}>
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">{t("shop.community")}</span>
              </motion.div>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">{t("shop.description")}</p>
          </motion.div>

          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl shadow-cyan-500/25 border border-cyan-400/30 backdrop-blur-sm overflow-hidden"
              whileHover={{
                boxShadow: "0 0 50px rgba(6, 182, 212, 0.8), 0 0 100px rgba(6, 182, 212, 0.4)",
                borderColor: "rgba(6, 182, 212, 1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />

              <div className="relative flex items-center gap-4 text-xl">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <ShoppingBag className="w-6 h-6" />
                </motion.div>
                <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  {t("shop.button")}
                </span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </motion.button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
