import classNames from 'classnames';
import React from 'react';
import './DayInfo.scss';
import { TravelDayProps } from './TravelDay';
import stairsUpSvg from '../../assets/stairs-up.svg';
import stairsDownSvg from '../../assets/stairs-down.svg';
import arrowRightSvg from '../../assets/arrow-right.svg';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

interface DayInfoProps {
    day: TravelDayProps;
    trekStartDate: DateTime;
}

const DataDisplay: React.SFC<{
    label: React.ReactNode,
    value: number | string,
    title?: string,
    className?: string;
}> = ({ label, value, title, className }) => {
    return (
        <div className={classNames('dataDisplay', className)} title={title}>
            {label && <span>{label}</span>}
            <span>{value}</span>
        </div>
    );
};

const DayInfo: React.SFC<DayInfoProps> = ({
    trekStartDate,
    day: {
        number = 1,
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
            <h2 className='title'>Day {number}</h2>
            <span className='date'>{trekStartDate.plus({ day: number }).toFormat('DDD')}</span>
            <div className='start'>
                <div className='placeName'>{start.name}</div>
                <div className='elevation' >{start.elevation} m</div>
            </div>
            <div className='end'>
                <div className='placeName'>{end.name}</div>
                <div className='elevation'>{end.elevation} m</div>
            </div>
            <div className='distance'>
                <div><img src={arrowRightSvg} style={{ verticalAlign: 'middle', width: '90%' }} /></div>
                <div>{distance} km</div>
            </div>
            <div className='stairs'>
                <div>
                    <img src={stairsUpSvg} />
                    <div>{stairFlights.up}</div>
                </div>
                <div>
                    <img src={stairsDownSvg} />
                    <div>{stairFlights.down}</div>
                </div>
            </div>
        </div>
    );
};

export default DayInfo;