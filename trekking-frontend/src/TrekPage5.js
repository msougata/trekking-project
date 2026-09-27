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
    { month: "June-2025", dates: ["10 Jun - 15 Jun", "20 Jun - 25 Jun"] },
    { month: "July-2025", dates: ["5 Jul - 10 Jul", "15 Jul - 20 Jul"] },
    { month: "August-2025", dates: ["5 Aug - 10 Aug", "15 Aug - 20 Aug"] },
    { month: "September-2025", dates: ["5 Sep - 10 Sep"] },
  ];

  const carouselData = [
    {
      image: "https://i.ibb.co/vvmF6PD0/pexels-marek-piwnicki-3907296-14714455.jpg",
      title: "Hampta Pass Trek",
      buttonText: "Book now",
    },
    {
      image: "https://i.ibb.co/35Lh3730/pexels-philippe-serrand-337910945-19890298.jpg",
      title: "Crossing the Himalayan Pass",
      buttonText: "Explore more",
    },
    {
      image: "https://i.ibb.co/LDjc6y77/pexels-joegun-13886803.jpg",
      title: "Lahaul Valley Views",
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
                    value: "Himachal Pradesh | India",
                  },
                  {
                    src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
                    label: "Duration",
                    value: "5 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "14,100 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "26 KM",
                  },
                  {
                    src: "https://i.ibb.co/Gvw9ZFRx/red-mobile-signal-network-tower-icon-free-vector.jpg",
                    label: "Grade",
                    value: "Moderate to Difficult",
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
                <a href="mailto:info@hamptapass.com">
                  <i className="fa fa-envelope"></i> info@hamptapass.com
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
                      $<span id="converted-price">325.53</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹27,500
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
                        <strong>USD 600 +5% GST for Foreign Nationals</strong>
                      </li>
                    </div>
                    <li>5% GST will be applicable on Trek Cost and Add-ons</li>
                    <li>Services from Manali to Manali</li>
                    <li>Accommodation in tents included</li>
                    <li>All meals during the trek included</li>
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
                <b>Trek Name:</b> Hampta Pass Trek
              </p>
              <p>
                <b>Days:</b> 5
              </p>
              <p>
                <b>Adventure Type:</b> High Altitude Trekking
              </p>
              <p>
                <b>Base Camp:</b> Jobra
              </p>
              <p>
                <b>Season:</b> Summer <span>|</span> Monsoon
              </p>
              <p>
                <b>Month:</b> June <span>|</span> July <span>|</span> August <span>|</span> September
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> India
              </p>
              <p>
                <b>Altitude:</b> 14,100 Ft.
              </p>
              <p>
                <b>Grade:</b> Moderate to Difficult
              </p>
              <p>
                <b>Rail Head:</b> Chandigarh
              </p>
              <p>
                <b>Stay:</b> Camping in alpine tents
              </p>
              <p>
                <b>Food:</b> All meals during trek (Veg + Egg)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Kullu & Lahaul Valley, Himachal
              </p>
              <p>
                <b>Distance:</b> 26 Km
              </p>
              <p>
                <b>Trail Type:</b> One way trail ending in Chandra Tal
              </p>
              <p>
                <b>AirPort:</b> Bhuntar Airport, Kullu
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
                <li>Minimum 15 years</li>
              </ul>
            </li>
            <li>
              First-timers with good fitness level can attempt this trek.
            </li>
            <li>
              <strong>Fitness Criteria:</strong>
              <ul>
                <li>
                  Should be able to walk 5 km in 45 minutes on plain terrain
                </li>
                <li>
                  Should be able to climb 70-80 stairs in one stretch
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
              If the trekker wants to carry a backpack then he/she should be
              able to carry a 8-10 kg backpack.
            </li>
            <li>
              If a trekker's BMI is more or less than the normal range (18-26),
              please consult our Trek Coordinator before booking.
            </li>
          </ul>
        </div>
      </section>

      <section className="itinerary shadow-lg p-3 mb-5 bg-body rounded" id="tab3-content">
        <h2>Hampta Pass Trek Itinerary</h2>
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
            <h3>Day-1: Drive from Manali to Jobra (9,800 ft) & Trek to Chika (10,100 ft)</h3>
            <ul>
              <li>Drive Distance: 30 km | 2 hrs</li>
              <li>Trek Distance: 2 km | 1 hr</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-2: Trek from Chika to Balu Ka Ghera (12,000 ft)</h3>
            <ul>
              <li>Trek Distance: 8 km | 5-6 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-3: Trek from Balu Ka Ghera to Shea Goru via Hampta Pass (14,100 ft)</h3>
            <ul>
              <li>Trek Distance: 10 km | 8-9 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-4: Trek from Shea Goru to Chatru (11,000 ft) & Drive to Chandra Tal (14,100 ft)</h3>
            <ul>
              <li>Trek Distance: 6 km | 3-4 hrs</li>
              <li>Drive Distance: 40 km | 2 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-5: Drive from Chandra Tal to Manali (6,700 ft)</h3>
            <ul>
              <li>Drive Distance: 120 km | 6-7 hrs</li>
            </ul>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"].map((day) => (
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
                  <h3>Drive from Manali to Jobra (9,800 ft) & Trek to Chika (10,100 ft)</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 30 km | 2 hrs</li>
                    <li><b>Trek Distance:</b> 2 km | 1 hr</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    The adventure begins with a scenic drive from Manali to Jobra through 
                    apple orchards and pine forests. From Jobra, a short but steep trek 
                    leads to Chika, a beautiful meadow alongside the Rani Nallah stream. 
                    The campsite offers stunning views of the surrounding mountains.
                  </p>
                </div>
              )}

              {activeDay === "Day 2" && (
                <div>
                  <h3>Trek from Chika to Balu Ka Ghera (12,000 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 8 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    Today's trail takes you through dense forests, crossing several streams 
                    along the way. The path gradually ascends to Jwara, a vast meadow with 
                    panoramic mountain views. The final stretch leads to Balu Ka Ghera, a 
                    sandy campsite named after the bear that once inhabited this area.
                  </p>
                </div>
              )}

              {activeDay === "Day 3" && (
                <div>
                  <h3>Trek from Balu Ka Ghera to Shea Goru via Hampta Pass (14,100 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 10 km | 8-9 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    The most challenging day as you ascend to Hampta Pass at 14,100 ft. 
                    The steep climb is rewarded with breathtaking views of the Lahaul Valley 
                    and surrounding peaks. After crossing the pass, descend through loose 
                    scree slopes to reach Shea Goru in the Lahaul Valley, a dramatic change 
                    in landscape from the green Kullu Valley.
                  </p>
                </div>
              )}

              {activeDay === "Day 4" && (
                <div>
                  <h3>Trek from Shea Goru to Chatru (11,000 ft) & Drive to Chandra Tal (14,100 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 6 km | 3-4 hrs</li>
                    <li><b>Drive Distance:</b> 40 km | 2 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    A relatively easy descent along the Hampta River takes you to Chatru, 
                    where the Chandra River meets the road. From here, drive to the stunning 
                    Chandra Tal (Moon Lake), a high-altitude lake with crystal clear blue waters 
                    surrounded by majestic mountains. Camp near the lake for a magical evening.
                  </p>
                </div>
              )}

              {activeDay === "Day 5" && (
                <div>
                  <h3>Drive from Chandra Tal to Manali (6,700 ft)</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 120 km | 6-7 hrs</li>
                  </ul>
                  <p>
                    After breakfast, begin the long but scenic drive back to Manali via Kunzum 
                    Pass (15,060 ft), offering last glimpses of the Spiti Valley. The route 
                    passes through Batal and the Rohtang Pass before descending to Manali, 
                    marking the end of your Himalayan adventure.
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