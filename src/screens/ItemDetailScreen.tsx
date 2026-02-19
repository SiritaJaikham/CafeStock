import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StockItem, StockStatus } from "@/data/mockInventory";

function StatusButton({
  label,
  tone,
  onPress,
}: {
  label: string;
  tone: "gray" | "green" | "red" | "blue";
  onPress: () => void;
}) {
  const bg =
    tone === "green"
      ? "bg-green-600"
      : tone === "red"
      ? "bg-red-600"
      : tone === "blue"
      ? "bg-blue-600"
      : "bg-slate-200";

  const text = tone === "gray" ? "text-slate-700" : "text-white";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`flex-1 px-3 py-3 rounded-2xl items-center ${bg}`}
    >
      <Text className={`font-bold text-sm ${text}`}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function ItemDetailScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const item: StockItem = route?.params?.item;

  const [status, setStatus] = useState<StockStatus>(item?.status ?? "IN_STOCK");

  const badge = useMemo(() => {
    const d = item?.daysLeft ?? 0;
    if (d <= 0) return { text: "หมดอายุแล้ว", tone: "bg-red-100 text-red-700" };
    if (d <= 3) return { text: `เร่งด่วน • เหลือ ${d} วัน`, tone: "bg-orange-100 text-orange-700" };
    if (d <= 7) return { text: `ใกล้หมดอายุ • เหลือ ${d} วัน`, tone: "bg-yellow-100 text-yellow-800" };
    return { text: `ปกติ • เหลือ ${d} วัน`, tone: "bg-slate-100 text-slate-700" };
  }, [item]);

  const updateStatus = (next: StockStatus) => {
    setStatus(next);
    Alert.alert("อัปเดตสถานะแล้ว", `สินค้า: ${item.name}\nสถานะใหม่: ${next}`);
  };

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-slate-600">ไม่พบข้อมูลสินค้า</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-100 px-4 pt-4 pb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-slate-800">รายละเอียดสินค้า</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <Text className="text-blue-600 font-semibold">ย้อนกลับ</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <View className="bg-white border border-gray-100 rounded-2xl p-4">
          <Text className="text-xl font-extrabold text-slate-800">{item.name}</Text>
          <Text className="text-sm text-slate-500 mt-1">{item.category}</Text>

          <View className={`mt-3 self-start px-3 py-1.5 rounded-full ${badge.tone}`}>
            <Text className="text-xs font-semibold">{badge.text}</Text>
          </View>

          <View className="mt-5 gap-y-2">
            <Text className="text-sm text-slate-700">
              <Text className="font-semibold">จำนวน:</Text> {item.quantityText}
            </Text>
            {!!item.locationText && (
              <Text className="text-sm text-slate-700">
                <Text className="font-semibold">ที่เก็บ:</Text> {item.locationText}
              </Text>
            )}
            {!!item.note && (
              <Text className="text-sm text-slate-700">
                <Text className="font-semibold">หมายเหตุ:</Text> {item.note}
              </Text>
            )}
            <Text className="text-sm text-slate-700">
              <Text className="font-semibold">สถานะปัจจุบัน:</Text> {status}
            </Text>
          </View>
        </View>

        <View className="mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          <Text className="text-base font-bold text-slate-800">อัปเดตสถานะ</Text>
          <Text className="text-xs text-slate-500 mt-1">
            Week 5 ใช้ mock state เพื่อจำลองการเปลี่ยนสถานะ
          </Text>

          <View className="flex-row gap-x-2 mt-4">
            <StatusButton label="Used" tone="green" onPress={() => updateStatus("USED")} />
            <StatusButton label="Dispose" tone="red" onPress={() => updateStatus("DISPOSED")} />
          </View>

          <View className="flex-row gap-x-2 mt-2">
            <StatusButton label="Restock" tone="blue" onPress={() => updateStatus("RESTOCKED")} />
            <StatusButton label="In Stock" tone="gray" onPress={() => updateStatus("IN_STOCK")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
