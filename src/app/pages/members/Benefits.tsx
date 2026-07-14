import { Link } from "react-router";
import { GraduationCap, Heart, Briefcase, Video, Users, PlayCircle } from "lucide-react";
import { benefitsIntro, benefitCountries, type BenefitKind } from "../../data/benefitsData";

// Icon per category kind. Neutral stone circle with the icon itself in MSA red.
const kindIcon: Record<BenefitKind, typeof GraduationCap> = {
  training: GraduationCap,
  health: Heart,
  business: Briefcase,
};

// Resource links at the bottom — deep-link into the Training section's tabs
// (order there: Webinars → On Demand → Hands-On).
const quickLinks = [
  { label: "Training Schedule", to: "/members/training?tab=webinars", icon: Video },
  { label: "Hands-On Training Schedule", to: "/members/training?tab=hands-on", icon: Users },
  { label: "On-Demand Training", to: "/members/training?tab=on-demand", icon: PlayCircle },
];

export default function Benefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Intro */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-4">Member Benefits</h1>
        <div className="space-y-3 max-w-3xl">
          {benefitsIntro.map((p, i) => (
            <p key={i} className="text-stone-600 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>

      {/* Country sections */}
      <div className="space-y-10">
        {benefitCountries.map(country => (
          <section key={country.code}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" aria-hidden>{country.flag}</span>
              <h2 className="text-xl font-bold text-stone-900">{country.name}</h2>
            </div>

            <div
              className={`grid gap-6 ${
                country.categories.length === 2
                  ? "sm:grid-cols-2 max-w-3xl mx-auto"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {country.categories.map(cat => {
                const Icon = kindIcon[cat.kind];
                return (
                  <Link
                    key={cat.slug}
                    to={`/members/benefits/${cat.slug}`}
                    className="flex flex-col bg-white rounded-xl border border-stone-200 p-6 hover:border-[#D7272D] hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-stone-200 transition-colors">
                      <Icon className="w-6 h-6 text-[#D7272D]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{cat.label}</h3>
                    <p className="text-sm text-stone-600 mb-3 flex-1">{cat.blurb}</p>
                    <div className="text-sm font-semibold text-[#D7272D] group-hover:underline">
                      View {cat.label} Benefits →
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-12 bg-white rounded-xl border border-stone-200 p-6">
        <h2 className="font-semibold mb-4">Training resources</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {quickLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-700 hover:border-[#D7272D] hover:text-[#D7272D] transition-colors"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
