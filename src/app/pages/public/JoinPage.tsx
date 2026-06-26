import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { CheckCircle, ArrowRight } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

const benefits = [
  "9,500+ technical documents and service manuals",
  "Unlimited webinars and training sessions",
  "Ask a Trainer — Expert Q&A support",
  "MSA Hotline — 1-on-1 master technician calls",
  "Health and wellness benefits",
  "Business development resources",
  "Vendor discounts and partnerships",
  "Annual conference access (Las Vegas, October 2026)",
];

export default function JoinPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-3">You're in!</h1>
          <p className="text-stone-600 mb-8">
            Welcome to MSA. Your application has been received — check your inbox for next steps.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-[#D7272D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors"
          >
            Go to Login <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Join MSA Pro</h1>
          <p className="text-stone-600">
            Already a member?{" "}
            <Link to="/login" className="text-[#D7272D] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">First Name</label>
                  <input
                    {...register("firstName", { required: "Required" })}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                    placeholder="Jane"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Last Name</label>
                  <input
                    {...register("lastName", { required: "Required" })}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                  })}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                  placeholder="jane@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", { required: "Required" })}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                  placeholder="(555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Company Name</label>
                  <input
                    {...register("company", { required: "Required" })}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                    placeholder="Smith Appliance Repair"
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Your Role</label>
                  <select
                    {...register("role", { required: "Required" })}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent bg-white"
                  >
                    <option value="">Select role</option>
                    <option>Owner / Operator</option>
                    <option>Technician</option>
                    <option>Service Manager</option>
                    <option>Other</option>
                  </select>
                  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                <input
                  type="password"
                  {...register("password", { required: "Required", minLength: { value: 8, message: "At least 8 characters" } })}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                  placeholder="Min. 8 characters"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Required",
                    validate: (v) => v === password || "Passwords do not match",
                  })}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="agree"
                  {...register("agree", { required: "You must agree to continue" })}
                  className="mt-1 accent-[#D7272D]"
                />
                <label htmlFor="agree" className="text-sm text-stone-600">
                  I agree to the MSA{" "}
                  <a href="#" className="text-[#D7272D] hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#D7272D] hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.agree && <p className="text-red-500 text-xs -mt-3">{errors.agree.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D7272D] text-white py-3.5 rounded-full font-semibold hover:bg-[#b92127] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting…" : <>Create My Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>

          {/* Plan summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 sticky top-24">
              <div className="text-xs font-semibold tracking-widest text-[#D7272D] uppercase mb-1">Selected Plan</div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">MSA Pro Membership</h2>
              <div className="text-3xl font-bold text-stone-900 mb-1">Starting at [Price]<span className="text-base font-normal text-stone-500">/year</span></div>
              <p className="text-stone-500 text-sm mb-6">US and Canada pricing available</p>

              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
