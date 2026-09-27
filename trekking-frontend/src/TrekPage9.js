import React, { useState } from "react";
import { startRazorpayPayment } from "./utils/razorpayutil";
import TravelerInfoForm from "./components/TravelerInfoForm";
import "./TrekPage.css";

const DzongriTrekPage = () => {
  const [isUSD, setIsUSD] = useState(false);
  const [activeDay, setActiveDay] = useState("Day 1");
  const [activeView, setActiveView] = useState("Quick Itinerary");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTravelerForm, setShowTravelerForm] = useState(false);
  const [openMonthIndex, setOpenMonthIndex] = useState(null);

  // Dzongri-specific data
  const togglePrice = () => setIsUSD(!isUSD);
  const openDay = (day) => setActiveDay(day);
  const toggleView = (view) => setActiveView(view);
  const handleMonthToggle = (index) => setOpenMonthIndex(openMonthIndex === index ? null : index);
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate("");
  };

  const handleProceedToPayment = () => {
    setShowModal(false);
    setShowTravelerForm(true);
  };

  const handleTravelerFormClose = () => {
    setShowTravelerForm(false);
    setSelectedDate("");
  };

  const handlePayment = () => {
    const travelerInfo = JSON.parse(sessionStorage.getItem('travelerInfo'));
    const primaryTraveler = travelerInfo.travelers[0];
    
    startRazorpayPayment({
      name: primaryTraveler.name,
      email: primaryTraveler.email,
      contact: primaryTraveler.phone,
      onSuccess: (response) => {
        // Send details to backend
        fetch("http://localhost:8090/api/payment/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            travelerInfo: travelerInfo,
            amount: document.getElementById("inr-price").innerText,
          }),
        });
      },
    });
  };

  // Dzongri Trek specific data
  const departures = [
    { month: "March-2025", dates: ["15 Mar - 21 Mar", "25 Mar - 31 Mar"] },
    { month: "April-2025", dates: ["5 Apr - 11 Apr", "15 Apr - 21 Apr"] },
    { month: "October-2025", dates: ["15 Oct - 21 Oct"] },
    { month: "November-2025", dates: ["5 Nov - 11 Nov"] },
  ];

  const carouselData = [
    {
      image: "https://i.ibb.co/mr0fNnLp/pexels-melih-akkus-679376803-19153612.jpg",
      title: "Dzongri Trek - Gateway to Kanchenjunga",
      buttonText: "Book now",
    },
    {
      image: "https://i.ibb.co/BKsHjDHX/pexels-mikhail-nilov-8429987.jpg",
      title: "Panoramic Himalayan Views",
      buttonText: "Explore more",
    },
    {
      image: "https://i.ibb.co/60QhzssN/pexels-yogendras31-3337153.jpg",
      title: "Rhododendron Forests & Alpine Meadows",
      buttonText: "View gallery",
    },
  ];

  const iconData = [
    {
      src: "https://i.ibb.co/ZR7LWM3r/kalimantan-map-icon-illustration-design-vector.jpg",
      label: "Region",
      value: "Sikkim | India",
    },
    {
      src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
      label: "Duration",
      value: "7 Days",
    },
    {
      src: "https://i.ibb.co/HTgDhLmF/11715345.png",
      label: "Max Altitude",
      value: "13,000 Ft.",
    },
    {
      src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
      label: "Trekking Km",
      value: "45 KM",
    },
    {
      src: "https://i.ibb.co/Gvw9ZFRx/red-mobile-signal-network-tower-icon-free-vector.jpg",
      label: "Grade",
      value: "Moderate",
    },
   
  ];

  return (
    <div className="trek-carousel-container">
      {/* Carousel - Updated for Dzongri */}
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {carouselData.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {carouselData.map((slide, i) => (
            <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
              <img src={slide.image} className="d-block w-100" alt={`Dzongri Slide ${i + 1}`} />
              <div className="container">
                <div className={`carousel-caption ${i === 0 ? "text-start" : i === 2 ? "text-end" : ""}`}>
                  <h1>{slide.title}</h1>
                  <p><a className="btn btn-lg btn-primary" href="#">{slide.buttonText}</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Icon Section - Updated for Dzongri */}
      <section className="icon_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {iconData.map((item, index) => (
                  <div className="col-md-2 col_icon" key={index}>
                    <div className="iconimg">
                      <img src={item.src} className="icon_img" width="100" height="100" alt={item.label} />
                    </div>
                    <div className="info">
                      <p className="detail">{item.label}</p>
                      <p className="bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="column4">
                <h6>Get in Touch with Our Trek Expert</h6>
                <a href="tel:+91 9876543210"><i className="fa fa-phone"></i> +91 9876543210</a>
                <a href="mailto:info@dzongritrek.com"><i className="fa fa-envelope"></i> info@dzongritrek.com</a>
                <br />
                <i className="far fa-clock"></i> Monday - Saturday: 10 AM to 06 PM (GMT +5:30)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section - Updated for Dzongri */}
      <section className="custom-3d-box">
        <div className="container">
          <div className="row">
            <div className="usdButton row align-items-center">
              <div className="col-md-6">
                <h3 className="price">
                  {isUSD ? (
                    <span id="usd-price">$<span id="converted-price">300.00</span><span className="person"> -/Person</span></span>
                  ) : (
                    <span id="inr-price"><i className="fa fa-rupee-sign"></i>₹25,000<span className="person"> -/Person</span></span>
                  )}
                </h3>
              </div>
              <div className="col-md-6 usdButtonDiv">
                <button id="toggle-button" onClick={togglePrice}>
                  {isUSD ? "Convert to INR" : "Convert to USD"}
                </button>
              </div>
            </div>

            {/* Fixed Departures - Dzongri specific months */}
            <div className="col-md-6 dept" id="fixeddep">
              <div className="fdtitle">Fixed Departure Dates</div>
              <ul className="list-group">
                {departures.map(({ month, dates }, i) => (
                  <React.Fragment key={i}>
                    <li className="list-group-item month_collapse" onClick={() => handleMonthToggle(i)}>
                      <i className="fas fa-chevron-down me-2" />
                      {month}
                    </li>
                    {openMonthIndex === i && (
                      <div className="custom-collapse">
                        <div className="card card-body-trek">
                          {dates.map((date, j) => (
                            <button key={j} className="btn btn-outline-primary m-1" onClick={() => handleDateClick(date)}>
                              {date}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            {/* Price Details - Dzongri specific */}
            <div className="col-md-6 dep_detail" id="price_details">
              <div className="price_desc">
                <div>
                  <ul>
                    <div style={{ backgroundColor: "#ee3038", color: "white" }}>
                      <li><strong>USD 400 +5% GST for Foreign Nationals</strong></li>
                    </div>
                    <li>5% GST on Trek Cost and Add-ons</li>
                    <li>Includes all meals during trek (Veg + Eggs)</li>
                    <li>Accommodation in tents and guest houses</li>
                    <li>Trekking permits and forest fees included</li>
                    <li>Professional guide and support staff</li>
                  </ul>
                </div>
                <div className="DivAdd">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="?show=cost-cancellation#tab6-content" className="price-btn" onClick={(e) => e.preventDefault()}>
                        Cost & Cancellation Terms
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section - Dzongri specific */}
      <section className="overview" id="tab1-content">
        <h2>Overview</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4 overview-bg">
              <p><b>Trek Name:</b> Dzongri Trek</p>
              <p><b>Days:</b> 7</p>
              <p><b>Adventure Type:</b> High Altitude Trek</p>
              <p><b>Base Camp:</b> Yuksom</p>
              <p><b>Best Season:</b> Spring & Autumn</p>
              <p><b>Peak View:</b> Kanchenjunga Range</p>
            </div>
            <div className="col-md-4 overview-bg">
              <p><b>Country:</b> India (Sikkim)</p>
              <p><b>Altitude:</b> 13,000 Ft.</p>
              <p><b>Grade:</b> Moderate</p>
              <p><b>Airport:</b> Bagdogra (IXB)</p>
              <p><b>Stay:</b> Tents & Guest Houses</p>
              <p><b>Food:</b> All meals (Veg + Eggs)</p>
            </div>
            <div className="col-md-4 overview-bg">
              <p><b>Location:</b> Kanchenjunga National Park</p>
              <p><b>Distance:</b> 45 Km</p>
              <p><b>Trail Type:</b> Round trip</p>
              <p><b>Temperature:</b> 0°C to 15°C</p>
              <p><b>Unique Feature:</b> Rhododendron blooms</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                The Dzongri Trek is one of Sikkim's most beautiful short treks, offering spectacular
                views of the Kanchenjunga range (world's third highest peak) and other Himalayan giants.
                This trek takes you through lush rhododendron forests, alpine meadows, and traditional
                villages. The highlight is the sunrise view from Dzongri Top (13,675 ft) with panoramic
                views of Pandim, Kabru, Rathong, and other peaks. Perfect for those wanting a relatively
                short but rewarding Himalayan experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate - Updated for Dzongri */}
      <section className="participate" id="tab2-content">
        <h2>Who Can Participate</h2>
        <div className="whocan">
          <ul>
            <li><strong>Age Requirement:</strong> Minimum 14 years (with guardian)</li>
            <li>First-timers with good fitness level can attempt</li>
            <li><strong>Fitness Criteria:</strong>
              <ul>
                <li>Should be able to walk 5 km in 45 minutes</li>
                <li>Comfortable with 4-6 hours of daily trekking</li>
                <li>Preparation Chart <a href="#"><u>view</u></a> <a href="#"><u>download</u></a></li>
              </ul>
            </li>
            <li>Basic medical fitness certificate required</li>
            <li>No prior high-altitude experience needed (but beneficial)</li>
            <li>BMI should be within normal range (consult if outside)</li>
          </ul>
        </div>
      </section>

      {/* Itinerary Section - Dzongri specific */}
      <section className="itinerary shadow-lg p-3 mb-5 bg-body rounded" id="tab3-content">
        <h2>Dzongri Trek Itinerary</h2>
        <button className="btn-quick" onClick={() => toggleView("Quick Itinerary")}>Quick Itinerary</button>
        <button className="btn-detailed" onClick={() => toggleView("Detailed Itinerary")}>Detailed Itinerary</button>
        
        {activeView === "Quick Itinerary" && (
          <div id="quickItinerary">
            <h3>Day-1: Arrival in Bagdogra | Drive to Yuksom (5,670 ft)</h3>
            <ul>
              <li>Drive: 150 km | 6-7 hrs</li>
              <li>Stay: Guest House</li>
            </ul>

            <h3>Day-2: Yuksom to Sachen (7,200 ft)</h3>
            <ul>
              <li>Trek: 8 km | 5-6 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-3: Sachen to Tshoka (9,700 ft)</h3>
            <ul>
              <li>Trek: 7 km | 5-6 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-4: Tshoka to Dzongri (12,980 ft)</h3>
            <ul>
              <li>Trek: 10 km | 6-7 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-5: Dzongri Top Sunrise (13,675 ft) | Explore</h3>
            <ul>
              <li>Short hike to viewpoint</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-6: Dzongri to Tshoka</h3>
            <ul>
              <li>Trek: 10 km | 5-6 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-7: Tshoka to Yuksom | Drive to Bagdogra</h3>
            <ul>
              <li>Trek: 15 km | 7-8 hrs</li>
              <li>Drive: 150 km | 6-7 hrs</li>
            </ul>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map((day) => (
              <button key={day} className={`tablinks ${activeDay === day ? "active" : ""}`} onClick={() => openDay(day)}>
                {day}
              </button>
            ))}

            <div className="container tabcontent" id={activeDay}>
              {activeDay === "Day 1" && (
                <div>
                  <h3>Arrival in Bagdogra | Drive to Yuksom (5,670 ft)</h3>
                  <ul>
                    <li><b>Drive:</b> 150 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Guest House</li>
                  </ul>
                  <p>
                    Arrive at Bagdogra Airport (IXB) and drive through tea gardens to Yuksom,
                    the historical first capital of Sikkim. Complete trekking permit formalities.
                    Briefing about the trek. Explore Yuksom's historical sites including the
                    Coronation Throne of the first Chogyal of Sikkim. Overnight in a guest house.
                  </p>
                </div>
              )}

              {activeDay === "Day 2" && (
                <div>
                  <h3>Yuksom to Sachen (7,200 ft)</h3>
                  <ul>
                    <li><b>Trek:</b> 8 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    First day of trekking through dense subtropical forests following the Rathong River.
                    The well-defined trail involves steady climbing through beautiful landscapes.
                    Pass through small villages and cross several wooden bridges. Arrive at Sachen
                    campsite near the river. Evening acclimatization walk.
                  </p>
                </div>
              )}

              {activeDay === "Day 3" && (
                <div>
                  <h3>Sachen to Tshoka (9,700 ft)</h3>
                  <ul>
                    <li><b>Trek:</b> 7 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Steeper ascent through magnolia and rhododendron forests. Pass the small village of
                    Bakhim before reaching Tshoka, a Tibetan refugee settlement with a small monastery.
                    First views of snow-capped peaks on clear days. Visit the local monastery in the
                    evening. Camp near the village.
                  </p>
                </div>
              )}

              {activeDay === "Day 4" && (
                <div>
                  <h3>Tshoka to Dzongri (12,980 ft)</h3>
                  <ul>
                    <li><b>Trek:</b> 10 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Challenging climb through rhododendron forests to Phedang, then open meadows to Dzongri.
                    The trail becomes steeper above the tree line. Dzongri offers panoramic views of the
                    Kanchenjunga range. Short acclimatization hike in the evening to prepare for tomorrow's
                    sunrise hike. Spectacular sunset views over the Himalayas.
                  </p>
                </div>
              )}

              {activeDay === "Day 5" && (
                <div>
                  <h3>Dzongri Top Sunrise (13,675 ft) | Explore</h3>
                  <ul>
                    <li><b>Activities:</b> Sunrise hike, exploration</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Pre-dawn start to hike up to Dzongri Top (13,675 ft) for sunrise over Kanchenjunga,
                    Pandim, Kabru, Rathong, and other peaks. The 360-degree panoramic view is the highlight
                    of the trek. Return to camp for breakfast. Rest of the day free to explore the area or
                    rest. Option to hike to Laxmi Pokhari (small sacred lake) in the afternoon.
                  </p>
                </div>
              )}

              {activeDay === "Day 6" && (
                <div>
                  <h3>Dzongri to Tshoka</h3>
                  <ul>
                    <li><b>Trek:</b> 10 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Descend through the same trail back to Tshoka. The downhill trek is easier but still
                    requires careful footing. Enjoy different perspectives of the landscapes you passed
                    on the way up. Celebrate your successful summit with the team at Tshoka. Visit the
                    local monastery if you missed it earlier.
                  </p>
                </div>
              )}

              {activeDay === "Day 7" && (
                <div>
                  <h3>Tshoka to Yuksom | Drive to Bagdogra</h3>
                  <ul>
                    <li><b>Trek:</b> 15 km | 7-8 hrs</li>
                    <li><b>Drive:</b> 150 km | 6-7 hrs</li>
                  </ul>
                  <p>
                    Final trekking day descending through lush forests back to Yuksom. Collect your
                    completion certificates. After lunch, drive back to Bagdogra through scenic
                    Sikkimese countryside. Transfer to airport for your flight home, carrying
                    unforgettable memories of Himalayan vistas.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h5 className="modal-title">Confirm Booking</h5>
            <p>
              You selected: <strong>{selectedDate}</strong>
            </p>
            <p>Proceed to payment?</p>
            <div className="modal-footer">
              <button
                className="btn cancel-btn"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button onClick={handleProceedToPayment} className="btn btn-primary">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {showTravelerForm && (
        <TravelerInfoForm
          selectedDate={selectedDate}
          onClose={handleTravelerFormClose}
        />
      )}
    </div>
  );
};

export default DzongriTrekPage;