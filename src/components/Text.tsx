import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';

interface TextProps extends RNTextProps {
  content: string;
  size?: number;
  weight?: 'RMRegular' | 'RMBold';
  color?: '#fff' | '#000' | '#10b981' | '#ef4444';
}

export function Text({
  content,
  size = 14,
  weight = 'RMRegular',
  color = '#fff',
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        styles.container,
        style,
        { fontSize: size, fontFamily: weight, color },
      ]}
    >
      {content}
    </RNText>
  );
}

const styles = StyleSheet.create({
  container: {
    letterSpacing: -1.2,
  },
});
