import { Feature, LineString } from 'geojson';
import { DateTime, Duration } from 'luxon';
import React from 'react';
import { InfoWindow, InfoWindowProps, MarkerProps, Polyline } from 'react-google-maps';
import { get } from 'ts-get';
import { fromTicksString } from '../../../utils/datetime';
import { ferryIcon, planeIcon, trainIcon } from '../symbols';
import useKmlLayer from '../useKmlLayer';
import { KmlLayerComponent } from './Layer';

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
    start: DateTime;
    end: DateTime;
    now: DateTime;
}

type TravelFeature = Feature<LineString, TravelProps>;

export interface TravelMarkerProps {
    feature: TravelFeature;
}


export const TravelLine: React.SFC<TravelMarkerProps & MarkerProps> = ({
    feature,
    children,
    ...restProps
}) => {
    const path = feature.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
    const description = get(feature, it => feature.properties.description, '');
    const start = get<TravelFeature, DateTime>(feature, it => it.properties.start as DateTime);
    const end = get<TravelFeature, DateTime>(feature, it => it.properties.end as DateTime);
    const now = get<TravelFeature, DateTime>(feature, it => it.properties.now as DateTime, DateTime.local());
    const isActive = start && end && now >= start && now < end;
    const isDone = end && now >= end;

    const donePathOptions = {
        strokeOpacity: 0.6,
        strokeWeight: 2,
        strokeColor: 'green',
        geodesic: true,
    };

    const pendingPathOptions = {
        strokeWeight: 0,
        geodesic: true,
        icons: [
            {
                icon: {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 0.5,
                    scale: 3,
                },
                offset: '0',
                repeat: '18px'
            }
        ]
    };

    const lowerDesc = description.toLowerCase();
    const icon = lowerDesc.indexOf('train') > -1
        ? trainIcon
        : lowerDesc.indexOf('ferry') > -1
            ? ferryIcon
            : planeIcon;

    const percentDone = Math.abs(now.diff(start).valueOf() / end.diff(start).valueOf()) * 100;
    const activePathOptions = {
        strokeOpacity: 0.6,
        strokeWeight: 2,
        strokeColor: 'orange',
        geodesic: true,
        icons: [
            {
                icon,
                offset: `${percentDone}%`,
                fixedRotation: icon !== planeIcon
            }
        ]
    };

    return (
        <Polyline
            path={path}
            options={isDone ? donePathOptions : (isActive ? activePathOptions : pendingPathOptions)}
            {...restProps}
        >
            {children}
        </Polyline>
    );
};

export const TravelInfoWindow: React.SFC<TravelMarkerProps & InfoWindowProps> = ({ feature: { properties: { name, description, isDone, isActive } }, ...restProps }) => (
    <InfoWindow  {...restProps}>
        <div>
            <h4>{name}</h4>
            {description}
        </div>
    </InfoWindow>
);

export const TravelLayer: KmlLayerComponent<TravelFeature> = ({
    url,
    selectedFeature,
    onClick,
    onClose,
    zIndexStart = 0,
    zIndexActive,
    now = DateTime.local()
}) => {
    const features = useKmlLayer<GTravelProps, LineString, TravelProps>(url, ({ properties, ...restFeat }) => {
        const { done, start, end, ...restProps } = properties;
        const startDate = fromTicksString(start);
        const endDate = fromTicksString(end);
        return ({
            ...restFeat,
            properties: {
                ...restProps,
                start: startDate,
                end: endDate,
                now
            }
        });
    });
    return (
        <>
            {features.map((feature, index) => {
                const isSelected = feature === selectedFeature;
                const isActive = now >= feature.properties.start && now < feature.properties.end;
                return (
                    <TravelLine
                        key={`travel-${index}`}
                        feature={feature}
                        clickable={true}
                        onClick={() => onClick && onClick(feature)}
                        zIndex={zIndexActive && isActive ? zIndexActive : zIndexStart + index}
                    >
                        {isSelected && (
                            <TravelInfoWindow
                                feature={feature}
                                onCloseClick={() => onClose && onClose(feature)} />
                        )}
                    </TravelLine>
                );
            })}
        </>
    );
};