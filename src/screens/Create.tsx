import { useEffect, useReducer, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { WelcomeMessage } from '../components/WelcomeMessage';
import { OutlineButton } from '../components/OutlineButton';
import dayjs from 'dayjs';

interface ITask {
  name: string;
  completed: boolean;
  immediateFocus: boolean;
  recurrent: boolean;
  createdAt: Date;
}

export function Create() {
  const { goBack } = useNavigation();

  const { setItem: setNormalItem, getItem: getNormalItem } =
    useAsyncStorage('@313:normalTodo');
  const { setItem: setFocusItem, getItem: getFocusItem } =
    useAsyncStorage('@313:focusTodo');
  const { setItem: setHabitItem, getItem: getHabitItem } =
    useAsyncStorage('@313:habitTodo');

  const [task, setTask] = useState('');

  const [isRecurrent, onIsRecurrentChange] = useState({
    modal: false,
    recurrent: false,
  });
  const [isFocus, onIsFocusChange] = useState({
    modal: false,
    focus: false,
  });

  const [canCreateFocusTask, setCanCreateFocusTask] = useReducer(
    (prev) => !prev,
    false
  );

  const [canCreateHabitTask, setCanCreateHabitTask] = useReducer(
    (prev) => !prev,
    false
  );

  const onCanCreate = async () => {
    const haveFocusTasks = await getFocusItem();
    const haveHabitTasks = await getHabitItem();

    !haveFocusTasks && setCanCreateFocusTask();

    !haveHabitTasks && setCanCreateHabitTask();
  };

  useEffect(() => {
    onCanCreate();
  }, []);

  const handleSubmit = async () => {
    if (isFocus.focus) {
      const date = new Date();

      const endAt = date.setDate(date.getDate() + 7);

      setFocusItem(
        JSON.stringify({
          name: task,
          completed: false,
          createdAt: new Date(),
          endAt,
        })
      );
    }

    if (isRecurrent.recurrent) {
      const date = new Date();

      const endAt = date.setDate(date.getDate() + 66);

      setHabitItem(
        JSON.stringify({
          name: task,
          completed: false,
          createdAt: new Date(),
          endAt,
        })
      );
    }

    if (!isRecurrent.recurrent && !isFocus.focus) {
      const oldNormalTasks = await getNormalItem();

      const data = {
        name: task,
        completed: false,
        createdAt: new Date(),
        endAt: new Date(),
      };

      if (oldNormalTasks) {
        setNormalItem(JSON.stringify([data, ...JSON.parse(oldNormalTasks)]));
      } else {
        setNormalItem(JSON.stringify([data]));
      }
    }

    goBack();
  };

  return (
    <>
      <TouchableOpacity activeOpacity={1} style={s.header} onPress={goBack}>
        <Ionicons name="arrow-back" color="#fff" style={{ marginRight: 12 }} />

        <WelcomeMessage />
      </TouchableOpacity>

      <View style={s.form}>
        <TextInput
          style={s.input}
          placeholderTextColor="#3f3f46"
          placeholder="O que vamos fazer juntos?"
          onChangeText={(e) => setTask(e)}
          autoFocus
        />

        <View style={s.optionsButtonWrapper}>
          {!isFocus.focus && canCreateHabitTask && (
            <>
              <OutlineButton
                title="New habit"
                onPress={() =>
                  onIsRecurrentChange({
                    modal: true,
                    recurrent: false,
                  })
                }
                style={{
                  borderColor: isRecurrent.recurrent ? '#10b981' : '#fff',
                }}
                textColor={isRecurrent.recurrent ? '#10b981' : '#fff'}
              />
              <View style={{ marginHorizontal: 4 }} />
            </>
          )}
          {!isRecurrent.recurrent && canCreateFocusTask && (
            <OutlineButton
              title="Immediate focus"
              onPress={() =>
                onIsFocusChange({
                  modal: true,
                  focus: false,
                })
              }
              style={{ borderColor: isFocus.focus ? '#10b981' : '#fff' }}
              textColor={isFocus.focus ? '#10b981' : '#fff'}
            />
          )}
        </View>
      </View>

      <Modal
        isVisible={isRecurrent.modal || isFocus.modal}
        backdropColor="#000"
        backdropOpacity={0.8}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalHeader}>
            <Text content="About" size={20} weight="RMBold" />

            <Ionicons
              name="close"
              color="#fff"
              size={20}
              onPress={() => {
                if (isRecurrent.modal) {
                  onIsRecurrentChange({
                    modal: false,
                    recurrent: false,
                  });
                } else if (isFocus.modal)
                  onIsFocusChange({
                    modal: false,
                    focus: false,
                  });
              }}
            />
          </View>
          <Text
            content={
              isRecurrent.modal
                ? 'This habit will last for 66 days, so only accept it if you have the conditions and are sure you will stick to each day.'
                : 'Immediate focus tasks should be completed within a week at the most, but beyond that it is impossible to finish.'
            }
            size={13}
          />
        </View>

        <View style={s.modalButtonWrapper}>
          <Button
            onPress={() => {
              if (isRecurrent.modal) {
                onIsRecurrentChange({
                  modal: false,
                  recurrent: true,
                });
              } else if (isFocus.modal)
                onIsFocusChange({
                  modal: false,
                  focus: true,
                });
            }}
            style={{ width: 150 }}
          >
            <Text content="Agree..." color="#000" />
          </Button>
        </View>
      </Modal>

      <View style={s.buttonWrapper}>
        <Button onPress={handleSubmit}>
          <Text content="Create" color="#000" />
        </Button>
      </View>
    </>
  );
}

/**
 * O que muda na criação de um hábito e a percepção subjetiva do bem que aquilo está fazendo
 * Tem gente que demorou 270 dias e tem gente que demorou 18 dias
 */

const s = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    marginTop: 30,
  },
  input: {
    height: 50,
    color: '#fff',
  },
  buttonWrapper: {
    width: Dimensions.get('window').width - 20,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
  },
  optionsButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  modalButtonWrapper: {
    width: Dimensions.get('window').width - 40,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
});
