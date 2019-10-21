import { Feature } from 'geojson';

export function kmlCordinatesToLatLng([]:)=> ({

})

export function kmlFeatureToGMap<T extends Feature>(feature:T) {
    
    return ({
        properties:feature.properties,

    })
}