import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Calendar, Clock, User, Video, Check, Search, ChevronDown, Filter, X } from "lucide-react";

const upcomingWebinars = [
  {
    id: 1,
    title: "Advanced Refrigeration Diagnostics",
    presenter: "Rick Kuemin",
    date: "2026-05-22",
    timeEast: "2:00 PM EST",
    timeWest: "11:00 AM PST",
    category: "Refrigeration",
    registered: false
  },
  {
    id: 2,
    title: "Washing Machine Control Board Troubleshooting",
    presenter: "George Schick",
    date: "2026-05-28",
    timeEast: "3:00 PM EST",
    timeWest: "12:00 PM PST",
    category: "Laundry",
    registered: true
  },
  {
    id: 3,
    title: "Dishwasher Water Management Systems",
    presenter: "Mitch Williams",
    date: "2026-06-05",
    timeEast: "1:00 PM EST",
    timeWest: "10:00 AM PST",
    category: "Dishwasher",
    registered: false
  },
];

const onDemandWebinars = [
  {
    id: 101,
    title: "LG Inverter Compressor Repair Techniques",
    presenter: "Rick Kuemin",
    date: "2026-04-15",
    duration: "45 min",
    category: "Refrigeration",
    views: 342
  },
  {
    id: 102,
    title: "Whirlpool Front Load Washer Seal Replacement",
    presenter: "George Schick",
    date: "2026-04-08",
    duration: "38 min",
    category: "Laundry",
    views: 289
  },
  {
    id: 103,
    title: "Understanding Modern Range Control Systems",
    presenter: "Mitch Williams",
    date: "2026-03-30",
    duration: "52 min",
    category: "Cooking",
    views: 421
  },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
];

const categories = ["Refrigeration", "Laundry", "Dishwasher", "Cooking"];
const presenterList = ["Rick Kuemin", "George Schick", "Mitch Williams"];

function toggleItem(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}

export default function Webinars() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "on-demand">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredWebinars, setRegisteredWebinars] = useState<number[]>([2]);
  const [showConfirmation, setShowConfirmation] = useState<number | null>(null);

  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az">("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

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

  const handleRegister = (id: number) => {
    setRegisteredWebinars([...registeredWebinars, id]);
    setShowConfirmation(id);
    setTimeout(() => setShowConfirmation(null), 3000);
  };

  const activeFiltersCount = selectedCategories.length + selectedPresenters.length;
  const draftCount = draftCategories.length + draftPresenters.length;
  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label ?? "Newest";

  function matchesFilters(w: { title: string; presenter: string; category: string }) {
    if (selectedCategories.length > 0 && !selectedCategories.includes(w.category)) return false;
    if (selectedPresenters.length > 0 && !selectedPresenters.includes(w.presenter)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return w.title.toLowerCase().includes(q) || w.presenter.toLowerCase().includes(q) || w.category.toLowerCase().includes(q);
    }
    return true;
  }

  function sortItems<T extends { title: string; date: string }>(items: T[]): T[] {
    return [...items].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return a.title.localeCompare(b.title);
    });
  }

  const filteredUpcoming = sortItems(upcomingWebinars.filter(matchesFilters));
  const filteredOnDemand = sortItems(onDemandWebinars.filter(matchesFilters));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Webinars</h1>
        <p className="text-stone-600">Live sessions and on-demand videos from expert technicians</p>
      </div>

      {/* Toolbar */}
      <div className="mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by title, presenter, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
            />
          </div>

          {/* Button group */}
          <div className="flex items-center gap-2">
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
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value as typeof sortBy); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.value
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

            {/* Filters button */}
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
          </div>
        </div>

        {/* Active filter chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                {cat}
                <button onClick={() => setSelectedCategories(selectedCategories.filter(v => v !== cat))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedPresenters.map(p => (
              <span key={p} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {p}
                <button onClick={() => setSelectedPresenters(selectedPresenters.filter(v => v !== p))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button onClick={clearFilters} className="text-sm text-[#D7272D] hover:underline font-semibold">Clear all</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-stone-200 mb-8">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-3 px-2 border-b-2 transition-colors font-semibold ${
            activeTab === "upcoming"
              ? "border-[#D7272D] text-[#D7272D]"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          Upcoming Webinars
        </button>
        <button
          onClick={() => setActiveTab("on-demand")}
          className={`pb-3 px-2 border-b-2 transition-colors font-semibold ${
            activeTab === "on-demand"
              ? "border-[#D7272D] text-[#D7272D]"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          Watch On Demand
        </button>
      </div>

      {/* Upcoming Webinars */}
      {activeTab === "upcoming" && (
        <div className="space-y-6">
          {filteredUpcoming.length > 0 ? filteredUpcoming.map(webinar => {
            const isRegistered = registeredWebinars.includes(webinar.id);
            const showingConfirmation = showConfirmation === webinar.id;

            return (
              <div key={webinar.id} className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
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

                    <h3 className="text-xl font-bold mb-3">{webinar.title}</h3>

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

                  <div className="flex flex-col gap-2">
                    {showingConfirmation ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-green-900">You're registered!</p>
                        <button className="text-xs text-green-700 hover:underline mt-1">
                          Add to calendar
                        </button>
                      </div>
                    ) : isRegistered ? (
                      <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors whitespace-nowrap">
                        Registered
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(webinar.id)}
                        className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors whitespace-nowrap"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
              <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No webinars found</h3>
              <p className="text-stone-600 mb-4">Try adjusting your search or filters</p>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
              )}
            </div>
          )}
        </div>
      )}

      {/* On-Demand Webinars */}
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

      {/* Backdrop */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-[60] transition-opacity" onClick={() => setShowFilters(false)} />
      )}

      {/* Filter Drawer */}
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
              {categories.map(cat => (
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
