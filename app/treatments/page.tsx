"use client"

import Link from "next/link"
import { TreatmentTabs } from "@/components/treatment-tabs"
import { useAuth } from "@/components/auth-context"

export default function TreatmentsPage() {
  const { packages } = useAuth()



  const categories = [
    { id: "head-care", name: "Head and Hair Care Treatments", sub: "head-hair" },
    { id: "body-care", name: "Body and Skin Care Treatments", sub: "body-skin" },
    { id: "facial-care", name: "Facial Care Treatments", sub: "facial" },
    { id: "foot-care", name: "Foot Care Treatments", sub: "foot" },
  ]

  // const mainTabs = categories.map(cat => {
  //   const catPackages = packages.filter(p => p.category === "wellness" && p.subcategory === cat.sub)
  //   return {
  //     id: cat.id,
  //     name: cat.name,
  //     treatments: catPackages.map(pkg => ({
  //       title: pkg.name,
  //       duration: `${pkg.duration} minutes`,
  //       description: pkg.description,
  //       benefits: pkg.benefits ? [pkg.benefits] : pkg.includes,
  //       image: pkg.image || "/ayurvedic-body-massage-therapy.jpg"
  //     }))
  //   }
  // })

  const mainTabs = [
    {
      id: "head-care",
      name: "Head and Hair Care Treatments",
      treatments: [
        {
          title: "Shiro Dhara",
          duration: "45 minutes",
          description:
            "A procedure consisting of continuous pouring of medicated oil onto the forehead, focusing on the powerful 'third eye' of the mind or 'Sthapani Marma' to effectively purify and relax your body, mind and soul.",
          image: "/Treatment/Shiro Dhara.JPG", // Added image
          benefits: [
            "Rejuvenates the body and balances the mind",
            "Improves memory and stress relief",
            "Stimulates the nervous system",
            "Relieves migraine, headaches, and insomnia",
            "Relieves psychological disorders",
            "Enhances hair growth",
            "Cures dandruff and premature hair greying",
          ],
        },
        {
          title: "Shiro Abhyanga (Head Massage)",
          description:
            "A therapeutic head massage with the applying of medicated oil on the scalp focusing on marma points of the forehead, head, neck and shoulders to soothe, comfort and calm body, mind and soul.",
          image: "/ayurvedic-scalp-massage-therapy.jpg", // Added image
          benefits: [
            "Relieves eye strain and headaches"
            // "Promotes total relaxation and deep restful sleep",
            // "Releases tension",
            // "Stimulates mental function",
            // "Relieves eye strain",
            // "Good for migraine and stiff necks/shoulders",
            // "Prevents hair falling",
            // "Cures dandruff and enhances hair growth",
          ],
        },
        {
          title: "Shiro Lepa",
          description: "Apply medicated paste on scalp.",
          image: "/herbal-scalp-treatment-paste.jpg", // Added image
          benefits: [
            "Reduces the burning sensation in the scalp",
            "Treats other scalp diseases",
            "Prevents hair fall and split hair",
            "Prevents premature greying of hair",
            "Relieves headache and migraine",
            "Induces sleep",
            "Treats psychological and neurological disorders",
          ],
        },
      ],
    },
    {
      id: "body-care",
      name: "Body and Skin Care Treatments",
      treatments: [
        {
          title: "Shareera Abhyanga (Body Oil Massage)",
          duration: "60 minutes",
          description: "Body massage with oil made specially for each dosha including face and foot massage.",
          image: "/Treatment/Shareera Abhyanga.JPG", // Added image
          benefits: [
            "Improves skin tone and natural skin beauty",
            "Improves body shape",
            "Relieves pain",
            "Eliminates toxins",
            "Rejuvenates the entire body",
            "Good for paralysis patients",
            "Good for paralysis patients for enhances power of limbs",
          ],
        },
        {
          title: "Shareera Abhyanga with Udvarthana (Powder massage)",
          duration: "90 minutes",
          description:
            "An intensive toning and lightening treatment that helps to reduce sun burns and minimize discolourations. This is followed by herbal Ayurveda scrub and full body massage.",
          image: "/Treatment/Ayurvedic Body Scrub Treatment.JPG", // Added image
          benefits: [
            "Supports skin toning and firmness",
            "Helps soothe and calm heat - stressed skin after sun exposure",
            "Promotes a more even skin tone",
            "Reduces appearance of discolorations",
            "Enhances circulation",
          ],
        },
        {
          title: "Parisheka",
          description:
            "Induction of perspiration by the unique procedure of pouring warm medicated oil on the body. The procedure may be performed to a portion of the body or whole body.",
          image: "/Treatment/Parisheka.JPG", // Added image
          benefits: [
            "Deep relaxation & stress relief",
            "Nourishes skin & tissues",
            "Reduces dryness & stiffness",
            "Enhances blood flow and lymphatic drainage Supporting detoxification",
            "Relieves pain & inflammation",
            "Promotes better sleep",
            "Balances doshas",
          ],
        },
        {
          title: "Annalepa",
          duration: "60-90 minutes",
          description:
            "The whole body or any part of the body is made to perspire by means of application of a kind of payasa or pudding, specially prepared with Navara variety of rice, milk and decoction of Bala roots.",
          image: "/ayurvedic-rice-milk-treatment.jpg", // Added image
          benefits: [
            "Rejuvenation",
            "Strengthens the tissues",
            "Prevents degeneration",
            "Treats emaciation and wasting of body",
          ],
        },
        {
          title: "Shashtika Shali Pinda Sweda",
          duration: "60-90 minutes",
          description:
            "Nourishing and rejuvenating body massage done with bundles of rice cooked in milk and herbal decoction.",
          image: "/Treatment/Shashtikashli.JPG", // Added image
          benefits: [
            "Increases natural beauty and complexion",
            "Increases luster",
            "Beneficial for degenerative muscle and bone problems",
            "Treats many other disorders",
          ],
        },
        {
          title: "Patra Pinda Sweda",
          description: "Treatment done with bundles of herbs fried with oil.",
          image: "/Treatment/PathraPindasweda.JPG", // Added image
          benefits: [
            "Beneficial for arthritis",
            "Relieves joint stiffness",
            "Treats neuritis",
            "Treats inflammatory diseases",
          ],
        },
        {
          title: "Nadi Sweda",
          duration: "30 minutes",
          description:
            "A process by which the person is made to perspire using a tube and medicated steam passed on whole body or affected part.",
          image: "/Treatment/Nadi Sweda.JPG", // Added image
          benefits: ["Relieves pain immediately without oral drugs", "Therapeutic heating treatment"],
        },
        {
          title: "Vashpa Sweda",
          duration: "30 minutes",
          description:
            "Apparatus used as sitting posture or lying posture is from shoulders to feet with herbal medicinal steam.",
          image: "/Treatment/Vashpa Sweda.JPG", // Added image
          benefits: [
            "Detoxifies body",
            "Relaxes the body and mind",
            "Helps for weight reduction",
            "Reduces pains and aches",
            "Beneficial for arthritis and back pain",
          ],
        },
        {
          title: "Avagaha Sweda",
          duration: "30-45 minutes",
          description:
            "A process by which the individual will be immersion of the decoction to produce fomentation to the body. Medicated oil is applied to the head and body in a tub.",
          image: "/Treatment/Avagaha Sweda.JPG", // Added image
          benefits: [
            "Relaxes body and mind",
            "Helps to treat urinary tract infections",
            "Treats lower back pain",
            "Treats gynecological disorders",
            "Treats hemorrhoids",
            "Treats infertility",
          ],
        },
        {
          title: "Mud Therapy",
          duration: "45 minutes",
          description:
            "An ancient practice that uses mud mask to bring out your natural beauty by enhancing complexion and glow of the skin.",
          image: "/ayurvedic-mud-therapy-mask.jpg", // Added image
          benefits: [
            "Relaxes the muscles",
            "Improves blood circulation",
            "Maintains metabolism",
            "Regenerates healthy skin",
            "Eliminates the dead skin",
            "Refines skin structure",
            "Relieves pain and swelling",
          ],
        },
        {
          title: "Kati Vasti",
          duration: "30-45 minutes",
          description:
            "The most effective Ayurveda therapy for back pain. Warm medicated oil is retained in lower back area after making a rim with black gram dough around spine.",
          image: "/Treatment/Kati Wasthi.JPG", // Added image
          benefits: [
            "Most effective for back pain",
            "Treats inflammation and stiffness",
            "Treats numbness due to sciatic nerve compression",
            "Strengthens back muscles",
            "Maintains normal curvature of spine",
            "Strengthens joints, muscles and soft tissues",
          ],
        },
        {
          title: "Janu Vasti",
          duration: "30-45 minutes",
          description:
            "A treatment in which medicated oils are poured and pooled for a fixed duration in a compartment constructed around the knee joint using wet flour of black gram.",
          image: "/ayurvedic-knee-joint-treatment.jpg", // Added image
          benefits: [
            "Treats osteoarthritis",
            "Treats knee joint sublaxation",
            "Treats rheumatism and ligament tear",
            "Relieves knee pain",
            "Improves knee joint movement",
            "Reduces swelling",
            "Increases weight bearing capacity",
          ],
        },
      ],
    },
    {
      id: "facial-care",
      name: "Facial Care Treatments",
      treatments: [
        {
          title: "Face Massage",
          duration: "30 minutes",
          description:
            "A rejuvenating and age minimizing Ayurveda face massage by applying medicated oil focusing on marma points of the face.",
          image: "/Treatment/Face Massage.JPG", // Added image
          benefits: [
            "Firms and smooths the skin",
            "Nourishes and regenerates skin cells",
            "Removes impurities and wrinkles",
            "Reduces signs of aging",
          ],
        },
        {
          title: "Facial Treatment",
          duration: "60 minutes",
          description:
            "A unique soothing, balancing and healing facial treatment to help purify and clear out clogged pores while eliminating excess oil. Includes a herbal scrub, steam and facial massage followed by a mask.",
          image: "/Treatment/Facial Treatment.JPG", // Added image
          benefits: [
            "Improves complexion",
            "Removes sunburn",
            "Reduces dark patches",
            "Minimizes dryness",
            "Deep purification with Ayurveda herbs",
          ],
        },
        {
          title: "Face Massage with Nasal Inhalation",
          duration: "45 minutes",
          description:
            "Face massage combined with cleansing and rejuvenation of the nasal passages, sinuses and respiratory system by using medicated steam.",
          image: "/ayurvedic-facial-massage.jpg", // Added image
          benefits: [
            "Cleanses and rejuvenates nasal passages",
            "Clears sinuses",
            "Improves respiratory system",
            "Facial rejuvenation",
          ],
        },
        {
          title: "Akshi Tharpana",
          duration: "30-45 minutes",
          description:
            "Akshi means eyes and tharpana means giving strength to the eyes. Medicated ghee is poured over the eyelids in an enclosure built around the eye out of wheat flour.",
          image: "/ayurvedic-eye-treatment-therapy.jpg", // Added image
          benefits: [
            "Improves vision and clarity of mind",
            "Specialized treatment for eye disorders",
            "Preventive and curative therapy",
            "Maintains normal healthy condition of eyes",
          ],
        },
      ],
    },
    {
      id: "foot-care",
      name: "Foot Care Treatments",
      treatments: [
        {
          title: "Foot Massage",
          duration: "30 minutes",
          description: "Foot massage with medicated oil that stimulates the Marma and reflex points in the feet.",
          image: "/Treatment/Foot Massage (2).JPG", // Added image
          benefits: [
            "Heals and revitalizes the body",
            "Improves circulation in the entire body",
            "Stimulates reflex and marma points",
          ],
        },
        {
          title: "Relaxing Foot Treatment",
          duration: "60 minutes",
          description:
            "Commence with a relaxing herbal foot bath followed by herbal scrub, foot massage with stimulating Marma points and ends with foot mask and toning of foot.",
          image: "/Treatment/Relaxing foot tre.JPG", // Added image
          benefits: [
            "Complete foot rejuvenation",
            "Relaxation and therapeutic benefits",
            "Improves foot health and circulation",
          ],
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">Our Treatments</h1>
          <p className="text-base md:text-lg text-muted-foreground text-balance">
            Discover our comprehensive range of authentic Ayurvedic treatments designed to heal, rejuvenate, and restore
            balance to your mind, body, and soul.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          {mainTabs.length > 0 && <TreatmentTabs tabs={mainTabs as any} />}
        </div>
      </section>

      <section className="py-8 md:py-12 bg-card">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Experience Healing?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 text-balance">
            Schedule your consultation with Dr. Nimeshika Madithiyawala to discover which treatment is right for you.
          </p>
          <Link
            href="/packages"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg text-center"
          >
            Book Your Treatment
          </Link>
        </div>
      </section>
    </main>
  )
}
