import {
  MapMarkerProps,
  MapPolylineProps,
  MapViewProps,
} from "react-native-maps";
import { MapViewDirectionsProps } from "react-native-maps-directions";

const MapView = (props: MapViewProps) => <div />;
const MapViewDirections = (props: MapViewDirectionsProps) => <div />;
const Marker = (props: MapMarkerProps) => <div />;
const Polyline = (props: MapPolylineProps) => <div />;
const PROVIDER_GOOGLE = "google";

export default MapView;
export { Marker, Polyline, MapViewDirections, PROVIDER_GOOGLE };
