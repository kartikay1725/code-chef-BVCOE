"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Trophy, Coffee, Code, Gamepad2, Award } from "lucide-react"
import { useState } from "react"

export function PastEvents() {
  const [activeCategory, setActiveCategory] = useState<"technical" | "non-technical">("technical")

  const technicalEvents = [
    {
      title: "CodeChef Cook-Off Championship",
      date: "March 15, 2024",
      participants: 150,
      description: "Monthly competitive programming contest with algorithmic challenges",
      icon: <Code className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["50+ Problems Solved", "3 Hour Duration", "Live Leaderboard"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/20 to-cyan-900/20",
    },
    {
      title: "Algorithm Workshop Series",
      date: "February 20, 2024",
      participants: 80,
      description: "Intensive workshop on advanced data structures and algorithms",
      icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Expert Mentors", "Hands-on Practice", "Certificate Awarded"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-900/20 to-pink-900/20",
    },
    {
      title: "Hackathon 2024",
      date: "January 12-14, 2024",
      participants: 200,
      description: "48-hour coding marathon with innovative project development",
      icon: <Code className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["48 Hours", "Team Projects", "Industry Judges"],
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-900/20 to-teal-900/20",
    },
  ]

  const nonTechnicalEvents = [
    {
      title: "Tech Talk & Networking",
      date: "March 8, 2024",
      participants: 120,
      description: "Industry experts sharing insights on career development",
      icon: <Coffee className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Industry Speakers", "Career Guidance", "Networking"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20",
    },
    {
      title: "Gaming Tournament",
      date: "February 14, 2024",
      participants: 90,
      description: "Fun gaming competition to build community bonds",
      icon: <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Multiple Games", "Prizes", "Team Building"],
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-900/20 to-purple-900/20",
    },
    {
      title: "Team Building Retreat",
      date: "January 20, 2024",
      participants: 60,
      description: "Outdoor activities and team bonding exercises",
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      achievements: ["Outdoor Activities", "Team Bonding", "Leadership Skills"],
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
        className={`bg-gradient-to-br ${event.bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-700/50 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-primary/10 h-full`}
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
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
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

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-700">
            <h3 className="text-xl md:text-2xl font-bold font-poppins text-white mb-4 md:mb-6">Event Timeline</h3>
            <div className="flex justify-center items-center gap-3 md:gap-4 flex-wrap">
              {["Jan", "Feb", "Mar", "Apr"].map((month, i) => (
                <motion.div
                  key={month}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-400">{month}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
