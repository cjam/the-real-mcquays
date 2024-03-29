import React from 'react';
import styles from './DiaryControls.module.scss';

interface DiaryControlsProps {
    onPrevious?: () => void;
    onNext?: () => void;
}


const DiaryControls: React.SFC<DiaryControlsProps> = ({
    onPrevious,
    onNext,
    children
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
            {children}
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default DiaryControls;