import { useState, useEffect, useCallback } from "react"
import { loadGoogleMapsApi } from "@/lib/google-maps-loader"

// APIの使用回数をトラッキング
let apiCallCount = 0

export function useGoogleMaps(retryCount = 3) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [retries, setRetries] = useState(0)

  const loadMaps = useCallback(async () => {
    try {
      await loadGoogleMapsApi()
      setIsLoaded(true)
      setError(null)
      apiCallCount++
      console.log(`Google Maps API called ${apiCallCount} times`)
    } catch (err) {
      setError(err as Error)
      if (retries < retryCount) {
        // リトライ間隔を徐々に増やす（exponential backoff）
        const delay = Math.min(1000 * Math.pow(2, retries), 10000)
        setTimeout(() => {
          setRetries((prev) => prev + 1)
        }, delay)
      }
    }
  }, [retries, retryCount])

  useEffect(() => {
    if (!isLoaded && !error) {
      loadMaps()
    }
  }, [isLoaded, error, loadMaps, retries])

  return { isLoaded, error }
}

// API呼び出し回数を取得
export const getApiCallCount = () => apiCallCount
