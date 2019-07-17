import React from "react"
import { Marker, MarkerProps, InfoWindow, InfoWindowProps, Polyline } from "react-google-maps"
import { Feature, LineString } from "geojson"

export interface TravelProps {
    name: string;
    description: string;
    done?: string;
}

export type TravelFeature = Feature<LineString, TravelProps>;

export interface TravelMarkerProps {
    feature: TravelFeature
}



export const TravelLine: React.SFC<TravelMarkerProps & MarkerProps> = ({
    feature,
    children,
    ...restProps
}) => {
    const path = feature.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
    const { done = false } = feature.properties

    const donePathOptions = {
        strokeOpacity:0.6,
        strokeWeight:2,
        strokeColor:'green',
        geodesic:true,
    };

    const pendingPathOptions = {
        strokeWeight:0,
        geodesic:true,
        icons: [{
            icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 0.5,
                scale: 3,
            },
            offset: '0',
            repeat: '18px'
        }]
    }
    const isDone = done === "1";

    return (
        <Polyline
            path={path}
            options={isDone ? donePathOptions : pendingPathOptions}
            {...restProps}
        >
            {children}
        </Polyline>
    )
}

export const TravelInfoWindow: React.SFC<TravelMarkerProps & InfoWindowProps> = ({ feature: { properties: { name, description, done = false } }, ...restProps }) => (
    <InfoWindow  {...restProps}>
        <div>
            <h4>{name}</h4>
            {description}
        </div>
    </InfoWindow>
)