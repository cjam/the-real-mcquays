import React from 'react';
import { TravelDayProps } from './TravelDay';

interface DayDisplayProps {
    day: React.ReactElement<TravelDayProps>;
}

const DayDisplay: React.SFC<DayDisplayProps> = ({ day }) => {
    return day;
};

export default DayDisplay;