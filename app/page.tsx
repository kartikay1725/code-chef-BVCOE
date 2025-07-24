"use client"

import { useState } from "react"
import { HeroBuilder } from "@/components/hero-builder"
import { Navigation } from "@/components/navigation"
import { FacultyMentor } from "@/components/faculty-mentor"
import { VisionMission } from "@/components/vision-mission"
import { CoreTeam } from "@/components/core-team"
import { HeadsAndViceHeads } from "@/components/heads-vice-heads"
import { PastEvents } from "@/components/past-events"
import { Contact } from "@/components/contact"
import {
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

export interface HeroElement {
  id: string
  type: "heading" | "subheading" | "image" | "video" | "button"
  props: Record<string, any>
  order: number
}

export type ComponentData = HeroElement

export default function CodeChefWebsite() {
  const [isHeroEditMode, setIsHeroEditMode] = useState(false)
  const [elements, setElements] = useState<HeroElement[]>([])
  const [selectedElement, setSelectedElement] = useState<HeroElement | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [draggedType, setDraggedType] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)

    // Check if dragging from sidebar or canvas
    const draggedElement = elements.find((el) => el.id === event.active.id)
    if (draggedElement) {
      setDraggedType(null) // Dragging existing element
    } else {
      setDraggedType(event.active.id as string) // Dragging from sidebar
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setDraggedType(null)

    if (!over) return

    // Handle dropping from sidebar to canvas
    if (over.id === "canvas" && draggedType) {
      const newElement = createNewElement(draggedType)
      setElements((prev) => [...prev, newElement])
      return
    }

    // Handle reordering within canvas
    if (over.id !== "canvas") {
      const activeIndex = elements.findIndex((el) => el.id === active.id)
      const overIndex = elements.findIndex((el) => el.id === over.id)

      if (activeIndex !== -1 && overIndex !== -1) {
        setElements((prev) => arrayMove(prev, activeIndex, overIndex))
      }
    }
  }

  const createNewElement = (type: string): HeroElement => {
    const id = `${type}-${Date.now()}`
    const order = elements.length

    const defaultProps = {
      heading: { text: "Your Heading Here", fontSize: "text-4xl", color: "#1f2937", alignment: "text-center" },
      subheading: {
        text: "Your subheading text goes here",
        fontSize: "text-xl",
        color: "#6b7280",
        alignment: "text-center",
      },
      image: { src: "/placeholder.svg?height=300&width=500", alt: "Hero Image", width: "w-full", height: "h-64" },
      video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", width: "w-full", height: "h-64" },
      button: {
        text: "Click Me",
        backgroundColor: "#3b82f6",
        textColor: "#ffffff",
        alignment: "text-center",
        padding: "px-6 py-3",
      },
    }

    return {
      id,
      type: type as HeroElement["type"],
      props: defaultProps[type as keyof typeof defaultProps] || {},
      order,
    }
  }

  const updateElement = (id: string, newProps: Record<string, any>) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el)))

    if (selectedElement?.id === id) {
      setSelectedElement((prev) => (prev ? { ...prev, props: { ...prev.props, ...newProps } } : null))
    }
  }

  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
    if (selectedElement?.id === id) {
      setSelectedElement(null)
    }
  }

  const selectElement = (element: HeroElement) => {
    if (!isPreviewMode) {
      setSelectedElement(element)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white font-poppins">
      <Navigation />

      {/* Hero Builder Section */}
      <section id="hero" className="relative">
        <HeroBuilder isEditMode={isHeroEditMode} onToggleEditMode={setIsHeroEditMode} />
      </section>

      {/* Main Content - Only show when not in hero edit mode */}
      {!isHeroEditMode && (
        <>
          <FacultyMentor />
          <VisionMission />
          <CoreTeam />
          <HeadsAndViceHeads />
          <PastEvents />
          <Contact />
        </>
      )}
    </div>
  )
}
