"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Users, Code, Palette, Megaphone, Heart, Star, Calendar, Pencil, User } from "lucide-react"
import { useState } from "react"

export function HeadsAndViceHeads() {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const departments = [
    {
      name: "Technical Department(Development)",
      shortName: "Tech",
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/30 to-cyan-900/30",
      borderColor: "border-blue-800/50",
      head: {
        name: "Mohit Morya",
        role: "Technical Head",
        skills: ["Algorithm Design", "System Architecture", "Code Review"],
        image: "/development/Mohit.jpg", // Example image path
      },
      head2: {
        name: "Samarth Chawla",
        role: "Technical Head",
        skills: ["Algorithm Design", "System Architecture", "Code Review"],
        image: "/development/samarth.jpg", // Example image path
      },
      viceHead: {
        name: "Kartikay Achint",
        role: "Technical Vice Head",
        skills: ["Data Structures", "Competitive Programming", "Mentoring"],
        image: "/development/kartikay.jpg", // Example image path
      },
    },
    {
      name: "Technical Department(DSA and CP)",
      shortName: "Tech",
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-indigo-500 to-violet-500",
      bgColor: "from-indigo-900/30 to-violet-900/30",
      borderColor: "border-blue-800/50",
      head: {
        name: "Devang",
        role: "Technical Head",
        skills: ["Algorithm Design", "System Architecture", "Code Review"],
        image: "/dsa/Devang.jpg", // Example image path
      },
      head2: {
        name: "Sambhav Gupta",
        role: "Technical Head",
        skills: ["Algorithm Design", "System Architecture", "Code Review"],
        image: "/dsa/Sambhav.jpg", // Example image path
      },
      viceHead: {
        name: "Kamini",
        role: "Technical Vice Head",
        skills: ["Data Structures", "Competitive Programming", "Mentoring"],
        image: "/dsa/Kamini.jpg", // Example image path
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
        name: "Chhavi Gupta",
        role: "Design Head",
        skills: ["UI/UX Design", "Brand Identity", "Creative Direction"],
        image: "/design/Chhavi.jpg", // Example image path
      },
      head2: {
        name: "Dhruv",
        role: "Design Head",
        skills: ["UI/UX Design", "Brand Identity", "Creative Direction"],
        image: "/design/Dhruv.jpg", // Example image path
      },
      viceHead: {
        name: "Akshita",
        role: "Design Vice Head",
        skills: ["Graphic Design", "Web Design", "Prototyping"],
        image: "/design/Akshita.jpg", // Example image path
      },
    },
    {
      name: "Sponsorship Department",
      shortName: "Sponsorship",
      icon: <Megaphone className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-900/30 to-teal-900/30",
      borderColor: "border-green-800/50",
      head: {
        name: "Ayush Tiwari",
        role: "Sponsorship Head",
        skills: ["Digital Marketing", "Content Strategy", "Social Media"],
        image: "/sponsorship/Ayush.jpg", // Example image path
      },
      head2: {
        name: "Abhishek Kumar",
        role: "Sponsorship Head",
        skills: ["Digital Marketing", "Content Strategy", "Social Media"],
        image: "/sponsorship/Abhishek.jpg", // Example image path
      },
      viceHead: {
        name: "Sumit",
        role: "Sponsorship Vice Head",
        skills: ["Event Promotion", "Community Outreach", "Analytics"],
        image: "/sponsorship/Sumit.jpg", // Example image path
      },
    },
    {
      name: "Event Management Department",
      shortName: "Event",
      icon: <Calendar className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-900/30 to-orange-900/30",
      borderColor: "border-red-800/50",
      head: {
        name: "Shivam",
        role: "Event Management Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
        image: "/event/Dabas.jpg", // Example image path
      },
      head2: {
        name: "Richa",
        role: "Event Management Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
        image: "/event/Richa.webp", // Example image path
      },
      viceHead: {
        name: "Tanuj",
        role: "Event Management Vice Head",
        skills: ["Member Engagement", "Conflict Resolution", "Networking"],
        image: "/event/Tanuj.jpg", // Example image path
      },
    },
    {
      name: "Social Media Department",
      shortName: "Media",
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-900/30 to-rose-900/30",
      borderColor: "border-red-800/50",
      head: {
        name: "Sanjana",
        role: "Social Media Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
        image: "/socialMedia/Sanjana.jpg", // Example image path
      },
      head2: {
        name: "Akshat",
        role: "Social Media Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
        image: "/socialMedia/Akshat.jpg", // Example image path
      },
      viceHead: {
        name: "Ruhani",
        role: "Social Media Vice Head",
        skills: ["Member Engagement", "Conflict Resolution", "Networking"],
        image: "/socialMedia/Ruhani.png", // Example image path
      },
    },
    {
      name: "Content Department",
      shortName: "Content",
      icon: <Pencil className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-yellow-500 to-lime-500",
      bgColor: "from-yellow-900/30 to-lime-900/30",
      borderColor: "border-red-800/50",
      head: {
        name: "Anany Aggarwal",
        role: "Content & Documentation Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
        image: "/content/anany.webp", // Example image path
      },
      head2: {
        name: "Akshay",
        role: "Content & Documentation Head",
        skills: ["Relationship Building", "Event Planning", "Team Coordination"],
        image: "/content/akshay.jpg", // Example image path
      },
      viceHead: {
        name: "Mishti",
        role: "Content & Documentation Vice Head",
        skills: ["Member Engagement", "Conflict Resolution", "Networking"],
        image: "/content/Mishti.jpg", // Example image path
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
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${activeTab === index
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredMember && setHoveredMember('head')}
                  onHoverEnd={() => setHoveredMember && setHoveredMember(null)}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-700 hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/20"
                >
                  {/* Profile Image */}
                  <div className="relative mb-4 md:mb-6 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                          {departments[activeTab].head.image ? (
                            <img
                              src={departments[activeTab].head.image}
                              alt={departments[activeTab].head.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 md:w-10 md:h-10 text-primary/60" />
                          )}
                        </div>
                      </div>

                      {/* Floating badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: (setHoveredMember ? hoveredMember === 'head' : true) ? 1 : 0 }}
                        className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center mb-4">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold font-poppins text-white text-lg md:text-xl mb-1 md:mb-2"
                    >
                      {departments[activeTab].head.name}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-primary font-medium text-sm md:text-base mb-3"
                    >
                      {departments[activeTab].head.role}
                    </motion.p>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (setHoveredMember ? hoveredMember === 'head' : false) ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
                  />
                </motion.div>

                {/* Head 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredMember && setHoveredMember('head2')}
                  onHoverEnd={() => setHoveredMember && setHoveredMember(null)}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-700 hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/20"
                >
                  {/* Profile Image */}
                  <div className="relative mb-4 md:mb-6 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                          {departments[activeTab].head2.image ? (
                            <img
                              src={departments[activeTab].head2.image}
                              alt={departments[activeTab].head2.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 md:w-10 md:h-10 text-primary/60" />
                          )}
                        </div>
                      </div>

                      {/* Floating badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: (setHoveredMember ? hoveredMember === 'head2' : true) ? 1 : 0 }}
                        className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center mb-4">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold font-poppins text-white text-lg md:text-xl mb-1 md:mb-2"
                    >
                      {departments[activeTab].head2.name}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-primary font-medium text-sm md:text-base mb-3"
                    >
                      {departments[activeTab].head2.role}
                    </motion.p>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (setHoveredMember ? hoveredMember === 'head2' : false) ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
                  />
                </motion.div>

                {/* Vice Head */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredMember && setHoveredMember('viceHead')}
                  onHoverEnd={() => setHoveredMember && setHoveredMember(null)}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Profile Image */}
                  <div className="relative mb-4 md:mb-6 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/30 to-purple-500/10 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                          {departments[activeTab].viceHead.image ? (
                            <img
                              src={departments[activeTab].viceHead.image}
                              alt={departments[activeTab].viceHead.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 md:w-10 md:h-10 text-purple-400/60" />
                          )}
                        </div>
                      </div>

                      {/* Floating badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: (setHoveredMember ? hoveredMember === 'viceHead' : true) ? 1 : 0 }}
                        className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center mb-4">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold font-poppins text-white text-lg md:text-xl mb-1 md:mb-2"
                    >
                      {departments[activeTab].viceHead.name}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-purple-400 font-medium text-sm md:text-base mb-3"
                    >
                      {departments[activeTab].viceHead.role}
                    </motion.p>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (setHoveredMember ? hoveredMember === 'viceHead' : false) ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
