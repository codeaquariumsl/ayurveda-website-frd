import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Image
              src="/Siddhaka_ayurveda_Logo.png"
              alt="Siddhaka Ayurveda"
              width={140}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Ancient wisdom, personalized for your modern life. Authentic Ayurvedic healing in Thissamaharama.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=100083591983365" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/siddhakaayurveda/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/siddhaka-ayurveda/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/treatments#head-care"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Head & Hair
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments#body-care"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Body & Skin
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments#facial-care"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Facial Care
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments#foot-care"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Foot Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/ayurveda" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ayurveda System
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Beralihela Road , Tissamaharama, Sri Lanka</p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+94704488844" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +94 70 448 8844
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:siddhakaayurveda@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  siddhakaayurveda@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2025 Siddhaka Ayurveda. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
