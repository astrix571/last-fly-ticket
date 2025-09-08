// services/flights.ts

import Constants from 'expo-constants';
import axios from 'axios';

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_AMADEUS_API_KEY;
const API_SECRET = Constants.expoConfig?.extra?.EXPO_PUBLIC_AMADEUS_API_SECRET;

const TOKEN_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const FLIGHTS_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

export type FlightOption = {
  from: string;
  to: string;
  departure: string;
  arrival: string;
  airline: string;
  price: number;
};

export async function getFlights(to: string): Promise<FlightOption[]> {
  try {
    const token = await getAmadeusToken();
    const date = getDateNDaysFromNow(10); // תאריך בעוד 10 ימים

    const response = await axios.get(FLIGHTS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        originLocationCode: 'TLV',
        destinationLocationCode: to,
        departureDate: date,
        adults: 1,
        currencyCode: 'USD',
        max: 5,
      },
    });

    const results = response.data.data || [];

    return results.map((offer: any) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];

      return {
        from: segment.departure.iataCode,
        to: segment.arrival.iataCode,
        departure: segment.departure.at.slice(11, 16),
        arrival: segment.arrival.at.slice(11, 16),
        airline: segment.carrierCode,
        price: Number(offer.price.total),
      };
    });
  } catch (err) {
    console.warn('Fallback to mock: ', err);
    return mockFlights(to);
  }
}

async function getAmadeusToken(): Promise<string> {
  const response = await axios.post(
    TOKEN_URL,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
}

function getDateNDaysFromNow(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() + n);
  return date.toISOString().split('T')[0];
}

function mockFlights(to: string): FlightOption[] {
  return [
    {
      from: 'TLV',
      to,
      departure: '08:00',
      arrival: '13:00',
      airline: 'EL',
      price: 320,
    },
    {
      from: 'TLV',
      to,
      departure: '15:00',
      arrival: '20:00',
      airline: 'LH',
      price: 280,
    },
  ];
}
