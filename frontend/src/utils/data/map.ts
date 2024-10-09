interface LocationCoords {
  latitude: number;
  longitude: number;
}

// Function to generate random locations around the user
export const generateRandomLocations = (
  location: LocationCoords,
  count: number
): LocationCoords[] => {
  const locations: LocationCoords[] = [];
  const deltaRange = 0.005; // Adjust this range to control how far the markers can be from the user

  for (let i = 0; i < count; i++) {
    const randomLatitude =
      location.latitude + (Math.random() * 2 - 1) * deltaRange;
    const randomLongitude =
      location.longitude + (Math.random() * 2 - 1) * deltaRange;
    locations.push({ latitude: randomLatitude, longitude: randomLongitude });
  }

  return locations;
};
