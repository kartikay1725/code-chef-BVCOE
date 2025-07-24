"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Trash2, GripVertical } from "lucide-react"
import type { HeroElement } from "@/app/page"

interface ElementRendererProps {
  element: HeroElement
  isSelected: boolean
  onSelect: () => void
  onUpdate: (id: string, props: Record<string, any>) => void
  onDelete: (id: string) => void
  isPreviewMode: boolean
}

export function ElementRenderer({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  isPreviewMode,
}: ElementRendererProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: element.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const renderElement = () => {
    switch (element.type) {
      case "heading":
        return (
          <h1
            className={`font-bold ${element.props.fontSize} ${element.props.alignment}`}
            style={{ color: element.props.color }}
          >
            {element.props.text}
          </h1>
        )

      case "subheading":
        return (
          <h2 className={`${element.props.fontSize} ${element.props.alignment}`} style={{ color: element.props.color }}>
            {element.props.text}
          </h2>
        )

      case "image":
        return (
          <div className={`${element.props.width} ${element.props.height} overflow-hidden rounded-lg`}>
            <img
              src={element.props.src || "/placeholder.svg"}
              alt={element.props.alt}
              className="w-full h-full object-cover"
            />
          </div>
        )

      case "video":
        return (
          <div className={`${element.props.width} ${element.props.height} rounded-lg overflow-hidden`}>
            <iframe
              src={element.props.src}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )

      case "button":
        return (
          <div className={element.props.alignment}>
            <button
              className={`font-semibold rounded-lg transition-transform hover:scale-105 ${element.props.padding}`}
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

  if (isPreviewMode) {
    return <div className="w-full max-w-4xl">{renderElement()}</div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group transition-all
        ${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"}
        ${isDragging ? "opacity-50" : ""}
      `}
      onClick={onSelect}
    >
      {renderElement()}

      {/* Controls */}
      <div className="absolute -top-3 -left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...attributes}
          {...listeners}
          className="p-1 bg-gray-600 text-white rounded cursor-grab hover:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3 h-3" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(element.id)
          }}
          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded capitalize">
          {element.type}
        </div>
      )}
    </div>
  )
}
