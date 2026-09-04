import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { CheckIcon, SparklesIcon } from './Icons';

export const ComparisonSection: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Food & Culinary Experience',
      massApps: 'Generic commercial cafes, swiggy delivery & restaurant menus',
      loka: 'Ancestral home-cooked curries with local grandmothers & secret street carts',
    },
    {
      feature: 'Weather Adaptation',
      massApps: 'Static lists. Leaves you stranded during sudden monsoon downpours',
      loka: 'Silent real-time weather AI surfaces indoor craft or sunny coastal adventures dynamically',
    },
    {
      feature: 'Hidden & Secret Spots',
      massApps: 'Overcrowded Instagram photo spots and commercial agency tours',
      loka: 'Curated and submitted exclusively by verified native residents with zero crowds',
    },
    {
      feature: 'Airport Buffer Matching',
      massApps: 'No smart duration filter. High risk of missing your flight',
      loka: '"Miss Your Flight" engine calculates transit + duration + 45-min safety buffer',
    },
    {
      feature: 'Community Impact',
      massApps: 'High corporate commissions, zero direct support to local artisans',
      loka: 'Fair commission (8-12%), direct automated payouts to fishermen & rural hosts',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <SparklesIcon size={14} color="#0284C7" />
            <Text style={styles.badgeText}>THE 78 E LOKA DIFFERENCE</Text>
          </View>
          <Text style={styles.title}>Tourist India vs. Real India</Text>
          <Text style={styles.subtitle}>
            Why India’s most memorable adventures don’t exist on generic aggregator apps.
          </Text>
        </View>

        {/* Comparison Cards / Table */}
        <View style={styles.tableContainer}>
          {comparisonRows.map((row, idx) => (
            <View key={idx} style={styles.rowCard}>
              <Text style={styles.rowTitle}>{row.feature}</Text>

              <View style={styles.columnsWrapper}>
                {/* Traditional Apps Column */}
                <View style={styles.badColumn}>
                  <View style={styles.colHeaderRow}>
                    <Text style={styles.badColHeader}>✕ Packaged Tourist Platforms</Text>
                  </View>
                  <Text style={styles.badColText}>{row.massApps}</Text>
                </View>

                {/* 78 E Loka Column */}
                <View style={styles.goodColumn}>
                  <View style={styles.colHeaderRow}>
                    <CheckIcon size={14} color="#059669" />
                    <Text style={styles.goodColHeader}>78 E LOKA</Text>
                  </View>
                  <Text style={styles.goodColText}>{row.loka}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  inner: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 24,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 600,
  },
  tableContainer: {
    gap: 16,
  },
  rowCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  columnsWrapper: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 12,
  },
  badColumn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  goodColumn: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  colHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  badColHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  goodColHeader: {
    fontSize: 12,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: 0.5,
  },
  badColText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  goodColText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#14532D',
    lineHeight: 18,
  },
});
