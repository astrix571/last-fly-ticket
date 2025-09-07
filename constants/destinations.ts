// constants/destinations.ts

export const destinationsByMood: Record<
  string,
  { city: string; iata: string }[]
> = {
  calm: [
    { city: 'Zurich', iata: 'ZRH' },
    { city: 'Kyoto', iata: 'UKY' },
    { city: 'Reykjavik', iata: 'KEF' },
  ],
  love: [
    { city: 'Paris', iata: 'CDG' },
    { city: 'Venice', iata: 'VCE' },
    { city: 'Santorini', iata: 'JTR' },
  ],
  adventure: [
    { city: 'Barcelona', iata: 'BCN' },
    { city: 'Cape Town', iata: 'CPT' },
    { city: 'Queenstown', iata: 'ZQN' },
  ],
  escape: [
    { city: 'Bali', iata: 'DPS' },
    { city: 'Tulum', iata: 'CUN' },
    { city: 'Phuket', iata: 'HKT' },
  ],
};
