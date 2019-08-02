import React from "react"
import { Marker, MarkerProps, InfoWindow, InfoWindowProps } from "react-google-maps"
import { KmlLayerComponent } from "./Layer"
import { Feature, Point } from "geojson"
import useKmlLayer from "./useKmlLayer";
import { DateTime } from "luxon";
import { fromTicksString, dateDisplay } from "../../utils/datetime";
import { get } from "ts-get";
import { pinSymbol, checkmarkSymbol } from "./symbols";

// The properties exposed by google maps
interface GDestinationProps {
    name: string;
    description: string;
    done?: string;
    start: string;
    end: string;
}

export interface DestinationProps {
    name: string;
    description: string;
    isDone: boolean;
    isActive: boolean;
    startDate: DateTime
    endDate: DateTime
}

export type DestinationFeature = Feature<Point, DestinationProps>;

export interface DestinationMarkerProps {
    feature: DestinationFeature
}

export const DestinationMarker: React.SFC<DestinationMarkerProps & MarkerProps> = ({
    feature,
    children,
    label,
    ...restProps
}) => {
    const [lng, lat] = feature.geometry.coordinates
    const isDone = get(feature, it => feature.properties.isDone, false)
    const isActive = get(feature, it => feature.properties.isActive, false)

    const fillColor = isActive ? { fillColor: "orange" } : {};

    return (
        <Marker
            position={{ lat, lng }}
            label={{
                text: label,
                color: isDone ? "#000" : "#FFF",
                fontWeight: isDone ? "500" : undefined,
            }}
            icon={isDone ?
                checkmarkSymbol :
                {
                    ...pinSymbol,
                    ...fillColor
                }
            }
            {...restProps}
        >
            {children}
        </Marker>
    )
}

const dateFormat = {
    month: "long",
    day: "numeric",
}
export const DestinationInfoWindow: React.SFC<DestinationMarkerProps & InfoWindowProps> = ({ feature: { properties: { name, isDone,isActive, startDate, endDate } }, ...restProps }) => {
    const daysUntil = Math.floor(startDate.diffNow('days').days)
    return (
        <InfoWindow  {...restProps}>
            <div>
                <h4>{name}</h4>
                {!isDone && daysUntil > 0 && (<h5>In {daysUntil} days!</h5>)}
                {isActive && (<h5>Here for {Math.floor(endDate.diffNow('days').days)} more days</h5>)}
                {startDate.toLocaleString(dateFormat)} - {endDate.toLocaleString(dateFormat)} <i>({Math.ceil(endDate.diff(startDate, "days").days)} Days)</i>
            </div>
        </InfoWindow>
    )
}

export const DestinationLayer: KmlLayerComponent<DestinationFeature> = ({ url, selectedFeature, onClick, onClose, zIndexStart = 0, zIndexActive }) => {
    const features = useKmlLayer<GDestinationProps, Point, DestinationProps>(url, ({ properties, ...restFeat }) => {
        const { done, start, end, ...restProps } = properties
        const startDate = fromTicksString(start)
        const endDate = fromTicksString(end)
        const now = DateTime.local()

        return ({
            ...restFeat,
            properties: {
                ...restProps,
                isActive: now >= startDate && now < endDate,
                isDone: now >= endDate,
                startDate,
                endDate
            }
        })
    })
    return (
        <>
            {features.map((feature, index) => {
                const isSelected = feature === selectedFeature;
                return (
                    <DestinationMarker
                        key={`destination-${index}`}
                        label={`${index + 1}`}
                        feature={feature}
                        onClick={() => onClick && onClick(feature)}
                        zIndex={zIndexActive && feature.properties.isActive ? zIndexActive : zIndexStart + index}
                    >
                        {isSelected && (
                            <DestinationInfoWindow
                                feature={feature}
                                onCloseClick={() => onClose && onClose(feature)}
                            />
                        )}
                    </DestinationMarker>
                )
            })}
        </>
    )
}