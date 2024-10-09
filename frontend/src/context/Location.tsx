// LocationContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  createLocation,
  getUserAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  LocationData,
} from "../services/location";
import { Location } from "../types/location";

interface LocationContextType {
  locations: Location[];
  currentLocation: Location | null;
  loadUserLocations: () => Promise<void>;
  loadLocationById: (locationId: string) => Promise<void>;
  createNewLocation: (locationData: LocationData) => Promise<void>;
  updateExistingLocation: (
    locationId: string,
    locationData: LocationData
  ) => Promise<void>;
  deleteLocationById: (locationId: string) => Promise<void>;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Context provider component
interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  // Function to load all user locations
  const loadUserLocations = async () => {
    try {
      const locations = await getUserAllLocations();
      setLocations(locations);
    } catch (error) {
      throw (error as Error).message;
    }
  };

  // Function to load a location by ID
  const loadLocationById = async (locationId: string): Promise<void> => {
    try {
      const location = await getLocationById(locationId);
      setCurrentLocation(location);
    } catch (error) {
      throw (error as Error).message;
    }
  };

  // Function to create a new location
  const createNewLocation = async (
    locationData: LocationData
  ): Promise<void> => {
    try {
      await createLocation(locationData);
      loadUserLocations();
    } catch (error) {
      throw (error as Error).message;
    }
  };

  // Function to update a location
  const updateExistingLocation = async (
    locationId: string,
    locationData: LocationData
  ): Promise<void> => {
    try {
      const updatedLocation = await updateLocation(locationId, locationData);
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === locationId ? updatedLocation : location
        )
      );
    } catch (error) {
      throw (error as Error).message;
    }
  };

  // Function to delete a location
  const deleteLocationById = async (locationId: string): Promise<void> => {
    try {
      await deleteLocation(locationId);
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location._id !== locationId)
      );
    } catch (error) {
      throw (error as Error).message;
    }
  };

  useEffect(() => {
    loadUserLocations();
  }, []);

  const value: LocationContextType = {
    locations,
    currentLocation,
    loadUserLocations,
    loadLocationById,
    createNewLocation,
    updateExistingLocation,
    deleteLocationById,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the LocationContext
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
