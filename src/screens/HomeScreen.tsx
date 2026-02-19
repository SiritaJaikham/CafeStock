import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

type StockStatus = "IN_STOCK" | "USED" | "DISPOSED" | "RESTOCKED";

type StockItem = {
  id: string;
  name: string;
  category: string;
  quantityText: string;
  locationText?: string;
  daysLeft: number; // <=0 = expired
  status: StockStatus;
};

function SummaryCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: number;
  tone: "blue" | "red" | "orange" | "yellow";
}) {
  const toneStyle =
    tone === "red"
      ? "bg-red-50 border-red-100"
      : tone === "orange"
      ? "bg-orange-50 border-orange-100"
      : tone === "yellow"
      ? "bg-yellow-50 border-yellow-200"
      : "bg-white border-gray-100";

  const textStyle =
    tone === "red"
      ? "text-red-600"
      : tone === "orange"
      ? "text-orange-600"
      : tone === "yellow"
      ? "text-yellow-700"
      : "text-slate-800";

  return (
    <View className={`border rounded-2xl p-4 flex-row items-center justify-between ${toneStyle}`}>
      <View>
        <Text className="text-xs font-semibold text-slate-500">{title}</Text>
        <Text className={`text-2xl font-bold mt-1 ${textStyle}`}>{value}</Text>
      </View>
      <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
        <Text className="text-slate-400 font-bold">◎</Text>
      </View>
    </View>
  );
}

function ItemCard({
  item,
  onPress,
}: {
  item: StockItem;
  onPress: (item: StockItem) => void;
}) {
  const borderTone =
    item.daysLeft <= 0
      ? "border-l-red-200"
      : item.daysLeft <= 3
      ? "border-l-orange-200"
      : "border-l-yellow-200";

  const badgeText =
    item.daysLeft <= 0 ? "หมดอายุแล้ว" : `เหลือ ${item.daysLeft} วัน`;

  const badgeTone =
    item.daysLeft <= 0
      ? "bg-red-100 text-red-700"
      : item.daysLeft <= 3
      ? "bg-orange-100 text-orange-700"
      : "bg-yellow-100 text-yellow-800";

  return (
    <TouchableOpacity
      className={`bg-white border border-gray-100 rounded-2xl p-4 flex-row items-start justify-between border-l-4 ${borderTone}`}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View className="flex-1 pr-3">
        <Text className="font-bold text-slate-800 text-base">{item.name}</Text>
        <Text className="text-xs text-slate-400 mt-0.5">{item.category}</Text>

        <View className="mt-4 space-y-2">
          <View className="flex-row items-center gap-x-2">
            <Text className="text-xs font-semibold text-slate-500">#</Text>
            <Text className="text-xs text-slate-500">{item.quantityText}</Text>
          </View>

          {!!item.locationText && (
            <View className="flex-row items-center gap-x-2">
              <Text className="text-xs text-slate-500">📍</Text>
              <Text className="text-xs text-slate-500">{item.locationText}</Text>
            </View>
          )}

          <View className="flex-row">
            <View className={`px-2.5 py-1 rounded-full ${badgeTone}`}>
              <Text className="text-xs font-semibold">{badgeText}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="w-8 h-8 rounded-xl bg-slate-50 items-center justify-center">
        <Text className="text-slate-300">📦</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  // Mock data (CafeStock: Near Expiry)
  const [items] = useState<StockItem[]>([
    {
      id: "1",
      name: "ผักสลัด",
      category: "ผักสด",
      quantityText: "2 กิโลกรัม",
      locationText: "ตู้เย็น A2",
      daysLeft: 0,
      status: "IN_STOCK",
    },
    {
      id: "2",
      name: "นมจืด 1L",
      category: "ผลิตภัณฑ์นม",
      quantityText: "12 กล่อง",
      daysLeft: 2,
      status: "IN_STOCK",
    },
    {
      id: "3",
      name: "โยเกิร์ต",
      category: "ผลิตภัณฑ์นม",
      quantityText: "8 ถ้วย",
      daysLeft: 3,
      status: "IN_STOCK",
    },
    {
      id: "4",
      name: "ไข่ไก่",
      category: "วัตถุดิบ",
      quantityText: "30 ฟอง",
      locationText: "ชั้นวาง B1",
      daysLeft: 6,
      status: "IN_STOCK",
    },
    {
      id: "5",
      name: "เนยสด",
      category: "ผลิตภัณฑ์นม",
      quantityText: "2 ก้อน",
      daysLeft: 7,
      status: "IN_STOCK",
    },
  ]);

  const alertModal = useCallback((message: string) => {
    Alert.alert(message);
  }, []);

  // Summary counts
  const summary = useMemo(() => {
    const total = items.length;
    const expired = items.filter((x) => x.daysLeft <= 0 && x.status === "IN_STOCK").length;
    const urgent = items.filter((x) => x.daysLeft >= 1 && x.daysLeft <= 3 && x.status === "IN_STOCK").length;
    const soon = items.filter((x) => x.daysLeft >= 4 && x.daysLeft <= 7 && x.status === "IN_STOCK").length;
    return { total, expired, urgent, soon };
  }, [items]);

  const onPressItem = useCallback(
    (item: StockItem) => {
      // ถ้ามีหน้ารายละเอียด: navigation.navigate("ItemDetail", { item })
      alertModal(`เลือกสินค้า: ${item.name}`);
    },
    [alertModal]
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-100 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-3">
            <View className="w-10 h-10 bg-blue-600 rounded-2xl items-center justify-center">
              <Text className="text-white font-bold">📦</Text>
            </View>
            <View>
              <Text className="font-bold text-lg text-slate-800">ระบบจัดการสินค้า</Text>
              <Text className="text-[10px] text-slate-400">CafeStock Dashboard</Text>
            </View>
          </View>

          <TouchableOpacity
            className="flex-row items-center gap-x-2"
            onPress={() => {
              // TODO: logout
              alertModal("ออกจากระบบ");
            }}
          >
            <Text className="text-red-500 font-semibold">ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>

        {/* Simple Nav Row (optional) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          <View className="flex-row items-center gap-x-5">
            <TouchableOpacity className="flex-row items-center gap-x-2">
              <View className="px-2 py-1 bg-blue-50 rounded-xl">
                <Text className="text-blue-600">🏠</Text>
              </View>
              <Text className="text-blue-600 font-semibold">หน้าหลัก</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center gap-x-2"
              onPress={() => navigation.navigate("Inventory")}
            >
              <Text className="text-slate-500">📦</Text>
              <Text className="text-slate-500">คลังสินค้า</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center gap-x-2"
              onPress={() => navigation.navigate("AddItem")}
            >
              <Text className="text-slate-500">➕</Text>
              <Text className="text-slate-500">เพิ่มสินค้า</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center gap-x-2"
              onPress={() => navigation.navigate("Settings")}
            >
              <Text className="text-slate-500">⚙️</Text>
              <Text className="text-slate-500">ตั้งค่า</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        {/* Heading */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-800">สินค้าใกล้หมดอายุ</Text>
          <Text className="text-sm text-slate-500 mt-1">ติดตามและจัดการสินค้าที่ต้องใช้ก่อน</Text>
        </View>

        {/* Summary Cards */}
        <View className="gap-y-3 mb-8">
          <SummaryCard title="สินค้าทั้งหมด" value={summary.total} tone="blue" />
          <SummaryCard title="หมดอายุแล้ว" value={summary.expired} tone="red" />
          <SummaryCard title="เร่งด่วน (1-3 วัน)" value={summary.urgent} tone="orange" />
          <SummaryCard title="ใกล้หมดอายุ (4-7 วัน)" value={summary.soon} tone="yellow" />
        </View>

        {/* Product List */}
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-slate-800">
              รายการสินค้า ({items.length})
            </Text>
            <TouchableOpacity
              onPress={() => alertModal("ดูทั้งหมด")}
              className="px-3 py-2 bg-white border border-gray-100 rounded-xl"
            >
              <Text className="text-slate-600 font-semibold text-xs">ดูทั้งหมด</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-y-3">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onPress={onPressItem} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
