import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Siddhaka Ayurveda",
  description:
    "Get in touch with Siddhaka Ayurveda. Schedule your consultation with Dr. Nimeshika Madithiyawala in Thissamaharama.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Get in Touch</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Ready to begin your wellness journey? Contact us today to schedule your consultation with Dr. Nimeshika
            Madithiyawala.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Location */}
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">Beralihela Road , Tissamaharama, Sri Lanka</p>
            </div>

            {/* Phone */}
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">
                <a href="tel:+94704488844" className="hover:text-primary transition-colors">
                  +94 70 448 8844
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:siddhakaayurveda@gmail.com" className="hover:text-primary transition-colors">
                  siddhakaayurveda@gmail.com
                </a>
              </p>
            </div>

            {/* Hours */}
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground">
                By appointment
                <br />7 days a week
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl p-8 md:p-12 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+94"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="treatment" className="block text-sm font-medium text-foreground mb-2">
                    Interested In
                  </label>
                  <select
                    id="treatment"
                    name="treatment"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select a treatment or service</option>
                    <option value="consultation">General Consultation</option>
                    <option value="head-care">Head & Hair Care</option>
                    <option value="body-care">Body & Skin Care</option>
                    <option value="facial-care">Facial Care</option>
                    <option value="packages">Treatment Package</option>
                    <option value="products">Products</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your wellness goals..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Visit Us</h2>
          <div className="bg-muted rounded-xl overflow-hidden h-[450px] border border-border shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.660666286124!2d81.26498467483528!3d6.308234425627785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69d003a6262ad%3A0x60a1428e9082b006!2sSiddhaka%20Ayurveda!5e0!3m2!1sen!2slk!4v1767428424727!5m2!1sen!2slk"
              className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground font-medium">Siddhaka Ayurveda</p>
            <p className="text-sm text-muted-foreground mt-1">Beralihela Road, Tissamaharama, Sri Lanka</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How should I prepare for my first consultation?",
                a: "Please arrive 15 minutes early and bring any relevant medical history. Wear comfortable, loose clothing that allows easy access to your arms and legs. Avoid heavy meals 2-3 hours before your appointment.",
              },
              {
                q: "How long do treatments typically last?",
                a: "Treatment duration varies based on the specific therapy. Most individual treatments range from 30 minutes to 2 hours. Our special packages are designed for 4 to 7 days of intensive healing.",
              },
              {
                q: "Are the treatments suitable for all ages?",
                a: "Ayurvedic treatments can be adapted for different ages and conditions. However, pregnant women, people with certain medical conditions, and those taking specific medications should consult with Dr. Nimeshika before treatment.",
              },
              {
                q: "What should I expect after a treatment?",
                a: "Most people feel deeply relaxed and rejuvenated after treatment. You may experience improved sleep, better digestion, and increased energy. Follow the post-treatment guidance provided by our therapists for optimal results.",
              },
              {
                q: "Do you offer payment plans or packages?",
                a: "Yes! We offer various treatment packages and special programs. Our signature packages include accommodation and daily treatments. Contact us for customized package options.",
              },
              {
                q: "How often should I receive treatments?",
                a: "This depends on your individual needs and goals. A typical recommendation is weekly treatments for ongoing wellness, or intensive programs for specific conditions. Dr. Nimeshika will provide personalized guidance.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
