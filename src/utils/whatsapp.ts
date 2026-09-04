import { Linking, Platform } from 'react-native';

export const OFFICIAL_WHATSAPP_NUMBER = '919876665379'; // 78 E Loka Concierge Number (+91 98766 65379)

export interface WhatsAppMessageParams {
  type: 'general' | 'signup_explorer' | 'signup_host' | 'experience_booking' | 'miss_flight' | 'weather_inquiry';
  name?: string;
  destination?: string;
  experienceName?: string;
  hostName?: string;
  hostSkill?: string;
  airportWaitHours?: string;
  weatherCondition?: string;
  customMessage?: string;
}

export function generateWhatsAppMessage(params: WhatsAppMessageParams): string {
  switch (params.type) {
    case 'signup_explorer':
      return `Namaste 78 E Loka Team! 🇮🇳\n\nI just signed up on your landing page as an Explorer.\n• Name: ${params.name || 'Traveler'}\n• Interested In: ${params.destination || 'Authentic Goa & Northeast Experiences'}\n\nPlease share early access details and curated local secret recommendations!`;

    case 'signup_host':
      return `Hello 78 E Loka Team! 🌟\n\nI want to onboard as a Verified Local Host on 78 E Loka.\n• Name: ${params.name || 'Host'}\n• My Craft / Experience: ${params.hostSkill || 'Local Home Cooking / Guiding'}\n• Location: ${params.destination || 'Goa'}\n\nPlease share the onboarding verification steps.`;

    case 'experience_booking':
      return `Hi 78 E Loka Concierge! 🌿\n\nI want to book the authentic experience:\n• Experience: *${params.experienceName || 'Local Experience'}*\n• Host: ${params.hostName || 'Verified Local Host'}\n\nCould you please check availability and connect me directly with the host?`;

    case 'miss_flight':
      return `Emergency Micro-Tour Alert! ✈️\n\nI have ~${params.airportWaitHours || '3'} hours near the Airport before my flight. Can you quickly hook me up with an authentic nearby local experience and guaranteed return time?`;

    case 'weather_inquiry':
      return `Hi 78 E Loka! 🌦️\n\nIt's currently ${params.weatherCondition || 'raining'} here. What are the best authentic hidden gems & warm local experiences available right now?`;

    case 'general':
    default:
      return params.customMessage || `Namaste 78 E Loka! 🇮🇳\n\nI would love to explore authentic, off-the-beaten-track experiences in India. How can I get started?`;
  }
}

export async function openWhatsApp(params: WhatsAppMessageParams): Promise<boolean> {
  const text = generateWhatsAppMessage(params);
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodedText}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported || Platform.OS === 'web') {
      await Linking.openURL(url);
      return true;
    } else {
      const directAppUrl = `whatsapp://send?phone=${OFFICIAL_WHATSAPP_NUMBER}&text=${encodedText}`;
      await Linking.openURL(directAppUrl);
      return true;
    }
  } catch (error) {
    console.warn('Could not open WhatsApp URL directly, attempting browser fallback:', error);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
      return true;
    }
    return false;
  }
}
