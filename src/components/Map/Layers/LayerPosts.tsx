import { graphql, Link } from 'gatsby';
import React from 'react';
import { InfoWindow, InfoWindowProps, Marker, MarkerProps } from 'react-google-maps';
import { dateDisplay } from '../../../utils/datetime';
import { postSymbol } from '../symbols';
import { FeatureLayerComponent } from './Layer';
import './PostFeature.scss';



export const postFeatureFragment = graphql`
    fragment PostFeatureFragment on ContentfulBlogPost{
        location {
        lat
        lng:lon
      }
      title
      slug
      description {
        text: childMarkdownRemark {
          excerpt(format: PLAIN, pruneLength: 100)
        }
      }
      body {
        doc: childMarkdownRemark {
          timeToRead
        }
      }
      publishDate
    }
`;

export interface PostFeature {
    location: {
        lat: number
        lng: number
    };
    title: string;
    slug: string;
    description: {
        text: {
            excerpt: string
        }
    };
    body: {
        doc: {
            timeToRead: number
        }
    };
    publishDate: string;
    // image: {
    //     fixed: FixedObject
    // }
}


export interface PostMarkerProps {
    feature: PostFeature;
}

export const PostMarker: React.SFC<PostMarkerProps & MarkerProps> = ({
    feature,
    children,
    ...restProps
}) => {
    const { location } = feature;
    return (
        <Marker
            position={location}
            {...restProps}
            icon={postSymbol}
        >
            {children}
        </Marker>
    );
};

export const PostInfoWindow: React.SFC<PostMarkerProps & InfoWindowProps> = (
    {
        feature: { title, slug, description = {}, body, publishDate }
        , ...restProps
    }
) => (
        <InfoWindow  {...restProps}>
            <div className='post-feature-info-content'>
                <h3 className='title'>{title}</h3>
                <div className='published'>{dateDisplay(publishDate)}</div>
                <div className='time-to-read'>Time To Read: <span>2 mins</span></div>
                {/* <figure>
                    <Image {...image} />
                </figure> */}
                <div className='excerpt'>
                    {description.text.excerpt}
                </div>

                <Link to={`/blog/${slug}`}>Read More...</Link>
            </div>
        </InfoWindow>
    );

export const PostsLayer: FeatureLayerComponent<PostFeature> = ({ features = [], selectedFeature, onClick, onClose, zIndexStart = 0 }) => {
    return (
        <>
            {features.map((feature, index) => {
                const isSelected = feature === selectedFeature;
                return (
                    <PostMarker
                        key={`post-${index}`}
                        feature={feature}
                        onClick={() => onClick && onClick(feature)}
                        zIndex={zIndexStart + index}
                    >
                        {isSelected && (
                            <PostInfoWindow
                                feature={feature}
                                onCloseClick={() => onClose && onClose(feature)}
                            />
                        )}
                    </PostMarker>
                );
            })}
        </>
    );
};