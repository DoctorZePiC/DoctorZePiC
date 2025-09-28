"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Wie trete ich bei?",
    answer:
      "Folge unserem How to Join Guide oben auf der Seite. Du musst unserem Discord beitreten, die Whitelist abholen und FiveM installieren.",
  },
  {
    question: "Was brauche ich, um zu spielen?",
    answer:
      "Du benötigst ein sauberes GTA V ohne Mods oder Reshade. Unser Server bietet serverseitige Grafik-Mods mit 0 Performance Impact.",
  },
  {
    question: "Gibt es ein Mindestalter?",
    answer: "Das Mindestalter beträgt 16 Jahre. Ausnahmen können über den Support angefragt werden.",
  },
  {
    question: "Wie funktioniert die Whitelist?",
    answer:
      "Die Whitelist erfolgt über Discord. Nach dem Beitritt zu unserem Discord-Server kannst du dir selbstständig die Whitelist abholen.",
  },
  {
    question: "Darf ich mir Grafik-Mods installieren?",
    answer:
      "Nein, da wir serverseitig 0 Performance Impact Grafik-Mods anbieten und Overhauls der GTA-Grafik bereitstellen. Externe Mods sind nicht erlaubt.",
  },
  {
    question: "Welche Regeln gibt es auf dem Server?",
    answer:
      "Alle Regeln findest du in unserem Discord und Forum. Grundsätzlich gilt: Respektvoller Umgang, realistisches Roleplay und keine Cheats oder Exploits.",
  },
  {
    question: "Kann ich mit Freunden zusammen spielen?",
    answer:
      "Ja! Du kannst gerne mit Freunden auf dem Server spielen. Achtet darauf, dass alle die Whitelist-Prozedur durchlaufen.",
  },
  {
    question: "Wie oft finden Events statt?",
    answer:
      "Wir veranstalten regelmäßig Events und Community-Aktivitäten. Informationen dazu findest du in unserem Discord und Forum.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Häufig gestellte{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Fragen</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-balance">
            Hier findest du Antworten auf die wichtigsten Fragen rund um unseren Server
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  )}
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Weitere Fragen?</h3>
            <p className="text-gray-300 mb-6">
              Unser Support-Team hilft dir gerne weiter. Kontaktiere uns über Discord oder das Forum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discord Support
                </motion.button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Forum besuchen
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
