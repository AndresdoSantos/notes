import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { v4 } from 'uuid';

import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { WelcomeMessage } from '../components/WelcomeMessage';

export function Create() {
  const { goBack } = useNavigation();

  const [task, setTask] = useState('');

  const handleSubmit = () => {
    const data = {
      // id: v4(),
      name: task,
      completed: false,
      createdAt: new Date(),
    };

    console.log(data);
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
          placeholderTextColor="#334155"
          placeholder="Tell me what you want to do..."
          onChangeText={(e) => setTask(e)}
          autoFocus
        />

        <View style={s.buttonWrapper}>
          <Button onPress={handleSubmit}>
            <Text content={`That's it`} color="#000" />
          </Button>
        </View>
      </View>
    </>
  );
}

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
    height: 40,
    color: '#fff',
  },
  buttonWrapper: {
    width: Dimensions.get('window').width - 40,
    alignItems: 'flex-end',
    marginTop: 20,
  },
});
