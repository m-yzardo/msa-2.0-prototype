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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
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
        <p className="text-stone-600 leading-relaxed mb-8">{category.intro}</p>
      )}

      {/* Grouped benefit sections */}
      {category.groups.map(group => (
        <section key={group.title} className="mb-8 last:mb-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500 mb-3">
            {group.title}
          </h2>
          <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
            {group.benefits.map(benefit => (
              <div key={benefit.name} className="flex flex-col sm:flex-row gap-4 p-5">
                {benefit.image && (
                  <div className="sm:w-28 flex-shrink-0">
                    <img
                      src={benefit.image}
                      alt={benefit.name}
                      loading="lazy"
                      className="h-12 w-auto max-w-[7rem] object-contain object-left"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-stone-900">{benefit.name}</h3>
                    {benefit.highlight && (
                      <span className="flex-shrink-0 bg-red-50 text-[#D7272D] text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                        {benefit.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{benefit.description}</p>
                  {benefit.links && benefit.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                      {benefit.links.map(link => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-semibold text-[#D7272D] hover:underline"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Contact footer */}
      {category.contact && category.contact.length > 0 && (
        <p className="text-sm text-stone-500 mt-8">
          Questions about these benefits? Contact{" "}
          {category.contact.map((c, i) => (
            <span key={c.href}>
              {i > 0 && " or "}
              <a href={c.href} className="text-[#D7272D] font-semibold hover:underline">{c.label}</a>
            </span>
          ))}
          .
        </p>
      )}
    </div>
  );
}
