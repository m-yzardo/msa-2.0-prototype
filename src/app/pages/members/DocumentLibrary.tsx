import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Filter, X, FileText, Download, Search, ChevronDown, LayoutGrid, List } from "lucide-react";

const brands = ["Amana", "Bosch", "Jenn-Air", "KitchenAid", "LG", "Maytag", "Roper", "Whirlpool"];
const applianceTypes = ["Dishwasher", "Refrigerator", "Range", "Washer", "Dryer", "Cooktop", "Microwave", "Oven"];
const documentTypes = ["Service Manual", "Wiring Diagram", "Fault Codes", "Tech Sheet", "Parts Breakdown", "Service Bulletin", "Recall Notice"];

const mockDocuments = [
  { id: 1, brand: "Whirlpool", type: "Dishwasher", docType: "Service Manual", model: "WDF520PADM", date: "2026-03-15" },
  { id: 2, brand: "LG", type: "Refrigerator", docType: "Wiring Diagram", model: "LFXS26973S", date: "2026-03-10" },
  { id: 3, brand: "KitchenAid", type: "Range", docType: "Fault Codes", model: "KFGG500ESS", date: "2026-03-08" },
  { id: 4, brand: "Maytag", type: "Washer", docType: "Tech Sheet", model: "MVWC465HW", date: "2026-03-05" },
  { id: 5, brand: "Bosch", type: "Dishwasher", docType: "Parts Breakdown", model: "SHE878WD5N", date: "2026-03-01" },
  { id: 6, brand: "Jenn-Air", type: "Cooktop", docType: "Service Bulletin", model: "JGC7636BS", date: "2026-02-28" },
  { id: 7, brand: "LG", type: "Dryer", docType: "Service Manual", model: "DLEX3900B", date: "2026-02-25" },
  { id: 8, brand: "Whirlpool", type: "Microwave", docType: "Recall Notice", model: "WMH31017HS", date: "2026-02-20" },
  { id: 9, brand: "Maytag", type: "Refrigerator", docType: "Wiring Diagram", model: "MFI2570FEZ", date: "2026-02-15" },
];

const sortOptions = [
  { value: "recent", label: "Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
];

function toggleItem(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}

export default function DocumentLibrary() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "az">("recent");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const sortMenuRef = useRef<HTMLDivElement>(null);

  const [draftBrands, setDraftBrands] = useState<string[]>([]);
  const [draftTypes, setDraftTypes] = useState<string[]>([]);
  const [draftDocTypes, setDraftDocTypes] = useState<string[]>([]);

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
    setDraftDocTypes([...selectedDocTypes]);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setSelectedBrands(draftBrands);
    setSelectedTypes(draftTypes);
    setSelectedDocTypes(draftDocTypes);
    setShowFilters(false);
  };

  const clearDraft = () => {
    setDraftBrands([]);
    setDraftTypes([]);
    setDraftDocTypes([]);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedDocTypes([]);
  };

  const filteredDocs = mockDocuments
    .filter(doc => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(doc.brand)) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(doc.type)) return false;
      if (selectedDocTypes.length > 0 && !selectedDocTypes.includes(doc.docType)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return doc.brand.toLowerCase().includes(q) || doc.type.toLowerCase().includes(q) ||
          doc.docType.toLowerCase().includes(q) || doc.model.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return a.docType.localeCompare(b.docType);
    });

  const activeFiltersCount = selectedBrands.length + selectedTypes.length + selectedDocTypes.length;
  const draftCount = draftBrands.length + draftTypes.length + draftDocTypes.length;
  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label ?? "Recent";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Technical Document Library</h1>
        <p className="text-stone-600">9,500+ service manuals, wiring diagrams, and technical resources</p>
      </div>

      {/* Toolbar */}
      <div className="mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by brand, model, appliance type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
            />
          </div>

          {/* Button group */}
          <div className="flex items-center justify-start gap-3">
            {/* Sort dropdown */}
            <div className="relative" ref={sortMenuRef}>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center justify-between gap-1.5 w-full px-4 py-2.5 bg-white border border-stone-300 rounded-full hover:bg-stone-50 transition-colors"
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

            {/* Layout toggle */}
            <div className="flex items-center border border-stone-300 rounded-full overflow-hidden">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2.5 transition-colors ${layout === "grid" ? "bg-[#D7272D] text-white" : "bg-white text-stone-600 hover:bg-stone-50"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2.5 transition-colors ${layout === "list" ? "bg-[#D7272D] text-white" : "bg-white text-stone-600 hover:bg-stone-50"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips + result count */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-wrap gap-2">
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
            {selectedDocTypes.map(docType => (
              <span key={docType} className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                {docType}
                <button onClick={() => setSelectedDocTypes(selectedDocTypes.filter(v => v !== docType))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-[#D7272D] hover:underline font-semibold">Clear all</button>
            )}
          </div>
          <p className="text-sm text-stone-500 whitespace-nowrap ml-4">
            Showing <span className="font-semibold text-stone-700">{filteredDocs.length}</span> results
          </p>
        </div>
      </div>

      {/* Results */}
      {filteredDocs.length > 0 ? (
        layout === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map(doc => (
              <Link
                key={doc.id}
                to={`/members/documents/${doc.id}`}
                className="bg-white rounded-lg border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-stone-600" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{doc.brand}</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{doc.type}</span>
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-[#D7272D]">{doc.docType}</h3>
                <p className="text-sm text-stone-600 mb-3">Model: {doc.model}</p>
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Added {new Date(doc.date).toLocaleDateString()}</span>
                  <Download className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocs.map(doc => (
              <Link
                key={doc.id}
                to={`/members/documents/${doc.id}`}
                className="bg-white rounded-lg border border-stone-200 px-5 py-4 flex items-center gap-4 hover:border-[#D7272D] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-stone-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-900 group-hover:text-[#D7272D] truncate">{doc.docType}</h3>
                  <p className="text-sm text-stone-500">Model: {doc.model}</p>
                </div>
                <div className="hidden sm:flex gap-2 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{doc.brand}</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{doc.type}</span>
                </div>
                <span className="text-xs text-stone-400 flex-shrink-0 hidden md:block">
                  {new Date(doc.date).toLocaleDateString()}
                </span>
                <Download className="w-4 h-4 text-stone-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg border border-stone-200 p-12 text-center">
          <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-stone-600 mb-4">Try adjusting your filters or clearing them to see more results</p>
          <button onClick={clearFilters} className="text-[#D7272D] font-semibold hover:underline">Clear all filters</button>
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
            <h3 className="font-semibold text-stone-900 mb-3">Brand</h3>
            <div className="space-y-3">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={draftBrands.includes(brand)} onChange={() => setDraftBrands(toggleItem(draftBrands, brand))} className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded" />
                  <span className="text-sm text-stone-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-3">Appliance Type</h3>
            <div className="space-y-3">
              {applianceTypes.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={draftTypes.includes(type)} onChange={() => setDraftTypes(toggleItem(draftTypes, type))} className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded" />
                  <span className="text-sm text-stone-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-3">Document Type</h3>
            <div className="space-y-3">
              {documentTypes.map(docType => (
                <label key={docType} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={draftDocTypes.includes(docType)} onChange={() => setDraftDocTypes(toggleItem(draftDocTypes, docType))} className="w-4 h-4 accent-[#D7272D] border-stone-300 rounded" />
                  <span className="text-sm text-stone-700">{docType}</span>
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
