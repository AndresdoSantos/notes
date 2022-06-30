import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { Text } from './Text';

interface IOutlineButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: '#fff' | '#000' | '#10b981' | '#ef4444';
}

export function OutlineButton({
  title,
  onPress,
  style = undefined,
  textColor = undefined,
  ...props
}: IOutlineButtonProps) {
  return (
    <TouchableOpacity {...props} style={[s.container, style]} onPress={onPress}>
      <Text content={title} size={12} color={textColor} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 9999,
    width: 100,
    height: 30,
    paddingVertical: 2,

    alignItems: 'center',
    justifyContent: 'center',

    textAlign: 'center',
    marginBottom: 16,
  },
});
