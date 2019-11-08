import React, { useCallback } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import mapStyles from './StandardMapStyle';

const GOOGLE_API_KEY = process.env.GATSBY_GOOGLE_MAPS_API_KEY;

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapProps {
  zoomControl?: boolean;
  scaleControl?: boolean;
  defaultZoom?: number;
  center?: LatLng;
  defaultCenter?: LatLng;
  gestureHandling?: 'auto' | 'none' | 'greedy' | 'cooperative';
  mapTypeId?: 'roadmap' | 'hybrid' | 'satellite' | 'terrain';
  mapRef?: React.Ref<GoogleMap>;
  onMapLoad?: (map:GoogleMap) => void;
}

const GMap = withScriptjs(withGoogleMap<MapProps>(({
  children,
  zoomControl = true,
  scaleControl = true,
  defaultZoom = 3,
  gestureHandling = 'auto',
  mapTypeId = 'roadmap',
  defaultCenter = { lat: 28.3949, lng: 84.1240 },
  mapRef
}) => {
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      defaultOptions={{
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl,
        scaleControl,
        gestureHandling,
        mapTypeId
      }}
      ref={mapRef}
    >
      {children}
    </GoogleMap>
  );
}
));


const Map = React.forwardRef<GoogleMap, MapProps>(({ onMapLoad, ...rest }, ref) => {
  const mapLoaded = useCallback((m:GoogleMap)=>{
    if(m && onMapLoad){
      onMapLoad(m);
    }
    if (typeof(ref) === 'function'){
      ref(m);
    }else if(ref){
      ref.current = m;
    }
  },[]);
  return (
    <>
      <GMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing`}
        loadingElement={<div className='mapLoading' style={{ height: `100%` }} />}
        containerElement={<div className='mapContainer' />}
        mapElement={<div className='mapElement' />}
        mapRef={mapLoaded}
      {...rest}
      />
  </>
  );
});

export default Map;
