import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { MarconeLogoText } from "../MarconeLogoText";
import { Home, FileText, GraduationCap, MessageSquare, User, Bell, ChevronDown, X, Lock, CreditCard, LogOut, Settings } from "lucide-react";

const notifications = [
  {
    id: 1,
    text: "Rick Kuemin answered your question about the KitchenAid range burner igniter",
    time: "2 hours ago",
    read: false,
  },
];

export default function MembersLayout() {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotifications, setReadNotifications] = useState<number[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !readNotifications.includes(n.id)).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const openNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    setReadNotifications(notifications.map(n => n.id));
  };

  const openProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const navItems = [
    { path: "/members", label: "Home", icon: Home },
    { path: "/members/documents", label: "Documents", icon: FileText },
    { path: "/members/training", label: "Training", icon: GraduationCap },
    { path: "/members/ask-a-trainer", label: "Ask a Trainer", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/members" className="flex items-center gap-3">
              <MarconeLogoText />
              <span className="text-xl font-semibold text-stone-900">MSA World</span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Notification bell */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={openNotifications}
                  className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-stone-700" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D7272D] rounded-full" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-stone-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
                      <span className="font-semibold text-stone-900">Notifications</span>
                      <button onClick={() => setShowNotifications(false)} className="p-1 rounded-lg hover:bg-stone-100 transition-colors">
                        <X className="w-4 h-4 text-stone-500" />
                      </button>
                    </div>
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map(n => (
                          <div key={n.id} className="px-4 py-3 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-0">
                            <p className="text-sm text-stone-800 mb-1">{n.text}</p>
                            <p className="text-xs text-stone-500">{n.time}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-sm text-stone-500">
                        No notifications
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile pill */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={openProfileMenu}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#D7272D] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-stone-900 hidden sm:block">John D.</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* User info header */}
                    <div className="px-4 py-4 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#D7272D] rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900">John Doe</p>
                          <p className="text-xs text-stone-500">john.doe@example.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors text-left">
                        <Settings className="w-4 h-4 text-stone-500" />
                        Profile Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors text-left">
                        <Lock className="w-4 h-4 text-stone-500" />
                        Change Password
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors text-left">
                        <CreditCard className="w-4 h-4 text-stone-500" />
                        Membership & Subscription
                      </button>
                    </div>

                    {/* Membership badge */}
                    <div className="px-4 py-3 border-t border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500">Membership</span>
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                      </div>
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-stone-100 py-1">
                      <Link to="/" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#D7272D] hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-stone-200 hidden md:block sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path ||
                              (item.path !== "/members" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    isActive
                      ? "border-[#D7272D] text-[#D7272D]"
                      : "border-transparent text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
                            (item.path !== "/members" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-3 ${
                  isActive ? "text-[#D7272D]" : "text-stone-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label === "Ask a Trainer" ? "Ask" : item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
