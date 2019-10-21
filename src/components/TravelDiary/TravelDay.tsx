import React from 'react';
import classNames from 'classnames';

export interface TravelDayProps {
    number: number;
    isActive?: boolean;
}

export type TravelDays = React.ReactElement<TravelDayProps> | Array<React.ReactElement<TravelDayProps>>;

const TravelDay: React.SFC<TravelDayProps> = ({ number, children, isActive = false }) => {
    return (
        <div className={classNames("travel-diary-day", { isActive })}>
            {/* <h2>Day {number}</h2> */}
            {children}
        </div>
    );
};

export default TravelDay;