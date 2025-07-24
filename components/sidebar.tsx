import type React from "react"
import { useDraggable } from "@dnd-kit/core"
import { Type, Heading1, ImageIcon, Video, MousePointer } from "lucide-react"

interface DraggableElementProps {
  id: string
  icon: React.ReactNode
  label: string
  description: string
}

function DraggableElement({ id, icon, label, description }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 
        cursor-grab hover:shadow-md transition-all hover:border-blue-300
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  )
}

export function Sidebar() {
  const elements = [
    {
      id: "heading",
      icon: <Heading1 className="w-5 h-5" />,
      label: "Heading",
      description: "Main title for your hero section",
    },
    {
      id: "subheading",
      icon: <Type className="w-5 h-5" />,
      label: "Subheading",
      description: "Supporting text below the main heading",
    },
    {
      id: "image",
      icon: <ImageIcon className="w-5 h-5" />,
      label: "Image",
      description: "Add visual content to your hero",
    },
    {
      id: "video",
      icon: <Video className="w-5 h-5" />,
      label: "Video",
      description: "Embed video content",
    },
    {
      id: "button",
      icon: <MousePointer className="w-5 h-5" />,
      label: "Button",
      description: "Call-to-action button",
    },
  ]

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Elements</h2>
        <p className="text-sm text-gray-600 mt-1">Drag elements to build your hero section</p>
      </div>

      <div className="space-y-3">
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            id={element.id}
            icon={element.icon}
            label={element.label}
            description={element.description}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 How to use</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Drag elements to the canvas</li>
          <li>• Click elements to customize</li>
          <li>• Reorder by dragging within canvas</li>
          <li>• Use preview mode to see final result</li>
        </ul>
      </div>
    </div>
  )
}
