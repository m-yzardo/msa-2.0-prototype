import { Link } from "react-router";
import { FileText, GraduationCap, MessageSquare, Phone, Calendar, Bell, TrendingUp, Video } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">
          Welcome back, John
        </h1>
        <p className="text-stone-600">
          Your MSA Pro membership is active. What would you like to do today?
        </p>
      </div>

      {/* Conference Banner */}
      <div className="bg-gradient-to-r from-[#D7272D] to-[#b92127] text-white rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">MSA Annual Conference 2026</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Las Vegas • October 2026</h2>
            <p className="text-stone-100">
              Join hundreds of service professionals for training, networking, and the latest industry insights
            </p>
          </div>
          <button className="bg-white text-[#D7272D] px-6 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors whitespace-nowrap">
            Learn More
          </button>
        </div>
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-bold mb-4">Quick Access</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Link
          to="/members/documents"
          className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Document Library</h3>
          <p className="text-sm text-stone-600 mb-3">
            Browse 9,500+ service manuals, wiring diagrams, and technical documents
          </p>
          <div className="text-sm font-semibold text-[#D7272D] group-hover:underline">
            Browse Documents →
          </div>
        </Link>

        <Link
          to="/members/webinars"
          className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <Video className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Webinars</h3>
          <p className="text-sm text-stone-600 mb-3">
            Live and recorded webinars from industry experts and manufacturers
          </p>
          <div className="text-sm font-semibold text-[#D7272D] group-hover:underline">
            View Webinars →
          </div>
        </Link>

        <Link
          to="/members/training"
          className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
            <GraduationCap className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Training</h3>
          <p className="text-sm text-stone-600 mb-3">
            Hands-on training sessions with master technicians
          </p>
          <div className="text-sm font-semibold text-[#D7272D] group-hover:underline">
            View Training →
          </div>
        </Link>

        <Link
          to="/members/ask-a-trainer"
          className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Ask a Trainer</h3>
          <p className="text-sm text-stone-600 mb-3">
            Get expert answers to your technical questions from master technicians
          </p>
          <div className="text-sm font-semibold text-[#D7272D] group-hover:underline">
            Browse Q&As →
          </div>
        </Link>

        <Link
          to="/members/hotline"
          className="bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
            <Phone className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">MSA Hotline</h3>
          <p className="text-sm text-stone-600 mb-3">
            Book a 1-on-1 call with a master technician for complex repairs
          </p>
          <div className="text-sm font-semibold text-[#D7272D] group-hover:underline">
            Book a Call →
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#D7272D]" />
            <h3 className="text-lg font-semibold">Recent Updates</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-semibold">Your Ask a Trainer question was answered</p>
                <p className="text-xs text-stone-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-semibold">New webinar: Advanced Refrigeration Diagnostics</p>
                <p className="text-xs text-stone-500">1 day ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-semibold">50+ new service bulletins added</p>
                <p className="text-xs text-stone-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#D7272D]" />
            <h3 className="text-lg font-semibold">Popular This Week</h3>
          </div>
          <div className="space-y-3">
            <div className="pb-3 border-b border-stone-100 last:border-0">
              <p className="text-sm font-semibold mb-1">LG Refrigerator Error Codes Guide</p>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">LG</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Refrigerator</span>
              </div>
            </div>
            <div className="pb-3 border-b border-stone-100 last:border-0">
              <p className="text-sm font-semibold mb-1">Whirlpool Washer Service Manual</p>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Whirlpool</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Washer</span>
              </div>
            </div>
            <div className="pb-3 border-b border-stone-100 last:border-0">
              <p className="text-sm font-semibold mb-1">Bosch Dishwasher Wiring Diagram</p>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Bosch</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Dishwasher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
