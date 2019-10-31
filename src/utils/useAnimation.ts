import { useEffect, useState } from 'react';

// Hook 
export function useAnimation(
    easingName: 'linear' | 'elastic' | 'inExpo' = 'linear',
    duration = 500,
    delay = 0,
    deps?: any[],
    interval?: number
) {
    // The useAnimationTimer hook calls useState every animation frame ...
    // ... giving us elapsed time and causing a rerender as frequently ...
    // ... as possible for a smooth animation.
    const elapsed = interval ? useIntervalTimer(interval, duration, delay, deps) : useAnimationTimer(duration, delay, deps);
    // Amount of specified duration elapsed on a scale from 0 - 1
    const n = Math.min(1, elapsed / duration);
    // Return altered value based on our specified easing function
    return easing[easingName](n);
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
    linear: (n: number) => n,
    elastic: (n: number) =>
        n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
    inExpo: (n: number) => Math.pow(2, 10 * (n - 1))
};


function useIntervalTimer(interval = 500, duration = 1000, delay = 0, deps: any[] = []) {
    const [elapsed, setTime] = useState(0);

    useEffect(
        () => {
            let intervalId: any;
            let timerStop: any;
            let start: number;

            // Function to be executed on each animation frame
            function onFrame() {
                setTime(Date.now() - start);
            }

            function onStart() {
                // Set a timeout to stop things when duration time elapses
                timerStop = setTimeout(() => {
                    clearInterval(intervalId);
                    onFrame();
                }, duration);

                // Start the loop
                start = Date.now();
                intervalId = setInterval(onFrame, interval);
            }

            setTime(0);
            // Start after specified delay (defaults to 0)
            const timerDelay = setTimeout(onStart, delay);

            // Clean things up
            return () => {
                clearTimeout(timerStop);
                clearTimeout(timerDelay);
                clearInterval(intervalId);
            };
        },
        [interval, duration, delay, ...deps] // Only re-run effect if duration or delay changes
    );

    return elapsed;
}


function useAnimationTimer(duration = 1000, delay = 0, deps: any[] = []) {
    const [elapsed, setTime] = useState(0);

    useEffect(
        () => {
            let animationFrame: number;
            let timerStop: any;
            let start: number;

            // Function to be executed on each animation frame
            function onFrame() {
                setTime(Date.now() - start);
                loop();
            }

            // Call onFrame() on next animation frame
            function loop() {
                animationFrame = requestAnimationFrame(onFrame);
            }

            function onStart() {
                // Set a timeout to stop things when duration time elapses
                timerStop = setTimeout(() => {
                    cancelAnimationFrame(animationFrame);
                    setTime(Date.now() - start);
                }, duration);

                // Start the loop
                start = Date.now();
                loop();
            }

            setTime(0);
            // Start after specified delay (defaults to 0)
            const timerDelay = setTimeout(onStart, delay);

            // Clean things up
            return () => {
                clearTimeout(timerStop);
                clearTimeout(timerDelay);
                cancelAnimationFrame(animationFrame);
            };
        },
        [duration, delay, ...deps] // Only re-run effect if duration or delay changes
    );

    return elapsed;
}