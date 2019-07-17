import React, { useEffect, useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"
import toGeoJson from "@mapbox/togeojson"
// import mapStyles from "./TravelMapStyle"
import mapStyles from "./StandardMapStyle"
import { DestinationFeature, DestinationInfoWindow, DestinationMarker } from "./DestinationFeature"
import { TravelFeature, TravelInfoWindow, TravelLine } from "./TravelFeature"
import { FeatureCollection, Geometry, Feature, Point, LineString } from "geojson";
import { useStaticQuery, graphql } from "gatsby";
import { PostFeature, PostMarker, PostInfoWindow } from "./PostFeature";
import "./index.scss"


const GOOGLE_API_KEY = "AIzaSyB7gxiEw_zR2WH4QI5qjKwWxYgQzN6RZNY";
const EpicAdventureKML = "https://www.google.com/maps/d/kml?forcekml=1&mid=1HFfcjZfpjFxjGKBBA8OCaxkJUuCoKcwW";


export interface TravelMapProps {

}

interface MapProps extends TravelMapProps {

}

interface TravelMapState {
  destinations: DestinationFeature[]
  travels: TravelFeature[]
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

type TripFeature = DestinationFeature | TravelFeature | PostFeature;

const Map = withScriptjs(withGoogleMap<TravelMapProps>((props) => {
  const { postPositions: { nodes: posts = [] } = {} } = useStaticQuery<PostFeaturesData>(postFeaturesQuery)
  const [selectedFeature, selectFeature] = useState<TripFeature | undefined>()
  const [mapData, setMapData] = useState<TravelMapState>({
    destinations: [],
    travels: []
  })

  const toggleFeature = (feature: TripFeature | undefined = undefined) => selectedFeature === feature ? selectFeature(undefined) : selectFeature(feature)

  const loadMapData = async () => {
    try {
      const kmlRequest = await fetch(EpicAdventureKML)
      const kmlText = await kmlRequest.text()
      const kml = (new DOMParser()).parseFromString(kmlText, "text/xml");
      const geoJson = toGeoJson.kml<FeatureCollection<Geometry>>(kml);
      const { features } = geoJson;

      const loadedDestinations = features.filter(({ geometry }) => geometry.type === "Point") as DestinationFeature[];
      const loadedTravels = features.filter(({ geometry }) => geometry.type === "LineString") as TravelFeature[];

      setMapData({ destinations: loadedDestinations, travels: loadedTravels })
      // console.log("Destinations",loadedDestinations,"Travels",loadedTravels)
    } catch (err) {
      console.error(err);
    }
  }

  // Load the map data on mount
  useEffect(() => {
    loadMapData()
  }, [])

  const { destinations, travels } = mapData;
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

      {travels.map((feature, index) => {
        const { properties: { description, done = false, name } } = feature;
        const isSelected = feature === selectedFeature;
        return (
          <TravelLine
            key={`travel-${index}`}
            feature={feature}
            clickable={true}
            onClick={() => toggleFeature(feature)}
          >
            {isSelected && (
              <TravelInfoWindow
                feature={feature}
                onCloseClick={() => toggleFeature()} />
            )}
          </TravelLine>
        )
      })}

      {destinations.map((feature, index) => {
        const isSelected = feature === selectedFeature;
        return (
          <DestinationMarker
            key={`post-${index}`}
            label={`${index + 1}`}
            feature={feature}
            onClick={() => toggleFeature(feature)}
          >
            {isSelected && (
              <DestinationInfoWindow
                feature={feature}
                onCloseClick={() => toggleFeature()}
              />
            )}
          </DestinationMarker>
        )
      })}

      {posts.map((feature, index) => {
        const { location, title, slug } = feature;
        const isSelected = feature === selectedFeature;
        return (
          <PostMarker
            key={`post-${index}`}
            feature={feature}
            onClick={() => toggleFeature(feature)}
          >
            {isSelected && (
              <PostInfoWindow
                feature={feature}
                onCloseClick={() => toggleFeature()}
              />
            )}
          </PostMarker>
        )
      })}
    </GoogleMap>
  )
}
))




const TravelMap: React.SFC<TravelMapProps> = (props) => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing`}
    loadingElement={<div className="mapLoading" style={{ height: `100%` }} />}
    containerElement={<div className="mapContainer" />}
    mapElement={<div className="mapElement" />}
    {...props}
  />
)

export default TravelMap;
// AIzaSyB7gxiEw_zR2WH4QI5qjKwWxYgQzN6RZNY
