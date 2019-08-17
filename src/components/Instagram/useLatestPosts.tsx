import React, { useState, useEffect } from 'react'
import toGeoJson from "@mapbox/togeojson"
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from 'geojson';
const INSTAGRAM_BASE = "https://instagram.com"

const InstagramSharedDataRegex = /window._sharedData\s*=\s*({.*});/g

export interface InstagramPost {
    dimensions: {
        height: number;
        width: number;
    }
    display_url: string;
    thumbnail_url: string;
    caption: string;
    shortcode: string;
}

interface InstagramPostCaption {
    node: {
        text: string
    }
}

interface InstagramPostNode {
    node: {
        accessibility_caption: string;
        dimensions: {
            height: number,
            width: number
        }
        shortcode: string
        display_url: string
        thumbnail_src: string
        edge_media_to_caption: {
            edges: InstagramPostCaption[]
        }
    }
}

interface InstagramProfilePage {
    graphql: {
        user: {
            edge_owner_to_timeline_media: {
                count: number;
                edges: InstagramPostNode[]
            }
        }
    }

}
interface InstagramSharedData {
    entry_data: {
        ProfilePage: InstagramProfilePage[]
    }
}

export default function useLatestPosts(instagramHandle: string): string[] {

    const [postIds, setPostIds] = useState<string[]>([]);

    const loadPosts = async () => {
        try {
            const request = await fetch(`${INSTAGRAM_BASE}/${instagramHandle}`)
            const text = await request.text()
            const htmlDoc = (new DOMParser()).parseFromString(text, "text/html");

            const scriptElements = htmlDoc.querySelectorAll("body script")
            for (let i = 0; i < scriptElements.length; i++) {
                const el = scriptElements[i];

                const matches = InstagramSharedDataRegex.exec(el.innerHTML)
                if (matches) {
                    // The second match will be our capturing group for the json
                    const json = matches[1]
                    const data = JSON.parse(json) as InstagramSharedData;
                    console.log(data);
                    const profilePage = data.entry_data.ProfilePage[0]
                    const posts = profilePage.graphql.user.edge_owner_to_timeline_media.edges.map<InstagramPost>(({ node: { shortcode, dimensions, display_url, thumbnail_src, edge_media_to_caption } }) => ({
                        shortcode,
                        dimensions,
                        display_url,
                        thumbnail_url: thumbnail_src,
                        caption: edge_media_to_caption.edges[0].node.text
                    }))
                    console.log("POSTS",posts);
                }
            }
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