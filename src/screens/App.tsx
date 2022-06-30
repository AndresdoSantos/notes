import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { WelcomeMessage } from '../components/WelcomeMessage';
import { FocusTasks } from '../components/FocusTasks';
import { HabitTasks } from '../components/HabitsTasks';
import { AllTasks } from '../components/AllTasks';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export function App() {
  const { removeItem } = useAsyncStorage('@313:normalTodo');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const { navigate } = useNavigation();

  const removeAll = () => {
    removeItem();
  };

  return (
    <>
      <StatusBar style="light" />

      <Animated.View style={[s.floatButton, { opacity: fadeAnim }]}>
        {/**<Button onPress={() => removeAll()}>
          <Text content="Remove" color="#000" />
        </Button> */}

        <Button onPress={() => navigate('Create')}>
          <Text content="New" color="#000" />
        </Button>
      </Animated.View>

      <WelcomeMessage />

      <FocusTasks />

      <HabitTasks />

      <AllTasks />
    </>
  );
}

const s = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    height: 50,
    flexDirection: 'row',
  },
});
