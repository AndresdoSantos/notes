import { Image, StyleSheet, View } from 'react-native';

import { Text } from './Text';

export function Header() {
  return (
    <View style={s.container}>
      <Image
        style={s.avatar}
        source={{ uri: 'https://github.com/AndresdoSantos.png' }}
      />

      <Text content="Andres" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    width: '100%',

    marginTop: 20,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 9999,
    backgroundColor: '#fff',
  },
});
