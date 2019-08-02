import React from "react"
import { MarkerProps, InfoWindow, InfoWindowProps, Polyline } from "react-google-maps"
import { Feature, LineString } from "geojson"
import { KmlLayerComponent } from "./Layer";
import useKmlLayer from "./useKmlLayer";
import { get } from "ts-get";
import { trainIcon, planeIcon, ferryIcon } from "./symbols"
import { DateTime, Duration } from "luxon";
import { fromTicksString } from "../../utils/datetime";

// The properties exposed by google maps
interface GTravelProps {
    name: string;
    description: string;
    done?: string;
    start: string;
    end: string;
}

export interface TravelProps {
    name: string;
    description: string;
    isActive: boolean;
    isDone: boolean;
}

type TravelFeature = Feature<LineString, TravelProps>;

export interface TravelMarkerProps {
    feature: TravelFeature
}





export const TravelLine: React.SFC<TravelMarkerProps & MarkerProps> = ({
    feature,
    children,
    ...restProps
}) => {
    const path = feature.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
    const description = get(feature, it => feature.properties.description, "");
    const isDone = get(feature, it => feature.properties.isDone, false)
    const isActive = get(feature, it => feature.properties.isActive, false)

    const donePathOptions = {
        strokeOpacity: 0.6,
        strokeWeight: 2,
        strokeColor: "green",
        geodesic: true,
    };

    const pendingPathOptions = {
        strokeWeight: 0,
        geodesic: true,
        icons: [
            {
                icon: {
                    path: "M 0,-1 0,1",
                    strokeOpacity: 0.5,
                    scale: 3,
                },
                offset: "0",
                repeat: "18px"
            }
        ]
    }

    const lowerDesc = description.toLowerCase()
    const icon = lowerDesc.indexOf('train') > -1
        ? trainIcon
        : lowerDesc.indexOf('ferry') > -1
            ? ferryIcon
            : planeIcon;

    const activePathOptions = {
        strokeOpacity: 0.6,
        strokeWeight: 2,
        strokeColor: "orange",
        geodesic: true,
        icons: [
            {
                icon,
                offset: "50%",
                fixedRotation: icon != planeIcon
            }
        ]
    }

    return (
        <Polyline
            path={path}
            options={isDone ? donePathOptions : (isActive ? activePathOptions : pendingPathOptions)}
            {...restProps}
        >
            {children}
        </Polyline>
    )
}

export const TravelInfoWindow: React.SFC<TravelMarkerProps & InfoWindowProps> = ({ feature: { properties: { name, description, isDone, isActive } }, ...restProps }) => (
    <InfoWindow  {...restProps}>
        <div>
            <h4>{name}</h4>
            {description}
        </div>
    </InfoWindow>
)

export const TravelLayer: KmlLayerComponent<TravelFeature> = ({ url, selectedFeature, onClick, onClose, zIndexStart = 0, zIndexActive }) => {
    const features = useKmlLayer<GTravelProps, LineString, TravelProps>(url, ({ properties, ...restFeat }) => {
        const { done, start, end, ...restProps } = properties
        const startDate = fromTicksString(start)
        const endDate = fromTicksString(end)
        const now = DateTime.local()

        return ({
            ...restFeat,
            properties: {
                ...restProps,
                isActive: now >= startDate && now < endDate,
                isDone: now >= endDate
            }
        })
    })
    return (
        <>
            {features.map((feature, index) => {
                const isSelected = feature === selectedFeature;
                return (
                    <TravelLine
                        key={`travel-${index}`}
                        feature={feature}
                        clickable={true}
                        onClick={() => onClick && onClick(feature)}
                        zIndex={zIndexActive && feature.properties.isActive ? zIndexActive : zIndexStart + index}
                    >
                        {isSelected && (
                            <TravelInfoWindow
                                feature={feature}
                                onCloseClick={() => onClose && onClose(feature)} />
                        )}
                    </TravelLine>
                )
            })}
        </>
    )
}