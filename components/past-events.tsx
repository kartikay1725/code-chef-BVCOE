"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Trophy, Coffee, Code, Gamepad2, Award, Star } from "lucide-react"
import { useState } from "react"

export function PastEvents() {
  const [activeCategory, setActiveCategory] = useState<"technical" | "non-technical">("technical")

  const flagshipEvent = {
    title: "BVEST.XI",
    date: "October 19-20, 2024",
    participants: 500,
    description: "Our annual flagship tech fest featuring competitions, workshops, and keynote speakers from top tech companies. A 2-day extravaganza celebrating innovation and technology.",
    icon: <Star className="w-4 h-4 md:w-5 md:h-5" />,
    achievements: ["20+ Events", "₹50,000 Prize Pool", "Industry Leaders", "Hackathon", "Networking"],
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-900/20 to-amber-900/20",
  }

  const technicalEvents = [
    {
      title: "Idea Roulette at BVEST.XI",
      date: "October 24 , 2024",
      participants: 232,
      description: "Innovation challenge on Oct 19, 2024, with ₹8,000 prize pool, rewarding Best Tech and Most Novel Idea. A day of rapid ideas and collaboration.",
      icon: <Code className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Rapid Ideation Rounds", "₹8,000 Prize Pool", "Real-Time Expert Feedback"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/20 to-cyan-900/20",
    },
    {
      title: "Roadmap to DSA Webinar",
      date: " January 31, 2025",
      participants: 105,
      description: "An expert-led webinar by Amazon SDE-2 Pawan Kumar and Coding Blocks' Prakash Kumar Prasad, offering insights into DSA, coding strategies, and interview prep for tech career success.",
      icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Expert Speaker Panel", "Structured Learning Path", "Career-Focused Insights"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-900/20 to-pink-900/20",
    },
    {
      title: "Dataverse",
      date: "February 22, 2025",
      participants: 70,
      description: "Data analytics workshop with live Excel & Power BI training, led by expert Sanchita Bhatia. Students built dashboards and competed in a hands-on challenge.",
      icon: <Code className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Expert Mentorship", "Strong Turnout", "Career Readiness"],
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-900/20 to-teal-900/20",
    },
  ]

  const nonTechnicalEvents = [
    {
      title: "MBA Insights: Navigating Your Career",
      date: "September 3, 2024",
      participants: 61,
      description: "Seminar by Mr. Sudeep Chauhan on Sept 3, 2024, offering industry insights, career strategies, and networking, with e-certificates for participants.",
      icon: <Coffee className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Industry Expert Insights", "Networking Opportunity", "Career-Focused Content"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20",
    },
    {
      title: "Learn to Create",
      date: "February 8, 2025",
      participants: 76,
      description: "Webinar on Visual Storytelling by expert Ms. Palak Ray, covering Canva and AI tools for resumes and content creation, with live demos, hands-on workshops, and creative competitions.",
      icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["AI-Powered Design Workshop", "Practical Insights", "Expert-Led Session"],
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-900/20 to-purple-900/20",
    },
    {
      title: "IPL Mega Auction: Stake and Take",
      date: "April 17-21, 2025",
      participants: 100,
      description: "A fantasy cricket auction where participants used a ₹100 CR budget to build IPL teams through online and offline rounds, blending cricket knowledge with strategic bidding and team management.",
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Strategic Team Building", "Real Auction Thrill", "Two-Stage Format"],
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-900/20 to-rose-900/20",
    },
  ]

  const EventCard = ({ event, index, delay }: { event: any; index: number; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative"
    >
      <div
        className={`bg-gradient-to-br ${event.bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-700/50 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-primary/10 h-full `}
      >
        {/* Event Header */}
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${event.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            {event.icon}
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold font-poppins text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-400 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span>{event.participants} participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{event.description}</p>

        {/* Achievements */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-400">
            <Award className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span>Key Highlights:</span>
          </div>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {event.achievements.map((achievement: string, i: number) => (
              <motion.span
                key={achievement}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.1 }}
                viewport={{ once: true }}
                className="text-xs bg-primary/10 text-primary px-2 md:px-3 py-1 rounded-full border border-primary/20"
              >
                {achievement}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
        />
      </div>
    </motion.div>
  )

  return (
    <section
      id="events"
      className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-[#121212] relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-2 md:p-3 bg-primary/10 rounded-full mb-4 md:mb-6"
          >
            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary animate-bounce-slow" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-4 md:mb-6">Past Events</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Celebrating our journey through memorable events and achievements
          </p>
        </motion.div>

        {/* Flagship Event Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-900/30 text-yellow-500 px-4 py-2 rounded-full border border-yellow-700/50 mb-4">
              <Star className="w-4 h-4" />
              <span className="font-medium">Flagship Event</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Our Premier Annual Event</h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <EventCard event={flagshipEvent} index={0} delay={0.2} />
          </div>
        </motion.div>

        {/* Category Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12 md:mb-16 px-4"
        >
          <div className="bg-gray-800 rounded-xl md:rounded-2xl p-1 md:p-2 border border-gray-700 w-full max-w-md">
            <div className="flex gap-1 md:gap-2">
              {[
                {
                  key: "technical",
                  label: "Technical",
                  fullLabel: "Technical Events",
                  icon: <Code className="w-3 h-3 md:w-4 md:h-4" />,
                },
                {
                  key: "non-technical",
                  label: "Non-Tech",
                  fullLabel: "Non-Technical Events",
                  icon: <Coffee className="w-3 h-3 md:w-4 md:h-4" />,
                },
              ].map((category) => (
                <motion.button
                  key={category.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.key as "technical" | "non-technical")}
                  className={`flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-xs md:text-base flex-1 ${
                    activeCategory === category.key
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline md:hidden lg:inline">{category.fullLabel}</span>
                  <span className="sm:hidden md:inline lg:hidden">{category.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(activeCategory === "technical" ? technicalEvents : nonTechnicalEvents).map((event, index) => (
            <EventCard key={event.title} event={event} index={index} delay={0.2 + index * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}