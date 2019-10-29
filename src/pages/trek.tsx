import { graphql, Link } from 'gatsby';
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image';
import { get } from 'lodash';
import * as React from 'react';
import { ArticlePreviewProps } from '../components/ArticlePreview';
import ArticlePreviewList from '../components/ArticlePreviewList';
import AuthorCard from '../components/AuthorCard';
import Container from '../components/Container';
import ElevationGraph from '../components/ElevationGraph';
import Hero from '../components/Hero';
import TravelDiary, { TravelDay } from '../components/TravelDiary';
import { days } from '../content/nepal-trek';
import Layout from '../layouts';
import './index.scss';


export default class TrekPage extends React.Component {
  public render() {
    return (
      <Layout
        seo={{
          path: '/trek',
          description: 'Trek Dashboard',
          title: 'Trek Dashboard',
        }}
      >
        <Container style={{
          display: 'flex',
          flexDirection: 'column'
        }}
          contstrain={true}
        >
          {/* <center>
            <h3>Trek Dashboard</h3>
          </center> */}
          {/* <ElevationGraph /> */}
          <TravelDiary>
            {days}
          </TravelDiary>
          {/* <div className='subtle'>
            <p>
              This dashboard was happily hacked together by Colter and may have some bugs as he had a trek to go on.
            If left open, the dashboard should update itself with our approximate where-abouts every minute.  🤞that it works.
            </p>
            <p>The vertical axis is Elevation in meters, the horizontal is distance in Km and the red lines are the approximate deliniation for each day.</p>
            <p>Enjoy 😊 and Namaste 🙏</p>
          </div> */}
        </Container>
      </Layout>
    );
  }
}

