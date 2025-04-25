import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Welcome.css';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';

const Welcome = () => {
  return (
    <div className="welcome-container">

      <h1>
        Welcome to Voluntary Indian Organisations
      </h1>

      <div className="carousel-wrapper">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={1800}
          dynamicHeight={false}
        >
          <div>
            <img src={img1} alt="Slide 1" />
            
          </div>
          <div>
            <img src={img2} alt="Slide 2" />
            
          </div>
          <div>
            <img src={img3} alt="Slide 3" />

          </div>
          <div>
            <img src={img4} alt="Slide 4" />

          </div>
          <div>
            <img src={img5} alt="Slide 5" />

          </div>
          <div>
            <img src={img6} alt="Slide 6" />

          </div>
          <div>
            <img src={img7} alt="Slide 7" />

          </div>
          <div>
            <img src={img8} alt="Slide 8" />

          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Welcome;
