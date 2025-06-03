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

// サンプルスポットデータ
const sampleSpots = [{ id: 1, name: "東京タワー", category: "観光", address: "東京都港区芝公園4-2-8" }]

export default function AddSpots() {
  const router = useRouter()
  const [spots, setSpots] = useState(sampleSpots)
  const [newSpot, setNewSpot] = useState({
    name: "",
    category: "",
    address: "",
  })

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = spots.length > 0 ? Math.max(...spots.map((s) => s.id)) + 1 : 1
    setSpots([...spots, { ...newSpot, id: newId }])
    setNewSpot({ name: "", category: "", address: "" })
  }

  const handleComplete = () => {
    // 実際のアプリではここでデータを保存する処理を行う
    router.push("/home")
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">東京都のマップにスポットを追加</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="bg-muted rounded-lg h-48 sm:h-[400px] flex items-center justify-center mb-4 sm:mb-6">
            <img
              src="/placeholder.svg?height=400&width=800&text=東京都マップ"
              alt="東京都マップ"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">追加済みスポット ({spots.length})</h2>

          <div className="space-y-3">
            {spots.map((spot) => (
              <Card key={spot.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{spot.name}</h3>
                      <p className="text-sm text-muted-foreground">{spot.category}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {spot.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

          <Button onClick={handleComplete} className="w-full mt-4" variant="outline">
            完了
          </Button>
        </div>
      </div>
    </div>
  )
}
