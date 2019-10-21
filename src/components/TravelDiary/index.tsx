import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Map, { LatLng } from '../Map';
import { NEPAL_TREK_PATH_LAYER } from '../Map/constants';
import useKmlLayer from '../Map/useKmlLayer';
import DayInfo from './DayInfo';
import './index.scss';
import _TravelDay, { TravelDayProps, TravelDays } from './TravelDay';
import { LineString } from 'geojson';
import { Polyline, GoogleMap, Marker } from 'react-google-maps';
import { hikerIcon, jeepIcon } from '../Map/symbols';


export const TravelDay = _TravelDay;

interface NepalTrekPathProps {
    day: number;
    description: 'drive' | 'hike';
}

type NepalTrekGeoJsonProps = { [key in keyof (NepalTrekPathProps)]: string };


interface TravelDiaryProps {
    children?: TravelDays;
    dayStart?: number;
    dayEnd?: number;
}

const TravelDiary: React.SFC<TravelDiaryProps> = ({ children = [], dayStart = 7, dayEnd = 14 }) => {
    const contentEl = useRef<HTMLDivElement | undefined>(undefined);
    const mapRef = useRef<GoogleMap>(null);
    const days = (Array.isArray(children) ? children : [children]);

    // Get the paths information from the google map service
    const paths = useKmlLayer<NepalTrekGeoJsonProps, LineString, NepalTrekPathProps>(NEPAL_TREK_PATH_LAYER, (f, fIndex) => {
        const { properties, geometry, ...rest } = f;
        return ({
            id: fIndex,
            path: geometry.coordinates.map(([lng, lat]) => ({ lat, lng })),
            properties: {
                ...properties,
                day: parseInt(properties.day, 10)
            }
        });
    }) as Array<{ id: number, path: LatLng[], properties: NepalTrekPathProps }>;

    const [now, setNow] = useState({
        day: 1,
        percent: 0
    });
    const currentDay = days[now.day - 1].props;

    const linesPerDay = 24;

    const handleScroll = (ev: Event) => {
        if (ev.target) {
            const contentDiv: HTMLDivElement = ev.target;
            const { scrollTop, scrollHeight, clientHeight } = contentDiv;
            const percentScrolled = Math.min(1, Math.max(0, (scrollTop) / (scrollHeight - clientHeight)));
            const rawDay = days.length * percentScrolled + 1;
            const day = Math.min(days.length, Math.floor(rawDay));
            const percent = rawDay - day;
            setNow({
                day,
                percent
            });
        }
    };

    useEffect(() => {
        if (contentEl.current) {
            contentEl.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (contentEl.current) {
                contentEl.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [contentEl.current]);

    let currentPoint: LatLng | undefined;
    if (paths && paths.length > 0) {
        const currentPath = paths[now.day - 1].path;
        currentPoint = currentPath[Math.max(0, Math.floor(currentPath.length * now.percent) - 1)];
    }

    if (mapRef.current && currentPoint) {
        mapRef.current.panTo(currentPoint);
    }
    return (
        <div className='travel-diary'>
            <section className='travel-diary-map' style={{
                background: 'green'
            }}>
                <Map
                    defaultZoom={9}
                    zoomControl={true}
                    gestureHandling='none'
                    mapTypeId='terrain'
                    ref={mapRef}
                >
                    <>
                        {Array.isArray(paths) && paths.map(({ id, path, properties: { description, day = -1 } }) => {
                            console.log(now.percent);
                            const isCurrent = day === now.day;
                            const isDrive = description === 'drive';
                            const strokeColor = isCurrent ? "yellow" : (
                                isDrive ? 'red' : 'purple'
                            );
                            const icon = isDrive ? jeepIcon : hikerIcon;
                            const icons = [];
                            if (isCurrent) {
                                icons.push({
                                    icon:{
                                        ...icon,
                                        strokeWeight:0,
                                        fillColor:'red'
                                    },
                                    offset: `${now.percent*100}%`,
                                    fixedRotation: true
                                });
                            }
                            return (
                                <Polyline
                                    key={id}
                                    path={path}
                                    options={{
                                        strokeColor,
                                        strokeWeight: 4,
                                        strokeOpacity: 0.9,
                                        fillColor:strokeColor,
                                        fillOpacity:0.6,
                                        icons
                                    }}
                                />
                            );
                        })}
                        {/* <Marker
                            position={currentPoint}
                        /> */}
                    </>
                </Map>

            </section>
            <section className='travel-diary-day-info'>
                <DayInfo day={currentDay} />
            </section>
            <section className='travel-diary-content' ref={contentEl}>
                <div style={{
                    lineHeight: '2ex',
                    height: `${(days.length + 1) * linesPerDay * 2}ex`,
                }}>
                    {React.Children.map(days, (day) =>
                        React.cloneElement(day,
                            {
                                ...day.props,
                                isActive: day.props.number === now.day
                            }
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default TravelDiary;