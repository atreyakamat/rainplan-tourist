import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { openWhatsApp } from '../utils/whatsapp';

export const MissYourFlightSection: React.FC = () => {
  const [selectedHours, setSelectedHours] = useState<number>(3);

  const handleAirportWhatsApp = () => {
    openWhatsApp({
      type: 'miss_flight',
      airportWaitHours: `${selectedHours} hours near Dabolim/Mopa Airport`,
    });
  };

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.badgeText}>AIRPORT MICRO-TOURS</Text>
          <Text style={styles.title}>
            A few hours to spare before your flight?{' '}
            <Text style={styles.italicTitle}>Don’t wait at the gate.</Text>
          </Text>
          <Text style={styles.desc}>
            We calculate one-way travel, immersive time with a nearby local host, and a guaranteed 45-minute airport return buffer.
          </Text>

          {/* Time Selector */}
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Available window:</Text>
            {[2, 3, 4].map((hrs) => (
              <Pressable
                key={hrs}
                accessibilityLabel={`${hrs} hours window`}
                style={[styles.timeBtn, selectedHours === hrs && styles.timeBtnActive]}
                onPress={() => setSelectedHours(hrs)}
              >
                <Text style={[styles.timeBtnText, selectedHours === hrs && styles.timeBtnTextActive]}>
                  {hrs} Hours
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Curated Quick Pick */}
          <View style={styles.microCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.microLoc}>NEAR DABOLIM · 18 MIN TRANSIT</Text>
              <Text style={styles.microTitle}>Betul Fishermen Quay & Fresh Chai Catch-up</Text>
              <Text style={styles.microSub}>
                Fresh morning tea, hot poee bread, and a quiet riverside walk with Uncle Francis.
              </Text>
            </View>
            <View style={styles.microAction}>
              <Text style={styles.microPrice}>₹850</Text>
              <Pressable
                accessibilityLabel="Quick book on WhatsApp"
                style={styles.microWaBtn}
                onPress={handleAirportWhatsApp}
              >
                <Text style={styles.microWaBtnText}>Quick WA Match →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#F5F2EB',
    paddingVertical: 56,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E1D6',
  },
  container: {
    maxWidth: 920,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: Platform.OS === 'web' ? 36 : 24,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5C6B55',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 22,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 8,
    lineHeight: Platform.OS === 'web' ? 34 : 28,
  },
  italicTitle: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#3B4B34',
  },
  desc: {
    fontSize: 14,
    lineHeight: 22,
    color: '#656D60',
    marginBottom: 24,
    maxWidth: 680,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  timeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5546',
  },
  timeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#F5F2EB',
    borderWidth: 1,
    borderColor: '#D8D2C4',
  },
  timeBtnActive: {
    backgroundColor: '#33442A',
    borderColor: '#33442A',
  },
  timeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5546',
  },
  timeBtnTextActive: {
    color: '#FBF9F5',
  },
  microCard: {
    backgroundColor: '#FBF9F5',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAE5DB',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: Platform.OS === 'web' ? 'center' : 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  microLoc: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B4B34',
    letterSpacing: 1,
    marginBottom: 4,
  },
  microTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2119',
    marginBottom: 4,
  },
  microSub: {
    fontSize: 13,
    color: '#656D60',
    lineHeight: 18,
  },
  microAction: {
    alignItems: Platform.OS === 'web' ? 'flex-end' : 'flex-start',
    gap: 6,
  },
  microPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A2119',
  },
  microWaBtn: {
    backgroundColor: '#33442A',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  microWaBtnText: {
    color: '#FBF9F5',
    fontSize: 12,
    fontWeight: '600',
  },
});
