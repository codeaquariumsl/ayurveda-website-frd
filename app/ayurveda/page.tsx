import type { Metadata } from "next"
import Image from "next/image"
import {
  Heart,
  Leaf,
  Wind,
  Flame,
  Droplets,
  Mountain,
  Sun,
  Activity,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

export const metadata: Metadata = {
  title: "Ayurveda Medical System - Siddhaka Ayurveda",
  description: "Discover Ayurveda, the Science of Life. Learn about the Three Doshas, Panchakarma, and holistic healing through Ahara and Vihara.",
}

export default function AyurvedaPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/ayurveda-hero.png"
          alt="Ayurveda Healing Backdrop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Ayurveda Medical System
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 drop-shadow-md">
            “The Science of Life” — A 5,000-year-old tradition of holistic healing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold">
              Harmony
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold">
              Balance
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold">
              Longevity
            </span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
              <Leaf className="w-4 h-4" />
              <span>Ancient Wisdom</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What is Ayurveda?</h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ayurveda is one of the oldest traditional systems of medicine in the world and is widely recognized for its holistic approach to health and healing. The term Ayurveda originates from Sanskrit, where <span className="text-primary font-semibold italic">Ayur</span> means life and <span className="text-secondary font-semibold italic">Veda</span> means knowledge or science—together meaning <span className="font-bold text-foreground">“The Science of Life.”</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ayurveda emphasizes that true health is achieved through harmony between the body, mind, and spirit. A core principle of Ayurveda is that proper food (Ahara) and healthy lifestyle practices (Vihara) are more important than medicines.
              </p>
            </div>
          </div>
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
              “Medicines are considered secondary and are used only when dietary regulation and lifestyle correction are insufficient.”
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Rather than focusing only on disease, Ayurveda promotes overall wellbeing primarily through wholesome nutrition, daily and seasonal routines, healthy habits, followed by herbal medicine, yoga, meditation, and detoxification therapies.
            </p>
          </div>
        </div>
      </section>

      {/* Fundamental Principles - Five Elements & Tridosha */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Fundamental Principles</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              According to Ayurveda, the entire universe—including the human body—is composed of five basic elements:
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { name: "Space", icon: Sparkles, color: "text-blue-400", sub: "Akasha" },
              { name: "Air", icon: Wind, color: "text-sky-400", sub: "Vayu" },
              { name: "Fire", icon: Flame, color: "text-orange-500", sub: "Agni" },
              { name: "Water", icon: Droplets, color: "text-cyan-500", sub: "Jala" },
              { name: "Earth", icon: Mountain, color: "text-amber-700", sub: "Prithvi" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-background rounded-xl border border-border transition-all hover:border-primary/50 group">
                <item.icon className={`w-10 h-10 mb-4 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="font-bold text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground italic">{item.sub}</span>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-muted-foreground text-center mb-10">
              These five elements combine in different proportions to form the three biological energies or doshas, collectively known as <span className="font-bold text-foreground">“Tridosha.”</span> The balance of these doshas governs all physical, mental, and emotional functions of the body.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-sky-600 mb-4">Vata</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">(Space & Air)</p>
                <p className="text-muted-foreground">
                  Controls movement, circulation, nervous system activity, creativity, and communication.
                </p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Pitta</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">(Fire & Water)</p>
                <p className="text-muted-foreground">
                  Regulates digestion, metabolism, body temperature, intelligence, and transformation processes.
                </p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">Kapha</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">(Water & Earth)</p>
                <p className="text-muted-foreground">
                  Provides structure, stability, strength, immunity, lubrication, and emotional calmness.
                </p>
              </div>
            </div>
            <p className="text-center mt-10 text-muted-foreground font-medium">
              A healthy state is maintained when these three <span className="text-primary font-bold">doshas</span> remain in balance.
            </p>
          </div>
        </div>
      </section>

      {/* Prakrithi Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
              <div className="relative bg-card p-10 rounded-3xl border border-border">
                <h2 className="text-3xl font-bold mb-6">Prakrithi – Body Constitution</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Prakrithi refers to an individual’s unique physical and mental constitution, determined by the proportion of Vata, Pitta, and Kapha at the time of conception.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This constitution remains constant throughout life and influences:
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      "Physical characteristics",
                      "Personality traits",
                      "Dietary preferences",
                      "Strengths and weaknesses",
                      "Susceptibility to diseases",
                    ].map((trait, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-bold">Assessing Your Prakrithi</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ayurveda aims to maintain or restore doshic balance according to one’s prakrithi. To assess prakrithi, Ayurvedic physicians use methods such as:
            </p>
            <ul className="space-y-4">
              {[
                { title: "Pulse Examination", desc: "Nadi Pareeksha to detect internal imbalances." },
                { title: "Tongue Analysis", desc: "Jihva Pareeksha to observe digestive health and toxins." },
                { title: "Body Assessment", desc: "Physical observation of structure, skin, and temperament." },
                { title: "Detailed Questionnaires", desc: "Comprehensive review of lifestyle habits and history." }
              ].map((method, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-background border border-border group hover:border-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{method.title}</h4>
                    <p className="text-sm text-muted-foreground">{method.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Understanding prakrithi helps in selecting the most suitable diet, lifestyle, and treatments for long-term health.
            </p>
          </div>
        </div>
      </section>

      {/* Ahara and Vihara - Foundations of Health */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ahara and Vihara</h2>
            <p className="text-xl font-medium text-foreground/80">The Foundation of Health in Ayurveda</p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Leaf className="w-24 h-24 text-primary" />
              </div>
              <div className="space-y-4 relative z-10 text-muted-foreground leading-relaxed">
                <p>
                  In Ayurveda, food <span className="font-bold text-foreground">(Ahara)</span> and lifestyle practices <span className="font-bold text-foreground">(Vihara)</span> are considered more important than medicines. They are the first and most essential steps in maintaining health and preventing disease.
                </p>
                <p>
                  According to Ayurvedic principles, many illnesses arise due to improper diet, unhealthy routines, and imbalance in daily living.
                </p>
                <p>
                  Ayurveda emphasizes that when a person follows the correct Ahara and Vihara according to their prakrithi, age, season, and environment, the body naturally maintains balance and healing occurs without the need for strong medications.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 p-6 rounded-2xl flex items-start gap-4">
              <Activity className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-sm font-semibold text-primary/80">
                Medicines (Aushadha) are used as a secondary measure, only when dietary regulation and lifestyle correction alone are not sufficient.
              </p>
            </div>
            <p className="text-center text-muted-foreground font-medium">
              This approach highlights Ayurveda as a preventive and sustainable system of medicine, focusing on long-term wellbeing rather than temporary relief.
            </p>
          </div>
        </div>
      </section>

      {/* Main Objectives of Ayurveda */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Main Objectives of Ayurveda</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Ayurveda has two primary objectives:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="text-left bg-card p-10 rounded-3xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Preservation of Health</h3>
            <p className="text-muted-foreground">To maintain the health of healthy individuals through proper diet, daily routines, seasonal practices, and lifestyle discipline.</p>
          </div>
          <div className="text-left bg-card p-10 rounded-3xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Prevention and Management of Disease</h3>
            <p className="text-muted-foreground">To restore balance in individuals suffering from illness by correcting doshic imbalances through personalized treatments and natural healing therapies.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-10">Therapeutic Approaches</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Samshodhana",
              desc: "Purification therapies to eliminate accumulated toxins from the body.",
              icon: "01"
            },
            {
              title: "Samshamana",
              desc: "Palliative treatments to pacify aggravated doshas.",
              icon: "02"
            },
            {
              title: "Nidanaparivarjana",
              desc: "Avoidance of causative factors responsible for disease.",
              icon: "03"
            }
          ].map((strat, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border border-border group hover:bg-primary transition-all duration-300">
              <span className="text-4xl font-black text-muted-foreground/10 group-hover:text-white/20 transition-colors mb-4 block">
                {strat.icon}
              </span>
              <h4 className="text-xl font-bold mb-3 group-hover:text-white">{strat.title}</h4>
              <p className="text-sm text-muted-foreground group-hover:text-white/80 leading-relaxed">{strat.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-muted-foreground text-sm">
          Among these, <span className="font-bold underline">Samshodhana</span> (purification) is considered highly effective and is commonly performed through Panchakarma therapy.
        </p>
      </section>

      {/* Panchakarma Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Panchakarma Therapy</h2>
              <p className="text-lg text-background/80 leading-relaxed mb-10">
                Panchakarma is a classical Ayurvedic detoxification and rejuvenation therapy designed to cleanse the body, restore doshic balance, and promote longevity.
              </p>
              <div className="flex gap-4 mb-10">
                <div className="bg-background/10 backdrop-blur-md px-6 py-4 rounded-2xl">
                  <span className="block text-3xl font-bold">Pancha</span>
                  <span className="text-xs uppercase tracking-widest text-background/60">Five</span>
                </div>
                <div className="flex items-center text-3xl font-light text-background/40">+</div>
                <div className="bg-background/10 backdrop-blur-md px-6 py-4 rounded-2xl">
                  <span className="block text-3xl font-bold">Karma</span>
                  <span className="text-xs uppercase tracking-widest text-background/60">Therapeutic Actions</span>
                </div>
              </div>
              <p className="text-sm text-background/70 font-medium italic border-l-2 border-primary pl-4">
                These five therapeutic procedures help eliminate deeply seated toxins, improve bodily functions, strengthen immunity, and enhance overall wellbeing. Panchakarma is used for preventive, promotive, and curative purposes.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-secondary">Stages of Panchakarma Treatment</h3>

              <div className="bg-background/5 border border-background/10 p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">1</span>
                  Poorva Karma (Preparatory Phase)
                </h4>
                <div className="text-sm text-background/70 pl-10 space-y-2">
                  <p>This phase prepares the body for purification through:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="font-bold text-background">Snehana:</span> Oleation therapy</li>
                    <li><span className="font-bold text-background">Swedana:</span> Fomentation or sweating therapy</li>
                  </ul>
                  <p className="pt-2 italic">Duration: Usually 5 to 10 days, depending on individual condition.</p>
                </div>
              </div>

              <div className="bg-background/5 border border-background/10 p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">2</span>
                  Pradhana Karma (Main Purification)
                </h4>
                <div className="text-sm text-background/70 pl-10 space-y-6">
                  {[
                    { title: "Vamana Karma (Therapeutic Emesis)", desc: "Eliminates aggravated Kapha and toxins through controlled vomiting." },
                    { title: "Virechana Karma (Therapeutic Purgation)", desc: "Removes excess Pitta and toxins through the lower gastrointestinal tract." },
                    { title: "Vasthi Karma (Therapeutic Enema)", desc: "Considered the most important therapy, especially for Vata disorders. Medicated enemas help cleanse the colon and balance systemic functions." },
                    { title: "Nasya Karma (Nasal Insufflatin)", desc: "Administration of medicated oils or powders through the nasal passage, mainly for diseases affecting the head and neck region." },
                    { title: "Raktamokshana (Bloodletting)", desc: "Performed in conditions associated with blood vitiation, using safe and controlled methods." },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="font-bold text-background flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-primary" />
                        {item.title}
                      </p>
                      <p className="pl-5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background/5 border border-background/10 p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">3</span>
                  Paschath Karma (Post-Treatment Care)
                </h4>
                <p className="text-sm text-background/70 pl-10">
                  This phase includes dietary regulation, lifestyle guidance, and supportive medications to help the body regain strength and maintain the benefits of therapy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-10 rounded-3xl">
          <ShieldCheck className="w-12 h-12 text-yellow-600 dark:text-yellow-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-foreground">Safety and Consultation</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Panchakarma and other Ayurvedic treatments should always be performed under the guidance of a qualified Ayurvedic physician. Individual assessment is essential to ensure safety and effectiveness. Self-administration of Panchakarma therapies without proper consultation is not recommended.
          </p>
          <div className="p-4 bg-white dark:bg-black/20 rounded-xl inline-block shadow-sm">
            <p className="text-foreground font-bold italic">
              At Siddhaka Ayurveda, we offer personalized Ayurvedic care that blends classical wisdom with modern wellness practices, ensuring safe, authentic, and holistic healing.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x text-white text-center rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto px-4">
          <Sun className="w-16 h-16 mx-auto mb-8 animate-spin-slow opacity-20" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
            Ready to Restore Your Balance?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the profound benefits of Ayurveda at Siddhaka Ayurveda. Join us on the path to long-term wellbeing and holistic health.
          </p>
          <button className="group relative px-10 py-5 bg-white text-primary rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-2xl overflow-hidden shadow-xl">
            <span className="relative z-10">Schedule Your Consultation</span>
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </main>
  )
}
