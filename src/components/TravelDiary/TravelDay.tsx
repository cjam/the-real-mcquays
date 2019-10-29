import React, { useRef } from 'react';
import classNames from 'classnames';

export interface TravelDayProps {
    number: number;
    isActive?: boolean;
    percentDone?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    distance?: number;
    stairFlights?: {
        up: number;
        down: number;
    };
    start?: {
        name: string;
        elevation: number;
    };
    end?: {
        name: string;
        elevation: number;
    };
}

export type TravelDays = React.ReactElement<TravelDayProps> | Array<React.ReactElement<TravelDayProps>>;

const TravelDay: React.SFC<TravelDayProps> = ({ number, children, isActive = false, percentDone = 0 }) => {
    const dayRef = useRef<HTMLDivElement>(null);
    console.log(dayRef);
    return (
        <div
            ref={dayRef}
            className={classNames('travel-diary-day', { isActive })}
            style={{
                top: `-${percentDone*100}%`
            }}
        >
            <h2>{percentDone}</h2>
            {/* <h2>Day {number}</h2> */}
            {children}
        </div>
    );
};

export default TravelDay;