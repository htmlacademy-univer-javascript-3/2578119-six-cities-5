import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {LatLng, Map, TileLayer} from 'leaflet';
import {City} from '../utils/types.ts';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;

      return;
    }

    if (isRenderedRef.current) {
      map?.panTo(new LatLng(city.location.latitude, city.location.longitude));
    }
    if (isRenderedRef.current) {
      map?.panTo(new LatLng(city.location.latitude, city.location.longitude));
    }
  }, [mapRef, city]);

  return map;
}
