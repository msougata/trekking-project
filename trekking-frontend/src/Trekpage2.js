import React, { useState } from "react";
import { startRazorpayPayment } from "./utils/razorpayutil";
import { useParams } from 'react-router-dom';
import TravelerInfoForm from "./components/TravelerInfoForm";
import "./TrekPage.css";

const TrekPage = () => {
  const [isUSD, setIsUSD] = useState(false);
  const [activeDay, setActiveDay] = useState("Day 1"); // State for active day
  const [activeView, setActiveView] = useState("Quick Itinerary"); // Set default view to Quick Itinerary
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTravelerForm, setShowTravelerForm] = useState(false);
  const [openMonthIndex, setOpenMonthIndex] = useState(null);
  const { sandakphu } = useParams();

  const togglePrice = () => {
    setIsUSD(!isUSD);
  };

  const openDay = (day) => {
    setActiveDay(day); // Update active day
  };
  const toggleView = (view) => {
    setActiveView(view); // Update active view
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

  const departures = [
    { month: "September-2025", dates: ["27 Sept - 3 Oct", "28 Sept - 4 Oct"] },
    { month: "October-2025", dates: ["4 Oct - 10 Oct", "5 Oct - 11 Oct"] },
  ];

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

  const carouselData = [
    {
      image:
        "https://i.ibb.co/b09Wrfq/34a5a5c3-e772-40e4-9c74-a33c8a53c83f-sandakphu-4.webp",
      title: "Sandakphu Base Camp Adventure",
      buttonText: "Sign up today",
    },
    {
      image:
        "https://i.ibb.co/8LQm8ZhH/45e1898f-449c-4fcd-af36-50ad785f24b7-sandakphu-1.webp",
      title: "Sandakphu Trail Experience",
      buttonText: "Learn more",
    },
    {
      image: "https://i.ibb.co/wZY2sGKj/image-2025-06-04-172332099.png",
      title: "Snowstacked Peaks",
      buttonText: "Browse gallery",
    },
  ];

  return (
    <div className="trek-carousel-container">
      {/* Bootstrap Carousel */}
      <div
        id="myCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            className="active"
            aria-current="true"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
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
                <div
                  className={`carousel-caption ${
                    i === 0 ? "text-start" : i === 2 ? "text-end" : ""
                  }`}
                >
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

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Icon Section */}
      <section className="icon_sec">
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-8">
              <div className="row">
                {[
                  {
                    src: "https://i.ibb.co/ZR7LWM3r/kalimantan-map-icon-illustration-design-vector.jpg",
                    label: "Region",
                    value: "West Bengal | India",
                  },
                  {
                    src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
                    label: "Duration",
                    value: "7 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "12000 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "68 KM",
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

            {/* Right Column */}
            <div className="col-md-4">
              <div className="column4">
                <h6>Get in Touch with Our Trek Expert</h6>
                <a href="tel:+91 7351523841">
                  <i className="fa fa-phone"></i> +91 7351523841
                </a>
                <a href="mailto:info@trekthehimalayas.com">
                  <i className="fa fa-envelope"></i> info@trekthehimalayas.com
                </a>
                <br />
                <i className="far fa-clock"></i> Monday - Saturday: 10 AM to 06
                PM (GMT +5:30)
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
                      $<span id="converted-price">157.52</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹13,500
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
                        <strong>
                          USD 1500 +5% GST for Non-Indians and OCI card holders
                        </strong>
                      </li>
                    </div>
                    <li>5% GST will be applicable on Trek Cost and Add-ons</li>
                    <li>Services Sepi to Sepi.</li>
                    <li>
                      Meeting Point( Pickup/ Drop Point ): New Jalpaiguri
                      Railway Station
                    </li>
                    <li>Reporting Time: 10:00 am</li>
                    <li>
                      For trekkers staying in Darjeeling, the pickup point is
                      Sukia Pokhari, near HDFC Bank Ltd, about 18 km from
                      Darjeeling. TTH vehicle will arrive around 12:00 PM.
                    </li>
                    <li>
                      Drop Time: 6:00 pm to 7:00 pm (Timings are subject to
                      change based on weather and road conditions). Please reach
                      New Jalpaiguri a day before to avoid any delays.
                    </li>
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
                        Cost &amp; Cancellation Terms
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
      <section className="overview   " id="tab1-content">
        <h2>Overview</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4 overview-bg">
              <p>
                <b>Trek Name:</b> Sandakphu Trek
              </p>
              <p>
                <b>Days:</b> 7
              </p>
              <p>
                <b>Adventure Type:</b> Trekking
              </p>
              <p>
                <b>Base Camp:</b> Sepi
              </p>
              <p>
                <b>Season:</b> Spring <span>|</span> Winter{" "}
              </p>
              <p>
                <b>Month:</b> March <span>|</span> April <span></span>{" "}
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> India
              </p>
              <p>
                <b>Altitude:</b> 12000 Ft.
              </p>
              <p>
                <b>Grade:</b> Moderate
              </p>
              <p>
                <b>Rail Head:</b> New Jalpaiguri (NJP)
              </p>
              <p>
                <b>Stay:</b> Tea House(Separate for male & Female)
              </p>
              <p>
                <b>Food:</b> Meals while on trek & at tea houses (Veg & Eggs)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> West Bengal
              </p>
              <p>
                <b>Distance:</b> 68 Km.
              </p>
              <p>
                <b>Trail Type:</b> Cross over trail | Start in one valley,
                traverse the pass, and ends in another valley.
              </p>
              <p>
                <b>AirPort:</b> Bagdogra International Airport, which is 20 km
                away from New Jalpaiguri Railway station
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="participate" id="tab2-content">
        <h2>Who Can Participate</h2>
        <div class="whocan">
          <ul>
            <li>
              <strong>Age Requirement:</strong>
              <ul>
                <li>Minimum 12 years</li>
              </ul>
            </li>
            <li>
              First-timers are welcome, though prior trekking experience is
              preferred. Good fitness is a must.
            </li>
            <li>
              <strong>Fitness Criteria:</strong>
              <ul>
                <li>
                  The Trekker should have sufficient stamina to cover 5 km of
                  distance in 30 minutes without stress or 10 km of distance by
                  jogging in 70 minutes without stress.
                </li>

                <li>
                  If the trekker prefers cycling he/ she should be able to cycle
                  20 km of distance in 55 minutes.
                </li>
                <li>
                  Preparation Chart
                  <a href="/uploads/pdf/tbxzspxk.lxy_Exercises-For-Difficult-Treks.webp">
                    <u>view</u>
                  </a>
                  <a href="/uploads/pdf/tbxzspxk.lxy_Exercises-For-Difficult-Treks.webp">
                    <u>download</u>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              If the trekker wants to carry a backpack then he/she should be
              able to carry a 10-12 kg backpack. If opt Off-load option then the
              Trekker should be able to carry 3-5 kg backpack.
            </li>
            <li>
              If a trekker's BMI is more or less than the normal range (18-26),
              please consult our Trek Coordinator before booking.
            </li>
          </ul>
        </div>
      </section>
      <section
        className="itinerary shadow-lg p-3 mb-5 bg-body rounded"
        id="tab3-content"
      >
        <h2>Sandakphu Trek Itinerary</h2>
        <button
          className="btn-quick"
          onClick={() => toggleView("Quick Itinerary")}
        >
          Quick Itinerary
        </button>
        <button
          className="btn-detailed"
          onClick={() => toggleView("Detailed Itinerary")}
        >
          Detailed Itinerary
        </button>
        <button className="btn-graph" onClick={() => toggleView("Graphs")}>
          Graphs
        </button>

        {/* Render the content based on activeView */}
        {activeView === "Quick Itinerary" && (
          <div id="quickItinerary">
            <h3>Day-1: Drive from NJP to Sepi</h3>
            <ul>
              <li>Altitude(Sepi): 6,400 ft.</li>
              <li>Drive Distance: 130 km | 7 hrs.</li>
            </ul>
            <h3>Day-2: Sepi to Samanden via Ramam</h3>
            <ul>
              <li>Altitude(Gorkhey): 7,500 ft.</li>
              <li>Trek Distance: 14-15 km | 7-8 hrs.</li>
            </ul>
            <h3>Day-3: Samanden to Phalut via Gorkhey</h3>
            <ul>
              <li>Altitude(Phalut) – 3500 m/11500 ft.</li>
              <li>Trek Distance – 15 Km | 7-8 hrs.</li>
            </ul>{" "}
            <h3>Day-4: Phalut To Thokum</h3>
            <ul>
              <li>Altitude(Thokam): 3415 m/ 11200 ft.</li>
              <li>Trek Distance: 11-12 Km | 6-7 hrs.</li>
            </ul>
            <p></p> <h3>Day-5: Thokum To Aal</h3>
            <ul>
              <li>Altitude(Aal) – 3500 m/ 11600 ft.</li>
              <li>Trek Distance – 9-10 Km | 4-5 hrs.</li>
            </ul>
            <h3>Day-6: Aal To Timburey via Sandakphu</h3>
            <ul>
              <li>Altitude(Sandakphu): 3650 m/ 11900 ft.</li>
              <li>Altitude(Timburey): 2100 m/ 6800 ft.</li>
              <li>Trek Distance: 14 Km | 7-8 hrs.</li>
              <p></p>{" "}
            </ul>
            <h3>Day-7: Timburey To Srikhola And Drive To NJP</h3>
            <ul>
              <li>Altitude(Srikhola): 1920 m/ 6300 ft.</li>
              <li>Trek Distance(Timburey - Srikhola): 3 km |1 hrs.</li>
              <li>Drive Distance: 130 Km | 7 hrs.</li>
            </ul>{" "}
            <p>
              <strong>Note:</strong> Weather conditions may cause flight
              cancellations. Delays are possible any time of the year but are
              more typical on summer departures. Keep{" "}
              <strong> 3-4 buffer days</strong> .
            </p>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {[
              "Day 1",
              "Day 2",
              "Day 3",
              "Day 4",
              "Day 5",
              "Day 6",
              "Day 7",
            ].map((day) => (
              <button
                key={day}
                className={`tablinks ${activeDay === day ? "active" : ""}`}
                onClick={() => openDay(day)}
              >
                {day}
              </button>
            ))}
            {/* Render the content for the selected day */}
            <div className="container tabcontent" id={activeDay}>
              {/* Content for each day goes here, you can conditionally render based on activeDay */}
              {activeDay === "Day 1" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Drive from NJP to Sepi</h3>
                      <ul>
                        <li>
                          <b>Altitude:</b> 6,400 ft.
                        </li>
                        <li>
                          <b>Accommodation:</b> Hotel
                        </li>
                        <li>
                          <b>Drive Distance:</b> 130 km | 7 hrs
                        </li>
                      </ul>
                      <p>
                        Your journey to the beautiful Sandakphu will begin
                        today. Today you will be driven towards Sepi, which is
                        the base camp for the Sandakphu- Phalut trek. It is an
                        uphill drive of about 130 kilometers to the base camp
                        and takes about 7 hours. You will be passing through the
                        native tea estates of Darjeeling and Sikkim as you drive
                        towards Sepi. You must try momo and Thukpa, which are
                        very delicious and simply mouth watering.
                      </p>

                      <p>
                        En route, your first stop would be Mirk, which is also a
                        popular tourist destination in West Bengal. The
                        picturesque and quaint hill station is located near the
                        serene hills of the Darjeeling district. The climate and
                        natural beauty of Mirik attract a lot of tourists here.
                        We will reach Mirik at around 1 pm. There we will have
                        our lunch. There you can try local delicacies, they are
                        simply great. Breakfast and lunch are not included in
                        the trek cost, however we will pause for meals.
                      </p>
                      <p>
                        After lunch, we will resume our journey again towards
                        Sepi, which is a pretty campsite. On your way to Sepi
                        you will also cross many other charming villages, the
                        more you travel uphill, the more tranquil it becomes
                        with a quiet environment.
                      </p>
                      <p>
                        You will stay in a homestay for the night, as you reach
                        there you can freshen up, stroll around for short walks
                        and then have dinner and rest for the following day.
                      </p>
                      <img
                        title="sandakphu Base Camp Trek Day 1 Itinerary"
                        src="/images/HomePageImages/Desktop/77d2d5eb-4079-4afe-866c-19bf5fb84bf4_EBC-Day-1.webp"
                        alt="sandakphu Base Camp Trek Day 1 Itinerary"
                      ></img>
                    </div>
                  }{" "}
                </div>
              )}
              {activeDay === "Day 2" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Sepi to Samanden via Ramam</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong> 7,500 ft.
                        </li>

                        <li>
                          <strong>Trek Distance:</strong> 14-15 km | 7-8 hrs
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tea House
                        </li>
                      </ul>

                      <p>
                        It's the second day of your journey. When you wake up,
                        have a warm delicious breakfast and lace up your
                        trekking boots, today we are going to start our trek
                        towards Sandakphu. Starting the day early, it is a
                        considerably easy walk to Ramam with a gradual ascent
                        and some steep sections. Maintain a steady pace and keep
                        taking short breaks if needed. Ramam is approximately
                        3.5 kilometers away from the Sepi campsite.
                      </p>
                      <p>
                        The trail here is a constructed route for most parts and
                        you will notice several cut fields and tiny dwellings on
                        the way. Take a short break at Ramam if you need and
                        then we can head towards Samanden.
                      </p>
                      <p>
                        As you move out of Ramam, the trails become more quiet
                        with the huts disappearing and the forest trails opening
                        up. Walking through the quiet forest with the sound of
                        nature all around you is a great experience in itself.
                        The Singalila Range is quite popular for its abundance
                        of greenery and you can now feel the same. For about 6
                        kilometers you will traverse through the forests until
                        you arrive at a bridge.
                      </p>
                      <p>
                        After the bridge, it is a steep climb for 15 minutes or
                        so, following which you will arrive at a zone where
                        there are stone benches, each dedicated to locals who
                        have passed away. The locals made these benches with the
                        intention that those who have passed away can serve the
                        passerby even after their death by providing them with a
                        place to rest.
                      </p>
                      <p>
                        From here the trail begins to ease out a bit, then you
                        will arrive at a clearing dotted with wooden huts and
                        farmlands. This is the beautiful Samaden village.
                        Samaden has a very picturesque setting and the locals
                        here are very friendly. You will be greeted with
                        incredible hospitality, you can chat with the locals and
                        hear interesting stories.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/a95197d9-0e92-4fb0-8ba2-51f431e7a088_EBC-Day-2.webp"
                        alt="sandakphu Base Camp Trek Day 2 Itinerary"
                        title="sandakphu Base Camp Trek Day 2 Itinerary"
                      ></img>
                    </div>
                  }{" "}
                </div>
              )}
              {activeDay === "Day 3" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Samanden to Phalut via Gorkhey</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong> 3500 m / 11500 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 15 km | 7-8 hrs
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tea House
                        </li>
                      </ul>
                      <p>
                        Today we will begin early in the morning and trek from
                        Samaden to Phalut. It is about 15 kilometers of trek and
                        might take around 8 hours.
                      </p>
                      <p>
                        You can have a warm breakfast at the teahouse, then
                        begin with trekking. From Samaden a few kilometers ahead
                        is Gorkhey. There you can see the Gorkhey Khola that
                        flows through the village of Gorkhey after which it is
                        named. Crossing the picturesque setting we will head
                        towards Phalut.
                      </p>
                      <p>
                        You will again cover long sections of forested trails
                        today, be prepared as you will have to continue
                        ascending for a long distance, and at some points, the
                        ascent can be pretty steep. While trekking through the
                        forested path you would spot many Oak and Rhododendron
                        trees. Maintain a steady pace along the trek, keep
                        taking short breaks and stay hydrated.
                      </p>
                      <p>
                        Phalut is one of the highest points of the Singalila
                        Range, and the second highest point after the Sandakphu
                        ridge. On your way to Phalut you will get to see the
                        Singalila Range closely and you can get a stunning view
                        of the Kanchenjunga. The closer you get to Phalut the
                        more beautiful the landscape gets.
                      </p>
                      <p>
                        As you reach Phalut, you can have a delicious dinner,
                        then rest. Keep in mind that Phalut does not have
                        electricity, so keep extra batteries and power banks
                        with you for your gadgets.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/7b6db2cf-95dd-4622-bfe9-71d4c7f9ee24_EBC-Day-3.webp"
                        alt="sandakphu Base Camp Trek Day 3 Itinerary"
                        title="sandakphu Base Camp Trek Day 3 Itinerary"
                      ></img>
                    </div>
                  }{" "}
                </div>
              )}
              {activeDay === "Day 4" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Phalut To Thokum</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>3415 m / 11200 ft
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 11-12 km | 6-7 hrs
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tea House
                        </li>
                      </ul>
                      <p>
                        Today, we will trek towards Thokum from Phalut. We will
                        begin trekking in the morning after breakfast. If you
                        didn't know, Thokum campsite is located in Nepal, so we
                        will be skirting the Indo- Nepal border into Nepal.
                        Thokum is a beautiful campsite that falls on the way to
                        Sandakphu between Sabargram and Sandakphu. The valley
                        has a very soothing and relaxing vibe with beautiful
                        meadows and a picturesque setting.
                      </p>
                      <p>
                        On your way to Thokum, you might spot a few yaks and
                        cross a few meadows, then you would have crossed the
                        Indo-Nepal border and would be in Nepal. Although it is
                        a remote and unknown location, the views here are
                        stunning and extremely admirable. The route to Thokum is
                        also lined with a thicket of Rhododendron trees that
                        remain covered in snow during the winters.
                      </p>
                      <p>
                        From Thokum, several routes branch into Nepal, and you
                        can witness the sleeping Buddha formation in the
                        backdrop as you cross some abandoned huts and cattle
                        grounds. This will be your campsite for the night, we
                        will stay in a tea house here, have dinner, and then
                        rest for the next day's trekking.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="sandakphu Base Camp Trek Day 4 Itinerary"
                        title="sandakphu Base Camp Trek Day 4 Itinerary"
                      ></img>
                    </div>
                  }{" "}
                </div>
              )}
              {activeDay === "Day 5" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Thokum To Aal</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>3500 m / 11600 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 9-10 km | 4-5 hrs
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tea House
                        </li>
                      </ul>
                      <p>
                        Today we will trek from Thokum to Aal, which is about a
                        10 km walk. From Thokum, you will have to take the route
                        that branches into the southwest direction towards Aal.
                        Aal is the closest campsite to the Sandakphu summit and
                        is situated at a scenic location. Today's trek is not as
                        tiring as other days and the trail is comparatively
                        easier. A few kilometers ahead of Thokum lies the Aal
                        campsite, which offers a very beautiful view of the
                        Kanchenjunga ranges and the adjacent peaks. On a clear
                        day, you can also see the Sleeping Buddha formation.
                      </p>
                      <p>
                        Enjoy a hot lunch at the Aal campsite today and you have
                        the evening to spend at your leisure exploring the area.
                        You will still be in the Nepal territory and as you move
                        towards Sandakphu you will again move to Indian
                        territory. You will stay in a Tea house in Aal and you
                        can see the beautiful Himalayan views from here. At
                        night you can have a warm dinner and rest well, tomorrow
                        we will move towards Sandakphu.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="sandakphu Base Camp Trek Day 5 Itinerary"
                        title="sandakphu Base Camp Trek Day 5 Itinerary"
                      ></img>
                    </div>
                  }{" "}
                </div>
              )}
              {activeDay === "Day 6" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Aal To Timburey via Sandakphu</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>3650 m / 11900 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 14 km | 7-8 hrs
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tea House
                        </li>
                      </ul>
                      <p>
                        Today we will trek from Aal to Sandakphu and then to
                        Timburey. The distance from Aal to Timburey is about 14
                        Kilometers.
                      </p>
                      <p>
                        We will begin early in the morning so that you can
                        witness the majestic sunrise from the top of the
                        Sandakphu. As we start from Aal after 3 kilometers we
                        will reach Sandakphu.
                      </p>
                      <p>
                        This will be one of the most scenic experiences you will
                        have throughout the trek, the first rays of the sun over
                        the snow capped sleeping Budhha cover it in an
                        alpenglow, the sun appears as if it is rising from above
                        the clouds. The sight is once in a lifetime, and the
                        beauty is difficult to describe in words.
                      </p>
                      <p>
                        You can click beautiful pictures and spend some time
                        there, then we will head towards Timburey, our next
                        campsite. From Sandakphu it is about 10 kilometers to
                        Timburey and might take around 5 hours to complete the
                        trek. As you head towards Timburey, Gurdum is the first
                        Himalayan village that you will come across. Gurdum is a
                        postcard- perfect village with only 4-5 dwellings. It is
                        one of the remote Himalayan villages. Surrounded by
                        forests and mountains, Gurdum also offers a private stay
                        for tourists in its scenic setting.
                      </p>
                      <p>
                        From here Timburey is quite close, after trekking for
                        another few kilometers you will arrive at Timburey. It
                        will be the campsite for the night. There are also a
                        couple of home stays here and we will stay at one of the
                        local houses.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="sandakphu Base Camp Trek Day 6 Itinerary"
                        title="sandakphu Base Camp Trek Day 6 Itinerary"
                      ></img>
                    </div>
                  }{" "}
                </div>
              )}
              {activeDay === "Day 7" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Timburey To Srikhola And Drive To NJP</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>1920 m / 6300 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 3 km | 1 hr
                        </li>
                        <li>
                          <strong>Drive distance:</strong> 130 km | 7 hrs
                        </li>
                      </ul>
                      <p>
                        Today will be the last day of your trekking and also the
                        last day in the mountains too. Your beautiful journey to
                        Sandakphu ends today. After breakfast we will start
                        trekking towards Shrikhola. It is a 3 kilometers descent
                        to Srikhola and might take up to an hour.
                      </p>
                      <p>
                        Once we reach Srikhola road, we will head to Sepi by
                        drive to collect our left luggage then we will drive you
                        back to NJP railway station. We will drive back from the
                        same roads that we came with, you will return with a lot
                        of memories and adventures from the mountains. After
                        reaching NJP in the evening, then you can continue with
                        your further journey.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="sandakphu Base Camp Trek Day 7 Itinerary"
                        title="sandakphu Base Camp Trek Day 7 Itinerary"
                      ></img>
                    </div>
                  }{" "}
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
