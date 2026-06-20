import { useState, useRef, useEffect } from "react";
import "./Map.css";
import mapboxgl, { LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { accessToken } from "../authService/externalVar";

const INITIAL_CENTER: LngLat = new LngLat(-73.98, 40.7);
const INITIAL_ZOOM: number = 13;

function Map() {
  // ## USESTATES
  const [center, setCenter] = useState<LngLat>(INITIAL_CENTER);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  // ## USEREFS FOR MAP
  const mapRef = useRef<mapboxgl.Map>(null); // will call the map object
  const mapContainerRef = useRef<HTMLDivElement>(null); // makes the container holding map object

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
        },
      );
    } else {
      console.error("Geolocation services not available.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [userLocation]);
  console.log(userLocation);
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("move", () => {
      // adding listener for moving/dragging of map
      const mapCenter = mapRef.current?.getCenter(); // (from API) retrieve new center of map
      const mapZoom = mapRef.current?.getZoom(); // (from API) retrieving new zoom of map

      if (mapCenter && mapZoom) {
        setCenter(mapCenter);
        setZoom(mapZoom);
      }
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        Longitude: {center.lng.toFixed(4)} Latitude: {center.lat.toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div>
      {/* <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button> */}

      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Map;
