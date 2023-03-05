import React, { useState, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

interface Marker {
  lat: number;
  lng: number;
}

interface MapProps {
  apiKey: string;
}
let initialMarker = [
  { lat: 51, lng: 16 },
  { lat: 51, lng: 19 },
  { lat: 51, lng: 22 },
];

const GoogleMap = (props: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>(initialMarker);
  const [map, setMap] = useState<google.maps.Map>();
  const options: google.maps.MapOptions = {
    center: { lat: 51, lng: 16 },
    zoom: 4,
  };
  useEffect(() => {}, [mapRef]);

  useEffect(() => {
    // if (!mapRef.current) return;
    if (!mapRef.current) return;
    const map = new google.maps.Map(mapRef.current, options);
    setMap(map);
    google.maps.event.addListener(
      map,
      "click",
      (event: google.maps.MapMouseEvent) => {
        const marker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkers([...markers, marker]);
      }
    );
  }, [markers]);

  useEffect(() => {
    if (!map) return;

    markers.map((marker) => {
      const gMarker = new google.maps.Marker({
        position: marker,
        map: map,
      });

      gMarker.addListener("click", (event) => {
        const newMarkers = markers.filter((m) => m != marker);

        setMarkers(newMarkers);
        // gMarker.setMap(null);
        console.log(newMarkers, markers);
        setMap(map);
      });
    });

    // return () => {
    //   listeners.forEach((listener) => listener.remove());
    // };
  }, [map]);

  return (
    <div style={{ height: "400px", width: "100%" }} ref={mapRef}>
      <Wrapper apiKey={props.apiKey} />
    </div>
  );
};

export default GoogleMap;
