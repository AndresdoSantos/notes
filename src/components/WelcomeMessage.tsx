import { View } from 'react-native';

import { Text } from './Text';

export function WelcomeMessage() {
  return (
    <View>
      <Text content="Good morning" weight="300" size={12} />
      <Text content="Andres" weight="900" size={18} />
    </View>
  );
}
