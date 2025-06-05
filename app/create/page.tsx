"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Trash2 } from "lucide-react"
import Link from "next/link"
import InteractiveMap from "@/components/interactive-map"
// import { useToast } from "@/components/ui/use-toast" // Removed useToast import

// 大分県の市町村
const oitaCities = [
  "大分市",
  "別府市",
  "中津市",
  "日田市",
  "佐伯市",
  "臼杵市",
  "津久見市",
  "竹田市",
  "豊後高田市",
  "杵築市",
  "宇佐市",
  "豊後大野市",
  "由布市",
  "国東市",
  "東国東郡姫島村",
  "速見郡日出町",
  "玖珠郡九重町",
  "玖珠郡玖珠町",
]

// スポットカテゴリー
const categories = ["温泉", "観光", "グルメ", "自然", "文化", "ショッピング", "その他"]

interface Spot {
  id: number
  name: string
  category: string
  position: { lat: number; lng: number }
  description?: string
}

export default function CreateMap() {
  const router = useRouter()
  // const { toast } = useToast() // Removed toast
  const [mapName, setMapName] = useState("")
  const [city, setCity] = useState("")
  const [description, setDescription] = useState("")
  const [spots, setSpots] = useState<Spot[]>([])
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  const [spotName, setSpotName] = useState("")
  const [spotCategory, setSpotCategory] = useState("")
  const [spotDescription, setSpotDescription] = useState("")
  const [showSpotForm, setShowSpotForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // 大分県の中心
  const oitaCenter = { lat: 33.2395578, lng: 131.6095468 }

  // マップクリック時の処理
  const handleMapClick = (position: { lat: number; lng: number }) => {
    setSelectedSpot({
      id: Date.now(),
      name: "",
      category: "",
      position,
    })
    setSpotName("")
    setSpotCategory("")
    setSpotDescription("")
    setShowSpotForm(true)
  }

  // スポット追加の処理
  const handleAddSpot = () => {
    if (!spotName || !spotCategory || !selectedSpot) {
      // toast({
      //   title: "入力エラー",
      //   description: "スポット名とカテゴリーを入力してください",
      //   variant: "destructive",
      // })
      setErrorMessage("スポット名とカテゴリーを入力してください")
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    const newSpot: Spot = {
      ...selectedSpot,
      name: spotName,
      category: spotCategory,
      description: spotDescription,
    }

    setSpots([...spots, newSpot])
    setShowSpotForm(false)
    setSelectedSpot(null)
    setSpotName("")
    setSpotCategory("")
    setSpotDescription("")

    // toast({
    //   title: "スポットを追加しました",
    //   description: `${spotName}をマップに追加しました`,
    // })
    setSuccessMessage(`${spotName}をマップに追加しました`)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  // スポット削除の処理
  const handleRemoveSpot = (spotId: number) => {
    setSpots(spots.filter((spot) => spot.id !== spotId))
    // toast({
    //   title: "スポットを削除しました",
    //   description: "スポットをマップから削除しました",
    // })
    setSuccessMessage("スポットをマップから削除しました")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  // マップ作成の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mapName || !city) {
      // toast({
      //   title: "入力エラー",
      //   description: "マップ名と市町村を入力してください",
      //   variant: "destructive",
      // })
      setErrorMessage("マップ名と市町村を入力してください")
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    if (spots.length === 0) {
      // toast({
      //   title: "スポットが必要です",
      //   description: "少なくとも1つのスポットを追加してください",
      //   variant: "destructive",
      // })
      setErrorMessage("少なくとも1つのスポットを追加してください")
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    // 実際のアプリではここでデータを保存する処理を行う
    // toast({
    //   title: "マップを作成しました",
    //   description: `${mapName}が正常に作成されました`,
    // })
    setSuccessMessage(`${mapName}が正常に作成されました`)
    setTimeout(() => setSuccessMessage(null), 3000)
    router.push("/maps/new")
  }

  // マーカーデータを作成
  const markers = spots.map((spot) => ({
    id: spot.id,
    position: spot.position,
    title: spot.name,
    category: spot.category,
  }))

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">新しい大分マップを作成</h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">エラー!</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">成功!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* マップ表示エリア */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                マップ上でスポットを選択
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                地図をクリックしてスポットを追加できます。追加したいスポットの場所をクリックしてください。
              </p>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg h-64 sm:h-[400px] overflow-hidden">
                <InteractiveMap
                  center={oitaCenter}
                  zoom={9}
                  markers={markers}
                  onMarkerAdd={handleMapClick}
                  onMarkerRemove={handleRemoveSpot}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* 追加済みスポット一覧 */}
          {spots.length > 0 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>追加済みスポット ({spots.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {spots.map((spot) => (
                    <div key={spot.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <h3 className="font-medium">{spot.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{spot.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {spot.position.lat.toFixed(4)}, {spot.position.lng.toFixed(4)}
                          </span>
                        </div>
                        {spot.description && <p className="text-sm text-muted-foreground mt-1">{spot.description}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSpot(spot.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* フォームエリア */}
        <div className="space-y-6">
          {/* マップ基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>マップ基本情報</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="map-name">マップ名</Label>
                  <Input
                    id="map-name"
                    placeholder="例: 別府温泉巡り、湯布院グルメ散策"
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="city">市町村</Label>
                  <Select value={city} onValueChange={setCity} required>
                    <SelectTrigger>
                      <SelectValue placeholder="大分県内の市町村を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {oitaCities.map((cityName) => (
                        <SelectItem key={cityName} value={cityName}>
                          {cityName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">説明</Label>
                  <Textarea
                    id="description"
                    placeholder="マップの説明を入力してください（例：別府の名湯を巡る1日コース）"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500">
                  マップを作成 ({spots.length}スポット)
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* スポット追加フォーム */}
          {showSpotForm && selectedSpot && (
            <Card>
              <CardHeader>
                <CardTitle>スポット情報を入力</CardTitle>
                <p className="text-sm text-muted-foreground">
                  選択した位置: {selectedSpot.position.lat.toFixed(4)}, {selectedSpot.position.lng.toFixed(4)}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="spot-name">スポット名</Label>
                    <Input
                      id="spot-name"
                      placeholder="例: 別府海浜砂湯"
                      value={spotName}
                      onChange={(e) => setSpotName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="spot-category">カテゴリー</Label>
                    <Select value={spotCategory} onValueChange={setSpotCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリーを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="spot-description">説明（任意）</Label>
                    <Textarea
                      id="spot-description"
                      placeholder="スポットの説明を入力してください"
                      value={spotDescription}
                      onChange={(e) => setSpotDescription(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddSpot} className="flex-1">
                      スポットを追加
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowSpotForm(false)
                        setSelectedSpot(null)
                      }}
                      className="flex-1"
                    >
                      キャンセル
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 使い方ガイド */}
          <Card>
            <CardHeader>
              <CardTitle>使い方</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 mt-0.5">
                    1
                  </span>
                  <span>地図上でスポットを追加したい場所をクリック</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 mt-0.5">
                    2
                  </span>
                  <span>スポット名とカテゴリーを入力</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 mt-0.5">
                    3
                  </span>
                  <span>複数のスポットを追加してマップを完成</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
