import React from 'react';

function About(props) {

    const styles = {
        logo: {
            background: 'url("../assets/image/about-header.jpg") no-repeat center',
            backgroundSize: 'cover',
            height: '100px',
        },
        title: {
            padding: '20px 34px 0px 34px',
            fontFamily: 'sans-serif',
            fontSize: '24px',
            color: '#880E4F',
        },
        content: {
            fontFamily: 'sans-serif',
            fontSize: '14px',
            margin: '0px 34px 34px 34px', 
        }
    };

    return (
        <div>

            <div style={styles.logo} >
            </div>

            <div style={styles.title} >About Us</div>

            <div style={styles.content}>
                <p>Safe-Fire, Inc. is a worldwide provider of innovative and high-quality combustion products that address your most difficult engineering and logistical challenges. We specialize in advanced technologies for flame detection and trouble-free ignition.</p>
                <p><strong>A quality experience end to end.&nbsp;</strong></p>
                <p>We partner with you to ensure your ongoing success. Our experienced team of engineers design advanced solutions that are reliable, easy to use, and most importantly, safe. From the initial design stages, through on-site testing and installation, and finally, with direct support and assistance; everything we do is dedicated to achieving your complete satisfaction.</p>
                <p><strong>Access to the latest products and solutions.</strong></p>
                <p>Safe-Fire’s dedication to research and development keeps us at the forefront of new ideas and products that add value and save energy. We expand our line of products every few years to maintain a position of leadership within the global market and better serve your evolving needs. &nbsp; At Safe-Fire, safe combustion is more than just our specialty—it is our passion.</p>

            </div>
        </div>
    )
}

{/*<img src={styles.logo} />*/ }

export default About;