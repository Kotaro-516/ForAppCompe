"use client"

import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"

interface MapFallbackProps {
  center: { lat: number; lng: number }
  markers?: Array<{
    id: number
    position: { lat: number; lng: number }
    title: string
    category?: string
  }>
  className?: string
  error?: Error
  onRetry?: () => void
}

export default function MapFallback({ center, markers = [], className = "", error, onRetry }: MapFallbackProps) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex flex-col items-center justify-center ${className}`}
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto">
          <MapPin size={32} className="text-orange-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">大分県マップ</h3>
          <p className="text-sm text-muted-foreground">
            緯度: {center.lat.toFixed(4)}, 経度: {center.lng.toFixed(4)}
          </p>
        </div>
        {markers.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">登録スポット ({markers.length})</p>
            <div className="space-y-1">
              {markers.slice(0, 3).map((marker) => (
                <div key={marker.id} className="text-xs text-muted-foreground">
                  • {marker.title}
                </div>
              ))}
              {markers.length > 3 && (
                <div className="text-xs text-muted-foreground">他 {markers.length - 3} スポット</div>
              )}
            </div>
          </div>
        )}
        {error ? (
          <div className="flex flex-col items-center gap-3">
            <AlertTriangle size={24} className="text-yellow-500" />
            <p className="font-medium">マップの読み込みに失敗しました</p>
            <p className="text-sm text-gray-400 max-w-[300px]">
              {error.message}
            </p>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="mt-2"
              >
                <RefreshCw size={16} className="mr-2" />
                再読み込み
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin">
              <RefreshCw size={24} />
            </div>
            <p>マップを読み込み中...</p>
          </div>
        )}
      </div>
    </div>
  )
}
