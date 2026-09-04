import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { EXPERIENCES, ExperienceItem, PillarType } from '../data/experiencesData';
import { openWhatsApp } from '../utils/whatsapp';

interface PillarsSectionProps {
  selectedPillar: PillarType | 'all';
  onSelectPillar: (pillar: PillarType | 'all') => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  selectedPillar,
  onSelectPillar,
}) => {
  const filteredExperiences = useMemo(() => {
    if (selectedPillar === 'all') return EXPERIENCES;
    return EXPERIENCES.filter((item) => item.pillar === selectedPillar);
  }, [selectedPillar]);

  const handleBookWhatsApp = (item: ExperienceItem) => {
    openWhatsApp({
      type: 'experience_booking',
      experienceName: item.title,
      hostName: item.hostName,
    });
  };

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        {/* Section Header */}
        <View style={styles.header}>
          <Text style={styles.sectionCategory}>CURATED PILLARS</Text>
          <Text style={styles.sectionTitle}>
            Taste.{' '}
            <Text style={styles.italicTitle}>Live.</Text>{' '}
            Discover.
          </Text>
          <Text style={styles.sectionDesc}>
            Every gathering is private or small-group, hosted by indigenous families, artisans, and trackers.
          </Text>

          {/* Clean Segment Switcher */}
          <View style={styles.tabsRow}>
            {(['all', 'taste', 'live', 'discover'] as const).map((p) => {
              const label =
                p === 'all'
                  ? 'All Experiences'
                  : p === 'taste'
                  ? 'Taste (Food & Spirit)'
                  : p === 'live'
                  ? 'Live (Craft & Nature)'
                  : 'Discover (Secret Spots)';
              const isActive = selectedPillar === p;
              return (
                <Pressable
                  key={p}
                  accessibilityLabel={`Filter by ${label}`}
                  style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                  onPress={() => onSelectPillar(p)}
                >
                  <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Editorial Experiences Grid */}
        <View style={styles.grid}>
          {filteredExperiences.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* Image */}
              <View style={styles.imageBox}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
                <View style={styles.pillarTag}>
                  <Text style={styles.pillarTagText}>{item.pillar.toUpperCase()}</Text>
                </View>
              </View>

              {/* Body */}
              <View style={styles.cardBody}>
                <View style={styles.metaRow}>
                  <Text style={styles.locationText}>{item.location}</Text>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>

                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.captionItalic}>"{item.highlight}"</Text>

                <View style={styles.hostRow}>
                  <View style={styles.hostAvatar}>
                    <Text style={styles.avatarChar}>{item.hostName.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.hostName}>{item.hostName}</Text>
                    <Text style={styles.hostRole}>{item.hostRole}</Text>
                  </View>
                  <View style={styles.ratingBox}>
                    <Text style={styles.ratingVal}>★ {item.rating}</Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                {/* Footer with Price and WhatsApp Reservation */}
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.priceVal}>₹{item.priceInr}</Text>
                    <Text style={styles.priceSub}>per guest</Text>
                  </View>

                  <Pressable
                    accessibilityLabel={`Reserve ${item.title} on WhatsApp`}
                    style={styles.bookBtn}
                    onPress={() => handleBookWhatsApp(item)}
                  >
                    <Text style={styles.bookBtnText}>Reserve on WhatsApp →</Text>
                  </Pressable>
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
  section: {
    backgroundColor: '#F5F2EB', // Warm gentle sand
    paddingVertical: 64,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E1D6',
  },
  container: {
    maxWidth: 1140,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 44,
  },
  sectionCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5C6B55',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 36 : 26,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  italicTitle: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#3B4B34',
  },
  sectionDesc: {
    fontSize: 15,
    color: '#656D60',
    textAlign: 'center',
    maxWidth: 560,
    lineHeight: 22,
    marginBottom: 24,
  },
  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCD6C9',
  },
  tabBtnActive: {
    backgroundColor: '#33442A',
    borderColor: '#33442A',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5546',
  },
  tabBtnTextActive: {
    color: '#FBF9F5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7E2D8',
    width: Platform.OS === 'web' ? 350 : '100%',
  },
  imageBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#DDD8CE',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pillarTag: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(26, 33, 25, 0.82)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pillarTagText: {
    color: '#FBF9F5',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardBody: {
    padding: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#768071',
    fontWeight: '600',
  },
  durationText: {
    fontSize: 12,
    color: '#768071',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 6,
    lineHeight: 22,
  },
  captionItalic: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#556150',
    lineHeight: 18,
    marginBottom: 16,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FBF9F5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
  },
  hostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B4B34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarChar: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  hostName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F241E',
  },
  hostRole: {
    fontSize: 11,
    color: '#788273',
  },
  ratingBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EFECE6',
  },
  ratingVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B4B34',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#EFECE6',
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A2119',
  },
  priceSub: {
    fontSize: 10,
    color: '#768071',
  },
  bookBtn: {
    backgroundColor: '#33442A',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  bookBtnText: {
    color: '#FBF9F5',
    fontSize: 12,
    fontWeight: '600',
  },
});
