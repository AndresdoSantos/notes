import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { App } from '../screens/App';
import { Create } from '../screens/Create';

const Stack = createNativeStackNavigator();

export function Routes() {
  const [loaded] = useFonts({
    RMRegular: require('../../assets/fonts/RobotoMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{
          contentStyle: {
            flex: 1,
            backgroundColor: '#000',
            alignItems: 'flex-start',
            paddingHorizontal: 20,
            paddingTop: 60,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="App"
          component={App}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
