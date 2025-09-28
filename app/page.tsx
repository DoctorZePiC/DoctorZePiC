import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { AdvancedFeatures } from "@/components/advanced-features"
import { HowToJoin } from "@/components/how-to-join"
import { FAQ } from "@/components/faq"
import { TebexButton } from "@/components/tebex-button"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AdvancedFeatures />
      <HowToJoin />
      <FAQ />
      <TebexButton />
    </>
  )
}
