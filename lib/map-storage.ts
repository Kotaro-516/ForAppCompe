export interface Spot {
  id: number
  name: string
  category: string
  address: string
  position: {
    lat: number
    lng: number
  }
}

export interface MapData {
  id: string
  title: string
  author: string
  spots: Spot[]
  category: string
  center: {
    lat: number
    lng: number
  }
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "saved_maps"

// マップデータを保存
export const saveMap = (mapData: Omit<MapData, "id" | "createdAt" | "updatedAt">) => {
  const maps = getAllMaps()
  const newMap: MapData = {
    ...mapData,
    id: crypto.randomUUID(), // ユニークなIDを生成
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  maps.push(newMap)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps))
  return newMap
}

// 全てのマップを取得
export const getAllMaps = (): MapData[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// 特定のマップを取得
export const getMapById = (id: string): MapData | null => {
  const maps = getAllMaps()
  return maps.find((map) => map.id === id) || null
}

// マップを更新
export const updateMap = (id: string, updates: Partial<MapData>) => {
  const maps = getAllMaps()
  const index = maps.findIndex((map) => map.id === id)
  if (index === -1) return null

  maps[index] = {
    ...maps[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps))
  return maps[index]
}

// マップを削除
export const deleteMap = (id: string) => {
  const maps = getAllMaps()
  const filteredMaps = maps.filter((map) => map.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMaps))
}

// マップインスタンスのグローバル管理
let mapInstances = new Map<string, google.maps.Map>();
let loadingInstances = new Set<string>();

/**
 * マップインスタンスの取得
 */
export const getMapInstance = (id: string): google.maps.Map | undefined => {
  return mapInstances.get(id);
};

/**
 * マップインスタンスが読み込み中かどうかを確認
 */
export const isMapLoading = (id: string): boolean => {
  return loadingInstances.has(id);
};

/**
 * マップの読み込み状態を設定
 */
export const setMapLoading = (id: string, loading: boolean) => {
  if (loading) {
    loadingInstances.add(id);
  } else {
    loadingInstances.delete(id);
  }
};

/**
 * マップインスタンスの保存
 */
export const setMapInstance = (id: string, map: google.maps.Map) => {
  // 既存のインスタンスがあれば、イベントリスナーをクリーンアップ
  const existingMap = mapInstances.get(id);
  if (existingMap) {
    google.maps.event.clearInstanceListeners(existingMap);
  }
  mapInstances.set(id, map);
  setMapLoading(id, false);
};

/**
 * マップインスタンスの削除
 */
export const deleteMapInstance = (id: string) => {
  const map = mapInstances.get(id);
  if (map) {
    // イベントリスナーとDOMをクリーンアップ
    google.maps.event.clearInstanceListeners(map);
    const div = map.getDiv();
    if (div) {
      div.innerHTML = '';
    }
    mapInstances.delete(id);
  }
  loadingInstances.delete(id);
};

/**
 * すべてのマップインスタンスをクリーンアップ
 */
export const clearAllMapInstances = () => {
  mapInstances.forEach((map, id) => {
    deleteMapInstance(id);
  });
  mapInstances = new Map();
  loadingInstances.clear();
};
