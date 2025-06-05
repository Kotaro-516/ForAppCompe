"use client"

import { use } from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowUp, ArrowDown, MapPin, Clock, Route } from "lucide-react"

// サンプルスポットデータ
const availableSpots = [
  { id: 1, name: "東京スカイツリー", category: "観光", address: "東京都墨田区押上1-1-2", estimatedTime: 120 },
  { id: 2, name: "浅草寺", category: "寺社", address: "東京都台東区浅草2-3-1", estimatedTime: 90 },
  { id: 3, name: "上野公園", category: "公園", address: "東京都台東区上野公園", estimatedTime: 60 },
  { id: 4, name: "渋谷スクランブル交差点", category: "観光", address: "東京都渋谷区渋谷2丁目", estimatedTime: 30 },
]

export default function CreateRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id} = use(params)
  const router = useRouter()
  const [routeName, setRouteName] = useState("")
  const [transportMethod, setTransportMethod] = useState("")
  const [selectedSpots, setSelectedSpots] = useState<number[]>([])
  const [routeOrder, setRouteOrder] = useState<number[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSpotToggle = (spotId: number) => {
    if (selectedSpots.includes(spotId)) {
      setSelectedSpots(selectedSpots.filter((id) => id !== spotId))
      setRouteOrder(routeOrder.filter((id) => id !== spotId))
    } else {
      setSelectedSpots([...selectedSpots, spotId])
      setRouteOrder([...routeOrder, spotId])
    }
  }

  const moveSpotUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...routeOrder]
      ;[newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
      setRouteOrder(newOrder)
    }
  }

  const moveSpotDown = (index: number) => {
    if (index < routeOrder.length - 1) {
      const newOrder = [...routeOrder]
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
      setRouteOrder(newOrder)
    }
  }

  const calculateTotalTime = () => {
    const totalSpotTime = routeOrder.reduce((total, spotId) => {
      const spot = availableSpots.find((s) => s.id === spotId)
      return total + (spot?.estimatedTime || 0)
    }, 0)
    const travelTime = routeOrder.length > 1 ? (routeOrder.length - 1) * 30 : 0 // 移動時間を30分と仮定
    return totalSpotTime + travelTime
  }

  const handleCreateRoute = () => {
    if (!routeName || !transportMethod || routeOrder.length < 2) {
      setErrorMessage("ルート名、移動手段を入力し、2つ以上のスポットを選択してください")
      return
    }

    // 実際のアプリではここでルートデータを保存
    alert(`${routeName}が正常に作成されました`)
    router.push(`/maps/${id}`)
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href={`/maps/${id}`} className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        マップに戻る
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">新しいルートを作成</h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">エラー!</strong>
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="bg-muted rounded-lg h-48 sm:h-[400px] flex items-center justify-center mb-4 sm:mb-6">
            <img
              src="/placeholder.svg?height=400&width=800&text=ルートプレビュー"
              alt="ルートプレビュー"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">スポットを選択</h2>
              <div className="space-y-3">
                {availableSpots.map((spot) => (
                  <div key={spot.id} className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedSpots.includes(spot.id)}
                      onCheckedChange={() => handleSpotToggle(spot.id)}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{spot.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {spot.address}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock size={12} className="mr-1" />
                        滞在時間: {spot.estimatedTime}分
                      </p>
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
              <h2 className="text-xl font-semibold mb-4">ルート設定</h2>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="route-name">ルート名</Label>
                  <Input
                    id="route-name"
                    placeholder="例: 東京1日観光コース"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="transport">移動手段</Label>
                  <Select value={transportMethod} onValueChange={setTransportMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="移動手段を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walk">徒歩</SelectItem>
                      <SelectItem value="train">電車</SelectItem>
                      <SelectItem value="car">車</SelectItem>
                      <SelectItem value="bike">自転車</SelectItem>
                      <SelectItem value="mixed">徒歩・電車</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {routeOrder.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">ルート順序</h2>
                <div className="space-y-2">
                  {routeOrder.map((spotId, index) => {
                    const spot = availableSpots.find((s) => s.id === spotId)
                    return (
                      <div key={spotId} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-2">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium">{spot?.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => moveSpotUp(index)} disabled={index === 0}>
                            <ArrowUp size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSpotDown(index)}
                            disabled={index === routeOrder.length - 1}
                          >
                            <ArrowDown size={14} />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-sm">
                    <Route size={14} className="mr-2" />
                    <span>
                      総所要時間: 約{Math.floor(calculateTotalTime() / 60)}時間{calculateTotalTime() % 60}分
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button onClick={handleCreateRoute} className="w-full">
            ルートを作成
          </Button>
        </div>
      </div>
    </div>
  )
}
