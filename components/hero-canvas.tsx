"use client"

import type React from "react"

import { useDroppable } from "@dnd-kit/core"
import { HeroElementRenderer } from "./hero-element-renderer"
import type { HeroElement } from "./hero-builder"
import { Layout, ImageIcon, Video } from "lucide-react"

interface HeroCanvasProps {
  elements: HeroElement[]
  selectedElement: HeroElement | null
  onSelectElement: (element: HeroElement) => void
  onUpdateElement: (id: string, props: Record<string, any>) => void
  onDeleteElement: (id: string) => void
  isEditMode: boolean
  backgroundColor: string
  onBackgroundColorChange: (color: string) => void
}

export function HeroCanvas({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  isEditMode,
  backgroundColor,
  onBackgroundColorChange,
}: HeroCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({ id: "hero-canvas" })

  const backgroundElements = elements.filter((el) => el.props.isBackground)
  const foregroundElements = elements.filter((el) => !el.props.isBackground)

  const handleBackgroundMediaUpload = (elementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          onUpdateElement(elementId, { src: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 relative min-h-screen lg:min-h-auto">
      <div
        ref={setNodeRef}
        className={`
        min-h-screen relative overflow-hidden
        flex flex-col justify-center items-center px-4 md:px-6 lg:px-12 xl:px-16 py-8 md:py-16 lg:py-20 xl:py-32 transition-all
        ${isOver && isEditMode ? "border-2 border-dashed border-[#1E90FF]" : ""}
        ${isEditMode ? "border-2 border-dashed border-gray-700 lg:border-gray-700" : ""}
      `}
        style={{
          backgroundColor: backgroundElements.length === 0 ? backgroundColor : "transparent",
          paddingBottom: isEditMode ? "20rem" : "2rem", // Extra padding on mobile for customizer
        }}
      >
        {/* Background Elements */}
        {backgroundElements.map((element) => {
          const backgroundSrc = element.props.src?.trim()

          // Show upload prompt for background elements without source
          if (!backgroundSrc && isEditMode) {
            return (
              <div
                key={`bg-${element.id}`}
                className="absolute inset-0 w-full h-full bg-gray-900/50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800/50 transition-all group border-2 border-dashed border-gray-600 hover:border-[#1E90FF]/50"
                onClick={(e) => {
                  e.stopPropagation()
                  const input = document.createElement("input")
                  input.type = "file"
                  input.accept = element.type === "image" ? "image/*" : "video/mp4,video/webm,video/ogg"
                  input.onchange = (event) => handleBackgroundMediaUpload(element.id, event as any)
                  input.click()
                }}
              >
                {element.type === "image" ? (
                  <ImageIcon className="w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 text-gray-500 group-hover:text-[#1E90FF] mb-3 md:mb-6 transition-colors" />
                ) : (
                  <Video className="w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 text-gray-500 group-hover:text-[#1E90FF] mb-3 md:mb-6 transition-colors" />
                )}
                <p className="text-gray-300 text-sm md:text-lg lg:text-xl font-medium font-poppins group-hover:text-[#1E90FF] mb-2 md:mb-3 text-center px-4 md:px-6 transition-colors">
                  Click to upload background {element.type}
                </p>
                <p className="text-gray-400 text-xs md:text-sm lg:text-base text-center px-4 md:px-6 font-poppins">
                  {element.type === "image" ? "JPG, PNG, GIF up to 10MB" : "MP4, WebM, OGG up to 50MB"}
                </p>
              </div>
            )
          }

          if (!backgroundSrc) return null

          return (
            <div
              key={`bg-${element.id}`}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: element.props.backgroundOpacity || 0.5 }}
            >
              {element.type === "image" && (
                <img
                  src={backgroundSrc || "/placeholder.svg"}
                  alt={element.props.alt || "Background"}
                  className="w-full h-full object-cover"
                />
              )}
              {element.type === "video" && (
                <video src={backgroundSrc} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              )}
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )
        })}

        {/* Drop zone indicator */}
        {isOver && isEditMode && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#1E90FF]/10 border-2 border-dashed border-[#1E90FF] rounded-lg">
            <div className="bg-[#1E90FF] text-white px-4 py-2 md:px-8 md:py-4 rounded-lg md:rounded-xl font-medium font-poppins shadow-lg text-sm md:text-base">
              Drop element here
            </div>
          </div>
        )}

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-7xl">
          {foregroundElements.length === 0 && isEditMode ? (
            <div className="text-center py-8 md:py-16 lg:py-24 xl:py-32">
              <Layout className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 mx-auto text-gray-500 mb-3 md:mb-6 lg:mb-8" />
              <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-400 mb-2 md:mb-3 lg:mb-4 font-poppins">
                Build Your Hero Section
              </h3>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg font-poppins px-4">
                Drag elements from above to create your hero
              </p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12 text-center">
              {foregroundElements
                .sort((a, b) => a.order - b.order)
                .map((element) => (
                  <HeroElementRenderer
                    key={element.id}
                    element={element}
                    isSelected={selectedElement?.id === element.id}
                    onSelect={() => onSelectElement(element)}
                    onUpdate={onUpdateElement}
                    onDelete={onDeleteElement}
                    isEditMode={isEditMode}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Default background decorations (only show when no background elements) */}
        {backgroundElements.length === 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated background particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-[#1E90FF]/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}

            {/* Gradient overlays */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 md:w-40 md:h-40 lg:w-72 lg:h-72 bg-[#1E90FF]/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-28 h-28 md:w-56 md:h-56 lg:w-96 lg:h-96 bg-[#1E90FF]/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-32 md:h-32 lg:w-64 lg:h-64 bg-[#1E90FF]/8 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
