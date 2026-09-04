import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { openWhatsApp } from '../utils/whatsapp';

interface FooterProps {
  onOpenSignup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSignup }) => {
  const handleGeneralWhatsApp = () => {
    openWhatsApp({
      type: 'general',
      customMessage: 'Namaste 78 E Loka. I would like to inquire about partnerships and curated access.',
    });
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Brand Column & Philosophy */}
        <View style={styles.topRow}>
          <View style={styles.brandCol}>
            <Text style={styles.brandTitle}>78°E LOKA</Text>
            <Text style={styles.taglineItalic}>Real India. Not Tourist India.</Text>
            <Text style={styles.manifesto}>
              A quiet, conscious platform built to connect discerning travelers with native home cooks, fishermen, artisans, and keepers of secret lands across India.
            </Text>
          </View>

          {/* Chapters / Roadmap */}
          <View style={styles.roadmapCol}>
            <Text style={styles.colHeader}>CHAPTERS</Text>
            <View style={styles.phaseRow}>
              <Text style={styles.phaseActive}>Issue 01 · Goa (Active)</Text>
              <Text style={styles.phaseUpcoming}>Issue 02 · Northeast India</Text>
              <Text style={styles.phaseUpcoming}>Issue 03 · Kashmir</Text>
              <Text style={styles.phaseUpcoming}>Issue 04 · Pan-India</Text>
            </View>
          </View>

          {/* Quick Access */}
          <View style={styles.linksCol}>
            <Text style={styles.colHeader}>CONCIERGE</Text>
            <Pressable onPress={onOpenSignup} style={styles.linkItem}>
              <Text style={styles.linkText}>Request Private Access</Text>
            </Pressable>
            <Pressable onPress={onOpenSignup} style={styles.linkItem}>
              <Text style={styles.linkText}>Register as Local Host</Text>
            </Pressable>
            <Pressable onPress={handleGeneralWhatsApp} style={styles.linkItem}>
              <Text style={styles.linkTextWa}>Direct WhatsApp Concierge →</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <Text style={styles.copyright}>© {new Date().getFullYear()} 78 E LOKA. All Rights Reserved.</Text>
          <Text style={styles.location}>Panjim · Betul · Netravali</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1E241D', // Deep organic dark olive
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  container: {
    maxWidth: 1140,
    width: '100%',
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
    gap: 36,
    marginBottom: 40,
  },
  brandCol: {
    maxWidth: 420,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FBF9F5',
    letterSpacing: 2,
    marginBottom: 4,
  },
  taglineItalic: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#A8B3A2',
    marginBottom: 14,
  },
  manifesto: {
    fontSize: 13,
    color: '#859080',
    lineHeight: 20,
  },
  roadmapCol: {
    minWidth: 180,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A8B3A2',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  phaseRow: {
    gap: 6,
  },
  phaseActive: {
    fontSize: 13,
    color: '#DCE5D8',
    fontWeight: '600',
  },
  phaseUpcoming: {
    fontSize: 13,
    color: '#768071',
  },
  linksCol: {
    minWidth: 180,
  },
  linkItem: {
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 13,
    color: '#B5C0AF',
  },
  linkTextWa: {
    fontSize: 13,
    color: '#D1E7D2',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#2D352B',
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 11,
    color: '#656F60',
  },
  location: {
    fontSize: 11,
    color: '#656F60',
  },
});
