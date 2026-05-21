import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Duration = '1 hour' | '2 hours' | 'Half day' | 'Full day';
type Category =
  | 'All'
  | 'Food & Drink'
  | 'Art & Craft'
  | 'Culture'
  | 'Wellness'
  | 'Music'
  | 'Indoor Games';

type Activity = {
  id: string;
  name: string;
  host: string;
  category: Exclude<Category, 'All'>;
  distanceKm: number;
  duration: Duration;
  price: number;
  rating: number;
  slots: string[];
  description: string;
};

type Booking = {
  id: string;
  activityName: string;
  slot: string;
  people: number;
  totalPrice: number;
  countdown: string;
};

type Stage = 'splash' | 'location' | 'signup' | 'time' | 'home';

const categories: Category[] = [
  'All',
  'Food & Drink',
  'Art & Craft',
  'Culture',
  'Wellness',
  'Music',
  'Indoor Games',
];

const durationOptions: Duration[] = ['1 hour', '2 hours', 'Half day', 'Full day'];
const weatherRefreshMinutes = 15;
const weatherRefreshMs = weatherRefreshMinutes * 60 * 1000;

const priceFilters = [
  { label: 'Any', value: Infinity },
  { label: '₹1000', value: 1000 },
  { label: '₹1500', value: 1500 },
] as const;

const activities: Activity[] = [
  {
    id: '1',
    name: 'Goan Home Cooking Experience',
    host: 'Maria Dsouza',
    category: 'Food & Drink',
    distanceKm: 1.2,
    duration: '2 hours',
    price: 1200,
    rating: 4.8,
    slots: ['12:00 PM', '3:00 PM', '6:00 PM'],
    description:
      'Cook a classic Goan curry and poi bread with a local home chef in a cozy indoor kitchen.',
  },
  {
    id: '2',
    name: 'Monsoon Pottery Workshop',
    host: 'Clay Cove Studio',
    category: 'Art & Craft',
    distanceKm: 2.1,
    duration: '1 hour',
    price: 900,
    rating: 4.7,
    slots: ['11:00 AM', '1:30 PM', '4:00 PM'],
    description:
      'Hands-on beginner pottery session with wheel basics, glazing demo, and take-home keepsake.',
  },
  {
    id: '3',
    name: 'Indoor Feni & Culture Tasting',
    host: 'Heritage House Goa',
    category: 'Culture',
    distanceKm: 3.4,
    duration: '1 hour',
    price: 1500,
    rating: 4.9,
    slots: ['2:00 PM', '5:00 PM'],
    description:
      'Taste local feni styles and learn stories behind Goa traditions in a restored heritage villa.',
  },
  {
    id: '4',
    name: 'Rainy Day Board Game Lounge',
    host: 'Panjim Play Cafe',
    category: 'Indoor Games',
    distanceKm: 0.9,
    duration: 'Half day',
    price: 600,
    rating: 4.6,
    slots: ['10:00 AM', '2:00 PM'],
    description:
      'Unlimited board games, snacks, and host-led recommendations for groups and couples.',
  },
];

const weatherStates = [
  'Light Rain · Rain expected for next 3 hours',
  'Heavy Rain · Storm pockets expected in 45 min',
  'Light Rain · Clearing up in 45 min',
];

export default function App() {
  const [stage, setStage] = useState<Stage>('splash');
  const [selectedDuration, setSelectedDuration] = useState<Duration>('2 hours');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [priceFilter, setPriceFilter] = useState<(typeof priceFilters)[number]['label']>('Any');
  const [tab, setTab] = useState<'Home' | 'Explore' | 'Bookings'>('Home');
  const [weatherIndex, setWeatherIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => setStage('location'), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherIndex((current) => (current + 1) % weatherStates.length);
    }, weatherRefreshMs);
    return () => clearInterval(interval);
  }, []);

  const filteredActivities = useMemo(() => {
    const selectedPriceFilter = priceFilters.find((filter) => filter.label === priceFilter);
    const maxPrice = selectedPriceFilter?.value ?? Infinity;
    return activities
      .filter((item) => tab === 'Explore' || item.duration === selectedDuration)
      .filter((item) => selectedCategory === 'All' || item.category === selectedCategory)
      .filter((item) => item.price <= maxPrice)
      .slice()
      .sort((a, b) => a.distanceKm - b.distanceKm || b.rating - a.rating);
  }, [priceFilter, selectedCategory, selectedDuration, tab]);

  const resetBookingFields = () => {
    setBookingStep(1);
    setSelectedSlot('');
    setPeopleCount(1);
  };

  const confirmBooking = () => {
    if (!selectedActivity || !selectedSlot) {
      return;
    }

    const totalPrice = Math.round(selectedActivity.price * peopleCount);
    setBookings((current) => [
      {
        id: `${Date.now()}`,
        activityName: selectedActivity.name,
        slot: selectedSlot,
        people: peopleCount,
        totalPrice,
        countdown: 'Starts in 2h 15m',
      },
      ...current,
    ]);

    setSelectedActivity(null);
    resetBookingFields();
    setTab('Bookings');
  };

  if (stage === 'splash') {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <Text style={styles.logo}>RainPlan</Text>
        <Text style={styles.subtitle}>Your monsoon travel companion in Goa</Text>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  if (stage === 'location') {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.screenTitle}>Enable Location</Text>
        <Text style={styles.screenText}>RainPlan needs your location to show nearby indoor plans instantly.</Text>
        <Pressable style={styles.primaryButton} onPress={() => setStage('signup')}>
          <Text style={styles.primaryButtonText}>Allow Location</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (stage === 'signup') {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.screenTitle}>Sign in to continue</Text>
        <Pressable style={styles.primaryButton} onPress={() => setStage('time')}>
          <Text style={styles.primaryButtonText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => setStage('time')}>
          <Text style={styles.secondaryButtonText}>Continue with Phone Number</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (stage === 'time') {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.screenTitle}>How long do you have?</Text>
        {durationOptions.map((option) => (
          <Pressable
            key={option}
            style={[styles.optionButton, selectedDuration === option && styles.optionButtonActive]}
            onPress={() => setSelectedDuration(option)}
          >
            <Text style={[styles.optionButtonText, selectedDuration === option && styles.optionButtonTextActive]}>
              {option}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.primaryButton} onPress={() => setStage('home')}>
          <Text style={styles.primaryButtonText}>Show my rain plans</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.weatherBar}>
        <Text style={styles.weatherTitle}>{tab === 'Explore' ? 'Weather in Goa' : 'Live Rain Status'}</Text>
        <Text style={styles.weatherText}>{weatherStates[weatherIndex]}</Text>
        <Text style={styles.weatherMeta}>
          Humidity 91% · 26°C · Auto refresh every {weatherRefreshMinutes} min
        </Text>
      </View>

      <View style={styles.tabRow}>
        {(['Home', 'Explore', 'Bookings'] as const).map((tabOption) => (
          <Pressable
            key={tabOption}
            style={[styles.tabButton, tab === tabOption && styles.tabButtonActive]}
            onPress={() => setTab(tabOption)}
          >
            <Text style={[styles.tabLabel, tab === tabOption && styles.tabLabelActive]}>{tabOption}</Text>
          </Pressable>
        ))}
      </View>

      {tab !== 'Bookings' ? (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[styles.chip, selectedCategory === category && styles.chipActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.chipText, selectedCategory === category && styles.chipTextActive]}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.filterRow}>
            {priceFilters.map((priceFilterOption) => (
              <Pressable
                key={priceFilterOption.label}
                style={[styles.filterButton, priceFilter === priceFilterOption.label && styles.filterButtonActive]}
                onPress={() => setPriceFilter(priceFilterOption.label)}
              >
                <Text style={styles.filterText}>Price {priceFilterOption.label}</Text>
              </Pressable>
            ))}
          </View>

          <ScrollView contentContainerStyle={styles.cardList}>
            {filteredActivities.map((activity) => (
              <Pressable key={activity.id} style={styles.card} onPress={() => setSelectedActivity(activity)}>
                <Text style={styles.cardTitle}>{activity.name}</Text>
                <Text style={styles.cardMeta}>
                  {activity.category} · {activity.distanceKm} km · {activity.duration}
                </Text>
                <Text style={styles.cardMeta}>₹{activity.price} · ⭐ {activity.rating} · {activity.slots.length} slots today</Text>
              </Pressable>
            ))}
            {filteredActivities.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No matches yet</Text>
                <Text style={styles.emptyText}>Try switching category or price to see more indoor plans nearby.</Text>
              </View>
            )}
          </ScrollView>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.cardList}>
          {bookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No bookings yet</Text>
              <Text style={styles.emptyText}>Book one experience in 3 taps and it will appear here.</Text>
            </View>
          ) : (
            bookings.map((booking) => (
              <View style={styles.card} key={booking.id}>
                <Text style={styles.cardTitle}>{booking.activityName}</Text>
                <Text style={styles.cardMeta}>{booking.slot} · {booking.people} people</Text>
                <Text style={styles.cardMeta}>₹{booking.totalPrice} · {booking.countdown}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {selectedActivity && (
        <View style={styles.detailSheet}>
          <Text style={styles.detailTitle}>{selectedActivity.name}</Text>
          <Text style={styles.detailMeta}>Hosted by {selectedActivity.host} · ⭐ {selectedActivity.rating}</Text>
          <Text style={styles.detailMeta}>{selectedActivity.description}</Text>

          {bookingStep === 1 && (
            <>
              <Text style={styles.stepTitle}>Step 1 · Select a slot</Text>
              <View style={styles.slotRow}>
                {selectedActivity.slots.map((slot) => (
                  <Pressable
                    key={slot}
                    style={[styles.slotButton, selectedSlot === slot && styles.slotButtonActive]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={styles.slotButtonText}>{slot}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {bookingStep === 2 && (
            <>
              <Text style={styles.stepTitle}>Step 2 · Number of people</Text>
              <View style={styles.stepperRow}>
                <Pressable style={styles.stepperButton} onPress={() => setPeopleCount((count) => Math.max(1, count - 1))}>
                  <Text style={styles.stepperText}>-</Text>
                </Pressable>
                <Text style={styles.peopleCount}>{peopleCount}</Text>
                <Pressable style={styles.stepperButton} onPress={() => setPeopleCount((count) => Math.min(10, count + 1))}>
                  <Text style={styles.stepperText}>+</Text>
                </Pressable>
              </View>
            </>
          )}

          {bookingStep === 3 && (
            <>
              <Text style={styles.stepTitle}>Step 3 · Confirm</Text>
              <Text style={styles.detailMeta}>Slot: {selectedSlot}</Text>
              <Text style={styles.detailMeta}>People: {peopleCount}</Text>
              <Text style={styles.detailMeta}>Total: ₹{selectedActivity.price * peopleCount}</Text>
            </>
          )}

          <View style={styles.detailButtons}>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                setSelectedActivity(null);
                resetBookingFields();
              }}
            >
              <Text style={styles.secondaryButtonText}>Close</Text>
            </Pressable>
            {bookingStep < 3 ? (
              <Pressable
                style={[styles.primaryButton, bookingStep === 1 && !selectedSlot && styles.primaryButtonDisabled]}
                onPress={() => setBookingStep((step) => (step + 1) as 1 | 2 | 3)}
                disabled={bookingStep === 1 && !selectedSlot}
                accessibilityState={{ disabled: bookingStep === 1 && !selectedSlot }}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.primaryButton} onPress={confirmBooking}>
                <Text style={styles.primaryButtonText}>Confirm Booking</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: '#F5F7FA' },
  splashContainer: { flex: 1, backgroundColor: '#1A56A0', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 32, fontWeight: '700', color: '#fff' },
  subtitle: { marginTop: 12, color: '#E3EEFB', fontSize: 14 },
  centeredScreen: { flex: 1, backgroundColor: '#F5F7FA', justifyContent: 'center', padding: 24, gap: 12 },
  screenTitle: { fontSize: 24, fontWeight: '700', color: '#1A56A0', marginBottom: 6 },
  screenText: { fontSize: 14, color: '#6B7E8F', lineHeight: 22 },
  primaryButton: {
    backgroundColor: '#1A56A0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  primaryButtonDisabled: { opacity: 0.5 },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBD0EA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: { color: '#1A56A0', fontWeight: '600' },
  optionButton: { borderRadius: 12, borderWidth: 1, borderColor: '#BBD0EA', padding: 14, backgroundColor: '#fff' },
  optionButtonActive: { borderColor: '#1A56A0', backgroundColor: '#E7F0FC' },
  optionButtonText: { color: '#334A5E', textAlign: 'center', fontWeight: '600' },
  optionButtonTextActive: { color: '#1A56A0' },
  weatherBar: { backgroundColor: '#1A56A0', padding: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  weatherTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  weatherText: { color: '#fff', marginTop: 6 },
  weatherMeta: { color: '#D9E7FA', marginTop: 4, fontSize: 12 },
  tabRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 12, gap: 8 },
  tabButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#E3EAF2', alignItems: 'center' },
  tabButtonActive: { backgroundColor: '#1A56A0' },
  tabLabel: { color: '#41586E', fontWeight: '600' },
  tabLabelActive: { color: '#fff' },
  chipsRow: { paddingHorizontal: 12, marginTop: 12, maxHeight: 44 },
  chip: { backgroundColor: '#E3EAF2', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginHorizontal: 4 },
  chipActive: { backgroundColor: '#1A56A0' },
  chipText: { color: '#41586E', fontSize: 12 },
  chipTextActive: { color: '#fff' },
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 8 },
  filterButton: { backgroundColor: '#fff', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#D5E1ED' },
  filterButtonActive: { borderColor: '#1A56A0', backgroundColor: '#E7F0FC' },
  filterText: { color: '#334A5E', fontSize: 12, fontWeight: '500' },
  cardList: { padding: 16, gap: 12, paddingBottom: 220 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 },
  cardTitle: { color: '#1D3145', fontSize: 16, fontWeight: '700' },
  cardMeta: { color: '#607689', marginTop: 6, fontSize: 13 },
  emptyState: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1D3145' },
  emptyText: { fontSize: 13, color: '#607689', marginTop: 6 },
  detailSheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBE5F0',
  },
  detailTitle: { fontSize: 16, fontWeight: '700', color: '#1D3145' },
  detailMeta: { marginTop: 6, color: '#5B7286', fontSize: 13, lineHeight: 19 },
  stepTitle: { marginTop: 12, color: '#1A56A0', fontWeight: '700' },
  slotRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  slotButton: { borderWidth: 1, borderColor: '#C9D8E7', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 },
  slotButtonActive: { borderColor: '#1A56A0', backgroundColor: '#E7F0FC' },
  slotButtonText: { color: '#334A5E' },
  stepperRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepperButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#1A56A0', alignItems: 'center', justifyContent: 'center' },
  stepperText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  peopleCount: { minWidth: 32, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#1D3145' },
  detailButtons: { flexDirection: 'row', gap: 8, marginTop: 12 },
});
