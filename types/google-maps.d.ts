// Google Maps型定義
declare global {
  interface Window {
    google: {
      maps: GoogleMapsType
    }
  }
}

export interface GoogleMapsType {
  Map: {
    new (element: Element, options?: google.maps.MapOptions): google.maps.Map
  }
  Marker: {
    new (options: google.maps.MarkerOptions): google.maps.Marker
  }
  DirectionsService: {
    new (): google.maps.DirectionsService
  }
  DirectionsRenderer: {
    new (options?: google.maps.DirectionsRendererOptions): google.maps.DirectionsRenderer
  }
  MapOptions: google.maps.MapOptions
  MarkerOptions: google.maps.MarkerOptions
  DirectionsRequest: google.maps.DirectionsRequest
  DirectionsResult: google.maps.DirectionsResult
  MapTypeId: {
    ROADMAP: string
    SATELLITE: string
    HYBRID: string
    TERRAIN: string
  }
  TravelMode: {
    DRIVING: string
    WALKING: string
    BICYCLING: string
    TRANSIT: string
  }
  LatLng: {
    new (lat: number, lng: number): google.maps.LatLng
    toJSON(): { lat: number; lng: number }
  }
  event: {
    clearInstanceListeners(instance: object): void
    addListener(
      instance: object,
      eventName: string,
      handler: (...args: any[]) => void
    ): google.maps.MapsEventListener
  }
}

export interface GoogleLatLng {
  lat: number
  lng: number
}

export interface GoogleMapMarker {
  id: number
  position: GoogleLatLng
  title: string
  category?: string
}

// eslint-disable-next-line no-undef
export as namespace google;
