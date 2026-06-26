import { useState } from "react";
import { Link } from "react-router";
import {
  Mic2, Users, Handshake, ShoppingBag,
  MapPin, Calendar, ChevronDown, ChevronUp,
  Plane, Hotel, Star, Award, Clock, Play,
  Mail, ArrowRight, Check
} from "lucide-react";
const georgeImg = new URL('../../../imports/George_Schick__Director_of_Virtual_Training.jpg', import.meta.url).href;
const rickImg = new URL('../../../imports/Rick_Kuemin__Director_of_Training.jpg', import.meta.url).href;
const mitchImg = new URL('../../../imports/Mitch_Williams.jpg', import.meta.url).href;

const NAVY = "#0D1B3E";
const NAVY_MID = "#1A2D5A";
const GOLD = "#C9963D";
const GOLD_LIGHT = "#E8B84B";
const RED = "#D7272D";

const heroImage = "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const conferenceImage = "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// ─── AGENDA DATA ────────────────────────────────────────────────────────────
const agendaDays = [
  {
    date: "Oct 26",
    label: "Sunday",
    sessions: [
      { time: "2:00 PM – 6:00 PM", title: "Registration & Badge Pick-Up", type: "Logistics", note: "Caesars Palace Grand Lobby" },
      { time: "6:00 PM – 8:00 PM", title: "Welcome Reception", type: "Networking", note: "Opening cocktail hour for all attendees" },
      { time: "8:00 PM – Late", title: "Informal Networking", type: "Networking", note: "Explore the venues with fellow attendees" },
    ]
  },
  {
    date: "Oct 27",
    label: "Monday",
    sessions: [
      { time: "8:00 AM – 9:00 AM", title: "Breakfast & Registration", type: "Logistics", note: "Full buffet breakfast included" },
      { time: "9:00 AM – 10:30 AM", title: "Opening Keynote", type: "Keynote", note: "Main stage – full schedule coming soon" },
      { time: "10:45 AM – 12:00 PM", title: "Breakout Sessions — Block A", type: "Sessions", note: "Full schedule coming soon" },
      { time: "12:00 PM – 1:30 PM", title: "Networking Lunch", type: "Networking", note: "Sponsored lunch in the main hall" },
      { time: "1:30 PM – 3:00 PM", title: "Breakout Sessions — Block B", type: "Sessions", note: "Full schedule coming soon" },
      { time: "3:15 PM – 5:00 PM", title: "Vendor Fair — Opening", type: "Expo", note: "Meet our exhibitors and partners" },
      { time: "7:00 PM – 10:00 PM", title: "Awards Dinner", type: "Evening", note: "Annual MSA Awards Gala" },
    ]
  },
  {
    date: "Oct 28",
    label: "Tuesday",
    sessions: [
      { time: "8:00 AM – 9:00 AM", title: "Breakfast", type: "Logistics", note: "Full buffet breakfast included" },
      { time: "9:00 AM – 10:30 AM", title: "Industry Keynote", type: "Keynote", note: "Main stage – full schedule coming soon" },
      { time: "10:45 AM – 12:00 PM", title: "Breakout Sessions — Block C", type: "Sessions", note: "Full schedule coming soon" },
      { time: "12:00 PM – 1:30 PM", title: "Lunch & Vendor Fair", type: "Expo", note: "Grab lunch and visit the expo floor" },
      { time: "1:30 PM – 3:30 PM", title: "Training Workshops", type: "Sessions", note: "Hands-on technical sessions" },
      { time: "4:00 PM – 6:00 PM", title: "Vendor Fair — Continued", type: "Expo", note: "Final hours with exhibitors" },
      { time: "7:00 PM – Late", title: "MSA Night Out", type: "Evening", note: "Hosted event — location TBA" },
    ]
  },
  {
    date: "Oct 29",
    label: "Wednesday",
    sessions: [
      { time: "8:00 AM – 9:00 AM", title: "Breakfast", type: "Logistics", note: "Full buffet breakfast included" },
      { time: "9:00 AM – 10:30 AM", title: "Closing Keynote", type: "Keynote", note: "Main stage – full schedule coming soon" },
      { time: "10:45 AM – 12:00 PM", title: "Breakout Sessions — Block D", type: "Sessions", note: "Full schedule coming soon" },
      { time: "12:00 PM – 1:00 PM", title: "Closing Lunch", type: "Logistics", note: "Farewell lunch for all attendees" },
      { time: "1:00 PM – 2:00 PM", title: "Closing Remarks & Wrap-Up", type: "Keynote", note: "See you next year!" },
    ]
  }
];

// ─── SESSION TYPE COLORS ─────────────────────────────────────────────────────
const sessionTypeStyle: Record<string, string> = {
  Keynote:    "bg-red-100 text-red-700",
  Sessions:   "bg-blue-100 text-blue-700",
  Networking: "bg-green-100 text-green-700",
  Expo:       "bg-purple-100 text-purple-700",
  Evening:    "bg-yellow-100 text-yellow-700",
  Logistics:  "bg-stone-100 text-stone-600",
};

// ─── SPEAKERS ────────────────────────────────────────────────────────────────
const speakers = [
  { name: "George Schick", title: "Master Technician, MSA", photo: georgeImg },
  { name: "Rick Kuemin", title: "Technical Director, MSA", photo: rickImg },
  { name: "Mitch Williams", title: "Senior Trainer, MSA", photo: mitchImg },
  { name: "TBA Speaker", title: "Industry Leader", photo: null },
  { name: "TBA Speaker", title: "Manufacturer Partner", photo: null },
  { name: "TBA Speaker", title: "Technology Expert", photo: null },
];

// ─── PRICING ─────────────────────────────────────────────────────────────────
const pricingPlans = [
  {
    name: "Member Early Bird",
    price: "$699",
    deadline: "Through July 31, 2026",
    badge: "Best Value",
    highlighted: false,
    benefits: [
      "Full 4-day access",
      "All keynotes & breakout sessions",
      "Vendor Fair access",
      "Breakfast & networking lunches",
      "Welcome reception",
      "Awards dinner ticket",
    ]
  },
  {
    name: "Member Regular",
    price: "$899",
    deadline: "Aug 1 – Oct 10, 2026",
    badge: "Standard",
    highlighted: true,
    benefits: [
      "Full 4-day access",
      "All keynotes & breakout sessions",
      "Vendor Fair access",
      "Breakfast & networking lunches",
      "Welcome reception",
      "Awards dinner ticket",
    ]
  },
  {
    name: "Guest Pass",
    price: "$1,099",
    deadline: "Limited availability",
    badge: "Non-Member",
    highlighted: false,
    benefits: [
      "Full 4-day access",
      "All keynotes & breakout sessions",
      "Vendor Fair access",
      "Breakfast & networking lunches",
      "Welcome reception",
      "Awards dinner ticket",
    ]
  }
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Who should attend MSA '26?",
    a: "MSA '26 is designed for appliance service professionals — technicians, service managers, business owners, and industry partners. Whether you're looking to sharpen your technical skills, grow your network, or explore the latest industry innovations, this event is for you."
  },
  {
    q: "What's included with registration?",
    a: "Your registration includes full 4-day access to all keynote sessions, breakout workshops, the vendor fair, daily breakfast, networking lunches, and the welcome reception. Awards dinner is included for Member registrations and may be added to Guest passes."
  },
  {
    q: "What is the refund and cancellation policy?",
    a: "Cancellations received by September 1, 2026 are eligible for a full refund minus a $75 processing fee. Cancellations between September 1 and October 1 receive a 50% refund. No refunds after October 1, 2026 — however, registration may be transferred to another attendee at no cost."
  },
  {
    q: "Can I register a guest or non-member?",
    a: "Yes! Non-members and guests can register at the Guest Pass rate. If you'd like to bring a spouse or companion to the Awards Dinner only, standalone dinner tickets will be available separately closer to the event date."
  },
  {
    q: "How do I select breakout sessions and training workshops?",
    a: "Once the full schedule is published (expected August 2026), registered attendees will receive a link to select their breakout sessions and workshop preferences. Workshops are capacity-limited, so early selection is encouraged."
  },
  {
    q: "What is the dress code?",
    a: "Business casual for all daytime sessions, workshops, and the vendor fair. Smart casual or business formal for the Awards Dinner. We recommend comfortable footwear — there's a lot of ground to cover at Caesars Palace!"
  }
];

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 rounded" style={{ backgroundColor: light ? GOLD_LIGHT : GOLD }} />
      <span className="tracking-widest text-xs uppercase font-semibold" style={{ color: light ? GOLD_LIGHT : GOLD }}>
        {children}
      </span>
      <div className="h-px w-8 rounded" style={{ backgroundColor: light ? GOLD_LIGHT : GOLD }} />
    </div>
  );
}

export default function ConventionPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden">

      {/* ─── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, rgba(13,27,62,0.85) 50%, rgba(201,150,61,0.15) 100%)` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,62,1) 0%, transparent 40%)" }} />

        {/* Decorative gold diagonal bars */}
        <div className="absolute top-0 right-0 w-96 h-full opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 top-0 w-32 h-full rotate-12" style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
          <div className="absolute -right-4 top-0 w-16 h-full rotate-12 translate-x-20" style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 border" style={{ borderColor: GOLD, background: "rgba(201,150,61,0.1)" }}>
            <Star className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: GOLD_LIGHT }}>
              Marcone Servicers Association
            </span>
            <Star className="w-3.5 h-3.5" style={{ color: GOLD }} />
          </div>

          {/* Main headline */}
          <h1 className="text-white mb-4 tracking-tight" style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, lineHeight: 1 }}>
            MSA <span style={{ color: GOLD_LIGHT }}>'26</span>
          </h1>
          <p className="text-white mb-8 tracking-wide" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.05em" }}>
            Annual Convention
          </p>

          {/* Date & location pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Calendar className="w-4 h-4" style={{ color: GOLD_LIGHT }} />
              <span className="font-semibold text-sm">October 26–29, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <MapPin className="w-4 h-4" style={{ color: GOLD_LIGHT }} />
              <span className="font-semibold text-sm">Caesars Palace · Las Vegas, NV</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${RED}, #b92127)`, color: "white", boxShadow: `0 8px 30px rgba(215,39,45,0.4)` }}
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#agenda"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
            >
              View Schedule
            </a>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/50" />
        </div>
      </section>

      {/* ─── 2. EVENT HIGHLIGHTS ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel>What to Expect</SectionLabel>
            <h2 className="text-stone-900 mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>
              Four Days of Industry Excellence
            </h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto">
              MSA '26 brings together the best minds in appliance service for an unforgettable week of learning, connection, and innovation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Mic2, title: "Keynote Speakers", desc: "Industry-leading voices on the future of appliance service", color: "#EFF6FF", iconColor: "#2563EB" },
              { icon: Users, title: "Breakout Sessions", desc: "30+ technical and business workshops across all skill levels", color: "#F0FDF4", iconColor: "#16A34A" },
              { icon: Handshake, title: "Networking", desc: "Connect with 500+ service professionals from across North America", color: "#FFF7ED", iconColor: "#EA580C" },
              { icon: ShoppingBag, title: "Vendor Fair", desc: "Explore the latest tools, parts, and technology from top manufacturers", color: "#FAF5FF", iconColor: "#9333EA" },
            ].map(({ icon: Icon, title, desc, color, iconColor }) => (
              <div
                key={title}
                className="group rounded-2xl p-8 border border-stone-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: color }}>
                  <Icon className="w-7 h-7" style={{ color: iconColor }} />
                </div>
                <h3 className="text-stone-900 mb-2" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. AGENDA ──────────────────────────────────────────────────────── */}
      <section id="agenda" className="py-24" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_MID} 100%)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel light>Schedule</SectionLabel>
            <h2 className="text-white mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>Event Agenda</h2>
            <p className="mt-3 text-sm font-semibold rounded-full inline-block px-4 py-1.5 border" style={{ color: GOLD_LIGHT, borderColor: `${GOLD}60`, background: `${GOLD}18` }}>
              Full schedule coming August 2026
            </p>
          </div>

          {/* Day tabs */}
          <div className="flex rounded-xl p-1 mb-8 gap-1" style={{ background: "rgba(255,255,255,0.08)" }}>
            {agendaDays.map((day, i) => (
              <button
                key={day.date}
                onClick={() => setActiveDay(i)}
                className="flex-1 rounded-lg py-3 px-2 transition-all text-center"
                style={activeDay === i
                  ? { background: GOLD, color: NAVY, fontWeight: 700 }
                  : { color: "rgba(255,255,255,0.6)", fontWeight: 500 }
                }
              >
                <div className="text-xs uppercase tracking-wider mb-0.5">{day.label}</div>
                <div className="text-sm font-semibold">{day.date}</div>
              </button>
            ))}
          </div>

          {/* Sessions */}
          <div className="space-y-3">
            {agendaDays[activeDay].sessions.map((session, i) => (
              <div
                key={i}
                className="rounded-xl p-4 flex items-start gap-4"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex-shrink-0 w-28 text-right">
                  <span className="text-xs leading-relaxed" style={{ color: GOLD_LIGHT }}>{session.time}</span>
                </div>
                <div className="w-px self-stretch rounded" style={{ background: `${GOLD}40` }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-semibold text-sm">{session.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sessionTypeStyle[session.type]}`}>
                      {session.type}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{session.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SPEAKERS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel>Speakers</SectionLabel>
            <h2 className="text-stone-900 mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>Industry Voices</h2>
            <p className="text-stone-500 mt-2">Learn from experts shaping the future of appliance service.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {speakers.map((speaker, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0 flex items-center justify-center"
                  style={{ background: speaker.photo ? undefined : `linear-gradient(135deg, #94a3b8, #64748b)` }}
                >
                  {speaker.photo
                    ? <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                    : <span className="text-white text-2xl font-bold">?</span>
                  }
                </div>
                <h3 className="text-stone-900 mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>{speaker.name}</h3>
                <p className="text-stone-500 text-sm">{speaker.title}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm font-semibold" style={{ color: GOLD }}>
            ★ More speakers will be announced in the coming months ★
          </p>
        </div>
      </section>

      {/* ─── 5. HOTEL & TRAVEL ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel>Getting There</SectionLabel>
            <h2 className="text-stone-900 mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>Hotel & Travel</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hotel card */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <div className="relative h-48 flex items-end p-6" style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})` }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1634400139456-292e44ca5327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600)`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: GOLD_LIGHT }} />)}
                  </div>
                  <h3 className="text-white" style={{ fontWeight: 800, fontSize: "1.4rem" }}>Caesars Palace</h3>
                  <p className="text-white/70 text-sm">Las Vegas, Nevada</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-3" style={{ color: GOLD }}>
                  <Hotel className="w-4 h-4" />
                  <span className="text-sm font-semibold">Exclusive MSA '26 Room Block</span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Discounted rates reserved exclusively for MSA '26 attendees. Rates and booking link will be sent upon registration confirmation.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Group rate below standard pricing", "Limited rooms available — book early", "Complimentary Wi-Fi for MSA guests", "Direct access to convention hall"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-stone-600">
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${NAVY_MID}, ${NAVY})` }}
                >
                  Register First to Book Room
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Travel tips */}
            <div className="space-y-4">
              {[
                {
                  icon: Plane,
                  title: "Nearest Airport",
                  content: "Harry Reid International Airport (LAS) is the closest airport, approximately 10–15 minutes from Caesars Palace depending on traffic. Most major airlines offer direct routes to Las Vegas."
                },
                {
                  icon: MapPin,
                  title: "Getting to the Venue",
                  content: "Taxi, rideshare (Uber/Lyft), and hotel shuttle options are available from LAS. Caesars Palace is centrally located on the Las Vegas Strip with easy access to dining and entertainment."
                },
                {
                  icon: Clock,
                  title: "Recommended Arrival",
                  content: "We recommend arriving Sunday, October 25 to get settled before Registration opens at 2:00 PM on October 26. Check-out is Wednesday evening or Thursday morning."
                },
                {
                  icon: Award,
                  title: "Things to Do",
                  content: "Las Vegas offers world-class dining, entertainment, and shows. Your registration includes free time Tuesday evening — make the most of it!"
                }
              ].map(({ icon: Icon, title, content }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${NAVY}12` }}>
                    <Icon className="w-5 h-5" style={{ color: NAVY_MID }} />
                  </div>
                  <div>
                    <h4 className="text-stone-900 mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. PRICING ─────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_MID} 100%)` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel light>Pricing</SectionLabel>
            <h2 className="text-white mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>Registration Rates</h2>
            <p className="mt-2 text-white/60">Early bird pricing available through July 31, 2026.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={plan.highlighted
                  ? { background: `linear-gradient(145deg, ${GOLD}, ${GOLD_LIGHT})`, boxShadow: `0 20px 60px rgba(201,150,61,0.4)` }
                  : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }
                }
              >
                {plan.highlighted && (
                  <div className="text-center py-2 text-xs font-bold tracking-widest uppercase" style={{ background: RED, color: "white" }}>
                    Most Common
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <div className="mb-1">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={plan.highlighted ? { background: `${NAVY}22`, color: NAVY } : { background: `${GOLD}20`, color: GOLD_LIGHT }}>
                      {plan.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 mb-1" style={{ fontWeight: 800, fontSize: "1.1rem", color: plan.highlighted ? NAVY : "white" }}>
                    {plan.name}
                  </h3>
                  <div className="mb-1" style={{ fontSize: "3rem", fontWeight: 900, color: plan.highlighted ? NAVY : "white", lineHeight: 1 }}>
                    {plan.price}
                  </div>
                  <p className="text-xs mb-6" style={{ color: plan.highlighted ? `${NAVY}99` : "rgba(255,255,255,0.5)" }}>
                    {plan.deadline}
                  </p>
                  <ul className="space-y-3 flex-1 mb-7">
                    {plan.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: plan.highlighted ? NAVY : "rgba(255,255,255,0.85)" }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.highlighted ? RED : GOLD_LIGHT }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:convention@marcone.com"
                    className="block text-center rounded-full py-3 font-semibold transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                    style={plan.highlighted
                      ? { background: `linear-gradient(135deg, ${RED}, #b92127)`, color: "white", boxShadow: `0 6px 20px rgba(215,39,45,0.35)` }
                      : { background: `${GOLD}20`, color: GOLD_LIGHT, border: `1px solid ${GOLD}50` }
                    }
                  >
                    Register Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Group discounts available for 5+ registrations. Contact <a href="mailto:convention@marcone.com" className="underline hover:text-white/70">convention@marcone.com</a>
          </p>
        </div>
      </section>

      {/* ─── 7. PAST EVENT HIGHLIGHTS ────────────────────────────────────── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Looking Back</SectionLabel>
            <h2 className="text-stone-900 mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>MSA '25 Highlights</h2>
            <p className="text-stone-500 mt-2">Relive the energy from our last convention.</p>
          </div>

          {/* Video embed placeholder */}
          <div className="relative rounded-2xl overflow-hidden mb-8 bg-stone-900 shadow-xl" style={{ aspectRatio: "16/9" }}>
            <img
              src={conferenceImage}
              alt="MSA '25 Convention"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 hover:bg-white/30 transition-colors cursor-pointer">
                <Play className="w-8 h-8 text-white ml-1 fill-current" />
              </div>
              <p className="text-white font-semibold text-lg">MSA '25 Convention Recap</p>
              <p className="text-white/60 text-sm mt-1">3:24 · Full video coming soon</p>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                style={{ aspectRatio: "4/3", background: `linear-gradient(135deg, ${NAVY_MID} 0%, ${i % 2 === 0 ? "#2d4a8a" : "#1a3a6a"} 100%)` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-white/40 text-sm font-semibold">Photo {i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. PARTNERS & SPONSORS ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Our Partners</SectionLabel>
            <h2 className="text-stone-900 mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>Sponsors & Partners</h2>
            <p className="text-stone-500 mt-2">MSA '26 is made possible by our generous industry partners.</p>
          </div>

          <div className="space-y-4">
            {[0, 1].map(row => (
              <div key={row} className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, col) => (
                  <div
                    key={col}
                    className="rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center py-6 px-4 hover:border-stone-300 hover:bg-stone-50 transition-all"
                  >
                    <p className="text-stone-400 text-xs font-semibold text-center">Partner Logo</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-stone-500">
            Interested in sponsoring MSA '26?{" "}
            <a href="mailto:sponsors@marcone.com" className="font-semibold hover:underline" style={{ color: GOLD }}>
              Contact our partnerships team →
            </a>
          </p>
        </div>
      </section>

      {/* ─── 9. FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-stone-900 mt-2" style={{ fontSize: "2.25rem", fontWeight: 800 }}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border bg-white overflow-hidden transition-all"
                  style={{ borderColor: isOpen ? GOLD : "#e7e5e4", boxShadow: isOpen ? `0 4px 20px rgba(201,150,61,0.15)` : "none" }}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="font-semibold text-stone-900 pr-4" style={{ fontSize: "0.95rem" }}>{faq.q}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: isOpen ? GOLD : "#f5f5f4" }}
                    >
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 text-white" />
                        : <ChevronDown className="w-4 h-4 text-stone-500" />
                      }
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 10. FOOTER CTA ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 text-white text-center"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a0a0a 50%, #1a0a14 100%)` }}
      >
        {/* Decorative gold glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10" style={{ background: GOLD, filter: "blur(80px)" }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="text-6xl mb-6">🎰</div>
          <SectionLabel light />
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1 }}>
            See You in <span style={{ color: GOLD_LIGHT }}>Vegas</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            October 26–29, 2026 · Caesars Palace · Las Vegas, NV
          </p>

          <a
            href="mailto:convention@marcone.com"
            className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-semibold transition-all hover:scale-105 active:scale-95 mb-12"
            style={{
              background: `linear-gradient(135deg, ${RED}, #b92127)`,
              color: "white",
              boxShadow: `0 12px 40px rgba(215,39,45,0.45), 0 0 0 1px rgba(215,39,45,0.2)`
            }}
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Contact row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            <a href="mailto:convention@marcone.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              convention@marcone.com <span className="text-white/30">(US)</span>
            </a>
            <span className="text-white/20 hidden sm:block">|</span>
            <a href="mailto:convention.ca@marcone.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              convention.ca@marcone.com <span className="text-white/30">(CA)</span>
            </a>
          </div>

          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
            © 2026 Marcone Servicers Association. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
