import type { Metadata } from "next"
import { TreatmentsContent } from "@/components/treatments-content"

export const metadata: Metadata = {
  title: "Ayurvedic Treatments",
  description: "Explore our range of authentic Ayurvedic treatments in Thissamaharama, including Shiro Dhara, Body Massage, and Detoxification therapies guided by Dr. Nimeshika Madithiyawala.",
  keywords: ["Shiro Dhara", "Ayurvedic Massage", "Panchakarma", "Detox", "Healing", "Wellness Sri Lanka"],
}

export default function TreatmentsPage() {
  const mainTabs = [
    {
      id: "head-care",
      name: "Head and Hair Care Treatments",
      treatments: [
        {
          title: "Shiro Dhara",
          description: "Shiro Dhara is a therapeutic procedure involving the continuous pouring of warm medicated oil onto the forehead, focusing on the powerful “third eye” of the mind or “Sthapani Marma” to deeply relax and purify the body, mind, and soul.",
          image: "/Treatment/Shiro Dhara.JPG",
          benefits: [
            "Rejuvenates the nervous system and balances mental functions",
            "Improves memory, concentration, and sleep quality",
            "Relieves stress, anxiety, migraine, headaches, and insomnia",
            "Relieves migraine, headaches, and insomnia",
            "Supports management of psychological and neurological disorders",
            "Promotes healthy hair growth, reduces dandruff, and prevents premature greying",
          ],
        },
        {
          title: "Shiro Abhyanga (Head Massage)",
          description:
            "Shiro Abhyanga is a therapeutic head massage using medicated oils, focusing on marma points of the head, forehead, neck, and shoulders to induce deep relaxation and calmness.",
          image: "/Treatment/Head Massage.JPG",
          benefits: [
            "Promotes deep relaxation and restful sleep",
            "Reduces mental fatigue, eye strain, and tension",
            "Relieves headaches, migraine, stiff neck, and shoulder pain",
            "Prevents hair fall, reduces dandruff, and enhances hair growth",
            "Improves scalp nourishment and circulation",
          ],
        },
        {
          title: "Shiro Lepa",
          description: "Shiro Lepa involves the application of a medicated herbal paste to the scalp.",
          image: "/herbal-scalp-treatment-paste.jpg",
          benefits: [
            "Reduces burning sensation and scalp inflammation",
            "Treats scalp disorders and dandruff",
            "Prevents hair fall, split ends, and premature greying",
            "Relieves headache, migraine, and stress",
            "Induces sleep and supports neurological and psychological health",
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
          description: "A full body massage using medicated oils selected according to individual dosha, including face and foot massage.",
          image: "/Treatment/Body Oil Massage.JPG",
          benefits: [
            "Improves skin tone, texture, and natural glow",
            "Relieves body pain, stiffness, and fatigue",
            "Enhances blood circulation and detoxification",
            "Rejuvenates tissues and improves body strength",
            "Beneficial for paralysis and neuromuscular conditions",
          ],
        },
        {
          title: "Shareera Abhyanga with Udvarthana (Powder Massage)",
          description:
            "An intensive toning and lightening therapy that combines herbal powder massage followed by a full body oil massage.",
          image: "/Treatment/Ayurvedic Body Scrub Treatment.JPG",
          benefits: [
            "Enhances body toning and calorie burning",
            "Improves blood circulation and lymphatic drainage",
            "Reduces sunburns and pigmentation",
            "Minimizes discoloration and improves skin texture",
            "Promotes relaxation and overall well-being",
          ],
        },
        {
          title: "Parisheka (Oil Pouring Therapy)",
          description:
            "Parisheka Sweda is a sudation therapy where warm medicated oil is continuously poured over the body. Depending upon the requirement, this procedure may be performed on a portion of the body or the whole body. Instead of oil, warm herbal decoctions, medicated ghee, milk, and other such liquids may be used for applying heat to the body.",
          image: "/Treatment/Parisheka.JPG",
          benefits: [
            "Induces perspiration and detoxification",
            "Relieves pain, stiffness, and inflammation",
            "Balances aggravated doshas",
            "Nourishes muscles and joints",
            "Cold medicated liquids help pacify excess Pitta conditions",
          ],
        },
        {
          title: "Annalepa",
          description:
            "Annalepa is a rejuvenating sudation therapy using a medicated rice pudding prepared with Navara rice, milk, and Bala root decoction.",
          image: "/ayurvedic-rice-milk-treatment.jpg",
          benefits: [
            "Strengthens muscles and body tissues",
            "Prevents degeneration and wasting disorders",
            "Improves nourishment and vitality",
            "Useful in emaciation and weakness",
            "Promotes rejuvenation and longevity"
          ],
        },
        {
          title: "Shashtika Shali Pinda Sweda",
          description:
            "A nourishing therapy performed using warm boluses of cooked Navara rice processed in milk and herbal decoctions.",
          image: "/Treatment/Shashtikashli.JPG",
          benefits: [
            "Improves complexion, glow, and skin texture",
            "Strengthens muscles and bones",
            "Beneficial for degenerative and neurological disorders",
            "Enhances flexibility and mobility",
            "Provides deep nourishment and rejuvenation"
          ],
        },
        {
          title: "Patra Pinda Sweda (Herbal Poultice Fomentation)",
          description: "This therapy uses warm herbal poultices prepared with medicinal leaves and oil.",
          image: "/Treatment/PathraPindasweda.JPG",
          benefits: [
            "Relieves joint pain, stiffness, and swelling",
            "Beneficial for arthritis, neuritis, and inflammatory conditions",
            "Improves joint mobility and circulation",
            "Reduces muscle spasms and pain",
          ],
        },
        {
          title: "Nadi Sweda (Steam Therapy)",
          description:
            "A localized steam therapy where medicated steam is directed through a tube to the affected area or entire body.",
          image: "/Treatment/Nadi Sweda.JPG",
          benefits: [
            "Provides instant pain relief",
            "Reduces stiffness without oral medication",
            "Improves circulation and detoxification",
            "Relieves musculoskeletal pain"
          ],
        },
        {
          title: "Bhashpa Sweda (Steam Bath)",
          description:
            "A full body herbal medicated steam bath administered in a sitting or lying posture from the shoulders to the feet.",
          image: "/Treatment/Steam Bath.JPG",
          benefits: [
            "Detoxifies the body through perspiration",
            "Relaxes the body and mind",
            "Aids in weight management",
            "Reduces pain, stiffness, and fatigue",
            "Beneficial for arthritis, back pain, and chronic conditions",
          ],
        },
        {
          title: "Avagaha Sweda (Herbal Bath)",
          description:
            "It is a process in which the individual is immersed in a decoction to produce fomentation to the body. Medicated oil is applied to the head and body. The prescribed decoction is filled into the tub, and a lukewarm temperature is maintained.",
          image: "/Treatment/Herbal Bath.JPG",
          benefits: [
            "Relaxes muscles and calms the nervous system",
            "Helpful for urinary tract disorders",
            "Relieves lower back pain and gynecological disorders",
            "Beneficial for infertility and hemorrhoids",
          ],
        },
        {
          title: "Kati Vasti",
          description:
            "It is one of the most effective Ayurvedic therapies for back pain. The term “kati” refers to the lower back area. In this therapy, warm medicated oil is retained in the lower back area after making a rim with black gram dough around the spine for a particular period of time.",
          image: "/Treatment/Kati Wasthi.JPG",
          benefits: [
            "Highly effective for chronic back pain",
            "Relieves inflammation, stiffness, and numbness",
            "Beneficial for sciatica and disc-related issues",
            "Beneficial for strengthening back muscles that maintain the normal curvature of the spine",
            "Strengthens joints, muscles and soft tissues"
          ],
        },
        {
          title: "Janu Vasti",
          description:
            "It is a treatment in which medicated oils are poured and pooled for a fixed duration in a compartment constructed around the knee joint using wet black gram flour.",
          image: "/Treatment/Janu.JPG",
          benefits: [
            "Relieves knee pain and swelling",
            "Improves joint movement and flexibility",
            "Beneficial for osteoarthritis and ligament injuries",
            "Helps to treat subluxation of the knee joint and rheumatism",
            "Enhances joint strength and weight-bearing capacity"
          ],
        },
        {
          title: "Mud Therapy",
          description:
            "An ancient therapy using medicated mud applications to improve skin health and natural beauty.",
          image: "/ayurvedic-mud-therapy-mask.jpg",
          benefits: [
            "Enhances complexion and skin glow",
            "Improves blood circulation and maintains metabolism",
            "Removes dead skin cells and regenerate healthy skin",
            "Reduces inflammation, swelling, and relieves pain",
            "Promotes skin regeneration",
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
          description:
            "A rejuvenating Ayurvedic face massage using medicated oils and marma point stimulation.",
          image: "/Treatment/Face Massage.JPG",
          benefits: [
            "Firms and smoothens the skin",
            "Reduces wrinkles and fine lines",
            "Improves circulation and skin nourishment",
            "Promotes natural glow and relaxation",
            "Regenerate skin cells and remove impurities",
          ],
        },
        {
          title: "Facial Treatment",
          description:
            "A deep-purifying facial with powerful Ayurvedic herbs and includes a herbal scrub, steam, and facial massage, followed by a mask.",
          image: "/Treatment/Facial Treatment.JPG",
          benefits: [
            "Cleanses clogged pores",
            "Balances excess oil and dryness",
            "Improves complexion and skin clarity",
            "Reduces sunburn, pigmentation, and dark patches",
          ],
        },
        {
          title: "Akshi Tharpana",
          description:
            "A specialized eye therapy where medicated ghee is retained over the eyes for nourishment and strengthening. Akshi means eyes, and Tharpana means giving strength to the eyes.",
          image: "/Treatment/Akshi Tharpana.JPG",
          benefits: [
            "Improves vision and eye strength",
            "Reduces eye strain and dryness",
            "Enhances mental clarity",
            "Preventive and curative for eye disorders",
          ],
        },
        {
          title: "Nasal Inhalation",
          description:
            "A soothing therapy using herbal steam or medicated vapors for nasal and sinus cleansing.",
          image: "/Treatment/Inherlation.JPG",
          benefits: [
            "Cleanse and rejuvenate the nasal passages, sinuses and respiratory system",
            "Relieves headache and breathing discomfort",
            "Improves respiratory health",
            "Promotes relaxation and freshness",
          ],
        }
      ],
    },
    {
      id: "foot-care",
      name: "Foot Care Treatments",
      treatments: [
        {
          title: "Pada Abhyanga (Foot Massage)",
          description: "A therapeutic foot massage using medicated oils to stimulate marma and reflex points.",
          image: "/Treatment/Foot Massage (2).JPG",
          benefits: [
            "Reduces foot pain and burning sensation",
            "Relieves muscular stiffness and fatigue",
            "Induces sound sleep",
            "Promotes overall body balance and relaxation",
          ],
        },
        {
          title: "Relaxing Foot Treatment",
          description:
            "A complete foot rejuvenation ritual including herbal foot bath, scrub, massage, marma stimulation, foot mask, and toning.",
          image: "/Treatment/Relaxing foot tre.JPG",
          benefits: [
            "Deeply relaxes tired feet",
            "Improves skin texture and brightness",
            "Enhances circulation",
            "Promotes calmness and well-being",
          ],
        },
      ],
    },
  ]

  return <TreatmentsContent fallbackTabs={mainTabs} />
}
