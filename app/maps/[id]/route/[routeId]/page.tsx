"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Navigation, Route, Share2 } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import RouteMap from "@/components/route-map"

// サンプルルートデータ
const routeData = {
  id: 1,
  name: "別府温泉1日巡り",
  description: "別府の名湯を効率よく巡るルート",
  transportMethod: "徒歩・バス",
  totalTime: 480, // 8時間
  totalDistance: "15.2km",
  spots: [
    {
      id: 1,
      name: "別府海浜砂湯",
      category: "温泉",
      address: "大分県別府市上人ヶ浜町",
      estimatedTime: 120,
      arrivalTime: "09:00",
      departureTime: "11:00",
      travelTimeToNext: 30,
      position: { lat: 33.2841, lng: 131.4448 },
    },
    {
      id: 2,
      name: "別府地獄めぐり",
      category: "観光",
      address: "大分県別府市鉄輪",
      estimatedTime: 150,
      arrivalTime: "11:30",
      departureTime: "14:00",
      travelTimeToNext: 45,
      position: { lat: 33.3208, lng: 131.4605 },
    },
    {
      id: 3,
      name: "竹瓦温泉",
      category: "温泉",
      address: "大分県別府市元町",
      estimatedTime: 90,
      arrivalTime: "14:45",
      departureTime: "16:15",
      travelTimeToNext: 35,
      position: { lat: 33.2796, lng: 131.5005 },
    },
    {
      id: 4,
      name: "別府タワー",
      category: "観光",
      address: "大分県別府市北浜",
      estimatedTime: 60,
      arrivalTime: "16:50",
      departureTime: "17:50",
      travelTimeToNext: 0,
      position: { lat: 33.2834, lng: 131.4882 },
    },
  ],
}

export default function RouteDetail({ params }: { params: Promise<{ id: string; routeId: string }> }) {
  const { id, routeId } = use(params)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(`https://oitamap.example.com/maps/${id}/route/${routeId}`)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000) // メッセージを2秒間表示
    setShowShareDialog(false)
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href={`/maps/${id}`} className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        マップに戻る
      </Link>

      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{routeData.name}</h1>
          <p className="text-muted-foreground mt-2">{routeData.description}</p>
        </div>

        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 mt-4 md:mt-0">
              <Share2 size={16} />
              ルートを共有
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ルートを共有</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>以下のリンクを共有して、このルートを友達に見せましょう：</p>
              <div className="flex gap-2">
                <Input readOnly value={`https://oitamap.example.com/maps/${id}/route/${routeId}`} />
                <Button onClick={handleShare}>コピー</Button>
              </div>
              {copySuccess && <p className="text-green-500">ルートリンクをコピーしました</p>}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg h-48 sm:h-[400px] mb-4 sm:mb-6 overflow-hidden">
            <RouteMap spots={routeData.spots} className="h-full" />
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">ルート詳細</h2>
              <div className="space-y-4">
                {routeData.spots.map((spot, index) => (
                  <div key={spot.id} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        {index < routeData.spots.length - 1 && <div className="w-0.5 h-16 bg-border mt-2"></div>}
                      </div>

                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{spot.name}</h3>
                            <Badge variant="outline" className="mt-1">
                              {spot.category}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-2 flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {spot.address}
                            </p>
                          </div>

                          <div className="text-right text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock size={12} className="mr-1" />
                              {spot.arrivalTime} - {spot.departureTime}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">滞在時間: {spot.estimatedTime}分</div>
                          </div>
                        </div>

                        {spot.travelTimeToNext > 0 && (
                          <div className="mt-3 p-2 bg-blue-50 rounded text-sm flex items-center">
                            <Navigation size={12} className="mr-2" />
                            次のスポットまで: {spot.travelTimeToNext}分 ({routeData.transportMethod})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">ルート概要</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">総所要時間</span>
                  <span className="font-medium">
                    {Math.floor(routeData.totalTime / 60)}時間{routeData.totalTime % 60}分
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">総距離</span>
                  <span className="font-medium">{routeData.totalDistance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">移動手段</span>
                  <span className="font-medium">{routeData.transportMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">スポット数</span>
                  <span className="font-medium">{routeData.spots.length}箇所</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">おすすめ時間</h2>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock size={14} className="mr-2" />
                  <span>開始時間: 09:00</span>
                </div>
                <div className="flex items-center text-sm">
                  <Route size={14} className="mr-2" />
                  <span>終了時間: 17:50</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                ※時間は目安です。混雑状況により変動する場合があります。
              </p>
            </CardContent>
          </Card>

          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">ナビゲーション開始</Button>
        </div>
      </div>
    </div>
  )
}
