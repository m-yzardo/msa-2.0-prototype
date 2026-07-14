// Member benefits content — ported from msaworld.com's member-benefits pages.
// Drives both the Benefits hub (Benefits.tsx) and the per-category detail
// pages (BenefitCategory.tsx). Two levels: country section → category page.

export type BenefitKind = "training" | "health" | "business";
export type CountryCode = "us" | "canada";

export interface Benefit {
  name: string;
  description: string;
  highlight?: string; // short price/discount pill, e.g. "$49 · $100 off"
}

export interface BenefitCategory {
  slug: string;
  country: CountryCode;
  countryName: string;
  flag: string;
  kind: BenefitKind;
  title: string;
  intro?: string;
  benefits: Benefit[];
}

// Intro copy for the hub page (verbatim from the live member-benefits page).
export const benefitsIntro = [
  "There's more than one reason that home service businesses across North America turn to Marcone Servicers Association to improve their operations. Discover why so many others take advantage of membership in our rapidly growing trade organization.",
  "At Marcone Servicers Association, we care about your success. That's why we boost everything from the healthcare and training that you offer employees to the contracted services that let you focus on what you do best.",
];

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
    benefits: [
      {
        name: "Ask-a-Trainer Technical Support",
        description:
          "Need help finding a resource or an answer? MSA-certified trainers respond and assist via email within 24 hours.",
      },
      {
        name: "Hands-On Technical Training",
        description:
          "MSA-certified trainers deliver year-round, in-person courses nationwide on real, current-production appliances.",
        highlight: "$49 · $100 off",
      },
      {
        name: "MSA World Profiles",
        description:
          "Login credentials giving up to 10 people access to MSAworld.com at no cost. MSA Pro members can add another 10 for $99/year.",
      },
      {
        name: "Live Training Webinars",
        description:
          "Unlimited access to webinars hosted up to six times a month, covering two or three topics with certified trainers George Schick and Rick Kuemin.",
        highlight: "Unlimited",
      },
      {
        name: "MSA Hotline Powered by Neli",
        description:
          "Real-time diagnostic and technical support via video chat, billed monthly to your Marcone account. Neli also offers a subscription for repair companies.",
        highlight: "$33 / call",
      },
      {
        name: "Technical Library",
        description:
          "Access to 9,500+ technical publications, including pre-recorded training videos, product manuals, and tech sheets.",
        highlight: "9,500+ docs",
      },
      {
        name: "ApplianceVideo.com",
        description:
          "Use your Marcone account number as a discount code for access to 5,900+ repair videos for up to 20 technicians.",
        highlight: "$30 off ($399)",
      },
      {
        name: "Dyer Appliance Repair Academy",
        description: "In-person and virtual training options with a discount on all courses.",
        highlight: "10% off",
      },
    ],
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
    benefits: [
      {
        name: "GigCare by Kuhlmann Group",
        description:
          "A clean, practical healthcare option for independent contractors and small shops — no hidden fees, flexible à la carte structure, and nationwide access to major networks (Aetna, Cigna, Blue Cross Blue Shield). Year-round enrollment for techs and office staff.",
      },
      {
        name: "Clever Health Telemedicine",
        description:
          "Virtual care for minor illnesses, plus Bella — an anonymous, 24/7 AI chat bot for anxiety and depression — and Clever Connections peer support.",
      },
      {
        name: "Clever Rx",
        description:
          "Prescription discounts on 55,000+ medications, nearly half of which cost less than $10.",
      },
      {
        name: "Aflac Ancillary Insurance",
        description:
          "Customizable individual plans with group discounts, simplified underwriting, and coverage that stays with you regardless of employment.",
      },
      {
        name: "Paylocity Payroll Solutions",
        description:
          "A mobile-first HRIS with open API, scalable architecture, and award-winning service at preferred MSA pricing.",
        highlight: "Up to 40% off",
      },
      {
        name: "Humana Dental & Vision",
        description: "World-class group dental and vision insurance with no waiting periods.",
      },
      {
        name: "Principal 401(k) Plans",
        description:
          "An SMB 401(k) through a PEP program with professional administration, reduced fiduciary risk, and consolidated-audit savings. Best for members with 10+ employees.",
      },
      {
        name: "Angle Health Plans",
        description:
          "Health benefit plans made for MSA members and their workers, with a nationwide doctor network, telemedicine, mental health services, and employee-friendly digital tools.",
      },
      {
        name: "Kuhlmann Group Benefits Advisory",
        description:
          "Complimentary consultation for MSA Pro members with five or more employees, covering medical, long-term care, and disability benefits.",
      },
    ],
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
    benefits: [
      {
        name: "MSA Customer Connect",
        description:
          "Customer retention and repeat business through automated, customized email marketing for service providers.",
      },
      {
        name: "My Parts Center",
        description:
          "Refer DIY customers to Marcone for parts and earn quarterly rebates of 15% of their spending. MSA Pro members get an exclusive toll-free number and 500 custom stickers; the $49 startup fee is refunded after $1,000 in first-year parts sales.",
        highlight: "15% rebate",
      },
      {
        name: "Contractor In Charge",
        description:
          "Turnkey bookkeeping and financial operations support built for service contractors, with CFO-level financial insights.",
      },
      {
        name: "iWallet",
        description:
          "A field point-of-sale payment app with preferred card-processing rates, remote check deposits, free reputation-management tools, and technician tipping.",
      },
      {
        name: "TrueSMB Services",
        description:
          "An all-in-one marketing platform — SEO, AI search visibility, Google Ads, social/email marketing, and website design — plus a free SEO audit.",
        highlight: "$698/mo ($898)",
      },
      {
        name: "JustPressOne",
        description:
          "Trained appliance office staff for calls, routing, dispatching, and claims. ServiceWorks customers get 20% off; other MSA Pro members get 10%.",
        highlight: "Up to 20% off",
      },
      {
        name: "SearchKings",
        description:
          "A Google Premier Partner providing data-driven marketing guidance. Pro members receive three complimentary months.",
        highlight: "3 months free",
      },
      {
        name: "ServiceWorks",
        description:
          "Dispatch, inventory, POS, accounting, and tracking. MSA Pro members get 20% off the first year, 10% thereafter (annual prepayment required).",
        highlight: "20% off yr 1",
      },
      {
        name: "SW Reputation by ServicersWeb",
        description: "Online presence and SEO management to grow reviews across multiple locations.",
      },
      {
        name: "SW Messenger by ServicersWeb",
        description:
          "Multi-channel messaging — text, live chat, and Facebook — through a single unified inbox.",
      },
      {
        name: "Airsled",
        description:
          "Load-management systems for moving appliances. Members save on select systems, accessories, parts, and refurbishment.",
        highlight: "10% off",
      },
      {
        name: "MA-Line",
        description:
          "A suite of 9,000+ HVAC/R specialty tools and parts at discounted pricing via your MyMarcone.com login.",
        highlight: "9,000+ products",
      },
    ],
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
    benefits: [
      {
        name: "Ask-a-Trainer Technical Support",
        description:
          "Need help finding a resource or an answer? MSA-certified trainers respond and assist via email within 24 hours.",
      },
      {
        name: "Hands-On Technical Training",
        description:
          "Year-round, in-person courses across Canada delivered by MSA-certified trainers.",
        highlight: "$29 · $100 off",
      },
      {
        name: "MSA World Profiles",
        description:
          "Login credentials giving up to 10 people access to MSAworld.com at no cost. MSA Pro members can add another 10 for $99/year.",
      },
      {
        name: "Live Training Webinars",
        description:
          "Unlimited access to webinars hosted up to six times a month, covering two or three topics with certified trainers George Schick and Rick Kuemin.",
        highlight: "Unlimited",
      },
      {
        name: "MSA Hotline Powered by Neli",
        description:
          "Real-time diagnostic and technical support for field technicians via video chat, billed monthly to your Marcone account.",
        highlight: "$33 / call",
      },
      {
        name: "Technical Library",
        description:
          "An exclusive library of 9,500+ technical publications, including pre-recorded training videos, product manuals, and tech sheets.",
        highlight: "9,500+ docs",
      },
      {
        name: "ApplianceVideo.com",
        description:
          "Use your Marcone account number for a discount on access to 5,900+ repair videos for up to 20 technicians.",
        highlight: "$30 off ($399)",
      },
      {
        name: "Dyer Appliance Repair Academy",
        description: "In-person or virtual training options with a discount on all courses.",
        highlight: "10% off",
      },
    ],
  },

  "canada-business": {
    slug: "canada-business",
    country: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    kind: "business",
    title: "Canada Business Benefits",
    intro:
      "Marketing, tools, training, and everyday partner discounts for Canadian MSA members.",
    benefits: [
      {
        name: "MSA Customer Connect",
        description:
          "A program focused on customer retention and repeat business through automated, customized email marketing.",
      },
      {
        name: "Flat Rate Labor Guide",
        description: "A complimentary pricing resource for MSA members (non-members pay $49.99).",
        highlight: "Free ($49.99)",
      },
      {
        name: "Airsled",
        description:
          "Air-beam equipment for moving appliances. Members save on select systems, accessories, parts, and refurbishment.",
        highlight: "10% off",
      },
      {
        name: "MA-Line",
        description:
          "Over 9,000 HVAC/R specialty tools and parts at discounted rates via your MyMarcone login.",
        highlight: "9,000+ products",
      },
      {
        name: "Mark's Wearhouse",
        description: "Discount on select merchandise with your MSA card.",
        highlight: "10% off",
      },
      {
        name: "Mr. Lube",
        description: "Discount on tire and oil services at all locations.",
        highlight: "10% off",
      },
      {
        name: "SW Reputation by ServicersWeb",
        description: "Online review management and SEO enhancement.",
      },
      {
        name: "SW Messenger by ServicersWeb",
        description: "Multi-channel messaging supporting text, live chat, and Facebook Messenger.",
      },
      {
        name: "JustPressOne",
        description:
          "Staffed office support. ServiceWorks customers who are MSA Pro members get 20% off; other Pro members get 10%.",
        highlight: "Up to 20% off",
      },
      {
        name: "SearchKings",
        description:
          "Digital marketing and lead generation through a Google Premier Partner. Pro members receive three complimentary months.",
        highlight: "3 months free",
      },
      {
        name: "ServiceWorks",
        description:
          "Dispatch, inventory, POS, and accounting software. Pro members get 50% off the first year, 20% thereafter.",
        highlight: "50% off yr 1",
      },
      {
        name: "iART Training Academy",
        description:
          "Metal, glass, and stone restoration certification, with an enrollment discount for Pro members.",
        highlight: "10% off",
      },
      {
        name: "Barry's Restore-It-All Products",
        description: "A surface-restoration manufacturer offering a Pro member discount.",
        highlight: "15% off",
      },
    ],
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
