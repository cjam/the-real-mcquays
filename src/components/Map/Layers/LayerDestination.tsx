import { Feature, Point } from 'geojson';
import { DateTime } from 'luxon';
import React from 'react';
import { InfoWindow, InfoWindowProps, Marker, MarkerProps } from 'react-google-maps';
import { get } from 'ts-get';
import { dateDisplay, fromTicksString } from '../../../utils/datetime';
import { checkmarkSymbol, pinSymbol } from '../symbols';
import useKmlLayer from '../useKmlLayer';
import { KmlLayerComponent } from './Layer';

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
    startDate: DateTime;
    endDate: DateTime;
    now: DateTime;
}

export type DestinationFeature = Feature<Point, DestinationProps>;

export interface DestinationMarkerProps {
    feature: DestinationFeature;
}

export const DestinationMarker: React.SFC<DestinationMarkerProps & MarkerProps> = ({
    feature,
    children,
    label,
    ...restProps
}) => {
    const [lng, lat] = feature.geometry.coordinates;
    const isDone = get(feature, it => feature.properties.isDone, false);
    const isActive = get(feature, it => feature.properties.isActive, false);

    const fillColor = isActive ? { fillColor: 'orange' } : {};

    return (
        <Marker
            position={{ lat, lng }}
            label={{
                text: label,
                color: isDone ? '#000' : '#FFF',
                fontWeight: isDone ? '500' : undefined,
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
    );
};

const dateFormat = {
    month: 'long',
    day: 'numeric',
};
export const DestinationInfoWindow: React.SFC<DestinationMarkerProps & InfoWindowProps> = ({ feature: { properties: { name, isDone, isActive, startDate, endDate, now } }, ...restProps }) => {
    const daysUntil = startDate.diff(now, 'days').days;
    const daysRemaining = endDate.diff(now, 'days').days;

    let message = '';

    if (!isDone) {
        message = daysUntil >= 1 ? `Arrive in ${Math.floor(daysUntil)} day${daysUntil < 2 ? '' : 's'}!` : 'Arriving today!';
    }

    if (isActive) {
        message = daysRemaining >= 2 ? `Here for ${Math.floor(daysRemaining)} more days.` :
            daysRemaining >= 1 ? 'Last day here.' : 'Leaving today.';
    }

    return (
        <InfoWindow  {...restProps}>
            <div>
                <h4>{name}</h4>
                {/* {!isDone && daysUntil > 0 && (<h5>In {daysUntil} days!</h5>)}
                {isActive && (<h5>Here for {daysRemaining} more days</h5>)} */}
                <h5>{message}</h5>
                {startDate.toLocaleString(dateFormat)} - {endDate.toLocaleString(dateFormat)} <i>({Math.ceil(endDate.diff(startDate, 'days').days)} Days)</i>
            </div>
        </InfoWindow>
    );
};

export const DestinationLayer: KmlLayerComponent<DestinationFeature> = ({ 
    url, 
    selectedFeature, 
    onClick, 
    onClose, 
    zIndexStart = 0, 
    zIndexActive,
    now = DateTime.local(),
    onLayerLoad
}) => {
    const features = useKmlLayer<DestinationProps, Point>(url, ({ properties, ...restFeat }) => {
        const { done, start, end, ...restProps } = properties;
        const startDate = fromTicksString(start);
        const endDate = fromTicksString(end);

        return ({
            ...restFeat,
            properties: {
                ...restProps,
                now,
                isActive: now >= startDate && now < endDate,
                isDone: now >= endDate,
                startDate,
                endDate
            }
        });
    });

    if(features && features.length > 0 && onLayerLoad){
        onLayerLoad(features);
    }
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
                );
            })}
        </>
    );
};