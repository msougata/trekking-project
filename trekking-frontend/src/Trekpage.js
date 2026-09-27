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

  const { everest } = useParams();
  const trekName = "Everest Base Camp Trek";

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

  const handleTravelerFormClose = (travelerInfo = null) => {
    setShowTravelerForm(false);
    
    if (travelerInfo) {
      // User clicked "Proceed to Payment"
      handlePayment(travelerInfo);
    } else {
      // User clicked "Cancel"
      setSelectedDate("");
    }
  };

  const departures = [
    { month: "May-2025", dates: ["17 May - 27 May", "15 May - 25 May"] },
    { month: "December-2025", dates: ["5 Dec - 10 Dec", "20 Dec - 25 Dec"] },
  ];

  const handlePayment = (travelerInfo) => {
    const primaryTraveler = travelerInfo.travelers[0];
    
    startRazorpayPayment({
      name: primaryTraveler.name,
      email: primaryTraveler.email,
      contact: primaryTraveler.phone,
      onSuccess: (response) => {
        // Send details to backend
        fetch("http://localhost:8090/api/booking/payment/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            amount: document.getElementById("inr-price").innerText,
            selectedDate: selectedDate,
            trekName: trekName,
            travelerInfo: travelerInfo
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log("Booking saved:", data);
          alert("Booking confirmed! Your booking ID is: " + data.bookingId);
        })
        .catch(error => {
          console.error("Error saving booking:", error);
          alert("Payment successful but there was an error saving your booking details. Please contact support.");
        });
      },
    });
  };

  const carouselData = [
    {
      image:
        "https://i.postimg.cc/7LbvpsvH/62f4e8f9-0a09-4a32-bb1f-938ca9065ef9-1.webp",
      title: "Everest Base Camp Adventure",
      buttonText: "Sign up today",
    },
    {
      image:
        "https://i.postimg.cc/FzVnf3tC/7b6db2cf-95dd-4622-bfe9-71d4c7f9ee24-EBC-Day-3.webp",
      title: "Himalayan Trail Experience",
      buttonText: "Learn more",
    },
    {
      image:
        "https://i.postimg.cc/T3v2rXWz/2ddd325e-e2c9-4483-86bb-133e4f342d63-3.webp",
      title: "Sunrise on the Peaks",
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
                    value: "Kathmandu | Nepal",
                  },
                  {
                    src: "https://i.ibb.co/6JwXnMFG/eps10-vector-red-long-life-time-durable-icon-concept-design-template-web-isolated-white-401257-449.jpg",
                    label: "Duration",
                    value: "13 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "18,200 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "112 KM",
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
                      $<span id="converted-price">795.53</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹68,000
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
                trekName={trekName}
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
                    <li>Services from Kathmandu to Kathmandu.</li>
                    <li>Lukla flight &amp; Stay in Kathmandu included.</li>
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
                <b>Trek Name:</b> Everest Base Camp Trek
              </p>
              <p>
                <b>Days:</b> 13
              </p>
              <p>
                <b>Adventure Type:</b> Trekking
              </p>
              <p>
                <b>Base Camp:</b> Kathmandu
              </p>
              <p>
                <b>Season:</b> Spring <span>|</span> Summer <span>|</span>{" "}
                Autumn
              </p>
              <p>
                <b>Month:</b> March <span>|</span> April <span>|</span> May{" "}
                <span>|</span> October <span>|</span> November
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> Nepal
              </p>
              <p>
                <b>Altitude:</b> 18,200 Ft.
              </p>
              <p>
                <b>Grade:</b> Difficult
              </p>
              <p>
                <b>Rail Head:</b> Kathmandu is not connected to any Railways
              </p>
              <p>
                <b>Stay:</b> Hotel and teahouse
              </p>
              <p>
                <b>Food:</b> Meals while on trek &amp; at Hotel/Guesthouse (Veg
                &amp; Eggs)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Kathmandu
              </p>
              <p>
                <b>Distance:</b> 112 Km
              </p>
              <p>
                <b>Trail Type:</b> Circle trail | Camping in various locations,
                starting and ending at the same point.
              </p>
              <p>
                <b>AirPort:</b> Kathmandu (Tribhuvan International Airport)
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
                <li>Minimum 16 years</li>
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
        <h2>Everest Base Camp Trek Itinerary</h2>
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
            <h3>Day-1: Arrive At Kathmandu</h3>
            <ul>
              <li>Altitude Kathmandu: 1,300 m/ 4,300 ft.</li>
            </ul>
            <h3>
              Day-2: Drive from Kathmandu to Ramechaap then Fly to Lukla and
              Trek To Phakding
            </h3>
            <ul>
              <li>Altitude</li>
              <ul>
                <li>Lukla: 2,800 m/ 9,200 ft.</li>
                <li>Phakding: 2,600 m/ 8,500 ft.</li>
              </ul>
              <li>Trek Distance (Lukla to Phakding): 7 km | 4-5 hrs.</li>
            </ul>
            <h3>Note:</h3>
            <p>
              Flights to Lukla are prone to delay due to weather, keep{" "}
              <strong> 3-4 buffer days </strong> in your plan.
            </p>{" "}
            <h3>
              Day-3: Trek from Phakding To Namche Bazaar | A Major Trading Hub
              In Khumbu
            </h3>
            <ul>
              <li>
                Altitude
                <ul>
                  <li>Phakding - 2,600 m / 8,500 ft.</li>
                  <li>Namche Bazaar - 3,500 m / 11,500 ft.</li>
                </ul>
              </li>
              <li>Trek Distance: 10 km | 7 hrs.</li>
            </ul>{" "}
            <h3>Day-4: Acclimatization Day | Explore Namche Bazaar</h3>
            <p></p>{" "}
            <h3>
              Day-5: Trek from Namche Bazaar To Tengboche | Visit The Largest
              Buddhist Monastery Of Khumbu
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Namche Bazaar - 3,500 m / 11,500 ft.</li>
                  <li>Tengboche - 3,900 m / 12,700 ft.</li>
                </ul>
              </li>
              <li>Trek Distance: 11 km | 5-6 hrs.</li>
            </ul>
            <h3>
              Day-6: Trek from Tengboche To Dingboche | Stunning Views Of Ama
              Dablam
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Tengboche - 3,900 m / 12,700 ft.</li>
                  <li>Dingboche - 4,300 m / 14,200 ft.</li>
                </ul>
              </li>
              <li>Trek Distance: 12 km | 6-7 hrs.</li>
            </ul>{" "}
            <h3>
              Day-7: Dingboche (Rest Day) | Acclimatize To Higher Altitudes
            </h3>
            <p></p>{" "}
            <h3>
              Day-8: Trek from Dingboche To Lobuche | Pay Your Respects In
              Everest Memorial
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Dingboche - 4,300 m / 14,200 ft.</li>
                  <li>Lobuche - 4,900 m / 16,200 ft.</li>
                </ul>
              </li>
              <li>Trek Distance: 6 km | Duration: 4-5 hrs.</li>
            </ul>
            <h3>
              Day-9: Trek from Lobuche To Gorakshep | Excursion To Everest Base
              Camp
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Gorakshep - 5,200 m / 17,000 ft</li>
                  <li>Everest Base Camp - 5,400 m / 17,700 ft</li>
                </ul>
              </li>
              <li>Trek Distance:</li>
              <ul>
                <li>Lobuche To Gorakshep:6 km | 3-4 hrs.</li>
                <li>Gorakshep To EBC: 3 km away each | 2hrs.</li>
              </ul>
            </ul>{" "}
            <h3>
              Day-10: Hike To Kalapatthar And Retreat Trek To Pangboche | Enjoy
              Arresting Views Of Mt. Everest
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Kalapatthar - 5,500 m / 18,200 ft.</li>
                  <li>Pangboche - 3,900 m / 12,800 ft.</li>
                </ul>
              </li>
              <li>
                Trek Distance:
                <ul>
                  <li>Gorakshep to Kalapatthar - 4 km Both way | 3-4 hrs.</li>
                  <li>Gorakshep to Pangboche - 19 km | 7-8 hrs.</li>
                </ul>
              </li>
            </ul>{" "}
            <h3>
              Day-11: Trek from Pangboche To Namche Bazaar | Buy Some Souvenirs
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Pangboche - 3,900 m / 12,800 ft.</li>
                  <li>Namche Bazaar - 3,500 m / 11,500 ft.</li>
                </ul>
              </li>
              <li>Trek Distance: 14 km | 6-7 hrs.</li>
            </ul>{" "}
            <h3>
              Day-12: Trek from Namche Bazaar To Phakding To Lukla | Last Day Of
              Trekking
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Namche Bazaar - 3,500 m / 11,500 ft.</li>
                  <li>Phakding - 2,600 m / 8,500 ft.</li>
                  <li>Lukla - 2,800 m / 9,200 ft.</li>
                </ul>
              </li>
              <li>Trek Distance: 16 km | 7-8 hrs.</li>
            </ul>{" "}
            <h3>
              Day-13: Flight from Lukla to Ramechhap and drive to Kathmandu
            </h3>
            <ul>
              <li>Your trek to Everest Base Camp is over.</li>
            </ul>
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
              "Day 8",
              "Day 9",
              "Day 10",
              "Day 11",
              "Day 12",
              "Day 13",
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
                      <h3> Arrive At Kathmandu</h3>
                      <ul>
                        <li>
                          <b>Altitude Kathmandu:</b> 1,300 m/ 4,300 ft.
                        </li>
                        <li>
                          <b>Accommodation:</b> Hotel
                        </li>
                      </ul>
                      <p>
                        Welcome to trekkers' paradise, Nepal. Nepal is
                        characterized by beautiful Himalayan summits, rich
                        natural biodiversity, and beautiful culture and history.
                        Once you arrive at Kathmandu airport, we will pick you
                        up and drive you to the booked hotel in Kathmandu. There
                        are loads of taxis available at the airport and you can
                        easily find one to drop you off at the hotel. Once you
                        check in to the hotel, you can freshen up, and in the
                        evening, you will receive a briefing session where you
                        will learn about the trek and your schedule for the
                        upcoming days. If you have any questions about the trek,
                        then you can clear them at the time of the briefing
                        session. Post the briefing session, you can explore
                        Kathmandu and do some last-minute gear and equipment
                        shopping if you want.
                      </p>

                      <h3>Important Note:</h3>
                      <p>
                        Due to heavy traffic at Kathmandu's Tribhuvan
                        International Airport, most flights to Lukla have been
                        diverted to Ramechhap airport (Manthali), which is an
                        approximately 5-hour drive from Kathmandu. Your flight
                        to Lukla will be booked for the next day. Make sure to
                        rest early tonight, as you will need to leave Kathmandu
                        by 2:00 AM to catch the early morning flight from
                        Ramechhap the following day.
                      </p>
                      <img
                        title="Everest Base Camp Trek Day 1 Itinerary"
                        src="/images/HomePageImages/Desktop/77d2d5eb-4079-4afe-866c-19bf5fb84bf4_EBC-Day-1.webp"
                        alt="Everest Base Camp Trek Day 1 Itinerary"
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
                      <h3>
                        {" "}
                        Drive from Kathmandu to Ramechaap then Fly to Lukla and
                        Trek To Phakding
                      </h3>
                      <ul>
                        <li>
                          <strong>Altitude</strong>
                        </li>
                        <ul>
                          <li>
                            <strong>Lukla:</strong> 2,800 m/ 9,200 ft.
                          </li>
                          <li>
                            <strong>Phakding:</strong> 2,600 m/ 8,500 ft.
                          </li>
                        </ul>
                        <li>
                          <strong>Trek Distance (Lukla to Phakding):</strong> 7
                          km | 4-5 hrs.
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Teahouse
                        </li>
                      </ul>

                      <p>
                        The day begins early as you depart Kathmandu at around
                        2:00 AM for the approximately 5-hour drive to Ramechhap
                        Airport, where you'll board your flight to Lukla. This
                        short 30-minute flight shows the best aerial views of
                        the Himalayan landscape, and makes it an exciting start
                        to your trek.
                      </p>
                      <p>
                        The trail starts with a gradual descent, winding through
                        picturesque Nepali mountain villages, lush forests, and
                        crossing several suspension bridges. While you trek,
                        you'll pass through Cheplung village, where you'll catch
                        a glimpse of the majestic Mt. Khumbila. Continuing on,
                        you'll encounter beautiful boulders carved with Buddhist
                        prayers, adding a cultural touch to the journey. The
                        trek is easy, with a few gentle climbs and descents
                        along the way. You'll pass by the village of Ghat,
                        before reaching Phakding.
                      </p>
                      <p>
                        Throughout the trek, you will enjoy beautiful views of
                        the surrounding green mountains and the opportunity to
                        buy or refill water bottles from local teahouses along
                        the way. Phakding serves as an ideal stop for
                        acclimatization and easing into the rhythm of the trek.
                        The rest here will help prepare your body for the
                        altitude changes ahead. Arriving at Phakding, you can
                        settle, enjoy a warm meal, and relax. This initial hike
                        serves as a perfect acclimatization step, preparing you
                        for the exciting journey ahead through the majestic
                        Everest region.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/a95197d9-0e92-4fb0-8ba2-51f431e7a088_EBC-Day-2.webp"
                        alt="Everest Base Camp Trek Day 2 Itinerary"
                        title="Everest Base Camp Trek Day 2 Itinerary"
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
                      <h3>
                        {" "}
                        Trek from Phakding To Namche Bazaar | A Major Trading
                        Hub In Khumbu
                      </h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>
                          <ul>
                            <li>
                              <strong>Phakding</strong> - 2,600 m / 8,500 ft.
                            </li>
                            <li>
                              <strong>Namche Bazaar</strong> - 3,500 m / 11,500
                              ft.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 10 km | 7 hrs.
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Teahouse
                        </li>
                      </ul>
                      <p>
                        Post breakfast, you will start your trek toward Namche
                        Bazaar, the capital of the Khumbu region. The route
                        today is surrounded by green mountains and will take you
                        through suspension bridges over the Dudh Koshi and Bhote
                        Koshi rivers. The Dudh Koshi River is often considered
                        the lifeline of the Khumbu region, and will accompany us
                        for much of today's journey. Before entering the
                        Sagarmatha National Park, you will have to obtain
                        permits and then the trail follows a steep ascent before
                        arriving at Namche Bazaar. Namche Bazaar is an important
                        trading hub of the Khumbu region.
                      </p>
                      <p>
                        You will start your trek early in the morning from
                        Phakding and soon you will cross a suspension bridge
                        over the Dudh Koshi River. The walk from here is easy
                        and pleasant with short uphill and downhill climbs. The
                        Swiss suspension bridge on the Dudh Koshi River is a
                        major attraction and a highlight of the trek. As you
                        continue, you will encounter the second suspension
                        bridge over the Bhote Koshi River, a bustling area
                        filled with trekkers and porters. A moderate climb from
                        this point leads to Monjo, which serves as the mid-point
                        of the trek and a popular rest stop. Monjo is situated
                        beneath the majestic Thamserku Peak and provides a
                        glimpse of local Sherpa life, including traditional
                        watermills used to grind barley, a staple in their diet
                        Hillary Bridge that is photogenic. Along the way, you
                        will also cross the Hillary Suspension Bridge, a
                        photogenic spot often featured in pictures of the
                        Everest trek. Afterward, a steep ascent takes you to the
                        Everest Mid-Point, where glimpses of Mount Everest are
                        visible on a clear day.
                      </p>
                      <p>
                        Treading along the Dudh Koshi River, you will arrive at
                        the Sagarmatha National Park. At this point, your
                        trekking permit will be checked and the officials will
                        keep a record of all the trekkers going ahead.
                        Sagarmatha is a UNESCO World Heritage Site that
                        showcases stunning mountain views and rich biodiversity.
                        Here, you may spot rare Himalayan species like snow
                        leopards and the lesser panda. The presence of Sherpa
                        settlements with their unique culture makes the trek
                        even more interesting. A gradual walk from Sagarmatha
                        National Park will lead you to Namche Bazaar. From
                        Namche Bazaar, you will catch the first glimpses of Mt.
                        Everest. Namche Bazaar is a historic trading center of
                        the Khumbu area. At night you will stay here at a
                        teahouse.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/7b6db2cf-95dd-4622-bfe9-71d4c7f9ee24_EBC-Day-3.webp"
                        alt="Everest Base Camp Trek Day 3 Itinerary"
                        title="Everest Base Camp Trek Day 3 Itinerary"
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
                      <h3> Acclimatization Day | Explore Namche Bazaar</h3>
                      <ul>
                        <li>
                          <strong>Accommodation:</strong> Teahouse
                        </li>
                      </ul>
                      <p>
                        Wake up to the beautiful views of the highest Himalayan
                        peaks and enjoy a delicious breakfast. Today you will
                        stay in Namche Bazaar allowing your bodies to
                        acclimatize to high altitudes. You can spend the day
                        exploring the surroundings and enjoy the culture and
                        hospitality of Nepal. Namche Bazaar is a commercial hub
                        so you can do any last-minute trek shopping from here.
                        The market has a vibrant atmosphere and there are a
                        couple of restaurants and coffee shops as well.
                      </p>
                      <p>
                        You can do a short hike to Sagarmatha National Park
                        headquarters. From here, you can get a good view of Ama
                        Dablam, Mt. Everest, and other Khumbu peaks. Sagarmatha
                        Museum is close by and lies just above Namche Bazaar.
                        The museum gives you a fair amount of details about the
                        history of the Himalayas, the geographic and cultural
                        aspects, mountaineering history, and information about
                        the various flora and fauna in the region. You will see
                        many pictures of Tenzing Norgay and Edmund Hillary from
                        their climb and maps detailing their trails as well.
                      </p>
                      <p>
                        You will also hike to Hotel Everest View, where you can
                        catch a glimpse of Mt. Everest, Ama Dablam, and other
                        Khumbu peaks.In the evening, take acclimatization walks
                        around the market, preparing your body for higher
                        altitudes. Soak in the Nepalese Buddhist culture, food,
                        and traditions. Namche Bazaar gained popularity during
                        the time when Tibetan salt was traded for grains from
                        Nepal's lowlands. Nowadays, you can see a roaring trade
                        of rugs, clothing, dried meat, and salt in the village
                        center. There are many shops that also offer locally
                        made handicraft items, you can buy them as souvenirs or
                        gifts for your friends and families. You will stay the
                        night at a teahouse in Namche Bazaar.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="Everest Base Camp Trek Day 4 Itinerary"
                        title="Everest Base Camp Trek Day 4 Itinerary"
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
