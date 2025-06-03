"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
]

export default function CreateMap() {
  const router = useRouter()
  const [mapName, setMapName] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 実際のアプリではここでデータを保存する処理を行う
    router.push("/maps/new")
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">新しいマップを作成</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:gap-6">
          <div className="grid gap-2">
            <Label htmlFor="map-name">マップ名</Label>
            <Input
              id="map-name"
              placeholder="例: 東京おすすめカフェ"
              value={mapName}
              onChange={(e) => setMapName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="prefecture">都道府県</Label>
            <Select value={prefecture} onValueChange={setPrefecture} required>
              <SelectTrigger>
                <SelectValue placeholder="都道府県を選択" />
              </SelectTrigger>
              <SelectContent>
                {prefectures.map((pref) => (
                  <SelectItem key={pref} value={pref}>
                    {pref}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              placeholder="マップの説明を入力してください"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-muted rounded-md w-full max-w-sm sm:max-w-lg h-48 sm:h-64 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=256&width=512&text=マッププレビュー"
                alt="マッププレビュー"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <Button type="submit" className="mt-4">
            マップを作成してスポットを追加
          </Button>
        </div>
      </form>
    </div>
  )
}
