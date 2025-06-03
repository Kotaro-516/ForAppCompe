"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Users, QrCode } from "lucide-react"

export default function TitleScreen() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-2 sm:px-4">
      <div
        className={`text-center space-y-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* ロゴエリア */}
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin size={48} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            マイマップ
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto px-4 text-center">
            あなただけのオリジナルマップを作成し、
            <br />
            冒険の旅に出かけよう
          </p>
        </div>

        {/* 特徴紹介 */}
        <div className="grid grid-cols-1 gap-4 max-w-sm sm:max-w-4xl mx-auto sm:grid-cols-3 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">オリジナルマップ</h3>
            <p className="text-sm text-muted-foreground">都道府県別にあなただけのマップを作成</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">QRスキャン</h3>
            <p className="text-sm text-muted-foreground">スポットのQRコードでポイント獲得</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">マップ共有</h3>
            <p className="text-sm text-muted-foreground">友達とマップやルートを共有</p>
          </div>
        </div>

        {/* スタートボタン */}
        <div className="space-y-4">
          <Link href="/home">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg"
            >
              冒険を始める
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground">無料で始められます</p>
        </div>

        {/* 統計情報 */}
        <div className="flex justify-center gap-4 sm:gap-8 text-center pt-6 sm:pt-8 border-t border-gray-200">
          <div>
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
              <Star size={16} />
              <span className="font-bold">4.8</span>
            </div>
            <p className="text-xs text-muted-foreground">ユーザー評価</p>
          </div>
          <div>
            <p className="font-bold text-lg">10,000+</p>
            <p className="text-xs text-muted-foreground">登録スポット</p>
          </div>
          <div>
            <p className="font-bold text-lg">5,000+</p>
            <p className="text-xs text-muted-foreground">アクティブユーザー</p>
          </div>
        </div>
      </div>
    </div>
  )
}
