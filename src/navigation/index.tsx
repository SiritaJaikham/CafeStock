import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from '../components/BackButton';

import HomeScreen from '@/screens/HomeScreen';
import { BottomTabNavigation } from './BottomNagivation';
import SettingScreen from '@/screens/SettingsScreen';
import ModalScreen from '@/screens/InventoryScreen';

const Stack = createStackNavigator({
  screens: {
    Tabs: {
      screen: BottomTabNavigation,
      options: { headerShown: false},
    },
    Setting: {
      screen: SettingScreen,
    },
    Modal: {
      screen: ModalScreen,
      options: {
        presentation: 'modal',
      },
    },
},
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
