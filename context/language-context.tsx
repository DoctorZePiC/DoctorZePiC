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
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.features": "機能",
    "nav.join": "参加方法",
    "nav.faq": "FAQ",
    "nav.forum": "フォーラム",
    "nav.partner": "パートナー",

    // Hero Section
    "hero.title": "サーバーに疲れましたか？",
    "hero.subtitle": "私たちもです！",
    "hero.description": "私たちのサーバーに来てください - 最も多くの機能を提供しています！",
    "hero.join": "今すぐ参加",
    "hero.discord": "Discordリンク",
    "hero.shop": "ショップへ",

    // Features Section
    "features.title": "私たちの機能",
    "features.subtitle": "私たちのサーバーを特別なものにするユニークな機能を発見してください",
    "features.realistic.title": "リアルなロールプレイ",
    "features.realistic.description":
      "品質とリアリズムを重視する献身的なコミュニティで本格的なロールプレイシナリオを体験してください。",
    "features.community.title": "アクティブなコミュニティ＆イベント",
    "features.community.description":
      "定期的なイベント、トーナメント、コミュニティ活動が24時間多様なエンターテイメントを提供します。",
    "features.economy.title": "独自の経済システム",
    "features.economy.description":
      "仕事、企業、リアルな市場を備えた、真の没入感のための綿密に考えられた経済システム。",
    "features.faction.title": "計画されたファクション構造",
    "features.faction.description":
      "明確な階層と長期的なキャラクター開発のためのエキサイティングなストーリーラインを持つ組織化されたファクション。",
    "features.custom.title": "カスタムスクリプト＆車両",
    "features.custom.description": "比類のないゲーム体験のためのユニークなスクリプトと豊富な車両の選択。",

    // Advanced Features Section
    "advanced.title": "私たちのサーバーシステム",
    "advanced.subtitle": "xWorld Roleplayをユニークな体験にする最先端のシステムと革新を発見してください",
    "advanced.uid.title": "UIDシステム",
    "advanced.uid.description": "プレイヤーを追跡し、最大限のセキュリティを確保するユニークIDシステム。",
    "advanced.nextgen.title": "次世代システム",
    "advanced.nextgen.description": "シーンで全く新しい革新を持つ高度にモダンな次世代システム。",
    "advanced.midcore.title": "ミッドコアロールプレイ",
    "advanced.midcore.description": "究極のゲーム体験のためのアクションとロールプレイの完璧なミックス。",
    "advanced.height.title": "調整可能な体の高さ",
    "advanced.height.description": "キャラクターの体の高さを調整可能、ヒットボックスは変わりません。",
    "advanced.mods.title": "サーバーサイドMod",
    "advanced.mods.description": "最適なパフォーマンスと公平性のためのサーバーサイドクロスヘアとグラフィックMod。",
    "advanced.anticheat.title": "人間のチート検出",
    "advanced.anticheat.description":
      "市場で最高のチート検出：人間の目。PCチェックやアンチチートスキャンはありません。",
    "advanced.clothing.title": "44,000の衣類アイテム",
    "advanced.clothing.description": "44,000の衣類ファイルと可能性 - すべて本格的なロールプレイのためのLore Friendly。",
    "advanced.vehicles.title": "200以上のLore Friendly車両",
    "advanced.vehicles.description": "TOSセーフでゲーム体験を豊かにする200以上のLore Friendlyモッド車両。",
    "advanced.medical.title": "高度な医学",
    "advanced.medical.description": "リアルな怪我と治癒プロセスを持つ高度にモダンな医療システム。",
    "advanced.faction.title": "ファクション管理",
    "advanced.faction.description":
      "ファクションに問題がありますか？ファクション管理が構築や問題の解決をお手伝いします。",

    // How to Join Section
    "join.title": "参加方法",
    "join.subtitle": "これらの簡単なステップに従って私たちのコミュニティの一員になってください",
    "join.step1.title": "Discordに参加",
    "join.step1.description": "私たちのDiscordサーバーに参加し、コミュニティの一員になってください。",
    "join.step1.details": "Discordリンクをクリックして登録手順に従ってください。",
    "join.step2.title": "Discordを2FAで接続",
    "join.step2.description": "Discordを2FAで接続し、ルールを受け入れて自分でホワイトリストを取得してください。",
    "join.step2.details": "これはマルチアカウントとチーターからプレイヤーを保護するためです。",
    "join.step3.title": "FiveMをダウンロード＆インストール",
    "join.step3.description": "公式ウェブサイトからFiveMをダウンロードしてインストールしてください。",
    "join.step3.details": "FiveMが既にインストールされている場合は、ステップ4にスキップしてください！",
    "join.step4.title": "FiveMフォルダをクリーン",
    "join.step4.description": "適切な使用のために、FiveMディレクトリ内のすべてのフォルダを削除してください。",
    "join.step4.details":
      "%localappdata%\\FiveM\\FiveM.app\\data に移動してください（エクスプローラーの上部に入力するだけ）",
    "join.step5.title": "サーバーでの最初のステップ",
    "join.step5.description": "初心者ガイドで冒険を始めてください。",
    "join.step5.details": "ルールと初心者ガイドへのリンクは、フォーラムとGitbookで見つけることができます。",
    "join.ready.title": "始める準備はできましたか？",
    "join.ready.description": "すべてのステップに従って、ロールプレイの冒険を始めてください！",
    "join.ready.button": "Discordサーバーへ",

    // FAQ Section
    "faq.title": "よくある質問",
    "faq.subtitle": "ここでは私たちのサーバーに関する最も重要な質問への回答を見つけることができます",
    "faq.q1": "どうやって参加しますか？",
    "faq.a1":
      "ページ上部の参加方法ガイドに従ってください。Discordに参加し、ホワイトリストを取得し、FiveMをインストールする必要があります。",
    "faq.q2": "プレイするために何が必要ですか？",
    "faq.a2":
      "ModやReshadeのないクリーンなGTA Vが必要です。私たちのサーバーは0パフォーマンス影響のサーバーサイドグラフィックModを提供しています。",
    "faq.q3": "最低年齢はありますか？",
    "faq.a3": "最低年齢は16歳です。例外はサポートを通じて要求できます。",
    "faq.q4": "ホワイトリストはどのように機能しますか？",
    "faq.a4":
      "ホワイトリストはDiscordを通じて行われます。Discordサーバーに参加した後、自分でホワイトリストを取得できます。",
    "faq.q5": "グラフィックModをインストールできますか？",
    "faq.a5":
      "いいえ、私たちは0パフォーマンス影響のサーバーサイドグラフィックModを提供し、GTAグラフィックオーバーホールを提供しているためです。外部Modは許可されていません。",
    "faq.q6": "サーバーにはどのようなルールがありますか？",
    "faq.a6":
      "すべてのルールはDiscordとフォーラムで見つけることができます。基本的に：敬意ある交流、リアルなロールプレイ、チートやエクスプロイトなし。",
    "faq.q7": "友達と一緒にプレイできますか？",
    "faq.a7": "はい！サーバーで友達と一緒にプレイできます。全員がホワイトリスト手順を通過することを確認してください。",
    "faq.q8": "イベントはどのくらいの頻度で開催されますか？",
    "faq.a8":
      "定期的にイベントとコミュニティ活動を開催しています。これに関する情報はDiscordとフォーラムで見つけることができます。",
    "faq.more.title": "他に質問がありますか？",
    "faq.more.description": "サポートチームが喜んでお手伝いします。Discordまたはフォーラムからお問い合わせください。",
    "faq.discord": "Discordサポート",
    "faq.forum": "フォーラムを訪問",

    // Shop Section
    "shop.button": "Tebexショップへ",
    "shop.nopay2win": "Pay2Winなし",
    "shop.community": "コミュニティ重視",
    "shop.description":
      "私たちのショップは化粧品アイテムと生活の質の向上のみを提供しています。スキルとロールプレイが最も重要で、財布ではない公平なゲームプレイを信じています。",
    "shop.title": "サーバーショップ",
    "shop.subtitle": "サーバーをサポートして独占的な特典を得る",
    "shop.vip.title": "VIPパッケージ",
    "shop.vip.description": "究極のロールプレイ体験のための独占的なVIP特典とプレミアム機能。",
    "shop.currency.title": "ゲーム内通貨",
    "shop.currency.description": "金銭的な優位性でスタートし、帝国をより速く構築してください。",
    "shop.cosmetics.title": "化粧品＆アイテム",
    "shop.cosmetics.description": "ユニークな衣類とアクセサリーでキャラクターをパーソナライズしてください。",
    "shop.full.title": "完全なショップ",
    "shop.full.description":
      "VIPパッケージ、ゲーム内通貨、車両、不動産などの完全な範囲を発見してください。Tebexを通じた安全な支払いが保証されています。",
    "shop.buy": "今すぐ購入",
    "shop.vouchers": "ギフト券",
    "shop.tip": "💡 ヒント：ショップアイテムを購入することで、サーバーの開発と運営をサポートします！",

    // Categories
    "category.security": "セキュリティ",
    "category.innovation": "革新",
    "category.gameplay": "ゲームプレイ",
    "category.character": "キャラクター",
    "category.tech": "技術",
    "category.anticheat": "アンチチート",
    "category.customization": "カスタマイゼーション",
    "category.vehicles": "車両",
    "category.realism": "リアリズム",
    "category.support": "サポート",

    // Buttons
    "button.discord": "Discordに参加",
    "button.download": "FiveMをダウンロード",

    // Footer
    "footer.social": "ソーシャルメディア",
    "footer.links": "リンク",
    "footer.privacy": "プライバシー",
    "footer.terms": "利用規約",
    "footer.company": "会社",
    "footer.partners": "パートナー",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.features": "功能",
    "nav.join": "如何加入",
    "nav.faq": "常见问题",
    "nav.forum": "论坛",
    "nav.partner": "合作伙伴",

    // Hero Section
    "hero.title": "厌倦了这些服务器？",
    "hero.subtitle": "我们也是！",
    "hero.description": "来我们的服务器吧 - 我们提供最多的功能！",
    "hero.join": "立即加入",
    "hero.discord": "Discord链接",
    "hero.shop": "前往商店",

    // Features Section
    "features.title": "我们的功能",
    "features.subtitle": "发现让我们的服务器与众不同的独特功能",
    "features.realistic.title": "真实角色扮演",
    "features.realistic.description": "与重视质量和真实性的专业社区一起体验真实的角色扮演场景。",
    "features.community.title": "活跃社区与活动",
    "features.community.description": "定期活动、锦标赛和社区活动全天候提供多样化的娱乐。",
    "features.economy.title": "自有经济系统",
    "features.economy.description": "拥有工作、公司和真实市场的精心设计的经济系统，带来真正的沉浸感。",
    "features.faction.title": "规划的派系结构",
    "features.faction.description": "具有清晰层级和激动人心的故事线的有组织派系，用于长期角色发展。",
    "features.custom.title": "自定义脚本与载具",
    "features.custom.description": "独特的脚本和大量载具选择，带来无与伦比的游戏体验。",

    // Advanced Features Section
    "advanced.title": "我们的服务器系统",
    "advanced.subtitle": "发现让xWorld Roleplay成为独特体验的尖端系统和创新",
    "advanced.uid.title": "UID系统",
    "advanced.uid.description": "独特ID系统用于追踪玩家并确保最大安全性。",
    "advanced.nextgen.title": "下一代系统",
    "advanced.nextgen.description": "具有场景中全新创新的高度现代化下一代系统。",
    "advanced.midcore.title": "中核角色扮演",
    "advanced.midcore.description": "动作与角色扮演的完美结合，带来终极游戏体验。",
    "advanced.height.title": "可调节身体高度",
    "advanced.height.description": "角色身体高度可调节，命中框不会改变。",
    "advanced.mods.title": "服务器端模组",
    "advanced.mods.description": "服务器端准星和图形模组，实现最佳性能和公平性。",
    "advanced.anticheat.title": "人工作弊检测",
    "advanced.anticheat.description": "市场上最好的作弊检测：人眼。无PC检查或反作弊扫描。",
    "advanced.clothing.title": "44,000件服装物品",
    "advanced.clothing.description": "44,000个服装文件和可能性 - 全部符合传说，用于真实角色扮演。",
    "advanced.vehicles.title": "200+符合传说的载具",
    "advanced.vehicles.description": "超过200辆符合传说的改装载具，符合TOS安全并丰富游戏体验。",
    "advanced.medical.title": "高级医疗",
    "advanced.medical.description": "具有真实伤害和治疗过程的高度现代化医疗系统。",
    "advanced.faction.title": "派系管理",
    "advanced.faction.description": "派系有问题？派系管理帮助您建设或解决问题。",

    // How to Join Section
    "join.title": "如何加入",
    "join.subtitle": "按照这些简单步骤成为我们社区的一员",
    "join.step1.title": "加入Discord",
    "join.step1.description": "加入我们的Discord服务器，成为我们社区的一员。",
    "join.step1.details": "点击Discord链接并按照注册说明操作。",
    "join.step2.title": "连接Discord与2FA",
    "join.step2.description": "将您的Discord与2FA连接，接受规则并自行获取白名单。",
    "join.step2.details": "这是为了防止多账户和作弊者，保护我们的玩家。",
    "join.step3.title": "下载并安装FiveM",
    "join.step3.description": "从官方网站下载FiveM并安装。",
    "join.step3.details": "如果已安装FiveM，请跳到步骤4！",
    "join.step4.title": "清理FiveM文件夹",
    "join.step4.description": "为了正常使用，请删除FiveM目录中的所有文件夹。",
    "join.step4.details": "转到 %localappdata%\\FiveM\\FiveM.app\\data（只需在资源管理器顶部输入）",
    "join.step5.title": "服务器上的第一步",
    "join.step5.description": "通过我们的新手指南开始您的冒险。",
    "join.step5.details": "规则和新手指南的链接可以在我们的论坛和Gitbook中找到。",
    "join.ready.title": "准备开始了吗？",
    "join.ready.description": "按照所有步骤开始您的角色扮演冒险！",
    "join.ready.button": "前往Discord服务器",

    // FAQ Section
    "faq.title": "常见问题",
    "faq.subtitle": "在这里您可以找到关于我们服务器最重要问题的答案",
    "faq.q1": "如何加入？",
    "faq.a1": "按照页面上方的加入指南。您必须加入我们的Discord，获取白名单并安装FiveM。",
    "faq.q2": "我需要什么来玩？",
    "faq.a2": "您需要一个没有模组或Reshade的干净GTA V。我们的服务器提供0性能影响的服务器端图形模组。",
    "faq.q3": "有最低年龄要求吗？",
    "faq.a3": "最低年龄是16岁。可以通过支持申请例外。",
    "faq.q4": "白名单如何工作？",
    "faq.a4": "白名单通过Discord完成。加入我们的Discord服务器后，您可以自行获取白名单。",
    "faq.q5": "我可以安装图形模组吗？",
    "faq.a5": "不可以，因为我们提供0性能影响的服务器端图形模组并提供GTA图形改造。不允许外部模组。",
    "faq.q6": "服务器有什么规则？",
    "faq.a6": "所有规则都可以在我们的Discord和论坛中找到。基本上：尊重互动，真实角色扮演，无作弊或漏洞利用。",
    "faq.q7": "我可以和朋友一起玩吗？",
    "faq.a7": "是的！您可以在服务器上与朋友一起玩。确保每个人都通过白名单程序。",
    "faq.q8": "活动多久举行一次？",
    "faq.a8": "我们定期组织活动和社区活动。相关信息可以在我们的Discord和论坛中找到。",
    "faq.more.title": "还有其他问题？",
    "faq.more.description": "我们的支持团队很乐意为您提供帮助。通过Discord或论坛联系我们。",
    "faq.discord": "Discord支持",
    "faq.forum": "访问论坛",

    // Shop Section
    "shop.button": "前往Tebex商店",
    "shop.nopay2win": "无付费获胜",
    "shop.community": "社区导向",
    "shop.description":
      "我们的商店只提供装饰物品和生活质量改善。我们相信公平游戏，技能和角色扮演最重要，而不是您的钱包。",
    "shop.title": "服务器商店",
    "shop.subtitle": "支持服务器并获得独家福利",
    "shop.vip.title": "VIP套餐",
    "shop.vip.description": "终极角色扮演体验的独家VIP福利和高级功能。",
    "shop.currency.title": "游戏内货币",
    "shop.currency.description": "以财务优势开始，更快地建立您的帝国。",
    "shop.cosmetics.title": "装饰品与物品",
    "shop.cosmetics.description": "用独特的服装和配饰个性化您的角色。",
    "shop.full.title": "完整商店",
    "shop.full.description": "发现我们完整的VIP套餐、游戏内货币、载具、房地产等。通过Tebex保证安全支付。",
    "shop.buy": "立即购买",
    "shop.vouchers": "礼品券",
    "shop.tip": "💡 提示：购买商店物品可以支持服务器的开发和运营！",

    // Categories
    "category.security": "安全",
    "category.innovation": "创新",
    "category.gameplay": "游戏玩法",
    "category.character": "角色",
    "category.tech": "技术",
    "category.anticheat": "反作弊",
    "category.customization": "自定义",
    "category.vehicles": "载具",
    "category.realism": "真实性",
    "category.support": "支持",

    // Buttons
    "button.discord": "加入Discord",
    "button.download": "下载FiveM",

    // Footer
    "footer.social": "社交媒体",
    "footer.links": "链接",
    "footer.privacy": "隐私",
    "footer.terms": "服务条款",
    "footer.company": "公司",
    "footer.partners": "合作伙伴",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.features": "Fonctionnalités",
    "nav.join": "Comment Rejoindre",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partenaire",

    // Hero Section
    "hero.title": "Fatigué des serveurs ?",
    "hero.subtitle": "Nous aussi !",
    "hero.description": "Venez sur notre serveur - nous offrons le plus de fonctionnalités !",
    "hero.join": "Rejoindre Maintenant",
    "hero.discord": "Lien Discord",
    "hero.shop": "Vers la Boutique",

    // Features Section
    "features.title": "Nos Fonctionnalités",
    "features.subtitle": "Découvrez les fonctionnalités uniques qui rendent notre serveur spécial",
    "features.realistic.title": "Roleplay Réaliste",
    "features.realistic.description":
      "Vivez des scénarios de roleplay authentiques avec une communauté dédiée qui valorise la qualité et le réalisme.",
    "features.community.title": "Communauté Active & Événements",
    "features.community.description":
      "Des événements réguliers, tournois et activités communautaires offrent un divertissement varié 24h/24.",
    "features.economy.title": "Notre Système Économique",
    "features.economy.description":
      "Un système économique bien pensé avec des emplois, des entreprises et un marché réaliste pour une vraie immersion.",
    "features.faction.title": "Structure de Faction Planifiée",
    "features.faction.description":
      "Des factions organisées avec des hiérarchies claires et des intrigues passionnantes pour le développement de personnages à long terme.",
    "features.custom.title": "Scripts et Véhicules Personnalisés",
    "features.custom.description":
      "Des scripts uniques et une grande sélection de véhicules pour une expérience de jeu incomparable.",

    // Advanced Features Section
    "advanced.title": "Nos Systèmes de Serveur",
    "advanced.subtitle":
      "Découvrez les systèmes de pointe et innovations qui font de xWorld Roleplay une expérience unique",
    "advanced.uid.title": "Système UID",
    "advanced.uid.description": "Système d'ID unique pour suivre les joueurs et assurer une sécurité maximale.",
    "advanced.nextgen.title": "Systèmes Next-Gen",
    "advanced.nextgen.description":
      "Systèmes hautement modernes de nouvelle génération avec une innovation complètement nouvelle dans la scène.",
    "advanced.midcore.title": "Roleplay Midcore",
    "advanced.midcore.description": "Le mélange parfait entre action et roleplay pour l'expérience de jeu ultime.",
    "advanced.height.title": "Taille du Corps Ajustable",
    "advanced.height.description": "Taille du corps du personnage ajustable, la hitbox ne change pas.",
    "advanced.mods.title": "Mods Côté Serveur",
    "advanced.mods.description":
      "Mods de visée et graphiques côté serveur pour des performances optimales et l'équité.",
    "advanced.anticheat.title": "Détection de Triche Humaine",
    "advanced.anticheat.description":
      "La meilleure détection de triche sur le marché : L'œil humain. Pas de vérifications PC ou de scans anti-triche.",
    "advanced.clothing.title": "44 000 Articles de Vêtements",
    "advanced.clothing.description":
      "44 000 fichiers de vêtements et possibilités - tout Lore Friendly pour un roleplay authentique.",
    "advanced.vehicles.title": "200+ Véhicules Lore Friendly",
    "advanced.vehicles.description":
      "Plus de 200 véhicules moddés Lore Friendly qui sont sûrs TOS et enrichissent l'expérience de jeu.",
    "advanced.medical.title": "Médecine Avancée",
    "advanced.medical.description":
      "Système médical hautement moderne avec des blessures réalistes et des processus de guérison.",
    "advanced.faction.title": "Gestion des Factions",
    "advanced.faction.description":
      "Problèmes avec la faction ? La gestion des factions vous aide à construire ou résoudre les problèmes.",

    // How to Join Section
    "join.title": "Comment Rejoindre",
    "join.subtitle": "Suivez ces étapes simples pour devenir membre de notre communauté",
    "join.step1.title": "Rejoindre Discord",
    "join.step1.description": "Rejoignez notre serveur Discord et devenez membre de notre communauté.",
    "join.step1.details": "Cliquez sur le lien Discord et suivez les instructions d'inscription.",
    "join.step2.title": "Connecter Discord avec 2FA",
    "join.step2.description":
      "Connectez votre Discord avec 2FA, acceptez les règles et obtenez la whitelist vous-même.",
    "join.step2.details": "C'est contre les multi-comptes et les tricheurs pour protéger nos joueurs.",
    "join.step3.title": "Télécharger et Installer FiveM",
    "join.step3.description": "Téléchargez FiveM depuis le site officiel et installez-le.",
    "join.step3.details": "Si FiveM est déjà installé, passez à l'étape 4 !",
    "join.step4.title": "Nettoyer le Dossier FiveM",
    "join.step4.description": "Pour une utilisation correcte, supprimez tous les dossiers dans le répertoire FiveM.",
    "join.step4.details":
      "Allez à %localappdata%\\FiveM\\FiveM.app\\data (entrez simplement en haut dans l'Explorateur)",
    "join.step5.title": "Premiers Pas sur le Serveur",
    "join.step5.description": "Commencez votre aventure avec notre guide débutant.",
    "join.step5.details":
      "Les liens vers les règles et le guide débutant peuvent être trouvés dans notre forum et Gitbook.",
    "join.ready.title": "Prêt à commencer ?",
    "join.ready.description": "Suivez toutes les étapes et commencez votre aventure roleplay !",
    "join.ready.button": "Vers le Serveur Discord",

    // FAQ Section
    "faq.title": "Questions Fréquemment Posées",
    "faq.subtitle": "Ici vous trouverez des réponses aux questions les plus importantes sur notre serveur",
    "faq.q1": "Comment rejoindre ?",
    "faq.a1":
      "Suivez notre Guide Comment Rejoindre en haut de la page. Vous devez rejoindre notre Discord, obtenir la whitelist et installer FiveM.",
    "faq.q2": "De quoi ai-je besoin pour jouer ?",
    "faq.a2":
      "Vous avez besoin d'un GTA V propre sans mods ou Reshade. Notre serveur offre des mods graphiques côté serveur avec 0 impact sur les performances.",
    "faq.q3": "Y a-t-il un âge minimum ?",
    "faq.a3": "L'âge minimum est de 16 ans. Des exceptions peuvent être demandées via le support.",
    "faq.q4": "Comment fonctionne la whitelist ?",
    "faq.a4":
      "La whitelist se fait via Discord. Après avoir rejoint notre serveur Discord, vous pouvez obtenir la whitelist vous-même.",
    "faq.q5": "Puis-je installer des mods graphiques ?",
    "faq.a5":
      "Non, car nous offrons des mods graphiques côté serveur avec 0 impact sur les performances et fournissons des overhauls graphiques GTA. Les mods externes ne sont pas autorisés.",
    "faq.q6": "Quelles sont les règles du serveur ?",
    "faq.a6":
      "Toutes les règles peuvent être trouvées dans notre Discord et forum. Fondamentalement : Interaction respectueuse, roleplay réaliste et pas de triches ou exploits.",
    "faq.q7": "Puis-je jouer avec des amis ?",
    "faq.a7":
      "Oui ! Vous pouvez jouer avec des amis sur le serveur. Assurez-vous que tout le monde passe par la procédure de whitelist.",
    "faq.q8": "À quelle fréquence ont lieu les événements ?",
    "faq.a8":
      "Nous organisons régulièrement des événements et activités communautaires. Les informations à ce sujet peuvent être trouvées dans notre Discord et forum.",
    "faq.more.title": "Plus de questions ?",
    "faq.more.description":
      "Notre équipe de support est heureuse de vous aider. Contactez-nous via Discord ou le forum.",
    "faq.discord": "Support Discord",
    "faq.forum": "Visiter le Forum",

    // Shop Section
    "shop.button": "Vers la Boutique Tebex",
    "shop.nopay2win": "Pas de Pay2Win",
    "shop.community": "Axé sur la Communauté",
    "shop.description":
      "Notre boutique n'offre que des articles cosmétiques et des améliorations de qualité de vie. Nous croyons en un gameplay équitable où les compétences et le roleplay comptent le plus, pas votre portefeuille.",
    "shop.title": "Boutique du Serveur",
    "shop.subtitle": "Soutenez le serveur et obtenez des avantages exclusifs",
    "shop.vip.title": "Packs VIP",
    "shop.vip.description": "Avantages VIP exclusifs et fonctionnalités premium pour l'expérience roleplay ultime.",
    "shop.currency.title": "Monnaie du Jeu",
    "shop.currency.description": "Commencez avec un avantage financier et construisez votre empire plus rapidement.",
    "shop.cosmetics.title": "Cosmétiques & Articles",
    "shop.cosmetics.description": "Personnalisez votre personnage avec des vêtements et accessoires uniques.",
    "shop.full.title": "Boutique Complète",
    "shop.full.description":
      "Découvrez notre gamme complète de packs VIP, monnaie du jeu, véhicules, immobilier et bien plus. Paiements sécurisés via Tebex garantis.",
    "shop.buy": "Acheter Maintenant",
    "shop.vouchers": "Bons Cadeaux",
    "shop.tip":
      "💡 Astuce : En achetant des articles de la boutique, vous soutenez le développement et le fonctionnement du serveur !",

    // Categories
    "category.security": "Sécurité",
    "category.innovation": "Innovation",
    "category.gameplay": "Gameplay",
    "category.character": "Personnage",
    "category.tech": "Technologie",
    "category.anticheat": "Anti-Triche",
    "category.customization": "Personnalisation",
    "category.vehicles": "Véhicules",
    "category.realism": "Réalisme",
    "category.support": "Support",

    // Buttons
    "button.discord": "Rejoindre Discord",
    "button.download": "Télécharger FiveM",

    // Footer
    "footer.social": "Médias Sociaux",
    "footer.links": "Liens",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions de Service",
    "footer.company": "Entreprise",
    "footer.partners": "Partenaires",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  pl: {
    // Navigation
    "nav.home": "Strona Główna",
    "nav.features": "Funkcje",
    "nav.join": "Jak Dołączyć",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Zmęczony serwerami?",
    "hero.subtitle": "My też!",
    "hero.description": "Przyjdź na nasz serwer - oferujemy najwięcej funkcji!",
    "hero.join": "Dołącz Teraz",
    "hero.discord": "Link Discord",
    "hero.shop": "Do Sklepu",

    // Features Section
    "features.title": "Nasze Funkcje",
    "features.subtitle": "Odkryj unikalne funkcje, które czynią nasz serwer wyjątkowym",
    "features.realistic.title": "Realistyczny Roleplay",
    "features.realistic.description":
      "Doświadcz autentycznych scenariuszy roleplay z dedykowaną społecznością, która ceni jakość i realizm.",
    "features.community.title": "Aktywna Społeczność i Eventi",
    "features.community.description":
      "Regularne wydarzenia, turnieje i aktywności społeczności zapewniają różnorodną rozrywkę przez całą dobę.",
    "features.economy.title": "Nasz System Ekonomiczny",
    "features.economy.description":
      "Przemyślany system ekonomiczny z pracami, firmami i realistycznym rynkiem dla prawdziwego zanurzenia.",
    "features.faction.title": "Planowana Struktura Frakcji",
    "features.faction.description":
      "Zorganizowane frakcje z jasnymi hierarchiami i ekscytującymi fabułami dla długoterminowego rozwoju postaci.",
    "features.custom.title": "Niestandardowe Skrypty i Pojazdy",
    "features.custom.description": "Unikalne skrypty i duży wybór pojazdów dla niezrównanego doświadczenia gry.",

    // Advanced Features Section
    "advanced.title": "Nasze Systemy Serwera",
    "advanced.subtitle":
      "Odkryj najnowocześniejsze systemy i innowacje, które czynią xWorld Roleplay unikalnym doświadczeniem",
    "advanced.uid.title": "System UID",
    "advanced.uid.description": "Unikalny system ID do śledzenia graczy i zapewnienia maksymalnego bezpieczeństwa.",
    "advanced.nextgen.title": "Systemy Next-Gen",
    "advanced.nextgen.description": "Wysoce nowoczesne systemy nowej generacji z całkowicie nową innowacją na scenie.",
    "advanced.midcore.title": "Midcore Roleplay",
    "advanced.midcore.description": "Idealne połączenie akcji i roleplay dla ostatecznego doświadczenia gry.",
    "advanced.height.title": "Regulowany Wzrost Ciała",
    "advanced.height.description": "Regulowany wzrost ciała postaci, hitbox się nie zmienia.",
    "advanced.mods.title": "Mody Po Stronie Serwera",
    "advanced.mods.description":
      "Celowniki i mody graficzne po stronie serwera dla optymalnej wydajności i sprawiedliwości.",
    "advanced.anticheat.title": "Ludzka Detekcja Cheatów",
    "advanced.anticheat.description":
      "Najlepsza detekcja cheatów na rynku: Ludzkie oko. Brak sprawdzeń PC czy skanów anti-cheat.",
    "advanced.clothing.title": "44 000 Elementów Odzieży",
    "advanced.clothing.description":
      "44 000 plików odzieży i możliwości - wszystko Lore Friendly dla autentycznego roleplay.",
    "advanced.vehicles.title": "200+ Pojazdów Lore Friendly",
    "advanced.vehicles.description":
      "Ponad 200 zmodyfikowanych pojazdów Lore Friendly, które są bezpieczne dla TOS i wzbogacają doświadczenie gry.",
    "advanced.medical.title": "Zaawansowana Medycyna",
    "advanced.medical.description":
      "Wysoce nowoczesny system medyczny z realistycznymi obrażeniami i procesami leczenia.",
    "advanced.faction.title": "Zarządzanie Frakcjami",
    "advanced.faction.description":
      "Problemy z frakcją? Zarządzanie frakcjami pomoże ci w budowaniu lub rozwiązywaniu problemów.",

    // How to Join Section
    "join.title": "Jak Dołączyć",
    "join.subtitle": "Wykonaj te proste kroki, aby stać się częścią naszej społeczności",
    "join.step1.title": "Dołącz do Discord",
    "join.step1.description": "Dołącz do naszego serwera Discord i stań się częścią naszej społeczności.",
    "join.step1.details": "Kliknij link Discord i postępuj zgodnie z instrukcjami rejestracji.",
    "join.step2.title": "Połącz Discord z 2FA",
    "join.step2.description": "Połącz swój Discord z 2FA, zaakceptuj zasady i samodzielnie pobierz whitelistę.",
    "join.step2.details": "To jest przeciwko multi-kontom i cheaterom, aby chronić naszych graczy.",
    "join.step3.title": "Pobierz i Zainstaluj FiveM",
    "join.step3.description": "Pobierz FiveM z oficjalnej strony i zainstaluj.",
    "join.step3.details": "Jeśli FiveM jest już zainstalowany, przejdź do kroku 4!",
    "join.step4.title": "Wyczyść Folder FiveM",
    "join.step4.description": "Dla prawidłowego użytkowania usuń wszystkie foldery w katalogu FiveM.",
    "join.step4.details": "Idź do %localappdata%\\FiveM\\FiveM.app\\data (po prostu wpisz na górze w Eksploratorze)",
    "join.step5.title": "Pierwsze Kroki na Serwerze",
    "join.step5.description": "Rozpocznij swoją przygodę z naszym przewodnikiem dla początkujących.",
    "join.step5.details": "Linki do zasad i przewodnika dla początkujących można znaleźć na naszym forum i Gitbook.",
    "join.ready.title": "Gotowy do rozpoczęcia?",
    "join.ready.description": "Wykonaj wszystkie kroki i rozpocznij swoją przygodę roleplay!",
    "join.ready.button": "Do Serwera Discord",

    // FAQ Section
    "faq.title": "Często Zadawane Pytania",
    "faq.subtitle": "Tutaj znajdziesz odpowiedzi na najważniejsze pytania dotyczące naszego serwera",
    "faq.q1": "Jak dołączyć?",
    "faq.a1":
      "Postępuj zgodnie z naszym Przewodnikiem Jak Dołączyć na górze strony. Musisz dołączyć do naszego Discord, pobrać whitelistę i zainstalować FiveM.",
    "faq.q2": "Czego potrzebuję do gry?",
    "faq.a2":
      "Potrzebujesz czystego GTA V bez modów czy Reshade. Nasz serwer oferuje mody graficzne po stronie serwera z 0 wpływem na wydajność.",
    "faq.q3": "Czy jest minimalny wiek?",
    "faq.a3": "Minimalny wiek to 16 lat. Wyjątki można poprosić przez wsparcie.",
    "faq.q4": "Jak działa whitelist?",
    "faq.a4":
      "Whitelist odbywa się przez Discord. Po dołączeniu do naszego serwera Discord możesz samodzielnie pobrać whitelistę.",
    "faq.q5": "Czy mogę zainstalować mody graficzne?",
    "faq.a5":
      "Nie, ponieważ oferujemy mody graficzne po stronie serwera z 0 wpływem na wydajność i zapewniamy przeróbki graficzne GTA. Zewnętrzne mody nie są dozwolone.",
    "faq.q6": "Jakie są zasady na serwerze?",
    "faq.a6":
      "Wszystkie zasady można znaleźć na naszym Discord i forum. Zasadniczo: Szanująca interakcja, realistyczny roleplay i brak cheatów czy exploitów.",
    "faq.q7": "Czy mogę grać z przyjaciółmi?",
    "faq.a7": "Tak! Możesz grać z przyjaciółmi na serwerze. Upewnij się, że wszyscy przejdą przez procedurę whitelist.",
    "faq.q8": "Jak często odbywają się wydarzenia?",
    "faq.a8":
      "Regularnie organizujemy wydarzenia i aktywności społeczności. Informacje o tym można znaleźć na naszym Discord i forum.",
    "faq.more.title": "Więcej pytań?",
    "faq.more.description": "Nasz zespół wsparcia chętnie pomoże. Skontaktuj się z nami przez Discord lub forum.",
    "faq.discord": "Wsparcie Discord",
    "faq.forum": "Odwiedź Forum",

    // Shop Section
    "shop.button": "Do Sklepu Tebex",
    "shop.nopay2win": "Bez Pay2Win",
    "shop.community": "Skupiony na Społeczności",
    "shop.description":
      "Nasz sklep oferuje tylko przedmioty kosmetyczne i ulepszenia jakości życia. Wierzymy w uczciwy gameplay, gdzie umiejętności i roleplay są najważniejsze, nie twój portfel.",
    "shop.title": "Sklep Serwera",
    "shop.subtitle": "Wspieraj serwer i otrzymuj ekskluzywne korzyści",
    "shop.vip.title": "Pakiety VIP",
    "shop.vip.description": "Ekskluzywne korzyści VIP i funkcje premium dla ostatecznego doświadczenia roleplay.",
    "shop.currency.title": "Waluta w Grze",
    "shop.currency.description": "Zacznij z przewagą finansową i buduj swoje imperium szybciej.",
    "shop.cosmetics.title": "Kosmetyki i Przedmioty",
    "shop.cosmetics.description": "Personalizuj swoją postać unikalnymi ubraniami i akcesoriami.",
    "shop.full.title": "Pełny Sklep",
    "shop.full.description":
      "Odkryj naszą pełną gamę pakietów VIP, waluty w grze, pojazdów, nieruchomości i wiele więcej. Bezpieczne płatności przez Tebex gwarantowane.",
    "shop.buy": "Kup Teraz",
    "shop.vouchers": "Bony Prezentowe",
    "shop.tip": "💡 Wskazówka: Kupując przedmioty ze sklepu wspierasz rozwój i działanie serwera!",

    // Categories
    "category.security": "Bezpieczeństwo",
    "category.innovation": "Innowacja",
    "category.gameplay": "Rozgrywka",
    "category.character": "Postać",
    "category.tech": "Technologia",
    "category.anticheat": "Anti-Cheat",
    "category.customization": "Personalizacja",
    "category.vehicles": "Pojazdy",
    "category.realism": "Realizm",
    "category.support": "Wsparcie",

    // Buttons
    "button.discord": "Dołącz do Discord",
    "button.download": "Pobierz FiveM",

    // Footer
    "footer.social": "Media Społecznościowe",
    "footer.links": "Linki",
    "footer.privacy": "Prywatność",
    "footer.terms": "Warunki Usługi",
    "footer.company": "Firma",
    "footer.partners": "Partnerzy",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  at: {
    // Navigation
    "nav.home": "Hoam",
    "nav.features": "Features",
    "nav.join": "Beitreten",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Müde von de Server?",
    "hero.subtitle": "Mia a!",
    "hero.description": "Kumm auf unsern Server - mia bieten de meisten Features!",
    "hero.join": "Jetzt beitreten",
    "hero.discord": "Discord Link",
    "hero.shop": "Zum Shop",

    // Features Section
    "features.title": "Unsere Features",
    "features.subtitle": "Entdecke de einzigartigen Features, de unsern Server zu was Besonderes machen",
    "features.realistic.title": "Realistisches Roleplay",
    "features.realistic.description":
      "Erleb authentische Rollenspiel-Szenarien mit ana engagierten Community, de Wert auf Qualität und Realismus legt.",
    "features.community.title": "Aktive Community & Events",
    "features.community.description":
      "Regelmäßige Events, Turniere und Community-Aktivitäten sorgen für abwechslungsreiche Unterhaltung rund um de Uhr.",
    "features.economy.title": "Eigenes Wirtschaftssystem",
    "features.economy.description":
      "A durchdachtes Wirtschaftssystem mit Jobs, Unternehmen und am realistischen Markt für echte Immersion.",
    "features.faction.title": "Geplante Fraktions Struktur",
    "features.faction.description":
      "Organisierte Fraktionen mit klaren Hierarchien und spannenden Storylines für langfristige Charakterentwicklung.",
    "features.custom.title": "Custom Scripts & Fahrzeuge",
    "features.custom.description":
      "Einzigartige Scripts und a große Auswahl an Fahrzeugen für a unvergleichliches Spielerlebnis.",

    // Advanced Features Section
    "advanced.title": "Unsere Server Systeme",
    "advanced.subtitle":
      "Entdecke de hochmodernen Systeme und Innovationen, de xWorld Roleplay zu am einzigartigen Erlebnis machen",
    "advanced.uid.title": "UID System",
    "advanced.uid.description":
      "Unique ID System um Spieler zurück zu verfolgen und maximale Sicherheit zu gewährleisten.",
    "advanced.nextgen.title": "Next-Gen Systeme",
    "advanced.nextgen.description":
      "Hoch moderne Systeme der nächsten Generation mit ganz neuer Innovation in der Szene.",
    "advanced.midcore.title": "Midcore Roleplay",
    "advanced.midcore.description":
      "De perfekte Mischung zwischen Action und Roleplay für des ultimative Spielerlebnis.",
    "advanced.height.title": "Verstellbare Körpergröße",
    "advanced.height.description": "Verstellbare Körpergröße vom Charakter, dabei verändert sich de Hitbox net.",
    "advanced.mods.title": "Serverseitige Mods",
    "advanced.mods.description": "Serverseitige Crosshairs und Grafikmods für optimale Performance und Fairness.",
    "advanced.anticheat.title": "Menschliche Cheat Detection",
    "advanced.anticheat.description":
      "De beste Cheat Detection am Markt: Des menschliche Aug. Keine PC-Checks oder Anti-Cheat Scans.",
    "advanced.clothing.title": "44.000 Kleidungsstücke",
    "advanced.clothing.description":
      "44.000 Dateien an Kleidung und Möglichkeiten - alles Lore Friendly für authentisches Roleplay.",
    "advanced.vehicles.title": "200+ Lore Friendly Fahrzeuge",
    "advanced.vehicles.description":
      "Über 200 Lore Friendly modded Fahrzeuge de TOS sicher sind und des Spielerlebnis bereichern.",
    "advanced.medical.title": "Erweiterte Medizin",
    "advanced.medical.description": "Hochmodernes Medizinsystem mit realistischen Verletzungen und Heilungsprozessen.",
    "advanced.faction.title": "Fraktionsverwaltung",
    "advanced.faction.description":
      "Probleme mit der Fraktion? De Fraktionsverwaltung hilft dir beim Aufbau oder bei Problemen.",

    // How to Join Section
    "join.title": "Wie ma beitritt",
    "join.subtitle": "Folg dene einfachen Schritten, um Teil unserer Community zu werden",
    "join.step1.title": "Discord joinen",
    "join.step1.description": "Tritt unserm Discord-Server bei und werd Teil unserer Community.",
    "join.step1.details": "Klick auf den Discord-Link und folg den Anweisungen zur Registrierung.",
    "join.step2.title": "Discord mit 2FA verbinden",
    "join.step2.description":
      "Verbind deinen Discord mit 2FA, akzeptier de Regeln und hol dir selbstständig de Whitelist ab.",
    "join.step2.details": "Des is gegen Multi-Accounts und Cheater, um unsere Spieler zu schützen.",
    "join.step3.title": "FiveM herunterladen & installieren",
    "join.step3.description": "Lad FiveM von der offiziellen Website runter und installier es.",
    "join.step3.details": "Falls FiveM bereits installiert is, spring zu Schritt 4!",
    "join.step4.title": "FiveM Ordner bereinigen",
    "join.step4.description": "Für einwandfreie Nutzung lösch alle Ordner im FiveM-Verzeichnis.",
    "join.step4.details": "Geh zu %localappdata%\\FiveM\\FiveM.app\\data (einfach oben im Explorer eingeben)",
    "join.step5.title": "Erste Schritte am Server",
    "join.step5.description": "Start dein Abenteuer mit unserm Einsteiger-Guide.",
    "join.step5.details": "Links zu Regeln & Einsteiger-Guide findest du in unserm Forum und Gitbook.",
    "join.ready.title": "Bereit loszulegen?",
    "join.ready.description": "Folg allen Schritten und start dein Roleplay-Abenteuer!",
    "join.ready.button": "Zum Discord Server",

    // FAQ Section
    "faq.title": "Häufig gestellte Fragen",
    "faq.subtitle": "Hier findest du Antworten auf de wichtigsten Fragen rund um unsern Server",
    "faq.q1": "Wie tret i bei?",
    "faq.a1":
      "Folg unserm How to Join Guide oben auf der Seite. Du musst unserm Discord beitreten, de Whitelist abholen und FiveM installieren.",
    "faq.q2": "Was brauch i, um zu spielen?",
    "faq.a2":
      "Du brauchst a sauberes GTA V ohne Mods oder Reshade. Unser Server bietet serverseitige Grafik-Mods mit 0 Performance Impact.",
    "faq.q3": "Gibt's a Mindestalter?",
    "faq.a3": "Des Mindestalter beträgt 16 Jahre. Ausnahmen können über den Support angefragt werden.",
    "faq.q4": "Wie funktioniert de Whitelist?",
    "faq.a4":
      "De Whitelist erfolgt über Discord. Nach dem Beitritt zu unserm Discord-Server kannst du dir selbstständig de Whitelist abholen.",
    "faq.q5": "Darf i mir Grafik-Mods installieren?",
    "faq.a5":
      "Na, da mia serverseitig 0 Performance Impact Grafik-Mods anbieten und Overhauls der GTA-Grafik bereitstellen. Externe Mods sind net erlaubt.",
    "faq.q6": "Welche Regeln gibt's am Server?",
    "faq.a6":
      "Alle Regeln findest du in unserm Discord und Forum. Grundsätzlich gilt: Respektvoller Umgang, realistisches Roleplay und keine Cheats oder Exploits.",
    "faq.q7": "Kann i mit Freunden zusammen spielen?",
    "faq.a7":
      "Jo! Du kannst gerne mit Freunden am Server spielen. Achtet darauf, dass alle de Whitelist-Prozedur durchlaufen.",
    "faq.q8": "Wie oft finden Events statt?",
    "faq.a8":
      "Mia veranstalten regelmäßig Events und Community-Aktivitäten. Informationen dazu findest du in unserm Discord und Forum.",
    "faq.more.title": "Weitere Fragen?",
    "faq.more.description": "Unser Support-Team hilft dir gerne weiter. Kontaktier uns über Discord oder des Forum.",
    "faq.discord": "Discord Support",
    "faq.forum": "Forum besuchen",

    // Shop Section
    "shop.button": "Zum Tebex Shop",
    "shop.nopay2win": "Kein Pay2Win",
    "shop.community": "Community-orientiert",
    "shop.description":
      "Unser Shop bietet nur kosmetische Gegenstände und Lebensqualitäts-Verbesserungen. Mia glauben an faires Gameplay, bei dem Können und Roleplay am wichtigsten sind, net dein Geldbeutel.",
    "shop.title": "Server Shop",
    "shop.subtitle": "Supporte den Server & erhalte exklusive Vorteile",
    "shop.vip.title": "VIP Pakete",
    "shop.vip.description": "Exklusive VIP-Vorteile und Premium-Features für des ultimative Roleplay-Erlebnis.",
    "shop.currency.title": "Ingame Währung",
    "shop.currency.description": "Start mit am finanziellen Vorteil und bau dein Imperium schneller auf.",
    "shop.cosmetics.title": "Cosmetics & Items",
    "shop.cosmetics.description": "Personalisier deinen Charakter mit einzigartigen Kleidungsstücken und Accessoires.",
    "shop.full.title": "Vollständiger Shop",
    "shop.full.description":
      "Entdeck unser vollständiges Sortiment an VIP-Paketen, Ingame-Währung, Fahrzeugen, Immobilien und vielem mehr. Sichere Zahlungen über Tebex garantiert.",
    "shop.buy": "Jetzt kaufen",
    "shop.vouchers": "Geschenkgutscheine",
    "shop.tip": "💡 Tipp: Mit dem Kauf von Shop-Items unterstützt du de Entwicklung und den Betrieb vom Server!",

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
  ch: {
    // Navigation
    "nav.home": "Hei",
    "nav.features": "Features",
    "nav.join": "Biiträte",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Müed vo de Server?",
    "hero.subtitle": "Mir au!",
    "hero.description": "Chum uf üse Server - mir bieted die meischte Features!",
    "hero.join": "Jetzt biiträte",
    "hero.discord": "Discord Link",
    "hero.shop": "Zum Shop",

    // Features Section
    "features.title": "Üsi Features",
    "features.subtitle": "Entdecke die einzigartige Features, wo üse Server zu öppis Bsungers mached",
    "features.realistic.title": "Realistischs Roleplay",
    "features.realistic.description":
      "Erleb authentischi Rollenspiel-Szenarien mit ere engagierte Community, wo Wärt uf Qualität und Realismus leit.",
    "features.community.title": "Aktivi Community & Events",
    "features.community.description":
      "Regelmässigi Events, Turnier und Community-Aktivitäte sorged für abwächsligsriichi Unterhaltung rund um d'Uhr.",
    "features.economy.title": "Eigets Wirtschaftssystem",
    "features.economy.description":
      "Es durchdachts Wirtschaftssystem mit Jobs, Unternähme und eme realistische Markt für echti Immersion.",
    "features.faction.title": "Planti Fraktions Struktur",
    "features.faction.description":
      "Organisierti Fraktione mit klare Hierarchie und spannende Storylines für langfrischtige Charakterentwicklig.",
    "features.custom.title": "Custom Scripts & Fahrzüüg",
    "features.custom.description":
      "Einzigartige Scripts und e grossi Uswahl a Fahrzüüg für es unverglychbars Spielerläbnis.",

    // Advanced Features Section
    "advanced.title": "Üsi Server Systeme",
    "advanced.subtitle":
      "Entdecke die hochmodärne Systeme und Innovatione, wo xWorld Roleplay zu eme einzigartige Erläbnis mached",
    "advanced.uid.title": "UID System",
    "advanced.uid.description": "Unique ID System zum Spieler zruggverfolge und maximali Sicherheit gwährleischte.",
    "advanced.nextgen.title": "Next-Gen Systeme",
    "advanced.nextgen.description":
      "Hoch modärni Systeme vo de nächschte Generation mit ganz nöii Innovation i de Szene.",
    "advanced.midcore.title": "Midcore Roleplay",
    "advanced.midcore.description": "Die perfekti Mischig zwüsche Action und Roleplay für s'ultimativ Spielerläbnis.",
    "advanced.height.title": "Verstellbari Körpergrösse",
    "advanced.height.description": "Verstellbari Körpergrösse vom Charakter, debii veränderet sich d'Hitbox nöd.",
    "advanced.mods.title": "Serversitigi Mods",
    "advanced.mods.description": "Serversitigi Crosshairs und Grafikmods für optimali Performance und Fairness.",
    "advanced.anticheat.title": "Menschlichi Cheat Detection",
    "advanced.anticheat.description":
      "Die bescht Cheat Detection am Markt: S'menschlich Aug. Kei PC-Checks oder Anti-Cheat Scans.",
    "advanced.clothing.title": "44'000 Chleidigschtück",
    "advanced.clothing.description":
      "44'000 Dateie a Chleidig und Möglichkeite - alles Lore Friendly für authentischs Roleplay.",
    "advanced.vehicles.title": "200+ Lore Friendly Fahrzüüg",
    "advanced.vehicles.description":
      "Über 200 Lore Friendly modded Fahrzüüg wo TOS sicher sind und s'Spielerläbnis bereichered.",
    "advanced.medical.title": "Erwiterti Medizin",
    "advanced.medical.description": "Hochmodärns Medizinsystem mit realistische Verletzige und Heiligsprozäss.",
    "advanced.faction.title": "Fraktionsverwaltung",
    "advanced.faction.description":
      "Problem mit de Fraktion? D'Fraktionsverwaltung hilft dir bim Ufbau oder bi Problem.",

    // How to Join Section
    "join.title": "Wie mer biitritt",
    "join.subtitle": "Folg dene eifache Schritt, zum Teil vo üsere Community z'wärde",
    "join.step1.title": "Discord joine",
    "join.step1.description": "Tritt üsem Discord-Server bii und wird Teil vo üsere Community.",
    "join.step1.details": "Klick uf de Discord-Link und folg de Awisige zur Registrierig.",
    "join.step2.title": "Discord mit 2FA verbinde",
    "join.step2.description":
      "Verbind din Discord mit 2FA, akzeptier d'Regle und hol dir sälbschtändig d'Whitelist ab.",
    "join.step2.details": "Das isch gäge Multi-Accounts und Cheater, zum üsi Spieler z'schütze.",
    "join.step3.title": "FiveM abelade & installiere",
    "join.step3.description": "Lad FiveM vo de offizielle Website abe und installier's.",
    "join.step3.details": "Falls FiveM scho installiert isch, spring zu Schritt 4!",
    "join.step4.title": "FiveM Ordner bereinigte",
    "join.step4.description": "Für einwandfreii Nutzig lösch alli Ordner im FiveM-Verzeichnis.",
    "join.step4.details": "Gang zu %localappdata%\\FiveM\\FiveM.app\\data (eifach obe im Explorer iigäh)",
    "join.step5.title": "Erschti Schritt am Server",
    "join.step5.description": "Start dis Abentüür mit üsem Iischtiiger-Guide.",
    "join.step5.details": "Links zu Regle & Iischtiiger-Guide findsch i üsem Forum und Gitbook.",
    "join.ready.title": "Bereit loszlege?",
    "join.ready.description": "Folg allne Schritt und start dis Roleplay-Abentüür!",
    "join.ready.button": "Zum Discord Server",

    // FAQ Section
    "faq.title": "Hüfig gstellti Frage",
    "faq.subtitle": "Da findsch Antworte uf die wichtigschte Frage rund um üse Server",
    "faq.q1": "Wie tritt mer bii?",
    "faq.a1":
      "Folg üsem How to Join Guide obe uf de Siite. Du muesch üsem Discord biitrete, d'Whitelist abhole und FiveM installiere.",
    "faq.q2": "Was bruchi zum spiele?",
    "faq.a2":
      "Du bruchsch es saubers GTA V ohni Mods oder Reshade. Üse Server bietet serversitigi Grafik-Mods mit 0 Performance Impact.",
    "faq.q3": "Git's es Mindeschtauter?",
    "faq.a3": "S'Mindeschtauter beträit 16 Jahr. Usnahme chönd über de Support agfragt wärde.",
    "faq.q4": "Wie funktioniert d'Whitelist?",
    "faq.a4":
      "D'Whitelist erfolgt über Discord. Nach em Biitritt zu üsem Discord-Server chasch dir sälbschtändig d'Whitelist abhole.",
    "faq.q5": "Darf i mir Grafik-Mods installiere?",
    "faq.a5":
      "Nei, will mir serversiitig 0 Performance Impact Grafik-Mods abüted und Overhauls vo de GTA-Grafik bereitstelled. Externi Mods sind nöd erlaubt.",
    "faq.q6": "Welchi Regle git's am Server?",
    "faq.a6":
      "Alli Regle findsch i üsem Discord und Forum. Grundsätzlich gilt: Respektvolle Umgang, realistischs Roleplay und kei Cheats oder Exploits.",
    "faq.q7": "Chan i mit Fründe zäme spiele?",
    "faq.a7":
      "Jo! Du chasch gärn mit Fründe am Server spiele. Achted druf, dass alli d'Whitelist-Prozedur durchlaufed.",
    "faq.q8": "Wie oft findet Events statt?",
    "faq.a8":
      "Mir verastalted regelmässig Events und Community-Aktivitäte. Informatione dezue findsch i üsem Discord und Forum.",
    "faq.more.title": "Witeri Frage?",
    "faq.more.description": "Üses Support-Team hilft dir gärn wiiter. Kontaktier üs über Discord oder s'Forum.",
    "faq.discord": "Discord Support",
    "faq.forum": "Forum bsueche",

    // Shop Section
    "shop.button": "Zum Tebex Shop",
    "shop.nopay2win": "Kei Pay2Win",
    "shop.community": "Community-orientiert",
    "shop.description":
      "Üse Shop bietet nur kosmetischi Gegeständ und Läbensqualitäts-Verbesserige. Mir glaubed a fairs Gameplay, bi dem Chönne und Roleplay am wichtigschte sind, nöd dis Portemonnaie.",
    "shop.title": "Server Shop",
    "shop.subtitle": "Supporte de Server & erhalte exklusivi Vorteile",
    "shop.vip.title": "VIP Paket",
    "shop.vip.description": "Exklusivi VIP-Vorteile und Premium-Features für s'ultimativ Roleplay-Erläbnis.",
    "shop.currency.title": "Ingame Währig",
    "shop.currency.description": "Start mit eme finanzielle Vorteil und bau dis Imperium schnäller uf.",
    "shop.cosmetics.title": "Cosmetics & Items",
    "shop.cosmetics.description": "Personalisier din Charakter mit einzigartige Chleidigschtück und Accessoires.",
    "shop.full.title": "Vollständige Shop",
    "shop.full.description":
      "Entdeck üses vollständigs Sortimänt a VIP-Paket, Ingame-Währig, Fahrzüüg, Immobilie und vielem meh. Sicheri Zahlige über Tebex garantiert.",
    "shop.buy": "Jetzt chaufe",
    "shop.vouchers": "Gschänkgutschii",
    "shop.tip": "💡 Tipp: Mit em Chauf vo Shop-Items unterstütztsch d'Entwicklig und de Betrieb vom Server!",

    // Categories
    "category.security": "Sicherheit",
    "category.innovation": "Innovation",
    "category.gameplay": "Gameplay",
    "category.character": "Charakter",
    "category.tech": "Technik",
    "category.anticheat": "Anti-Cheat",
    "category.customization": "Customization",
    "category.vehicles": "Fahrzüüg",
    "category.realism": "Realismus",
    "category.support": "Support",

    // Buttons
    "button.discord": "Discord biitrete",
    "button.download": "FiveM abelade",

    // Footer
    "footer.social": "Social Media",
    "footer.links": "Links",
    "footer.privacy": "Dateschutz",
    "footer.terms": "Nutzigsbedingiige",
    "footer.company": "Unternähme",
    "footer.partners": "Partner",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  sv: {
    // Navigation
    "nav.home": "Hem",
    "nav.features": "Funktioner",
    "nav.join": "Hur man går med",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Trött på servrarna?",
    "hero.subtitle": "Vi med!",
    "hero.description": "Kom till vår server - vi erbjuder flest funktioner!",
    "hero.join": "Gå med nu",
    "hero.discord": "Discord-länk",
    "hero.shop": "Till butiken",

    // Features Section
    "features.title": "Våra funktioner",
    "features.subtitle": "Upptäck de unika funktionerna som gör vår server till något speciellt",
    "features.realistic.title": "Realistiskt rollspel",
    "features.realistic.description":
      "Upplev autentiska rollspelsscenarier med en dedikerad community som värdesätter kvalitet och realism.",
    "features.community.title": "Aktiv community & evenemang",
    "features.community.description":
      "Regelbundna evenemang, turneringar och community-aktiviteter ger varierad underhållning dygnet runt.",
    "features.economy.title": "Vårt ekonomiska system",
    "features.economy.description":
      "Ett genomtänkt ekonomiskt system med jobb, företag och en realistisk marknad för verklig fördjupning.",
    "features.faction.title": "Planerad fraktionsstruktur",
    "features.faction.description":
      "Organiserade fraktioner med tydliga hierarkier och spännande berättelser för långsiktig karaktärsutveckling.",
    "features.custom.title": "Anpassade skript & fordon",
    "features.custom.description": "Unika skript och ett stort urval av fordon för en ojämförlig spelupplevelse.",

    // Advanced Features Section
    "advanced.title": "Våra serversystem",
    "advanced.subtitle":
      "Upptäck de banbrytande systemen och innovationerna som gör xWorld Roleplay till en unik upplevelse",
    "advanced.uid.title": "UID-system",
    "advanced.uid.description": "Unikt ID-system för att spåra spelare och säkerställa maximal säkerhet.",
    "advanced.nextgen.title": "Nästa generations system",
    "advanced.nextgen.description": "Högmoderna nästa generations system med helt ny innovation i scenen.",
    "advanced.midcore.title": "Midcore rollspel",
    "advanced.midcore.description":
      "Den perfekta blandningen mellan action och rollspel för den ultimata spelupplevelsen.",
    "advanced.height.title": "Justerbar kroppslängd",
    "advanced.height.description": "Justerbar kroppslängd för karaktären, hitboxen förändras inte.",
    "advanced.mods.title": "Serversidans moddar",
    "advanced.mods.description": "Serversidans sikten och grafikmoddar för optimal prestanda och rättvisa.",
    "advanced.anticheat.title": "Mänsklig fuskdetektering",
    "advanced.anticheat.description":
      "Den bästa fuskdetekteringen på marknaden: Det mänskliga ögat. Inga PC-kontroller eller anti-fusk-skanningar.",
    "advanced.clothing.title": "44 000 klädplagg",
    "advanced.clothing.description": "44 000 klädfiler och möjligheter - allt Lore Friendly för autentiskt rollspel.",
    "advanced.vehicles.title": "200+ Lore Friendly fordon",
    "advanced.vehicles.description":
      "Över 200 Lore Friendly moddade fordon som är TOS-säkra och berikar spelupplevelsen.",
    "advanced.medical.title": "Avancerad medicin",
    "advanced.medical.description": "Högmodernt medicinskt system med realistiska skador och läkningsprocesser.",
    "advanced.faction.title": "Fraktionshantering",
    "advanced.faction.description":
      "Problem med fraktionen? Fraktionshantering hjälper dig med byggande eller problem.",

    // How to Join Section
    "join.title": "Hur man går med",
    "join.subtitle": "Följ dessa enkla steg för att bli en del av vår community",
    "join.step1.title": "Gå med i Discord",
    "join.step1.description": "Gå med i vår Discord-server och bli en del av vår community.",
    "join.step1.details": "Klicka på Discord-länken och följ registreringsinstruktionerna.",
    "join.step2.title": "Anslut Discord med 2FA",
    "join.step2.description": "Anslut din Discord med 2FA, acceptera reglerna och hämta vitlistan själv.",
    "join.step2.details": "Detta är mot multi-konton och fuskare för att skydda våra spelare.",
    "join.step3.title": "Ladda ner & installera FiveM",
    "join.step3.description": "Ladda ner FiveM från den officiella webbplatsen och installera det.",
    "join.step3.details": "Om FiveM redan är installerat, hoppa till steg 4!",
    "join.step4.title": "Rensa FiveM-mappen",
    "join.step4.description": "För korrekt användning, ta bort alla mappar i FiveM-katalogen.",
    "join.step4.details": "Gå till %localappdata%\\FiveM\\FiveM.app\\data (skriv bara in överst i Utforskaren)",
    "join.step5.title": "Första stegen på servern",
    "join.step5.description": "Starta ditt äventyr med vår nybörjarguide.",
    "join.step5.details": "Länkar till regler & nybörjarguide finns i vårt forum och Gitbook.",
    "join.ready.title": "Redo att börja?",
    "join.ready.description": "Följ alla steg och starta ditt rollspelsäventyr!",
    "join.ready.button": "Till Discord-servern",

    // FAQ Section
    "faq.title": "Vanliga frågor",
    "faq.subtitle": "Här hittar du svar på de viktigaste frågorna om vår server",
    "faq.q1": "Hur går jag med?",
    "faq.a1":
      "Följ vår Hur man går med-guide ovanför på sidan. Du måste gå med i vår Discord, hämta vitlistan och installera FiveM.",
    "faq.q2": "Vad behöver jag för att spela?",
    "faq.a2":
      "Du behöver en ren GTA V utan moddar eller Reshade. Vår server erbjuder serversidans grafikmoddar med 0 prestandapåverkan.",
    "faq.q3": "Finns det en minimiålder?",
    "faq.a3": "Minimiåldern är 16 år. Undantag kan begäras genom support.",
    "faq.q4": "Hur fungerar vitlistan?",
    "faq.a4": "Vitlistan görs via Discord. Efter att ha gått med i vår Discord-server kan du hämta vitlistan själv.",
    "faq.q5": "Kan jag installera grafikmoddar?",
    "faq.a5":
      "Nej, eftersom vi erbjuder serversidans grafikmoddar med 0 prestandapåverkan och tillhandahåller GTA-grafiköversyner. Externa moddar är inte tillåtna.",
    "faq.q6": "Vilka regler finns på servern?",
    "faq.q6":
      "Alla regler finns i vår Discord och forum. I grund och botten: Respektfull interaktion, realistiskt rollspel och inga fusk eller exploits.",
    "faq.q7": "Kan jag spela med vänner?",
    "faq.a7": "Ja! Du kan spela med vänner på servern. Se till att alla går igenom vitlisteproceduren.",
    "faq.q8": "Hur ofta äger evenemang rum?",
    "faq.a8":
      "Vi organiserar regelbundet evenemang och community-aktiviteter. Information om detta finns i vår Discord och forum.",
    "faq.more.title": "Fler frågor?",
    "faq.more.description": "Vårt supportteam hjälper gärna till. Kontakta oss via Discord eller forumet.",
    "faq.discord": "Discord-support",
    "faq.forum": "Besök forumet",

    // Shop Section
    "shop.button": "Till Tebex-butiken",
    "shop.nopay2win": "Ingen Pay2Win",
    "shop.community": "Community-fokuserad",
    "shop.description":
      "Vår butik erbjuder endast kosmetiska föremål och livskvalitetsförbättringar. Vi tror på rättvist spelande där färdighet och rollspel är viktigast, inte din plånbok.",
    "shop.title": "Serverbutik",
    "shop.subtitle": "Stöd servern & få exklusiva fördelar",
    "shop.vip.title": "VIP-paket",
    "shop.vip.description": "Exklusiva VIP-fördelar och premiumfunktioner för den ultimata rollspelsupplevelsen.",
    "shop.currency.title": "Spelvaluta",
    "shop.currency.description": "Börja med en ekonomisk fördel och bygg ditt imperium snabbare.",
    "shop.cosmetics.title": "Kosmetika & föremål",
    "shop.cosmetics.description": "Anpassa din karaktär med unika kläder och accessoarer.",
    "shop.full.title": "Komplett butik",
    "shop.full.description":
      "Upptäck vårt kompletta sortiment av VIP-paket, spelvaluta, fordon, fastigheter och mycket mer. Säkra betalningar via Tebex garanterat.",
    "shop.buy": "Köp nu",
    "shop.vouchers": "Presentkort",
    "shop.tip": "💡 Tips: Genom att köpa butiksobjekt stödjer du serverns utveckling och drift!",

    // Categories
    "category.security": "Säkerhet",
    "category.innovation": "Innovation",
    "category.gameplay": "Spelmekanik",
    "category.character": "Karaktär",
    "category.tech": "Teknik",
    "category.anticheat": "Anti-fusk",
    "category.customization": "Anpassning",
    "category.vehicles": "Fordon",
    "category.realism": "Realism",
    "category.support": "Support",

    // Buttons
    "button.discord": "Gå med i Discord",
    "button.download": "Ladda ner FiveM",

    // Footer
    "footer.social": "Sociala medier",
    "footer.links": "Länkar",
    "footer.privacy": "Integritet",
    "footer.terms": "Användarvillkor",
    "footer.company": "Företag",
    "footer.partners": "Partners",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  da: {
    // Navigation
    "nav.home": "Hjem",
    "nav.features": "Funktioner",
    "nav.join": "Sådan tilmelder du dig",
    "nav.faq": "FAQ",
    "nav.forum": "Forum",
    "nav.partner": "Partner",

    // Hero Section
    "hero.title": "Træt af serverne?",
    "hero.subtitle": "Det er vi også!",
    "hero.description": "Kom til vores server - vi tilbyder flest funktioner!",
    "hero.join": "Tilmeld dig nu",
    "hero.discord": "Discord-link",
    "hero.shop": "Til butikken",

    // Features Section
    "features.title": "Vores funktioner",
    "features.subtitle": "Opdag de unikke funktioner, der gør vores server til noget særligt",
    "features.realistic.title": "Realistisk rollespil",
    "features.realistic.description":
      "Oplev autentiske rollespilsscenarier med et dedikeret fællesskab, der værdsætter kvalitet og realisme.",
    "features.community.title": "Aktivt fællesskab & begivenheder",
    "features.community.description":
      "Regelmæssige begivenheder, turneringer og fællesskabsaktiviteter giver varieret underholdning døgnet rundt.",
    "features.economy.title": "Vores økonomiske system",
    "features.economy.description":
      "Et gennemtænkt økonomisk system med job, virksomheder og et realistisk marked for ægte fordybelse.",
    "features.faction.title": "Planlagt fraktionsstruktur",
    "features.faction.description":
      "Organiserede fraktioner med klare hierarkier og spændende historier for langsigtet karakterudvikling.",
    "features.custom.title": "Tilpassede scripts & køretøjer",
    "features.custom.description":
      "Unikke scripts og et stort udvalg af køretøjer for en usammenlignelig spiloplevelse.",

    // Advanced Features Section
    "advanced.title": "Vores serversystemer",
    "advanced.subtitle":
      "Opdag de banebrydende systemer og innovationer, der gør xWorld Roleplay til en unik oplevelse",
    "advanced.uid.title": "UID-system",
    "advanced.uid.description": "Unikt ID-system til at spore spillere og sikre maksimal sikkerhed.",
    "advanced.nextgen.title": "Næste generations systemer",
    "advanced.nextgen.description": "Højmoderne næste generations systemer med helt ny innovation i scenen.",
    "advanced.midcore.title": "Midcore rollespil",
    "advanced.midcore.description":
      "Den perfekte blanding mellem action og rollespil for den ultimative spiloplevelse.",
    "advanced.height.title": "Justerbar kropshøjde",
    "advanced.height.description": "Justerbar kropshøjde for karakteren, hitboxen ændres ikke.",
    "advanced.mods.title": "Serverside mods",
    "advanced.mods.description": "Serverside sigtemidler og grafik-mods for optimal ydeevne og fairness.",
    "advanced.anticheat.title": "Menneskelig snydedetektion",
    "advanced.anticheat.description":
      "Den bedste snydedetektion på markedet: Det menneskelige øje. Ingen PC-tjek eller anti-snyde scanninger.",
    "advanced.clothing.title": "44.000 tøjgenstande",
    "advanced.clothing.description": "44.000 tøjfiler og muligheder - alt Lore Friendly for autentisk rollespil.",
    "advanced.vehicles.title": "200+ Lore Friendly køretøjer",
    "advanced.vehicles.description":
      "Over 200 Lore Friendly moddede køretøjer, der er TOS-sikre og beriger spiloplevelsen.",
    "advanced.medical.title": "Avanceret medicin",
    "advanced.medical.description": "Højmoderne medicinsystem med realistiske skader og helingsprocesser.",
    "advanced.faction.title": "Fraktionsstyring",
    "advanced.faction.description":
      "Problemer med fraktionen? Fraktionsstyring hjælper dig med opbygning eller problemer.",

    // How to Join Section
    "join.title": "Sådan tilmelder du dig",
    "join.subtitle": "Følg disse enkle trin for at blive en del af vores fællesskab",
    "join.step1.title": "Tilmeld dig Discord",
    "join.step1.description": "Tilmeld dig vores Discord-server og bliv en del af vores fællesskab.",
    "join.step1.details": "Klik på Discord-linket og følg registreringsinstruktionerne.",
    "join.step2.title": "Forbind Discord med 2FA",
    "join.step2.description": "Forbind din Discord med 2FA, accepter reglerne og hent whitelisten selv.",
    "join.step2.details": "Dette er mod multi-konti og snydere for at beskytte vores spillere.",
    "join.step3.title": "Download & installer FiveM",
    "join.step3.description": "Download FiveM fra den officielle hjemmeside og installer det.",
    "join.step3.details": "Hvis FiveM allerede er installeret, spring til trin 4!",
    "join.step4.title": "Rens FiveM-mappen",
    "join.step4.description": "For korrekt brug, slet alle mapper i FiveM-biblioteket.",
    "join.step4.details": "Gå til %localappdata%\\FiveM\\FiveM.app\\data (bare indtast øverst i Stifinder)",
    "join.step5.title": "Første skridt på serveren",
    "join.step5.description": "Start dit eventyr med vores begynderguide.",
    "join.step5.details": "Links til regler & begynderguide kan findes i vores forum og Gitbook.",
    "join.ready.title": "Klar til at begynde?",
    "join.ready.description": "Følg alle trin og start dit rollespilseventyr!",
    "join.ready.button": "Til Discord-serveren",

    // FAQ Section
    "faq.title": "Ofte stillede spørgsmål",
    "faq.subtitle": "Her finder du svar på de vigtigste spørgsmål om vores server",
    "faq.q1": "Hvordan tilmelder jeg mig?",
    "faq.a1":
      "Følg vores Sådan tilmelder du dig-guide øverst på siden. Du skal tilmelde dig vores Discord, hente whitelisten og installere FiveM.",
    "faq.q2": "Hvad har jeg brug for at spille?",
    "faq.a2":
      "Du har brug for en ren GTA V uden mods eller Reshade. Vores server tilbyder serverside grafik-mods med 0 ydeevnepåvirkning.",
    "faq.q3": "Er der en minimumsalder?",
    "faq.a3": "Minimumsalderen er 16 år. Undtagelser kan anmodes om gennem support.",
    "faq.q4": "Hvordan fungerer whitelisten?",
    "faq.a4":
      "Whitelisten sker via Discord. Efter at have tilmeldt dig vores Discord-server kan du hente whitelisten selv.",
    "faq.q5": "Kan jeg installere grafik-mods?",
    "faq.a5":
      "Nej, fordi vi tilbyder serverside grafik-mods med 0 ydeevnepåvirkning og leverer GTA-grafikoversigter. Eksterne mods er ikke tilladt.",
    "faq.q6": "Hvilke regler er der på serveren?",
    "faq.a6":
      "Alle regler kan findes i vores Discord og forum. Grundlæggende: Respektfuld interaktion, realistisk rollespil og ingen snyd eller exploits.",
    "faq.q7": "Kan jeg spille med venner?",
    "faq.a7": "Ja! Du kan spille med venner på serveren. Sørg for, at alle gennemgår whitelist-proceduren.",
    "faq.q8": "Hvor ofte finder begivenheder sted?",
    "faq.a8":
      "Vi organiserer regelmæssigt begivenheder og fællesskabsaktiviteter. Information herom kan findes i vores Discord og forum.",
    "faq.more.title": "Flere spørgsmål?",
    "faq.more.description": "Vores supportteam hjælper gerne. Kontakt os via Discord eller forummet.",
    "faq.discord": "Discord-support",
    "faq.forum": "Besøg forummet",

    // Shop Section
    "shop.button": "Til Tebex-butikken",
    "shop.nopay2win": "Ingen Pay2Win",
    "shop.community": "Fællesskabsfokuseret",
    "shop.description":
      "Vores butik tilbyder kun kosmetiske genstande og livskvalitetsforbedringer. Vi tror på fair gameplay, hvor færdigheder og rollespil betyder mest, ikke din tegnebog.",
    "shop.title": "Serverbutik",
    "shop.subtitle": "Støt serveren & få eksklusive fordele",
    "shop.vip.title": "VIP-pakker",
    "shop.vip.description": "Eksklusive VIP-fordele og premium-funktioner for den ultimative rollespilsoplevelse.",
    "shop.currency.title": "Spilvaluta",
    "shop.currency.description": "Start med en økonomisk fordel og byg dit imperium hurtigere.",
    "shop.cosmetics.title": "Kosmetik & genstande",
    "shop.cosmetics.description": "Personaliser din karakter med unikke tøj og tilbehør.",
    "shop.full.title": "Komplet butik",
    "shop.full.description":
      "Opdag vores komplette sortiment af VIP-pakker, spilvaluta, køretøjer, fast ejendom og meget mere. Sikre betalinger via Tebex garanteret.",
    "shop.buy": "Køb nu",
    "shop.vouchers": "Gavekort",
    "shop.tip": "💡 Tip: Ved at købe butiksgenstande støtter du serverens udvikling og drift!",

    // Categories
    "category.security": "Sikkerhed",
    "category.innovation": "Innovation",
    "category.gameplay": "Gameplay",
    "category.character": "Karakter",
    "category.tech": "Teknologi",
    "category.anticheat": "Anti-snyd",
    "category.customization": "Tilpasning",
    "category.vehicles": "Køretøjer",
    "category.realism": "Realisme",
    "category.support": "Support",

    // Buttons
    "button.discord": "Tilmeld dig Discord",
    "button.download": "Download FiveM",

    // Footer
    "footer.social": "Sociale medier",
    "footer.links": "Links",
    "footer.privacy": "Privatliv",
    "footer.terms": "Servicevilkår",
    "footer.company": "Virksomhed",
    "footer.partners": "Partnere",
    "footer.twitter": "Twitter",
    "footer.instagram": "Instagram",
    "footer.youtube": "YouTube",
    "footer.tiktok": "TikTok",
    "footer.discord": "Discord",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.features": "Функции",
    "nav.join": "Как Присоединиться",
    "nav.faq": "FAQ",
    "nav.forum": "Форум",
    "nav.partner": "Партнер",

    // Hero Section
    "hero.title": "Устали от серверов?",
    "hero.subtitle": "Мы тоже!",
    "hero.description": "Приходите на наш сервер - мы предлагаем больше всего функций!",
    "hero.join": "Присоединиться Сейчас",
    "hero.discord": "Ссылка Discord",
    "hero.shop": "В Магазин",

    // Features Section
    "features.title": "Наши Функции",
    "features.subtitle": "Откройте для себя уникальные функции, которые делают наш сервер особенным",
    "features.realistic.title": "Реалистичный Roleplay",
    "features.realistic.description":
      "Испытайте аутентичные сценарии roleplay с преданным сообществом, которое ценит качество и реализм.",
    "features.community.title": "Активное Сообщество и События",
    "features.community.description":
      "Регулярные события, турниры и активности сообщества обеспечивают разнообразные развлечения круглосуточно.",
    "features.economy.title": "Наша Экономическая Система",
    "features.economy.description":
      "Продуманная экономическая система с работами, компаниями и реалистичным рынком для истинного погружения.",
    "features.faction.title": "Планируемая Структура Фракций",
    "features.faction.description":
      "Организованные фракции с четкими иерархиями и захватывающими сюжетными линиями для долгосрочного развития персонажей.",
    "features.custom.title": "Пользовательские Скрипты и Транспорт",
    "features.custom.description":
      "Уникальные скрипты и большой выбор транспортных средств для несравненного игрового опыта.",

    // Advanced Features Section
    "advanced.title": "Наши Серверные Системы",
    "advanced.subtitle":
      "Откройте для себя передовые системы и инновации, которые делают xWorld Roleplay уникальным опытом",
    "advanced.uid.title": "Система UID",
    "advanced.uid.description":
      "Уникальная система ID для отслеживания игроков и обеспечения максимальной безопасности.",
    "advanced.nextgen.title": "Системы Next-Gen",
    "advanced.nextgen.description":
      "Высокосовременные системы нового поколения с совершенно новыми инновациями на сцене.",
    "advanced.midcore.title": "Midcore Roleplay",
    "advanced.midcore.description": "Идеальное сочетание экшена и roleplay для максимального игрового опыта.",
    "advanced.height.title": "Регулируемый Рост Тела",
    "advanced.height.description": "Регулируемый рост тела персонажа, хитбокс не изменяется.",
    "advanced.mods.title": "Серверные Моды",
    "advanced.mods.description":
      "Серверные прицелы и графические моды для оптимальной производительности и справедливости.",
    "advanced.anticheat.title": "Человеческое Обнаружение Читов",
    "advanced.anticheat.description":
      "Лучшее обнаружение читов на рынке: Человеческий глаз. Никаких проверок ПК или сканирований анти-чит.",
    "advanced.clothing.title": "44 000 Предметов Одежды",
    "advanced.clothing.description":
      "44 000 файлов одежды и возможностей - все Lore Friendly для аутентичного roleplay.",
    "advanced.vehicles.title": "200+ Lore Friendly Транспорта",
    "advanced.vehicles.description":
      "Более 200 модифицированных Lore Friendly транспортных средств, которые безопасны для TOS и обогащают игровой опыт.",
    "advanced.medical.title": "Продвинутая Медицина",
    "advanced.medical.description":
      "Высокосовременная медицинская система с реалистичными травмами и процессами лечения.",
    "advanced.faction.title": "Управление Фракциями",
    "advanced.faction.description":
      "Проблемы с фракцией? Управление фракциями поможет вам в строительстве или решении проблем.",

    // How to Join Section
    "join.title": "Как Присоединиться",
    "join.subtitle": "Следуйте этим простым шагам, чтобы стать частью нашего сообщества",
    "join.step1.title": "Присоединиться к Discord",
    "join.step1.description": "Присоединитесь к нашему серверу Discord и станьте частью нашего сообщества.",
    "join.step1.details": "Нажмите на ссылку Discord и следуйте инструкциям по регистрации.",
    "join.step2.title": "Подключить Discord с 2FA",
    "join.step2.description": "Подключите ваш Discord с 2FA, примите правила и самостоятельно получите вайтлист.",
    "join.step2.details": "Это против мульти-аккаунтов и читеров для защиты наших игроков.",
    "join.step3.title": "Скачать и Установить FiveM",
    "join.step3.description": "Скачайте FiveM с официального сайта и установите его.",
    "join.step3.details": "Если FiveM уже установлен, переходите к шагу 4!",
    "join.step4.title": "Очистить Папку FiveM",
    "join.step4.description": "Для правильного использования удалите все папки в директории FiveM.",
    "join.step4.details": "Перейдите в %localappdata%\\FiveM\\FiveM.app\\data (просто введите вверху в Проводнике)",
    "join.step5.title": "Первые Шаги на Сервере",
    "join.step5.description": "Начните свое приключение с нашим руководством для новичков.",
    "join.step5.details": "Ссылки на правила и руководство для новичков можно найти на нашем форуме и Gitbook.",
    "join.ready.title": "Готовы начать?",
    "join.ready.description": "Следуйте всем шагам и начните свое приключение roleplay!",
    "join.ready.button": "На Сервер Discord",

    // FAQ Section
    "faq.title": "Часто Задаваемые Вопросы",
    "faq.subtitle": "Здесь вы найдете ответы на самые важные вопросы о нашем сервере",
    "faq.q1": "Как присоединиться?",
    "faq.a1":
      "Следуйте нашему Руководству Как Присоединиться вверху страницы. Вы должны присоединиться к нашему Discord, получить вайтлист и установить FiveM.",
    "faq.q2": "Что мне нужно для игры?",
    "faq.a2":
      "Вам нужна чистая GTA V без модов или Reshade. Наш сервер предлагает серверные графические моды с 0 влиянием на производительность.",
    "faq.q3": "Есть ли минимальный возраст?",
    "faq.a3": "Минимальный возраст 16 лет. Исключения можно запросить через поддержку.",
    "faq.q4": "Как работает вайтлист?",
    "faq.a4":
      "Вайтлист осуществляется через Discord. После присоединения к нашему серверу Discord вы можете самостоятельно получить вайтлист.",
    "faq.q5": "Могу ли я установить графические моды?",
    "faq.a5":
      "Нет, потому что мы предлагаем серверные графические моды с 0 влиянием на производительность и предоставляем переработки графики GTA. Внешние моды не разрешены.",
    "faq.q6": "Какие правила на сервере?",
    "faq.a6":
      "Все правила можно найти в нашем Discord и форуме. В основном: Уважительное взаимодействие, реалистичный roleplay и никаких читов или эксплойтов.",
    "faq.q7": "Могу ли я играть с друзьями?",
    "faq.a7": "Да! Вы можете играть с друзьями на сервере. Убедитесь, что все прошли процедуру вайтлиста.",
    "faq.q8": "Как часто проходят события?",
    "faq.a8":
      "Мы регулярно организуем события и активности сообщества. Информацию об этом можно найти в нашем Discord и форуме.",
    "faq.more.title": "Больше вопросов?",
    "faq.more.description": "Наша команда поддержки рада помочь вам. Свяжитесь с нами через Discord или форум.",
    "faq.discord": "Поддержка Discord",
    "faq.forum": "Посетить Форум",

    // Shop Section
    "shop.button": "В Магазин Tebex",
    "shop.nopay2win": "Без Pay2Win",
    "shop.community": "Ориентированный на Сообщество",
    "shop.description":
      "Наш магазин предлагает только косметические предметы и улучшения качества жизни. Мы верим в честный геймплей, где навыки и roleplay важнее всего, а не ваш кошелек.",
    "shop.title": "Магазин Сервера",
    "shop.subtitle": "Поддержите сервер и получите эксклюзивные преимущества",
    "shop.vip.title": "VIP Пакеты",
    "shop.vip.description": "Эксклюзивные VIP преимущества и премиум функции для максимального опыта roleplay.",
    "shop.currency.title": "Внутриигровая Валюта",
    "shop.currency.description": "Начните с финансовым преимуществом и стройте свою империю быстрее.",
    "shop.cosmetics.title": "Косметика и Предметы",
    "shop.cosmetics.description": "Персонализируйте своего персонажа уникальной одеждой и аксессуарами.",
    "shop.full.title": "Полный Магазин",
    "shop.full.description":
      "Откройте для себя наш полный ассортимент VIP пакетов, внутриигровой валюты, транспорта, недвижимости и многого другого. Безопасные платежи через Tebex гарантированы.",
    "shop.buy": "Купить Сейчас",
    "shop.vouchers": "Подарочные Ваучеры",
    "shop.tip": "💡 Совет: Покупая предметы в магазине, вы поддерживаете разработку и работу сервера!",

    // Categories
    "category.security": "Безопасность",
    "category.innovation": "Инновации",
    "category.gameplay": "Геймплей",
    "category.character": "Персонаж",
    "category.tech": "Технологии",
    "category.anticheat": "Анти-Чит",
    "category.customization": "Кастомизация",
    "category.vehicles": "Транспорт",
    "category.realism": "Реализм",
    "category.support": "Поддержка",

    // Buttons
    "button.discord": "Присоединиться к Discord",
    "button.download": "Скачать FiveM",

    // Footer
    "footer.social": "Социальные Сети",
    "footer.links": "Ссылки",
    "footer.privacy": "Конфиденциальность",
    "footer.terms": "Условия Обслуживания",
    "footer.company": "Компания",
    "footer.partners": "Партнеры",
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
