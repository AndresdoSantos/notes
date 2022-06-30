import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  children: JSX.Element;
};

export function Button({ children, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[s.container, style]}>
      {children}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    height: 40,
    width: 120,
    borderRadius: 9999,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
