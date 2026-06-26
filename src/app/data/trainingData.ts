// Shared training data — imported by Training.tsx (list) and TrainingDetail.tsx (detail).

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
    image: "https://picsum.photos/seed/refrigeration-diagnostics/320/180",
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
    image: "https://picsum.photos/seed/washer-control-board/320/180",
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
    image: "https://picsum.photos/seed/dishwasher-water-systems/320/180",
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
