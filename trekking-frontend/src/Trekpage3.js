import React, { useState } from "react";
import { startRazorpayPayment } from "./utils/razorpayutil";
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
    { month: "June-2025", dates: ["14 Jun - 20 Jun", "23 Jun - 29 Jun"] },
    { month: "August-2025", dates: ["10 Aug - 16 Aug", "20 Aug - 26 Aug"] },
  ];

  const carouselData = [
    {
      image:
        "https://i.ibb.co/13Fg5WB/fd5f0bbe-a316-45b0-9103-d51e419a0bff-1.webp",
      title: "Markha Valley Base Camp Adventure",
      buttonText: "Sign up today",
    },
    {
      image:
        "https://i.ibb.co/fzVBqJVy/35d55b0a-b5df-408e-8aa1-c597473ad87b-3.webp",
      title: "Markha Valley Trail Experience",
      buttonText: "Learn more",
    },
    {
      image:
        "https://i.ibb.co/Kjm5FY96/fb65d1e6-410e-459f-bc56-7c914aa07f87-4.webp",
      title: "Beautiful Peaks",
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
                    value: "Ladakh | India",
                  },
                  {
                    src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
                    label: "Duration",
                    value: "7 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "17300 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "59 KM",
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
                      $<span id="converted-price">236.28</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹20,250
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
                    <li>Services Leh to Leh | Included Transport.</li>
                    <li>Reporting Time: 10:00 am</li>
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
                <b>Trek Name:</b> Markha Valley Trek
              </p>
              <p>
                <b>Days:</b> 7
              </p>
              <p>
                <b>Adventure Type:</b> Trekking
              </p>
              <p>
                <b>Base Camp:</b> Leh
              </p>
              <p>
                <b>Season:</b> Spring <span>|</span> Winter{" "}
              </p>
              <p>
                <b>Month:</b> June <span>|</span> August <span></span>{" "}
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> India
              </p>
              <p>
                <b>Altitude:</b> 17300 Ft.
              </p>
              <p>
                <b>Grade:</b> Moderate
              </p>
              <p>
                <b>Rail Head:</b> Manali is the nearest rail head to the base
                camp (NJP)
              </p>
              <p>
                <b>Stay:</b> Camping (Twin sharing) & Hotel/Guesthouse (Separate
                for male & Female)
              </p>
              <p>
                <b>Food:</b> Meals while on trek (Veg + Egg)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Ladakh
              </p>
              <p>
                <b>Distance:</b> 59 Km.
              </p>
              <p>
                <b>Trail Type:</b> Cross over trail | Start in one valley,
                traverse the pass, and ends in another valley.
              </p>
              <p>
                <b>AirPort:</b> Leh (Kushok Bakula Rimpochee)
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
        <h2>Markha Valley Trek Itinerary</h2>
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
            <h3>Day-1: Arrival in Leh</h3>
            <ul>
              <li>Altitude: 3,500 m/ 11,500 ft.</li>
              <li>
                Markha Valley Trek is of 7 days and the highest altitude is of
                17,100 ft. If you are looking for more challenging adventure in
                Leh try out the Twin Peaks Expedition. You can go for either
                Kang Yatse II or Dzo Jongo Peak as well.
              </li>
            </ul>
            <h3>Day-2: Acclimatization in Leh</h3>
            <ul>
              <li>Acclimatization and sightseeing in Leh.</li>
              <li>Can visit monasteries: Shey, Thiksey, Sangam, and Hemis.</li>
            </ul>
            <h3>Day-3: Drive Leh to Skiu then trek to Sara</h3>
            <ul>
              <li>Altitude: Skiu- 3,400 m/ 11,150 ft.</li>
              <li>Trek Distance – 70 km | 2-3 hrs.</li>
            </ul>{" "}
            <h3>Day-4: Sara to Markha</h3>
            <ul>
              <li>Altitude: Markha- 3,700 m/ 12,200 ft.</li>
              <li>Trek Distance: 10 km | 5-6 hours</li>
            </ul>
            <p></p> <h3>Day-5: Markha To Hankar</h3>
            <ul>
              <li>Altitude: 4,100m/ 13,400 ft.</li>
              <li>Trek Distance: 13 km | 7 - 8 hrs.</li>
            </ul>
            <h3>Day-6: Hankar To Nimaling</h3>
            <ul>
              <li>Altitude: 4,800 m/ 15,800 ft.</li>
              <li>Trek Distance: 12 km | 7 - 8 hrs.</li>
              <p></p>{" "}
            </ul>
            <h3>Day-7: Nimaling To Chokdo via Kongmaru La And Drive To Leh</h3>
            <ul>
              <li>
                Altitude: Kong Maru La - 5,200 m/ 17,300 ft | Chokdo - 3,900 m/
                12,900 ft.
              </li>
              <li>Trek Distance: 13 km | 7 - 8 hrs.</li>
              <li>Drive to Leh: 60 km | 3 hrs</li>
            </ul>{" "}
            <p>
              <strong>Note:</strong> Keep a buffer day in your travel plan. If
              buffer day is not used in the travel then it can be used to
              Explore Leh. Read the article Things to do in Leh. Distance,
              Altitude, and Trekking hours are approximate and rounded off. Keep
              the original and copy of ID proof handy. Come one day early if
              planning to come by flight. <strong> 3-4 buffer days</strong> .
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
                      <h3> Arrival in Leh</h3>
                      <ul>
                        <li>
                          <b>Altitude:</b> 3,500 m/11,500 ft.
                        </li>
                      </ul>
                      <p>
                        Markha Valley trek begins from Leh. Arrive in Leh by
                        flight or train. Take it slowly once you arrive in Leh.
                        Since it is at the hazardous height of 11,500 ft direct
                        landing at this height may trigger AMS. Make sure you
                        rest well and do not strain your body during your stay
                        in the hotel. Leh has gained popularity as the adventure
                        capital of India. It is quite famous amongst wanderers,
                        which you can see as you roam here and there.
                      </p>

                      <p>
                        Cafes are loaded here which are hanging out places for
                        adventurers. There is a good network connection in Leh
                        and there are ATMs. Leh is a good option to fill up your
                        things to carry list if you have forgotten any item.
                        Although cafes are in close vicinity, try to stay away
                        from alcohol and avoid smoking. Apart from that, Leh is
                        also known for monasteries, palaces, and temples. Make
                        sure to visit them as you enjoy your small treat in Leh.
                        You can also explore the local market in Leh and try the
                        local cuisine. Staying outdoors will help you
                        acclimatize to the altitude. Reserve the evening for
                        rest. Sleep well and let your body acclimatize to the
                        altitude.
                      </p>

                      <img
                        title="markha valley Base Camp Trek Day 1 Itinerary"
                        src="/images/HomePageImages/Desktop/77d2d5eb-4079-4afe-866c-19bf5fb84bf4_EBC-Day-1.webp"
                        alt="markha valley Base Camp Trek Day 1 Itinerary"
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
                      <h3> Acclimatization in Leh</h3>
                      <ul>
                        <li>Acclimatization and sightseeing in Leh.</li>

                        <li>
                          Can visit monasteries: Shey, Thiksey, Sangam, and
                          Hemis.
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Hotel
                        </li>
                      </ul>

                      <p>
                        This is an extra day added to the itinerary to help you
                        get acclimatized better. Therefore utilize this day and
                        try to stay outdoors. Acclimatization days in our treks
                        are used to give your body time to adjust to the
                        thinning air at high-altitude conditions. Several
                        changes occur in your body while trekking in
                        high-altitude regions and the purpose of acclimatization
                        is to allow your body to operate optimally in a
                        decreased oxygen level environment.
                      </p>
                      <p>
                        Leh is a major hub for adventure as well as a culturally
                        rich center. It presents innumerable opportunities for
                        sightseeing starting from the monasteries and temples,
                        the local market as well as many places serving
                        delicious local cuisine. Today, you can hike up to the
                        Shey Palace, Thiksey Monastery, and Thiksey Gompa to
                        experience the Buddhist culture. Thiksey Gompa is the
                        largest in central Ladakh, located on a hill. Avoid
                        gaining height by hiking to nearby passes or valleys.
                        This is only to avoid stressing your body, as it may
                        hinder the process of acclimatization.
                      </p>
                      <p>
                        Additionally, you can interact with the locals and
                        fellow travellers to gain some knowledge about the
                        adjacent areas. Roam in the Leh city and the Leh Bazaar.
                        You can collect souvenirs from a variety of shops. You
                        must spend the sunset at the Shanti Stupa, which is
                        known for its dazzling lights in the evening. Say
                        goodbye to the wonderful Leh and rest in your hotel.
                        Your actual trekking day begins tomorrow.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/a95197d9-0e92-4fb0-8ba2-51f431e7a088_EBC-Day-2.webp"
                        alt="markha valley Base Camp Trek Day 2 Itinerary"
                        title="markha valley Base Camp Trek Day 2 Itinerary"
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
                      <h3> Drive Leh to Skiu then trek to Sara</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong> 3,400 m/ 11,150 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 11 km | 5-6 hrs.
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tent
                        </li>
                      </ul>
                      <p>
                        Today unfolds a new part of your trek, bringing you
                        closer to the essence of your adventure. This long yet
                        captivating day promises an array of great experiences
                        as you trek through skillfully paved roads and
                        landscapes. Along the way, you'll pass military camps
                        adorned with large rocks, adding to the rugged charm of
                        the route.
                      </p>
                      <p>
                        Keep an eye out for iconic landmarks. Gurudwara Pathar
                        Sahib on one side and Magnet Hill on the other side. You
                        will get to see the Stok range during your journey until
                        you reach Hemis National Park.
                      </p>
                      <p>
                        Your first highlight of the day is Sangam, where the
                        Indus and Zanskar rivers meet in a mesmerizing
                        confluence. Both rivers, with their distinct
                        bottle-green hues, merge seamlessly in a display of
                        natural elegance. From here you will turn towards
                        Chilling, and the landscapes will change magically, the
                        open terrains beside the road will slowly turn into
                        stunning valleys. The valleys are beautiful with shades
                        of purple, black and gray. Juniper and other trees will
                        border the route as you cross the Zanskar river over
                        green iron bridges and get closer to Skiu.
                      </p>
                      <p>
                        You will begin trekking from Skiu, as you start, the
                        trail is quite evident and well-paved. You might also
                        spot birds and animals, as Markha valley harbors
                        enormous wildlife. Magpie birds can be spotted easily.
                        As you trek, the Markha river will accompany you and
                        after some time walk you will spot a cafe. You can take
                        a short break here and then again get back on the
                        trails. Along the trek, you will cross the Markha river
                        a few times, passing through winter settlements with
                        Lhatos (religious shrines) and Mani walls (stone walls
                        with prayer inscriptions). You can also witness fields
                        of Barley and wheats and little patches of greenery
                        around the river banks.
                      </p>
                      <p>
                        After hours of trekking from Nagding village, you'll
                        arrive at Sara village, marked by a grand entrance
                        adorned with skeletons of wild animals like yaks and
                        sheep. These skulls, seen as symbols of pride by the
                        locals, make for a striking first impression. Sara
                        village is rich in heritage, featuring an ancient
                        monastery, a historic castle, and lush wheat
                        plantations. As the day winds down, relish a warm and
                        hearty meal before retreating to your tents. Don't miss
                        the opportunity to gaze at the night sky, studded with
                        countless shimmering stars, a perfect way to end the
                        day.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/7b6db2cf-95dd-4622-bfe9-71d4c7f9ee24_EBC-Day-3.webp"
                        alt="markha valley Base Camp Trek Day 3 Itinerary"
                        title="markha valley Base Camp Trek Day 3 Itinerary"
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
                      <h3> Sara to Markha</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>3,700 m/ 12,200 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 10 km | 5-6 hours.
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tent
                        </li>
                      </ul>
                      <p>
                        Today, start your day with a beautiful morning in the
                        mountains. Have a warm breakfast with a view, then get
                        ready for the trekking day ahead. The trail from the
                        campsite is quite similar to the previous day. After
                        crossing a few small water bodies and trekking through
                        barren land and cold desert, you will arrive at Chalak
                        village. The village comes after crossing a wooden
                        bridge. Here you can see beautiful tea houses, and the
                        village also has houses placed in small hills with stone
                        protection shelters for domestic animals at the base.
                        You can pause here for a short while, engage in
                        conversation with the locals and re-energize yourself.
                        Here in the village you can also see green fields,
                        primarily planted with wheat, surrounded by barren lands
                        and towering mountains. From Chalak, it is a gradual
                        ascent up towards Markha and you will pass by the
                        section of trail marked by Bharal horns.
                      </p>
                      <p>
                        As you trek towards Markha, at every small distance you
                        can find Mani stones laid around white stupas. These
                        stones are engraved with Buddhist prayers, some of them
                        in Sanskrit language too. Be humble around these
                        historic symbols, also do not touch them as the
                        villagers believe that these stones are protected by
                        some powers, and any harm to them will cause harm to
                        that person. Make sure to take in the ancient ruins that
                        dot the valley, each one echoing with the rich history
                        of the region. These ruins can be identified by flags
                        atop small temples, marking their significance in the
                        landscape.
                      </p>
                      <p>
                        Here you will have to cross a running stream of Markha
                        river to reach the Markha village. Crossing the river
                        can slightly be tough when the water is thigh-high. It
                        is better to take off your shoes and socks and pull up
                        your pants to cross the river. The cold water will
                        surely bring back your energy and within 20 minutes of
                        more trekking, you will already be able to spot the
                        hamlet of Markha. Markha is the largest village in the
                        entire valley with some beautiful houses scattered
                        around. You can also visit the monastery here and see
                        the ruins of Markha fort. Markha will be the end for
                        today's trek and we will camp here for the night.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="markha valley Base Camp Trek Day 4 Itinerary"
                        title="markha valley Base Camp Trek Day 4 Itinerary"
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
                      <h3> Markha To Hankar</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>4,100m/ 13,400 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 13 km | 7 - 8 hrs.
                        </li>
                      </ul>
                      <p>
                        Take the most advantage of the innocence of the salient
                        villages because today will probably be the last
                        habitats on the route. Today is one of the most
                        beautiful days of trekking and the views start opening
                        up as you traverse the upper Markha Valley. The trail is
                        beautiful and refreshing when it merges with flowing
                        rivers and streams. These water bodies can also be
                        crossed over a bridge. Umlung village is a small village
                        and will serve as the last teahouse of the trek with yet
                        another serene monastery to your sight.
                      </p>
                      <p>
                        After Umlung you can get the first sight of Mt. Kang
                        Yatse(6400m). It seems as if the peak is calling you!
                        Follow its voice, again overcome the river several times
                        and enter the Hankar village. Try to spot the magically
                        placed Tacha monastery on a mountain. It is the last
                        hamlet of the trek and your refuge place.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="markha valley Base Camp Trek Day 5 Itinerary"
                        title="markha valley Base Camp Trek Day 5 Itinerary"
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
                      <h3> Hankar To Nimaling</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>4,800 m/ 15,800 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 12 km | 7 - 8 hrs.
                        </li>
                      </ul>
                      <p>
                        Get all enthusiastic, after yesterday's tough trek,
                        today will be an easy and short trek. Start walking and
                        in 1 km you will find diversions or paths separating
                        out. The other route goes to Rupshu and Zanskar. Keep
                        walking on the left path until a stone bridge. This
                        marks that you are on the right trail. Henceforth, you
                        can see many diversions, please be careful and follow
                        the trek leader/guide. In the next 2 hours, the pastures
                        of Thochuntse become visible. There are camping sites
                        and tea houses here. Thochnugtse also has some lovely
                        green fields which are quite a contrast to the aridness
                        of the desert in Ladakh. Keep walking slowly, enjoying
                        the view. The trail is quite steep for like an hour
                        after which becomes a gradual incline.
                      </p>
                      <p>
                        Try to engulf yourself in nature and move slowly just as
                        you focus on the Kang Yatse peak. The peak seems to grow
                        bigger and bigger. Surprisingly, tranquil twin lakes
                        also come along the path. From the lakes, it is a long
                        and gradual descent to the plateau of Nimaling. The
                        trails enter into a huge grassland after a few fights
                        crossing streams of high altitudes. Sheep, mountain
                        goats, and sometimes rabbits are found grazing at
                        Nimaling. It is a pleasant camping place. It is the
                        highest point you will attain on this trek and being the
                        highest campsite Nimalaing offers spectacular views of
                        the Kang Yatse Peak on the right. There are instances of
                        snowfall at this site hence we prepared for that. Above
                        all that, just try to merge into the high world and
                        sleep in peace.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="markha valley Base Camp Trek Day 6 Itinerary"
                        title="markha valley  Base Camp Trek Day 6 Itinerary"
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
                      <h3>
                        {" "}
                        Nimaling To Chokdo via Kongmaru La And Drive To Leh
                      </h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>Kong Maru La - 5,200 m/
                          17,300 ft | Chokdo - 3,900 m/ 12,900 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 13 km | 7 - 8 hrs.
                        </li>
                        <li>
                          <strong>Drive distance:</strong> 60 km | 3 hrs
                        </li>
                      </ul>
                      <p>
                        This day will be nostalgic and exciting, as this is the
                        last day of the trek landing at the highest pass of the
                        trek. Kongmaru La is visible distinctly from Nimaling on
                        your left. Also, this day will be filled with surprises.
                        Cross the stream near the campsite and then you will
                        have to follow the clear trail to reach the pass. After
                        a strenuous climb of 2 hours to Kongmaru La pass, you
                        will be pleasantly welcomed by the Karakoram Range
                        Mountains and the excellent array of peaks. Hold your
                        breath for the mind-blowing sight of the huge K2
                        Mountain, the second-highest peak in the world. There
                        are prayer flags moving along the wind. To your
                        surprise, there is a good network connection from the
                        pass.
                      </p>
                      <p>
                        The trail then gradually descends, coinciding with
                        villages to say goodbye. The immediate trail from the
                        pass has a steep and narrow descent which later opens to
                        Chikirmo village. The descent can be pretty hard on your
                        knees as it is quite steep. Throughout the route, you
                        can get indulge in the scenery of the Indus Valley and
                        the Ladakh range. After a gradual climb down and rocky
                        terrain, you will reach Chokdo. This is the last stop of
                        the entire trek, which also has many homestays. Get into
                        the pickup vehicle that will take you to Leh.
                      </p>
                      <p>
                        Take a sigh of relief in this village, as your next stop
                        will be the last stop, Leh. The further road is
                        descending showing the monastery and Hemis Gompa. Fill
                        them in your eyes, heart, and mind. Close your eyes to
                        rewind the entire Markha Valley diaries.
                      </p>

                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="markha valley Base Camp Trek Day 7 Itinerary"
                        title="markha valley Base Camp Trek Day 7 Itinerary"
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
