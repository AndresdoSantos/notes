import { Entypo, Feather } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NumberOfTaks } from './NumberOfTasks';

import { Text } from './Text';

interface ITask {
  name: string;
  completed: boolean;
  createdAt: Date;
  endAt: Date;
}

export function HabitTasks() {
  const { getItem } = useAsyncStorage('@313:habitTodo');

  const [habitTask, setHabitTask] = useState<ITask | undefined>(undefined);

  async function listAllHabitsTasks() {
    const storageTasks = await getItem();

    setHabitTask(JSON.parse(storageTasks) as ITask);
  }

  useFocusEffect(
    useCallback(() => {
      listAllHabitsTasks();
    }, [])
  );

  return (
    <View style={s.tasksContainer}>
      {/**<NumberOfTaks length={habitsTasks.length} /> */}

      <Text
        content="To create new habit"
        weight="RMBold"
        style={{ marginBottom: 5 }}
      />

      {habitTask && (
        <TouchableOpacity
          style={s.taskContainer}
          // onPress={() => completeTask(task)}
          // onLongPress={() => removeTask(task.name)}
        >
          <View style={s.taskTitleAndCheckWrapper}>
            <TouchableOpacity
              style={[
                s.taskCheck,
                { backgroundColor: habitTask.completed ? '#14b8a6' : '#fff' },
              ]}
            >
              {habitTask.completed && (
                <Entypo name="check" size={12} color="white" />
              )}
            </TouchableOpacity>

            <View style={{ width: Dimensions.get('window').width - 120 }}>
              <Text content={habitTask.name} numberOfLines={1} />
            </View>
          </View>

          <TouchableOpacity
            // onPress={() => navigate('Details', task)}
            style={s.taskDetailButton}
          >
            <Feather name="arrow-up-right" size={14} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
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
    marginVertical: 8,
  },
  taskCheck: {
    height: 14,
    width: 14,
    borderRadius: 9999,
    marginRight: 16,

    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitleAndCheckWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetailButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 50,
  },
});
