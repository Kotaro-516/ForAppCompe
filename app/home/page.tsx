"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
<<<<<<< HEAD
import { MapPin, Plus, QrCode, Star, Route, Trophy, TrendingUp, Clock, Gift, Mountain, Waves } from "lucide-react"
=======
import { MapPin, Plus, QrCode, Star, Route, Trophy, Users, TrendingUp, Clock, Gift } from "lucide-react"
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d

export default function HomePage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* ヘッダー */}
      <div className="text-center mb-8">
<<<<<<< HEAD
        <h1 className="text-3xl font-bold mb-2">おかえりなさい、冒険者さん！</h1>
        <p className="text-muted-foreground">今日はどの大分スポットを探検しますか？</p>
      </div>

      {/* ユーザー情報 */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">あなたの大分探検ステータス</h2>
            <p className="text-muted-foreground text-sm sm:text-base">現在のランク: 温泉マスター</p>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
=======
        <h1 className="text-3xl font-bold mb-2">ようこそ、冒険者さん！</h1>
        <p className="text-muted-foreground">今日はどんな冒険をしますか？</p>
      </div>

      {/* ユーザー情報 */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">あなたの冒険ステータス</h2>
            <p className="text-muted-foreground text-sm sm:text-base">現在のランク: ゴールド</p>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
                <Star size={20} />
                <span className="font-bold text-lg">1,250</span>
              </div>
              <p className="text-sm text-muted-foreground">ポイント</p>
            </div>
            <div className="text-center">
<<<<<<< HEAD
              <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                <Mountain size={20} />
                <span className="font-bold text-lg">8</span>
              </div>
              <p className="text-sm text-muted-foreground">温泉訪問</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                <Route size={20} />
                <span className="font-bold text-lg">3</span>
=======
              <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                <MapPin size={20} />
                <span className="font-bold text-lg">12</span>
              </div>
              <p className="text-sm text-muted-foreground">訪問スポット</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                <Route size={20} />
                <span className="font-bold text-lg">2</span>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
              </div>
              <p className="text-sm text-muted-foreground">完走ルート</p>
            </div>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/scan">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6 text-center">
<<<<<<< HEAD
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <QrCode size={20} className="sm:hidden text-orange-600" />
                <QrCode size={24} className="hidden sm:block text-orange-600" />
=======
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <QrCode size={20} className="sm:hidden text-blue-600" />
                <QrCode size={24} className="hidden sm:block text-blue-600" />
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">QRスキャン</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">ポイントを獲得</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/maps">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
<<<<<<< HEAD
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} className="text-red-600" />
              </div>
              <h3 className="font-semibold mb-1">スポット一覧</h3>
              <p className="text-sm text-muted-foreground">大分を探す</p>
=======
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">マップ一覧</h3>
              <p className="text-sm text-muted-foreground">マップを探す</p>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
            </CardContent>
          </Card>
        </Link>

        <Link href="/create">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
<<<<<<< HEAD
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">マップ作成</h3>
              <p className="text-sm text-muted-foreground">新しいルート</p>
=======
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">マップ作成</h3>
              <p className="text-sm text-muted-foreground">新しいマップ</p>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
            </CardContent>
          </Card>
        </Link>

        <Link href="/points">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy size={24} className="text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-1">ポイント履歴</h3>
              <p className="text-sm text-muted-foreground">実績を確認</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 今日のおすすめ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              今日のおすすめ
            </CardTitle>
<<<<<<< HEAD
            <CardDescription>人気急上昇中の大分スポット</CardDescription>
=======
            <CardDescription>人気急上昇中のマップ</CardDescription>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
<<<<<<< HEAD
                  <h4 className="font-medium">別府温泉巡り</h4>
                  <p className="text-sm text-muted-foreground">6温泉 • 作成者: 大分太郎</p>
=======
                  <h4 className="font-medium">東京グルメスポット</h4>
                  <p className="text-sm text-muted-foreground">8スポット • 作成者: Tanaka</p>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
                </div>
                <Link href="/maps/1">
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
<<<<<<< HEAD
                  <h4 className="font-medium">湯布院グルメ散策</h4>
                  <p className="text-sm text-muted-foreground">8スポット • 作成者: 温泉花子</p>
=======
                  <h4 className="font-medium">京都観光名所</h4>
                  <p className="text-sm text-muted-foreground">12スポット • 作成者: Suzuki</p>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
                </div>
                <Link href="/maps/2">
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift size={20} />
              今週のチャレンジ
            </CardTitle>
            <CardDescription>特別ボーナスを獲得しよう</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
<<<<<<< HEAD
                  <h4 className="font-medium">3つの温泉を訪問</h4>
                  <p className="text-sm text-muted-foreground">進捗: 2/3</p>
                </div>
                <Badge variant="secondary">+150pt</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "66%" }}></div>
=======
                  <h4 className="font-medium">3つのスポットを訪問</h4>
                  <p className="text-sm text-muted-foreground">進捗: 2/3</p>
                </div>
                <Badge variant="secondary">+100pt</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "66%" }}></div>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
              </div>

              <div className="flex items-center justify-between">
                <div>
<<<<<<< HEAD
                  <h4 className="font-medium">九重連山ルートを完走</h4>
                  <p className="text-sm text-muted-foreground">進捗: 0/1</p>
                </div>
                <Badge variant="secondary">+300pt</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "0%" }}></div>
=======
                  <h4 className="font-medium">新しいルートを作成</h4>
                  <p className="text-sm text-muted-foreground">進捗: 0/1</p>
                </div>
                <Badge variant="secondary">+200pt</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "0%" }}></div>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近のアクティビティ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            最近のアクティビティ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
<<<<<<< HEAD
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Mountain size={16} className="text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">別府海浜砂湯でポイントを獲得しました</p>
                <p className="text-xs text-muted-foreground">2時間前 • +120pt</p>
=======
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Star size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">浅草寺でポイントを獲得しました</p>
                <p className="text-xs text-muted-foreground">2時間前 • +80pt</p>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Route size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
<<<<<<< HEAD
                <p className="text-sm font-medium">湯布院1日散策コースを完走しました</p>
                <p className="text-xs text-muted-foreground">昨日 • +250pt</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Waves size={16} className="text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">臼杵石仏群を訪問しました</p>
                <p className="text-xs text-muted-foreground">2日前 • +100pt</p>
=======
                <p className="text-sm font-medium">東京1日観光コースを完走しました</p>
                <p className="text-xs text-muted-foreground">昨日 • +200pt</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users size={16} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">マップが3人に共有されました</p>
                <p className="text-xs text-muted-foreground">2日前</p>
>>>>>>> abaebebe8b0dacecaa0e27b5af8d2c0c194a2a9d
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
