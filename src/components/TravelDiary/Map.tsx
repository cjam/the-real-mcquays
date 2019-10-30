import { LineString } from 'geojson';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { GoogleMap, Marker, Polyline } from 'react-google-maps';
import Map, { LatLng } from '../Map';
import { NEPAL_TREK_PATH_LAYER } from '../Map/constants';
import { hikerIcon, jeepIcon } from '../Map/symbols';
import useKmlLayer from '../Map/useKmlLayer';
import { getBoundingBox } from 'geolocation-utils';
import { usePrevious } from '../../utils/usePrevious';

type GBoundsLiteral = { south: number, north: number, east: number, west: number }

interface DiaryMapProps {
    currentDay?: number;
    percentDayComplete?: number;
}

interface NepalTrekPathProps {
    day: number;
    description: 'drive' | 'hike';
}

type NepalTrekGeoJsonProps = { [key in keyof (NepalTrekPathProps)]: string };

const DiaryMap: React.SFC<DiaryMapProps> = ({ currentDay = 1, percentDayComplete = 0 }) => {
    const mapRef = useRef<GoogleMap>(null);

    // Get the paths information from the google map service
    const paths = (useKmlLayer<NepalTrekGeoJsonProps, LineString, NepalTrekPathProps>(NEPAL_TREK_PATH_LAYER, (f, fIndex) => {
        const { properties, geometry, ...rest } = f;
        return ({
            id: fIndex,
            path: geometry.coordinates.map(([lng, lat]) => ({ lat, lng })),
            properties: {
                ...properties,
                day: parseInt(properties.day, 10)
            }
        });
    }) as Array<{ id: number, path: LatLng[], properties: NepalTrekPathProps }>)
        .sort(({ properties: propA }, { properties: propB }) => propA.day - propB.day);

    const previousDay = usePrevious(currentDay);

    const currentLine = paths ? paths[currentDay - 1] : undefined;
    const currentlyDriving = currentLine && currentLine.properties.description === 'drive';

    let currentPoint: LatLng | undefined;

    if (currentLine) {
        const currentPath = currentLine.path;
        const currentPointIndex = previousDay !== currentDay ? 0 : Math.floor(currentPath.length * percentDayComplete) - 1;
        currentPoint = currentPath[Math.max(0, currentPointIndex)];
    }

    const pathBounds = useMemo(() => {
        if (currentLine && currentLine.path) {
            const {
                bottomRight: { lng: east, lat: south },
                topLeft: { lng: west, lat: north }
            } = getBoundingBox(currentLine.path, 0);
            return { east, west, north, south };
        } else {
            return { east: 0, west: 0, north: 0, south: 0 };
        }
    }, [currentLine]);

    if (mapRef.current) {
        mapRef.current.fitBounds(pathBounds);
    }


    return (
        <Map
            defaultZoom={12}
            mapTypeId='terrain'
            ref={mapRef}
        >
            <>
                {Array.isArray(paths) && paths.map(({ id, path, properties: { description, day = -1 } }) => {
                    const isCurrent = day === currentDay;
                    const isDrive = description === 'drive';
                    const strokeColor = isCurrent ? 'yellow' : (
                        isDrive ? 'red' : 'purple'
                    );
                    return (
                        <Polyline
                            key={id}
                            path={path}
                            options={{
                                strokeColor,
                                strokeWeight: 4,
                                strokeOpacity: 0.9,
                            }}
                        />
                    );
                })}
                <Marker
                    position={currentPoint}
                    icon={currentlyDriving ? jeepIcon : hikerIcon}
                    options={{
                        optimized: false,
                    }}
                />
            </>
        </Map>
    );
};


export default DiaryMap;
