import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, User, Users, Video, Check, Search, ChevronDown, Filter, X, Clock } from "lucide-react";
import { upcomingWebinars, trainingSessions } from "../../data/trainingData";

const mitchImage = new URL('../../../imports/mitch.jpg', import.meta.url).href;
const rickImage = new URL('../../../imports/rick.jpg', import.meta.url).href;
const georgeImage = new URL('../../../imports/george.jpg', import.meta.url).href;

// ── Data ────────────────────────────────────────────────────────────────────

const onDemandWebinars = [
  {
    id: 101,
    title: "LG Inverter Compressor Repair Techniques",
    presenter: "Rick Kuemin",
    date: "2026-04-15",
    duration: "45 min",
    category: "Refrigeration",
    description: "Step-by-step techniques for diagnosing and replacing LG linear inverter compressors, including sealed-system recovery and recharge.",
    image: "https://picsum.photos/seed/lg-inverter-compressor/320/180",
    views: 342,
  },
  {
    id: 102,
    title: "Whirlpool Front Load Washer Seal Replacement",
    presenter: "George Schick",
    date: "2026-04-08",
    duration: "38 min",
    category: "Laundry",
    description: "A full teardown showing how to replace the door boot seal on Whirlpool front-load washers without damaging the drum or tub.",
    image: "https://picsum.photos/seed/whirlpool-washer-seal/320/180",
    views: 289,
  },
  {
    id: 103,
    title: "Understanding Modern Range Control Systems",
    presenter: "Mitch Williams",
    date: "2026-03-30",
    duration: "52 min",
    category: "Cooking",
    description: "Break down electronic oven controls, relay boards, and temperature sensors to confidently service modern electric and gas ranges.",
    image: "https://picsum.photos/seed/modern-range-controls/320/180",
    views: 421,
  },
];

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

const tourSchedule = [
  {
    trainer: "Mitch Williams",
    region: "Central & Eastern US",
    photo: "mitch" as const,
    stops: [
      { id: 201, city: "Phoenix", state: "AZ", dateRange: "Jun 9–10, 2026", products: ["Whirlpool", "GE", "Frigidaire"], spots: 11, totalSpots: 15 },
      { id: 202, city: "Dallas", state: "TX", dateRange: "Jun 23–24, 2026", products: ["Samsung", "GE", "Whirlpool"], spots: 4, totalSpots: 15 },
      { id: 203, city: "Chicago", state: "IL", dateRange: "Jul 14–15, 2026", products: ["Frigidaire", "Whirlpool", "LG"], spots: 9, totalSpots: 15 },
      { id: 204, city: "Miami", state: "FL", dateRange: "Aug 4–5, 2026", products: ["GE", "Samsung", "Frigidaire"], spots: 2, totalSpots: 15 },
    ],
  },
  {
    trainer: "Rick Kuhlman",
    region: "West Coast & Mountain",
    photo: "rick" as const,
    stops: [
      { id: 211, city: "Boise", state: "ID", dateRange: "Jun 16–17, 2026", products: ["Whirlpool", "Frigidaire"], spots: 13, totalSpots: 15 },
      { id: 212, city: "Denver", state: "CO", dateRange: "Jul 7–8, 2026", products: ["GE", "Samsung", "Whirlpool"], spots: 6, totalSpots: 15 },
      { id: 213, city: "Seattle", state: "WA", dateRange: "Jul 28–29, 2026", products: ["LG", "Samsung", "GE"], spots: 8, totalSpots: 15 },
      { id: 214, city: "Los Angeles", state: "CA", dateRange: "Sep 1–2, 2026", products: ["Frigidaire", "Whirlpool", "Samsung"], spots: 3, totalSpots: 15 },
    ],
  },
];

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

// ── Component ────────────────────────────────────────────────────────────────

export default function Training() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "on-demand" | "hands-on" | "webinars">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  // Registration state — kept separate to avoid ID collisions between webinars and sessions
  const [registeredWebinars, setRegisteredWebinars] = useState<number[]>([2]);
  const [registeredSessions, setRegisteredSessions] = useState<number[]>([2]);
  const [registeredTourStops, setRegisteredTourStops] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<{ type: "webinar" | "session" | "tour"; id: number } | null>(null);

  // Sort state per tab
  const [upcomingSortBy, setUpcomingSortBy] = useState<"newest" | "oldest" | "az">("newest");
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

  const handleRegisterWebinar = (id: number) => {
    setRegisteredWebinars(prev => [...prev, id]);
    setShowConfirmation({ type: "webinar", id });
    setTimeout(() => setShowConfirmation(null), 3000);
  };

  const handleRegisterSession = (id: number) => {
    setRegisteredSessions(prev => [...prev, id]);
    setShowConfirmation({ type: "session", id });
    setTimeout(() => setShowConfirmation(null), 3000);
  };

  const handleRegisterTourStop = (id: number) => {
    setRegisteredTourStops(prev => [...prev, id]);
    setShowConfirmation({ type: "tour", id });
    setTimeout(() => setShowConfirmation(null), 3000);
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

  function matchesSessionSearch(s: { title: string; trainer: string; location: string }) {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.trainer.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q)
    );
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

  // Upcoming tab: all upcomingWebinars + all trainingSessions (they're all future-dated)
  const upcomingCombined = sortByDate(
    [
      ...upcomingWebinars.filter(matchesWebinarFilters).map(w => ({
        kind: "webinar" as const,
        id: w.id,
        title: w.title,
        presenter: w.presenter,
        date: w.date,
        timeEast: w.timeEast,
        timeWest: w.timeWest,
        category: w.category,
        description: w.description,
        image: w.image,
        registered: registeredWebinars.includes(w.id),
      })),
      ...trainingSessions.filter(matchesSessionSearch).map(s => ({
        kind: "session" as const,
        id: s.id,
        title: s.title,
        presenter: s.trainer,
        date: s.date,
        format: s.format,
        location: s.location,
        duration: s.duration,
        spots: s.spots,
        totalSpots: s.totalSpots,
        description: s.description,
        image: s.image,
        registered: registeredSessions.includes(s.id),
      })),
    ],
    upcomingSortBy
  );

  const filteredOnDemand = sortByDate(onDemandWebinars.filter(matchesWebinarFilters), onDemandSortBy);

  const filteredWebinarsUpcoming = sortByDate(upcomingWebinars.filter(matchesWebinarFilters), webinarsSortBy);
  const filteredWebinarsOnDemand = sortByDate(onDemandWebinars.filter(matchesWebinarFilters), webinarsSortBy);

  // ── Current sort label for toolbar ────────────────────────────────────────

  const currentSortOptions =
    activeTab === "hands-on" ? trainingSortOptions : webinarSortOptions;

  const currentSortBy =
    activeTab === "upcoming" ? upcomingSortBy :
    activeTab === "on-demand" ? onDemandSortBy :
    activeTab === "hands-on" ? handsOnSortBy :
    webinarsSortBy;

  const setCurrentSortBy = (v: string) => {
    if (activeTab === "upcoming") setUpcomingSortBy(v as typeof upcomingSortBy);
    else if (activeTab === "on-demand") setOnDemandSortBy(v as typeof onDemandSortBy);
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
            {(activeTab === "upcoming" || activeTab === "on-demand" || activeTab === "webinars") && (
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
        {activeFiltersCount > 0 && (activeTab === "upcoming" || activeTab === "on-demand" || activeTab === "webinars") && (
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

      {/* Tabs */}
      <div className="flex gap-4 border-b border-stone-200 mb-8">
        {(["upcoming", "on-demand", "hands-on", "webinars"] as const).map((tab) => {
          const labels: Record<typeof tab, string> = {
            upcoming: "Upcoming",
            "on-demand": "On Demand",
            "hands-on": "Hands-On",
            webinars: "Webinars",
          };
          return (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`pb-3 px-2 border-b-2 transition-colors font-semibold whitespace-nowrap ${
                activeTab === tab
                  ? "border-[#D7272D] text-[#D7272D]"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* ── Upcoming tab ─────────────────────────────────────────────────── */}
      {activeTab === "upcoming" && (
        <div className="space-y-6">
          {upcomingCombined.length > 0 ? upcomingCombined.map(item => {
            if (item.kind === "webinar") {
              const isRegistered = item.registered;
              const isConfirming = showConfirmation?.type === "webinar" && showConfirmation.id === item.id;

              return (
                <Link key={`w-${item.id}`} to={`/members/training/${item.kind}-${item.id}`} className="block bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex flex-1 flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-40 h-[120px] object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full">
                            Webinar
                          </span>
                          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                          {isRegistered && (
                            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Registered
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>

                        <p className="text-stone-500 text-sm line-clamp-2 mb-3">{item.description}</p>

                        <div className="grid md:grid-cols-2 gap-3 text-sm text-stone-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{item.presenter}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{item.timeEast}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{item.timeWest}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {isConfirming ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                          <Check className="w-5 h-5 text-green-600 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-green-900">You're registered!</p>
                          <button className="text-xs text-green-700 hover:underline mt-1">Add to calendar</button>
                        </div>
                      ) : isRegistered ? (
                        <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors whitespace-nowrap">
                          Registered
                        </button>
                      ) : (
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRegisterWebinar(item.id); }}
                          className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors whitespace-nowrap"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              );
            }

            // Training session item
            const isRegistered = item.registered;
            const isConfirming = showConfirmation?.type === "session" && showConfirmation.id === item.id;
            const format = (item as { format?: string }).format ?? "";

            return (
              <Link key={`s-${item.id}`} to={`/members/training/${item.kind}-${item.id}`} className="block bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex flex-1 flex-col sm:flex-row gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-40 h-[120px] object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${
                          format === "virtual"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        } text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
                          {format === "virtual" ? <Video className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          {format === "virtual" ? "Virtual" : "Hands-On"}
                        </span>
                        {isRegistered && (
                          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Registered
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>

                      <p className="text-stone-500 text-sm line-clamp-2 mb-3">{item.description}</p>

                      <div className="grid md:grid-cols-2 gap-3 text-sm text-stone-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{item.presenter}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(item.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                        </div>
                        {"location" in item && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{(item as { location: string }).location}</span>
                          </div>
                        )}
                        {"duration" in item && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Duration:</span>
                            <span>{(item as { duration: string }).duration}</span>
                          </div>
                        )}
                      </div>

                      {"spots" in item && (
                        <div className="mt-3 text-sm">
                          <span className={`font-semibold ${
                            (item as { spots: number }).spots <= 3 ? "text-red-600" :
                            (item as { spots: number }).spots <= 7 ? "text-amber-600" :
                            "text-green-600"
                          }`}>
                            {(item as { spots: number }).spots} spots available
                          </span>
                          <span className="text-stone-500"> of {(item as { totalSpots: number }).totalSpots}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {isConfirming ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-green-900">You're registered!</p>
                        <button className="text-xs text-green-700 hover:underline mt-1">Add to calendar</button>
                      </div>
                    ) : isRegistered ? (
                      <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors whitespace-nowrap">
                        Registered
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRegisterSession(item.id); }}
                        className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors whitespace-nowrap"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          }) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
              <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming sessions found</h3>
              <p className="text-stone-600 mb-4">Try adjusting your search or filters</p>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── On Demand tab ────────────────────────────────────────────────── */}
      {activeTab === "on-demand" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOnDemand.length > 0 ? filteredOnDemand.map(webinar => (
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
          )) : (
            <div className="col-span-full bg-white rounded-xl border border-stone-200 p-12 text-center">
              <Video className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No videos found</h3>
              <p className="text-stone-600 mb-4">Try adjusting your search or filters</p>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Hands-On tab ─────────────────────────────────────────────────── */}
      {activeTab === "hands-on" && (
        <div className="space-y-8">
          {tourSchedule.map(tour => (
            <div key={tour.trainer} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              {/* Trainer header */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-stone-100 bg-stone-50">
                <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-stone-200 flex items-center justify-center">
                  {tour.photo === "mitch" ? (
                    <img src={mitchImage} alt={tour.trainer} className="w-full h-full object-cover" />
                  ) : tour.photo === "rick" ? (
                    <img src={rickImage} alt={tour.trainer} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold text-stone-600">
                      {tour.trainer.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stone-900">{tour.trainer}</h2>
                  <p className="text-sm text-stone-500">{tour.region}</p>
                </div>
              </div>

              {/* Tour stops */}
              <div className="divide-y divide-stone-100">
                {tour.stops.map(stop => {
                  const isRegistered = registeredTourStops.includes(stop.id);
                  const isConfirming = showConfirmation?.type === "tour" && showConfirmation.id === stop.id;
                  const spotsLeft = stop.spots;
                  const spotsColor =
                    spotsLeft <= 3 ? "text-red-600" :
                    spotsLeft <= 7 ? "text-amber-600" :
                    "text-green-600";
                  const spotsBg =
                    spotsLeft <= 3 ? "bg-red-50 border-red-100" :
                    spotsLeft <= 7 ? "bg-amber-50 border-amber-100" :
                    "bg-green-50 border-green-100";

                  return (
                    <div key={stop.id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 hover:bg-stone-50 transition-colors">
                      {/* City — primary, large */}
                      <div className="sm:w-40 flex-shrink-0">
                        <p className="text-xl font-bold text-stone-900 leading-tight">{stop.city}</p>
                        <p className="text-sm font-medium text-stone-500">{stop.state}</p>
                      </div>

                      {/* Date */}
                      <div className="sm:w-44 flex-shrink-0 flex items-center gap-2 text-sm text-stone-600">
                        <Calendar className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        <span>{stop.dateRange}</span>
                      </div>

                      {/* Products */}
                      <div className="flex-1 flex flex-wrap gap-1.5">
                        {stop.products.map(p => (
                          <span key={p} className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-full font-medium">
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Spots */}
                      <div className={`sm:w-36 flex-shrink-0 flex items-center gap-2 text-sm border rounded-lg px-3 py-1.5 ${spotsBg}`}>
                        <Users className="w-4 h-4 flex-shrink-0 opacity-60" style={{ color: "inherit" }} />
                        <span className={`font-semibold ${spotsColor}`}>{spotsLeft} of {stop.totalSpots} left</span>
                      </div>

                      {/* Register */}
                      <div className="sm:w-32 flex-shrink-0">
                        {isConfirming ? (
                          <div className="flex items-center gap-1.5 text-green-700 text-sm font-semibold">
                            <Check className="w-4 h-4" />
                            Registered!
                          </div>
                        ) : isRegistered ? (
                          <button className="w-full px-4 py-2 border-2 border-green-600 text-green-600 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors">
                            Registered
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRegisterTourStop(stop.id)}
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
        <div className="space-y-8">
          {/* Upcoming webinars */}
          <div>
            <h2 className="text-lg font-semibold text-stone-700 mb-4">Upcoming</h2>
            {filteredWebinarsUpcoming.length > 0 ? (
              <div className="space-y-6">
                {filteredWebinarsUpcoming.map(webinar => {
                  const isRegistered = registeredWebinars.includes(webinar.id);
                  const isConfirming = showConfirmation?.type === "webinar" && showConfirmation.id === webinar.id;

                  return (
                    <div key={webinar.id} className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] transition-all">
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
                          {isConfirming ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                              <Check className="w-5 h-5 text-green-600 mx-auto mb-1" />
                              <p className="text-sm font-semibold text-green-900">You're registered!</p>
                              <button className="text-xs text-green-700 hover:underline mt-1">Add to calendar</button>
                            </div>
                          ) : isRegistered ? (
                            <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors whitespace-nowrap">
                              Registered
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRegisterWebinar(webinar.id)}
                              className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors whitespace-nowrap"
                            >
                              Register
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-stone-500 text-sm">No upcoming webinars match your search.</p>
            )}
          </div>

          {/* Divider */}
          <hr className="border-stone-200" />

          {/* On-demand webinars */}
          <div>
            <h2 className="text-lg font-semibold text-stone-700 mb-4">On Demand</h2>
            {filteredWebinarsOnDemand.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWebinarsOnDemand.map(webinar => (
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
            ) : (
              <p className="text-stone-500 text-sm">No on-demand webinars match your search.</p>
            )}

            {filteredWebinarsUpcoming.length === 0 && filteredWebinarsOnDemand.length === 0 && activeFiltersCount > 0 && (
              <div className="mt-4">
                <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
}
