import React, { useState } from "react";
import { startRazorpayPayment } from "./utils/razorpayutil";
import TravelerInfoForm from "./components/TravelerInfoForm";
import "./TrekPage.css";

const TrekPage = () => {
  const [isUSD, setIsUSD] = useState(false);
  const [activeDay, setActiveDay] = useState("Day 1");
  const [activeView, setActiveView] = useState("Quick Itinerary");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTravelerForm, setShowTravelerForm] = useState(false);
  const [openMonthIndex, setOpenMonthIndex] = useState(null);

  const togglePrice = () => {
    setIsUSD(!isUSD);
  };

  const openDay = (day) => {
    setActiveDay(day);
  };

  const toggleView = (view) => {
    setActiveView(view);
  };

  const handleMonthToggle = (index) => {
    setOpenMonthIndex(openMonthIndex === index ? null : index);
  };

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

  const departures = [
    { month: "January-2025", dates: ["10 Jan - 19 Jan", "20 Jan - 29 Jan"] },
    { month: "February-2025", dates: ["5 Feb - 14 Feb", "15 Feb - 24 Feb"] },
  ];

  const carouselData = [
    {
      image: "https://i.ibb.co/5XwPXqZm/pexels-vikashkr50-17725752.jpg",
      title: "Chadar Trek - The Frozen River",
      buttonText: "Book now",
    },
    {
      image: "https://i.ibb.co/zHXP8g8M/pexels-adrien-stachowiak-170983955-32447965.jpg",
      title: "Walking on the Frozen Zanskar",
      buttonText: "Explore more",
    },
    {
      image: "https://i.ibb.co/8gYGW0VD/pexels-sergei-32443495.jpg",
      title: "Ladakh's Winter Wonderland",
      buttonText: "View gallery",
    },
  ];

  return (
    <div className="trek-carousel-container">
      {/* Bootstrap Carousel */}
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
              <img
                src={slide.image}
                className="d-block w-100"
                alt={`Trek Slide ${i + 1}`}
              />
              <div className="container">
                <div className={`carousel-caption ${i === 0 ? "text-start" : i === 2 ? "text-end" : ""}`}>
                  <h1>{slide.title}</h1>
                  <p>
                    <a className="btn btn-lg btn-primary" href="#">
                      {slide.buttonText}
                    </a>
                  </p>
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

      {/* Icon Section */}
      <section className="icon_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {[
                  {
                    src: "https://i.ibb.co/ZR7LWM3r/kalimantan-map-icon-illustration-design-vector.jpg",
                    label: "Region",
                    value: "Ladakh | India",
                  },
                  {
                    src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
                    label: "Duration",
                    value: "9 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "11,123 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "62 KM",
                  },
                  {
                    src: "https://i.ibb.co/Gvw9ZFRx/red-mobile-signal-network-tower-icon-free-vector.jpg",
                    label: "Grade",
                    value: "Difficult",
                  },
                ].map((item, index) => (
                  <div className="col-md-2 col_icon" key={index}>
                    <div className="iconimg">
                      <img
                        src={item.src}
                        className="icon_img"
                        width="100"
                        height="100"
                        alt={item.label}
                      />
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
                <a href="tel:+91 9876543210">
                  <i className="fa fa-phone"></i> +91 9876543210
                </a>
                <a href="mailto:info@chadartrek.com">
                  <i className="fa fa-envelope"></i> info@chadartrek.com
                </a>
                <br />
                <i className="far fa-clock"></i> Monday - Saturday: 10 AM to 06 PM (GMT +5:30)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="custom-3d-box">
        <div className="container">
          <div className="row">
            <div className="usdButton row align-items-center">
              <div className="col-md-6">
                <h3 className="price">
                  {isUSD ? (
                    <span id="usd-price">
                      $<span id="converted-price">475.53</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹39,800
                      <span className="person"> -/Person </span>
                    </span>
                  )}
                </h3>
              </div>
              <div className="col-md-6 usdButtonDiv">
                <button id="toggle-button" onClick={togglePrice}>
                  {isUSD ? "Convert to INR" : "Convert to USD"}
                </button>
              </div>
            </div>

            {/* Fixed Departures */}
            <div className="col-md-6 dept" id="fixeddep">
              <div className="fdtitle">Fixed Departure Dates</div>
              <ul className="list-group">
                {departures.map(({ month, dates }, i) => (
                  <React.Fragment key={i}>
                    <li
                      className="list-group-item month_collapse"
                      onClick={() => handleMonthToggle(i)}
                    >
                      <i className="fas fa-chevron-down me-2" />
                      {month}
                    </li>

                    {openMonthIndex === i && (
                      <div className="custom-collapse">
                        <div className="card card-body-trek">
                          {dates.map((date, j) => (
                            <button
                              key={j}
                              className="btn btn-outline-primary m-1"
                              onClick={() => handleDateClick(date)}
                            >
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

            {/* Custom Modal */}
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

            {/* Price Details */}
            <div className="col-md-6 dep_detail" id="price_details">
              <div className="price_desc">
                <div>
                  <ul>
                    <div style={{ backgroundColor: "#ee3038", color: "white" }}>
                      <li>
                        <strong>USD 900 +5% GST for Foreign Nationals</strong>
                      </li>
                    </div>
                    <li>5% GST will be applicable on Trek Cost and Add-ons</li>
                    <li>Services from Leh to Leh</li>
                    <li>Accommodation in guesthouses and tents included</li>
                    <li>All meals during the trek included</li>
                    <li>Special winter gear rental included</li>
                  </ul>
                </div>

                <div className="DivAdd">
                  <div className="row">
                    <div className="col-md-12">
                      <a
                        href="?show=cost-cancellation#tab6-content"
                        className="price-btn"
                        onClick={(e) => e.preventDefault()}
                      >
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

      {/* Overview Section */}
      <section className="overview" id="tab1-content">
        <h2>Overview</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4 overview-bg">
              <p>
                <b>Trek Name:</b> Chadar Trek
              </p>
              <p>
                <b>Days:</b> 9
              </p>
              <p>
                <b>Adventure Type:</b> Winter Expedition
              </p>
              <p>
                <b>Base Camp:</b> Leh
              </p>
              <p>
                <b>Season:</b> Winter
              </p>
              <p>
                <b>Month:</b> January <span>|</span> February
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> India
              </p>
              <p>
                <b>Altitude:</b> 11,123 Ft.
              </p>
              <p>
                <b>Grade:</b> Difficult
              </p>
              <p>
                <b>Rail Head:</b> Jammu Tawi
              </p>
              <p>
                <b>Stay:</b> Guesthouses and caves/tents
              </p>
              <p>
                <b>Food:</b> High-calorie meals (Veg + Egg)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Zanskar Valley, Ladakh
              </p>
              <p>
                <b>Distance:</b> 62 Km
              </p>
              <p>
                <b>Trail Type:</b> Frozen river walk
              </p>
              <p>
                <b>AirPort:</b> Kushok Bakula Rimpochee Airport, Leh
              </p>
              <p>
                <b>Temperature:</b> -15°C to -30°C
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="participate" id="tab2-content">
        <h2>Who Can Participate</h2>
        <div className="whocan">
          <ul>
            <li>
              <strong>Age Requirement:</strong>
              <ul>
                <li>Minimum 18 years</li>
                <li>Maximum 50 years (with medical certificate)</li>
              </ul>
            </li>
            <li>
              Only experienced trekkers with prior high-altitude trek experience should attempt.
            </li>
            <li>
              <strong>Fitness Criteria:</strong>
              <ul>
                <li>
                  Should be able to walk 6 km in 45 minutes on plain terrain with 10kg backpack
                </li>
                <li>
                  Should be able to withstand extreme cold conditions (-30°C)
                </li>
                <li>
                  Preparation Chart
                  <a href="#">
                    <u>view</u>
                  </a>
                  <a href="#">
                    <u>download</u>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              Medical certificate of fitness for extreme cold conditions mandatory.
            </li>
            <li>
              If a trekker's BMI is more than 26, please consult our Trek Coordinator before booking.
            </li>
          </ul>
        </div>
      </section>

      <section className="itinerary shadow-lg p-3 mb-5 bg-body rounded" id="tab3-content">
        <h2>Chadar Trek Itinerary</h2>
        <button className="btn-quick" onClick={() => toggleView("Quick Itinerary")}>
          Quick Itinerary
        </button>
        <button className="btn-detailed" onClick={() => toggleView("Detailed Itinerary")}>
          Detailed Itinerary
        </button>
        <button className="btn-graph" onClick={() => toggleView("Graphs")}>
          Graphs
        </button>

        {activeView === "Quick Itinerary" && (
          <div id="quickItinerary">
            <h3>Day-1: Arrive in Leh (11,500 ft)</h3>
            <ul>
              <li>Acclimatization day</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-2: Leh Sightseeing & Medical Check-up</h3>
            <ul>
              <li>Visit monasteries and local markets</li>
              <li>Medical check-up mandatory</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-3: Drive from Leh to Tilat Sumdo (10,390 ft) via Chilling</h3>
            <ul>
              <li>Drive Distance: 65 km | 3-4 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-4: Trek from Tilat Sumdo to Shingra Koma (10,700 ft)</h3>
            <ul>
              <li>Trek Distance: 12 km | 6-7 hrs</li>
              <li>First day on frozen Zanskar</li>
              <li>Stay: Cave Camp</li>
            </ul>

            <h3>Day-5: Trek from Shingra Koma to Tibb Cave (10,830 ft)</h3>
            <ul>
              <li>Trek Distance: 14 km | 7-8 hrs</li>
              <li>Stay: Cave Camp</li>
            </ul>

            <h3>Day-6: Trek from Tibb Cave to Nerak (11,123 ft)</h3>
            <ul>
              <li>Trek Distance: 13 km | 7-8 hrs</li>
              <li>See the frozen waterfall</li>
              <li>Stay: Cave Camp</li>
            </ul>

            <h3>Day-7: Trek from Nerak back to Tibb Cave</h3>
            <ul>
              <li>Trek Distance: 13 km | 6-7 hrs</li>
              <li>Stay: Cave Camp</li>
            </ul>

            <h3>Day-8: Trek from Tibb Cave to Shingra Koma</h3>
            <ul>
              <li>Trek Distance: 14 km | 6-7 hrs</li>
              <li>Stay: Cave Camp</li>
            </ul>

            <h3>Day-9: Trek to Tilat Sumdo & Drive back to Leh</h3>
            <ul>
              <li>Trek Distance: 12 km | 5-6 hrs</li>
              <li>Drive Distance: 65 km | 3-4 hrs</li>
            </ul>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9"].map((day) => (
              <button
                key={day}
                className={`tablinks ${activeDay === day ? "active" : ""}`}
                onClick={() => openDay(day)}
              >
                {day}
              </button>
            ))}

            <div className="container tabcontent" id={activeDay}>
              {activeDay === "Day 1" && (
                <div>
                  <h3>Arrive in Leh (11,500 ft)</h3>
                  <ul>
                    <li><b>Activities:</b> Acclimatization</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    Arrive in Leh and rest for acclimatization. The thin air at this altitude 
                    requires proper rest. Drink plenty of fluids and avoid strenuous activity. 
                    Briefing about the trek in the evening. Check all your winter gear.
                  </p>
                </div>
              )}

              {activeDay === "Day 2" && (
                <div>
                  <h3>Leh Sightseeing & Medical Check-up</h3>
                  <ul>
                    <li><b>Activities:</b> Monastery visits, medical check-up</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    Visit Hemis, Thiksey or Shey monasteries to experience Ladakhi culture. 
                    Mandatory medical check-up in the afternoon to ensure fitness for the trek. 
                    Final gear check and packing. Learn ice-walking techniques from guides.
                  </p>
                </div>
              )}

              {activeDay === "Day 3" && (
                <div>
                  <h3>Drive from Leh to Tilat Sumdo (10,390 ft) via Chilling</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 65 km | 3-4 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    Scenic drive along the Indus River to Nimu (confluence of Indus and Zanskar). 
                    Continue to Chilling village and descend to the Zanskar riverbed. Set up camp 
                    at Tilat Sumdo, the starting point of the Chadar trek. Practice walking on ice.
                  </p>
                </div>
              )}

              {activeDay === "Day 4" && (
                <div>
                  <h3>Trek from Tilat Sumdo to Shingra Koma (10,700 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 12 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Cave Camp</li>
                  </ul>
                  <p>
                    First day walking on the frozen Zanskar river. Learn to identify safe ice 
                    patches. The Chadar (ice sheet) changes daily - some parts thick and solid, 
                    others thin and brittle. Reach Shingra Koma, a large open area with caves 
                    used by locals. Sleep in caves with sleeping bags rated for extreme cold.
                  </p>
                </div>
              )}

              {activeDay === "Day 5" && (
                <div>
                  <h3>Trek from Shingra Koma to Tibb Cave (10,830 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 14 km | 7-8 hrs</li>
                    <li><b>Stay:</b> Cave Camp</li>
                  </ul>
                  <p>
                    Longer trek today through spectacular frozen gorge. Pass through narrow 
                    sections where the river cuts through towering cliffs. Tibb Cave is a 
                    large overhang used by Zanskari traders for centuries. Experience -25°C 
                    temperatures at night. Hot meals prepared by support team.
                  </p>
                </div>
              )}

              {activeDay === "Day 6" && (
                <div>
                  <h3>Trek from Tibb Cave to Nerak (11,123 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 13 km | 7-8 hrs</li>
                    <li><b>Stay:</b> Cave Camp</li>
                  </ul>
                  <p>
                    Most scenic day with views of frozen waterfalls. Reach Nerak village where 
                    the famous 15m frozen waterfall is located. Interact with Zanskari locals 
                    who use this route as their winter highway. Extreme cold conditions - 
                    thermals, down jackets and multiple layers essential.
                  </p>
                </div>
              )}

              {activeDay === "Day 7" && (
                <div>
                  <h3>Trek from Nerak back to Tibb Cave</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 13 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Cave Camp</li>
                  </ul>
                  <p>
                    Begin return journey. The Chadar may have changed - new cracks or thin spots. 
                    Experienced guides will find safe paths. Appreciate the landscape from the 
                    opposite direction. Warmer camping temperature at Tibb Cave compared to Nerak.
                  </p>
                </div>
              )}

              {activeDay === "Day 8" && (
                <div>
                  <h3>Trek from Tibb Cave to Shingra Koma</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 14 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Cave Camp</li>
                  </ul>
                  <p>
                    Continue return trek, now more confident walking on ice. Notice how the Chadar 
                    has transformed during your journey. Last night on the river - celebrate with 
                    the team. Share stories around the fire (if possible).
                  </p>
                </div>
              )}

              {activeDay === "Day 9" && (
                <div>
                  <h3>Trek to Tilat Sumdo & Drive back to Leh</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 12 km | 5-6 hrs</li>
                    <li><b>Drive Distance:</b> 65 km | 3-4 hrs</li>
                  </ul>
                  <p>
                    Final trek on the Chadar to Tilat Sumdo. Vehicles await to take you back to Leh. 
                    Hot shower and comfortable bed await at the guesthouse. Certificate ceremony in 
                    the evening to celebrate completing one of India's most challenging treks.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TrekPage;