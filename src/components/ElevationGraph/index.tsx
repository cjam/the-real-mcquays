import React, { useState } from 'react';
import useKmlLayer from '../Map/useKmlLayer';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    AreaChart,
    ResponsiveContainer,
    Label,
    ReferenceDot,
    Scatter,
    ReferenceLine
} from 'recharts';
import { Point } from "geojson";
import { fromTicksString } from "../../utils/datetime";
import { useInterval } from "../../utils/useInterval"
import { DateTime, Zone } from 'luxon';


const GOOGLE_API_KEY = process.env.GATSBY_GOOGLE_MAPS_API_KEY;
const EpicAdventureKML = "https://www.google.com/maps/d/kml?forcekml=1&mid=1HFfcjZfpjFxjGKBBA8OCaxkJUuCoKcwW";

const TREKING_LAYER = `${EpicAdventureKML}&lid=2dLX2tb3WVs`

interface GTrekPointProps {
    name: string;
    description: string;
    altitude: string;
    distance: string;
    start: string;
    end: string;
    dayStart: string;
    dayEnd: string;
}

interface TrekPointProps {
    name: string;
    description: string;
    altitude: number;
    distance: number;
    start: DateTime;
    end: DateTime;
    dayStart: number;
    dayEnd: number;
}

const trekStart = DateTime.fromISO("2019-09-05T08:00:00+05:45");
const dayStartHour = 7.0; // Start at 07:00
const dayEndHour = 16.0; // End at 16:00

interface ElevationGraphProps {
    now?: DateTime
}

class CustomizedLabel extends React.PureComponent<any> {
    render() {
        const {
            x, y, stroke, value,
        } = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }
}

const ElevationGraph: React.SFC<ElevationGraphProps> = () => {
    let totalDistance = 0
    const [now, setNow] = useState(DateTime.local());
    useInterval(()=>{
        setNow(DateTime.local())
    },1000*60);
    const features = useKmlLayer<GTrekPointProps, Point, TrekPointProps>(TREKING_LAYER, ({ properties, ...restFeat }) => {
        const { altitude, distance, start, end, dayStart, dayEnd, ...restProps } = properties
        const startDate = fromTicksString(start)
        const endDate = fromTicksString(end)
        totalDistance += parseFloat(distance)
        return ({
            ...restFeat,
            properties: {
                ...restProps,
                altitude: parseFloat(altitude),
                distance: totalDistance,
                start: startDate,
                end: endDate,
                dayStart: parseInt(dayStart),
                dayEnd: parseInt(dayEnd)
            }
        })
    });
    const data = features.map(({ properties: { styleUrl, styleHash, ...restProps } }) => (restProps))
    const destinations = data.filter(({ dayStart, dayEnd }) => dayStart !== dayEnd);

    const nepalNow = now.setZone('UTC+5:45')
    const currentDay = Math.floor(nepalNow.startOf('day').diff(trekStart.startOf('day'), 'days').days) + 1
    const amountDayDone = Math.max(0.0, Math.min(1.0, (nepalNow.hour - dayStartHour) / (dayEndHour - dayStartHour)));

    const todaysPoints = data.filter(({ dayStart, dayEnd }) => dayStart === currentDay || dayEnd === currentDay)
    const todaysDistance = todaysPoints.length > 0 ? todaysPoints[todaysPoints.length - 1].distance - todaysPoints[0].distance : 0;

    let currentPoint: { altitude: number, distance: number } | undefined = undefined;

    if (todaysPoints.length > 1) {
        if (amountDayDone === 1) {
            currentPoint = todaysPoints[todaysPoints.length - 1]
        } else {
            const currentDistance = todaysDistance * amountDayDone + todaysPoints[0].distance;
            const lastPointIndex = todaysPoints.findIndex(({ distance }) => distance > currentDistance);
            const closePoints = [todaysPoints[lastPointIndex - 1], todaysPoints[lastPointIndex]]

            // console.log(closePoints.map(({ name }) => name));
            const slope = (closePoints[1].altitude - closePoints[0].altitude) / (closePoints[1].distance - closePoints[0].distance);
            const altitude = closePoints[0].altitude + slope * (currentDistance - closePoints[0].distance)
            currentPoint = {
                altitude,
                distance: currentDistance
            }
        }
    } else {
        // To handle the rest day
        currentPoint = data.find(({ dayStart, dayEnd }) => currentDay < dayEnd && currentDay > dayStart);
    }

    // const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 600, pv: 3000, amt: 5600 }];
    const chartProps = {
        data,
        margin: { top: 5, right: 20, bottom: 30, left: 0 }
    }
    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart {...chartProps} >
                    <defs>
                        <linearGradient id="colorMountain" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="5%" stopColor="#033dfc" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.6} />
                        </linearGradient>
                    </defs>
                    <XAxis type="number" dataKey="distance" domain={['dataMin', 'dataMax']}
                        ticks={destinations.map(({ distance }) => distance)}>
                        <Label value="Distance (Km)" offset={-10} position="insideBottom" />
                    </XAxis>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    {destinations.map(({ distance, dayStart }) => (
                        <ReferenceLine
                            key={distance}
                            x={distance}
                            stroke="red"
                            strokeDasharray="3 3"
                            strokeWidth={1.5}
                            opacity={.6}
                        >
                            <Label position="insideTop" offset={10} value={`${dayStart}`} />
                        </ReferenceLine>
                    ))}
                    <Area type="monotone" dataKey="altitude" stroke="#8884d8" fillOpacity={1} fill="url(#colorMountain)" />
                    {currentPoint && (
                        <ReferenceDot
                            x={currentPoint.distance}
                            y={currentPoint.altitude}
                            r={5}
                            fill="black"
                            stroke="black"
                            isFront={true}
                            shape={({ x, y, cx, cy, fill, stroke, ...restProps }) => {
                                return (
                                    <g transform={`translate(${cx},${cy})`}>
                                        <g transform="translate(-12.000000,-10.000000) scale(0.003,-0.003)">
                                            <path
                                                stroke={stroke}
                                                strokeWidth="1"
                                                fill={stroke}
                                                d="M5364.2,5009.8c-421.8-57.5-790-385.4-901.2-805.3c-36.4-138.1-36.4-404.6,0-544.5c124.6-479.3,565.6-816.8,1060.3-816.8c289.5,0,563.7,117,770.8,325.9c212.8,212.8,312.5,454.4,312.5,757.4c0,306.8-99.7,550.3-320.2,768.9C6037.2,4944.6,5711.3,5055.9,5364.2,5009.8z" /><path d="M2946.4,2939.1c-99.7-23-197.5-94-245.4-178.3c-49.9-86.3-625.1-2392.9-625.1-2504.1c0-122.7,97.8-278,212.8-337.5C2371.2-125,2948.3-263,3046.1-263c107.4,0,239.7,57.5,297.2,130.4l38.3,49.9l-15.3-151.5c-21.1-216.7-17.3-442.9,11.5-565.6c57.5-241.6,155.3-406.5,868.6-1480.2l425.7-638.5l32.6-699.8c19.2-385.4,44.1-734.4,55.6-778.5c13.4-44.1,53.7-120.8,94-172.6c228.2-303,701.8-268.4,899.2,67.1l51.8,88.2l-3.8,412.2c-1.9,226.3-17.2,632.7-30.7,901.2c-23,410.3-32.6,500.4-65.2,565.6c-19.2,42.2-189.8,322.1-377.7,621.2l-341.3,544.5L5239.6-380c140,544.5,255,991.3,256.9,995.1c3.8,1.9,97.8-149.6,212.8-335.5c113.1-187.9,209-343.2,210.9-345.1c1.9-3.8,276.1-55.6,611.7-118.9c333.6-61.4,609.7-115,613.6-118.9c3.8-3.8-195.6-976-444.8-2160.9c-354.7-1693.1-446.7-2164.7-433.3-2205c9.6-30.7,46-65.2,88.2-86.3c63.3-30.7,76.7-32.6,138.1-5.8c38.3,15.3,76.7,47.9,88.2,72.9c9.6,24.9,216.7,997.1,460.2,2162.8c243.5,1165.8,446.7,2134.1,452.5,2153.2c5.8,19.2,28.8,32.6,57.5,32.6c120.8,0,314.5,164.9,350.9,301c49.8,178.3,13.4,308.7-124.6,442.9L7674.7,504l19.2,82.4c46,199.4-5.8,301-151.5,301c-99.7,0-164.9-74.8-184.1-210.9c-9.6-72.9-21.1-95.9-46-95.9c-28.8,0-703.7,120.8-799.5,143.8c-26.9,5.8-149.6,189.8-410.3,617.4c-316.4,519.6-391.2,628.9-506.2,743.9c-220.5,216.7-467.8,316.4-788,318.3c-272.3,0-414.2-42.2-615.5-184.1c-63.3-46-153.4-134.2-199.4-195.6c-46-61.3-90.1-118.9-97.8-128.5c-7.7-9.6,11.5,82.4,42.2,201.3c30.7,120.8,55.6,264.6,55.6,320.2c0,145.7-74.8,278-195.6,341.3c-51.8,26.8-732.4,201.3-770.8,197.5C3015.4,2954.4,2979,2948.6,2946.4,2939.1z" /><path d="M2710.6-2767.1c-510-1263.6-546.5-1363.3-546.5-1472.6c1.9-264.6,182.2-479.3,448.7-529.2c189.8-36.4,425.7,59.4,531.1,216.7c24.9,34.5,222.4,506.2,442.9,1048.8l398.8,987.5l-258.9,393.1c-141.9,216.7-301,464-354.7,550.3c-53.7,86.3-101.6,157.2-107.4,157.2C3258.9-1413.4,3009.7-2023.2,2710.6-2767.1z" />
                                        </g>
                                    </g>
                                )
                            }}
                        />
                    )}
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
            {/* <input type='range' style={{ width: 400 }} min={0} max={18 * 24} onChange={(e) => setNow(trekStart.plus({ hours: parseInt(e.target.value) }))} width="100%" />
            <span>{now.toISO()}</span>
            <div>{currentDay}</div>
            <div>{amountDayDone}</div>
            <div>{todaysDistance}</div> */}
        </div >
    )
}

export default ElevationGraph;