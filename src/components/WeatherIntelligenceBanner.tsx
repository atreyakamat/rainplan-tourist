import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { WEATHER_MODES } from '../data/experiencesData';
import { CloudSunIcon, WhatsAppIcon, ShieldCheckIcon } from './Icons';
import { openWhatsApp } from '../utils/whatsapp';

interface WeatherIntelligenceBannerProps {
  activeWeatherMode: string;
  onSelectWeatherMode: (modeId: string) => void;
}

export const WeatherIntelligenceBanner: React.FC<WeatherIntelligenceBannerProps> = ({
  activeWeatherMode,
  onSelectWeatherMode,
}) => {
  const currentMode = WEATHER_MODES.find((m) => m.id === activeWeatherMode) || WEATHER_MODES[0];

  const handleAskWeatherConcierge = () => {
    openWhatsApp({
      type: 'weather_inquiry',
      weatherCondition: `${currentMode.name} (${currentMode.temp}, ${currentMode.condition})`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <CloudSunIcon size={22} color="#0284C7" />
            <Text style={styles.sectionTitle}>Weather Intelligence Engine</Text>
          </View>
          <Text style={styles.badge}>{currentMode.badge}</Text>
        </View>

        <Text style={styles.description}>
          Unlike static travel apps, 78 E Loka runs meteorological AI in the background to calculate precipitation radar, heat index, and tidal timing to curate experiences that make sense right now.
        </Text>

        {/* Current Condition Display */}
        <View style={[styles.conditionBox, { borderLeftColor: currentMode.color }]}>
          <View style={styles.conditionTop}>
            <Text style={styles.conditionName}>{currentMode.name}</Text>
            <Text style={styles.conditionTemp}>{currentMode.temp}</Text>
          </View>
          <Text style={styles.conditionSub}>{currentMode.condition}</Text>

          <View style={styles.divider} />

          <View style={styles.recommendationBox}>
            <Text style={styles.recTitle}>✨ AI Smart Surface:</Text>
            <Text style={styles.recContent}>{currentMode.recommendationTitle}</Text>

            <View style={styles.surfacedPillarsRow}>
              {currentMode.surfacedPillars.map((p, idx) => (
                <View key={idx} style={styles.pillarTag}>
                  <Text style={styles.pillarTagText}>✓ {p}</Text>
                </View>
              ))}
            </View>

            <View style={styles.safetyBox}>
              <ShieldCheckIcon size={14} color="#0284C7" />
              <Text style={styles.safetyText}>{currentMode.hiddenAlert}</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <Pressable
          accessibilityLabel="Ask WhatsApp concierge for weather recommendations"
          style={styles.weatherWaBtn}
          onPress={handleAskWeatherConcierge}
        >
          <WhatsAppIcon size={18} color="#FFFFFF" />
          <Text style={styles.weatherWaBtnText}>
            Ask WhatsApp Concierge for {currentMode.name} Picks
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  inner: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  badge: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 20,
  },
  conditionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  conditionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conditionName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  conditionTemp: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0284C7',
  },
  conditionSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  recommendationBox: {
    gap: 8,
  },
  recTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  recContent: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  surfacedPillarsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  pillarTag: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pillarTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  safetyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  safetyText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  weatherWaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0284C7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  weatherWaBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
