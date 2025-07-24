"use client"

import type React from "react"

import type { HeroElement } from "@/app/page"
import { Settings, Trash2, Upload } from "lucide-react"
import { useRef } from "react"

interface CustomizationPanelProps {
  selectedElement: HeroElement | null
  onUpdateElement: (id: string, props: Record<string, any>) => void
  onDeleteElement: (id: string) => void
}

export function CustomizationPanel({ selectedElement, onUpdateElement, onDeleteElement }: CustomizationPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center text-gray-500 mt-20">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Element Selected</h3>
          <p className="text-sm">Click on an element in the canvas to customize it</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (key: string, value: any) => {
    onUpdateElement(selectedElement.id, { [key]: value })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange("src", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderCustomizationOptions = () => {
    switch (selectedElement.type) {
      case "heading":
      case "subheading":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
              <input
                type="text"
                value={selectedElement.props.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <select
                value={selectedElement.props.fontSize}
                onChange={(e) => handleInputChange("fontSize", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text-sm">Small</option>
                <option value="text-base">Base</option>
                <option value="text-lg">Large</option>
                <option value="text-xl">Extra Large</option>
                <option value="text-2xl">2XL</option>
                <option value="text-3xl">3XL</option>
                <option value="text-4xl">4XL</option>
                <option value="text-5xl">5XL</option>
                <option value="text-6xl">6XL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={selectedElement.props.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
              <select
                value={selectedElement.props.alignment}
                onChange={(e) => handleInputChange("alignment", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text-left">Left</option>
                <option value="text-center">Center</option>
                <option value="text-right">Right</option>
              </select>
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="space-y-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  type="url"
                  placeholder="Or enter image URL"
                  value={selectedElement.props.src}
                  onChange={(e) => handleInputChange("src", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={selectedElement.props.alt}
                onChange={(e) => handleInputChange("alt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <select
                value={selectedElement.props.width}
                onChange={(e) => handleInputChange("width", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="w-1/2">Half Width</option>
                <option value="w-3/4">3/4 Width</option>
                <option value="w-full">Full Width</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <select
                value={selectedElement.props.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="h-32">Small</option>
                <option value="h-48">Medium</option>
                <option value="h-64">Large</option>
                <option value="h-80">Extra Large</option>
              </select>
            </div>
          </div>
        )

      case "video":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="url"
                placeholder="YouTube embed URL"
                value={selectedElement.props.src}
                onChange={(e) => handleInputChange("src", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use YouTube embed URLs (e.g., https://www.youtube.com/embed/VIDEO_ID)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <select
                value={selectedElement.props.width}
                onChange={(e) => handleInputChange("width", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="w-1/2">Half Width</option>
                <option value="w-3/4">3/4 Width</option>
                <option value="w-full">Full Width</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <select
                value={selectedElement.props.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="h-48">Medium</option>
                <option value="h-64">Large</option>
                <option value="h-80">Extra Large</option>
                <option value="h-96">2XL</option>
              </select>
            </div>
          </div>
        )

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedElement.props.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={selectedElement.props.backgroundColor}
                onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={selectedElement.props.textColor}
                onChange={(e) => handleInputChange("textColor", e.target.value)}
                className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
              <select
                value={selectedElement.props.alignment}
                onChange={(e) => handleInputChange("alignment", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text-left">Left</option>
                <option value="text-center">Center</option>
                <option value="text-right">Right</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
              <select
                value={selectedElement.props.padding}
                onChange={(e) => handleInputChange("padding", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="px-3 py-1">Small</option>
                <option value="px-4 py-2">Medium</option>
                <option value="px-6 py-3">Large</option>
                <option value="px-8 py-4">Extra Large</option>
              </select>
            </div>
          </div>
        )

      default:
        return <p className="text-gray-500">No customization options available</p>
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Customize</h3>
          <button
            onClick={() => onDeleteElement(selectedElement.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete element"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800 capitalize">{selectedElement.type.replace("-", " ")}</p>
          <p className="text-xs text-blue-600 mt-1">ID: {selectedElement.id}</p>
        </div>

        {renderCustomizationOptions()}
      </div>
    </div>
  )
}
