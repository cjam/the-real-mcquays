
declare module 'simplify-js'{

    interface Point {
        x: number;
        y: number;
    }

    export function simplify (points: Point[], tolerance?: number, highQuality?: boolean): Point[];
}
