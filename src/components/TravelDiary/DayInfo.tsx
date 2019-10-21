import React from 'react';
import { TravelDayProps } from './TravelDay';

interface DayInfoProps {
    day: TravelDayProps;
}

const DayInfo: React.SFC<DayInfoProps> = ({ day: { number = 1 } = {} }) => {
    return (
        <>
            <h2>Day {number}</h2>
        </>
    );
};

export default DayInfo;