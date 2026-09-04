import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { openWhatsApp } from '../utils/whatsapp';

interface HeaderNavbarProps {
  onOpenSignup: () => void;
  onSelectPillar: (pillar: 'taste' | 'live' | 'discover' | 'all') => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ onOpenSignup, onSelectPillar }) => {
  const handleDirectWhatsApp = () => {
    openWhatsApp({
      type: 'general',
      customMessage: 'Namaste 78 E Loka. I would like to explore your curated local experiences in Goa.',
    });
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.navInner}>
        {/* Brand */}
        <Pressable
          accessibilityLabel="78 E Loka Home"
          style={styles.brandRow}
          onPress={() => onSelectPillar('all')}
        >
          <Text style={styles.brandLogo}>78°E</Text>
          <View style={styles.brandTextCol}>
            <Text style={styles.brandName}>LOKA</Text>
            <Text style={styles.brandEdition}>GOA · ISSUE 01</Text>
          </View>
        </Pressable>

        {/* Minimal Editorial Links */}
        <View style={styles.navLinks}>
          <Pressable
            accessibilityLabel="View Taste collection"
            style={styles.navLink}
            onPress={() => onSelectPillar('taste')}
          >
            <Text style={styles.navLinkText}>Taste</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="View Live collection"
            style={styles.navLink}
            onPress={() => onSelectPillar('live')}
          >
            <Text style={styles.navLinkText}>Live</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="View Discover collection"
            style={styles.navLink}
            onPress={() => onSelectPillar('discover')}
          >
            <Text style={styles.navLinkText}>Discover</Text>
          </Pressable>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            accessibilityLabel="Request access"
            style={styles.accessBtn}
            onPress={onOpenSignup}
          >
            <Text style={styles.accessBtnText}>Join Access</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Open WhatsApp concierge"
            style={styles.waBtn}
            onPress={handleDirectWhatsApp}
          >
            <Text style={styles.waBtnText}>WhatsApp Concierge</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#FBF9F5', // Warm beige-white
    borderBottomWidth: 1,
    borderBottomColor: '#EDE8DF',
    paddingHorizontal: 24,
    paddingVertical: 18,
    zIndex: 50,
  },
  navInner: {
    maxWidth: 1140,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#33442A', // Deep artisan olive
    letterSpacing: 1.5,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1F241E',
    letterSpacing: 3,
  },
  brandEdition: {
    fontSize: 9,
    fontWeight: '600',
    color: '#7F8778',
    letterSpacing: 1.2,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  navLink: {
    paddingVertical: 4,
  },
  navLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5546',
    letterSpacing: 0.4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accessBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8D2C4',
    backgroundColor: 'transparent',
  },
  accessBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2F382A',
    letterSpacing: 0.3,
  },
  waBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#384B30', // Deep olive
  },
  waBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FBF9F5',
    letterSpacing: 0.3,
  },
});
