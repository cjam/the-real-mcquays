import React from 'react';
import styles from './DiaryControls.module.scss';

interface DiaryControlsProps {
    onPrevious?: () => void;
    onNext?: () => void;
    dayPercentComplete?: number;
}

const DiaryControls: React.SFC<DiaryControlsProps> = ({
    onPrevious,
    onNext,
    dayPercentComplete = 0
}) => {

    function handlePrevious() {
        if (onPrevious) {
            onPrevious();
        }
    }

    function handleNext() {
        if (onNext) {
            onNext();
        }
    }

    return (
        <div className={styles.controls} >
            <button onClick={handlePrevious}>Previous</button>
            {/* <input style={{flex:1}} type='range' /> */}
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default DiaryControls;