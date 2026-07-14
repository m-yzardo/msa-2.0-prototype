import { useEffect, useState } from "react";
import { Calendar, User, MapPin, CreditCard, Check, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { getRegistrationCost } from "../data/trainingData";
import { currentMember } from "../data/userData";

export interface RegistrationItem {
  title: string;
  subtitle: string; // trainer / presenter
  date: string; // ISO date or human-readable range
  meta?: string; // location, time, or other line
  image?: string;
  kind: "hands-on" | "webinar" | "virtual";
}

interface RegistrationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: RegistrationItem | null;
  onConfirm: () => void;
}

// A self-contained "cart + checkout" drawer: shows what you're registering for,
// the price, and the payment method — all confirmed in one place. On confirm it
// swaps to a success state, then auto-closes after a beat.
export default function RegistrationDrawer({
  open,
  onOpenChange,
  item,
  onConfirm,
}: RegistrationDrawerProps) {
  const [confirmed, setConfirmed] = useState(false);

  // Reset to the transaction view every time the drawer opens. This must key off
  // the `open` prop rather than the Sheet's onOpenChange, because Radix only fires
  // that callback for its own events (X / overlay / Escape) — not when the parent
  // opens the drawer programmatically for a newly clicked training.
  useEffect(() => {
    if (open) setConfirmed(false);
  }, [open]);

  // After a successful registration, hold the success view briefly, then close.
  // Cleaning up the timer prevents a stale close from firing on a fresh reopen.
  useEffect(() => {
    if (!confirmed) return;
    const t = setTimeout(() => onOpenChange(false), 2500);
    return () => clearTimeout(t);
  }, [confirmed, onOpenChange]);

  const handleComplete = () => {
    onConfirm();
    setConfirmed(true);
  };

  const cost = item ? getRegistrationCost(item.kind) : { price: 0 };
  const isFree = cost.price === 0;
  const priceLabel = isFree ? "Included in your membership" : `$${cost.price}`;

  // Try to format an ISO date nicely; fall back to the raw string (e.g. ranges).
  const formatDate = (date: string) => {
    const d = new Date(date);
    return isNaN(d.getTime())
      ? date
      : d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 gap-0">
        {!item ? null : confirmed ? (
          // ── Success view ──────────────────────────────────────────────
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">You're registered!</h2>
              <p className="text-sm text-stone-500 mt-1">A confirmation has been sent to {currentMember.email}.</p>
            </div>
            <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-left">
              <p className="font-semibold text-stone-900">{item.title}</p>
              <p className="text-sm text-stone-600 mt-1">{formatDate(item.date)}</p>
            </div>
            <button className="text-sm text-[#D7272D] font-semibold hover:underline">
              Add to calendar
            </button>
          </div>
        ) : (
          // ── Transaction view ──────────────────────────────────────────
          <>
            <SheetHeader className="border-b border-stone-200 p-6">
              <SheetTitle className="text-lg">Your registration</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Item summary */}
              <div className="flex gap-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-stone-800 to-stone-600 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 leading-snug">{item.title}</p>
                  <div className="mt-1.5 space-y-1 text-sm text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{item.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    {item.meta && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{item.meta}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Transaction type + price */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Transaction</span>
                  <span className="font-medium text-stone-900">Registration</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Price</span>
                  <span className="font-medium text-stone-900">{priceLabel}</span>
                </div>
              </div>

              {/* Member perk */}
              {cost.perk && (
                <div className="flex items-start gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-600">
                  <Info className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                  <span>{cost.perk}</span>
                </div>
              )}

              {/* Payment method */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-stone-900">Payment method</span>
                  {!isFree && (
                    <button className="text-xs text-stone-400 hover:text-stone-600">Change</button>
                  )}
                </div>
                {isFree ? (
                  <div className="border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-600">
                    No payment required — this session is part of your MSA membership.
                  </div>
                ) : (
                  <div className="flex items-center gap-3 border-2 border-[#D7272D] rounded-lg px-4 py-3">
                    <CreditCard className="w-5 h-5 text-stone-700 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-stone-900">
                        {currentMember.savedCard.brand} ending {currentMember.savedCard.last4}
                      </p>
                      <p className="text-stone-500 text-xs">
                        Membership account · exp {currentMember.savedCard.exp}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer: total + CTA */}
            <div className="mt-auto border-t border-stone-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900">Total</span>
                <span className="font-bold text-stone-900">{priceLabel}</span>
              </div>
              <button
                onClick={handleComplete}
                className="w-full py-3 bg-[#D7272D] text-white rounded-full font-semibold hover:bg-[#b92127] transition-colors"
              >
                Complete registration
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
