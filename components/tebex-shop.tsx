"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Star, Gift, Crown, Zap } from "lucide-react"

const shopCategories = [
  {
    icon: <Crown className="w-8 h-8" />,
    title: "VIP Pakete",
    description: "Exklusive VIP-Vorteile und Premium-Features für das ultimative Roleplay-Erlebnis.",
    features: ["Prioritäts-Queue", "Exklusive Fahrzeuge", "VIP-Support", "Spezielle Emotes"],
    price: "ab 9.99€",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Ingame Währung",
    description: "Starte mit einem finanziellen Vorteil und baue dein Imperium schneller auf.",
    features: ["Sofortige Übertragung", "Sichere Transaktion", "24/7 Verfügbar", "Bonus bei größeren Paketen"],
    price: "ab 4.99€",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: "Cosmetics & Items",
    description: "Personalisiere deinen Charakter mit einzigartigen Kleidungsstücken und Accessoires.",
    features: ["Exklusive Outfits", "Seltene Accessoires", "Custom Designs", "Limitierte Editionen"],
    price: "ab 2.99€",
    color: "from-purple-500 to-pink-500",
  },
]

export function TebexShop() {
  return (
    <section id="shop" className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Server{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Shop</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-balance">
            Supporte den Server & erhalte exklusive Vorteile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {shopCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-r ${category.color} rounded-full text-white shadow-lg`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {category.price}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{category.description}</p>

              <ul className="space-y-2 mb-8">
                {category.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                    <Star className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                className={`w-full bg-gradient-to-r ${category.color} text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Jetzt kaufen
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Main Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white shadow-lg shadow-purple-500/25">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Vollständiger Shop</h3>
                <p className="text-blue-400 font-semibold">Powered by Tebex</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Entdecke unser vollständiges Sortiment an VIP-Paketen, Ingame-Währung, Fahrzeugen, Immobilien und vielem
              mehr. Sichere Zahlungen über Tebex garantiert.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-purple-500/25 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={20} />
                  Zum Tebex Shop
                </motion.button>
              </a>

              <motion.button
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift size={20} />
                Geschenkgutscheine
              </motion.button>
            </div>

            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-400 text-sm font-medium">
                💡 Tipp: Mit dem Kauf von Shop-Items unterstützt du die Entwicklung und den Betrieb des Servers!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
