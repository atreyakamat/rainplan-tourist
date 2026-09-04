import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { openWhatsApp } from './src/utils/whatsapp';

export default function App() {
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width >= 880;
  const isTablet = width >= 640 && width < 880;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'explorer' | 'host'>('explorer');
  const [submitted, setSubmitted] = useState(false);

  // Smooth continuous ambient flowing background animations
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Flowing loop for Orb 1 (Olive mist)
    Animated.loop(
      Animated.sequence([
        Animated.timing(orb1Anim, {
          toValue: 1,
          duration: 14000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(orb1Anim, {
          toValue: 0,
          duration: 14000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Flowing loop for Orb 2 (Warm Golden Sand mist)
    Animated.loop(
      Animated.sequence([
        Animated.timing(orb2Anim, {
          toValue: 1,
          duration: 18000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(orb2Anim, {
          toValue: 0,
          duration: 18000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Flowing loop for Orb 3 (Sage mist)
    Animated.loop(
      Animated.sequence([
        Animated.timing(orb3Anim, {
          toValue: 1,
          duration: 22000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(orb3Anim, {
          toValue: 0,
          duration: 22000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Breathing pulse for Coming Soon badge
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [orb1Anim, orb2Anim, orb3Anim, pulseAnim]);

  // Orb 1 Translations
  const orb1TranslateX = orb1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 120],
  });
  const orb1TranslateY = orb1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 90],
  });
  const orb1Scale = orb1Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 0.95],
  });

  // Orb 2 Translations
  const orb2TranslateX = orb2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [80, -120],
  });
  const orb2TranslateY = orb2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, -90],
  });
  const orb2Scale = orb2Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1.1, 0.9, 1.25],
  });

  // Orb 3 Translations
  const orb3TranslateX = orb3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 60],
  });
  const orb3TranslateY = orb3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, -70],
  });

  const handleJoinWhatsApp = () => {
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }

    setSubmitted(true);

    if (role === 'explorer') {
      openWhatsApp({
        type: 'signup_explorer',
        name: name.trim(),
        destination: `Goa Edition (WhatsApp: ${phone || 'Not provided'})`,
      });
    } else {
      openWhatsApp({
        type: 'signup_host',
        name: name.trim(),
        hostSkill: 'Local Host / Traditional Craft',
        destination: `Goa Edition (WhatsApp: ${phone || 'Not provided'})`,
      });
    }
  };

  const handleHostDirectWhatsApp = () => {
    openWhatsApp({
      type: 'signup_host',
      name: 'Local Host',
      hostSkill: 'Local Cooking / Guiding / Secret Spot',
      destination: 'Goa',
    });
  };

  const handleDirectConcierge = () => {
    openWhatsApp({
      type: 'general',
      customMessage: 'Namaste 78 E Loka. I would like to join the early private guestlist.',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* FULL-WIDTH CONTINUOUS FLOWING AMBIENT AURORA CANVAS */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Soft Olive Aurora Orb */}
        <Animated.View
          style={[
            styles.flowingOrb,
            styles.orbOlive,
            {
              width: width * 0.55,
              height: width * 0.55,
              minWidth: 380,
              minHeight: 380,
              top: -60,
              left: -40,
              transform: [
                { translateX: orb1TranslateX },
                { translateY: orb1TranslateY },
                { scale: orb1Scale },
              ],
            },
          ]}
        />

        {/* Warm Golden Sand Mist Orb */}
        <Animated.View
          style={[
            styles.flowingOrb,
            styles.orbSand,
            {
              width: width * 0.6,
              height: width * 0.6,
              minWidth: 400,
              minHeight: 400,
              bottom: -100,
              right: -80,
              transform: [
                { translateX: orb2TranslateX },
                { translateY: orb2TranslateY },
                { scale: orb2Scale },
              ],
            },
          ]}
        />

        {/* Muted Sage Floating Core */}
        <Animated.View
          style={[
            styles.flowingOrb,
            styles.orbSage,
            {
              width: width * 0.45,
              height: width * 0.45,
              minWidth: 320,
              minHeight: 320,
              top: height * 0.3,
              alignSelf: 'center',
              transform: [
                { translateX: orb3TranslateX },
                { translateY: orb3TranslateY },
              ],
            },
          ]}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingHorizontal: isLargeScreen ? 64 : isTablet ? 36 : 20,
              paddingVertical: isLargeScreen ? 40 : 24,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* FULL WIDTH TOP NAVIGATION */}
          <View style={styles.topNav}>
            <View style={styles.brandRow}>
              <Text style={styles.brandSymbol}>78°E</Text>
              <View style={styles.brandTextGroup}>
                <Text style={styles.brandText}>LOKA</Text>
                <Text style={styles.brandSub}>ISSUE 01</Text>
              </View>
            </View>

            <Pressable
              accessibilityLabel="Direct WhatsApp Concierge"
              style={styles.navWaBtn}
              onPress={handleDirectConcierge}
            >
              <Text style={styles.navWaBtnText}>WhatsApp Concierge →</Text>
            </Pressable>
          </View>

          {/* FLUID FULL-WIDTH / RESPONSIVE CENTER STAGE */}
          <View
            style={[
              styles.centerStage,
              isLargeScreen ? styles.centerStageDesktop : styles.centerStageMobile,
            ]}
          >
            {/* LEFT / TOP COLUMN: Editorial Manifesto */}
            <View
              style={[
                styles.leftManifestoCol,
                isLargeScreen ? styles.leftColDesktop : styles.leftColMobile,
              ]}
            >
              {/* Pulsing Status Pill */}
              <View style={styles.statusPill}>
                <Animated.View
                  style={[
                    styles.pulsingDot,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                />
                <Text style={styles.statusText}>COMING SOON</Text>
              </View>

              {/* Bold Editorial Headline */}
              <Text
                style={[
                  styles.mainHeadline,
                  {
                    fontSize: isLargeScreen ? 64 : isTablet ? 48 : 36,
                    lineHeight: isLargeScreen ? 72 : isTablet ? 56 : 44,
                    textAlign: isLargeScreen ? 'left' : 'center',
                  },
                ]}
              >
                Real India.{'\n'}
                <Text style={styles.italicHeadline}>Not Tourist India.</Text>
              </Text>

              {/* Evocative Subtitle */}
              <Text
                style={[
                  styles.subheadline,
                  {
                    textAlign: isLargeScreen ? 'left' : 'center',
                    maxWidth: isLargeScreen ? 520 : 480,
                  },
                ]}
              >
                A quiet sanctuary connecting conscious travelers directly with native home cooks, artisanal fishermen, and secret lands.
              </Text>

              {/* Ambient Editorial Badges on Desktop */}
              {isLargeScreen && (
                <View style={styles.manifestoFootnotes}>
                  <View style={styles.footnoteItem}>
                    <Text style={styles.footnoteLabel}>TASTE</Text>
                    <Text style={styles.footnoteVal}>Ancestral home kitchens & toddy shacks</Text>
                  </View>
                  <View style={styles.footnoteDivider} />
                  <View style={styles.footnoteItem}>
                    <Text style={styles.footnoteLabel}>LIVE</Text>
                    <Text style={styles.footnoteVal}>Craft workshops & nature guided walks</Text>
                  </View>
                  <View style={styles.footnoteDivider} />
                  <View style={styles.footnoteItem}>
                    <Text style={styles.footnoteLabel}>DISCOVER</Text>
                    <Text style={styles.footnoteVal}>Secret spots submitted only by native keepers</Text>
                  </View>
                </View>
              )}
            </View>

            {/* RIGHT / BOTTOM COLUMN: Glassmorphic WhatsApp Invitation Form */}
            <View
              style={[
                styles.rightFormCol,
                isLargeScreen ? styles.rightColDesktop : styles.rightColMobile,
              ]}
            >
              {!submitted ? (
                <View style={styles.formCard}>
                  {/* Mode Selector */}
                  <View style={styles.roleRow}>
                    <Pressable
                      accessibilityLabel="Guest Access"
                      style={[styles.roleTab, role === 'explorer' && styles.roleTabActive]}
                      onPress={() => setRole('explorer')}
                    >
                      <Text
                        style={[
                          styles.roleTabText,
                          role === 'explorer' && styles.roleTabTextActive,
                        ]}
                      >
                        Guest Access
                      </Text>
                    </Pressable>

                    <Pressable
                      accessibilityLabel="Host Registration"
                      style={[styles.roleTab, role === 'host' && styles.roleTabActive]}
                      onPress={() => setRole('host')}
                    >
                      <Text
                        style={[
                          styles.roleTabText,
                          role === 'host' && styles.roleTabTextActive,
                        ]}
                      >
                        Host Register
                      </Text>
                    </Pressable>
                  </View>

                  {/* Input Fields */}
                  <View style={styles.inputsStack}>
                    <TextInput
                      style={styles.minimalInput}
                      placeholder="Full Name"
                      placeholderTextColor="#9EA697"
                      value={name}
                      onChangeText={setName}
                    />

                    <TextInput
                      style={styles.minimalInput}
                      placeholder="WhatsApp Number (+91...)"
                      placeholderTextColor="#9EA697"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>

                  {/* Submit Action */}
                  <Pressable
                    accessibilityLabel="Request access on WhatsApp"
                    style={styles.primaryWaBtn}
                    onPress={handleJoinWhatsApp}
                  >
                    <Text style={styles.primaryWaBtnText}>
                      {role === 'explorer'
                        ? 'Request Access on WhatsApp →'
                        : 'Register as Host on WhatsApp →'}
                    </Text>
                  </Pressable>

                  <Text style={styles.privacyNote}>
                    * Opens WhatsApp with your private invitation code.
                  </Text>
                </View>
              ) : (
                <View style={styles.successCard}>
                  <Text style={styles.successTitle}>
                    Connecting...{' '}
                    <Text style={styles.italicHeadline}>Namaste.</Text>
                  </Text>
                  <Text style={styles.successSub}>
                    Thank you, {name}. Your private access request has been pre-filled.
                  </Text>

                  <Pressable
                    accessibilityLabel="Open WhatsApp again"
                    style={styles.reopenBtn}
                    onPress={handleJoinWhatsApp}
                  >
                    <Text style={styles.reopenBtnText}>Open WhatsApp Chat →</Text>
                  </Pressable>

                  <Pressable
                    accessibilityLabel="Reset form"
                    style={styles.resetBtn}
                    onPress={() => setSubmitted(false)}
                  >
                    <Text style={styles.resetBtnText}>Edit Details</Text>
                  </Pressable>
                </View>
              )}

              {/* Host Quick Link */}
              {role === 'explorer' && !submitted && (
                <Pressable
                  accessibilityLabel="Are you a local host?"
                  style={styles.hostLinkRow}
                  onPress={handleHostDirectWhatsApp}
                >
                  <Text style={styles.hostLinkText}>
                    Are you a native home cook, fisherman, or guide in Goa?{' '}
                    <Text style={styles.hostLinkHighlight}>Chat on WhatsApp →</Text>
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* FULL-WIDTH FOOTER */}
          <View style={styles.bottomFooter}>
            <Text style={styles.footerCopyright}>
              © {new Date().getFullYear()} 78 E LOKA. All Rights Reserved.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F4EC', // Linen sand
  },
  flowingOrb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orbOlive: {
    backgroundColor: '#3E5035',
    opacity: 0.14,
  },
  orbSand: {
    backgroundColor: '#C8A870',
    opacity: 0.16,
  },
  orbSage: {
    backgroundColor: '#8FA382',
    opacity: 0.12,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  topNav: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandSymbol: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2E3D26', // Deep artisan olive
    letterSpacing: 1.5,
  },
  brandTextGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  brandText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A2119',
    letterSpacing: 3,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#768270',
    letterSpacing: 1.2,
  },
  navWaBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8D1C2',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  navWaBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E3D26',
    letterSpacing: 0.3,
  },
  centerStage: {
    width: '100%',
    marginVertical: 'auto',
    paddingVertical: 20,
  },
  centerStageDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 56,
  },
  centerStageMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
  },
  leftManifestoCol: {
    justifyContent: 'center',
  },
  leftColDesktop: {
    flex: 1.2,
    alignItems: 'flex-start',
  },
  leftColMobile: {
    width: '100%',
    alignItems: 'center',
  },
  rightFormCol: {
    justifyContent: 'center',
  },
  rightColDesktop: {
    flex: 1,
    maxWidth: 440,
    width: '100%',
    alignItems: 'stretch',
  },
  rightColMobile: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: '#E2DBD0',
    marginBottom: 24,
    shadowColor: '#2E3D26',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3E5035',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#3E5035',
    letterSpacing: 2,
  },
  mainHeadline: {
    fontWeight: '800',
    color: '#151C14',
    letterSpacing: -1.2,
    marginBottom: 16,
  },
  italicHeadline: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#384B30',
  },
  subheadline: {
    fontSize: 16,
    lineHeight: 26,
    color: '#556150',
    marginBottom: 28,
    fontWeight: '400',
  },
  manifestoFootnotes: {
    borderTopWidth: 1,
    borderTopColor: '#E2DBD0',
    paddingTop: 18,
    width: '100%',
    gap: 8,
  },
  footnoteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footnoteLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#3E5035',
    letterSpacing: 1.2,
    width: 70,
  },
  footnoteVal: {
    fontSize: 12,
    color: '#6E7A68',
    fontStyle: 'italic',
  },
  footnoteDivider: {
    height: 1,
    backgroundColor: 'rgba(226, 219, 208, 0.5)',
  },
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5DED2',
    shadowColor: '#2E3D26',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 4,
    marginBottom: 16,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F4F0E8',
    borderWidth: 1,
    borderColor: '#E4DDD2',
    alignItems: 'center',
  },
  roleTabActive: {
    backgroundColor: '#2E3D26',
    borderColor: '#2E3D26',
  },
  roleTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5C6956',
  },
  roleTabTextActive: {
    color: '#FBF9F5',
  },
  inputsStack: {
    gap: 10,
    marginBottom: 16,
  },
  minimalInput: {
    backgroundColor: '#FBF9F5',
    borderWidth: 1,
    borderColor: '#DDD6C9',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#151C14',
  },
  primaryWaBtn: {
    backgroundColor: '#2E3D26',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#2E3D26',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryWaBtnText: {
    color: '#FBF9F5',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  privacyNote: {
    fontSize: 11,
    color: '#838F7D',
    textAlign: 'center',
    lineHeight: 16,
  },
  successCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 22,
    padding: 30,
    borderWidth: 1,
    borderColor: '#E5DED2',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#151C14',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSub: {
    fontSize: 13,
    color: '#556150',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  reopenBtn: {
    backgroundColor: '#2E3D26',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    marginBottom: 10,
  },
  reopenBtnText: {
    color: '#FBF9F5',
    fontSize: 13,
    fontWeight: '700',
  },
  resetBtn: {
    paddingVertical: 6,
  },
  resetBtnText: {
    fontSize: 12,
    color: '#768270',
    fontWeight: '600',
  },
  hostLinkRow: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  hostLinkText: {
    fontSize: 12,
    color: '#63705E',
    textAlign: 'center',
  },
  hostLinkHighlight: {
    color: '#2E3D26',
    fontWeight: '700',
  },
  bottomFooter: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 24,
  },
  footerCopyright: {
    fontSize: 11,
    color: '#94A08E',
    letterSpacing: 0.5,
  },
});
