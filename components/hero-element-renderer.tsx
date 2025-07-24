"use client"

import type React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Trash2, GripVertical, ImageIcon, Video } from "lucide-react"
import type { HeroElement } from "./hero-builder"

interface HeroElementRendererProps {
  element: HeroElement
  isSelected: boolean
  onSelect: () => void
  onUpdate: (id: string, props: Record<string, any>) => void
  onDelete: (id: string) => void
  isEditMode: boolean
}

export function HeroElementRenderer({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  isEditMode,
}: HeroElementRendererProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: element.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          onUpdate(element.id, { src: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const renderElement = () => {
    switch (element.type) {
      case "heading":
        return (
          <h1
            className={`font-bold font-poppins ${element.props.fontSize} ${element.props.alignment} leading-tight`}
            style={{ color: element.props.color }}
          >
            {element.props.text}
          </h1>
        )

      case "subheading":
        return (
          <h2
            className={`font-poppins ${element.props.fontSize} ${element.props.alignment} leading-relaxed`}
            style={{ color: element.props.color }}
          >
            {element.props.text}
          </h2>
        )

      case "image":
        if (element.props.isBackground) {
          return null // Background images are handled in the canvas
        }

        const imageSrc = element.props.src?.trim()
        if (!imageSrc) {
          return (
            <div
              className={`${element.props.width} ${element.props.height} overflow-hidden rounded-xl mx-auto bg-gray-800 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-[#1E90FF] hover:bg-gray-700 transition-all group`}
              onClick={(e) => {
                e.stopPropagation()
                const input = document.createElement("input")
                input.type = "file"
                input.accept = "image/*"
                input.onchange = handleMediaUpload
                input.click()
              }}
            >
              <ImageIcon className="w-16 h-16 md:w-20 md:h-20 text-gray-500 group-hover:text-[#1E90FF] mb-4 transition-colors" />
              <p className="text-gray-400 text-sm md:text-base font-medium font-poppins group-hover:text-[#1E90FF] transition-colors text-center px-4">
                Click to upload image
              </p>
              <p className="text-gray-500 text-xs mt-2 font-poppins text-center px-4">JPG, PNG, GIF up to 10MB</p>
            </div>
          )
        }

        return (
          <div className={`${element.props.width} ${element.props.height} overflow-hidden rounded-xl mx-auto`}>
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={element.props.alt || "Hero Image"}
              className="w-full h-full object-cover"
            />
          </div>
        )

      case "video":
        if (element.props.isBackground) {
          return null // Background videos are handled in the canvas
        }

        const videoSrc = element.props.src?.trim()
        if (!videoSrc) {
          return (
            <div
              className={`${element.props.width} ${element.props.height} rounded-xl overflow-hidden mx-auto bg-gray-800 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-[#1E90FF] hover:bg-gray-700 transition-all group`}
              onClick={(e) => {
                e.stopPropagation()
                const input = document.createElement("input")
                input.type = "file"
                input.accept = "video/mp4,video/webm,video/ogg"
                input.onchange = handleMediaUpload
                input.click()
              }}
            >
              <Video className="w-16 h-16 md:w-20 md:h-20 text-gray-500 group-hover:text-[#1E90FF] mb-4 transition-colors" />
              <p className="text-gray-400 text-sm md:text-base font-medium font-poppins group-hover:text-[#1E90FF] transition-colors text-center px-4">
                Click to upload video
              </p>
              <p className="text-gray-500 text-xs mt-2 font-poppins text-center px-4">MP4, WebM, OGG up to 50MB</p>
            </div>
          )
        }

        return (
          <div className={`${element.props.width} ${element.props.height} rounded-xl overflow-hidden mx-auto`}>
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              controls={element.props.controls !== false}
              autoPlay={element.props.autoplay || false}
              muted={element.props.muted || false}
              loop={element.props.loop || false}
              playsInline
            />
          </div>
        )

      case "button":
        return (
          <div className={element.props.alignment}>
            <button
              className={`font-semibold font-poppins rounded-xl transition-all hover:scale-105 hover:shadow-lg ${element.props.padding}`}
              style={{
                backgroundColor: element.props.backgroundColor,
                color: element.props.textColor,
              }}
            >
              {element.props.text}
            </button>
          </div>
        )

      default:
        return null
    }
  }

  if (!isEditMode) {
    return <div className="w-full">{renderElement()}</div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group transition-all
        ${
          isSelected
            ? "ring-2 ring-[#1E90FF] ring-offset-2 ring-offset-[#121212]"
            : "hover:ring-2 hover:ring-gray-600 hover:ring-offset-2 hover:ring-offset-[#121212]"
        }
        ${isDragging ? "opacity-50" : ""}
      `}
      onClick={onSelect}
    >
      {renderElement()}

      {/* Controls */}
      <div className="absolute -top-4 -left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...attributes}
          {...listeners}
          className="p-2 bg-gray-700 text-white rounded-lg cursor-grab hover:bg-gray-600 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(element.id)
          }}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-10 left-0 bg-[#1E90FF] text-white text-sm px-3 py-1 rounded-lg capitalize font-poppins font-medium">
          {element.type}
        </div>
      )}
    </div>
  )
}
