import { StyleSheet, Text as RNText } from 'react-native';

type TextProps = {
  content: string;
  size?: number;
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  color?: '#fff' | '#000';
};

export function Text({
  content,
  size = 14,
  weight = 'normal',
  color = '#fff',
}: TextProps) {
  return (
    <RNText
      style={[styles.container, { fontSize: size, fontWeight: weight, color }]}
    >
      {content}
    </RNText>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#fff',
    fontFamily: 'RMRegular',
    letterSpacing: -0.5,
  },
});
