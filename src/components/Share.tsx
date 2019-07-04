import * as React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,

  LinkedinShareButton,
  LinkedinIcon,
  LinkedinShareCount,

  TwitterShareButton,
  TwitterIcon,

  WhatsappShareButton,
  WhatsappIcon,

  RedditShareButton,
  RedditIcon,
  RedditShareCount,

  PinterestShareButton,
  PinterestIcon,
  PinterestShareCount,

  PocketShareButton,
  PocketIcon,

  EmailShareButton,
  EmailIcon

} from "react-share";

import "./Share.scss";
import { useStaticQuery, graphql } from "gatsby";

interface ShareProps {
  path: string;
  title: string;
  description: string;
  image: string;
  hashTag?: string;
}

const query = graphql`
  query{
    site{
      siteMetadata{
        siteUrl
        pathPrefix
      }
    } 
  }
`

const Share: React.SFC<ShareProps> = ({
  path,
  title,
  description,
  image,
  hashTag = "TheRealMcQuays"
}) => {
  const { site: { siteMetadata } } = useStaticQuery(query);
  const { siteUrl, pathPrefix } = siteMetadata;
  const url = `${siteUrl}${pathPrefix}${path}`;
  return (
    <div className="social-sharing">
        <FacebookShareButton
          url={url}
          quote={title}
          hashtag={`#${hashTag}`}
        >
          <FacebookIcon size={32} />
          <FacebookShareCount url={url} />
        </FacebookShareButton>

        <TwitterShareButton
          url={url}
          title={title}
          hashtags={[hashTag]}
        >
          <TwitterIcon size={32} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={url}
          title={title}
          separator=":: "
        >
          <WhatsappIcon size={32} />
        </WhatsappShareButton>

        <PocketShareButton url={url} title={title}>
          <PocketIcon size={32}/>
        </PocketShareButton>

        <PinterestShareButton
          url={url}
          media={image}
          description={description}
          windowWidth={1000}
          windowHeight={730}
        >
          <PinterestIcon size={32} />
          <PinterestShareCount url={url} />
        </PinterestShareButton>

        <RedditShareButton
          url={url}
          title={title}
          windowWidth={660}
          windowHeight={460}
        >
          <RedditIcon size={32} />
          <RedditShareCount url={url} />
        </RedditShareButton>

        <LinkedinShareButton
          url={url}
          windowWidth={750}
          windowHeight={600}>
          <LinkedinIcon
            size={32}
          />
        </LinkedinShareButton>

        <EmailShareButton
          url={url}
          subject={`The Real McQuays: ${title}`}
          separator={"\n\n"}
          openWindow={true}
          body={`Description: \n${description}`}
        >
          <EmailIcon
            size={32}
          />
        </EmailShareButton>

    </div>
  );
};

export default Share;