import React, { useState, useEffect } from 'react'
import toGeoJson from "@mapbox/togeojson"
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from 'geojson';
const INSTAGRAM_BASE = "https://instagram.com"

export default function useLatestPosts(instagramHandle: string): string[] {

    const [postIds, setPostIds] = useState<string[]>([]);

    const loadPosts = async () => {
        try {
            const request = await fetch(`${INSTAGRAM_BASE}/${instagramHandle}`)
            const text = await request.text()
            const htmlDoc = (new DOMParser()).parseFromString(text, "text/html");
            const foundPostIds: string[] = []
            console.log(htmlDoc)
            htmlDoc.querySelectorAll<HTMLLinkElement>("article a").forEach((link)=>{
                foundPostIds.push(link.href)
            });
            
            console.log(foundPostIds);

        } catch (err) {
            console.error(err);
        }
    }

    // Load the map data on mount
    useEffect(() => {
        loadPosts()
    }, [])

    return postIds;

}