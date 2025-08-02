"use client"

import type React from "react"

import type { HeroElement } from "./hero-builder"
import { Settings, Trash2, Upload, Palette,Check } from "lucide-react"
import { useRef } from "react"

interface HeroCustomizerProps {
  selectedElement: HeroElement | null
  onUpdateElement: (id: string, props: Record<string, any>) => void
  onDeleteElement: (id: string) => void
  backgroundColor: string
  onBackgroundColorChange: (color: string) => void
}

export function HeroCustomizer({
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  backgroundColor,
  onBackgroundColorChange,
}: HeroCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (key: string, value: any) => {
    onUpdateElement(selectedElement?.id ?? "", { [key]: value })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          handleInputChange("src", result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          handleInputChange("src", result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const renderCustomizationOptions = () => {
    switch (selectedElement?.type) {
      case "heading":
      case "subheading":
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Text Content</label>
              <input
                type="text"
                value={selectedElement.props.text || ""}
                onChange={(e) => handleInputChange("text", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent transition-all font-poppins"
                placeholder="Enter your text..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Font Size</label>
              <select
                value={selectedElement.props.fontSize || "text-xl"}
                onChange={(e) => handleInputChange("fontSize", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
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
                <option value="text-7xl">7XL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Text Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={selectedElement.props.color || "#ffffff"}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="w-12 h-12 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
                />
                <input
                  type="text"
                  value={selectedElement.props.color || "#ffffff"}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Text Alignment</label>
              <select
                value={selectedElement.props.alignment || "text-center"}
                onChange={(e) => handleInputChange("alignment", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
              >
                <option value="text-left">Left</option>
                <option value="text-center">Center</option>
                <option value="text-right">Right</option>
              </select>
            </div>
          </div>
        )

      case "image":
        const hasImageSrc = selectedElement.props.src?.trim()

        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Image Source</label>
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#1E90FF]/20 to-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-xl hover:from-[#1E90FF]/30 hover:to-[#1E90FF]/20 text-white transition-all font-poppins font-medium"
                >
                  <Upload className="w-5 h-5" />
                  {hasImageSrc ? "Change Image" : "Upload Image"}
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
                  value={selectedElement.props.src || ""}
                  onChange={(e) => handleInputChange("src", e.target.value || null)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
                />
              </div>
              {!hasImageSrc && (
                <p className="text-xs text-yellow-400 mt-3 flex items-center gap-2 font-poppins">
                  <span>💡</span>
                  <span>Click the image element to upload directly</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Alt Text</label>
              <input
                type="text"
                value={selectedElement.props.alt || ""}
                onChange={(e) => handleInputChange("alt", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
                placeholder="Describe your image..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 font-poppins">Width</label>
                <select
                  value={selectedElement.props.width || "w-full"}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-sm font-poppins"
                >
                  <option value="w-1/2">Half</option>
                  <option value="w-3/4">3/4</option>
                  <option value="w-full">Full</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 font-poppins">Height</label>
                <select
                  value={selectedElement.props.height || "h-64"}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-sm font-poppins"
                >
                  <option value="h-32">Small</option>
                  <option value="h-48">Medium</option>
                  <option value="h-64">Large</option>
                  <option value="h-80">XL</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Background Options</label>
              <button
                onClick={() => handleInputChange("isBackground", !selectedElement.props.isBackground)}
                className={`w-full px-6 py-4 rounded-xl font-medium transition-all font-poppins ${
                  selectedElement.props.isBackground
                    ? "bg-gradient-to-r from-[#1E90FF] to-blue-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {selectedElement.props.isBackground ? "Remove from Background" : "Set as Background"}
              </button>
            </div>
          </div>
        )

      case "video":
  const hasVideoSrc = selectedElement.props.src?.trim();

  return (
    <div className="space-y-8">
      {/* Video Source Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Video Source</label>
        <div className="space-y-4">
          <button
            onClick={() => videoInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#1E90FF]/20 to-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-xl hover:from-[#1E90FF]/30 hover:to-[#1E90FF]/20 text-white transition-all font-poppins font-medium"
          >
            <Upload className="w-5 h-5" />
            {hasVideoSrc ? "Change Video" : "Upload Video"}
          </button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
          <input
            type="url"
            placeholder="Or enter video URL"
            value={selectedElement.props.src || ""}
            onChange={(e) => handleInputChange("src", e.target.value)}
            className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
          />
        </div>
      </div>

      {/* Video Controls - Fixed Styling */}
      <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
        <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Video Settings</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "autoplay", label: "Autoplay" },
            { key: "muted", label: "Muted" },
            { key: "loop", label: "Loop" },
            { key: "controls", label: "Show Controls", defaultValue: true },
          ].map((control) => (
            <label 
              key={control.key} 
              className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedElement.props[control.key] ?? control.defaultValue ?? false}
                  onChange={(e) => handleInputChange(control.key, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selectedElement.props[control.key] ?? control.defaultValue
                    ? "bg-[#1E90FF] border-[#1E90FF]"
                    : "bg-gray-800 border-gray-600"
                }`}>
                  {selectedElement.props[control.key] ?? control.defaultValue ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : null}
                </div>
              </div>
              <span className="text-sm font-medium font-poppins">{control.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Background Options</label>
        <button
          onClick={() => handleInputChange("isBackground", !selectedElement.props.isBackground)}
          className={`w-full px-6 py-4 rounded-xl font-medium transition-all font-poppins ${
            selectedElement.props.isBackground
              ? "bg-gradient-to-r from-[#1E90FF] to-blue-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
          }`}
        >
          {selectedElement.props.isBackground ? "Remove from Background" : "Set as Background"}
        </button>
      </div>

      {selectedElement.props.isBackground && (
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">
            Opacity: {Math.round((selectedElement.props.backgroundOpacity || 0.5) * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={selectedElement.props.backgroundOpacity || 0.5}
            onChange={(e) => handleInputChange("backgroundOpacity", parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1E90FF]"
          />
        </div>
      )}
    </div>
  )

      case "button":
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Button Text</label>
              <input
                type="text"
                value={selectedElement.props.text || ""}
                onChange={(e) => handleInputChange("text", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
                placeholder="Enter button text..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedElement.props.backgroundColor || "#1E90FF"}
                    onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                    className="w-12 h-12 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
                  />
                  <input
                    type="text"
                    value={selectedElement.props.backgroundColor || "#1E90FF"}
                    onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-sm font-poppins w-8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedElement.props.textColor || "#ffffff"}
                    onChange={(e) => handleInputChange("textColor", e.target.value)}
                    className="w-12 h-12 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
                  />
                  <input
                    type="text"
                    value={selectedElement.props.textColor || "#ffffff"}
                    onChange={(e) => handleInputChange("textColor", e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-sm font-poppins w-8"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Alignment</label>
              <select
                value={selectedElement.props.alignment || "text-center"}
                onChange={(e) => handleInputChange("alignment", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
              >
                <option value="text-left">Left</option>
                <option value="text-center">Center</option>
                <option value="text-right">Right</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 font-poppins">Button Size</label>
              <select
                value={selectedElement.props.padding || "px-6 py-3"}
                onChange={(e) => handleInputChange("padding", e.target.value)}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins"
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
        return (
          <div className="text-center py-8">
            <Palette className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 font-poppins">No customization options available</p>
          </div>
        )
    }
  }

  return (
    <div className="w-full bg-[#121212] border-t lg:border-l lg:border-t-0 border-gray-800 overflow-y-auto max-h-80 lg:max-h-none lg:h-screen">
      <div className="p-3 md:p-4 lg:p-6">
        {/* Background Color Control */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 lg:mb-4">
            <div className="p-1 md:p-1.5 lg:p-2 bg-[#1E90FF]/10 rounded-md lg:rounded-lg">
              <Palette className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#1E90FF]" />
            </div>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white font-poppins">Background</h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            <label className="block text-xs md:text-sm font-medium text-gray-300 font-poppins">Background Color</label>
            <div className="flex gap-2 md:gap-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border border-gray-700 rounded-md lg:rounded-lg cursor-pointer bg-gray-800"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="flex-1 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 lg:py-3 bg-gray-800 border border-gray-700 rounded-lg lg:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent font-poppins text-xs md:text-sm lg:text-base"
                placeholder="#121212"
              />
            </div>
          </div>
        </div>

        {!selectedElement ? (
          <div className="text-center text-gray-500 mt-8 md:mt-12 lg:mt-20">
            <div className="p-2 md:p-3 lg:p-4 bg-gray-800/50 rounded-lg lg:rounded-xl mb-3 md:mb-4 lg:mb-6">
              <Settings className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:w-12 mx-auto mb-2 md:mb-3 lg:mb-4 text-gray-600" />
            </div>
            <h3 className="text-sm md:text-base lg:text-lg font-medium mb-1 md:mb-2 text-gray-400 font-poppins">
              No Element Selected
            </h3>
            <p className="text-xs md:text-sm text-gray-500 font-poppins px-4">
              Click on an element in the canvas to customize it
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-[#1E90FF]/10 rounded-lg">
                  <Settings className="w-4 h-4 md:w-5 md:h-5 text-[#1E90FF]" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white font-poppins">Customize</h3>
              </div>
              <button
                onClick={() => onDeleteElement(selectedElement.id)}
                className="p-1.5 md:p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete element"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 bg-gradient-to-r from-[#1E90FF]/10 to-[#1E90FF]/5 rounded-lg md:rounded-xl border border-[#1E90FF]/20">
              <p className="text-xs md:text-sm font-medium text-[#1E90FF] capitalize font-poppins">
                {selectedElement.type.replace("-", " ")}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-poppins">ID: {selectedElement.id}</p>
            </div>

            <div className="space-y-4 md:space-y-6 lg:space-y-8">{renderCustomizationOptions()}</div>
          </>
        )}
      </div>
    </div>
  )
}
