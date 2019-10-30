import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useAnimation } from '../../utils/useAnimation';
import DayDisplay from './DayDisplay';
import DayInfo from './DayInfo';
import DiaryControls from './DiaryControls';
import './index.scss';
import DiaryMap from './Map';
import _TravelDay, { TravelDayProps, TravelDays } from './TravelDay';
import Welcome from './Welcome';

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
    const days = (Array.isArray(children) ? children : [children]);
    const [dayNum, setDayNum] = useState(0);
    const percentDayComplete = useAnimation('linear', 10000, 1000, [dayNum], 200);
    const currentDay = dayNum > 0 ? days[dayNum - 1].props : undefined;

    function setDay(newDay: number) {
        // Make sure the new day is within range
        setDayNum(Math.max(0, Math.min(days.length, newDay)));
    }

    function nextDay() {
        setDay(dayNum + 1);
    }

    function previousDay() {
        setDay(dayNum - 1);
    }

    return (
        <div className='travel-diary'>
            <section className='travel-diary-map'>
                <DiaryMap
                    currentDay={dayNum}
                    percentDayComplete={percentDayComplete} />
            </section>
            <section className='travel-diary-day-info'>
                {currentDay && <DayInfo day={currentDay} />}
            </section>
            <section className='travel-diary-controls'>
                <DiaryControls
                    onNext={nextDay}
                    onPrevious={previousDay}
                />
            </section>
            <section className='travel-diary-content'>
                { currentDay ? (
                    <DayDisplay
                    // days={days}
                    // onNowChanged={setNow}
                    // currentDay={dayNum}
                    />
                )
                : (
                    <Welcome/>
                )}
            </section>
        </div>
    );
};

export default TravelDiary;