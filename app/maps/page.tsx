import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plus, ArrowLeft } from "lucide-react"

export default function MapsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link href="/home" className="flex items-center text-sm mb-6">
        <ArrowLeft size={16} className="mr-1" />
        ホームに戻る
      </Link>

      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">マップ一覧</h1>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-center px-4">人気のマップを探して冒険に出かけよう</p>
        <Link href="/create">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            新しいマップを作成
          </Button>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">人気のマップ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardHeader>
            <CardTitle>東京グルメスポット</CardTitle>
            <CardDescription>作成者: Tanaka</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-md h-40 flex items-center justify-center mb-2">
              <img
                src="/placeholder.svg?height=160&width=320"
                alt="東京マップ"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span>8スポット</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/maps/1" className="w-full">
              <Button variant="outline" className="w-full">
                詳細を見る
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>京都観光名所</CardTitle>
            <CardDescription>作成者: Suzuki</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-md h-40 flex items-center justify-center mb-2">
              <img
                src="/placeholder.svg?height=160&width=320"
                alt="京都マップ"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span>12スポット</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/maps/2" className="w-full">
              <Button variant="outline" className="w-full">
                詳細を見る
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>北海道アウトドア</CardTitle>
            <CardDescription>作成者: Yamada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-md h-40 flex items-center justify-center mb-2">
              <img
                src="/placeholder.svg?height=160&width=320"
                alt="北海道マップ"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span>6スポット</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/maps/3" className="w-full">
              <Button variant="outline" className="w-full">
                詳細を見る
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
