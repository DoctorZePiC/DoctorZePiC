"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "at", name: "Österreichisch", flag: "🇦🇹" },
  { code: "ch", name: "Schweizerdeutsch", flag: "🇨🇭" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  languages: Language[]
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.join": "How to Join",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Tired of the servers?",
    "hero.subtitle": "We are too!",
    "hero.description": "Come to our server - we offer the most features!",
    "hero.join": "Join Now",
    "hero.discord": "Discord Link",
    "hero.shop": "To Shop",

    // Features Section
    "features.title": "Our Features",
    "features.subtitle": "Discover the unique features that make our server something special",
    "features.realistic.title": "Realistic Roleplay",
    "features.realistic.description":
      "Experience authentic roleplay scenarios with a dedicated community that values quality and realism.",
    "features.community.title": "Active Community & Events",
    "features.community.description":
      "Regular events, tournaments and community activities provide varied entertainment around the clock.",
    "features.economy.title": "Own Economic System",
    "features.economy.description":
      "A well-thought-out economic system with jobs, companies and a realistic market for true immersion.",
    "features.faction.title": "Planned Faction Structure",
    "features.faction.description":
      "Organized factions with clear hierarchies and exciting storylines for long-term character development.",
    "features.custom.title": "Custom Scripts & Vehicles",
    "features.custom.description":
      "Unique scripts and a large selection of vehicles for an incomparable gaming experience.",

    // Advanced Features Section
    "advanced.title": "Our Server Systems",
    "advanced.subtitle":
      "Discover the cutting-edge systems and innovations that make xWorld Roleplay a unique experience",
    "advanced.uid.title": "UID System",
    "advanced.uid.description": "Unique ID System to track players and ensure maximum security.",
    "advanced.nextgen.title": "Next-Gen Systems",
    "advanced.nextgen.description":
      "Highly modern next-generation systems with completely new innovation in the scene.",
    "advanced.midcore.title": "Midcore Roleplay",
    "advanced.midcore.description": "The perfect mix between action and roleplay for the ultimate gaming experience.",
    "advanced.height.title": "Adjustable Body Height",
    "advanced.height.description": "Adjustable character body height, the hitbox does not change.",
    "advanced.mods.title": "Server-side Mods",
    "advanced.mods.description": "Server-side crosshairs and graphics mods for optimal performance and fairness.",
    "advanced.anticheat.title": "Human Cheat Detection",
    "advanced.anticheat.description":
      "The best cheat detection on the market: The human eye. No PC checks or anti-cheat scans.",
    "advanced.clothing.title": "44,000 Clothing Items",
    "advanced.clothing.description":
      "44,000 clothing files and possibilities - all Lore Friendly for authentic roleplay.",
    "advanced.vehicles.title": "200+ Lore Friendly Vehicles",
    "advanced.vehicles.description":
      "Over 200 Lore Friendly modded vehicles that are TOS safe and enrich the gaming experience.",
    "advanced.medical.title": "Advanced Medicine",
    "advanced.medical.description": "Highly modern medical system with realistic injuries and healing processes.",
    "advanced.faction.title": "Faction Management",
    "advanced.faction.description":
      "Problems with the faction? Faction management helps you with building or problems.",

    // How to Join Section
    "join.title": "How to Join",
    "join.subtitle": "Follow these simple steps to become part of our community",
    "join.step1.title": "Join Discord",
    "join.step1.description": "Join our Discord server and become part of our community.",
    "join.step1.details": "Click on the Discord link and follow the registration instructions.",
    "join.step2.title": "Connect Discord with 2FA",
    "join.step2.description": "Connect your Discord with 2FA, accept the rules and get the whitelist yourself.",
    "join.step2.details": "This is against multi-accounts and cheaters to protect our players.",
    "join.step3.title": "Download & Install FiveM",
    "join.step3.description": "Download FiveM from the official website and install it.",
    "join.step3.details": "If FiveM is already installed, skip to step 4!",
    "join.step4.title": "Clean FiveM Folder",
    "join.step4.description": "For proper use, delete all folders in the FiveM directory.",
    "join.step4.details": "Go to %localappdata%\\FiveM\\FiveM.app\\data (just enter at the top in Explorer)",
    "join.step5.title": "First Steps on the Server",
    "join.step5.description": "Start your adventure with our beginner guide.",
    "join.step5.details": "Links to rules & beginner guide can be found in our forum and Gitbook.",
    "join.ready.title": "Ready to get started?",
    "join.ready.description": "Follow all steps and start your roleplay adventure!",
    "join.ready.button": "To Discord Server",

    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Here you will find answers to the most important questions about our server",
    "faq.q1": "How do I join?",
    "faq.a1":
      "Follow our How to Join Guide above on the page. You must join our Discord, get the whitelist and install FiveM.",
    "faq.q2": "What do I need to play?",
    "faq.a2":
      "You need a clean GTA V without mods or Reshade. Our server offers server-side graphics mods with 0 performance impact.",
    "faq.q3": "Is there a minimum age?",
    "faq.a3": "The minimum age is 16 years. Exceptions can be requested through support.",
    "faq.q4": "How does the whitelist work?",
    "faq.a4":
      "The whitelist is done via Discord. After joining our Discord server, you can get the whitelist yourself.",
    "faq.q5": "Can I install graphics mods?",
    "faq.a5":
      "No, because we offer server-side 0 performance impact graphics mods and provide GTA graphics overhauls. External mods are not allowed.",
    "faq.q6": "What rules are there on the server?",
    "faq.a6":
      "All rules can be found in our Discord and forum. Basically: Respectful interaction, realistic roleplay and no cheats or exploits.",
    "faq.q7": "Can I play with friends?",
    "faq.a7": "Yes! You can play with friends on the server. Make sure everyone goes through the whitelist procedure.",
    "faq.q8": "How often do events take place?",
    "faq.a8":
      "We regularly organize events and community activities. Information about this can be found in our Discord and forum.",
    "faq.more.title": "More questions?",
    "faq.more.description": "Our support team is happy to help you. Contact us via Discord or the forum.",
    "faq.discord": "Discord Support",
    "faq.forum": "Visit Forum",

    // Shop Section
    "shop.button": "To Tebex Shop",
    "shop.nopay2win": "No Pay2Win",
    "shop.community": "Community Focused",
    "shop.description":
      "Our shop offers only cosmetic items and quality-of-life improvements. We believe in fair gameplay where skill and roleplay matter most, not your wallet. Support our community-driven server while keeping the game balanced for everyone.",
    "shop.title": "Server Shop",
    "shop.subtitle": "Support the server & get exclusive benefits",
    "shop.vip.title": "VIP Packages",
    "shop.vip.description": "Exclusive VIP benefits and premium features for the ultimate roleplay experience.",
    "shop.currency.title": "Ingame Currency",
    "shop.currency.description": "Start with a financial advantage and build your empire faster.",
    "shop.cosmetics.title": "Cosmetics & Items",
    "shop.cosmetics.description": "Personalize your character with unique clothing and accessories.",
    "shop.full.title": "Complete Shop",
    "shop.full.description":
      "Discover our complete range of VIP packages, ingame currency, vehicles, real estate and much more. Secure payments via Tebex guaranteed.",
    "shop.buy": "Buy Now",
    "shop.vouchers": "Gift Vouchers",
    "shop.tip": "💡 Tip: By purchasing shop items you support the development and operation of the server!",

    // Categories
    "category.security": "Security",
    "category.innovation": "Innovation",
    "category.gameplay": "Gameplay",
    "category.character": "Character",
    "category.tech": "Technology",
    "category.anticheat": "Anti-Cheat",
    "category.customization": "Customization",
    "category.vehicles": "Vehicles",
    "category.realism": "Realism",
    "category.support": "Support",

    // Buttons
    "button.discord": "Join Discord",
    "button.download": "Download FiveM",

    // Footer
    "footer.social": "Social Media",
    "footer.links": "Links",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms of Service",
    "footer.company": "Company",
    "footer.partners": "Partners",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  de: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.join": "Beitreten",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Müde von den Servern?",
    "hero.subtitle": "Wir auch!",
    "hero.description": "Komm auf unseren Server - wir bieten die meisten Features!",
    "hero.join": "Jetzt beitreten",
    "hero.discord": "Discord Link",
    "hero.shop": "Zum Shop",

    // Features Section
    "features.title": "Unsere Features",
    "features.subtitle": "Entdecke die einzigartigen Features, die unseren Server zu etwas Besonderem machen",
    "features.realistic.title": "Realistisches Roleplay",
    "features.realistic.description":
      "Erlebe authentische Rollenspiel-Szenarien mit einer engagierten Community, die Wert auf Qualität und Realismus legt.",
    "features.community.title": "Aktive Community & Events",
    "features.community.description":
      "Regelmäßige Events, Turniere und Community-Aktivitäten sorgen für abwechslungsreiche Unterhaltung rund um die Uhr.",
    "features.economy.title": "Eigenes Wirtschaftssystem",
    "features.economy.description":
      "Ein durchdachtes Wirtschaftssystem mit Jobs, Unternehmen und einem realistischen Markt für echte Immersion.",
    "features.faction.title": "Geplante Fraktions Struktur",
    "features.faction.description":
      "Organisierte Fraktionen mit klaren Hierarchien und spannenden Storylines für langfristige Charakterentwicklung.",
    "features.custom.title": "Custom Scripts & Fahrzeuge",
    "features.custom.description":
      "Einzigartige Scripts und eine große Auswahl an Fahrzeugen für ein unvergleichliches Spielerlebnis.",

    // Advanced Features Section
    "advanced.title": "Unsere Server Systeme",
    "advanced.subtitle":
      "Entdecke die hochmodernen Systeme und Innovationen, die xWorld Roleplay zu einem einzigartigen Erlebnis machen",
    "advanced.uid.title": "UID System",
    "advanced.uid.description":
      "Unique ID System um Spieler zurück zu verfolgen und maximale Sicherheit zu gewährleisten.",
    "advanced.nextgen.title": "Next-Gen Systeme",
    "advanced.nextgen.description":
      "Hoch moderne Systeme der nächsten Generation mit ganz neuer Innovation in der Szene.",
    "advanced.midcore.title": "Midcore Roleplay",
    "advanced.midcore.description":
      "Die perfekte Mischung zwischen Action und Roleplay für das ultimative Spielerlebnis.",
    "advanced.height.title": "Verstellbare Körpergröße",
    "advanced.height.description": "Verstellbare Körpergröße des Charakters, dabei verändert sich die Hitbox nicht.",
    "advanced.mods.title": "Serverseitige Mods",
    "advanced.mods.description": "Serverseitige Crosshairs und Grafikmods für optimale Performance und Fairness.",
    "advanced.anticheat.title": "Menschliche Cheat Detection",
    "advanced.anticheat.description":
      "Die beste Cheat Detection auf dem Markt: Das menschliche Auge. Keine PC-Checks oder Anti-Cheat Scans.",
    "advanced.clothing.title": "44.000 Kleidungsstücke",
    "advanced.clothing.description":
      "44.000 Dateien an Kleidung und Möglichkeiten - alles Lore Friendly für authentisches Roleplay.",
    "advanced.vehicles.title": "200+ Lore Friendly Fahrzeuge",
    "advanced.vehicles.description":
      "Über 200 Lore Friendly modded Fahrzeuge die TOS sicher sind und das Spielerlebnis bereichern.",
    "advanced.medical.title": "Erweiterte Medizin",
    "advanced.medical.description": "Hochmodernes Medizinsystem mit realistischen Verletzungen und Heilungsprozessen.",
    "advanced.faction.title": "Fraktionsverwaltung",
    "advanced.faction.description":
      "Probleme mit der Fraktion? Die Fraktionsverwaltung hilft dir beim Aufbau oder bei Problemen.",

    // How to Join Section
    "join.title": "Wie man beitritt",
    "join.subtitle": "Folge diesen einfachen Schritten, um Teil unserer Community zu werden",
    "join.step1.title": "Discord joinen",
    "join.step1.description": "Tritt unserem Discord-Server bei und werde Teil unserer Community.",
    "join.step1.details": "Klicke auf den Discord-Link und folge den Anweisungen zur Registrierung.",
    "join.step2.title": "Discord mit 2FA verbinden",
    "join.step2.description":
      "Verbinde deinen Discord mit 2FA, akzeptiere die Regeln und hole dir selbstständig die Whitelist ab.",
    "join.step2.details": "Dies ist gegen Multi-Accounts und Cheater, um unsere Spieler zu schützen.",
    "join.step3.title": "FiveM herunterladen & installieren",
    "join.step3.description": "Lade FiveM von der offiziellen Website herunter und installiere es.",
    "join.step3.details": "Falls FiveM bereits installiert ist, springe zu Schritt 4!",
    "join.step4.title": "FiveM Ordner bereinigen",
    "join.step4.description": "Für einwandfreie Nutzung lösche alle Ordner im FiveM-Verzeichnis.",
    "join.step4.details": "Gehe zu %localappdata%\\FiveM\\FiveM.app\\data (einfach oben im Explorer eingeben)",
    "join.step5.title": "Erste Schritte auf dem Server",
    "join.step5.description": "Starte dein Abenteuer mit unserem Einsteiger-Guide.",
    "join.step5.details": "Links zu Regeln & Einsteiger-Guide findest du in unserem Forum und Gitbook.",
    "join.ready.title": "Bereit loszulegen?",
    "join.ready.description": "Folge allen Schritten und starte dein Roleplay-Abenteuer!",
    "join.ready.button": "Zum Discord Server",

    // FAQ Section
    "faq.title": "Häufig gestellte Fragen",
    "faq.subtitle": "Hier findest du Antworten auf die wichtigsten Fragen rund um unseren Server",
    "faq.q1": "Wie trete ich bei?",
    "faq.a1":
      "Folge unserem How to Join Guide oben auf der Seite. Du musst unserem Discord beitreten, die Whitelist abholen und FiveM installieren.",
    "faq.q2": "Was brauche ich, um zu spielen?",
    "faq.a2":
      "Du benötigst ein sauberes GTA V ohne Mods oder Reshade. Unser Server bietet serverseitige Grafik-Mods mit 0 Performance Impact.",
    "faq.q3": "Gibt es ein Mindestalter?",
    "faq.a3": "Das Mindestalter beträgt 16 Jahre. Ausnahmen können über den Support angefragt werden.",
    "faq.q4": "Wie funktioniert die Whitelist?",
    "faq.a4":
      "Die Whitelist erfolgt über Discord. Nach dem Beitritt zu unserem Discord-Server kannst du dir selbstständig die Whitelist abholen.",
    "faq.q5": "Darf ich mir Grafik-Mods installieren?",
    "faq.a5":
      "Nein, da wir serverseitig 0 Performance Impact Grafik-Mods anbieten und Overhauls der GTA-Grafik bereitstellen. Externe Mods sind nicht erlaubt.",
    "faq.q6": "Welche Regeln gibt es auf dem Server?",
    "faq.a6":
      "Alle Regeln findest du in unserem Discord und Forum. Grundsätzlich gilt: Respektvoller Umgang, realistisches Roleplay und keine Cheats oder Exploits.",
    "faq.q7": "Kann ich mit Freunden zusammen spielen?",
    "faq.a7":
      "Ja! Du kannst gerne mit Freunden auf dem Server spielen. Achtet darauf, dass alle die Whitelist-Prozedur durchlaufen.",
    "faq.q8": "Wie oft finden Events statt?",
    "faq.a8":
      "Wir veranstalten regelmäßig Events und Community-Aktivitäten. Informationen dazu findest du in unserem Discord und Forum.",
    "faq.more.title": "Weitere Fragen?",
    "faq.more.description": "Unser Support-Team hilft dir gerne weiter. Kontaktiere uns über Discord oder das Forum.",
    "faq.discord": "Discord Support",
    "faq.forum": "Forum besuchen",

    // Shop Section
    "shop.button": "Zum Tebex Shop",
    "shop.nopay2win": "Kein Pay2Win",
    "shop.community": "Community-orientiert",
    "shop.description":
      "Unser Shop bietet nur kosmetische Gegenstände und Lebensqualitäts-Verbesserungen. Wir glauben an faires Gameplay, bei dem Können und Roleplay am wichtigsten sind, nicht dein Geldbeutel. Unterstütze unseren community-getriebenen Server und halte das Spiel für alle ausgewogen.",
    "shop.title": "Server Shop",
    "shop.subtitle": "Supporte den Server & erhalte exklusive Vorteile",
    "shop.vip.title": "VIP Pakete",
    "shop.vip.description": "Exklusive VIP-Vorteile und Premium-Features für das ultimative Roleplay-Erlebnis.",
    "shop.currency.title": "Ingame Währung",
    "shop.currency.description": "Starte mit einem finanziellen Vorteil und baue dein Imperium schneller auf.",
    "shop.cosmetics.title": "Cosmetics & Items",
    "shop.cosmetics.description": "Personalisiere deinen Charakter mit einzigartigen Kleidungsstücken und Accessoires.",
    "shop.full.title": "Vollständiger Shop",
    "shop.full.description":
      "Entdecke unser vollständiges Sortiment an VIP-Paketen, Ingame-Währung, Fahrzeugen, Immobilien und vielem mehr. Sichere Zahlungen über Tebex garantiert.",
    "shop.buy": "Jetzt kaufen",
    "shop.vouchers": "Geschenkgutscheine",
    "shop.tip": "💡 Tipp: Mit dem Kauf von Shop-Items unterstützt du die Entwicklung und den Betrieb des Servers!",

    // Categories
    "category.security": "Sicherheit",
    "category.innovation": "Innovation",
    "category.gameplay": "Gameplay",
    "category.character": "Charakter",
    "category.tech": "Technik",
    "category.anticheat": "Anti-Cheat",
    "category.customization": "Customization",
    "category.vehicles": "Fahrzeuge",
    "category.realism": "Realismus",
    "category.support": "Support",

    // Buttons
    "button.discord": "Discord beitreten",
    "button.download": "FiveM herunterladen",

    // Footer
    "footer.social": "Social Media",
    "footer.links": "Links",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
    "footer.company": "Unternehmen",
    "footer.partners": "Partner",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  pt: {
    "nav.home": "Início",
    "nav.features": "Recursos",
    "nav.join": "Como Entrar",
    "nav.faq": "FAQ",
    "nav.forum": "Fórum",
    "nav.partner": "Parceiro",
    "hero.title": "Cansado dos servidores?",
    "hero.subtitle": "Nós também!",
    "hero.description": "Venha para o nosso servidor - oferecemos os recursos mais completos!",
    "hero.join": "Entrar Agora",
    "hero.discord": "Link do Discord",
    "hero.shop": "Ir para a Loja",
    "features.title": "Nossos Recursos",
    "features.subtitle": "Descubra os recursos únicos que tornam o nosso servidor algo especial",
    "features.realistic.title": "Roleplay Realista",
    "features.realistic.description":
      "Experimente cenários de roleplay autênticos com uma comunidade dedicada que valoriza qualidade e realismo.",
    "features.community.title": "Comunidade Ativa & Eventos",
    "features.community.description":
      "Eventos regulares, torneios e atividades da comunidade fornecem entretenimento variado 24 horas por dia.",
    "features.economy.title": "Nosso Sistema Econômico",
    "features.economy.description":
      "Um sistema econômico bem pensado com empregos, empresas e um mercado realista para verdadeira imersão.",
    "features.faction.title": "Estrutura de Facções Planejada",
    "features.faction.description":
      "Facções organizadas com hierarquias claras e tramas emocionantes para desenvolvimento de personagens a longo prazo.",
    "features.custom.title": "Scripts e Veículos Personalizados",
    "features.custom.description":
      "Scripts únicos e uma grande seleção de veículos para uma experiência de jogo incomparável.",
    "advanced.title": "Sistemas do Nosso Servidor",
    "advanced.subtitle": "Descubra os sistemas de ponta e inovações que tornam o xWorld Roleplay uma experiência única",
    "advanced.uid.title": "Sistema UID",
    "advanced.uid.description": "Sistema UID único para rastrear jogadores e garantir máxima segurança.",
    "advanced.nextgen.title": "Sistemas Next-Gen",
    "advanced.nextgen.description":
      "Sistemas altamente modernos da próxima geração com inovação completamente nova na cena.",
    "advanced.midcore.title": "Roleplay Midcore",
    "advanced.midcore.description": "A perfeição entre ação e roleplay para a experiência de jogo mais incrível.",
    "advanced.height.title": "Altura do Corpo Ajustável",
    "advanced.height.description": "Altura ajustável do corpo do personagem, a hitbox não muda.",
    "advanced.mods.title": "Mods do Servidor",
    "advanced.mods.description": "Mods de mira e gráficos do servidor para desempenho ótimo e justiça.",
    "advanced.anticheat.title": "Detecção de Cheat Humana",
    "advanced.anticheat.description":
      "A melhor detecção de cheat no mercado: O olho humano. Sem verificações de PC ou varreduras anti-cheat.",
    "advanced.clothing.title": "44.000 Itens de Roupas",
    "advanced.clothing.description":
      "44.000 arquivos de roupas e possibilidades - tudo compatível com a lenda para roleplay autêntico.",
    "advanced.vehicles.title": "200+ Veículos Compatíveis com a Lenda",
    "advanced.vehicles.description":
      "Mais de 200 veículos compatíveis com a lenda modificados que são seguros para o TOS e enriquecem a experiência de jogo.",
    "advanced.medical.title": "Medicina Avançada",
    "advanced.medical.description": "Um sistema médico altamente moderno com ferimentos e processos de cura realistas.",
    "advanced.faction.title": "Gestão de Facções",
    "advanced.faction.description":
      "Problemas com a facção? A gestão de facções ajuda você a construir ou resolver problemas.",
    "join.title": "Como Entrar",
    "join.subtitle": "Siga esses passos simples para se tornar parte da nossa comunidade",
    "join.step1.title": "Entrar no Discord",
    "join.step1.description": "Entre no nosso servidor Discord e faça parte da nossa comunidade.",
    "join.step1.details": "Clique no link do Discord e siga as instruções de registro.",
    "join.step2.title": "Conectar Discord com 2FA",
    "join.step2.description":
      "Conecte o seu Discord com 2FA, aceite as regras e obtenha a whitelist por conta própria.",
    "join.step2.details": "Isso é contra contas múltiplas e truques para proteger nossos jogadores.",
    "join.step3.title": "Baixar e Instalar FiveM",
    "join.step3.description": "Baixe o FiveM do site oficial e instale-o.",
    "join.step3.details": "Se o FiveM já estiver instalado, pule para o passo 4!",
    "join.step4.title": "Limpar Pasta do FiveM",
    "join.step4.description": "Para uso adequado, exclua todas as pastas no diretório do FiveM.",
    "join.step4.details": "Vá para %localappdata%\\FiveM\\FiveM.app\\data (apenas entre no topo no Explorer)",
    "join.step5.title": "Primeiros Passos no Servidor",
    "join.step5.description": "Comece sua aventura com nosso guia para iniciantes.",
    "join.step5.details": "Links para regras e guia para iniciantes podem ser encontrados em nosso fórum e Gitbook.",
    "join.ready.title": "Pronto para começar?",
    "join.ready.description": "Siga todos os passos e comece sua aventura de roleplay!",
    "join.ready.button": "Ir para o Servidor Discord",
    "faq.title": "Perguntas Frequentes",
    "faq.subtitle": "Aqui você encontrará respostas para as perguntas mais importantes sobre o nosso servidor",
    "faq.q1": "Como faço para entrar?",
    "faq.a1":
      "Siga nosso Guia de Como Entrar acima na página. Você deve entrar no nosso Discord, obter a whitelist e instalar o FiveM.",
    "faq.q2": "O que preciso para jogar?",
    "faq.a2":
      "Você precisa de um GTA V limpo sem mods ou Reshade. Nosso servidor oferece mods de gráficos do lado do servidor com impacto zero de desempenho.",
    "faq.q3": "Existe uma idade mínima?",
    "faq.a3": "A idade mínima é de 16 anos. Exceções podem ser solicitadas através do suporte.",
    "faq.q4": "Como funciona a whitelist?",
    "faq.a4":
      "A whitelist é feita via Discord. Após entrar no nosso servidor Discord, você pode obter a whitelist por conta própria.",
    "faq.q5": "Posso instalar mods de gráficos?",
    "faq.a5":
      "Não, porque oferecemos mods de gráficos do lado do servidor com impacto zero de desempenho e fornecemos overhauls de gráficos do GTA. Mods externos não são permitidos.",
    "faq.q6": "Qual são as regras do servidor?",
    "faq.a6":
      "Todas as regras podem ser encontradas no nosso Discord e fórum. Basicamente: Interação respeitosa, roleplay realista e sem cheats ou truques.",
    "faq.q7": "Posso jogar com amigos?",
    "faq.a7":
      "Sim! Você pode jogar com amigos no servidor. Certifique-se de que todos passem pelo procedimento de whitelist.",
    "faq.q8": "Com que frequência ocorrem eventos?",
    "faq.a8":
      "Organizamos eventos e atividades da comunidade regularmente. Informações sobre isso podem ser encontradas no nosso Discord e fórum.",
    "faq.more.title": "Mais perguntas?",
    "faq.more.description":
      "Nosso time de suporte está feliz em ajudar você. Entre em contato conosco via Discord ou fórum.",
    "faq.discord": "Suporte Discord",
    "faq.forum": "Visite o Fórum",
    "shop.button": "Ir para a Loja Tebex",
    "shop.nopay2win": "Sem Pay2Win",
    "shop.community": "Focado na Comunidade",
    "shop.description": "Nossa loja oferece apenas itens cosméticos e melhorias de qualidade de vida.",
    "shop.title": "Loja do Servidor",
    "shop.subtitle": "Apoie o servidor e obtenha benefícios exclusivos",
    "shop.vip.title": "Pacotes VIP",
    "shop.vip.description":
      "Benefícios VIP exclusivos e recursos premium para a experiência de roleplay mais incrível.",
    "shop.currency.title": "Moeda no Jogo",
    "shop.currency.description": "Comece com uma vantagem financeira e construa seu império mais rápido.",
    "shop.cosmetics.title": "Cosméticos & Itens",
    "shop.cosmetics.description": "Personalize seu personagem com roupas e acessórios únicos.",
    "shop.full.title": "Loja Completa",
    "shop.full.description":
      "Descubra nosso catálogo completo de pacotes VIP, moeda no jogo, veículos, imóveis e muito mais. Pagamentos seguros via Tebex garantidos.",
    "shop.buy": "Comprar Agora",
    "shop.vouchers": "Vale Presente",
    "shop.tip": "💡 Dica: Ao comprar itens da loja, você apoia o desenvolvimento e o funcionamento do servidor!",
    "category.security": "Segurança",
    "category.innovation": "Inovação",
    "category.gameplay": "Gameplay",
    "category.character": "Personagem",
    "category.tech": "Tecnologia",
    "category.anticheat": "Anti-Cheat",
    "category.customization": "Customização",
    "category.vehicles": "Veículos",
    "category.realism": "Realismo",
    "category.support": "Suporte",
    "button.discord": "Entrar no Discord",
    "button.download": "Baixar FiveM",

    // Footer
    "footer.social": "Mídias Sociais",
    "footer.links": "Links",
    "footer.privacy": "Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.company": "Companhia",
    "footer.partners": "Parceiros",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  es: {
    "nav.home": "Inicio",
    "nav.features": "Características",
    "nav.join": "Cómo Unirse",
    "nav.faq": "FAQ",
    "nav.forum": "Foro",
    "nav.partner": "Socio",
    "hero.title": "¿Cansado de los servidores?",
    "hero.subtitle": "¡Nosotros también!",
    "hero.description": "Ven a nuestro servidor - ofrecemos las características más completas!",
    "hero.join": "Únete Ahora",
    "hero.discord": "Enlace de Discord",
    "hero.shop": "Ir a la Tienda",
    "features.title": "Nuestras Características",
    "features.subtitle": "Descubre las características únicas que hacen de nuestro servidor algo especial",
    "features.realistic.title": "Roleplay Realista",
    "features.realistic.description":
      "Experimenta escenarios de roleplay auténticos con una comunidad dedicada que valoriza calidad y realismo.",
    "features.community.title": "Comunidad Activa & Eventos",
    "features.community.description":
      "Eventos regulares, torneos y actividades de la comunidad proporcionan entretenimiento variado las 24 horas del día.",
    "features.economy.title": "Nuestro Sistema Económico",
    "features.economy.description":
      "Un sistema económico bien pensado con trabajos, empresas y un mercado realista para verdadera inmersión.",
    "features.faction.title": "Estructura de Facciones Planeada",
    "features.faction.description":
      "Facciones organizadas con jerarquías claras y tramas emocionantes para el desarrollo de personajes a largo plazo.",
    "features.custom.title": "Scripts y Vehículos Personalizados",
    "features.custom.description":
      "Scripts únicos y una gran selección de vehículos para una experiencia de juego incomparable.",
    "advanced.title": "Sistemas de Nuestro Servidor",
    "advanced.subtitle":
      "Descubre los sistemas de vanguardia e innovaciones que hacen de xWorld Roleplay una experiencia única",
    "advanced.uid.title": "Sistema UID",
    "advanced.uid.description": "Sistema UID único para rastrear jugadores y garantizar máxima seguridad.",
    "advanced.nextgen.title": "Sistemas Next-Gen",
    "advanced.nextgen.description":
      "Sistemas altamente modernos de la próxima generación con innovación completamente nueva en la escena.",
    "advanced.midcore.title": "Roleplay Midcore",
    "advanced.midcore.description": "La perfección entre acción y roleplay para la experiencia de juego más increíble.",
    "advanced.height.title": "Altura del Cuerpo Ajustable",
    "advanced.height.description": "Altura ajustable del cuerpo del personaje, la hitbox no cambia.",
    "advanced.mods.title": "Mods del Servidor",
    "advanced.mods.description": "Mods de mira y gráficos del servidor para un rendimiento óptimo y justicia.",
    "advanced.anticheat.title": "Detección de Cheat Humana",
    "advanced.anticheat.description":
      "La mejor detección de cheat en el mercado: El ojo humano. Sin verificaciones de PC o escaneos anti-cheat.",
    "advanced.clothing.title": "44.000 Artículos de Ropa",
    "advanced.clothing.description":
      "44.000 archivos de ropa y posibilidades - todo compatible con la leyenda para roleplay auténtico.",
    "advanced.vehicles.title": "200+ Vehículos Compatibles con la Leyenda",
    "advanced.vehicles.description":
      "Más de 200 vehículos compatibles con la leyenda modificados que son seguros para el TOS y enriquecen la experiencia de juego.",
    "advanced.medical.title": "Medicina Avanzada",
    "advanced.medical.description":
      "Un sistema médico altamente moderno con lesiones y procesos de curación realistas.",
    "advanced.faction.title": "Gestión de Facciones",
    "advanced.faction.description":
      "¿Problemas con la facción? La gestión de facciones te ayuda a construir o resolver problemas.",
    "join.title": "Cómo Unirse",
    "join.subtitle": "Sigue estos pasos simples para ser parte de nuestra comunidad",
    "join.step1.title": "Unirse a Discord",
    "join.step1.description": "Únete a nuestro servidor Discord y sé parte de nuestra comunidad.",
    "join.step1.details": "Haz clic en el enlace de Discord y sigue las instrucciones de registro.",
    "join.step2.title": "Conectar Discord con 2FA",
    "join.step2.description": "Conecta tu Discord con 2FA, acepta las reglas y obtén la whitelist por tu cuenta.",
    "join.step2.details": "Esto es contra cuentas múltiples y trucos para proteger a nuestros jugadores.",
    "join.step3.title": "Descargar e Instalar FiveM",
    "join.step3.description": "Descarga FiveM del sitio web oficial e instálalo.",
    "join.step3.details": "Si FiveM ya está instalado, salta al paso 4!",
    "join.step4.title": "Limpiar Carpeta de FiveM",
    "join.step4.description": "Para un uso adecuado, elimina todas las carpetas en el directorio de FiveM.",
    "join.step4.details":
      "Ve a %localappdata%\\FiveM\\FiveM.app\\data (simplemente ingresa en la parte superior en Explorer)",
    "join.step5.title": "Primeros Pasos en el Servidor",
    "join.step5.description": "Comienza tu aventura con nuestro guía para principiantes.",
    "join.step5.details": "Enlaces a reglas y guía para principiantes se pueden encontrar en nuestro foro y Gitbook.",
    "join.ready.title": "¿Listo para comenzar?",
    "join.ready.description": "Sigue todos los pasos y comienza tu aventura de roleplay!",
    "join.ready.button": "Ir al Servidor Discord",
    "faq.title": "Preguntas Frecuentes",
    "faq.subtitle": "Aquí encontrarás respuestas a las preguntas más importantes sobre nuestro servidor",
    "faq.q1": "¿Cómo me uno?",
    "faq.a1":
      "Sigue nuestro Guía de Cómo Unirse arriba en la página. Debes unirte a nuestro servidor Discord, obtener la whitelist y instalar FiveM.",
    "faq.q2": "¿Qué necesito para jugar?",
    "faq.a2":
      "Necesitas un GTA V limpio sin mods o Reshade. Nuestro servidor ofrece mods de gráficos del lado del servidor con impacto cero de rendimiento.",
    "faq.q3": "¿Existe una edad mínima?",
    "faq.a3": "La edad mínima es de 16 años. Las excepciones pueden ser solicitadas a través del soporte.",
    "faq.q4": "¿Cómo funciona la whitelist?",
    "faq.a4":
      "La whitelist se realiza a través de Discord. Después de unirte a nuestro servidor Discord, puedes obtener la whitelist por tu cuenta.",
    "faq.q5": "¿Puedo instalar mods de gráficos?",
    "faq.a5":
      "No, porque ofrecemos mods de gráficos del lado del servidor con impacto cero de rendimiento y proporcionamos overhauls de gráficos del GTA. Los mods externos no están permitidos.",
    "faq.q6": "¿Qué reglas hay en el servidor?",
    "faq.a6":
      "Todas las reglas se pueden encontrar en nuestro Discord y foro. Básicamente: Interacción respetuosa, roleplay realista y sin trucos o exploits.",
    "faq.q7": "¿Puedo jugar con amigos?",
    "faq.a7":
      "¡Sí! Puedes jugar con amigos en el servidor. Asegúrate de que todos pasen por el procedimiento de whitelist.",
    "faq.q8": "¿Con qué frecuencia ocurren eventos?",
    "faq.a8":
      "Organizamos eventos y actividades de la comunidad regularmente. Información sobre esto se puede encontrar en nuestro Discord y foro.",
    "faq.more.title": "¿Más preguntas?",
    "faq.more.description":
      "Nuestro equipo de soporte está encantado de ayudarte. Contáctanos a través de Discord o el foro.",
    "faq.discord": "Soporte de Discord",
    "faq.forum": "Visita el Foro",
    "shop.button": "Ir a la Tienda Tebex",
    "shop.nopay2win": "Sin Pay2Win",
    "shop.community": "Enfocado en la Comunidad",
    "shop.description": "Nuestra tienda ofrece solo artículos cosméticos y mejoras de calidad de vida.",
    "shop.title": "Tienda del Servidor",
    "shop.subtitle": "Apoya el servidor y obtén beneficios exclusivos",
    "shop.vip.title": "Paquetes VIP",
    "shop.vip.description":
      "Beneficios VIP exclusivos y recursos premium para la experiencia de roleplay más increíble.",
    "shop.currency.title": "Moneda en el Juego",
    "shop.currency.description": "Empieza con una ventaja financiera y construye tu imperio más rápido.",
    "shop.cosmetics.title": "Cosméticos & Artículos",
    "shop.cosmetics.description": "Personaliza tu personaje con ropa y accesorios únicos.",
    "shop.full.title": "Tienda Completa",
    "shop.full.description":
      "Descubre nuestro catálogo completo de paquetes VIP, moneda en el juego, vehículos, inmuebles y mucho más. Pagos seguros a través de Tebex garantizados.",
    "shop.buy": "Comprar Ahora",
    "shop.vouchers": "Vales de Regalo",
    "shop.tip": "💡 Consejo: Al comprar artículos de la tienda, apoyas el desarrollo y el funcionamiento del servidor!",
    "category.security": "Seguridad",
    "category.innovation": "Innovación",
    "category.gameplay": "Gameplay",
    "category.character": "Personaje",
    "category.tech": "Tecnología",
    "category.anticheat": "Anti-Cheat",
    "category.customization": "Customización",
    "category.vehicles": "Vehículos",
    "category.realism": "Realismo",
    "category.support": "Soporte",
    "button.discord": "Unirse a Discord",
    "button.download": "Descargar FiveM",

    // Footer
    "footer.social": "Medios Sociales",
    "footer.links": "Enlaces",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.company": "Compañía",
    "footer.partners": "Socios",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]) // Default to English
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    try {
      const saved = localStorage.getItem("xworld-language")
      console.log("[v0] Saved language from localStorage:", saved)
      if (saved) {
        const found = languages.find((lang) => lang.code === saved)
        if (found) {
          console.log("[v0] Setting language to:", found)
          setCurrentLanguage(found)
        }
      }
    } catch (error) {
      console.error("[v0] Error loading language from localStorage:", error)
    }
  }, [])

  const setLanguage = (language: Language) => {
    console.log("[v0] Changing language to:", language)
    setCurrentLanguage(language)
    try {
      localStorage.setItem("xworld-language", language.code)
      console.log("[v0] Language saved to localStorage")
    } catch (error) {
      console.error("[v0] Error saving language to localStorage:", error)
    }
  }

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code]?.[key] || translations.en[key] || key
    return translation
  }

  if (!isHydrated) {
    return (
      <LanguageContext.Provider
        value={{ currentLanguage: languages[0], setLanguage: () => {}, languages, t: (key) => key }}
      >
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
