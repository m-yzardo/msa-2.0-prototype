// Member benefits content — ported from msaworld.com's member-benefits pages.
// Drives the Benefits hub (Benefits.tsx) and the per-category pages
// (BenefitCategory.tsx). Two levels: country section → category page.
// Each category groups its benefits under subheadings; benefits may carry a
// partner logo and one or more links (external sites, mailto, PDFs).

export type BenefitKind = "training" | "health" | "business";
export type CountryCode = "us" | "canada";

export interface BenefitLink {
  label: string;
  href: string;
}

export interface Benefit {
  name: string;
  description: string;
  highlight?: string; // short price/discount pill, e.g. "$49 · $100 off"
  image?: string; // partner logo URL
  links?: BenefitLink[];
}

export interface BenefitGroup {
  title: string;
  benefits: Benefit[];
}

export interface BenefitCategory {
  slug: string;
  country: CountryCode;
  countryName: string;
  flag: string;
  kind: BenefitKind;
  title: string;
  intro?: string;
  groups: BenefitGroup[];
  contact?: BenefitLink[];
}

// Intro copy for the hub page (verbatim from the live member-benefits page).
export const benefitsIntro = [
  "There's more than one reason that home service businesses across North America turn to Marcone Servicers Association to improve their operations. Discover why so many others take advantage of membership in our rapidly growing trade organization.",
  "At Marcone Servicers Association, we care about your success. That's why we boost everything from the healthcare and training that you offer employees to the contracted services that let you focus on what you do best.",
];

const US_CONTACT: BenefitLink[] = [{ label: "MSA@marcone.com", href: "mailto:MSA@marcone.com" }];
const CANADA_CONTACT: BenefitLink[] = [{ label: "MSACanada@marcone.com", href: "mailto:MSACanada@marcone.com" }];

// Partner logos, bundled locally under src/imports/benefits/. Each path must be
// a static string literal so Vite fingerprints and bundles the asset.
const LOGO = {
  neli: new URL("../../imports/benefits/neli.jpg", import.meta.url).href,
  applianceVideo: new URL("../../imports/benefits/appliance-video.jpg", import.meta.url).href,
  dyer: new URL("../../imports/benefits/dyer.jpg", import.meta.url).href,
  gigcare: new URL("../../imports/benefits/gigcare.jpg", import.meta.url).href,
  cleverHealth: new URL("../../imports/benefits/clever-health.jpg", import.meta.url).href,
  aflac: new URL("../../imports/benefits/aflac.jpg", import.meta.url).href,
  paylocity: new URL("../../imports/benefits/paylocity.jpg", import.meta.url).href,
  humana: new URL("../../imports/benefits/humana.jpg", import.meta.url).href,
  principal: new URL("../../imports/benefits/principal.jpg", import.meta.url).href,
  kuhlmannAngle: new URL("../../imports/benefits/kuhlmann-angle.jpg", import.meta.url).href,
  kuhlmann: new URL("../../imports/benefits/kuhlmann.jpg", import.meta.url).href,
  customerConnect: new URL("../../imports/benefits/customer-connect.jpg", import.meta.url).href,
  mypartscenter: new URL("../../imports/benefits/mypartscenter.jpg", import.meta.url).href,
  contractorInCharge: new URL("../../imports/benefits/contractor-in-charge.jpg", import.meta.url).href,
  iwallet: new URL("../../imports/benefits/iwallet.jpg", import.meta.url).href,
  truesmb: new URL("../../imports/benefits/truesmb.jpg", import.meta.url).href,
  justPressOne: new URL("../../imports/benefits/justpressone.jpg", import.meta.url).href,
  searchKings: new URL("../../imports/benefits/searchkings.jpg", import.meta.url).href,
  serviceWorks: new URL("../../imports/benefits/serviceworks.jpg", import.meta.url).href,
  swReputation: new URL("../../imports/benefits/sw.jpg", import.meta.url).href,
  airsled: new URL("../../imports/benefits/airsled.jpg", import.meta.url).href,
  maLine: new URL("../../imports/benefits/ma-line.jpg", import.meta.url).href,
  marks: new URL("../../imports/benefits/marks.jpg", import.meta.url).href,
  mrLube: new URL("../../imports/benefits/mr-lube.jpg", import.meta.url).href,
  barrys: new URL("../../imports/benefits/barrys.jpg", import.meta.url).href,
};

const CUSTOMER_CONNECT_PDF = "https://msaworld.com/wp-content/uploads/2025/09/082625-msa-customer-connect-flyer_FINAL.pdf";

// Training benefits are near-identical for US and Canada (price differs).
function trainingGroups(handsOnPrice: string): BenefitGroup[] {
  return [
    {
      title: "Included with Membership",
      benefits: [
        {
          name: "Ask-a-Trainer Technical Support",
          description:
            "Need help finding a resource or an answer? MSA-certified trainers respond and assist via email within 24 hours.",
          links: [{ label: "Email a trainer", href: "mailto:ask-a-trainer@marcone.com" }],
        },
        {
          name: "Hands-On Technical Training",
          description:
            "MSA-certified trainers deliver year-round, in-person courses on real, current-production appliances.",
          highlight: handsOnPrice,
        },
        {
          name: "MSA World Profiles",
          description:
            "Login credentials giving up to 10 people access to MSAworld.com at no cost. MSA Pro members can add another 10 for $99/year.",
        },
        {
          name: "Live Training Webinars",
          description:
            "Unlimited webinars hosted up to six times a month, covering two or three topics with certified trainers George Schick and Rick Kuemin.",
          highlight: "Unlimited",
        },
        {
          name: "Technical Library",
          description:
            "An exclusive library of 9,500+ technical publications — pre-recorded training videos, product manuals, and tech sheets.",
          highlight: "9,500+ docs",
        },
      ],
    },
    {
      title: "Partner Programs & Discounts",
      benefits: [
        {
          name: "MSA Hotline Powered by Neli",
          description:
            "Real-time, on-demand diagnostic and technical support for field technicians via video chat, billed monthly to your Marcone account.",
          highlight: "$33 / call",
          image: LOGO.neli,
          links: [{ label: "Learn more", href: "https://nelihome.com/technician-live-support-by-neli/" }],
        },
        {
          name: "ApplianceVideo.com",
          description:
            "Use your Marcone account number as a discount code for access to 5,900+ repair videos for up to 20 technicians.",
          highlight: "$30 off ($399)",
          image: LOGO.applianceVideo,
          links: [{ label: "Visit ApplianceVideo.com", href: "https://www.appliancevideo.com" }],
        },
        {
          name: "Dyer Appliance Repair Academy",
          description:
            "In-person or virtual training options to get your technicians up to speed quickly, with a discount on all courses.",
          highlight: "10% off",
          image: LOGO.dyer,
          links: [
            { label: "Visit Dyer Academy", href: "https://dyerapplianceacademy.com" },
            { label: "Email to enroll", href: "mailto:MSAtraining@marcone.com" },
          ],
        },
      ],
    },
  ];
}

export const benefitCategories: Record<string, BenefitCategory> = {
  "us-training": {
    slug: "us-training",
    country: "us",
    countryName: "United States",
    flag: "🇺🇸",
    kind: "training",
    title: "U.S. Training Benefits",
    intro:
      "From year-round hands-on classes to an on-demand technical library, MSA training keeps your team sharp and your callbacks down.",
    groups: trainingGroups("$49 · $100 off"),
    contact: US_CONTACT,
  },

  "canada-training": {
    slug: "canada-training",
    country: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    kind: "training",
    title: "Canada Training Benefits",
    intro:
      "The same year-round training, technical support, and on-demand library MSA is known for — delivered across Canada.",
    groups: trainingGroups("$29 · $100 off"),
    contact: CANADA_CONTACT,
  },

  "us-health": {
    slug: "us-health",
    country: "us",
    countryName: "United States",
    flag: "🇺🇸",
    kind: "health",
    title: "U.S. Health Benefits",
    intro:
      "Healthcare and ancillary benefits built for independent contractors and small shops, with MSA member pricing across medical, dental, payroll, and retirement.",
    groups: [
      {
        title: "Health & Medical Plans",
        benefits: [
          {
            name: "GigCare",
            description:
              "A clean, practical healthcare option for independent contractors and small shops — transparent pricing, an à la carte structure, and nationwide access to major networks (Aetna, Cigna, Blue Cross Blue Shield). Year-round enrollment.",
            image: LOGO.gigcare,
            links: [{ label: "Get started", href: "https://go.kuhlmannfin.com/msa-text-page" }],
          },
          {
            name: "Angle Health",
            description:
              "Health benefit plans made for MSA members and their workers, with a nationwide doctor network, telemedicine, mental health services, and easy digital tools. Medicare enrollment help available.",
            image: LOGO.kuhlmannAngle,
            links: [
              { label: "Learn more", href: "https://www.anglehealth.com/partnerships/marcone" },
              { label: "Medicare enrollment", href: "https://www.planenroll.com/?purl=Robert-Broyles" },
            ],
          },
          {
            name: "Humana Dental & Vision",
            description: "World-class group dental and vision insurance with no waiting periods.",
            image: LOGO.humana,
            links: [{ label: "Enroll", href: "https://www.surveymonkey.com/r/MSAHumana" }],
          },
        ],
      },
      {
        title: "Telemedicine & Prescriptions",
        benefits: [
          {
            name: "Clever Health Telemedicine",
            description:
              "Virtual care for minor illnesses, plus Bella — an anonymous, 24/7 AI chat bot for anxiety and depression — and Clever Connections peer support.",
            image: LOGO.cleverHealth,
            links: [{ label: "Register", href: "https://www.surveymonkey.com/r/CleverHealthMember" }],
          },
          {
            name: "Clever Rx",
            description:
              "Prescription discounts on 55,000+ medications, nearly half of which cost less than $10.",
          },
        ],
      },
      {
        title: "Insurance & Ancillary",
        benefits: [
          {
            name: "Aflac Ancillary Insurance",
            description:
              "Customizable individual plans powered by group rates, with simplified underwriting and coverage that stays with you regardless of employment.",
            image: LOGO.aflac,
            links: [{ label: "Build a plan", href: "https://buy.aflac.com/?partnerId=AA28266&caseId=MSA" }],
          },
        ],
      },
      {
        title: "Payroll & Retirement",
        benefits: [
          {
            name: "Paylocity Payroll Solutions",
            description:
              "A mobile-first HRIS with an open API, scalable architecture, and award-winning service at preferred MSA pricing.",
            highlight: "Up to 40% off",
            image: LOGO.paylocity,
            links: [{ label: "Get pricing", href: "https://www.surveymonkey.com/r/MSAPaylocity" }],
          },
          {
            name: "Principal 401(k) Plans",
            description:
              "An SMB 401(k) through a PEP program with professional administration, reduced fiduciary risk, and consolidated-audit savings. Best for members with 10+ employees.",
            image: LOGO.principal,
            links: [{ label: "Learn more", href: "https://landing.principal.com/MSA/" }],
          },
        ],
      },
      {
        title: "Benefits Advisory",
        benefits: [
          {
            name: "Kuhlmann Group Benefits Advisory",
            description:
              "Complimentary consultation for MSA Pro members with five or more employees, covering medical, long-term care, and disability benefits.",
            image: LOGO.kuhlmann,
            links: [{ label: "Request a consult", href: "https://www.surveymonkey.com/r/MSAHealthcareAdvisory" }],
          },
        ],
      },
    ],
    contact: US_CONTACT,
  },

  "us-business": {
    slug: "us-business",
    country: "us",
    countryName: "United States",
    flag: "🇺🇸",
    kind: "business",
    title: "U.S. Business Benefits",
    intro:
      "Marketing, payments, staffing, and back-office partners — discounted for MSA members so you can grow the business, not just the workload.",
    groups: [
      {
        title: "Marketing & Growth",
        benefits: [
          {
            name: "MSA Customer Connect",
            description:
              "Customer retention and repeat business through automated, customized email marketing for service providers.",
            image: LOGO.customerConnect,
            links: [{ label: "View flyer (PDF)", href: CUSTOMER_CONNECT_PDF }],
          },
          {
            name: "TrueSMB Services",
            description:
              "An all-in-one marketing platform — SEO, AI search visibility, Google Ads, social/email marketing, and website design — plus a free SEO audit.",
            highlight: "$698/mo ($898)",
            image: LOGO.truesmb,
            links: [{ label: "Free SEO audit", href: "https://truesmb.com/free-seo-audit-report/" }],
          },
          {
            name: "SearchKings",
            description:
              "A Google Premier Partner providing data-driven marketing guidance. Pro members receive three complimentary months.",
            highlight: "3 months free",
            image: LOGO.searchKings,
            links: [{ label: "Visit SearchKings", href: "https://searchkings.com/" }],
          },
          {
            name: "SW Reputation by ServicersWeb",
            description: "Online review management with bulk operations and multi-location support to grow SEO.",
            image: LOGO.swReputation,
            links: [{ label: "Visit ServicersWeb", href: "https://www.servicersweb.com/" }],
          },
          {
            name: "SW Messenger by ServicersWeb",
            description: "Multi-channel messaging — text, live chat, and Facebook — from a single unified inbox.",
          },
        ],
      },
      {
        title: "Payments & Operations",
        benefits: [
          {
            name: "iWallet",
            description:
              "A field point-of-sale payment app with preferred rates for MSA Pro members, remote check deposits, free reputation-management tools, and technician tipping.",
            image: LOGO.iwallet,
            links: [
              { label: "Visit iWallet", href: "https://iwallet.com" },
              { label: "Request a demo", href: "https://www.surveymonkey.com/r/iWalletDemo" },
            ],
          },
          {
            name: "Contractor In Charge",
            description:
              "Turnkey bookkeeping and financial operations support built for service contractors, with CFO-level insights.",
            image: LOGO.contractorInCharge,
            links: [{ label: "View benefits (PDF)", href: "https://msaworld.com/wp-content/uploads/2025/12/msaworld-contractor-in-charge-benefits.pdf" }],
          },
          {
            name: "ServiceWorks",
            description:
              "Dispatch, inventory, POS, accounting, and real-time tracking. MSA Pro members get 20% off the first year, 10% thereafter (annual prepayment required).",
            highlight: "20% off yr 1",
            image: LOGO.serviceWorks,
            links: [{ label: "Learn more", href: "https://blog.service.works/" }],
          },
        ],
      },
      {
        title: "Staffing & Referrals",
        benefits: [
          {
            name: "JustPressOne",
            description:
              "Trained appliance office staff for calls, routing, dispatching, and claims. ServiceWorks customers get 20% off; other Pro members 10%.",
            highlight: "Up to 20% off",
            image: LOGO.justPressOne,
            links: [{ label: "Visit JustPressOne", href: "https://justpressone.com/" }],
          },
          {
            name: "My Parts Center",
            description:
              "Refer DIY customers to Marcone for parts and earn quarterly rebates of 15% of their spending. The $49 startup fee is refunded after $1,000 in first-year parts sales.",
            highlight: "15% rebate",
            image: LOGO.mypartscenter,
            links: [{ label: "Application (PDF)", href: "https://msaworld.com/wp-content/uploads/2025/07/MSA-mypartscenter-application.pdf" }],
          },
        ],
      },
      {
        title: "Tools & Equipment",
        benefits: [
          {
            name: "Airsled",
            description:
              "Air-beam load-management systems for moving appliances. Members save on select systems, accessories, parts, and refurbishment.",
            highlight: "10% off",
            image: LOGO.airsled,
            links: [{ label: "Visit Airsled", href: "https://airsled.com/" }],
          },
          {
            name: "MA-Line",
            description:
              "A suite of 9,000+ HVAC/R specialty tools and parts at discounted pricing via your MyMarcone.com login.",
            highlight: "9,000+ products",
            image: LOGO.maLine,
            links: [{ label: "Visit MA-Line", href: "https://www.ma-line.com/" }],
          },
        ],
      },
    ],
    contact: US_CONTACT,
  },

  "canada-business": {
    slug: "canada-business",
    country: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    kind: "business",
    title: "Canada Business Benefits",
    intro: "Marketing, tools, training, and everyday partner discounts for Canadian MSA members.",
    groups: [
      {
        title: "Marketing & Growth",
        benefits: [
          {
            name: "MSA Customer Connect",
            description:
              "Customer retention and repeat business through automated, customized email marketing.",
            image: LOGO.customerConnect,
            links: [{ label: "View flyer (PDF)", href: CUSTOMER_CONNECT_PDF }],
          },
          {
            name: "SearchKings",
            description:
              "Digital marketing and lead generation through a Google Premier Partner. Pro members receive three complimentary months.",
            highlight: "3 months free",
            image: LOGO.searchKings,
            links: [{ label: "Visit SearchKings", href: "https://searchkings.com" }],
          },
          {
            name: "SW Reputation by ServicersWeb",
            description: "Grow your online presence and SEO with easy bulk operations and multi-location support.",
            image: LOGO.swReputation,
            links: [{ label: "Visit ServicersWeb", href: "https://www.servicersweb.com" }],
          },
          {
            name: "SW Messenger by ServicersWeb",
            description: "Multi-channel messaging supporting text, live chat, and Facebook Messenger.",
          },
        ],
      },
      {
        title: "Operations & Staffing",
        benefits: [
          {
            name: "ServiceWorks",
            description:
              "Dispatch, inventory, POS, and accounting software. Pro members get 50% off the first year, 20% thereafter.",
            highlight: "50% off yr 1",
            image: LOGO.serviceWorks,
            links: [{ label: "Learn more", href: "https://blog.service.works" }],
          },
          {
            name: "JustPressOne",
            description:
              "Staffed office support. ServiceWorks customers who are Pro members get 20% off; other Pro members 10%.",
            highlight: "Up to 20% off",
            image: LOGO.justPressOne,
            links: [{ label: "Visit JustPressOne", href: "https://justpressone.com" }],
          },
        ],
      },
      {
        title: "Tools & Equipment",
        benefits: [
          {
            name: "Airsled",
            description:
              "Air-beam equipment for moving appliances. Members save on select systems, accessories, parts, and refurbishment.",
            highlight: "10% off",
            image: LOGO.airsled,
            links: [{ label: "Visit Airsled", href: "https://airsled.com/" }],
          },
          {
            name: "MA-Line",
            description:
              "Over 9,000 HVAC/R specialty tools and parts at discounted rates via your MyMarcone login.",
            highlight: "9,000+ products",
            image: LOGO.maLine,
            links: [{ label: "Visit MA-Line", href: "https://www.ma-line.com" }],
          },
          {
            name: "Barry's Restore-It-All Products",
            description:
              "The premier manufacturer of surface-restoration products, known for fixing appliance finishes. Pro member discount.",
            highlight: "15% off",
            image: LOGO.barrys,
            links: [{ label: "Visit Barry's", href: "https://www.barrysrestoreitall.com" }],
          },
        ],
      },
      {
        title: "Everyday Discounts",
        benefits: [
          {
            name: "Mark's Wearhouse",
            description: "Discount on select merchandise with your MSA card.",
            highlight: "10% off",
            image: LOGO.marks,
            links: [{ label: "Visit Mark's", href: "https://www.marks.com/en.html" }],
          },
          {
            name: "Mr. Lube",
            description: "Discount on tire and oil services at all locations.",
            highlight: "10% off",
            image: LOGO.mrLube,
            links: [{ label: "Visit Mr. Lube", href: "https://www.mrlube.com" }],
          },
        ],
      },
      {
        title: "Training & Resources",
        benefits: [
          {
            name: "iART Training Academy",
            description:
              "Training and certification in metal, glass, and stone restoration, with a Pro member enrollment discount.",
            highlight: "10% off",
          },
          {
            name: "Flat Rate Labor Guide",
            description:
              "A pricing resource to help you accurately quote service jobs — free with your MSA membership.",
            highlight: "Free ($49.99)",
          },
        ],
      },
    ],
    contact: CANADA_CONTACT,
  },
};

// Hub-page structure: country sections, each with its category tiles (in order).
export const benefitCountries: {
  code: CountryCode;
  flag: string;
  name: string;
  categories: { slug: string; kind: BenefitKind; label: string; blurb: string }[];
}[] = [
  {
    code: "us",
    flag: "🇺🇸",
    name: "U.S. Benefits",
    categories: [
      { slug: "us-training", kind: "training", label: "Training", blurb: "Hands-on classes, webinars, hotline, and a 9,500+ document library." },
      { slug: "us-health", kind: "health", label: "Health", blurb: "Medical, dental, telemedicine, payroll, and 401(k) at member pricing." },
      { slug: "us-business", kind: "business", label: "Business", blurb: "Marketing, payments, staffing, and back-office partner discounts." },
    ],
  },
  {
    code: "canada",
    flag: "🇨🇦",
    name: "Canada Benefits",
    categories: [
      { slug: "canada-training", kind: "training", label: "Training", blurb: "Year-round training, technical support, and on-demand resources." },
      { slug: "canada-business", kind: "business", label: "Business", blurb: "Marketing tools, discounted supplies, and everyday partner savings." },
    ],
  },
];
