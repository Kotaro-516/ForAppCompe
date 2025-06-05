"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import GoogleMap from "./google-map"
import { useGoogleMaps } from "@/hooks/use-google-maps"
import type { GoogleMapMarker, GoogleLatLng } from "@/types/google-maps"

interface InteractiveMapProps {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: GoogleMapMarker[]
  onMarkerAdd?: (position: { lat: number; lng: number }) => void
  onMarkerRemove?: (markerId: number) => void
  onBoundsChanged?: (center: GoogleLatLng, zoom: number) => void
  children?: React.ReactNode
  className?: string
  onMapLoad?: (map: google.maps.Map) => void
  clickable?: boolean
  instanceId?: string
}

export default function InteractiveMap({
  center: initialCenter,
  zoom: initialZoom = 13,
  markers = [],
  onMarkerAdd,
  onMarkerRemove,
  onBoundsChanged,
  children,
  className = "",
  onMapLoad,
  clickable = true,
  instanceId = "interactive"
}: InteractiveMapProps) {
  const { isLoaded } = useGoogleMaps()
  const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null)
  const [currentCenter, setCurrentCenter] = useState(initialCenter)
  const [currentZoom, setCurrentZoom] = useState(initialZoom)

  // マップがロードされたときの処理
  const handleMapLoad = useCallback((loadedMap: google.maps.Map) => {
    if (onMapLoad) onMapLoad(loadedMap)

    // 既存のクリックリスナーをクリーンアップ
    if (clickListenerRef.current) {
      google.maps.event.removeListener(clickListenerRef.current)
      clickListenerRef.current = null
    }

    // クリックイベントの設定
    if (clickable && onMarkerAdd) {
      clickListenerRef.current = google.maps.event.addListener(
        loadedMap,
        "click",
        (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const position = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            }
            onMarkerAdd(position)
          }
        }
      )
    }
  }, [clickable, onMarkerAdd, onMapLoad])

  // bounds_changedイベントの処理
  const handleBoundsChanged = useCallback((center: GoogleLatLng, zoom: number) => {
    setCurrentCenter(center)
    setCurrentZoom(zoom)
    if (onBoundsChanged) {
      onBoundsChanged(center, zoom)
    }
  }, [onBoundsChanged])

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return () => {
      if (clickListenerRef.current) {
        google.maps.event.removeListener(clickListenerRef.current)
        clickListenerRef.current = null
      }
    }
  }, [])

  return (
    <GoogleMap
      center={currentCenter}
      zoom={currentZoom}
      markers={markers}
      className={className}
      onMapLoad={handleMapLoad}
      onBoundsChanged={handleBoundsChanged}
      instanceId={instanceId}
    >
      {children}
    </GoogleMap>
  )
}
