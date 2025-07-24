interface HeroSectionProps {
  heading: string
  subheading: string
  buttonText: string
  backgroundColor: string
  isPreview?: boolean
}

export function HeroSection({ heading, subheading, buttonText, backgroundColor, isPreview = false }: HeroSectionProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${isPreview ? "p-4" : "p-12"}`} style={{ backgroundColor }}>
      <div className="relative z-10 text-center text-white">
        <h1 className={`font-bold mb-4 ${isPreview ? "text-lg" : "text-4xl md:text-6xl"}`}>{heading}</h1>
        <p className={`mb-8 opacity-90 ${isPreview ? "text-xs" : "text-xl md:text-2xl"}`}>{subheading}</p>
        <button
          className={`
            bg-white text-gray-900 font-semibold rounded-lg transition-transform hover:scale-105
            ${isPreview ? "px-3 py-1 text-xs" : "px-8 py-3 text-lg"}
          `}
        >
          {buttonText}
        </button>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}
