import React from "react"
import { Marker, MarkerProps, InfoWindow, InfoWindowProps } from "react-google-maps"
import { FeatureCollection, Geometry, Feature, Point, LineString } from "geojson"
import pinSvg from "../../assets/poi-pin.svg"

export interface DestinationProps {
    name: string;
    description: string;
    done?: string;
}

export type DestinationFeature = Feature<Point, DestinationProps>;

export interface DestinationMarkerProps {
    feature: DestinationFeature
}

const pinIcon = {
    url: pinSvg,
    anchor: { x: 15, y: 50 },
    shape: {},
    labelOrigin:{x:15,y:18},
    scaledSize: {
        width: 30,
        height:50

    }
}

export const DestinationMarker: React.SFC<DestinationMarkerProps & MarkerProps> = ({
    feature,
    children,
    label,
    ...restProps
}) => {
    const [lng, lat] = feature.geometry.coordinates
    const isDone = feature.properties.done === "1";
    
    return (
        <Marker
            position={{ lat, lng }}
            options={{
                opacity:isDone ? 0.5 : 1.0,
            }}
            label={{
                text:label,
                color:"#FFFFFF"
            }}
            icon={pinIcon}
            {...restProps}
        >
            {children}
        </Marker>
    )
}

export const DestinationInfoWindow: React.SFC<DestinationMarkerProps & InfoWindowProps> = ({ feature: { properties: { name, description, done = false } }, ...restProps }) => (
    <InfoWindow  {...restProps}>
        <div>
            <h4>{name}</h4>
            {description}
        </div>
    </InfoWindow>
)