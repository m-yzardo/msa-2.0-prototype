import { Link, useParams } from "react-router";
import { ArrowLeft, Gift } from "lucide-react";
import { benefitCategories } from "../../data/benefitsData";

export default function BenefitCategory() {
  const { slug } = useParams();
  const category = slug ? benefitCategories[slug] : undefined;

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <Link to="/members/benefits" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Benefits
        </Link>
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <Gift className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h1 className="text-lg font-semibold mb-2">Benefits not found</h1>
          <p className="text-stone-600">We couldn't find that benefits page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Back link */}
      <Link to="/members/benefits" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Benefits
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl" aria-hidden>{category.flag}</span>
        <h1 className="text-3xl font-bold text-stone-900">{category.title}</h1>
      </div>
      {category.intro && (
        <p className="text-stone-600 leading-relaxed max-w-3xl mb-8">{category.intro}</p>
      )}

      {/* Benefits grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.benefits.map(benefit => (
          <div key={benefit.name} className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h2 className="font-semibold text-stone-900">{benefit.name}</h2>
              {benefit.highlight && (
                <span className="flex-shrink-0 bg-red-50 text-[#D7272D] text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {benefit.highlight}
                </span>
              )}
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
