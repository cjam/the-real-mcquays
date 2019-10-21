import React, { } from 'react';
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

// const LayerInfo = () => {
//   const features = useKmlLayer<DestinationProps, Point>(DESTINATIONS_LAYER)
//   return (
//     <table>
//       <thead>
//         <tr>
//           <td>Index</td>
//           <td>Name</td>
//           <td>Start</td>
//           <td>End</td>
//         </tr>
//       </thead>
//       <tbody>
//         {features.map((f, i) => (
//           <tr>
//             <td>{i}</td>
//             <td>{f.properties.name}</td>
//             <td>{DateTime.fromMillis(parseInt(f.properties.start)/1000).toISO()}</td>
//             <td>{DateTime.fromMillis(parseInt(f.properties.end)/1000).toISO()}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }


const Map = React.forwardRef<GoogleMap, MapProps>((props, ref) => (
  <>
    {/* <LayerInfo /> */}
    <GMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing`}
      loadingElement={<div className='mapLoading' style={{ height: `100%` }} />}
      containerElement={<div className='mapContainer' />}
      mapElement={<div className='mapElement' />}
      mapRef={ref}
      {...props}
    />
  </>
));

export default Map;
