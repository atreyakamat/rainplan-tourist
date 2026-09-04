import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { openWhatsApp } from '../utils/whatsapp';

export const WhatsAppFloatButton: React.FC = () => {
  const handleFloatWhatsApp = () => {
    openWhatsApp({
      type: 'general',
      customMessage: 'Namaste 78 E Loka Concierge. I am browsing the curated experiences in Goa and would like personal recommendations.',
    });
  };

  return (
    <View style={styles.floatWrapper}>
      <Pressable
        accessibilityLabel="Chat with 78 E Loka Concierge on WhatsApp"
        style={styles.floatBtn}
        onPress={handleFloatWhatsApp}
      >
        <Text style={styles.waDot}>●</Text>
        <Text style={styles.titleText}>WhatsApp Concierge</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  floatWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 24 : 16,
    right: Platform.OS === 'web' ? 24 : 16,
    zIndex: 9999,
  },
  floatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#33442A', // Deep artisan olive
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4A5D42',
    shadowColor: '#1A2119',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  waDot: {
    fontSize: 9,
    color: '#A3D9A5',
  },
  titleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FBF9F5',
    letterSpacing: 0.4,
  },
});
