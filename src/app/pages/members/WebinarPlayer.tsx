import { Link, useParams } from "react-router";
import { ArrowLeft, User, Calendar, Eye, FileText } from "lucide-react";

export default function WebinarPlayer() {
  const { id } = useParams();

  const webinar = {
    id: id,
    title: "LG Inverter Compressor Repair Techniques",
    presenter: "Rick Kuemin",
    date: "2026-04-15",
    duration: "45 min",
    category: "Refrigeration",
    views: 342,
    description: "Learn advanced techniques for diagnosing and repairing LG inverter compressors, including common failure modes, testing procedures, and replacement best practices."
  };

  const relatedDocs = [
    { title: "LG Refrigerator Service Manual", model: "LFXS26973S" },
    { title: "LG Compressor Fault Codes", model: "Series 2024" },
  ];

  const relatedWebinars = [
    { title: "Understanding Inverter Technology", presenter: "Rick Kuemin" },
    { title: "Refrigeration System Diagnostics", presenter: "George Schick" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <Link
        to="/members/training"
        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Training
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-6">
            <div className="aspect-video bg-gradient-to-br from-stone-800 to-stone-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-lg font-semibold">Video Player</p>
                <p className="text-sm text-stone-300">{webinar.duration}</p>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
              {webinar.category}
            </span>

            <h1 className="text-2xl font-bold mt-3 mb-4">{webinar.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{webinar.presenter}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(webinar.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{webinar.views} views</span>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-stone-600">{webinar.description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Documents */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D7272D]" />
              Related Documents
            </h3>
            <div className="space-y-3">
              {relatedDocs.map((doc, i) => (
                <Link
                  key={i}
                  to="/members/documents"
                  className="block p-3 rounded-lg hover:bg-stone-50 border border-stone-200 transition-colors"
                >
                  <p className="text-sm font-semibold mb-1">{doc.title}</p>
                  <p className="text-xs text-stone-500">Model: {doc.model}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Webinars */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h3 className="font-semibold mb-4">Related Webinars</h3>
            <div className="space-y-3">
              {relatedWebinars.map((related, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg hover:bg-stone-50 border border-stone-200 cursor-pointer transition-colors"
                >
                  <p className="text-sm font-semibold mb-1">{related.title}</p>
                  <p className="text-xs text-stone-500">{related.presenter}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
