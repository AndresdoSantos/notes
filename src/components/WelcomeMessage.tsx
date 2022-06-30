import { View } from 'react-native';

import { Text } from './Text';

export function WelcomeMessage() {
  return (
    <View>
      <Text content="Good morning" weight="RMRegular" size={12} />
      <Text content="Andres" weight="RMBold" size={18} />
    </View>
  );
}
