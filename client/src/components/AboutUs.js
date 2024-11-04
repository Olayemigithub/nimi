import React from 'react';
import '../styles/AboutUs.css'; // Optional: Create and import a CSS file for styles.
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ceoImage from '../assets/ceo.jpg';
import cooimage from '../assets/coo.jpg'

const AboutUs = () => {
  return (
    <div className="container">
     {/* CEO Section */}
      <div id="headlinks2" className="gmd-space text-center my-5">
      <img src={ceoImage} alt="CEO" className="img-fluid rounded-circle mb-3" />
      <div className="ceo">
          <h3>
            Oluwasola Ola Adeyemi <span className="gmd"><i>MBA, MSc, ACA</i></span>
          </h3>
          <p>
            <b>A Social Scientist</b> whose studies and research concentrate on Wealth Creation and Entrepreneurial Science.
            <br />
            <span id="ceo-txt">Co-Founded Nimi, Terrain, and Denlona</span>
          </p>
        </div>
      </div>

      {/* COO Section */}
      <div id="headlinks3" className="coo-space text-center my-5">
      <img src={cooimage} alt="COO" className="img-fluid rounded-circle mb-3" />
        <div className="coo">
          <h3>
            Ifeoluwani Olabisi Adeyemi <span className="coo"><i>M Tech</i></span>
          </h3>
          <p>
            <b>A Tech Scientist</b> whose studies and research concentrate on Sensory Realities and their effects on entrepreneurship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
