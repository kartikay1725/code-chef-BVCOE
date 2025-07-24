"use client"

import { Eye, EyeOff } from "lucide-react"

interface PreviewToggleProps {
  isPreviewMode: boolean
  onToggle: (isPreview: boolean) => void
}

export function PreviewToggle({ isPreviewMode, onToggle }: PreviewToggleProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900">Hero Section Builder</h1>

      <button
        onClick={() => onToggle(!isPreviewMode)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
          ${isPreviewMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
        `}
      >
        {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {isPreviewMode ? "Exit Preview" : "Preview"}
      </button>
    </div>
  )
}
