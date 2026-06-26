import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Upload, Check } from "lucide-react";

const brands = ["Amana", "Bosch", "Jenn-Air", "KitchenAid", "LG", "Maytag", "Roper", "Whirlpool", "Other"];
const applianceTypes = ["Dishwasher", "Refrigerator", "Range", "Washer", "Dryer", "Cooktop", "Microwave", "Oven", "Other"];

export default function SubmitQuestion() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    brand: "",
    applianceType: "",
    model: "",
  });
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedImage(file.name);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4">Question Submitted!</h1>

          <p className="text-lg text-stone-600 mb-6">
            Your question has been submitted to our expert trainers. You'll receive an answer within 1 business day.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              Once answered, your question will appear in the shared Q&A archive where other members can benefit from the answer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/members/ask-a-trainer"
              className="px-6 py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors"
            >
              View All Q&As
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: "",
                  question: "",
                  brand: "",
                  applianceType: "",
                  model: "",
                });
                setAttachedImage(null);
              }}
              className="px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-full font-semibold hover:bg-stone-50 transition-colors"
            >
              Ask Another Question
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <Link
        to="/members/ask-a-trainer"
        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Q&A Archive
      </Link>

      <div className="bg-white rounded-2xl border border-stone-200 px-[16px] py-[20px]">
        <h1 className="text-2xl font-bold mb-2">Ask a Trainer</h1>
        <p className="text-stone-600 mb-6">
          Get expert help from our master technicians. Provide as much detail as possible for the best answer.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Question Title <span className="text-[#D7272D]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Whirlpool washer not draining - F21 error code"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Question Details <span className="text-[#D7272D]">*</span>
            </label>
            <textarea
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              rows={6}
              placeholder="Be specific — include symptoms, error codes, and what you've already tried"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent resize-none"
            />
            <p className="text-xs text-stone-500 mt-1">
              The more details you provide, the better answer you'll receive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Appliance Brand
              </label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
              >
                <option value="">Select brand...</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Appliance Type
              </label>
              <select
                value={formData.applianceType}
                onChange={(e) => setFormData({ ...formData, applianceType: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
              >
                <option value="">Select type...</option>
                {applianceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Model Number
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="e.g., WFW9151YW00"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Attach Image (Optional)
            </label>
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-[#D7272D] transition-colors">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                {attachedImage ? (
                  <p className="text-sm text-stone-700 font-semibold">{attachedImage}</p>
                ) : (
                  <>
                    <p className="text-sm text-stone-700 font-semibold mb-1">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-stone-500">
                      Photo of the appliance, error code, or component
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors"
            >
              Submit Question
            </button>
            <Link
              to="/members/ask-a-trainer"
              className="flex-1 border-2 border-stone-300 text-stone-700 py-3 rounded-full font-semibold hover:bg-stone-50 transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
