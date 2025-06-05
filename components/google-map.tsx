"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import MapFallback from "./map-fallback"
import { useGoogleMaps } from "@/hooks/use-google-maps"
import {
  getMapInstance,
  setMapInstance,
  deleteMapInstance,
} from "@/lib/map-storage"
import type { GoogleMapMarker, GoogleLatLng } from "@/types/google-maps"

interface GoogleMapProps {
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  markers?: GoogleMapMarker[]
  children?: React.ReactNode
  className?: string
  onMapLoad?: (map: google.maps.Map) => void
  onBoundsChanged?: (center: GoogleLatLng, zoom: number) => void
  instanceId?: string
}

export default function GoogleMap({
  center: initialCenter,
  zoom: initialZoom = 13,
  markers = [],
  children,
  className = "",
  onMapLoad,
  onBoundsChanged,
  instanceId = "default",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<{ [key: number]: google.maps.Marker }>({})
  const boundsListenerRef = useRef<google.maps.MapsEventListener | null>(null)
  const { isLoaded, error } = useGoogleMaps()

  // 現在の中心位置とズームレベルを内部状態として管理
  const [currentCenter, setCurrentCenter] = useState(initialCenter)
  const [currentZoom, setCurrentZoom] = useState(initialZoom)

  // マップの初期化処理
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return

    // すでにマップインスタンスが存在する場合は初期化をスキップ
    if (mapInstanceRef.current) return

    // キャッシュされたマップインスタンスがあれば再利用
    let mapInstance = getMapInstance(instanceId)

    if (!mapInstance) {
      // 新規作成
      const mapOptions: google.maps.MapOptions = {
        center: currentCenter,
        zoom: currentZoom,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }

      mapInstance = new window.google.maps.Map(mapRef.current, mapOptions)
      setMapInstance(instanceId, mapInstance)
    } else {
      // 既存のインスタンスを再利用
      const node = mapRef.current
      while (node.firstChild) {
        node.removeChild(node.firstChild)
      }
      node.appendChild(mapInstance.getDiv())
    }

    // bounds_changedイベントリスナーを設定
    boundsListenerRef.current = google.maps.event.addListener(
      mapInstance,
      "bounds_changed",
      () => {
        const newCenter = mapInstance.getCenter()
        const newZoom = mapInstance.getZoom()
        if (newCenter && newZoom) {
          const centerObj = { lat: newCenter.lat(), lng: newCenter.lng() }
          setCurrentCenter(centerObj)
          setCurrentZoom(newZoom)
          if (onBoundsChanged) {
            onBoundsChanged(centerObj, newZoom)
          }
        }
      }
    )

    // 参照を保存
    mapInstanceRef.current = mapInstance
    if (onMapLoad) onMapLoad(mapInstance)

    return () => {
      // クリーンアップ処理
      if (boundsListenerRef.current) {
        google.maps.event.removeListener(boundsListenerRef.current)
        boundsListenerRef.current = null
      }
      Object.values(markersRef.current).forEach((marker) => {
        marker.setMap(null)
      })
      markersRef.current = {}
      if (mapInstanceRef.current) {
        deleteMapInstance(instanceId)
        mapInstanceRef.current = null
      }
    }
  }, [isLoaded, instanceId, onMapLoad, onBoundsChanged])

  // マーカーの更新
  useEffect(() => {
    const mapInstance = mapInstanceRef.current
    if (!mapInstance || !markers.length || !window.google) return

    // 既存のマーカーをクリア
    Object.values(markersRef.current).forEach((marker) => {
      marker.setMap(null)
    })
    markersRef.current = {}

    // 新しいマーカーを追加
    markers.forEach((marker) => {
      const markerInstance = new window.google.maps.Marker({
        position: marker.position,
        map: mapInstance,
        title: marker.title,
      })
      markersRef.current[marker.id] = markerInstance
    })
  }, [markers])

  // 外部からのcenterとzoomの更新を処理（ただし、ユーザーの操作中は無視）
  useEffect(() => {
    const mapInstance = mapInstanceRef.current
    if (!mapInstance || (currentCenter === initialCenter && currentZoom === initialZoom)) return

    // ユーザーが手動で変更した場合は、propsの更新を無視
    if (
      Math.abs(mapInstance.getCenter()?.lat() ?? 0 - currentCenter.lat) > 0.0001 ||
      Math.abs(mapInstance.getCenter()?.lng() ?? 0 - currentCenter.lng) > 0.0001 ||
      mapInstance.getZoom() !== currentZoom
    ) {
      return
    }

    mapInstance.setCenter(initialCenter)
    mapInstance.setZoom(initialZoom)
  }, [initialCenter, initialZoom, currentCenter, currentZoom])

  if (!isLoaded || error) {
    return (
      <MapFallback
        center={currentCenter}
        markers={markers}
        className={className}
        error={error || undefined}
      />
    )
  }

  return (
    <div className={`${className} relative`}>
      <div ref={mapRef} className="h-full w-full" style={{ minHeight: "300px" }}>
        {children}
      </div>
    </div>
  )
}
