"use client"

import type React from "react"
import { useDraggable } from "@dnd-kit/core"
import { Type, Heading1, ImageIcon, Video, MousePointer, Plus } from "lucide-react"

interface DraggableElementProps {
  id: string
  icon: React.ReactNode
  label: string
  description: string
  onMobileAdd?: () => void
}

function DraggableElement({ id, icon, label, description, onMobileAdd }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type: "sidebar-element",
      elementType: id,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const handleClick = (e: React.MouseEvent) => {
    // On mobile (touch devices), add element on click
    if ("ontouchstart" in window && onMobileAdd) {
      e.preventDefault()
      e.stopPropagation()
      onMobileAdd()
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
        flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg md:rounded-xl border border-gray-700 
        cursor-grab active:cursor-grabbing hover:shadow-lg hover:shadow-[#1E90FF]/10 transition-all hover:border-[#1E90FF]/50
        lg:cursor-grab touch:cursor-pointer
        ${isDragging ? "opacity-50 scale-105 shadow-xl shadow-[#1E90FF]/20" : ""}
      `}
    >
      <div className="text-[#1E90FF] mt-1 p-2 md:p-3 bg-[#1E90FF]/10 rounded-md md:rounded-lg flex items-center justify-center relative">
        {icon}
        {/* Mobile add indicator */}
        <div className="lg:hidden absolute -top-1 -right-1 w-4 h-4 bg-[#1E90FF] rounded-full flex items-center justify-center">
          <Plus className="w-2.5 h-2.5 text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white font-poppins text-sm md:text-base mb-1">{label}</h3>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-poppins">{description}</p>
        {/* Mobile instruction */}
        <p className="lg:hidden text-xs text-[#1E90FF] mt-1 font-poppins">Tap to add</p>
      </div>
    </div>
  )
}

interface HeroSidebarProps {
  onAddElement?: (elementType: string) => void
}

export function HeroSidebar({ onAddElement }: HeroSidebarProps) {
  const elements = [
    {
      id: "heading",
      icon: <Heading1 className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Heading",
      description: "Main title for your hero section",
    },
    {
      id: "subheading",
      icon: <Type className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Subheading",
      description: "Supporting text below the main heading",
    },
    {
      id: "image",
      icon: <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Image",
      description: "Add visual content to your hero",
    },
    
    {
      id: "button",
      icon: <MousePointer className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Button",
      description: "Call-to-action button",
    },
  ]

  return (
    <div className="w-full bg-[#121212] overflow-y-auto">
      <div className="p-3 md:p-6">
        <div className="mt-2 mb-4 md:mt-4 lg:mt-4 lg:mt-4 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-[#1E90FF]/10 to-[#1E90FF]/5 rounded-lg md:rounded-xl border border-[#1E90FF]/20">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 lg:mb-4">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#1E90FF]/20 rounded-full flex items-center justify-center">
              <span className="text-[#1E90FF] text-xs md:text-sm lg:text-lg">💡</span>
            </div>
            <h3 className="font-semibold text-[#1E90FF] font-poppins text-xs md:text-sm lg:text-base">How to use</h3>
          </div>
          <ul className="text-xs md:text-sm text-gray-300 space-y-1 md:space-y-2 lg:space-y-3 font-poppins">
            <li className="flex items-start gap-2">
              <span className="text-[#1E90FF] mt-0.5 font-bold text-xs">•</span>
              <span className="lg:hidden">Tap elements to add them</span>
              <span className="hidden lg:inline">Drag elements to canvas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E90FF] mt-0.5 font-bold text-xs">•</span>
              <span>Click to customize</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E90FF] mt-0.5 font-bold text-xs">•</span>
              <span className="lg:hidden">Long press to reorder</span>
              <span className="hidden lg:inline">Reorder by dragging</span>
            </li>
          </ul>
        </div>
        <div className="mb-4 md:mb-8 lg:mb-10">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
            <div className="p-1.5 md:p-2 lg:p-3 bg-[#1E90FF]/10 rounded-md md:rounded-lg lg:rounded-xl">
              <Type className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-[#1E90FF]" />
            </div>
            <div>
              <h2 className="text-base md:text-lg lg:text-xl font-bold text-white font-poppins">Hero Elements</h2>
              <p className="text-xs md:text-sm text-gray-400 font-poppins">
                <span className="lg:hidden">Tap to add • </span>
                <span className="hidden lg:inline">Drag to build • </span>
                Click to customize
              </p>
            </div>
          </div>
        </div>
        {/* Mobile: Horizontal scroll for elements */}
        <div className="lg:space-y-4 lg:space-y-5">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-4 lg:overflow-x-visible lg:pb-0">
            {elements.map((element) => (
              <div key={element.id} className="flex-shrink-0 w-64 lg:w-full">
                <DraggableElement
                  id={element.id}
                  icon={element.icon}
                  label={element.label}
                  description={element.description}
                  onMobileAdd={() => onAddElement?.(element.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
