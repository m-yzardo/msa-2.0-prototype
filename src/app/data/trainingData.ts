// Shared training data — imported by Training.tsx (list), TrainingDetail.tsx (detail),
// and WebinarPlayer.tsx (recorded webinars).

// Registration pricing. The members area is member-only, so there's no
// non-member price — in-person hands-on classes carry a flat member fee, while
// live webinars and virtual sessions are included in membership.
export const HANDS_ON_PRICE = 49;
export const HANDS_ON_PERK = "Includes one free technician per class for MSA Pro members.";

export function getRegistrationCost(kind: "hands-on" | "webinar" | "virtual"): {
  price: number;
  perk?: string;
} {
  return kind === "hands-on"
    ? { price: HANDS_ON_PRICE, perk: HANDS_ON_PERK }
    : { price: 0 };
}

const mitchImage = new URL('../../imports/mitch.jpg', import.meta.url).href;
const rickImage = new URL('../../imports/rick.jpg', import.meta.url).href;
const georgeImage = new URL('../../imports/george.jpg', import.meta.url).href;

// Trainer profiles for the "Your Trainer" tile, keyed by full name to match the
// trainer/presenter on each session or webinar.
export const trainerProfiles: Record<string, { image: string; title: string; bio: string }> = {
  "George Schick": {
    image: georgeImage,
    title: "Content & Resources Manager",
    bio: "George has managed MSA's technical library since 2013, building relationships with every major OEM to curate over 10,000 service manuals and training videos. He fields hundreds of member questions each month and knows the most common field failures inside out.",
  },
  "Rick Kuemin": {
    image: rickImage,
    title: "Master Technician, West & Mountain Region",
    bio: "Rick brings over 30 years of hands-on experience in refrigeration, HVAC, and high-voltage appliance repair. He's widely considered one of the top trainers in the appliance service industry and is returning to MSA after a successful run as a lead instructor.",
  },
  "Mitch Williams": {
    image: mitchImage,
    title: "Field Trainer, Central & Eastern US",
    bio: "Mitch spends most of the year on the road, training 30 technicians a day across dozens of cities. His hands-on workshops are known for being practical, fast-paced, and directly applicable to real field calls.",
  },
};

export interface UpcomingWebinar {
  id: number;
  title: string;
  presenter: string;
  date: string;
  timeEast: string;
  timeWest: string;
  category: string;
  description?: string;
  image?: string;
  registered: boolean;
}

export interface TrainingSession {
  id: number;
  title: string;
  trainer: string;
  format: "hands-on" | "virtual";
  location: string;
  date: string;
  duration: string;
  spots: number;
  totalSpots: number;
  description?: string;
  image?: string;
  registered: boolean;
}

export interface OnDemandWebinar {
  id: number;
  title: string;
  presenter: string;
  date: string;
  duration: string;
  category: string;
  description?: string;
  image?: string;
  views: number;
}

export const upcomingWebinars: UpcomingWebinar[] = [
  {
    id: 1,
    title: "Advanced Refrigeration Diagnostics",
    presenter: "Rick Kuemin",
    date: "2026-05-22",
    timeEast: "2:00 PM EST",
    timeWest: "11:00 AM PST",
    category: "Refrigeration",
    description: "Isolate sealed-system faults using pressure and temperature readings, and learn compressor testing techniques for modern refrigeration units.",
    image: "https://picsum.photos/seed/refrigeration-diagnostics/800/450",
    registered: false,
  },
  {
    id: 2,
    title: "Washing Machine Control Board Troubleshooting",
    presenter: "George Schick",
    date: "2026-05-28",
    timeEast: "3:00 PM EST",
    timeWest: "12:00 PM PST",
    category: "Laundry",
    description: "Decode washer fault codes and use voltage testing to pinpoint control board failures across major front- and top-load platforms.",
    image: "https://picsum.photos/seed/washer-control-board/800/450",
    registered: true,
  },
  {
    id: 3,
    title: "Dishwasher Water Management Systems",
    presenter: "Mitch Williams",
    date: "2026-06-05",
    timeEast: "1:00 PM EST",
    timeWest: "10:00 AM PST",
    category: "Dishwasher",
    description: "Trace fill, drain, and recirculation paths to diagnose leaks, clogs, and sensor faults in today's dishwasher water systems.",
    image: "https://picsum.photos/seed/dishwasher-water-systems/800/450",
    registered: false,
  },
];

export const trainingSessions: TrainingSession[] = [
  {
    id: 1,
    title: "Hands-On Refrigeration Masterclass",
    trainer: "Rick Kuemin",
    format: "hands-on",
    location: "Dallas, TX",
    date: "2026-06-15",
    duration: "2 days",
    spots: 8,
    totalSpots: 12,
    description: "Two days of bench and live-unit work covering sealed systems, brazing, and refrigerant handling for working refrigeration techs.",
    image: "https://picsum.photos/seed/refrigeration-masterclass/320/180",
    registered: false,
  },
  {
    id: 2,
    title: "Virtual: Washing Machine Advanced Diagnostics",
    trainer: "George Schick",
    format: "virtual",
    location: "Online",
    date: "2026-06-20",
    duration: "3 hours",
    spots: 24,
    totalSpots: 50,
    description: "A live virtual deep dive into washer fault codes, motor controls, and diagnostic workflows you can apply on your next service call.",
    image: "https://picsum.photos/seed/washer-advanced-diagnostics/320/180",
    registered: true,
  },
  {
    id: 3,
    title: "Hands-On Dishwasher Repair Workshop",
    trainer: "Mitch Williams",
    format: "hands-on",
    location: "Phoenix, AZ",
    date: "2026-07-10",
    duration: "1 day",
    spots: 5,
    totalSpots: 15,
    description: "Get hands-on with common dishwasher failures—pumps, valves, and control boards—in a guided, full-day repair workshop.",
    image: "https://picsum.photos/seed/dishwasher-repair-workshop/320/180",
    registered: false,
  },
  {
    id: 4,
    title: "Virtual: Electric Range Control Systems",
    trainer: "Rick Kuemin",
    format: "virtual",
    location: "Online",
    date: "2026-07-18",
    duration: "2 hours",
    spots: 35,
    totalSpots: 50,
    description: "A focused virtual session on electric range control boards, element circuits, and safe high-voltage troubleshooting.",
    image: "https://picsum.photos/seed/electric-range-controls/320/180",
    registered: false,
  },
];

export const onDemandWebinars: OnDemandWebinar[] = [
  {
    id: 101,
    title: "LG Inverter Compressor Repair Techniques",
    presenter: "Rick Kuemin",
    date: "2026-04-15",
    duration: "45 min",
    category: "Refrigeration",
    description: "LG's linear inverter compressors fail in ways traditional compressors don't, and this recorded session shows you exactly what to look for. We walk through diagnosing a dead or weak inverter compressor, recovering and recharging the sealed system, and confirming the repair with proper readings. You'll see the special tools and connectors LG uses and how to avoid the common mistakes that lead to comebacks. Ideal for techs who want to take on more refrigeration work with confidence.",
    image: "https://picsum.photos/seed/lg-inverter-compressor/800/450",
    views: 342,
  },
  {
    id: 102,
    title: "Whirlpool Front Load Washer Seal Replacement",
    presenter: "George Schick",
    date: "2026-04-08",
    duration: "38 min",
    category: "Laundry",
    description: "The door boot seal is one of the most common — and most botched — front-load washer repairs. In this full teardown, George walks through removing the old boot, cleaning the tub flange, and seating the new seal and spring clamps correctly so it never leaks. He covers the model variations you'll encounter in the field and the shortcuts that actually save time. A must-watch for any tech tired of callbacks on washer leaks.",
    image: "https://picsum.photos/seed/whirlpool-washer-seal/800/450",
    views: 289,
  },
  {
    id: 103,
    title: "Understanding Modern Range Control Systems",
    presenter: "Mitch Williams",
    date: "2026-03-30",
    duration: "52 min",
    category: "Cooking",
    description: "Modern electric and gas ranges are run by electronic control boards, relay boards, and a web of temperature sensors. This session breaks down how those parts work together, how to read the circuits, and how to isolate a failed board from a failed element or sensor. Mitch shares the diagnostic sequence he uses to avoid replacing good boards. Perfect for technicians expanding into cooking-appliance repair.",
    image: "https://picsum.photos/seed/modern-range-controls/800/450",
    views: 421,
  },
];
