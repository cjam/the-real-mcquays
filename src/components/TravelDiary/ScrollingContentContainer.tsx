import React, { useEffect, useRef, useState } from 'react';
import { TravelDayProps } from './TravelDay';

interface ContentContainerProps {
    currentDay?: number;
    percentDayComplete?: number;
    days: Array<React.ReactElement<TravelDayProps>>;
    onNowChanged?: (now: { day: number, percentDayComplete: number }) => void;
}

const ContentContainer: React.SFC<ContentContainerProps> = ({
    days = [],
    onNowChanged,
    currentDay = 1,
    percentDayComplete = 0
}) => {
    const contentEl = useRef<HTMLDivElement | undefined>(undefined);
    const linesPerDay = 24;

    const handleScroll = (ev: Event) => {
        if (ev.target) {
            const contentDiv: HTMLDivElement = ev.target;
            const { scrollTop, scrollHeight, clientHeight } = contentDiv;
            const percentScrolled = Math.min(1, Math.max(0, (scrollTop) / (scrollHeight - clientHeight)));
            const rawDay = days.length * percentScrolled + 1;
            const day = Math.min(days.length, Math.floor(rawDay));
            const percent = rawDay - day;

            if (onNowChanged) {
                onNowChanged({ day, percentDayComplete: percent });
            }
        }
    };

    useEffect(() => {
        if (contentEl.current) {
            contentEl.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (contentEl.current) {
                contentEl.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [contentEl.current]);

    return (
        <div style={{ overflowY: 'scroll', height: '100%' }} ref={contentEl}>
            <div style={{
                lineHeight: '2ex',
                height: `${(days.length + 1) * linesPerDay * 2}ex`,
            }}>
                {React.Children.map(days, (day) =>
                    React.cloneElement(day,
                        {
                            ref:(el)=>console.log(day,el),
                            ...day.props,
                            isActive: day.props.number === currentDay,
                        }
                    )
                )}
            </div>
        </div>
    );
};

export default ContentContainer;