import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Field({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
}) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-slate-700 mb-2">{label}</Text>
      <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          className="text-slate-800"
        />
      </View>
    </View>
  );
}

export default function AddItemScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [note, setNote] = useState("");

  const canSave = useMemo(() => {
    const d = Number(daysLeft);
    return name.trim().length > 0 && category.trim().length > 0 && qty.trim().length > 0 && Number.isFinite(d);
  }, [name, category, qty, daysLeft]);

  const onSave = () => {
    if (!canSave) {
      Alert.alert("กรอกข้อมูลไม่ครบ", "โปรดกรอกชื่อสินค้า, หมวดหมู่, จำนวน และวันคงเหลือให้ถูกต้อง");
      return;
    }

    // Week 5: mock only (ยังไม่ต้องต่อ backend)
    Alert.alert("บันทึกสำเร็จ", "เพิ่มสินค้าในโหมด Mock Data แล้ว", [
      { text: "ตกลง", onPress: () => navigation.navigate("Inventory") },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <Text className="text-lg font-bold text-slate-800">เพิ่มสินค้า</Text>
        <Text className="text-sm text-slate-500 mt-1">บันทึกสินค้าและวันหมดอายุ (Mock)</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <Field label="ชื่อสินค้า" value={name} onChangeText={setName} placeholder="เช่น นมจืด 1L" />
        <Field label="หมวดหมู่" value={category} onChangeText={setCategory} placeholder="เช่น ผลิตภัณฑ์นม" />
        <Field label="จำนวน" value={qty} onChangeText={setQty} placeholder="เช่น 12 กล่อง" />
        <Field label="ตำแหน่งที่เก็บ (ไม่บังคับ)" value={location} onChangeText={setLocation} placeholder="เช่น ตู้เย็น A2" />

        <Field label="วันคงเหลือ (daysLeft)" value={daysLeft} onChangeText={setDaysLeft} placeholder="เช่น 3" />

        <View className="mb-4">
          <Text className="text-sm font-semibold text-slate-700 mb-2">หมายเหตุ (ไม่บังคับ)</Text>
          <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="เช่น ใช้ทำลาเต้ก่อน"
              placeholderTextColor="#94A3B8"
              className="text-slate-800"
              multiline
              style={{ minHeight: 80, textAlignVertical: "top" }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.85}
          className={`rounded-2xl px-4 py-4 items-center ${canSave ? "bg-blue-600" : "bg-slate-300"}`}
        >
          <Text className="text-white font-bold">บันทึกสินค้า</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
          className="mt-3 rounded-2xl px-4 py-4 items-center bg-white border border-gray-200"
        >
          <Text className="text-slate-700 font-semibold">ย้อนกลับ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
