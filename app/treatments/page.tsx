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
      name: "Head and Hair Care Treatments a",
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
          image: "/ayurvedic-scalp-massage-therapy.jpg",
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
          image: "/Treatment/Shareera Abhyanga.JPG",
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
            "A process by which the person is made to perspire using a tube and medicated steam passed on whole body or affected part.",
          image: "/Treatment/Nadi Sweda.JPG",
          benefits: ["Relieves pain immediately without oral drugs", "Therapeutic heating treatment"],
        },
        {
          title: "Vashpa Sweda",
          description:
            "Apparatus used as sitting posture or lying posture is from shoulders to feet with herbal medicinal steam.",
          image: "/Treatment/Vashpa Sweda.JPG",
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
          description:
            "A process by which the individual will be immersion of the decoction to produce fomentation to the body and lukewarm temperature is maintained in the tub. Before the treatment, medicated oil is applied to the head and body.",
          image: "/Treatment/Avagaha Sweda.JPG",
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
          description:
            "An ancient practice that uses mud mask to bring out your natural beauty by enhancing complexion and glow of the skin.",
          image: "/ayurvedic-mud-therapy-mask.jpg",
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
          description:
            "The most effective Ayurveda therapy for back pain. Warm medicated oil is retained in lower back area after making a rim with black gram dough around spine.",
          image: "/Treatment/Kati Wasthi.JPG",
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
          description:
            "A treatment in which medicated oils are poured and pooled for a fixed duration in a compartment constructed around the knee joint using wet flour of black gram.",
          image: "/ayurvedic-knee-joint-treatment.jpg",
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
          title: "Nasal Inhalation",
          description:
            "Inhalation is a soothing Ayurvedic Therapy used cleanse and rejuvenate the nasal passages, sinuses and respiratory system. It is part of facial care treatments for cleansing and rejuvenation. It involves the use of herbal steam or medicated smoke for therapeutic purposes.",
          image: "/Treatment/Face Massage.JPG",
          benefits: [
            "Relieves nasal congestion",
            "Eases difficulty in breathing",
            "Loosens thick mucus and phlegm",
            "Helpful in sinusitis, cold, and cough",
            "Reduces facial pressure",
            "Gives soothing and calming effect",
            "Improves sense of freshness and clarity",
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
          description: "Foot massage with medicated oil and stimulates the Marma and reflex points in the feet. Foots are represent the whole body therefore treatment is benefits for all systems.",
          image: "/Treatment/Foot Massage (2).JPG",
          benefits: [
            "Reduces foot pain and burning sensation",
            "Reduce muscular pain and stiffness",
            "Induce sleep",
            "Body relaxation and balance",
          ],
        },
        {
          title: "Relaxing Foot Treatment",
          description:
            "This Foot Treatment is for relaxing and skin brightening experience. Commence with a relaxing herbal foot bath followed by herbal scrub, foot massage with stimulating Marma points and ends with foot mask and toning of foot.",
          image: "/Treatment/Relaxing foot tre.JPG",
          benefits: [
            "Deeply relaxes the body and mind",
            "Reduces stress, anxiety, and mental fatigue",
            "Promotes better sleep",
            "Activates vital energy points(marma)",
            "Improves circulation in feet and lower limbs",
            "Helps relieve tiredness and heaviness of legs",
            "Supports overall energy balance in the body",
          ],
        },
      ],
    },
  ]

  return <TreatmentsContent mainTabs={mainTabs} />
}
