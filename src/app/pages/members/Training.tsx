import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Calendar, User, Users, Video, Check, Search, ChevronDown, Filter, X, Clock } from "lucide-react";
import { upcomingWebinars, onDemandWebinars } from "../../data/trainingData";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import RegistrationDrawer, { type RegistrationItem } from "../../components/RegistrationDrawer";

const mitchImage = new URL('../../../imports/mitch.jpg', import.meta.url).href;
const rickImage = new URL('../../../imports/rick.jpg', import.meta.url).href;
const georgeImage = new URL('../../../imports/george.jpg', import.meta.url).href;

const handsOn01 = new URL('../../../imports/hands-on_01.png', import.meta.url).href;
const handsOn02 = new URL('../../../imports/hands-on_02.png', import.meta.url).href;
const handsOn03 = new URL('../../../imports/hands-on_03.png', import.meta.url).href;

// ── Data ────────────────────────────────────────────────────────────────────

const trainers = [
  {
    name: "George Schick",
    photo: "👨‍🏫",
    bio: "Expert in laundry appliances with extensive experience in control board diagnostics",
  },
  {
    name: "Rick Kuemin",
    photo: "👨‍🔧",
    bio: "Master technician with 30+ years experience specializing in refrigeration and HVAC systems",
  },
  {
    name: "Mitch Williams",
    photo: "👨‍💼",
    bio: "Specialist in dishwashers and water management systems with 25+ years in the field",
  },
];

const webinarCategories = ["Refrigeration", "Laundry", "Dishwasher", "Cooking"];
const presenterList = ["Rick Kuemin", "George Schick", "Mitch Williams"];

// Hands-on classes — one flat, dated list. Grouped by month at render time.
// `host` matches the trainerProfiles keys used by "Meet Your Trainers" below.
const handsOnSessions = [
  { id: 201, city: "Phoenix", state: "AZ", date: "2026-06-09", dateRange: "Jun 9–10, 2026", host: "Mitch Williams", products: ["Whirlpool", "GE", "Frigidaire"], spots: 11, totalSpots: 15 },
  { id: 211, city: "Boise", state: "ID", date: "2026-06-16", dateRange: "Jun 16–17, 2026", host: "Rick Kuemin", products: ["Whirlpool", "Frigidaire"], spots: 13, totalSpots: 15 },
  { id: 202, city: "Dallas", state: "TX", date: "2026-06-23", dateRange: "Jun 23–24, 2026", host: "Mitch Williams", products: ["Samsung", "GE", "Whirlpool"], spots: 4, totalSpots: 15 },
  { id: 212, city: "Denver", state: "CO", date: "2026-07-07", dateRange: "Jul 7–8, 2026", host: "Rick Kuemin", products: ["GE", "Samsung", "Whirlpool"], spots: 6, totalSpots: 15 },
  { id: 203, city: "Chicago", state: "IL", date: "2026-07-14", dateRange: "Jul 14–15, 2026", host: "Mitch Williams", products: ["Frigidaire", "Whirlpool", "LG"], spots: 9, totalSpots: 15 },
  { id: 213, city: "Seattle", state: "WA", date: "2026-07-28", dateRange: "Jul 28–29, 2026", host: "Rick Kuemin", products: ["LG", "Samsung", "GE"], spots: 8, totalSpots: 15 },
  { id: 204, city: "Miami", state: "FL", date: "2026-08-04", dateRange: "Aug 4–5, 2026", host: "Mitch Williams", products: ["GE", "Samsung", "Frigidaire"], spots: 2, totalSpots: 15 },
  { id: 214, city: "Los Angeles", state: "CA", date: "2026-09-01", dateRange: "Sep 1–2, 2026", host: "Rick Kuemin", products: ["Frigidaire", "Whirlpool", "Samsung"], spots: 3, totalSpots: 15 },
];

// Shared curriculum content — identical across every hands-on class, shown once
// in the "About Hands-On Training" section at the top of the tab.
const handsOnInfo = {
  description:
    "MSA hands-on training brings you into the shop for full days of in-person, instructor-led work on real appliances. You'll tear down, diagnose, and rebuild current-production units alongside a national trainer — the same repairs you'll see on your next service call.",
  products: [
    "Whirlpool 7.0 cu ft Electric Dryer",
    'GE 24" Built-In Dishwasher',
    "Frigidaire 18.9 cu ft All-Refrigerator",
  ],
  pricing: "$49 for MSA members · $149 for non-members",
  pricingNote: "One free technician per class for MSA Pro members.",
  photos: [handsOn01, handsOn02, handsOn03],
  itinerary: [
    { time: "8:30 AM", item: "Welcome & overview of the MSA World website and resources" },
    { time: "9:00 AM", item: "Product demonstrations across the featured units" },
    { time: "10:00 AM", item: "Full product training — disassembly" },
    { time: "1:00 PM", item: "Diagnosis and testing" },
    { time: "2:30 PM", item: "Open Q&A with your trainer" },
    { time: "3:00 PM", item: "Wrap-up" },
  ],
  itineraryNote: "Classes run roughly 8:30 a.m. to 3:00 p.m. Meals are provided.",
};

const webinarSortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
];

const trainingSortOptions = [
  { value: "nearest", label: "Nearest" },
  { value: "farthest", label: "Farthest" },
  { value: "az", label: "A–Z" },
];

function toggleItem(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}

// Group hands-on classes by month, chronologically. e.g. [{ month: "June 2026", sessions: [...] }]
function groupByMonth(sessions: typeof handsOnSessions) {
  const sorted = [...sessions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const groups: { month: string; sessions: typeof handsOnSessions }[] = [];
  for (const s of sorted) {
    const month = new Date(s.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const last = groups[groups.length - 1];
    if (last && last.month === month) last.sessions.push(s);
    else groups.push({ month, sessions: [s] });
  }
  return groups;
}

// Group on-demand videos by month/year, newest month first. Within each month
// the incoming order is preserved, so the sort dropdown still governs it.
function groupOnDemandByMonth<T extends { date: string }>(videos: T[]) {
  const byMonth = new Map<string, { month: string; latest: number; videos: T[] }>();
  for (const v of videos) {
    const d = new Date(v.date);
    const month = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const existing = byMonth.get(month);
    if (existing) {
      existing.videos.push(v);
      existing.latest = Math.max(existing.latest, d.getTime());
    } else {
      byMonth.set(month, { month, latest: d.getTime(), videos: [v] });
    }
  }
  return [...byMonth.values()].sort((a, b) => b.latest - a.latest);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Training() {
  const [activeTab, setActiveTab] = useState<"on-demand" | "hands-on" | "webinars">("webinars");
  const [searchQuery, setSearchQuery] = useState("");

  // Registration state — kept separate to avoid ID collisions between webinars and tour stops
  const [registeredWebinars, setRegisteredWebinars] = useState<number[]>([2]);
  const [registeredTourStops, setRegisteredTourStops] = useState<number[]>([]);

  // Sort state per tab
  const [onDemandSortBy, setOnDemandSortBy] = useState<"newest" | "oldest" | "az">("newest");
  const [handsOnSortBy, setHandsOnSortBy] = useState<"nearest" | "farthest" | "az">("nearest");
  const [webinarsSortBy, setWebinarsSortBy] = useState<"newest" | "oldest" | "az">("newest");

  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  // Webinar filters (used on Upcoming and Webinars tabs)
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPresenters, setSelectedPresenters] = useState<string[]>([]);
  const [draftCategories, setDraftCategories] = useState<string[]>([]);
  const [draftPresenters, setDraftPresenters] = useState<string[]>([]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Reset search on tab switch
  const switchTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setShowSortMenu(false);
  };

  // Registration transaction drawer. Each register button opens the drawer with
  // the item to register for and the callback to flip its registered state on confirm.
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registrationItem, setRegistrationItem] = useState<RegistrationItem | null>(null);
  const [onRegistrationConfirm, setOnRegistrationConfirm] = useState<() => void>(() => () => {});

  const openRegistration = (item: RegistrationItem, onConfirm: () => void) => {
    setRegistrationItem(item);
    // store the callback itself (not its result) — updater form avoids invoking it
    setOnRegistrationConfirm(() => onConfirm);
    setRegistrationOpen(true);
  };

  const handleRegisterWebinar = (id: number) => {
    setRegisteredWebinars(prev => [...prev, id]);
  };

  const handleRegisterTourStop = (id: number) => {
    setRegisteredTourStops(prev => [...prev, id]);
  };

  const openDrawer = () => {
    setDraftCategories([...selectedCategories]);
    setDraftPresenters([...selectedPresenters]);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setSelectedCategories(draftCategories);
    setSelectedPresenters(draftPresenters);
    setShowFilters(false);
  };

  const clearDraft = () => {
    setDraftCategories([]);
    setDraftPresenters([]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPresenters([]);
  };

  const activeFiltersCount = selectedCategories.length + selectedPresenters.length;
  const draftCount = draftCategories.length + draftPresenters.length;

  // ── Filter / sort helpers ──────────────────────────────────────────────────

  function matchesWebinarFilters(w: { title: string; presenter: string; category: string }) {
    if (selectedCategories.length > 0 && !selectedCategories.includes(w.category)) return false;
    if (selectedPresenters.length > 0 && !selectedPresenters.includes(w.presenter)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        w.title.toLowerCase().includes(q) ||
        w.presenter.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      );
    }
    return true;
  }

  function sortByDate<T extends { title: string; date: string }>(
    items: T[],
    mode: "newest" | "oldest" | "nearest" | "farthest" | "az"
  ): T[] {
    return [...items].sort((a, b) => {
      if (mode === "newest" || mode === "farthest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (mode === "oldest" || mode === "nearest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return a.title.localeCompare(b.title);
    });
  }

  // ── Derived lists ─────────────────────────────────────────────────────────

  const filteredOnDemand = sortByDate(onDemandWebinars.filter(matchesWebinarFilters), onDemandSortBy);

  const filteredWebinarsUpcoming = sortByDate(upcomingWebinars.filter(matchesWebinarFilters), webinarsSortBy);

  // ── Current sort label for toolbar ────────────────────────────────────────

  const currentSortOptions =
    activeTab === "hands-on" ? trainingSortOptions : webinarSortOptions;

  const currentSortBy =
    activeTab === "on-demand" ? onDemandSortBy :
    activeTab === "hands-on" ? handsOnSortBy :
    webinarsSortBy;

  const setCurrentSortBy = (v: string) => {
    if (activeTab === "on-demand") setOnDemandSortBy(v as typeof onDemandSortBy);
    else if (activeTab === "hands-on") setHandsOnSortBy(v as typeof handsOnSortBy);
    else setWebinarsSortBy(v as typeof webinarsSortBy);
  };

  const currentSortLabel = currentSortOptions.find(o => o.value === currentSortBy)?.label ?? "Sort";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Training</h1>
        <p className="text-stone-600">Live webinars, on-demand videos, virtual sessions, and hands-on field training.</p>
      </div>

      {/* Toolbar */}
      <div className="mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by title, trainer, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
            />
          </div>

          {/* Button group — hidden on Hands-On tab which has its own tour layout */}
          <div className={`flex items-center gap-2 ${activeTab === "hands-on" ? "hidden" : ""}`}>
            {/* Sort dropdown */}
            <div className="relative" ref={sortMenuRef}>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-stone-300 rounded-full hover:bg-stone-50 transition-colors whitespace-nowrap"
              >
                <span className="font-semibold text-sm text-stone-900">{currentSortLabel}</span>
                <ChevronDown className="w-4 h-4 text-stone-600" />
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 min-w-[130px] overflow-hidden">
                  {currentSortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setCurrentSortBy(opt.value); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        currentSortBy === opt.value
                          ? "bg-stone-100 font-semibold text-stone-900"
                          : "text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters button — shown on tabs that use webinar filters */}
            {(activeTab === "on-demand" || activeTab === "webinars") && (
              <button
                onClick={openDrawer}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 rounded-full hover:bg-stone-50 transition-colors whitespace-nowrap"
              >
                <Filter className="w-4 h-4 text-stone-600" />
                <span className="font-semibold text-sm text-stone-900">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#D7272D] text-white text-xs px-2 py-0.5 rounded-full leading-none">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {activeFiltersCount > 0 && (activeTab === "on-demand" || activeTab === "webinars") && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                {cat}
                <button onClick={() => setSelectedCategories(selectedCategories.filter(v => v !== cat))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedPresenters.map(p => (
              <span key={p} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {p}
                <button onClick={() => setSelectedPresenters(selectedPresenters.filter(v => v !== p))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={clearFilters} className="text-sm text-[#D7272D] hover:underline font-semibold">Clear all</button>
          </div>
        )}
      </div>

      {/* Tabs — shadcn Tabs (controlled); scrollable strip on mobile so the tabs never overflow */}
      <Tabs value={activeTab} onValueChange={(v) => switchTab(v as typeof activeTab)} className="mb-8">
        <TabsList className="w-full justify-start gap-4 h-auto p-0 bg-transparent rounded-none border-b border-stone-200 overflow-x-auto flex-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(["webinars", "on-demand", "hands-on"] as const).map((tab) => {
            const labels: Record<typeof tab, string> = {
              webinars: "Webinars",
              "on-demand": "On Demand",
              "hands-on": "Hands-On",
            };
            return (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-none h-auto rounded-none border-0 border-b-2 border-transparent bg-transparent px-2 pt-0 pb-3 font-semibold text-stone-600 hover:text-stone-900 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-[#D7272D] data-[state=active]:text-[#D7272D]"
              >
                {labels[tab]}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* ── On Demand tab ────────────────────────────────────────────────── */}
      {activeTab === "on-demand" && (
        filteredOnDemand.length > 0 ? (
          <div className="space-y-8">
            {groupOnDemandByMonth(filteredOnDemand).map(group => (
              <div key={group.month}>
                <h2 className="text-lg font-semibold text-stone-700 mb-4">{group.month}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.videos.map(webinar => (
                    <Link
                      key={webinar.id}
                      to={`/members/webinars/${webinar.id}`}
                      className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-[#D7272D] hover:shadow-lg transition-all group"
                    >
                      <div className="aspect-video bg-gradient-to-br from-stone-800 to-stone-600 flex items-center justify-center relative">
                        <Video className="w-16 h-16 text-white opacity-50" />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {webinar.duration}
                        </div>
                      </div>

                      <div className="p-5">
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {webinar.category}
                        </span>

                        <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-[#D7272D]">
                          {webinar.title}
                        </h3>

                        <div className="space-y-1 text-sm text-stone-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{webinar.presenter}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-stone-500">
                              {new Date(webinar.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-stone-500">
                              {webinar.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <Video className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No videos found</h3>
            <p className="text-stone-600 mb-4">Try adjusting your search or filters</p>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
            )}
          </div>
        )
      )}

      {/* ── Hands-On tab ─────────────────────────────────────────────────── */}
      {activeTab === "hands-on" && (
        <div className="space-y-8">
          {/* About Hands-On Training — shared curriculum content */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">About Hands-On Training</h2>
            <p className="text-stone-600 leading-relaxed mb-5">{handsOnInfo.description}</p>

            {/* Photo strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {handsOnInfo.photos.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Hands-on training ${i + 1}`}
                  className={`w-full h-32 sm:h-40 object-cover rounded-lg ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Products covered */}
              <div>
                <h3 className="font-semibold text-stone-900 mb-3">Products covered this season</h3>
                <div className="flex flex-wrap gap-2">
                  {handsOnInfo.products.map(p => (
                    <span key={p} className="bg-stone-100 text-stone-700 text-sm px-3 py-1 rounded-full font-medium">
                      {p}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-stone-900 mt-5 mb-1">Pricing</h3>
                <p className="text-stone-700 text-sm">{handsOnInfo.pricing}</p>
                <p className="text-stone-500 text-sm mt-1">{handsOnInfo.pricingNote}</p>
              </div>

              {/* Class itinerary */}
              <div>
                <h3 className="font-semibold text-stone-900 mb-3">Class itinerary</h3>
                <ul className="space-y-2.5">
                  {handsOnInfo.itinerary.map(step => (
                    <li key={step.time} className="flex gap-3 text-sm">
                      <span className="flex items-center gap-1.5 text-stone-500 font-medium w-24 flex-shrink-0">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        {step.time}
                      </span>
                      <span className="text-stone-700">{step.item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-stone-500 text-sm mt-3">{handsOnInfo.itineraryNote}</p>
              </div>
            </div>
          </div>

          {/* Schedule — grouped by month */}
          {groupByMonth(handsOnSessions).map(group => (
            <div key={group.month}>
              <h2 className="text-lg font-semibold text-stone-700 mb-4">{group.month}</h2>
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
                {group.sessions.map(session => {
                  const isRegistered = registeredTourStops.includes(session.id);
                  const spotsLeft = session.spots;
                  const spotsColor =
                    spotsLeft <= 3 ? "text-red-600" :
                    spotsLeft <= 7 ? "text-amber-600" :
                    "text-green-600";
                  const spotsBg =
                    spotsLeft <= 3 ? "bg-red-50 border-red-100" :
                    spotsLeft <= 7 ? "bg-amber-50 border-amber-100" :
                    "bg-green-50 border-green-100";

                  return (
                    <div key={session.id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 hover:bg-stone-50 transition-colors">
                      {/* City — primary, large */}
                      <div className="sm:w-40 flex-shrink-0">
                        <p className="text-xl font-bold text-stone-900 leading-tight">{session.city}</p>
                        <p className="text-sm font-medium text-stone-500">{session.state}</p>
                      </div>

                      {/* Date + host */}
                      <div className="sm:w-52 flex-shrink-0 space-y-1 text-sm text-stone-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-stone-400 flex-shrink-0" />
                          <span>{session.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-stone-400 flex-shrink-0" />
                          <span>{session.host}</span>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="flex-1 flex flex-wrap gap-1.5">
                        {session.products.map(p => (
                          <span key={p} className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-full font-medium">
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Spots */}
                      <div className={`sm:w-36 flex-shrink-0 flex items-center gap-2 text-sm border rounded-lg px-3 py-1.5 ${spotsBg}`}>
                        <Users className="w-4 h-4 flex-shrink-0 opacity-60" style={{ color: "inherit" }} />
                        <span className={`font-semibold ${spotsColor}`}>{spotsLeft} of {session.totalSpots} left</span>
                      </div>

                      {/* Register */}
                      <div className="sm:w-32 flex-shrink-0">
                        {isRegistered ? (
                          <button className="w-full px-4 py-2 border-2 border-green-600 text-green-600 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors">
                            Registered
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              openRegistration(
                                {
                                  title: `Hands-On Training — ${session.city}, ${session.state}`,
                                  subtitle: session.host,
                                  date: session.dateRange,
                                  meta: session.products.join(", "),
                                  kind: "hands-on",
                                },
                                () => handleRegisterTourStop(session.id),
                              )
                            }
                            className="w-full px-4 py-2 bg-[#D7272D] text-white rounded-full text-sm font-semibold hover:bg-[#b92127] transition-colors"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Webinars tab ─────────────────────────────────────────────────── */}
      {activeTab === "webinars" && (
        filteredWebinarsUpcoming.length > 0 ? (
          <div className="space-y-6">
            {filteredWebinarsUpcoming.map(webinar => {
              const isRegistered = registeredWebinars.includes(webinar.id);

              return (
                <Link key={webinar.id} to={`/members/training/webinar-${webinar.id}`} className="block bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex flex-1 flex-col sm:flex-row gap-4">
                      <img
                        src={webinar.image}
                        alt={webinar.title}
                        className="w-full sm:w-40 h-[120px] object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                            {webinar.category}
                          </span>
                          {isRegistered && (
                            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Registered
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>

                        <p className="text-stone-500 text-sm line-clamp-2 mb-3">{webinar.description}</p>

                        <div className="grid md:grid-cols-2 gap-3 text-sm text-stone-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{webinar.presenter}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(webinar.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{webinar.timeEast}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{webinar.timeWest}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {isRegistered ? (
                        <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors whitespace-nowrap">
                          Registered
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openRegistration(
                              {
                                title: webinar.title,
                                subtitle: webinar.presenter,
                                date: webinar.date,
                                meta: webinar.timeEast,
                                image: webinar.image,
                                kind: "webinar",
                              },
                              () => handleRegisterWebinar(webinar.id),
                            );
                          }}
                          className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors whitespace-nowrap"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <Video className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No live webinars scheduled right now</h3>
            <p className="text-stone-600 mb-4">Browse past sessions in On Demand.</p>
            <button onClick={() => switchTab("on-demand")} className="text-[#D7272D] font-semibold hover:underline">
              Go to On Demand
            </button>
            {activeFiltersCount > 0 && (
              <div className="mt-2">
                <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        )
      )}

      {/* ── Meet Your Trainers ───────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 mt-12">
        <h2 className="text-xl font-bold mb-4">Meet Your Trainers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {trainers.map(trainer => (
            <div key={trainer.name} className="flex gap-3">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                {trainer.name === "Mitch Williams" ? (
                  <img src={mitchImage} alt="Mitch Williams" className="w-full h-full object-cover" />
                ) : trainer.name === "Rick Kuemin" ? (
                  <img src={rickImage} alt="Rick Kuemin" className="w-full h-full object-cover" />
                ) : trainer.name === "George Schick" ? (
                  <img src={georgeImage} alt="George Schick" className="w-full h-full object-cover" />
                ) : (
                  trainer.photo
                )}
              </div>
              <div>
                <h3 className="font-semibold">{trainer.name}</h3>
                <p className="text-sm text-stone-600">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter drawer backdrop ───────────────────────────────────────── */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-[60] transition-opacity" onClick={() => setShowFilters(false)} />
      )}

      {/* ── Filter drawer ────────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[70] flex flex-col shadow-2xl transition-transform duration-300 ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-600" />
            <span className="font-semibold text-stone-900">Filters</span>
            {draftCount > 0 && (
              <span className="bg-[#D7272D] text-white text-xs px-2 py-0.5 rounded-full">{draftCount}</span>
            )}
          </div>
          <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          <div>
            <h3 className="font-semibold text-stone-900 mb-3">Category</h3>
            <div className="space-y-3">
              {webinarCategories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftCategories.includes(cat)}
                    onChange={() => setDraftCategories(toggleItem(draftCategories, cat))}
                    className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded"
                  />
                  <span className="text-sm text-stone-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-3">Presenter</h3>
            <div className="space-y-3">
              {presenterList.map(p => (
                <label key={p} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftPresenters.includes(p)}
                    onChange={() => setDraftPresenters(toggleItem(draftPresenters, p))}
                    className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded"
                  />
                  <span className="text-sm text-stone-700">{p}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-4 border-t border-stone-200 flex gap-3">
          <button onClick={clearDraft} className="flex-1 py-3 rounded-full border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition-colors">Clear</button>
          <button onClick={applyFilters} className="flex-1 py-3 rounded-full bg-[#D7272D] text-white font-semibold hover:bg-[#b92127] transition-colors">
            Apply{draftCount > 0 ? ` (${draftCount})` : ""}
          </button>
        </div>
      </div>

      {/* ── Registration transaction drawer ──────────────────────────────── */}
      <RegistrationDrawer
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
        item={registrationItem}
        onConfirm={onRegistrationConfirm}
      />
    </div>
  );
}
