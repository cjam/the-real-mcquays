import classNames from 'classnames';
import { DateTime } from 'luxon';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useAnimation } from '../../utils/useAnimation';
import DayDisplay from './DayDisplay';
import DayInfo from './DayInfo';
import DaySelector from './DaySelector';
import DiaryControls from './DiaryControls';
import './index.scss';
import DiaryMap from './Map';
import _TravelDay, { TravelDays } from './TravelDay';
import Welcome from './Welcome';

export const TravelDay = _TravelDay;

interface NepalTrekPathProps {
    day: number;
    description: 'drive' | 'hike';
}

type NepalTrekGeoJsonProps = { [key in keyof (NepalTrekPathProps)]: string };


interface TravelDiaryProps {
    children?: TravelDays;
    trekStartDate: DateTime;
    onNavigate?: (dayNum: number) => void;
    dayNum?: number;
}

const TravelDiary: React.SFC<TravelDiaryProps> = ({
    children = [],
    trekStartDate,
    onNavigate,
    dayNum = 0
}) => {
    const contentRef = useRef<HTMLElement>();
    const days = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
    const dayProps = useMemo(() => days.map(({ props }) => props), days);
    const percentDayComplete = useAnimation('linear', 10000, 1500, [dayNum], 200);
    const currentDay = dayNum > 0 ? days[Math.min(dayNum - 1, days.length - 1)] : undefined;
    const currentDayProps = currentDay ? currentDay.props : undefined;
    const [fadeOut, setFadeOut] = useState(false);

    const setDay = useCallback((newDay: number) => {
        const constrainedDay = Math.max(0, Math.min(days.length, newDay));
        // Make sure the new day is within range
        if (constrainedDay !== dayNum) {
            setFadeOut(true);
            setTimeout(() => {
                if (contentRef.current) {
                    contentRef.current.scrollTo({ top: 0 });
                }
                if (onNavigate) {
                    onNavigate(constrainedDay);
                }
                // setDayNum(constrainedDay);
                setFadeOut(false);
            }, 400);
        }
    }, [dayNum, setFadeOut, onNavigate, days, contentRef]);

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
                    percentDayComplete={percentDayComplete}
                    pathColor='#042417'
                    currentPathColor='#db5881'
                // currentPathColor='#7daffa'
                />
            </section>
            <section className={classNames('travel-diary-day-info')}>
                {currentDayProps ?
                    <DayInfo day={currentDayProps} trekStartDate={trekStartDate} /> :
                    <h2 style={{ textAlign: 'center', padding: 0, margin: 0, lineHeight: "60px" }}>Welcome!</h2>}
            </section>
            <section className='travel-diary-controls'>
                <DiaryControls
                    onNext={nextDay}
                    onPrevious={previousDay}
                >
                    <DaySelector onSelect={setDay} currentDay={dayNum} days={dayProps} />
                </DiaryControls>
            </section>
            <section ref={contentRef} className={classNames('travel-diary-content', { fadeOut })}>
                {currentDay ? <DayDisplay day={currentDay} /> : <Welcome />}
            </section>
        </div>
    );
};

export default TravelDiary;