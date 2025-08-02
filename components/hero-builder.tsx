"use client"

import { useState } from "react"
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { HeroSidebar } from "./hero-sidebar"
import { HeroCanvas } from "./hero-canvas"
import { HeroCustomizer } from "./hero-customizer"
import { Edit3, Eye, Heading1, Type, ImageIcon, Video, MousePointer, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export interface HeroElement {
  id: string
  type: "heading" | "subheading" | "image" | "video" | "button"
  props: Record<string, any>
  order: number
}

interface HeroBuilderProps {
  isEditMode: boolean
  onToggleEditMode: (mode: boolean) => void
}

export function HeroBuilder({ isEditMode, onToggleEditMode }: HeroBuilderProps) {
  const [backgroundColor, setBackgroundColor] = useState("#121212")
  const [elements, setElements] = useState<HeroElement[]>([
    {
      id: "default-image",
      type: "image",
      props: {
        src: "/CodeChef_Logo.svg.png",
        alt: "CodeChef Logo",
        width: "w-64",
        height: "h-full",
        isBackground: false,
        backgroundOpacity: 0.5,
      },
      order: 0,
    },
    {
      id: "default-heading",
      type: "heading",
      props: {
        text: "CodeChef BVCOE Chapter",
        fontSize: "text-4xl md:text-6xl lg:text-7xl",
        color: "#ffffff",
        alignment: "text-center",
      },
      order: 1,
    },
    {
      id: "default-subheading",
      type: "subheading",
      props: {
        text: "Empowering minds through competitive programming and algorithmic excellence",
        fontSize: "text-lg md:text-xl lg:text-2xl",
        color: "#9ca3af",
        alignment: "text-center",
      },
      order: 1.5,
    },
    {
      id: "default-button",
      type: "button",
      props: {
        text: "Join Our Community",
        backgroundColor: "#1E90FF",
        textColor: "#ffffff",
        alignment: "text-center",
        padding: "px-8 py-4 md:px-10 md:py-5",
        link: "https://chat.whatsapp.com/FEdFlgAzKvEFDNZQHySPiU?mode=ac_t",
      },
      order: 2,
    },
  ])

  const [selectedElement, setSelectedElement] = useState<HeroElement | null>(null)
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

    // Check if dragging from sidebar (these are the element types)
    const sidebarElementTypes = ["heading", "subheading", "image", "video", "button"]
    const draggedElement = elements.find((el) => el.id === event.active.id)

    if (draggedElement) {
      setDraggedType(null) // Dragging existing element for reordering
    } else if (sidebarElementTypes.includes(event.active.id as string)) {
      setDraggedType(event.active.id as string) // Dragging from sidebar
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setDraggedType(null)

    if (!over) return

    // Handle dropping from sidebar to canvas
    if (over.id === "hero-canvas" && draggedType) {
      const newElement = createNewElement(draggedType)
      setElements((prev) => [...prev, newElement])
      return
    }

    // Handle reordering within canvas
    if (over.id !== "hero-canvas" && active.id !== over.id) {
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
      heading: {
        text: "New Heading",
        fontSize: "text-3xl md:text-4xl",
        color: "#ffffff",
        alignment: "text-center",
      },
      subheading: {
        text: "New subheading text",
        fontSize: "text-lg md:text-xl",
        color: "#9ca3af",
        alignment: "text-center",
      },
      image: {
        src: null,
        alt: "Hero Image",
        width: "w-full",
        height: "h-64",
        isBackground: false,
        backgroundOpacity: 0.5,
      },
      video: {
        src: null,
        width: "w-full",
        height: "h-64",
        isBackground: false,
        backgroundOpacity: 0.5,
        autoplay: false,
        muted: true,
        loop: false,
        controls: true,
      },
       button: {
          text: "Click Me",
          backgroundColor: "#1E90FF",
          textColor: "#ffffff",
          alignment: "text-center",
          padding: "px-6 py-3",
          link: "#",
        },
    }

    return {
      id,
      type: type as HeroElement["type"],
      props: defaultProps[type as keyof typeof defaultProps] || {},
      order,
    }
  }

  // Handle mobile element addition
  const handleAddElement = (elementType: string) => {
    const newElement = createNewElement(elementType)
    setElements((prev) => [...prev, newElement])

    // Auto-select the new element for immediate customization
    setSelectedElement(newElement)

    // Show success feedback
    const button = document.querySelector(`[data-element-type="${elementType}"]`)
    if (button) {
      button.classList.add("animate-pulse")
      setTimeout(() => {
        button.classList.remove("animate-pulse")
      }, 1000)
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
    if (isEditMode) {
      setSelectedElement(element)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#121212]">
      {/* Header Bar */}
      {isEditMode && (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 px-4 md:px-6 py-3 md:py-5">
          <div className="mt-12 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="p-2 md:p-3 bg-[#1E90FF]/10 rounded-lg md:rounded-xl">
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-[#1E90FF]" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white font-poppins">Hero Builder</h1>
                <p className="text-xs md:text-sm text-gray-400 font-poppins hidden sm:block">
                  Design your perfect hero section
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button - Fixed at bottom right, mobile responsive */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleEditMode(!isEditMode)}
          className={`
          flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-medium transition-all shadow-lg font-poppins text-sm md:text-base
          ${
            isEditMode
              ? "bg-gradient-to-r from-[#1E90FF] to-blue-600 text-white hover:from-blue-600 hover:to-[#1E90FF] shadow-[#1E90FF]/30"
              : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 border border-gray-600"
          }
        `}
        >
          {isEditMode ? <Eye className="w-4 h-4 md:w-5 md:h-5" /> : <Edit3 className="w-4 h-4 md:w-5 md:h-5" />}
          <span className="hidden sm:inline">{isEditMode ? "Preview Mode" : "Edit Hero"}</span>
          <span className="sm:hidden">{isEditMode ? "Preview" : "Edit"}</span>
        </motion.button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {isEditMode ? (
          // Edit Mode Layout
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Mobile: Sidebar as full-width section */}
            <div className="lg:hidden w-full bg-[#121212] border-b border-gray-800 max-h-48 overflow-y-auto">
              <HeroSidebar onAddElement={handleAddElement} />
            </div>

            {/* Desktop: Sidebar as fixed width */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
              <HeroSidebar onAddElement={handleAddElement} />
            </div>

            {/* Canvas - Full width on mobile, remaining space on desktop */}
            <div className="flex-1 min-h-0">
              <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
                <HeroCanvas
                  elements={elements}
                  selectedElement={selectedElement}
                  onSelectElement={selectElement}
                  onUpdateElement={updateElement}
                  onDeleteElement={deleteElement}
                  isEditMode={isEditMode}
                  backgroundColor={backgroundColor}
                  onBackgroundColorChange={setBackgroundColor}
                />
              </SortableContext>
            </div>

            {/* Mobile: Customizer as bottom sheet */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 max-h-80 bg-[#121212] border-t border-gray-800 transform transition-transform duration-300">
              <HeroCustomizer
                selectedElement={selectedElement}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
                backgroundColor={backgroundColor}
                onBackgroundColorChange={setBackgroundColor}
              />
            </div>

            {/* Desktop: Customizer as fixed sidebar */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
              <HeroCustomizer
                selectedElement={selectedElement}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
                backgroundColor={backgroundColor}
                onBackgroundColorChange={setBackgroundColor}
              />
            </div>
          </div>
        ) : (
          // Preview Mode Layout - Full screen canvas
          <div className="w-full">
            <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
              <HeroCanvas
                elements={elements}
                selectedElement={selectedElement}
                onSelectElement={selectElement}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
                isEditMode={isEditMode}
                backgroundColor={backgroundColor}
                onBackgroundColorChange={setBackgroundColor}
              />
            </SortableContext>
          </div>
        )}

        <DragOverlay>
          {activeId && draggedType && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#1E90FF] rounded-xl p-3 md:p-5 shadow-2xl shadow-[#1E90FF]/20"
            >
              <div className="flex items-center gap-2 md:gap-4">
                {draggedType === "heading" && <Heading1 className="w-4 h-4 md:w-5 md:h-5 text-[#1E90FF]" />}
                {draggedType === "subheading" && <Type className="w-4 h-4 md:w-5 md:h-5 text-[#1E90FF]" />}
                {draggedType === "image" && <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1E90FF]" />}
                {draggedType === "video" && <Video className="w-4 h-4 md:w-5 md:h-5 text-[#1E90FF]" />}
                {draggedType === "button" && <MousePointer className="w-4 h-4 md:w-5 md:h-5 text-[#1E90FF]" />}
                <span className="text-white font-medium capitalize font-poppins text-sm md:text-base">
                  {draggedType}
                </span>
              </div>
            </motion.div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
