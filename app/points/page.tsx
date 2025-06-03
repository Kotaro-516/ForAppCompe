"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, MapPin, Calendar, Gift, Trophy, QrCode } from "lucide-react"

// サンプルポイント履歴データ
const pointHistory = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:30",
    spotName: "東京スカイツリー",
    points: 100,
    type: "visit",
    bonus: false,
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "16:45",
    spotName: "浅草寺",
    points: 80,
    type: "visit",
    bonus: true,
    bonusReason: "初回訪問ボーナス",
  },
  {
    id: 3,
    date: "2024-01-14",
    time: "11:20",
    spotName: "上野公園",
    points: 60,
    type: "visit",
    bonus: false,
  },
  {
    id: 4,
    date: "2024-01-14",
    time: "09:15",
    spotName: "東京1日観光コース",
    points: 200,
    type: "route_complete",
    bonus: true,
    bonusReason: "ルート完走ボーナス",
  },
]

// サンプル統計データ
const stats = {
  totalPoints: 1250,
  visitedSpots: 12,
  completedRoutes: 2,
  currentRank: "ゴールド",
  nextRankPoints: 250,
}

export default function PointsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">ポイント履歴</h1>
          <p className="text-muted-foreground mt-2">あなたの冒険の記録</p>
        </div>

        <Link href="/scan">
          <Button className="flex items-center gap-2 mt-4 md:mt-0">
            <QrCode size={16} />
            QRスキャン
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
          <TabsTrigger value="achievements">実績</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">総ポイント</p>
                    <p className="text-lg sm:text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                  </div>
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">訪問スポット</p>
                    <p className="text-lg sm:text-2xl font-bold">{stats.visitedSpots}</p>
                  </div>
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">完走ルート</p>
                    <p className="text-lg sm:text-2xl font-bold">{stats.completedRoutes}</p>
                  </div>
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">現在のランク</p>
                    <p className="text-lg sm:text-2xl font-bold">{stats.currentRank}</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    ランク
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>次のランクまで</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>プラチナまで</span>
                  <span>{stats.nextRankPoints}ポイント</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${((1500 - stats.nextRankPoints) / 1500) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  あと{stats.nextRankPoints}ポイントでプラチナランクに昇格！
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {pointHistory.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{entry.spotName}</h3>
                      {entry.type === "route_complete" && <Badge variant="secondary">ルート完走</Badge>}
                      {entry.bonus && (
                        <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                          <Gift size={12} className="mr-1" />
                          ボーナス
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {entry.date}
                      </div>
                      <span>{entry.time}</span>
                    </div>

                    {entry.bonus && entry.bonusReason && (
                      <p className="text-xs text-yellow-700 mt-1">🎉 {entry.bonusReason}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                      <Star size={16} />+{entry.points}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">初心者冒険家</h3>
                    <p className="text-sm text-muted-foreground">初回スポット訪問</p>
                    <Badge variant="secondary" className="mt-1">
                      達成済み
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">東京マスター</h3>
                    <p className="text-sm text-muted-foreground">東京都内10スポット訪問</p>
                    <Badge variant="secondary" className="mt-1">
                      達成済み
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">ルートマスター</h3>
                    <p className="text-sm text-muted-foreground">3つのルートを完走</p>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "66%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">2/3 完了</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">コレクター</h3>
                    <p className="text-sm text-muted-foreground">全都道府県制覇</p>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">4/47 完了</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
