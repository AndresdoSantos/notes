import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';

import { Text } from '../components/Text';
import { WelcomeMessage } from '../components/WelcomeMessage';

interface IParam {
  key: string;
  name: string;
  params: {
    name: string;
    completed: boolean;
    createdAt: Date;
    endAt: Date;
  };
  path: string;
}

export function Details() {
  const { goBack } = useNavigation();
  const { params } = useRoute<IParam>();

  return (
    <>
      <TouchableOpacity activeOpacity={1} style={s.header} onPress={goBack}>
        <Ionicons name="arrow-back" color="#fff" style={{ marginRight: 12 }} />

        <WelcomeMessage />
      </TouchableOpacity>

      <View style={s.detailsContainer}>
        <View style={s.detailItemContainer}>
          <View style={s.detailItemWrapper}>
            <Text
              content={dayjs(params.endAt).format('MMMM DD, YY')}
              size={12}
            />
          </View>

          <View style={{ marginHorizontal: 4 }} />

          <View
            style={[
              s.detailItemWrapper,
              { borderColor: params.completed ? '#10b981' : '#ef4444' },
            ]}
          >
            <Text
              content={params.completed ? 'Completed' : 'Uncompleted'}
              size={12}
              color={params.completed ? '#10b981' : '#ef4444'}
            />
          </View>
        </View>

        <Text content={params.name} size={25} />
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
  detailsContainer: {
    marginTop: 20,
  },
  detailItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItemWrapper: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,

    textAlign: 'center',
    marginBottom: 16,
  },
});
