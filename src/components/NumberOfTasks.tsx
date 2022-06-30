import { StyleSheet, View } from 'react-native';

import { Text } from './Text';

interface INumberOfTaksProps {
  length: number;
}

export function NumberOfTaks({ length }: INumberOfTaksProps) {
  return (
    <View style={s.container}>
      <View style={s.line} />
      <View style={s.lengthWrapper}>
        <Text content={`${length} tasks`} />
      </View>
      <View style={s.line} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#4b5563',
  },
  lengthWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 9999,
  },
});
