export type StockStatus = "IN_STOCK" | "USED" | "DISPOSED" | "RESTOCKED";

export type StockItem = {
  id: string;
  name: string;
  category: string;
  quantityText: string;
  locationText?: string;
  daysLeft: number; // <= 0 = expired
  status: StockStatus;
  note?: string;
};

export const MOCK_ITEMS: StockItem[] = [
  {
    id: "1",
    name: "ผักสลัด",
    category: "ผักสด",
    quantityText: "2 กิโลกรัม",
    locationText: "ตู้เย็น A2",
    daysLeft: 0,
    status: "IN_STOCK",
    note: "ใช้ทำสลัดก่อน",
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
  {
    id: "6",
    name: "น้ำเชื่อมวนิลา",
    category: "ไซรัป",
    quantityText: "1 ขวด",
    daysLeft: 12,
    status: "IN_STOCK",
  },
];
