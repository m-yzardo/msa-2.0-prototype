import { Link } from "react-router";
import { FileText, GraduationCap, Heart, Briefcase, Users, BookOpen, Lock, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-[#D7272D] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Complete Resource for Appliance Service Excellence
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 mb-8">
              Join 3,400+ independent appliance service companies with access to 9,500+ technical documents, expert training, and business benefits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/join"
                className="bg-[#D7272D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b92127] transition-colors inline-flex items-center gap-2"
              >
                Join MSA Pro <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition-colors"
              >
                Member Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-stone-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D7272D]">3,400+</div>
              <div className="text-stone-600 mt-1">Member Companies</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D7272D]">9,500+</div>
              <div className="text-stone-600 mt-1">Technical Documents</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D7272D]">50+</div>
              <div className="text-stone-600 mt-1">Training Sessions/Year</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D7272D]">24/7</div>
              <div className="text-stone-600 mt-1">Member Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D7272D] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Documents</h3>
              <p className="text-stone-600">
                Service manuals, wiring diagrams, fault codes, and technical sheets for all major appliance brands
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D7272D] rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Training</h3>
              <p className="text-stone-600">
                Live webinars, on-demand videos, and hands-on training with master technicians
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D7272D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Benefits</h3>
              <p className="text-stone-600">
                Access to affordable health insurance and wellness programs for you and your team
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D7272D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Benefits</h3>
              <p className="text-stone-600">
                Vendor discounts, networking opportunities, and business development resources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Who We Are</h2>
            <p className="text-lg text-stone-600 mb-8">
              Since 1998, MSA has been the go-to trade organization for independent servicers. We're built by the industry, for the industry — 3,000+ member companies strong.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-stone-800 transition-colors"
            >
              Learn About MSA <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Paywall Preview - Document Library */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-stone-200 px-4 py-2 rounded-full mb-4">
              <Lock className="w-4 h-4 text-stone-600" />
              <span className="text-sm font-semibold text-stone-700">MEMBERS ONLY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Document Library
            </h2>
            <p className="text-xl text-stone-600">
              Instant access to service manuals, wiring diagrams, and technical bulletins
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { brand: "Whirlpool", type: "Dishwasher", doc: "Service Manual", model: "WDF520PADM" },
                { brand: "LG", type: "Refrigerator", doc: "Wiring Diagram", model: "LFXS26973S" },
                { brand: "KitchenAid", type: "Range", doc: "Fault Codes", model: "KFGG500ESS" },
                { brand: "Maytag", type: "Washer", doc: "Tech Sheet", model: "MVWC465HW" },
                { brand: "Bosch", type: "Dishwasher", doc: "Parts Breakdown", model: "SHE878WD5N" },
                { brand: "Jenn-Air", type: "Cooktop", doc: "Service Bulletin", model: "JGC7636BS" },
              ].map((doc, i) => (
                <div key={i} className="bg-white rounded-lg border border-stone-200 p-6 opacity-50 blur-sm">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{doc.brand}</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{doc.type}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{doc.doc}</h3>
                  <p className="text-sm text-stone-600">Model: {doc.model}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
                <Lock className="w-12 h-12 text-[#D7272D] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Join to Unlock</h3>
                <p className="text-stone-600 mb-6">
                  Get instant access to 9,500+ technical documents
                </p>
                <Link
                  to="/join"
                  className="bg-[#D7272D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors inline-block"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-stone-600">One membership. Full access to everything.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#D7272D] p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">MSA Pro Membership</h3>
                <div className="text-5xl font-bold text-[#D7272D] mb-2">
                  Starting at [Price]/year
                </div>
                <p className="text-stone-600">US and Canada pricing available</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "9,500+ technical documents and service manuals",
                  "Unlimited access to webinars and training sessions",
                  "Ask a Trainer - Expert Q&A support",
                  "MSA Hotline - 1-on-1 master technician calls",
                  "Health and wellness benefits",
                  "Business development resources",
                  "Vendor discounts and partnerships",
                  "Annual conference access (Las Vegas, October 2026)",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-stone-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className="w-full bg-[#D7272D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b92127] transition-colors text-center block text-lg"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Convention Banner */}
      <section className="relative overflow-hidden bg-[#0f1827] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1827] via-[#1a2740] to-[#0f1827]" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D7272D]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D7272D] opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#D7272D] opacity-5 rounded-full -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D7272D]" />
              <span className="text-[#D7272D] font-semibold tracking-widest text-xs uppercase">Featured Event</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              MSA Annual Convention 2026
            </h2>
            <p className="text-[#D7272D] font-semibold text-lg mb-3">Las Vegas, NV — October 2026</p>
            <p className="text-stone-300 text-lg mb-10 leading-relaxed">
              Join thousands of servicers for hands-on training, manufacturer showcases, and the biggest networking event in the appliance repair industry.
            </p>
            <a
              href="/convention"
              className="inline-flex items-center gap-2 bg-[#D7272D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b92127] transition-colors"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Level Up Your Service Business?
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            Join thousands of appliance service professionals who trust MSA World for their technical resources and business growth.
          </p>
          <Link
            to="/login"
            className="bg-[#D7272D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b92127] transition-colors inline-flex items-center gap-2 text-lg"
          >
            Join MSA Pro <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
