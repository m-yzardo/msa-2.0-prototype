import { Link, useParams } from "react-router";
import { useState } from "react";
import { ArrowLeft, User, Calendar, MapPin, Clock, Video, Users, Check } from "lucide-react";
import { upcomingWebinars, trainingSessions } from "../../data/trainingData";

// Richer, title-matched descriptions for the detail view (cards show the short
// summary from the data; here we expand on what each session covers).
const detailDescriptions: Record<string, string> = {
  "webinar-1":
    "Go beyond fault codes and learn to read a sealed system the way a master tech does. We'll walk through interpreting pressure and temperature readings, isolating restrictions and leaks, and confirming compressor health with real test data. You'll leave able to diagnose the trickiest no-cool and warm-box calls with confidence. Ideal for technicians ready to move from parts-swapping to true root-cause diagnosis.",
  "webinar-2":
    "Control boards are where modern washer repairs are won or lost. This session decodes the most common fault codes, then shows how to verify them with targeted voltage and continuity testing instead of guessing. We'll cover both front- and top-load platforms from the major brands. Best for techs who want to stop replacing good boards and start pinpointing the real failure.",
  "webinar-3":
    "Water is the heart of every dishwasher, and most failures live somewhere in its path. We'll trace fill, drain, and recirculation circuits end to end, then map symptoms like leaks, poor cleaning, and standing water back to the responsible valve, pump, or sensor. Expect practical diagnostic flows you can run on the next call. Great for techs who want a repeatable approach to water-related complaints.",
  "session-1":
    "Two full days of bench and live-unit work for technicians who learn by doing. You'll practice sealed-system service, brazing, refrigerant recovery and recharge, and structured diagnostics on real refrigeration equipment. Our instructor works alongside you to refine technique and answer the questions that only come up with tools in hand. Built for working refrigeration techs who want hands-on reps, not slides.",
  "session-2":
    "A live, instructor-led virtual deep dive into advanced washing machine diagnostics. We'll work through fault-code interpretation, motor and control circuits, and the diagnostic workflows that get you to the right part faster. Bring your tough calls — there's time for real-world Q&A throughout. Perfect for techs who want advanced training without leaving the shop.",
  "session-3":
    "Spend a guided day getting hands-on with the dishwasher failures you see most: pumps, valves, drain assemblies, and control boards. You'll disassemble, test, and reassemble units under instructor supervision, building muscle memory for fast, clean repairs. Common leak and no-drain scenarios are covered in depth. A strong fit for techs who want focused, practical repair practice in a single day.",
  "session-4":
    "A focused virtual session on servicing modern electric ranges. We'll break down control boards, element and relay circuits, and temperature sensing, with a heavy emphasis on safe high-voltage troubleshooting. You'll learn how to isolate failures quickly without risking damage to yourself or the appliance. Aimed at technicians expanding into cooking-appliance repair.",
};

interface Detail {
  type: "Webinar" | "Virtual" | "Hands-On";
  title: string;
  trainer: string;
  date: string;
  location: string;
  duration?: string;
  image?: string;
  description?: string;
  spots?: number;
  totalSpots?: number;
  registered: boolean;
}

export default function TrainingDetail() {
  const { sessionId } = useParams();

  const dash = sessionId?.indexOf("-") ?? -1;
  const kind = dash >= 0 ? sessionId!.slice(0, dash) : "";
  const id = dash >= 0 ? Number(sessionId!.slice(dash + 1)) : NaN;

  let detail: Detail | null = null;

  if (kind === "webinar") {
    const w = upcomingWebinars.find(x => x.id === id);
    if (w) {
      detail = {
        type: "Webinar",
        title: w.title,
        trainer: w.presenter,
        date: w.date,
        location: "Online",
        image: w.image,
        description: w.description,
        registered: w.registered,
      };
    }
  } else if (kind === "session") {
    const s = trainingSessions.find(x => x.id === id);
    if (s) {
      detail = {
        type: s.format === "virtual" ? "Virtual" : "Hands-On",
        title: s.title,
        trainer: s.trainer,
        date: s.date,
        location: s.location,
        duration: s.duration,
        image: s.image,
        description: s.description,
        spots: s.spots,
        totalSpots: s.totalSpots,
        registered: s.registered,
      };
    }
  }

  // Local registration state for the detail page (Training.tsx state isn't shared).
  const [registered, setRegistered] = useState(detail?.registered ?? false);
  const [confirming, setConfirming] = useState(false);

  const handleRegister = () => {
    setRegistered(true);
    setConfirming(true);
    setTimeout(() => setConfirming(false), 3000);
  };

  if (!detail) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <Link to="/members/training" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Training
        </Link>
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h1 className="text-lg font-semibold mb-2">Session not found</h1>
          <p className="text-stone-600">We couldn't find a training session for that link.</p>
        </div>
      </div>
    );
  }

  const tagClasses =
    detail.type === "Webinar"
      ? "bg-violet-100 text-violet-700"
      : detail.type === "Virtual"
      ? "bg-blue-100 text-blue-700"
      : "bg-orange-100 text-orange-700";

  const description = detailDescriptions[`${kind}-${id}`] ?? detail.description ?? "More details about this session are coming soon.";

  const spotsColor =
    detail.spots == null ? "" :
    detail.spots <= 3 ? "text-red-600" :
    detail.spots <= 7 ? "text-amber-600" :
    "text-green-600";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* 1. Back link */}
      <Link to="/members/training" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Training
      </Link>

      {/* 2. Hero image */}
      <div className="rounded-xl overflow-hidden mb-6 border border-stone-200">
        {detail.image ? (
          <img
            src={detail.image}
            alt={detail.title}
            className="w-full max-h-[280px] object-cover"
          />
        ) : (
          <div className="w-full h-[280px] bg-gradient-to-br from-stone-800 to-stone-600" />
        )}
      </div>

      {/* 3. Type tag + title */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`${tagClasses} text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
          {detail.type === "Virtual" ? <Video className="w-3 h-3" /> : detail.type === "Hands-On" ? <Users className="w-3 h-3" /> : null}
          {detail.type}
        </span>
        {registered && (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" />
            Registered
          </span>
        )}
      </div>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">{detail.title}</h1>

      {/* 4. Info bar */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{detail.trainer}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(detail.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{detail.location}</span>
        </div>
        {detail.duration && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{detail.duration}</span>
          </div>
        )}
      </div>

      {/* 5. Spots available (sessions only) */}
      {detail.spots != null && (
        <div className="text-sm mb-6">
          <span className={`font-semibold ${spotsColor}`}>{detail.spots} spots available</span>
          <span className="text-stone-500"> of {detail.totalSpots}</span>
        </div>
      )}

      {/* 6. Full description */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <h2 className="font-semibold mb-2">About this session</h2>
        <p className="text-stone-600 leading-relaxed">{description}</p>
      </div>

      {/* 7. Register button */}
      {confirming ? (
        <div className="inline-flex flex-col items-start bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 text-green-900 font-semibold">
            <Check className="w-5 h-5 text-green-600" />
            You're registered!
          </div>
          <button className="text-xs text-green-700 hover:underline mt-1">Add to calendar</button>
        </div>
      ) : registered ? (
        <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors">
          Registered
        </button>
      ) : (
        <button
          onClick={handleRegister}
          className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors"
        >
          Register
        </button>
      )}
    </div>
  );
}
