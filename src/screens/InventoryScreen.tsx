import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MOCK_ITEMS, StockItem } from "../data/mockInventory";

type FilterKey = "ALL" | "NEAR" | "EXPIRED";

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`px-3 py-2 rounded-full border ${
        active ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
      }`}
    >
      <Text className={`${active ? "text-blue-700" : "text-slate-600"} text-xs font-semibold`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function InventoryItemRow({
  item,
  onPress,
}: {
  item: StockItem;
  onPress: () => void;
}) {
  const badgeText = item.daysLeft <= 0 ? "หมดอายุ" : `เหลือ ${item.daysLeft} วัน`;
  const badgeTone =
    item.daysLeft <= 0
      ? "bg-red-100 text-red-700"
      : item.daysLeft <= 3
      ? "bg-orange-100 text-orange-700"
      : item.daysLeft <= 7
      ? "bg-yellow-100 text-yellow-800"
      : "bg-slate-100 text-slate-700";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-white border border-gray-100 rounded-2xl p-4"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-base font-bold text-slate-800">{item.name}</Text>
          <Text className="text-xs text-slate-400 mt-0.5">{item.category}</Text>

          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-xs text-slate-500">
              {item.quantityText}{item.locationText ? ` • ${item.locationText}` : ""}
            </Text>

            <View className={`px-2.5 py-1 rounded-full ${badgeTone}`}>
              <Text className="text-xs font-semibold">{badgeText}</Text>
            </View>
          </View>
        </View>

        <Text className="text-slate-300 text-lg">📦</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function InventoryScreen() {
  const navigation = useNavigation<any>();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<FilterKey>("ALL");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = [...MOCK_ITEMS];

    if (filter === "EXPIRED") list = list.filter((x) => x.daysLeft <= 0);
    if (filter === "NEAR") list = list.filter((x) => x.daysLeft >= 1 && x.daysLeft <= 7);

    if (query.length > 0) {
      list = list.filter((x) => {
        return (
          x.name.toLowerCase().includes(query) ||
          x.category.toLowerCase().includes(query) ||
          (x.locationText ?? "").toLowerCase().includes(query)
        );
      });
    }
    return list;
  }, [q, filter]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <Text className="text-lg font-bold text-slate-800">คลังสินค้า</Text>
        <Text className="text-sm text-slate-500 mt-1">ค้นหาและจัดการรายการทั้งหมด</Text>

        {/* Search */}
        <View className="mt-4 bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center">
          <Text className="text-slate-400 mr-2">🔎</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="ค้นหาชื่อสินค้า / หมวดหมู่ / ที่เก็บ"
            placeholderTextColor="#94A3B8"
            className="flex-1 text-slate-800"
          />
          {!!q && (
            <TouchableOpacity onPress={() => setQ("")} className="px-2 py-1" activeOpacity={0.8}>
              <Text className="text-slate-500 font-semibold">ล้าง</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          <View className="flex-row items-center gap-x-2">
            <FilterChip label="ทั้งหมด" active={filter === "ALL"} onPress={() => setFilter("ALL")} />
            <FilterChip label="ใกล้หมดอายุ (1-7 วัน)" active={filter === "NEAR"} onPress={() => setFilter("NEAR")} />
            <FilterChip label="หมดอายุแล้ว" active={filter === "EXPIRED"} onPress={() => setFilter("EXPIRED")} />
          </View>
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-slate-700 font-semibold text-sm">รายการ ({filtered.length})</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddItem")}
            activeOpacity={0.85}
            className="bg-blue-600 px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-semibold text-xs">+ เพิ่มสินค้า</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-y-3">
          {filtered.map((item) => (
            <InventoryItemRow
              key={item.id}
              item={item}
              onPress={() => navigation.navigate("ItemDetail", { item })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
