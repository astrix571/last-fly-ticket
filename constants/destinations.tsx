// app/(tabs)/destinations.tsx

import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { destinationsByMood } from '@/constants/destinations';

export default function DestinationsScreen() {
  const { mood } = useLocalSearchParams();
  const router = useRouter();

  const destinations = destinationsByMood[mood as string] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinations for {mood}</Text>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.iata}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/flights?to=${item.iata}`)}
          >
            <Text style={styles.city}>{item.city}</Text>
            <Text style={styles.iata}>{item.iata}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: '500',
  },
  iata: {
    fontSize: 14,
    color: '#666',
  },
});
