import React, { useEffect, useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"
import toGeoJson from "@mapbox/togeojson"
// import mapStyles from "./TravelMapStyle"
import mapStyles from "./StandardMapStyle"
import useKmlLayer from "./useKmlLayer"
import { DestinationFeature, DestinationInfoWindow, DestinationMarker, DestinationProps, DestinationLayer } from "./LayerDestination"
import { TravelFeature, TravelInfoWindow, TravelLine, TravelProps, TravelLayer } from "./LayerTravel"
import { FeatureCollection, Geometry, Feature, Point, LineString } from "geojson";
import { useStaticQuery, graphql } from "gatsby";
import { PostFeature, PostMarker, PostInfoWindow, PostsLayer } from "./LayerPosts";
import "./index.scss"
import { LocationLayer } from "./LayerLocation";
import luxon, {DateTime} from "luxon"


const GOOGLE_API_KEY = "AIzaSyB7gxiEw_zR2WH4QI5qjKwWxYgQzN6RZNY";
const EpicAdventureKML = "https://www.google.com/maps/d/kml?forcekml=1&mid=1HFfcjZfpjFxjGKBBA8OCaxkJUuCoKcwW";

const DESTINATIONS_LAYER = `${EpicAdventureKML}&lid=3KEUBKwaoqc`
const TRAVELS_LAYER = `${EpicAdventureKML}&lid=84tdCZfqPe8`
const CURRENT_LOCATION_LAYER = `${EpicAdventureKML}&lid=fu26VA5Vmds`


export interface TravelMapProps {

}

interface MapProps extends TravelMapProps {

}

const postFeaturesQuery = graphql`
  query{
    postPositions:allContentfulBlogPost(filter: {location: { lat: {ne:null}, lon: {ne:null}}}) {
    nodes {
      ...PostFeatureFragment
    }
  }
}
`
interface PostFeaturesData {
  postPositions: {
    nodes: PostFeature[];
  }
}

const Map = withScriptjs(withGoogleMap<TravelMapProps>((props) => {
  const { postPositions: { nodes: posts = [] } = {} } = useStaticQuery<PostFeaturesData>(postFeaturesQuery)
  const [selectedFeature, selectFeature] = useState()
  const travels = useKmlLayer<TravelProps, LineString>(TRAVELS_LAYER)
  const destinations = useKmlLayer<DestinationProps, Point>(DESTINATIONS_LAYER)
  const currentLocation = useKmlLayer(CURRENT_LOCATION_LAYER)

  const toggleFeature = (feature: any | undefined = undefined) => {
    selectedFeature === feature ? selectFeature(undefined) : selectFeature(feature)
  }
  const zIndexActive = 10000;


  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 51.78029, lng: 6 }}
      defaultOptions={{
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true
      }}
    >

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
    </GoogleMap>
  )
}
))

const LayerInfo = () => {
  const features = useKmlLayer<DestinationProps, Point>(DESTINATIONS_LAYER)
  return (
    <table>
      <thead>
        <tr>
          <td>Index</td>
          <td>Name</td>
          <td>Start</td>
          <td>End</td>
        </tr>
      </thead>
      <tbody>
        {features.map((f, i) => (
          <tr>
            <td>{i}</td>
            <td>{f.properties.name}</td>
            <td>{DateTime.fromMillis(parseInt(f.properties.start)/1000).toISO()}</td>
            <td>{DateTime.fromMillis(parseInt(f.properties.end)/1000).toISO()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


const TravelMap: React.SFC<TravelMapProps> = (props) => (
  <>
    {/* <LayerInfo /> */}
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing`}
      loadingElement={<div className="mapLoading" style={{ height: `100%` }} />}
      containerElement={<div className="mapContainer" />}
      mapElement={<div className="mapElement" />}
      {...props}
    />
  </>
)

export default TravelMap;
