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
          description:
            "A procedure consisting of continuous pouring of medicated oil onto the forehead, focusing on the powerful 'third eye' of the mind or 'Sthapani Marma' to effectively purify and relax your body, mind and soul.",
          image: "/Treatment/Shiro Dhara.JPG",
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
          image: "/ayurvedic-scalp-massage-therapy.jpg",
          benefits: [
            "Relieves eye strain and headaches",
            "Promotes total relaxation and deep restful sleep",
            "Releases tension",
            "Stimulates mental function",
            "Relieves eye strain",
            "Good for migraine and stiff necks/shoulders",
            "Prevents hair falling",
            "Cures dandruff and enhances hair growth",
          ],
        },
        {
          title: "Shiro Lepa",
          description: "Apply medicated paste on scalp.",
          image: "/herbal-scalp-treatment-paste.jpg",
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
          description: "Body massage with oil made specially for each dosha including face and foot massage.",
          image: "/Treatment/Shareera Abhyanga.JPG",
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
          title: "Shareera Abhyanga with Udvarthana (Powder Massage)",
          description:
            "An intensive toning and lightening treatment that helps to reduce sun burns and minimize discolourations. This is followed by herbal Ayurveda scrub and full body massage.",
          image: "/Treatment/Ayurvedic Body Scrub Treatment.JPG",
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
          image: "/Treatment/Parisheka.JPG",
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
          description:
            "The whole body or any part of the body is made to perspire by means of application of a kind of payasa or pudding, specially prepared with Navara variety of rice, milk and decoction of Bala roots.",
          image: "/ayurvedic-rice-milk-treatment.jpg",
          benefits: [
            "Rejuvenation",
            "Strengthens the tissues",
            "Prevents degeneration",
            "Treats emaciation and wasting of body",
          ],
        },
        {
          title: "Shashtika Shali Pinda Sweda",
          description:
            "Nourishing and rejuvenating body massage done with bundles of rice cooked in milk and herbal decoction.",
          image: "/Treatment/Shashtikashli.JPG",
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
          image: "/Treatment/PathraPindasweda.JPG",
          benefits: [
            "Beneficial for arthritis",
            "Relieves joint stiffness",
            "Treats neuritis",
            "Treats inflammatory diseases",
          ],
        },
        {
          title: "Nadi Sweda",
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
