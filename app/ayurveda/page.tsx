import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ayurveda Medical System - Siddhaka Ayurveda",
  description:
    "Discover the ancient wisdom of Ayurveda, the world's oldest holistic medical system focused on balance, prevention, and natural healing.",
}

export default function AyurvedaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Understanding Ayurveda</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Exploring the world's oldest and most holistic medical system — 5000+ years of wisdom for natural healing
            and balanced living.
          </p>
        </div>
      </section>

      {/* What is Ayurveda */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">What is Ayurveda?</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Ayurveda is an ancient holistic medical and wellness philosophy that originated in India over 5,000 years
              ago. The word "Ayurveda" comes from Sanskrit, where "Ayur" means life and "Veda" means knowledge or
              science. Together, it translates to "the science of life."
            </p>
            <p>
              Unlike modern Western medicine, which often focuses on treating symptoms, Ayurveda approaches health
              holistically by addressing the root causes of imbalance. It views the human body as a complex
              interconnected system where physical, mental, emotional, and spiritual well-being are intrinsically
              linked.
            </p>
            <p>
              Ayurveda emphasizes prevention, natural healing, and the restoration of balance through personalized
              treatment plans tailored to each individual's unique constitution. It is recognized by the World Health
              Organization as a traditional medicine system.
            </p>
          </div>
        </div>
      </section>

      {/* The Three Doshas */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">The Three Doshas</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            In Ayurveda, the three doshas are the fundamental energies that govern all biological and psychological
            functions in the human body. Every person has a unique combination of these doshas, which determines their
            individual constitution (Prakriti) and overall health.
          </p>

          <div className="space-y-8">
            {/* Vata */}
            <div className="bg-background rounded-xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-primary mb-4">Vata Dosha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Characteristics:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Composed of Air and Ether elements</li>
                    <li>• Light, dry, cold, and mobile</li>
                    <li>• Governs movement and circulation</li>
                    <li>• Controls nervous system functions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">When in Balance:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Mental clarity and creativity</li>
                    <li>• Good digestion and elimination</li>
                    <li>• Healthy sleep and energy</li>
                    <li>• Flexibility and adaptability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pitta */}
            <div className="bg-background rounded-xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-secondary mb-4">Pitta Dosha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Characteristics:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Composed of Fire and Water elements</li>
                    <li>• Hot, sharp, light, and oily</li>
                    <li>• Governs metabolism and digestion</li>
                    <li>• Controls transformation and body heat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">When in Balance:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Strong digestion and metabolism</li>
                    <li>• Sharp intellect and focus</li>
                    <li>• Healthy skin color and complexion</li>
                    <li>• Courage and confidence</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kapha */}
            <div className="bg-background rounded-xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-accent mb-4">Kapha Dosha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Characteristics:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Composed of Earth and Water elements</li>
                    <li>• Heavy, cool, moist, and stable</li>
                    <li>• Governs structure and lubrication</li>
                    <li>• Controls strength and immunity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">When in Balance:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Strong immunity and stability</li>
                    <li>• Healthy lubrication of joints</li>
                    <li>• Emotional calm and patience</li>
                    <li>• Strength and physical endurance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Core Principles of Ayurveda</h2>

          <div className="space-y-8">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Prevention is Better than Cure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ayurveda focuses on maintaining health through proper lifestyle, diet, and seasonal routines rather than
                merely treating disease after it occurs. Regular practices like meditation, yoga, and following proper
                sleep and eating patterns help prevent imbalances.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">2. Individual Constitution (Prakriti)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every person is unique with their own individual constitution determined by their dosha balance. What
                works for one person may not work for another. Ayurvedic treatments are customized based on an
                individual's prakriti and current state of balance (vikriti).
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">3. Mind-Body Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ayurveda recognizes that physical health cannot be separated from mental and emotional well-being.
                Stress, emotions, and thoughts directly impact physical health. True healing involves balancing all
                three aspects of human existence.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">4. Natural Healing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ayurveda utilizes natural substances such as herbs, oils, foods, and therapies to promote healing. These
                natural remedies work in harmony with the body's inherent healing mechanisms rather than against them.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">5. Balance Through Opposites</h3>
              <p className="text-muted-foreground leading-relaxed">
                Imbalances in the body are corrected through the principle of opposites. For example, if a person has
                excess heat (Pitta), cooling foods and therapies are recommended. If there is excess dryness (Vata),
                warm, oily treatments are suggested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Methods */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Ayurvedic Treatment Methods</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Herbal Medicine (Aushadhi)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                The use of herbs and herbal formulations to treat specific imbalances. Thousands of herbs are used in
                Ayurveda, each with unique properties that address different doshas and health conditions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Therapeutic Massage (Abhyanga)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Massage with medicated oils to improve circulation, remove toxins, and balance the doshas. Different
                oils and massage techniques are used depending on the individual's constitution and condition.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Detoxification (Panchakarma)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A comprehensive five-step purification process designed to remove deep-rooted toxins and restore
                balance. Includes massage, herbal enemas, nasal treatments, and other specialized therapies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Dietary Guidance (Ahara)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Personalized dietary recommendations based on individual constitution. Food is viewed as medicine, and
                proper nutrition is essential for maintaining health and preventing disease.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Lifestyle Practices (Dinacharya)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Daily routines and seasonal practices that support health and well-being. This includes sleep patterns,
                exercise, meditation, and seasonal adjustments to align with natural rhythms.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Yoga and Meditation (Yoga & Dhyana)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Physical poses and meditation practices that balance the mind-body system, reduce stress, and promote
                overall well-being. Specific practices are recommended based on individual constitution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Ayurvedic Healing?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Holistic Approach",
                description:
                  "Addresses the whole person — mind, body, and spirit — rather than just treating symptoms.",
              },
              {
                title: "Personalized Care",
                description:
                  "Treatments are customized to your unique constitution and current imbalances for better results.",
              },
              {
                title: "Natural & Safe",
                description:
                  "Uses natural substances without harsh chemicals or significant side effects when properly administered.",
              },
              {
                title: "Prevention Focused",
                description: "Emphasizes maintaining health and preventing disease rather than treating emergencies.",
              },
              {
                title: "Long-term Wellness",
                description: "Promotes sustainable health through lifestyle changes and natural healing practices.",
              },
              {
                title: "Time-Tested",
                description:
                  "Over 5,000 years of proven results and continuous refinement of treatments and practices.",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
            Begin Your Ayurvedic Journey
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 text-balance">
            Experience the ancient wisdom of Ayurveda at Siddhaka Ayurveda, where tradition meets personalized care.
          </p>
          <button className="px-8 py-4 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg">
            Schedule Your Consultation
          </button>
        </div>
      </section>
    </main>
  )
}
