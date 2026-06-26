import { useState } from "react";
import { Phone, Clock, DollarSign, Check, Calendar, User } from "lucide-react";

export default function Hotline() {
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [bookingStep, setBookingStep] = useState<'datetime' | 'details' | 'payment' | 'confirmation'>('datetime');
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [bookedCall, setBookedCall] = useState<any>(null);

  const availableDates = [
    "2026-05-19",
    "2026-05-20",
    "2026-05-21",
    "2026-05-22",
    "2026-05-23",
  ];

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBookCall = () => {
    setShowBookingFlow(true);
    setBookingStep('datetime');
  };

  const handleConfirmBooking = () => {
    const booking = {
      date: selectedDate,
      time: selectedTime,
      topic: topic,
    };
    setBookedCall(booking);
    setBookingStep('confirmation');
  };

  const handleNewBooking = () => {
    setShowBookingFlow(false);
    setBookingStep('datetime');
    setSelectedDate("");
    setSelectedTime("");
    setTopic("");
  };

  if (showBookingFlow) {
    if (bookingStep === 'confirmation') {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Call Booked!</h1>
              <p className="text-stone-600">Your MSA Hotline call has been scheduled</p>
            </div>

            <div className="bg-stone-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4">Call Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#D7272D]" />
                  <div>
                    <p className="text-sm text-stone-600">Date & Time</p>
                    <p className="font-semibold">
                      {new Date(bookedCall.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {bookedCall.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#D7272D]" />
                  <div>
                    <p className="text-sm text-stone-600">Topic</p>
                    <p className="font-semibold">{bookedCall.topic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[#D7272D]" />
                  <div>
                    <p className="text-sm text-stone-600">Cost</p>
                    <p className="font-semibold">$33.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Before Your Call</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Have your model number and serial number ready</li>
                <li>• Be prepared to describe symptoms and error codes</li>
                <li>• Have access to the appliance during the call</li>
                <li>• Keep your tools and multimeter handy</li>
              </ul>
            </div>

            <p className="text-sm text-stone-600 mb-6 text-center">
              You'll be invoiced $33 for this call. A calendar invite has been sent to your email.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowBookingFlow(false)}
                className="flex-1 bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors"
              >
                Back to Hotline
              </button>
              <button
                onClick={handleNewBooking}
                className="flex-1 border-2 border-stone-300 text-stone-700 py-3 rounded-full font-semibold hover:bg-stone-50 transition-colors"
              >
                Book Another Call
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-8">
          <h1 className="text-2xl font-bold mb-2">Book a Hotline Call</h1>
          <p className="text-stone-600 mb-8">
            Schedule a 1-on-1 call with a master technician
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bookingStep === 'datetime' ? 'bg-[#D7272D] text-white' : 'bg-green-100 text-green-700'
              }`}>
                1
              </div>
              <span className="text-sm font-semibold hidden sm:inline">Date & Time</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bookingStep === 'details' ? 'bg-[#D7272D] text-white' :
                bookingStep === 'payment' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-600'
              }`}>
                2
              </div>
              <span className="text-sm font-semibold hidden sm:inline">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bookingStep === 'payment' ? 'bg-[#D7272D] text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                3
              </div>
              <span className="text-sm font-semibold hidden sm:inline">Payment</span>
            </div>
          </div>

          {/* Step 1: Date & Time */}
          {bookingStep === 'datetime' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableDates.map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 border-2 rounded-lg text-sm font-semibold transition-colors ${
                        selectedDate === date
                          ? 'border-[#D7272D] bg-red-50 text-[#D7272D]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-3">
                    Select Time (EST)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border-2 rounded-lg text-sm font-semibold transition-colors ${
                          selectedTime === time
                            ? 'border-[#D7272D] bg-red-50 text-[#D7272D]'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowBookingFlow(false)}
                  className="flex-1 border-2 border-stone-300 text-stone-700 py-3 rounded-full font-semibold hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setBookingStep('details')}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {bookingStep === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  What do you need help with?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={4}
                  placeholder="Describe the appliance issue or topic you need help with..."
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setBookingStep('datetime')}
                  className="flex-1 border-2 border-stone-300 text-stone-700 py-3 rounded-full font-semibold hover:bg-stone-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setBookingStep('payment')}
                  disabled={!topic.trim()}
                  className="flex-1 bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {bookingStep === 'payment' && (
            <div className="space-y-6">
              <div className="bg-stone-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Date:</span>
                    <span className="font-semibold">
                      {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Time:</span>
                    <span className="font-semibold">{selectedTime} EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Duration:</span>
                    <span className="font-semibold">Up to 30 minutes</span>
                  </div>
                  <div className="border-t border-stone-200 pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold text-lg text-[#D7272D]">$33.00</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  You'll be invoiced $33 for this call. Payment is due within 30 days.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setBookingStep('details')}
                  className="flex-1 border-2 border-stone-300 text-stone-700 py-3 rounded-full font-semibold hover:bg-stone-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">MSA Hotline</h1>
        <p className="text-stone-600">
          Live 1-on-1 calls with master technicians for complex repairs
        </p>
      </div>

      {/* Service Info */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Phone className="w-8 h-8 text-orange-600" />
          </div>

          <h2 className="text-2xl font-bold mb-4">How It Works</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[#D7272D] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Book Your Call</h3>
                <p className="text-sm text-stone-600">
                  Choose a date and time that works for you
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[#D7272D] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Prepare Your Details</h3>
                <p className="text-sm text-stone-600">
                  Have your model number, symptoms, and error codes ready
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[#D7272D] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Get Expert Help</h3>
                <p className="text-sm text-stone-600">
                  Receive live guidance from a master technician
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#D7272D] to-[#b92127] text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">What to Expect</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Up to 30 minutes</p>
                <p className="text-sm text-stone-100">
                  Focused troubleshooting time with an expert
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Master Technicians</p>
                <p className="text-sm text-stone-100">
                  20+ years of hands-on appliance repair experience
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">$33 per call</p>
                <p className="text-sm text-stone-100">
                  Invoiced separately from membership
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookCall}
            className="w-full bg-white text-[#D7272D] py-4 rounded-full font-bold hover:bg-stone-100 transition-colors"
          >
            Book a Call
          </button>
        </div>
      </div>

      {/* Upcoming Calls */}
      {bookedCall && (
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-xl font-bold mb-4">Your Upcoming Call</h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-stone-50 rounded-lg">
            <div>
              <p className="font-semibold mb-1">
                {new Date(bookedCall.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {bookedCall.time}
              </p>
              <p className="text-sm text-stone-600">{bookedCall.topic}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-white transition-colors">
                Add to Calendar
              </button>
              <button className="px-4 py-2 text-sm text-[#D7272D] border border-[#D7272D] rounded-lg hover:bg-red-50 transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
