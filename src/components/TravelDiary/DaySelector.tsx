import React, { useMemo, useCallback } from 'react';
import { TravelDayProps } from './TravelDay';

interface DaySelectorProps {
    currentDay: number;
    days?: TravelDayProps[];
    onSelect?: (dayNum: number) => void;
}

const DaySelector: React.SFC<DaySelectorProps> = ({ currentDay = 0, days = [], onSelect }) => {
    if (days.length === 0) {
        return null;
    }

    const onChangeCallback = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
        const val = parseInt(ev.target.value, 10);
        if (onSelect) {
            onSelect(val);
        }
    },[onSelect]);

    return (
        <select value={currentDay} onChange={onChangeCallback}>
            <option key={0} value={0}>Welcome</option>
            {days.map(({ number: num }) => (
                <option key={num} value={num}>Day {num}</option>
            ))}
        </select>
    );
};

export default DaySelector;