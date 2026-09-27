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
    { month: "July-2025", dates: ["10 Jul - 17 Jul", "20 Jul - 27 Jul"] },
    { month: "August-2025", dates: ["5 Aug - 12 Aug", "15 Aug - 22 Aug"] },
  ];

  const carouselData = [
    {
      image: "https://i.ibb.co/5g228Dnq/pexels-enric-cruz-lopez-6039185.jpg",
      title: "Valley of Flowers Trek",
      buttonText: "Book now",
    },
    {
      image: "https://i.ibb.co/zjT7VRJ/pexels-imadclicks-27496409.jpg ",
      title: "Alpine Meadows & Waterfalls",
      buttonText: "Explore more",
    },
    {
      image: "https://i.ibb.co/F2hj5nL/pexels-kieren-ridley-3615868-5407565.jpg",
      title: "Himalayan Flora & Fauna",
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
                    value: "Uttarakhand | India",
                  },
                  {
                    src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
                    label: "Duration",
                    value: "6 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "14,400 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "38 KM",
                  },
                  {
                    src: "https://i.ibb.co/Gvw9ZFRx/red-mobile-signal-network-tower-icon-free-vector.jpg",
                    label: "Grade",
                    value: "Moderate",
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
                <a href="mailto:info@valleyofflowers.com">
                  <i className="fa fa-envelope"></i> info@valleyofflowers.com
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
                      $<span id="converted-price">295.53</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹24,500
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
                        <strong>USD 500 +5% GST for Foreign Nationals</strong>
                      </li>
                    </div>
                    <li>5% GST will be applicable on Trek Cost and Add-ons</li>
                    <li>Services from Haridwar to Haridwar</li>
                    <li>Accommodation in guesthouses and camps included</li>
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
                <b>Trek Name:</b> Valley of Flowers Trek
              </p>
              <p>
                <b>Days:</b> 6
              </p>
              <p>
                <b>Adventure Type:</b> Trekking
              </p>
              <p>
                <b>Base Camp:</b> Govindghat
              </p>
              <p>
                <b>Season:</b> Monsoon <span>|</span> Post-Monsoon
              </p>
              <p>
                <b>Month:</b> July <span>|</span> August <span>|</span> September
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> India
              </p>
              <p>
                <b>Altitude:</b> 14,400 Ft.
              </p>
              <p>
                <b>Grade:</b> Moderate
              </p>
              <p>
                <b>Rail Head:</b> Haridwar
              </p>
              <p>
                <b>Stay:</b> Guesthouse and camping
              </p>
              <p>
                <b>Food:</b> Meals while on trek (Veg)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Chamoli District, Uttarakhand
              </p>
              <p>
                <b>Distance:</b> 38 Km
              </p>
              <p>
                <b>Trail Type:</b> One way trail with return via same route
              </p>
              <p>
                <b>AirPort:</b> Jolly Grant Airport, Dehradun
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
                <li>Minimum 14 years</li>
              </ul>
            </li>
            <li>
              First-timers are welcome. Basic fitness level required.
            </li>
            <li>
              <strong>Fitness Criteria:</strong>
              <ul>
                <li>
                  Should be able to walk 4-5 km in 45 minutes on plain terrain
                </li>
                <li>
                  Should be able to climb 50-60 stairs in one stretch
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
              able to carry a 6-8 kg backpack.
            </li>
            <li>
              If a trekker's BMI is more or less than the normal range (18-26),
              please consult our Trek Coordinator before booking.
            </li>
          </ul>
        </div>
      </section>

      <section className="itinerary shadow-lg p-3 mb-5 bg-body rounded" id="tab3-content">
        <h2>Valley of Flowers Trek Itinerary</h2>
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
            <h3>Day-1: Drive from Haridwar to Govindghat (1,828m)</h3>
            <ul>
              <li>Drive Distance: 300 km | 10-11 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-2: Trek from Govindghat to Ghangaria (3,050m)</h3>
            <ul>
              <li>Trek Distance: 13 km | 6-7 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-3: Explore Valley of Flowers (3,600m to 4,000m)</h3>
            <ul>
              <li>Trek Distance: 8-10 km | 6-7 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-4: Trek to Hemkund Sahib (4,329m) and back to Ghangaria</h3>
            <ul>
              <li>Trek Distance: 12 km | 7-8 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-5: Trek from Ghangaria to Govindghat</h3>
            <ul>
              <li>Trek Distance: 13 km | 4-5 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-6: Drive from Govindghat to Haridwar</h3>
            <ul>
              <li>Drive Distance: 300 km | 10-11 hrs</li>
            </ul>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"].map((day) => (
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
                  <h3>Drive from Haridwar to Govindghat (1,828m)</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 300 km | 10-11 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    Your journey begins with a scenic drive from Haridwar to Govindghat. 
                    The route takes you through Devprayag where the Alaknanda and Bhagirathi 
                    rivers merge to form the Ganges. You'll pass through beautiful mountain 
                    scenery and several small towns. Govindghat is a small pilgrim town 
                    situated at the confluence of the Alaknanda and Laxman Ganga rivers.
                  </p>
                </div>
              )}

              {activeDay === "Day 2" && (
                <div>
                  <h3>Trek from Govindghat to Ghangaria (3,050m)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 13 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    The trek begins with a gentle climb along the Laxman Ganga river. 
                    You'll pass through beautiful forests and waterfalls. The trail is 
                    well-defined with several bridges to cross. Ghangaria is the last 
                    human settlement before the Valley of Flowers and serves as the base 
                    for both Valley of Flowers and Hemkund Sahib treks.
                  </p>
                </div>
              )}

              {activeDay === "Day 3" && (
                <div>
                  <h3>Explore Valley of Flowers (3,600m to 4,000m)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 8-10 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    Today you'll enter the breathtaking Valley of Flowers National Park, 
                    a UNESCO World Heritage Site. The valley comes alive during monsoon 
                    with over 500 species of flowers in full bloom. You'll walk through 
                    meadows covered with flowers, surrounded by snow-capped peaks. The 
                    Pushpawati River flows through the valley adding to its beauty.
                  </p>
                </div>
              )}

              {activeDay === "Day 4" && (
                <div>
                  <h3>Trek to Hemkund Sahib (4,329m) and back to Ghangaria</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 12 km | 7-8 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    A challenging trek to the sacred Hemkund Sahib Gurudwara situated 
                    beside a glacial lake. The trail is steep with stone-paved paths. 
                    The Gurudwara is surrounded by seven peaks and offers stunning views. 
                    After paying respects, you'll return to Ghangaria for the night.
                  </p>
                </div>
              )}

              {activeDay === "Day 5" && (
                <div>
                  <h3>Trek from Ghangaria to Govindghat</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 13 km | 4-5 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    You'll retrace your steps back to Govindghat, descending through 
                    the same beautiful trail. The descent is easier and faster. In 
                    Govindghat, you can relax and visit the local market.
                  </p>
                </div>
              )}

              {activeDay === "Day 6" && (
                <div>
                  <h3>Drive from Govindghat to Haridwar</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 300 km | 10-11 hrs</li>
                  </ul>
                  <p>
                    The return drive takes you back to Haridwar, marking the end of 
                    your Valley of Flowers trek. You'll arrive in Haridwar by evening, 
                    with memories of the stunning Himalayan flowers and landscapes.
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