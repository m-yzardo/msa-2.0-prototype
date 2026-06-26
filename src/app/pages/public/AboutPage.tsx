import { Link } from "react-router";
import { User } from "lucide-react";

const trainers = [
  {
    name: "Rick Kuemin",
    title: "Director of Training",
    bio: "30+ years in the appliance repair field before becoming Director of Training for the Marcone Service Association. Since 2011, Rick has hosted 110+ training sessions attracting more than 2,000 technicians annually. His hands-on style and constantly updated curriculum give students a competitive edge in the field.",
  },
  {
    name: "George Schick",
    title: "Director of Virtual Training",
    bio: "Former GE Factory Service zone manager with decades managing technicians, training departments, and service operations. George transitioned into training in the early 90s and now leads MSA's virtual and online education programs. Military veteran.",
  },
  {
    name: "Mitch Williams",
    title: "National Trainer",
    bio: "Background spanning big-box repair centers, Haier parts and service, and regional service management. Mitch has returned to his passion — hands-on technical training — as MSA's national trainer.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Our Mission</h1>
          <p className="text-lg font-semibold text-stone-900 mb-6 leading-relaxed">
            Our mission is to continually improve the appliance service industry by being the first, best and most reliable source of practical information for the progressive servicer.
          </p>
          <p className="text-stone-600 leading-relaxed">
            We believe in the power of community, education and experience. That's why we provide hands-on training, access to resource libraries and a variety of business programs and personal benefits — all while bringing together a network of dedicated and knowledgeable servicers, business owners and industry experts.
          </p>
        </div>
      </section>

      {/* About MSA */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">About MSA</h2>
          <p className="text-stone-600 leading-relaxed">
            Since 1998, MSA has been the leading trade organization for independent servicers and home service businesses. Our diverse benefits range from hands-on and virtual training to professional and personal programs that strengthen the more than 3,000 member service companies and 5,000 technicians who rely on us every year. MSA is powered by Marcone, North America's largest parts distributor, and strategically partners with major manufacturers to bring you the most current and valuable opportunities and resources on the market.
          </p>
        </div>
      </section>

      {/* Our Trainers */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Our Trainers</h2>
            <p className="text-stone-600">
              Master technicians, professional educators — meet the experts behind MSA's professional training programs.
            </p>
          </div>

          <div className="grid gap-8">
            {trainers.map((trainer) => (
              <div
                key={trainer.name}
                className="bg-white rounded-2xl border border-stone-200 p-8 flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0">
                  <User className="w-10 h-10 text-stone-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-1">{trainer.name}</h3>
                  <p className="text-[#D7272D] font-medium text-sm mb-3">{trainer.title}</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{trainer.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join the MSA Community?</h2>
          <p className="text-stone-300 mb-8">
            Become part of the leading trade organization for independent appliance servicers.
          </p>
          <Link
            to="/join"
            className="bg-[#D7272D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b92127] transition-colors inline-block"
          >
            Join MSA Pro
          </Link>
        </div>
      </section>
    </div>
  );
}
