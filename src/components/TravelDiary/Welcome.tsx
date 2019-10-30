import React from 'react';

interface WelcomeProps {

}

const Welcome : React.SFC<WelcomeProps> = ({}) => {
    return (
        <div>
            <h2>Welcome!</h2>
            <p>This is an interactive map of our trek, built with ♥ by Holly and Colter</p>
            <p>It includes our journal entries for that day along with an animation showing where we traveled on that day</p>
        </div>
    );
};

export default Welcome;