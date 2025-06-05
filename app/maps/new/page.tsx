"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MapPin, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import InteractiveMap from "@/components/interactive-map"
import RouteMap from "@/components/route-map"
import { saveMap } from "@/lib/map-storage"

// サンプルスポットデータ
const sampleSpots = [
  {
    id: 1,
    name: "別府海浜砂湯",
    category: "温泉",
    address: "大分県別府市上人ヶ浜町",
    position: { lat: 33.2841, lng: 131.4448 },
  },
]

export default function AddSpots() {
  const router = useRouter()
  const [spots, setSpots] = useState(sampleSpots)
  const [newSpot, setNewSpot] = useState({
    name: "",
    category: "",
    address: "",
  })
  const [routePoints, setRoutePoints] = useState<number[]>([])
  const [mapTitle, setMapTitle] = useState("")
  const [mapCategory, setMapCategory] = useState("")

  // マップクリックで新規ピンを追加
  const handleMapClick = (position: { lat: number; lng: number }) => {
    const newId = spots.length > 0 ? Math.max(...spots.map((s) => s.id)) + 1 : 1
    setSpots([
      ...spots,
      {
        id: newId,
        name: `新規スポット${newId}`,
        category: "その他",
        address: "",
        position,
      },
    ])
  }

  // ピンをクリックしてルートに追加
  const handleMarkerClick = (markerId: number) => {
    if (!routePoints.includes(markerId)) {
      setRoutePoints([...routePoints, markerId])
    }
  }

  // ルート用スポット配列
  const routeSpots = routePoints.map((id) => spots.find((s) => s.id === id)).filter(Boolean) as typeof spots

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = spots.length > 0 ? Math.max(...spots.map((s) => s.id)) + 1 : 1
    setSpots([
      ...spots,
      {
        ...newSpot,
        id: newId,
        position: { lat: 33.2395578 + Math.random() * 0.1, lng: 131.6095468 + Math.random() * 0.1 },
      },
    ])
    setNewSpot({ name: "", category: "", address: "" })
  }

  const handleComplete = () => {
    if (!mapTitle) {
      alert("マップのタイトルを入力してください")
      return
    }
    if (!mapCategory) {
      alert("マップのカテゴリーを選択してください")
      return
    }

    // マップデータを保存
    const mapData = {
      title: mapTitle,
      author: "ゲストユーザー", // 後で認証機能を追加する際に変更
      spots: spots,
      category: mapCategory,
      center: oitaCenter,
    }

    saveMap(mapData)
    router.push("/maps")
  }

  // マーカーデータを作成
  const markers = spots.map((spot) => ({
    id: spot.id,
    position: spot.position,
    title: spot.name,
    category: spot.category,
  }))

  // 大分県の中心
  const oitaCenter = { lat: 33.2395578, lng: 131.6095468 }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">大分県のマップにスポットを追加</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg h-48 sm:h-[400px] mb-4 sm:mb-6 overflow-hidden">
            <InteractiveMap
              center={oitaCenter}
              markers={markers}
              clickable={true}
              onMarkerAdd={handleMapClick}
              onMapLoad={undefined}
              className="h-full"
              // マーカークリックでルートに追加
              // Google Maps APIのマーカークリックイベントをカスタムで渡す場合は、InteractiveMap側の拡張が必要
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">追加済みスポット ({spots.length})</h2>

          <div className="space-y-3">
            {spots.map((spot) => (
              <Card key={spot.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium cursor-pointer text-blue-600 underline" onClick={() => handleMarkerClick(spot.id)}>
                        {spot.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{spot.category}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {spot.address}
                      </p>
                      {routePoints.includes(spot.id) && <span className="text-xs text-orange-500 ml-2">ルートに追加済み</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ルート可視化 */}
          {routeSpots.length > 1 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">ルートプレビュー</h2>
              <RouteMap spots={routeSpots} className="h-64 rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">新しいスポットを追加</h2>

              <form onSubmit={handleAddSpot} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="spot-name">スポット名</Label>
                  <Input
                    id="spot-name"
                    placeholder="例: 東京タワー"
                    value={newSpot.name}
                    onChange={(e) => setNewSpot({ ...newSpot, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">カテゴリー</Label>
                  <Select
                    value={newSpot.category}
                    onValueChange={(value) => setNewSpot({ ...newSpot, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="観光">観光</SelectItem>
                      <SelectItem value="グルメ">グルメ</SelectItem>
                      <SelectItem value="ショッピング">ショッピング</SelectItem>
                      <SelectItem value="公園">公園</SelectItem>
                      <SelectItem value="寺社">寺社</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">住所</Label>
                  <Input
                    id="address"
                    placeholder="例: 東京都港区芝公園4-2-8"
                    value={newSpot.address}
                    onChange={(e) => setNewSpot({ ...newSpot, address: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Plus size={16} />
                  スポットを追加
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">マップの詳細</h2>
              <div className="space-y-4 mb-6">
                <div className="grid gap-2">
                  <Label htmlFor="map-title">マップのタイトル</Label>
                  <Input
                    id="map-title"
                    placeholder="例: 大分温泉巡り"
                    value={mapTitle}
                    onChange={(e) => setMapTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="map-category">カテゴリー</Label>
                  <Select
                    value={mapCategory}
                    onValueChange={setMapCategory}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="温泉">温泉</SelectItem>
                      <SelectItem value="観光">観光</SelectItem>
                      <SelectItem value="グルメ">グルメ</SelectItem>
                      <SelectItem value="自然">自然</SelectItem>
                      <SelectItem value="文化">文化</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleComplete} className="w-full mt-4" variant="outline">
                完了
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
