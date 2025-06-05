"use client"

import { use } from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, MapPin, Plus, Share2, Star, QrCode, Mountain, Waves } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast" // 削除
import GoogleMap from "@/components/google-map"


// 大分県のサンプルスポットデータ
const sampleSpots = [
  {
    id: 1,
    name: "別府海浜砂湯",
    category: "温泉",
    rating: 4.6,
    address: "大分県別府市上人ヶ浜町",
    qrCode: "SPOT_001_BEPPU_ONSEN",
    points: 120,
    position: { lat: 33.2841, lng: 131.4448 }, // 別府海浜砂湯の位置
  },
  {
    id: 2,
    name: "湯布院温泉",
    category: "温泉",
    rating: 4.5,
    address: "大分県由布市湯布院町川上",
    qrCode: "SPOT_002_YUFUIN_ONSEN",
    points: 100,
    position: { lat: 33.2648, lng: 131.3582 }, // 湯布院温泉の位置
  },
  {
    id: 3,
    name: "九重連山",
    category: "自然",
    rating: 4.7,
    address: "大分県玖珠郡九重町",
    qrCode: "SPOT_003_KUJU_MOUNTAIN",
    points: 150,
    position: { lat: 33.0863, lng: 131.2404 }, // 九重連山の位置
  },
  {
    id: 4,
    name: "臼杵石仏群",
    category: "文化",
    rating: 4.3,
    address: "大分県臼杵市深田",
    qrCode: "SPOT_004_USUKI_STONE",
    points: 80,
    position: { lat: 33.1261, lng: 131.8048 }, // 臼杵石仏群の位置
  },
]

export default function MapDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id,  } = use(params)
  // const { toast } = useToast() // 削除
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false) // 状態管理を追加

  // マップの中心位置を計算（スポットの平均位置）
  const mapCenter =
    sampleSpots.length > 0
      ? {
          lat: sampleSpots.reduce((sum, spot) => sum + spot.position.lat, 0) / sampleSpots.length,
          lng: sampleSpots.reduce((sum, spot) => sum + spot.position.lng, 0) / sampleSpots.length,
        }
      : { lat: 33.2395578, lng: 131.6095468 } // 大分県の中心あたり

  // マーカーデータを作成
  const markers = sampleSpots.map((spot) => ({
    id: spot.id,
    position: spot.position,
    title: spot.name,
    category: spot.category,
  }))

  const handleShare = () => {
    // 実際のアプリではここで共有リンクを生成する処理を行う
    navigator.clipboard.writeText(`https://oitamap.example.com/maps/${id}`)
    // toast({ // 削除
    //   title: "共有リンクをコピーしました",
    //   description: "リンクをSNSやメッセージで共有できます",
    // })
    setShareSuccess(true) // 状態をtrueに設定
    setShowShareDialog(false)
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">別府温泉巡り</h1>
          <div className="flex items-center mt-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src="/placeholder.svg" alt="@user" />
              <AvatarFallback>大</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">作成者: 大分太郎</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 size={16} />
                共有
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>マップを共有</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p>以下のリンクを共有して、あなたのマップを友達に見せましょう：</p>
                <div className="flex gap-2">
                  <Input readOnly value={`https://oitamap.example.com/maps/${id}`} />
                  <Button onClick={handleShare}>コピー</Button>
                </div>
                {shareSuccess && <p className="text-green-500">共有リンクをコピーしました！</p>}
              </div>
            </DialogContent>
          </Dialog>

          <Link href={`/maps/${id}/route/create`}>
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin size={16} />
              ルートを作成
            </Button>
          </Link>

          <Link href={`/maps/${id}/edit`}>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500">
              <Plus size={16} />
              スポットを追加
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg h-48 sm:h-[400px] mb-4 sm:mb-6 overflow-hidden">
            <GoogleMap center={mapCenter} markers={markers} className="h-full" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-4">おすすめルート</h2>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">別府温泉1日巡り</h3>
                    <p className="text-sm text-muted-foreground">4温泉 • 約8時間 • 徒歩・バス</p>
                  </div>
                  <Link href={`/maps/${id}/route/1`}>
                    <Button variant="outline" size="sm">
                      詳細
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold">登録スポット ({sampleSpots.length})</h2>

          {sampleSpots.map((spot) => (
            <Card key={spot.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{spot.name}</h3>
                      {spot.category === "温泉" && <Mountain size={16} className="text-orange-500" />}
                      {spot.category === "自然" && <Waves size={16} className="text-blue-500" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={
                          spot.category === "温泉"
                            ? "border-orange-200 text-orange-700"
                            : spot.category === "自然"
                              ? "border-blue-200 text-blue-700"
                              : "border-gray-200 text-gray-700"
                        }
                      >
                        {spot.category}
                      </Badge>
                      <div className="flex items-center text-sm">
                        <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                        {spot.rating}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {spot.address}
                    </p>
                    {/* QRコード情報を追加 */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center text-xs text-orange-600">
                        <QrCode size={12} className="mr-1" />
                        {spot.points}pt
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        QR設置済み
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
