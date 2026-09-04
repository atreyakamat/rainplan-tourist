import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { openWhatsApp } from '../utils/whatsapp';

interface HeroSectionProps {
  onOpenSignup: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSignup, onExploreClick }) => {
  const handleHeroWhatsApp = () => {
    openWhatsApp({
      type: 'general',
      customMessage: 'Namaste 78 E Loka. I would like to discover authentic, non-touristy experiences in Goa.',
    });
  };

  return (
    <View style={styles.heroSection}>
      <View style={styles.container}>
        {/* Subtle Pre-header */}
        <View style={styles.badgeRow}>
          <Text style={styles.editionPill}>CURATED LOCAL DISCOVERY</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.locationPill}>GOA, INDIA</Text>
        </View>

        {/* Big Editorial Headline with Italic Emphasis */}
        <Text style={styles.headline}>
          Real India.{'\n'}
          <Text style={styles.headlineItalic}>Not Tourist India.</Text>
        </Text>

        {/* Thoughtful, Grounded Subtext */}
        <Text style={styles.subtext}>
          Skip the commercial itineraries. Dine in ancestral Goan homes, join dawn fishermen on wooden boats, and walk secret forest paths guided only by verified locals.
        </Text>

        {/* Clean, Non-gimmicky CTAs */}
        <View style={styles.ctaRow}>
          <Pressable
            accessibilityLabel="Message on WhatsApp"
            style={styles.primaryBtn}
            onPress={handleHeroWhatsApp}
          >
            <Text style={styles.primaryBtnText}>Inquire on WhatsApp →</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Sign up for early access"
            style={styles.secondaryBtn}
            onPress={onOpenSignup}
          >
            <Text style={styles.secondaryBtnText}>Request Private Access</Text>
          </Pressable>
        </View>

        {/* Editorial Ambient Weather Footnote */}
        <View style={styles.ambientNote}>
          <Text style={styles.ambientItalic}>
            * Current season in Goa: Warm coastal breeze & quiet tides. Ideal for courtyard dining, heritage island trails, and secret cliff viewpoints.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#FBF9F5', // Warm Beige canvas
    paddingTop: Platform.OS === 'web' ? 72 : 44,
    paddingBottom: Platform.OS === 'web' ? 64 : 36,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE8DF',
  },
  container: {
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  editionPill: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5C6B55', // Olive tone
    letterSpacing: 1.8,
  },
  dot: {
    fontSize: 12,
    color: '#B5BAAE',
  },
  locationPill: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A9184',
    letterSpacing: 1.2,
  },
  headline: {
    fontSize: Platform.OS === 'web' ? 58 : 38,
    fontWeight: '800',
    color: '#1A2119', // Deep organic black/olive
    textAlign: 'center',
    lineHeight: Platform.OS === 'web' ? 66 : 44,
    letterSpacing: -1,
    marginBottom: 20,
  },
  headlineItalic: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#3B4B34', // Deep artisan olive green
  },
  subtext: {
    fontSize: Platform.OS === 'web' ? 17 : 15,
    lineHeight: 26,
    color: '#586055', // Muted olive slate
    textAlign: 'center',
    maxWidth: 620,
    marginBottom: 36,
    fontWeight: '400',
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center',
    marginBottom: 36,
  },
  primaryBtn: {
    backgroundColor: '#33442A', // Deep refined olive
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  primaryBtnText: {
    color: '#FBF9F5',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D2C4',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 999,
  },
  secondaryBtnText: {
    color: '#2A3326',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  ambientNote: {
    borderTopWidth: 1,
    borderTopColor: '#EDE8DF',
    paddingTop: 18,
    width: '100%',
    maxWidth: 580,
    alignItems: 'center',
  },
  ambientItalic: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#768071',
    textAlign: 'center',
    lineHeight: 18,
  },
});
