import React from 'react';

interface WelcomeProps {

}

const Welcome : React.SFC<WelcomeProps> = ({}) => {
    return (
        <div>
            <p>This is an interactive map of our trek around the Annapurna circuit, built with ♥ by Holly and Colter.</p>
            <p>It includes our journal entries for each of the 18 days along with an animation showing where we hiked on that day.</p>
            <section className='holly'>
                <p>Holly's journal entries will appear this color next to them.</p>
            </section>
            <section className='colter'>
                <p>Colter's journal entries will appear this color next to them.</p>
            </section>
        </div>
    );
};

export default Welcome;