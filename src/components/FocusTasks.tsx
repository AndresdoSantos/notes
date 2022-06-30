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

export function FocusTasks() {
  const { getItem } = useAsyncStorage('@313:focusTodo');

  const [focusTask, setFocusTask] = useState<ITask | undefined>(undefined);

  async function listAllFocusTasks() {
    const storageTasks = await getItem();

    setFocusTask(JSON.parse(storageTasks) as ITask);
  }

  /**async function completeTask(task: ITask) {
    const tasksWithDifferentName = tasks.filter(
      (taskFiltered) => taskFiltered.name !== task.name
    );

    const completedTask: ITask = {
      ...task,
      completed: !task.completed,
    };

    if (tasksWithDifferentName) {
      await setItem(JSON.stringify([...tasksWithDifferentName, completedTask]));
    } else {
      await setItem(JSON.stringify([completedTask]));
    }

    listAll();
  } */

  useFocusEffect(
    useCallback(() => {
      listAllFocusTasks();
    }, [])
  );

  return (
    <View style={s.tasksContainer}>
      {/**<NumberOfTaks length={focusTasks.length} /> */}

      <Text content="Focus" weight="RMBold" style={{ marginBottom: 5 }} />

      {focusTask && (
        <TouchableOpacity
          style={s.taskContainer}
          // onPress={() => completeTask(task)}
          // onLongPress={() => removeTask(task.name)}
        >
          <View style={s.taskTitleAndCheckWrapper}>
            <TouchableOpacity
              style={[
                s.taskCheck,
                { backgroundColor: focusTask.completed ? '#14b8a6' : '#fff' },
              ]}
            ></TouchableOpacity>

            <View style={{ width: Dimensions.get('window').width - 120 }}>
              <Text content={focusTask.name} numberOfLines={1} />
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
