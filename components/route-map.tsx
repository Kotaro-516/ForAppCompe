"use client"

import { useEffect, useRef } from "react"
import GoogleMap from "./google-map"
import { useGoogleMaps } from "@/hooks/use-google-maps"
import type { GoogleMapsType } from "@/types/google-maps"

interface RouteMapProps {
  spots: {
    id: number
    position: {
      lat: number
      lng: number
    }
    name: string
  }[]
  className?: string
  instanceId?: string
}

export default function RouteMap({
  spots,
  className = "",
  instanceId = "route",
}: RouteMapProps) {
  const { isLoaded } = useGoogleMaps()
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)

  // マップの中心を計算
  const center = spots.length
    ? {
        lat:
          spots.reduce((sum, spot) => sum + spot.position.lat, 0) / spots.length,
        lng:
          spots.reduce((sum, spot) => sum + spot.position.lng, 0) / spots.length,
      }
    : { lat: 35.6812, lng: 139.7671 } // デフォルトは東京

  useEffect(() => {
    if (!isLoaded || !spots.length || !window.google || !spots[0]) return

    const calculateRoute = async () => {
      if (!directionsRendererRef.current) {
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer()
      }

      const directionsService = new window.google.maps.DirectionsService()
      const waypoints = spots.slice(1, -1).map((spot) => ({
        location: spot.position,
        stopover: true,
      }))

      try {
        const result = await directionsService.route({
          origin: spots[0].position,
          destination: spots[spots.length - 1].position,
          waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        })

        if (directionsRendererRef.current && result) {
          directionsRendererRef.current.setDirections(result)
        }
      } catch (error) {
        console.error("ルート計算中にエラーが発生しました:", error)
      }
    }

    calculateRoute()

    // クリーンアップ
    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null)
        directionsRendererRef.current = null
      }
    }
  }, [spots, isLoaded])

  const handleMapLoad = (map: google.maps.Map) => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(map)
    }
  }

  return (
    <GoogleMap
      center={center}
      zoom={12}
      onMapLoad={handleMapLoad}
      className={className}
      instanceId={instanceId}
    />
  )
}
