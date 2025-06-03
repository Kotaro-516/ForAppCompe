"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Camera, QrCode, Star, MapPin, Gift } from "lucide-react"
import { toast } from "sonner"

// サンプルQRコードデータ
const qrCodeData = {
  SPOT_001_TOKYO_SKYTREE: {
    spotId: 1,
    spotName: "東京スカイツリー",
    points: 100,
    category: "観光",
    bonus: false,
  },
  SPOT_002_ASAKUSA_TEMPLE: {
    spotId: 2,
    spotName: "浅草寺",
    points: 80,
    category: "寺社",
    bonus: true,
    bonusMessage: "初回訪問ボーナス！",
  },
  SPOT_003_UENO_PARK: {
    spotId: 3,
    spotName: "上野公園",
    points: 60,
    category: "公園",
    bonus: false,
  },
}

export default function QRScanner() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [scannedSpot, setScannedSpot] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsScanning(true)
    } catch (error) {
      toast.error("カメラにアクセスできませんでした")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setIsScanning(false)
  }

  // デモ用のQRコード読み取りシミュレーション
  const simulateQRScan = (qrCode: string) => {
    const spotData = qrCodeData[qrCode as keyof typeof qrCodeData]
    if (spotData) {
      setScannedSpot(spotData)
      setShowSuccessModal(true)
      stopCamera()

      // ポイント付与の処理（実際のアプリではサーバーサイドで処理）
      toast.success(`${spotData.points}ポイントを獲得しました`)
    } else {
      toast.error("このQRコードは対応していません")
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">QRコードスキャン</h1>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-center px-2">
          スポットに設置されたQRコードを読み取ってポイントを獲得しよう！
        </p>

        <Card className="w-full max-w-sm sm:max-w-md">
          <CardContent className="p-4 sm:p-6">
            {!isScanning ? (
              <div className="text-center space-y-4">
                <div className="w-full max-w-xs sm:max-w-sm mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <QrCode size={48} className="sm:hidden text-muted-foreground" />
                  <QrCode size={64} className="hidden sm:block text-muted-foreground" />
                </div>
                <Button onClick={startCamera} className="w-full flex items-center gap-2">
                  <Camera size={16} />
                  カメラを起動
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-40 sm:h-48 bg-black rounded-lg" />
                  <div className="absolute inset-0 border-2 border-white rounded-lg">
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white"></div>
                  </div>
                </div>

                <p className="text-sm text-center text-muted-foreground">QRコードをカメラに向けてください</p>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={stopCamera} className="flex-1">
                    キャンセル
                  </Button>
                </div>

                {/* デモ用ボタン */}
                <div className="border-t pt-4 space-y-2">
                  <p className="text-xs text-center text-muted-foreground">デモ用</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" onClick={() => simulateQRScan("SPOT_001_TOKYO_SKYTREE")}>
                      東京スカイツリー QR
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => simulateQRScan("SPOT_002_ASAKUSA_TEMPLE")}>
                      浅草寺 QR (ボーナス)
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">ポイント獲得のコツ</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <MapPin size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">スポット訪問</p>
                <p className="text-xs text-muted-foreground">各スポットで50-100ポイント獲得</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Gift size={16} className="text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">初回ボーナス</p>
                <p className="text-xs text-muted-foreground">初回訪問時は追加ポイント</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Star size={16} className="text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">ルート完走</p>
                <p className="text-xs text-muted-foreground">ルート内全スポット訪問で特別ボーナス</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ポイント獲得成功モーダル */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">ポイント獲得！</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <Star size={32} className="text-yellow-500" />
            </div>

            {scannedSpot && (
              <>
                <div>
                  <h3 className="font-semibold text-lg">{scannedSpot.spotName}</h3>
                  <p className="text-sm text-muted-foreground">{scannedSpot.category}</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">+{scannedSpot.points} ポイント</p>
                  {scannedSpot.bonus && <p className="text-sm text-yellow-700 mt-1">🎉 {scannedSpot.bonusMessage}</p>}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowSuccessModal(false)} className="flex-1">
                    続けてスキャン
                  </Button>
                  <Button onClick={() => router.push("/points")} className="flex-1">
                    履歴を見る
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
