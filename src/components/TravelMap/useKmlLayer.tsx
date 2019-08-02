import React, { useState, useEffect } from 'react'
import toGeoJson from "@mapbox/togeojson"
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from 'geojson';

export default function useKmlLayer<P extends GeoJsonProperties, G extends Geometry = Geometry, U = P>(url: string, processFeature?: (f: Feature<G, P>) => Feature<G, U>): Array<Feature<G, U>> {

    const [layerData, setLayerData] = useState<Array<Feature<G, U>>>([]);

    const loadLayerData = async () => {
        try {
            const kmlRequest = await fetch(url)
            const kmlText = await kmlRequest.text()
            const kml = (new DOMParser()).parseFromString(kmlText, "text/xml");
            const geoJson = toGeoJson.kml(kml) as FeatureCollection<G, P>;
            const { features = [] } = geoJson;

            if (processFeature != undefined) {
                setLayerData(features.map(processFeature))
            } else {
                setLayerData(features as unknown as Array<Feature<G, U>>);
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    // Load the map data on mount
    useEffect(() => {
        loadLayerData()
    }, [])

    return layerData;

}