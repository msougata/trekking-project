import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="aboutus-wrapper py-5">
      <div className="container">
        <div className="heading" ><h2 className="text-center mb-4">Know us better</h2><br /><br /></div>

        {/* How It Started */}
        <section className="section mb-5">
          <h3 className="section-heading">How It Started</h3>
          <p>
            Our journey began with a vision — to create a vibrant platform where students can connect,
            collaborate, and communicate beyond the classroom. From a dorm-room idea, we’ve grown into a thriving student community.
          </p>
        </section>

        {/* Why Us */}
        <section className="section mb-5">
          <h3 className="section-heading">Why Us?</h3>
          <p>
            We believe in simplicity, engagement, and value. ChitChat stands out by focusing on real student experiences,
            providing tools to share, discuss, and explore ideas in a safe and supportive environment.
          </p>
        </section>

        {/* Founders */}
        <section className="section mb-5">
          <h3 className="section-heading">Founders</h3>
          <div className="row text-center">
            <div className="col-md-4">
              <img src="https://trekthehimalayas.com/images/HomeSlider/Slider/b65ddcd4-d13e-486e-95b5-dca27dac2469_har%20ki%20dun_3_11zon.webp" alt="Founder 1" className="founder-img mb-2" />
              <h5>Riya Sharma</h5>
              <p className="text-muted">Co-Founder & CEO</p>
            </div>
            <div className="col-md-4">
              <img src="https://trekthehimalayas.com/images/HomeSlider/Slider/b65ddcd4-d13e-486e-95b5-dca27dac2469_har%20ki%20dun_3_11zon.webp" alt="Founder 2" className="founder-img mb-2" />
              <h5>Arjun Mehta</h5>
              <p className="text-muted">Co-Founder & CTO</p>
            </div>
            <div className="col-md-4">
              <img src="https://trekthehimalayas.com/images/HomeSlider/Slider/b65ddcd4-d13e-486e-95b5-dca27dac2469_har%20ki%20dun_3_11zon.webp" alt="Founder 3" className="founder-img mb-2" />
              <h5>Simran Kaur</h5>
              <p className="text-muted">Product Designer</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section mb-5">
          <h3 className="section-heading">Our Core Values</h3>
          <ul className="core-values">
            <li><strong>Community:</strong> Safe and inclusive for all voices.</li>
            <li><strong>Creativity:</strong> Fueling new ideas and bold visions.</li>
            <li><strong>Transparency:</strong> Trust built through open dialogue.</li>
            <li><strong>Growth:</strong> Encouraging continuous personal and academic development.</li>
          </ul>
        </section>

        {/* Team */}
        <section className="section mb-5">
          <h3 className="section-heading">Our Team</h3>
          <p>
            A passionate blend of developers, content creators, and community managers working together
            to ensure ChitChat stays innovative and user-friendly.
          </p>
        </section>

        {/* Facilities */}
        <section className="section mb-5">
          <h3 className="section-heading">Facilities</h3>
          <div className="row">
            <div className="col-md-6">
              <ul>
                <li>Real-time threaded discussions</li>
                <li>Event scheduling & reminders</li>
                <li>Voice chat rooms</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul>
                <li>Club & department integration</li>
                <li>Clean and responsive UI</li>
                <li>24/7 community support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Social Icons (Optional Footer Integration) */}
        <div className="text-center mt-5">
          <a href="https://facebook.com" className="social-icon mx-2"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" className="social-icon mx-2"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" className="social-icon mx-2"><i className="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" className="social-icon mx-2"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
  );
}
