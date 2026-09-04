import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { SUPER_HOSTS } from '../data/experiencesData';
import { openWhatsApp } from '../utils/whatsapp';

interface SuperHostsSectionProps {
  onOpenHostSignup: () => void;
}

export const SuperHostsSection: React.FC<SuperHostsSectionProps> = ({ onOpenHostSignup }) => {
  const handleHostWhatsApp = () => {
    openWhatsApp({
      type: 'signup_host',
      name: 'Local Resident',
      hostSkill: 'Traditional Cooking / Nature Guide / Local Craft',
      destination: 'Goa',
    });
  };

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        {/* Section Header */}
        <View style={styles.header}>
          <Text style={styles.tagText}>THE HOST CIRCLE</Text>
          <Text style={styles.title}>
            Guarded by Locals.{' '}
            <Text style={styles.italicTitle}>Shared with Care.</Text>
          </Text>
          <Text style={styles.desc}>
            Meet the native custodians who open their kitchens, wooden boats, and ancestral lands.
          </Text>
        </View>

        {/* Host Profiles Grid */}
        <View style={styles.grid}>
          {SUPER_HOSTS.map((host) => (
            <View key={host.id} style={styles.hostCard}>
              <View style={styles.topRow}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarLetter}>{host.name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.hostName}>{host.name}</Text>
                  <Text style={styles.hostLoc}>{host.location}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{host.badge}</Text>
                </View>
              </View>

              <Text style={styles.craftLabel}>✦ {host.craft}</Text>
              <Text style={styles.bioItalic}>"{host.bio}"</Text>

              <View style={styles.cardBottom}>
                <Text style={styles.expCount}>{host.experienceCount} Gatherings Hosted</Text>
                <Text style={styles.ratingText}>★ {host.rating}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quiet Host Application Callout */}
        <View style={styles.calloutBox}>
          <View style={{ flex: 1, minWidth: 260 }}>
            <Text style={styles.calloutTitle}>Are you a local resident in Goa, Northeast, or Kashmir?</Text>
            <Text style={styles.calloutText}>
              Preserve your craft and welcome respectful travelers. We handle seamless bookings, guest verification, and instant payouts.
            </Text>
          </View>

          <View style={styles.calloutActions}>
            <Pressable
              accessibilityLabel="Host registration form"
              style={styles.hostApplyBtn}
              onPress={onOpenHostSignup}
            >
              <Text style={styles.hostApplyBtnText}>Host Sign-Up</Text>
            </Pressable>

            <Pressable
              accessibilityLabel="Host WhatsApp chat"
              style={styles.hostWaBtn}
              onPress={handleHostWhatsApp}
            >
              <Text style={styles.hostWaBtnText}>WhatsApp Us →</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FBF9F5',
    paddingVertical: 64,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE8DF',
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
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5C6B55',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 26,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 10,
  },
  italicTitle: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#3B4B34',
  },
  desc: {
    fontSize: 15,
    color: '#656D60',
    textAlign: 'center',
    maxWidth: 580,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 44,
  },
  hostCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E7E2D8',
    width: Platform.OS === 'web' ? 265 : '100%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3B4B34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  hostName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A2119',
  },
  hostLoc: {
    fontSize: 11,
    color: '#768071',
  },
  badge: {
    backgroundColor: '#F5F2EB',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3B4B34',
  },
  craftLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#33442A',
    marginBottom: 8,
  },
  bioItalic: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
    color: '#556150',
    marginBottom: 16,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F2EFE8',
    paddingTop: 10,
  },
  expCount: {
    fontSize: 11,
    color: '#768071',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3B4B34',
  },
  calloutBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Platform.OS === 'web' ? 28 : 20,
    borderWidth: 1,
    borderColor: '#DCD6C9',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  calloutTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 13,
    color: '#656D60',
    lineHeight: 20,
    maxWidth: 620,
  },
  calloutActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hostApplyBtn: {
    backgroundColor: '#F5F2EB',
    borderWidth: 1,
    borderColor: '#D8D2C4',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  hostApplyBtnText: {
    color: '#2F382A',
    fontSize: 13,
    fontWeight: '600',
  },
  hostWaBtn: {
    backgroundColor: '#33442A',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  hostWaBtnText: {
    color: '#FBF9F5',
    fontSize: 13,
    fontWeight: '600',
  },
});
