import React from 'react';
import { TravelDayProps } from './TravelDay';
import './DayInfo.scss';

interface DayInfoProps {
    day: TravelDayProps;
}


const DataDisplay: React.SFC<{
    label: React.ReactNode,
    value: number | string,
    title?: string
}> = ({ label, value, title }) => {
    return (
        <div className="dataDisplay" title={title}>
            {label && <span>{label}</span>}
            <span>{value}</span>
        </div>
    );
};

const DayInfo: React.SFC<DayInfoProps> = ({
    day: {
        number = 1,
        difficulty = 'Easy',
        distance = 0,
        stairFlights = {
            up: 0,
            down: 0
        },
        start = {
            name: 'start',
            elevation: 0
        },
        end = {
            name: 'end',
            elevation: 0
        }
    } = {}
}) => {
    return (
        <div className='dayInfo'>
            <div className="title">
                <h2>Day {number}</h2>
                <DataDisplay
                    label={null}
                    value={`${start.name} (${start.elevation} m) ➡️ ${end.name} (${end.elevation} m)`}
                />
            </div>
            <div className='stats'>
                <DataDisplay
                    label={null}
                    value={difficulty}
                    title={`${difficulty} day`}
                />
                <DataDisplay
                    label={'Distance'}
                    value={`${distance} Km`}
                    title={`${distance} Km`}
                />
                <DataDisplay
                    label={'Stairs (flights)'}
                    value={`${stairFlights.up} ⬆️ ${stairFlights.down} ⬆️`}
                    title={`${stairFlights.up} flights up, ${stairFlights.down} flights down`}
                />
            </div>
        </div>
    );
};

export default DayInfo;