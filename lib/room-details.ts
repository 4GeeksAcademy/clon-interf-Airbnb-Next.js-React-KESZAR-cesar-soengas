export type RoomDetails = {
  hostName: string;
  hostYears: number;
  reviewCount: number;
  maxGuests: number;
};

export const roomDetailsByListingId: Record<string, RoomDetails> = {
  "1": { hostName: "Sofía", hostYears: 6, reviewCount: 84, maxGuests: 4 },
  "2": { hostName: "Mateo", hostYears: 8, reviewCount: 56, maxGuests: 8 },
  "3": { hostName: "Lucía", hostYears: 5, reviewCount: 112, maxGuests: 5 },
  "4": { hostName: "Tomás", hostYears: 3, reviewCount: 39, maxGuests: 2 },
  "5": { hostName: "Valentina", hostYears: 7, reviewCount: 67, maxGuests: 6 },
  "6": { hostName: "Joaquín", hostYears: 4, reviewCount: 48, maxGuests: 6 },
  "7": { hostName: "Camila", hostYears: 9, reviewCount: 93, maxGuests: 4 },
  "8": { hostName: "Nicolás", hostYears: 5, reviewCount: 31, maxGuests: 5 },
  "9": { hostName: "Martina", hostYears: 4, reviewCount: 72, maxGuests: 4 },
  "10": { hostName: "Santiago", hostYears: 10, reviewCount: 121, maxGuests: 10 },
  "11": { hostName: "Florencia", hostYears: 6, reviewCount: 58, maxGuests: 6 },
  "12": { hostName: "Agustín", hostYears: 3, reviewCount: 44, maxGuests: 5 },
};
