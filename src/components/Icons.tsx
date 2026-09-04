import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Crisp Vector/Canvas styled components for clean cross-platform icon rendering
export const MapPinIcon: React.FC<IconProps> = ({ size = 20, color = '#E15A29' }) => (
  <View style={[styles.iconBox, { width: size, height: size }]}>
    <View style={[styles.pinHead, { borderColor: color, width: size * 0.7, height: size * 0.7, borderRadius: (size * 0.7) / 2 }]} />
    <View style={[styles.pinPoint, { borderTopColor: color, borderTopWidth: size * 0.4, borderLeftWidth: size * 0.25, borderRightWidth: size * 0.25 }]} />
  </View>
);

export const StarIcon: React.FC<IconProps> = ({ size = 16, color = '#F59E0B' }) => (
  <Text style={{ fontSize: size * 0.9, color, lineHeight: size, fontWeight: '700' }}>★</Text>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 18, color = '#10B981' }) => (
  <View style={[styles.checkCircle, { width: size, height: size, backgroundColor: color + '20', borderColor: color }]}>
    <Text style={{ fontSize: size * 0.7, color, fontWeight: '900', textAlign: 'center', lineHeight: size * 0.9 }}>✓</Text>
  </View>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 18, color = '#64748B' }) => (
  <View style={[styles.clockCircle, { width: size, height: size, borderColor: color, borderRadius: size / 2 }]}>
    <View style={[styles.clockHour, { backgroundColor: color, height: size * 0.35 }]} />
    <View style={[styles.clockMin, { backgroundColor: color, width: size * 0.3 }]} />
  </View>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 18, color = '#F59E0B' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>✦</Text>
);

export const PlaneIcon: React.FC<IconProps> = ({ size = 18, color = '#0284C7' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>✈</Text>
);

export const CloudSunIcon: React.FC<IconProps> = ({ size = 20, color = '#0284C7' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>⛅</Text>
);

export const SunIcon: React.FC<IconProps> = ({ size = 20, color = '#F59E0B' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>☀</Text>
);

export const RainIcon: React.FC<IconProps> = ({ size = 20, color = '#0284C7' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>🌧</Text>
);

export const SunsetIcon: React.FC<IconProps> = ({ size = 20, color = '#EA580C' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>🌅</Text>
);

export const UtensilsIcon: React.FC<IconProps> = ({ size = 18, color = '#E15A29' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>🍴</Text>
);

export const CompassIcon: React.FC<IconProps> = ({ size = 18, color = '#0EA5E9' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>🧭</Text>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ size = 18, color = '#10B981' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>🛡️</Text>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF' }) => (
  <View style={[styles.waCircle, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.75, color, fontWeight: '800' }}>💬</Text>
  </View>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => (
  <Text style={{ fontSize: size, color, fontWeight: '700', lineHeight: size }}>→</Text>
);

export const UserIcon: React.FC<IconProps> = ({ size = 18, color = '#64748B' }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>👤</Text>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 20, color = '#64748B' }) => (
  <Text style={{ fontSize: size, color, fontWeight: '700', lineHeight: size }}>✕</Text>
);

const styles = StyleSheet.create({
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinHead: {
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  pinPoint: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  checkCircle: {
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockCircle: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  clockHour: {
    width: 1.5,
    position: 'absolute',
    top: 3,
    borderRadius: 1,
  },
  clockMin: {
    height: 1.5,
    position: 'absolute',
    left: '50%',
    borderRadius: 1,
  },
  waCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
