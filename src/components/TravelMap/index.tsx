import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Map from '../Map';
import { DESTINATIONS_LAYER, TRAVELS_LAYER } from '../Map/constants';
import { DestinationLayer } from '../Map/Layers/LayerDestination';
import { PostFeature, PostsLayer } from '../Map/Layers/LayerPosts';
import { TravelLayer } from '../Map/Layers/LayerTravel';
import './index.scss';

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
  // const travels = useKmlLayer<TravelProps, LineString>(TRAVELS_LAYER)
  // const destinations = useKmlLayer<DestinationProps, Point>(DESTINATIONS_LAYER)
  // const currentLocation = useKmlLayer(CURRENT_LOCATION_LAYER)

  const toggleFeature = (feature: any | undefined = undefined) => {
    selectedFeature === feature ? selectFeature(undefined) : selectFeature(feature);
  };
  const zIndexActive = 10000;


  return (
    <Map>
      <TravelLayer
        selectedFeature={selectedFeature}
        url={TRAVELS_LAYER}
        onClick={(f) => toggleFeature(f)}
        onClose={() => toggleFeature()}
        zIndexActive={zIndexActive}
      />

      <DestinationLayer
        selectedFeature={selectedFeature}
        url={DESTINATIONS_LAYER}
        onClick={(f) => toggleFeature(f)}
        onClose={() => toggleFeature()}
        zIndexStart={1000}
        zIndexActive={zIndexActive}
      />

      <PostsLayer
        selectedFeature={selectedFeature}
        features={posts}
        onClick={(f) => toggleFeature(f)}
        onClose={() => toggleFeature()}
        zIndexStart={2000}
      />
    </Map>
  );
};

export default TravelMap;


