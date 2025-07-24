"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Users, Code, Palette, Megaphone, Heart, Star } from "lucide-react"
import { useState } from "react"

export function HeadsAndViceHeads() {
  const [activeTab, setActiveTab] = useState(0)

  const departments = [
    {
      name: "Technical Department",
      shortName: "Tech",
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/30 to-cyan-900/30",
      borderColor: "border-blue-800/50",
      head: {
        name: "Michael Zhang",
        role: "Technical Head",
        skills: ["Algorithm Design", "System Architecture", "Code Review"],
      },
      viceHead: {
        name: "Emma Rodriguez",
        role: "Technical Vice Head",
        skills: ["Data Structures", "Competitive Programming", "Mentoring"],
      },
    },
    {
      name: "Design Department",
      shortName: "Design",
      icon: <Palette className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-900/30 to-pink-900/30",
      borderColor: "border-purple-800/50",
      head: {
        name: "Arjun Patel",
        role: "Design Head",
        skills: ["UI/UX Design", "Brand Identity", "Creative Direction"],
      },
      viceHead: {
        name: "Lisa Thompson",
        role: "Design Vice Head",
        skills: ["Graphic Design", "Web Design", "Prototyping"],
      },
    },
    {
      name: "Marketing Department",
      shortName: "Marketing",
      icon: <Megaphone className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-900/30 to-teal-900/30",
      borderColor: "border-green-800/50",
      head: {
        name: "Ryan Johnson",
        role: "Marketing Head",
        skills: ["Digital Marketing", "Content Strategy", "Social Media"],
      },
      viceHead: {
        name: "Sophia Lee",
        role: "Marketing Vice Head",
        skills: ["Event Promotion", "Community Outreach", "Analytics"],
      },
    },
    {
      name: "Community Relations",
      shortName: "Community",
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-900/30 to-orange-900/30",
      borderColor: "border-red-800/50",
      head: {
        name: "James Wilson",
        role: "Community Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
      },
      viceHead: {
        name: "Maya Singh",
        role: "Community Vice Head",
        skills: ["Member Engagement", "Conflict Resolution", "Networking"],
      },
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#121212] to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="absolute top-1/4 left-1/4 w-1 md:w-2 h-1 md:h-2 bg-primary/30 rounded-full" />
          <div className="absolute top-3/4 right-1/4 w-0.5 md:w-1 h-0.5 md:h-1 bg-primary/20 rounded-full" />
          <div className="absolute bottom-1/4 left-3/4 w-1 md:w-1.5 h-1 md:h-1.5 bg-primary/25 rounded-full" />
        </motion.div>
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
            <Users className="w-6 h-6 md:w-8 md:h-8 text-primary animate-bounce-slow" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-4 md:mb-6">Department Heads</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Leading specialized teams across different domains with expertise and passion
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4"
        >
          {departments.map((dept, index) => (
            <motion.button
              key={dept.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
                activeTab === index
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <motion.div animate={{ rotate: activeTab === index ? 360 : 0 }} transition={{ duration: 0.5 }}>
                {dept.icon}
              </motion.div>
              <span className="hidden sm:inline md:hidden lg:inline">{dept.name}</span>
              <span className="sm:hidden md:inline lg:hidden">{dept.shortName}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className={`bg-gradient-to-br ${departments[activeTab].bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 border ${departments[activeTab].borderColor} hover:border-primary/30 transition-all duration-500 shadow-2xl`}
            >
              {/* Department Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8"
              >
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${departments[activeTab].color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  {departments[activeTab].icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-poppins text-white">
                    {departments[activeTab].name}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">Leadership Team</p>
                </div>
              </motion.div>

              {/* Team Members */}
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                {/* Head */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gray-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <h4 className="font-bold font-poppins text-white text-base md:text-lg mb-1">
                        {departments[activeTab].head.name}
                      </h4>
                      <p className="text-primary font-medium text-sm md:text-base">
                        {departments[activeTab].head.role}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      className="w-6 h-6 md:w-8 md:h-8 bg-primary/20 rounded-full flex items-center justify-center"
                    >
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs md:text-sm font-medium">Key Skills:</p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {departments[activeTab].head.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Vice Head */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gray-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <h4 className="font-bold font-poppins text-white text-base md:text-lg mb-1">
                        {departments[activeTab].viceHead.name}
                      </h4>
                      <p className="text-purple-400 font-medium text-sm md:text-base">
                        {departments[activeTab].viceHead.role}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      className="w-6 h-6 md:w-8 md:h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
                    >
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs md:text-sm font-medium">Key Skills:</p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {departments[activeTab].viceHead.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                          className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full border border-purple-500/20"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
