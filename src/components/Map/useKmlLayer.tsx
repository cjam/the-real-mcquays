import toGeoJson from '@mapbox/togeojson';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect, useState } from 'react';

export default function useKmlLayer<P extends GeoJsonProperties, G extends Geometry = Geometry, U = P>(url: string, processFeature?: (f: Feature<G, P>, index?: number) => Feature<G, U>): Array<Feature<G, U>> {

    const [layerData, setLayerData] = useState<Array<Feature<G, U>>>([]);

    const loadLayerData = async () => {
        try {
            const kmlRequest = await fetch(url);
            const kmlText = await kmlRequest.text();
            const kml = (new DOMParser()).parseFromString(kmlText, 'text/xml');
            const geoJson = toGeoJson.kml(kml) as FeatureCollection<G, P>;
            const { features = [] } = geoJson;

            if (processFeature !== undefined) {
                setLayerData(features.map(processFeature));
            } else {
                setLayerData(features as unknown as Array<Feature<G, U>>);
            }

        } catch (err) {
            console.error(err);
        }
    };

    // Load the map data on mount
    useEffect(() => {
        if (layerData.length === 0) {
            loadLayerData();
        }
    }, []);

    return layerData;

}