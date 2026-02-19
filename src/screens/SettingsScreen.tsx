import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";

function ToggleChip({
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

export default function SettingsScreen() {
  const [days, setDays] = useState<number[]>([7, 3, 1]);
  const [time, setTime] = useState<string>("09:00");

  const timeOptions = useMemo(() => ["08:00", "09:00", "12:00", "18:00", "20:00"], []);

  const toggleDay = (d: number) => {
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort((a, b) => b - a)));
  };

  const onSave = () => {
    Alert.alert("บันทึกการตั้งค่าแล้ว", `แจ้งเตือนล่วงหน้า: ${days.join(", ")} วัน\nเวลา: ${time}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <Text className="text-lg font-bold text-slate-800">ตั้งค่า</Text>
        <Text className="text-sm text-slate-500 mt-1">การแจ้งเตือนล่วงหน้า (Mock)</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <View className="bg-white border border-gray-100 rounded-2xl p-4">
          <Text className="text-base font-bold text-slate-800">แจ้งเตือนล่วงหน้า (วัน)</Text>
          <Text className="text-xs text-slate-500 mt-1">เลือกวันที่ต้องการให้แจ้งเตือนก่อนหมดอายุ</Text>

          <View className="flex-row flex-wrap gap-2 mt-4">
            <ToggleChip label="7 วัน" active={days.includes(7)} onPress={() => toggleDay(7)} />
            <ToggleChip label="3 วัน" active={days.includes(3)} onPress={() => toggleDay(3)} />
            <ToggleChip label="1 วัน" active={days.includes(1)} onPress={() => toggleDay(1)} />
          </View>
        </View>

        <View className="bg-white border border-gray-100 rounded-2xl p-4 mt-3">
          <Text className="text-base font-bold text-slate-800">เวลาแจ้งเตือน</Text>
          <Text className="text-xs text-slate-500 mt-1">เลือกเวลาที่ต้องการให้ระบบแจ้งเตือนทุกวัน</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex-row items-center gap-x-2">
              {timeOptions.map((t) => (
                <ToggleChip key={t} label={t} active={time === t} onPress={() => setTime(t)} />
              ))}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.85}
          className="mt-4 rounded-2xl px-4 py-4 items-center bg-blue-600"
        >
          <Text className="text-white font-bold">บันทึกการตั้งค่า</Text>
        </TouchableOpacity>

        <View className="mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          <Text className="text-xs text-slate-500">
            หมายเหตุ: Week 5 ยังไม่ต่อ backend ดังนั้นค่าที่บันทึกเป็นเพียง mock state ในหน้าจอ
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
