"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plus, Mountain, Waves, TreePine } from "lucide-react"
import GoogleMap from "@/components/google-map"
import { getAllMaps, type MapData } from "@/lib/map-storage"

// 大分県の中心
const oitaCenter = { lat: 33.2395578, lng: 131.6095468 }

// マップカードのプレビューコンポーネント
function MapPreview({ spots, center }: { spots: MapData["spots"]; center: MapData["center"] }) {
	return (
		<div className="relative w-full h-40 bg-slate-100 rounded-md flex items-center justify-center">
			<div className="text-slate-500">
				<MapPin className="w-6 h-6 mx-auto mb-2" />
				<p className="text-sm text-center">{spots.length} スポット</p>
			</div>
			<div className="absolute bottom-2 right-2 text-xs text-slate-400">クリックして詳細を表示</div>
		</div>
	)
}

export default function MapsPage() {
	const [maps, setMaps] = useState<MapData[]>([])
	const [selectedMapId, setSelectedMapId] = useState<string | null>(null)
	const [mapCenter, setMapCenter] = useState(oitaCenter)
	const [mapZoom, setMapZoom] = useState(9)
	const [currentMarkers, setCurrentMarkers] = useState<Array<{
		id: number
		position: { lat: number; lng: number }
		title: string
		category?: string
	}>>([])

	// マップデータを読み込む
	useEffect(() => {
		const savedMaps = getAllMaps()
		setMaps(savedMaps)
	}, [])

	// マップカードのホバーハンドラー
	const handleMapHover = useCallback((map: MapData | null) => {
		setSelectedMapId(map?.id || null)
		if (map) {
			setMapCenter(map.center)
			setMapZoom(13)
			setCurrentMarkers(
				map.spots.map((spot) => ({
					id: spot.id,
					position: spot.position,
					title: spot.name,
					category: spot.category,
				}))
			)
		} else {
			setMapCenter(oitaCenter)
			setMapZoom(9)
			setCurrentMarkers([])
		}
	}, [])

	return (
		<div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">大分県のマップ</h1>
					<p className="text-muted-foreground">大分県の魅力的なスポットを探して冒険に出かけよう</p>
				</div>
				<Link href="/maps/new">
					<Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500">
						<Plus size={16} />
						新しいマップを作成
					</Button>
				</Link>
			</div>

			{/* 大分県全体のマップ */}
			<div className="rounded-lg h-48 sm:h-[300px] mb-6 overflow-hidden">
				<GoogleMap
					center={mapCenter}
					zoom={mapZoom}
					markers={currentMarkers}
					className="h-full"
				/>
			</div>

			<h2 className="text-2xl font-semibold mb-4">人気のマップ</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
				{maps.map((map) => (
					<Card
						key={map.id}
						className={selectedMapId === map.id ? "ring-2 ring-orange-500" : ""}
						onMouseEnter={() => handleMapHover(map)}
						onMouseLeave={() => handleMapHover(null)}
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								{map.category === "温泉" && <Mountain size={20} className="text-orange-500" />}
								{map.category === "グルメ" && <TreePine size={20} className="text-green-500" />}
								{map.category === "自然" && <Waves size={20} className="text-blue-500" />}
								{map.title}
							</CardTitle>
							<CardDescription>作成者: {map.author}</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href={`/maps/${map.id}`}>
								<MapPreview spots={map.spots} center={map.center} />
							</Link>
							<div className="flex items-center text-sm text-muted-foreground mt-2">
								<MapPin size={14} className="mr-1" />
								<span>{map.spots.length}スポット</span>
							</div>
						</CardContent>
						<CardFooter>
							<Link href={`/maps/${map.id}`} className="w-full">
								<Button variant="outline" className="w-full">
									詳細を見る
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
