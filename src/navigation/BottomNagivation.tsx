import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '@/screens/HomeScreen';
import InventoryScreen from '@/screens/InventoryScreen';
import AddItemScreen from '@/screens/AddItemScreen';
import SettingsScreen from '@/screens/SettingsScreen';

export const BottomTabNavigation = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarLabel: 'หน้าหลัก',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      },
    },

    Inventory: {
      screen: InventoryScreen,
      options: {
        tabBarLabel: 'คลังสินค้า',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cube-outline" size={size} color={color} />
        ),
      },
    },

    AddItem: {
      screen: AddItemScreen,
      options: {
        tabBarLabel: 'เพิ่มสินค้า',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="plus-circle" size={size} color={color} />
        ),
      },
    },

    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarLabel: 'ตั้งค่า',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      },
    },
  },
});
