import { DateTime } from "luxon";

export interface LayerProps<T> {
    selectedFeature: any
    onClick?: (feature: T) => void
    onClose?: (feature: T) => void
    zIndexStart?:number
    zIndexActive?:number
}

export type KmlLayerComponent<T> = React.FunctionComponent<LayerProps<T> & { url: string }>
export type FeatureLayerComponent<T> = React.FunctionComponent<LayerProps<T> & { features: T[] }>
