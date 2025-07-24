"use client"

import type { ComponentData } from "@/app/page"
import { Trash2, Settings } from "lucide-react"

interface CustomizerProps {
  selectedComponent: ComponentData | null
  onUpdateComponent: (id: string, props: Record<string, any>) => void
  onDeleteComponent: (id: string) => void
}

export function Customizer({ selectedComponent, onUpdateComponent, onDeleteComponent }: CustomizerProps) {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center text-gray-500 mt-20">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No component selected</p>
          <p className="text-sm mt-2">Click on a component in the canvas to customize it</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (key: string, value: string) => {
    onUpdateComponent(selectedComponent.id, { [key]: value })
  }

  const renderCustomizer = () => {
    switch (selectedComponent.type) {
      case "hero-section":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
              <input
                type="text"
                value={selectedComponent.props.heading}
                onChange={(e) => handleInputChange("heading", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
              <textarea
                value={selectedComponent.props.subheading}
                onChange={(e) => handleInputChange("subheading", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedComponent.props.buttonText}
                onChange={(e) => handleInputChange("buttonText", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedComponent.props.backgroundColor}
                  onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedComponent.props.backgroundColor}
                  onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>
        )
      default:
        return <p className="text-gray-500">No customization options available</p>
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Customize</h3>
          <button
            onClick={() => onDeleteComponent(selectedComponent.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete component"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800 capitalize">{selectedComponent.type.replace("-", " ")}</p>
          <p className="text-xs text-blue-600 mt-1">ID: {selectedComponent.id}</p>
        </div>

        {renderCustomizer()}
      </div>
    </div>
  )
}
