// Google Maps APIの読み込み状態を管理
let isLoading = false
let isLoaded = false
let loadError: Error | null = null
let loadPromise: Promise<void> | null = null

// APIキーを環境変数から取得
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

// APIの読み込み状態を確認
export const getLoadState = () => ({
  isLoading,
  isLoaded,
  loadError,
})

export const loadGoogleMapsApi = () => {
  // すでにエラーが発生している場合は、エラーをクリアして再試行
  if (loadError) {
    loadError = null
  }

  // すでに読み込み済みの場合
  if (isLoaded && window.google?.maps) {
    return Promise.resolve()
  }

  // 読み込み中の場合は既存のPromiseを返す
  if (loadPromise) {
    return loadPromise
  }

  // スクリプトの重複読み込みを防止
  const existingScript = document.getElementById("google-maps-script")
  if (existingScript && !isLoaded) {
    // スクリプトが存在するが読み込みが完了していない場合は削除して再読み込み
    document.head.removeChild(existingScript)
  }

  // 新規読み込み
  loadPromise = new Promise<void>((resolve, reject) => {
    try {
      isLoading = true

      const script = document.createElement("script")
      script.id = "google-maps-script"
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => {
        isLoaded = true
        isLoading = false
        loadError = null
        resolve()
      }

      script.onerror = (event) => {
        const error = new Error("Failed to load Google Maps API")
        loadError = error
        isLoading = false
        reject(error)
      }

      document.head.appendChild(script)
    } catch (error) {
      loadError = error as Error
      isLoading = false
      reject(error)
    }
  })

  return loadPromise
}
