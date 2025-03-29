import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {useMap} from '../../hooks/use-map';
import {City, Point, MapClassType} from '../../types';
import {MARKER_DEFAULT_ICON, MARKER_ACTIVE_ICON} from '../../constants/const.ts';
import 'leaflet/dist/leaflet.css';


type MapProps = {
  block: MapClassType;
  city: City;
  points: Point[];
  selectedPoint?: Point;
};

const defaultCustomIcon = new Icon({
  iconUrl: MARKER_DEFAULT_ICON,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: MARKER_ACTIVE_ICON,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

export function Map(props: MapProps): JSX.Element {
  const { block, city, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div className={`${block}__map map`} ref={mapRef}></div>;
}
