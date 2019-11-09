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

const TravelDay: React.SFC<TravelDayProps> = ({children}) => {
    return (
        <div
            className={classNames('travel-diary-day')}
        >
            {children}
        </div>
    );
};

export default TravelDay;