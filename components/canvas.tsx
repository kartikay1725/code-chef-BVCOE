"use client"

import { useDroppable } from "@dnd-kit/core"
import { ElementRenderer } from "./element-renderer"
import type { HeroElement } from "@/app/page"
import { Layout } from "lucide-react"

interface CanvasProps {
  elements: HeroElement[]
  selectedElement: HeroElement | null
  onSelectElement: (element: HeroElement) => void
  onUpdateElement: (id: string, props: Record<string, any>) => void
  onDeleteElement: (id: string) => void
  isPreviewMode: boolean
}

export function Canvas({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  isPreviewMode,
}: CanvasProps) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" })

  const sortedElements = [...elements].sort((a, b) => a.order - b.order)

  return (
    <div className={`flex-1 p-6 ${isPreviewMode ? "p-0" : ""}`}>
      <div
        ref={setNodeRef}
        className={`
          min-h-full bg-white rounded-lg transition-all
          ${isPreviewMode ? "rounded-none" : "border-2 border-dashed"}
          ${isOver && !isPreviewMode ? "border-blue-400 bg-blue-50" : !isPreviewMode ? "border-gray-300" : ""}
          ${elements.length === 0 && !isPreviewMode ? "flex items-center justify-center" : isPreviewMode ? "" : "p-8"}
        `}
      >
        {elements.length === 0 && !isPreviewMode ? (
          <div className="text-center">
            <Layout className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Start Building Your Hero</h3>
            <p className="text-gray-500">Drag elements from the sidebar to create your hero section</p>
          </div>
        ) : (
          <div
            className={`space-y-6 ${isPreviewMode ? "min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-12" : ""}`}
          >
            {sortedElements.map((element) => (
              <ElementRenderer
                key={element.id}
                element={element}
                isSelected={selectedElement?.id === element.id}
                onSelect={() => onSelectElement(element)}
                onUpdate={onUpdateElement}
                onDelete={onDeleteElement}
                isPreviewMode={isPreviewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
