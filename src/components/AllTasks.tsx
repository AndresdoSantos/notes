import { Entypo, Feather } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './Text';

interface ITask {
  name: string;
  completed: boolean;
  createdAt: Date;
  endAt: Date;
}

export function AllTasks() {
  const { navigate } = useNavigation();

  const { getItem, setItem } = useAsyncStorage('@313:normalTodo');

  const [tasks, setTasks] = useState<ITask[]>([]);

  async function listAll() {
    const storageTasks = await getItem();

    const parsed = JSON.parse(storageTasks) as ITask[];

    setTasks(storageTasks ? (parsed as ITask[]) : []);
  }

  async function completeTask(task: ITask) {
    const tasksWithDifferentName = tasks.filter(
      (taskFiltered) => taskFiltered.name !== task.name
    );

    const completedTask: ITask = {
      ...task,
      completed: !task.completed,
    };

    if (tasksWithDifferentName) {
      await setItem(
        completedTask.completed
          ? JSON.stringify([...tasksWithDifferentName, completedTask])
          : JSON.stringify([completedTask, ...tasksWithDifferentName])
      );
    } else {
      await setItem(JSON.stringify([completedTask]));
    }

    listAll();
  }

  async function removeTask(taskName: string) {
    const tasksWithDifferentName = tasks.filter(
      (taskFiltered) => taskFiltered.name !== taskName
    );

    await setItem(JSON.stringify([...tasksWithDifferentName]));

    listAll();
  }

  useFocusEffect(
    useCallback(() => {
      listAll();
    }, [])
  );

  return (
    <View style={s.tasksContainer}>
      <Text content="Just do" weight="RMBold" style={{ marginBottom: 5 }} />

      {tasks.map((task) => (
        <TouchableOpacity
          style={s.taskContainer}
          key={task.name}
          onPress={() => completeTask(task)}
          onLongPress={() => removeTask(task.name)}
        >
          <View style={s.taskTitleAndCheckWrapper}>
            <TouchableOpacity
              style={[
                s.taskCheck,
                { backgroundColor: task.completed ? '#14b8a6' : '#fff' },
              ]}
            />

            <View style={{ width: Dimensions.get('window').width - 120 }}>
              <Text content={task.name} numberOfLines={1} />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigate('Details', task)}
            style={s.taskDetailButton}
          >
            <Feather name="arrow-up-right" size={14} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  tasksContainer: {
    marginTop: 30,
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
