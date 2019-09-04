import React from "react";
import { DateTime } from "luxon";

interface TimeSliderProps {
    style?: React.CSSProperties;
    onChange?: (dateTime: DateTime) => void;
    startDate: DateTime;
    daysAfter: number;
    daysBefore: number;
}

const TimeSlider: React.SFC<TimeSliderProps> = ({ style, daysBefore = 0, daysAfter = 1, startDate = DateTime.local(), onChange }) => {
    return (
        <input type='range'
            style={style}
            min={-daysBefore * 24}
            max={daysAfter * 24}
            onChange={(e) => onChange && onChange(startDate.plus({ hours: parseInt(e.target.value) }))}
        />
    )
}

export default TimeSlider;