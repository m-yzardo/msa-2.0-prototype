import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Plus, MessageSquare, User, Calendar, ChevronDown, ChevronUp, Search, Filter, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const allQuestions = [
  {
    id: 1,
    title: "Whirlpool washer not draining - F21 error code",
    question: "I have a Whirlpool front load washer (WFW9151YW00) showing F21 error. I've checked the drain pump and it's clear. What else could cause this?",
    answer: "The F21 code indicates a long drain time. Beyond the drain pump, check: 1) The drain hose for kinks or clogs (especially at the connection point), 2) The pressure switch and its hose for blockage or damage, 3) The control board may need recalibration. Try running a diagnostic cycle to check pump operation directly.",
    brand: "Whirlpool",
    applianceType: "Washer",
    askedBy: "John D.",
    answeredBy: "Rick Kuemin",
    date: "2026-05-12",
    status: "answered" as const,
    views: 127,
    isMyQuestion: false
  },
  {
    id: 2,
    title: "LG refrigerator ice maker not filling",
    question: "LG LFXS26973S ice maker stopped filling with water. Water dispenser works fine. Model is 3 years old.",
    answer: "If the water dispenser works, the water line is fine. Check: 1) Ice maker fill tube for ice blockage (common issue), 2) Test the ice maker's fill valve using diagnostic mode, 3) Verify the ice maker assembly itself isn't faulty. The fill tube freezing is the most common cause - defrost it with a hair dryer and insulate it better.",
    brand: "LG",
    applianceType: "Refrigerator",
    askedBy: "Sarah M.",
    answeredBy: "George Schick",
    date: "2026-05-10",
    status: "answered" as const,
    views: 94,
    isMyQuestion: false
  },
  {
    id: 3,
    title: "Bosch dishwasher E15 error - what does it mean?",
    question: "Customer's Bosch dishwasher (SHE878WD5N) is showing E15 error and won't run. What should I check first?",
    answer: "E15 indicates water in the base pan, which triggers the leak protection system. This is usually caused by: 1) Oversudsing from wrong detergent, 2) A genuine leak from door seal, spray arm, or pump, 3) Dispenser overfilling. First, tip the unit back to drain the base pan and reset the float switch. Then identify the leak source before returning to service.",
    brand: "Bosch",
    applianceType: "Dishwasher",
    askedBy: "Mike T.",
    answeredBy: "Mitch Williams",
    date: "2026-05-08",
    status: "answered" as const,
    views: 156,
    isMyQuestion: false
  },
  {
    id: 4,
    title: "KitchenAid range burner igniter clicks but doesn't light",
    question: "KFGG500ESS gas range - one burner's igniter keeps clicking but the burner doesn't light. Other burners work fine.",
    answer: "",
    brand: "KitchenAid",
    applianceType: "Range",
    askedBy: "You",
    answeredBy: "",
    date: "2026-05-14",
    status: "pending" as const,
    views: 0,
    isMyQuestion: true
  },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-viewed", label: "Most Viewed" },
];

const brandList = ["Whirlpool", "LG", "Bosch", "KitchenAid"];
const applianceTypeList = ["Washer", "Refrigerator", "Dishwasher", "Range"];

function toggleItem(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}

export default function AskATrainer() {
  const [activeTab, setActiveTab] = useState<"all" | "my-questions">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "most-viewed">("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [draftBrands, setDraftBrands] = useState<string[]>([]);
  const [draftTypes, setDraftTypes] = useState<string[]>([]);

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
    setDraftBrands([...selectedBrands]);
    setDraftTypes([...selectedTypes]);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setSelectedBrands(draftBrands);
    setSelectedTypes(draftTypes);
    setShowFilters(false);
  };

  const clearDraft = () => {
    setDraftBrands([]);
    setDraftTypes([]);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
  };

  const toggleQuestion = (id: number) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const activeFiltersCount = selectedBrands.length + selectedTypes.length;
  const draftCount = draftBrands.length + draftTypes.length;
  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label ?? "Newest";

  const displayedQuestions = allQuestions
    .filter(q => {
      if (activeTab === "my-questions" && !q.isMyQuestion) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(q.brand)) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(q.applianceType)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return q.title.toLowerCase().includes(query) || q.brand.toLowerCase().includes(query) ||
          q.applianceType.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return b.views - a.views;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Ask a Trainer</h1>
          <p className="text-stone-600">Get expert answers to your technical questions</p>
        </div>
        <Link
          to="/members/ask-a-trainer/submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-5 h-5" />
          Ask a Question
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by keyword, brand, or appliance type..."
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
                <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 min-w-[140px] overflow-hidden">
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
            {selectedBrands.map(brand => (
              <span key={brand} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {brand}
                <button onClick={() => setSelectedBrands(selectedBrands.filter(v => v !== brand))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedTypes.map(type => (
              <span key={type} className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                {type}
                <button onClick={() => setSelectedTypes(selectedTypes.filter(v => v !== type))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button onClick={clearFilters} className="text-sm text-[#D7272D] hover:underline font-semibold">Clear all</button>
          </div>
        )}
      </div>

      {/* Tabs — shadcn Tabs, matching the Training page for consistency */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
        <TabsList className="w-full justify-start gap-4 h-auto p-0 bg-transparent rounded-none border-b border-stone-200 overflow-x-auto flex-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(["all", "my-questions"] as const).map((tab) => {
            const labels: Record<typeof tab, string> = {
              all: "All Q&As",
              "my-questions": "My Questions",
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

      {/* Questions List */}
      <div className="space-y-4">
        {displayedQuestions.length > 0 ? (
          displayedQuestions.map(qa => {
            const isExpanded = expandedQuestions.includes(qa.id);

            return (
              <div key={qa.id} className="bg-white rounded-xl border border-stone-200">
                <div
                  onClick={() => qa.status === "answered" && toggleQuestion(qa.id)}
                  className={`p-6 ${qa.status === "answered" ? "cursor-pointer hover:bg-stone-50" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {qa.brand}
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          {qa.applianceType}
                        </span>
                        {qa.status === "pending" ? (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                            Pending
                          </span>
                        ) : (
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            Answered
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{qa.title}</h3>

                      <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>Asked by {qa.askedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(qa.date).toLocaleDateString()}</span>
                        </div>
                        {qa.status === "answered" && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{qa.views} views</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {qa.status === "answered" && (
                      <button className="p-1 hover:bg-stone-100 rounded">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-stone-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-stone-600" />
                        )}
                      </button>
                    )}
                  </div>

                  {qa.status === "pending" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-yellow-900">
                        Your question is under review. You'll receive an answer within 1 business day.
                      </p>
                    </div>
                  )}
                </div>

                {isExpanded && qa.status === "answered" && (
                  <div className="border-t border-stone-200 p-6 bg-stone-50">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-stone-700 mb-2">Question</h4>
                      <p className="text-stone-700">{qa.question}</p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-green-900">{qa.answeredBy}</p>
                          <p className="text-xs text-green-700">Master Technician</p>
                        </div>
                      </div>
                      <p className="text-stone-700">{qa.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No questions found</h3>
            <p className="text-stone-600 mb-4">
              {activeFiltersCount > 0 ? "Try adjusting your filters" : "Be the first to ask a question!"}
            </p>
            {activeFiltersCount > 0 ? (
              <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear filters</button>
            ) : (
              <Link
                to="/members/ask-a-trainer/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ask a Question
              </Link>
            )}
          </div>
        )}
      </div>

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
            <h3 className="font-semibold text-stone-900 mb-3">Brand</h3>
            <div className="space-y-3">
              {brandList.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftBrands.includes(brand)}
                    onChange={() => setDraftBrands(toggleItem(draftBrands, brand))}
                    className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded"
                  />
                  <span className="text-sm text-stone-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-3">Appliance Type</h3>
            <div className="space-y-3">
              {applianceTypeList.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftTypes.includes(type)}
                    onChange={() => setDraftTypes(toggleItem(draftTypes, type))}
                    className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded"
                  />
                  <span className="text-sm text-stone-700">{type}</span>
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
