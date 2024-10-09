import { LatLng } from "react-native-maps";

export type CameraType = {
  /**
   * Apple Maps
   */
  altitude?: number;
  center: LatLng;
  heading: number;
  pitch: number;
  /**
   * Google Maps
   */
  zoom?: number;
};

export type RegionType = LatLng & {
  latitudeDelta: number;
  longitudeDelta: number;
};
