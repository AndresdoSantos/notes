import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  children: JSX.Element;
};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={s.container}>
      {children}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    height: 40,
    width: 120,
    borderRadius: 2,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
