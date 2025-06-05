"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Camera, QrCode, Star, Gift, Mountain, Waves } from "lucide-react"
import { BrowserQRCodeReader } from "@zxing/browser"
import { NotFoundException } from "@zxing/library"
import { QRCodeSVG } from "qrcode.react"

// 大分県のサンプルQRコードデータ
const qrCodeData = {
  SPOT_001_BEPPU_ONSEN: {
    spotId: 1,
    spotName: "別府海浜砂湯",
    points: 120,
    category: "温泉",
    bonus: false,
  },
  SPOT_002_YUFUIN_ONSEN: {
    spotId: 2,
    spotName: "湯布院温泉",
    points: 100,
    category: "温泉",
    bonus: true,
    bonusMessage: "初回訪問ボーナス！",
  },
  SPOT_003_KUJU_MOUNTAIN: {
    spotId: 3,
    spotName: "九重連山",
    points: 150,
    category: "自然",
    bonus: false,
  },
}

export default function QRScanner() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [scannedSpot, setScannedSpot] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const qrReaderRef = useRef<BrowserQRCodeReader | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Added error message state
  const qrControlsRef = useRef<{ stop: () => void } | null>(null) // 追加
  const [qrText, setQrText] = useState("")

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsScanning(true)
      setErrorMessage(null)

      if (!qrReaderRef.current) {
        qrReaderRef.current = new BrowserQRCodeReader()
      }
      if (videoRef.current) {
        // controlsを保存
        qrControlsRef.current = await qrReaderRef.current.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, err) => {
            if (result) {
              simulateQRScan(result.getText())
            }
            if (err && !(err instanceof NotFoundException)) {
              setErrorMessage("QRコードの読み取り中にエラーが発生しました")
            }
          }
        )
      }
    } catch (error: any) {
      setErrorMessage("カメラにアクセスできませんでした")
      setIsScanning(false)
      console.error("Camera access error:", error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    // ZXingのクリーンアップ
    if (qrControlsRef.current) {
      qrControlsRef.current.stop()
      qrControlsRef.current = null
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
      // toast({ // Replaced toast with alert
      //   title: "ポイント獲得！",
      //   description: `${spotData.points}ポイントを獲得しました`,
      // })
      alert(`${spotData.points}ポイントを獲得しました`)
    } else {
      // toast({ // Replaced toast with alert and state update
      //   title: "無効なQRコード",
      //   description: "このQRコードは対応していません",
      //   variant: "destructive",
      // })
      setErrorMessage("このQRコードは対応していません")
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
          大分県の観光スポットに設置されたQRコードを読み取ってポイントを獲得しよう！
        </p>

        <Card className="w-full max-w-sm sm:max-w-md">
          <CardContent className="p-4 sm:p-6">
            {!isScanning ? (
              <div className="text-center space-y-4">
                <div className="w-full max-w-xs sm:max-w-sm mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                  <QrCode size={48} className="sm:hidden text-orange-600" />
                  <QrCode size={64} className="hidden sm:block text-orange-600" />
                </div>
                <Button
                  onClick={startCamera}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500"
                >
                  <Camera size={16} />
                  カメラを起動
                </Button>
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
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
                {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={stopCamera} className="flex-1">
                    キャンセル
                  </Button>
                </div>

                {/* デモ用ボタン */}
                <div className="border-t pt-4 space-y-2">
                  <p className="text-xs text-center text-muted-foreground">デモ用</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" onClick={() => simulateQRScan("SPOT_001_BEPPU_ONSEN")}>
                      別府海浜砂湯 QR
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => simulateQRScan("SPOT_002_YUFUIN_ONSEN")}>
                      湯布院温泉 QR (ボーナス)
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QRコード生成セクション */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">QRコードを生成</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="QRコードに含めるテキストを入力"
              className="w-full p-2 border rounded"
            />
            {qrText && (
              <div className="flex justify-center">
                <QRCodeSVG value={qrText} size={128} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">ポイント獲得のコツ</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <Mountain size={16} className="text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">温泉スポット訪問</p>
                <p className="text-xs text-muted-foreground">各温泉で100-150ポイント獲得</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Gift size={16} className="text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">初回ボーナス</p>
                <p className="text-xs text-muted-foreground">初回訪問時は追加ポイント</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Waves size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">自然スポット</p>
                <p className="text-xs text-muted-foreground">九重連山などで特別ポイント</p>
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
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <Star size={32} className="text-orange-500" />
            </div>

            {scannedSpot && (
              <>
                <div>
                  <h3 className="font-semibold text-lg">{scannedSpot.spotName}</h3>
                  <p className="text-sm text-muted-foreground">{scannedSpot.category}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">+{scannedSpot.points} ポイント</p>
                  {scannedSpot.bonus && <p className="text-sm text-orange-700 mt-1">🎉 {scannedSpot.bonusMessage}</p>}
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
