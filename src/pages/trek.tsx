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
            <TravelDay number={1}>
              <section className="holly">
                Holly Text
              </section>
              <section className="colter">
                Colter Text
              </section>
            </TravelDay>
            <TravelDay number={2}>
              <div style={{ height: 850, background: "lightgray" }}>
                Some stuff
                </div>
            </TravelDay>
            <TravelDay number={3}>
              <div style={{ height: 150, background: "lightgray" }}>
                Some stuff
              </div>
              <div style={{ height: 250, background: "pink" }}>
                More stuff
              </div>
              <div style={{ height: 50, background: "lightgreen" }}>
                Some stuff
              </div>
              <div style={{ height: 450, background: "lightgray" }}>
                More stuff
              </div>
            </TravelDay>
            {/* <TravelDay number={3}/>
            <TravelDay number={4}/>
            <TravelDay number={5}/> */}
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

