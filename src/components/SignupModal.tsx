import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { openWhatsApp } from '../utils/whatsapp';

interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
  initialRole?: 'explorer' | 'host';
}

export const SignupModal: React.FC<SignupModalProps> = ({
  visible,
  onClose,
  initialRole = 'explorer',
}) => {
  const [role, setRole] = useState<'explorer' | 'host'>(initialRole);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('Goa (Issue 01)');
  const [hostCraft, setHostCraft] = useState('Home Cooking / Local Recipes');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    setSubmitted(true);

    if (role === 'explorer') {
      openWhatsApp({
        type: 'signup_explorer',
        name: name.trim(),
        destination: `${region} (WhatsApp: ${phone})`,
      });
    } else {
      openWhatsApp({
        type: 'signup_host',
        name: name.trim(),
        hostSkill: hostCraft,
        destination: `${region} (WhatsApp: ${phone})`,
      });
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleResetAndClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Close */}
          <Pressable
            accessibilityLabel="Close modal"
            style={styles.closeBtn}
            onPress={handleResetAndClose}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>

          {!submitted ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.editionTag}>78°E LOKA · PRIVATE ACCESS</Text>
                <Text style={styles.title}>
                  Join the Circle.{' '}
                  <Text style={styles.italicTitle}>Real India.</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Curated local experiences or direct host registration for conscious travelers.
                </Text>
              </View>

              {/* Role Toggle */}
              <View style={styles.roleToggle}>
                <Pressable
                  accessibilityLabel="Explorer access"
                  style={[styles.roleBtn, role === 'explorer' && styles.roleBtnActive]}
                  onPress={() => setRole('explorer')}
                >
                  <Text style={[styles.roleBtnText, role === 'explorer' && styles.roleBtnTextActive]}>
                    I am an Explorer / Guest
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityLabel="Host access"
                  style={[styles.roleBtn, role === 'host' && styles.roleBtnActive]}
                  onPress={() => setRole('host')}
                >
                  <Text style={[styles.roleBtnText, role === 'host' && styles.roleBtnTextActive]}>
                    I am a Local Host
                  </Text>
                </Pressable>
              </View>

              {/* Inputs */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Maya Sen"
                    placeholderTextColor="#A3A89E"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>WhatsApp Number (for direct concierge access)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+91 98765 43210"
                    placeholderTextColor="#A3A89E"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Region</Text>
                  <View style={styles.chipsRow}>
                    {['Goa (Issue 01)', 'Northeast (Phase 2)', 'Kashmir (Phase 3)'].map((r) => (
                      <Pressable
                        key={r}
                        style={[styles.chip, region === r && styles.chipActive]}
                        onPress={() => setRegion(r)}
                      >
                        <Text style={[styles.chipText, region === r && styles.chipTextActive]}>
                          {r}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {role === 'host' && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Your Craft / Heritage Offering</Text>
                    <View style={styles.chipsRow}>
                      {[
                        'Home Cooking / Local Recipes',
                        'Artisanal Fishing / Boat Trip',
                        'Pottery & Craft Workshop',
                        'Nature Trek & Secret Trail',
                      ].map((c) => (
                        <Pressable
                          key={c}
                          style={[styles.chip, hostCraft === c && styles.chipActive]}
                          onPress={() => setHostCraft(c)}
                        >
                          <Text style={[styles.chipText, hostCraft === c && styles.chipTextActive]}>
                            {c}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

                {/* Submit & WhatsApp CTA */}
                <Pressable
                  accessibilityLabel="Confirm and open WhatsApp"
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitBtnText}>
                    {role === 'explorer'
                      ? 'Inquire on WhatsApp →'
                      : 'Submit & Onboard on WhatsApp →'}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>
                Redirecting to WhatsApp...{' '}
                <Text style={styles.italicTitle}>Namaste.</Text>
              </Text>
              <Text style={styles.successText}>
                We've prepared your private invitation details for WhatsApp. Click below if your browser did not automatically open:
              </Text>

              <Pressable
                accessibilityLabel="Open WhatsApp directly"
                style={styles.reopenBtn}
                onPress={() => {
                  if (role === 'explorer') {
                    openWhatsApp({
                      type: 'signup_explorer',
                      name: name.trim(),
                      destination: `${region} (WhatsApp: ${phone})`,
                    });
                  } else {
                    openWhatsApp({
                      type: 'signup_host',
                      name: name.trim(),
                      hostSkill: hostCraft,
                      destination: `${region} (WhatsApp: ${phone})`,
                    });
                  }
                }}
              >
                <Text style={styles.reopenBtnText}>Open WhatsApp Chat →</Text>
              </Pressable>

              <Pressable style={styles.doneBtn} onPress={handleResetAndClose}>
                <Text style={styles.doneBtnText}>Close Window</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 33, 25, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FBF9F5',
    borderRadius: 20,
    width: '100%',
    maxWidth: 520,
    maxHeight: '90%',
    padding: 28,
    borderWidth: 1,
    borderColor: '#E7E2D8',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EFEAE0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#656D60',
  },
  header: {
    marginBottom: 20,
    paddingRight: 30,
  },
  editionTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5C6B55',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 4,
  },
  italicTitle: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#3B4B34',
  },
  subtitle: {
    fontSize: 13,
    color: '#656D60',
    lineHeight: 18,
  },
  roleToggle: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD8CE',
    alignItems: 'center',
  },
  roleBtnActive: {
    backgroundColor: '#33442A',
    borderColor: '#33442A',
  },
  roleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5546',
  },
  roleBtnTextActive: {
    color: '#FBF9F5',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3A4435',
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD8CE',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A2119',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD8CE',
  },
  chipActive: {
    backgroundColor: '#33442A',
    borderColor: '#33442A',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5546',
  },
  chipTextActive: {
    color: '#FBF9F5',
  },
  submitBtn: {
    backgroundColor: '#33442A',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 6,
  },
  submitBtnText: {
    color: '#FBF9F5',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  successBox: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A2119',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 13,
    color: '#656D60',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  reopenBtn: {
    backgroundColor: '#33442A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    marginBottom: 10,
  },
  reopenBtnText: {
    color: '#FBF9F5',
    fontSize: 13,
    fontWeight: '600',
  },
  doneBtn: {
    paddingVertical: 8,
  },
  doneBtnText: {
    fontSize: 13,
    color: '#768071',
  },
});
