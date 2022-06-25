import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { WelcomeMessage } from '../components/WelcomeMessage';

export function App() {
  const { navigate } = useNavigation();

  return (
    <>
      <StatusBar style="auto" />
      {/**<Header /> */}

      <View style={s.header}>
        <WelcomeMessage />

        <Button onPress={() => navigate('Create')}>
          <Text content="I want to do" color="#000" />
        </Button>
      </View>

      <View style={s.tasksContainer}>
        <Text content="Let's go one by one" size={18} weight="bold" />

        <View style={s.tasksWrapper}>
          <View style={s.taskContainer}>
            <View style={s.taskTitleAndCheckWrapper}>
              <TouchableOpacity style={s.taskCheck}>
                <Text content="" />
              </TouchableOpacity>

              <Text content="Nova tarefa" />
            </View>
            <Entypo name="dots-three-horizontal" size={12} color="white" />
          </View>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40,
    marginBottom: 20,
  },
  tasksContainer: {
    marginTop: 30,
  },
  tasksWrapper: {
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40,
  },
  taskCheck: {
    height: 20,
    width: 20,
    borderRadius: 9999,
    backgroundColor: '#fff',
    marginRight: 16,
  },
  taskTitleAndCheckWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
