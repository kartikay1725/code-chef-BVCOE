"use client"

import { motion } from "framer-motion"
import { Crown, Github, Linkedin, Mail, Award } from "lucide-react"
import { useState } from "react"

export function CoreTeam() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const coreMembers = [
    {
      name: "Alex Chen",
      role: "President",
      image: "/placeholder.svg?height=200&width=200",
      bio: "5-star coder on CodeChef with expertise in dynamic programming and graph algorithms.",
      github: "alexchen",
      linkedin: "alexchen",
      email: "alex@university.edu",
      achievements: ["ICPC Finalist", "Google Code Jam", "5⭐ CodeChef"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Priya Sharma",
      role: "Vice President",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Competitive programming enthusiast with strong background in number theory and combinatorics.",
      github: "priyasharma",
      linkedin: "priyasharma",
      email: "priya@university.edu",
      achievements: ["ACM ICPC", "CodeForces Expert", "Hackathon Winner"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Full-stack developer and algorithm expert, specializing in optimization problems.",
      github: "davidkim",
      linkedin: "davidkim",
      email: "david@university.edu",
      achievements: ["Open Source Contributor", "Tech Lead", "Algorithm Expert"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Sarah Wilson",
      role: "Event Coordinator",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Passionate about organizing coding competitions and building community engagement.",
      github: "sarahwilson",
      linkedin: "sarahwilson",
      email: "sarah@university.edu",
      achievements: ["Event Organizer", "Community Builder", "Public Speaker"],
      color: "from-green-500 to-teal-500",
    },
  ]

  return (
    <section id="team" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-[#121212] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
            className="inline-flex items-center gap-3 mb-4 md:mb-6"
          >
            <div className="p-2 md:p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full">
              <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-bounce-slow" />
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-4 md:mb-6">Core Team</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Meet the visionary leaders driving our chapter to new heights
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {coreMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredMember(member.name)}
              onHoverEnd={() => setHoveredMember(null)}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-700 hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/20 h-full">
                {/* Profile Image */}
                <div className="relative mb-4 md:mb-6">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative mx-auto">
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${member.color} p-1 shadow-lg`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredMember === member.name ? 1 : 0 }}
                      className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Award className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg md:text-xl font-bold font-poppins text-white mb-1 md:mb-2"
                  >
                    {member.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-primary font-medium mb-3 md:mb-4 text-sm md:text-base"
                  >
                    {member.role}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed px-2"
                  >
                    {member.bio}
                  </motion.p>

                  {/* Achievements */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredMember === member.name ? 1 : 0,
                      height: hoveredMember === member.name ? "auto" : 0,
                    }}
                    className="mb-4 md:mb-6 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {member.achievements.map((achievement, i) => (
                        <motion.div
                          key={achievement}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{
                            x: hoveredMember === member.name ? 0 : -20,
                            opacity: hoveredMember === member.name ? 1 : 0,
                          }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block mx-1"
                        >
                          {achievement}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-2 md:gap-3">
                    {[
                      { icon: Github, href: `https://github.com/${member.github}`, color: "hover:text-gray-300" },
                      {
                        icon: Linkedin,
                        href: `https://linkedin.com/in/${member.linkedin}`,
                        color: "hover:text-blue-400",
                      },
                      { icon: Mail, href: `mailto:${member.email}`, color: "hover:text-green-400" },
                    ].map(({ icon: Icon, href, color }, i) => (
                      <motion.a
                        key={i}
                        href={href}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 bg-gray-800 rounded-lg transition-all duration-300 text-gray-400 ${color} hover:shadow-lg`}
                      >
                        <Icon className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredMember === member.name ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
