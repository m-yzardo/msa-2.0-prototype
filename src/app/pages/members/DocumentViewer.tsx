import { Link, useParams } from "react-router";
import { ArrowLeft, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function DocumentViewer() {
  const { id } = useParams();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24;

  // Mock document data
  const doc = {
    id: id,
    brand: "Whirlpool",
    type: "Dishwasher",
    docType: "Service Manual",
    model: "WDF520PADM",
    date: "2026-03-15"
  };

  return (
    <div className="h-screen flex flex-col bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/members/documents"
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline">Back to Library</span>
            </Link>
            <div className="border-l border-stone-300 pl-4">
              <h1 className="font-semibold">{doc.docType}</h1>
              <div className="flex gap-2 mt-1">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                  {doc.brand}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  {doc.type}
                </span>
                <span className="text-xs text-stone-600">Model: {doc.model}</span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#D7272D] text-white rounded-lg hover:bg-[#b92127] transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Viewer Controls */}
      <div className="bg-white border-b border-stone-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-stone-100 rounded disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm">
                Page <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                  className="w-12 text-center border border-stone-300 rounded px-1"
                /> of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-stone-100 rounded disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="p-2 hover:bg-stone-100 rounded"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold w-16 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="p-2 hover:bg-stone-100 rounded"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-stone-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg">
          <div
            className="aspect-[8.5/11]"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            <div className="w-full h-full flex items-center justify-center bg-white border border-stone-200">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-stone-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-stone-600 mb-2">PDF Document Page {currentPage}</p>
                <p className="text-sm text-stone-500">
                  {doc.brand} {doc.type} - {doc.docType}
                </p>
                <p className="text-xs text-stone-400 mt-2">Model: {doc.model}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
