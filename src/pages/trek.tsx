import { graphql, Link } from 'gatsby';
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image';
import { get } from 'lodash';
import { Router, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import Container from '../components/Container';
import TravelDiary, { TravelDay } from '../components/TravelDiary';
import { days } from '../content/nepal-trek';
import Layout from '../layouts';
import './index.scss';
import { DateTime } from 'luxon';
import './trek.scss';

const trekStartDate = DateTime.fromISO('2019-09-05T08:00:00+05:45');

interface TrekRouteProps {
  dayNum?: string;
}

export const TrekRoute: React.SFC<RouteComponentProps<TrekRouteProps>> = ({ dayNum = 0, navigate }) => {
  const navigateCallback = React.useCallback((newDayNum: number) => {
    if (navigate) {
      navigate(`/trek${newDayNum > 0 ? `/${newDayNum}` : ''}`);
    }
  }, [navigate]);
  return (
    <Layout
      seo={{
        path: '/trek',
        description: 'Interactive Nepal Treking Map',
        title: 'Trekking Journal',
      }}
    >
      <Container className='trekContainer' contstrain={true} >
        <TravelDiary
          trekStartDate={trekStartDate}
          onNavigate={navigateCallback}
          dayNum={parseInt(`${dayNum}`,10)}
          >
          {days}
        </TravelDiary>
      </Container>
    </Layout>
  );
};


export default class TrekPage extends React.Component {
  public render() {
    return (
      <Router>
        <TrekRoute path='/trek' />
        <TrekRoute path='/trek/:dayNum' />
      </Router>
    );
  }
}

