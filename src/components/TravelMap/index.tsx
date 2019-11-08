import { graphql, useStaticQuery } from 'gatsby';
import React, { useState, useRef, useCallback } from 'react';
import Map from '../Map';
import { DESTINATIONS_LAYER, TRAVELS_LAYER } from '../Map/constants';
import { DestinationLayer, DestinationProps } from '../Map/Layers/LayerDestination';
import { PostFeature, PostsLayer } from '../Map/Layers/LayerPosts';
import { TravelLayer } from '../Map/Layers/LayerTravel';
import './index.scss';
import { GoogleMap } from 'react-google-maps';
import { Feature, Point } from 'geojson';

// const EpicAdventureKML = 'https://www.google.com/maps/d/kml?forcekml=1&mid=1HFfcjZfpjFxjGKBBA8OCaxkJUuCoKcwW';

// const DESTINATIONS_LAYER = `${EpicAdventureKML}&lid=3KEUBKwaoqc`;
// const TRAVELS_LAYER = `${EpicAdventureKML}&lid=84tdCZfqPe8`;


export interface TravelMapProps {

}


const postFeaturesQuery = graphql`
  query{
    postPositions:allContentfulBlogPost(filter: {location: { lat: {ne:null}, lon: {ne:null}}}) {
    nodes {
      ...PostFeatureFragment
    }
  }
}
`;
interface PostFeaturesData {
  postPositions: {
    nodes: PostFeature[];
  };
}

const TravelMap: React.SFC<TravelMapProps> = () => {
  const { postPositions: { nodes: posts = [] } = {} } = useStaticQuery<PostFeaturesData>(postFeaturesQuery);
  const [selectedFeature, selectFeature] = useState();
  const mapRef = useRef<GoogleMap>();
  const destinationsCallback = useCallback((dests:Array<Feature<Point,DestinationProps>>=[])=>{
    const currentLocation = dests.find((f)=>f.properties.isActive);
    if(currentLocation && mapRef.current){
      const [lng,lat] = currentLocation.geometry.coordinates;
      mapRef.current.panTo({lat,lng});
    }
  },[mapRef]);

  const toggleFeature = useCallback((feature:any|undefined=undefined)=>{
    selectedFeature === feature ? selectFeature(undefined) : selectFeature(feature);
  },[]);
  // const toggleFeature = (feature: any | undefined = undefined) => {
    
  // };
  const zIndexActive = 10000;

  return (
    <Map 
      ref={mapRef}
      defaultZoom={4}>
      <TravelLayer
        selectedFeature={selectedFeature}
        url={TRAVELS_LAYER}
        onClick={toggleFeature}
        onClose={() => toggleFeature()}
        zIndexActive={zIndexActive}
      />

      <DestinationLayer
        selectedFeature={selectedFeature}
        url={DESTINATIONS_LAYER}
        onClick={toggleFeature}
        onClose={() => toggleFeature()}
        zIndexStart={1000}
        zIndexActive={zIndexActive}
        onLayerLoad={destinationsCallback}
      />

      <PostsLayer
        selectedFeature={selectedFeature}
        features={posts}
        onClick={toggleFeature}
        onClose={() => toggleFeature()}
        zIndexStart={2000}
      />
    </Map>
  );
};

export default TravelMap;


