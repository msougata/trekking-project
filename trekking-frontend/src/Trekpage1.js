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
  const { kedernath } = useParams();
  const trekName = "Kedarnath Trek";

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
    { month: "October-2025", dates: ["5 Oct - 10 Oct", "20 Sept - 25 Oct"] },
    { month: "November-2025", dates: ["5 Nov - 10 Nov", "20 Nov - 25 Nov"] },
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
        "https://i.ibb.co/xqWpPVvn/7a3c7d5c-3158-4fb6-8631-552461841871-Kedakantha-5.webp",
      title: "Kedernath Base Camp Adventure",
      buttonText: "Sign up today",
    },
    {
      image:
        "https://i.ibb.co/whkrHgYS/12cfc10f-ba24-49c8-ad6a-9e938107424d-Kedakantha-3.webp",
      title: "Kedarnath Trail Experience",
      buttonText: "Learn more",
    },
    {
      image:
        "https://i.ibb.co/3Z2CzWm/2b9ec27a-164e-4af1-92ea-4f16d12a2103-Kedakantha-1.webp",
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
                    value: "12500 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "20 KM",
                  },
                  {
                    src: "https://i.ibb.co/Gvw9ZFRx/red-mobile-signal-network-tower-icon-free-vector.jpg",
                    label: "Grade",
                    value: "Easy to Moderate",
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
                      $<span id="converted-price">127.18</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹10,000
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
                    <li>Services Sankri to Sankri.</li>
                    <li>
                      Meeting Point( Pickup/ Drop Point ): Prince Chowk,
                      Dehradun(If transportation opted from TTH)
                    </li>
                    <li>Reporting Time: 6:00 am</li>
                    <li>
                      Drop Time:6:30 pm to 7:30 pm (Timings are subject to
                      change based on weather and road conditions).
                    </li>
                    <li>
                      Please reach Dehradun a day before to avoid any delays.
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
                <b>Trek Name:</b> Kedarkantha Trek
              </p>
              <p>
                <b>Days:</b> 6
              </p>
              <p>
                <b>Adventure Type:</b> Trekking
              </p>
              <p>
                <b>Base Camp:</b> Sankri
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
                <b>Altitude:</b> 12500 Ft.
              </p>
              <p>
                <b>Grade:</b> Easy to Moderate
              </p>
              <p>
                <b>Rail Head:</b> Dehradun
              </p>
              <p>
                <b>Stay:</b> Camping (Twin sharing) & Hotel/Guesthouse
              </p>
              <p>
                <b>Food:</b> Meals while on trek & at Hotel/Guesthouse (Veg &
                Eggs)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Uttarakhand
              </p>
              <p>
                <b>Distance:</b> 20 Km.
              </p>
              <p>
                <b>Trail Type:</b> Circle trail | Camping in various locations,
                starting and ending at the same point.
              </p>
              <p>
                <b>AirPort:</b> Jolly Grant Airport, which is 28 km away from
                Dehradun
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
                <li>Minimum 9 years</li>
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
        <h2>Kedarnath Base Camp Trek Itinerary</h2>
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
            <h3>Day-1: Arrival at Sankri</h3>
            <ul>
              <li>Altitude: 1,950m/ 6,400 ft.</li>
              <li>Drive Distance: 220 km |10 hours approximately</li>
            </ul>
            <h3>Day-2: Sankri to Juda-ka-Talab</h3>
            <ul>
              <li>Altitude: 2800 m/ 9100 ft</li>
              <li>Trek Distance: 4-5 km | 5 hours approximately</li>
            </ul>
            <h3>Day-3: Juda-ka-Talab to Kedarkantha Base</h3>
            <ul>
              <li>Altitude: 3100 m/ 10,100 ft.</li>
              <li>Trek Distance: 4 km | 2.5 hours approximately</li>
            </ul>{" "}
            <h3>
              Day-4: Kedarkantha base to Kedarkantha peak, Descend to Hargaon
              camp
            </h3>
            <ul>
              <li>
                Altitude:
                <ul>
                  <li>Peak - 3,800 m/ 12,500 ft.</li>
                  <li>Hargon - 2,700 m/ 8,900 ft.</li>
                </ul>
                <li>Trek Distance: 6-7 km | 7 hrs approximately</li>
              </li>
            </ul>
            <p></p> <h3>Day-5: Hargaon camp to Sankri</h3>
            <ul>
              <li>Altitude: 1950 m/ 6400 ft.</li>
              <li>Trek Distance: 4 km | 3-4 hours approximately</li>
            </ul>
            <h3>Day-6: Departure day (Sankri to Dehradun)</h3>
            <ul>
              <li>Drive Distance: 220 km | 10 hours approx</li>
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
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"].map((day) => (
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
                      <h3> Arrival at Sankri</h3>
                      <ul>
                        <li>
                          <b>Altitude:</b> 1,950m / 6,400 ft.
                        </li>
                        <li>
                          <b>Accommodation:</b> Hotel
                        </li>
                        <li>
                          <b>Drive Distance:</b> 220 km | 10 hours approximately
                        </li>
                      </ul>
                      <p>
                        Your journey will commence from Dehradun, we will pick
                        you up at 06:00 AM. You are requested to report at the
                        pickup point by the time. Then we will start our drive
                        from Dehradun to Sankri, which is around 220 kilometers.
                        It might take approximately 10 hours to reach Sankri,
                        through the drive you can enjoy the beautiful views as
                        it is a scenic route.
                      </p>

                      <p>
                        On your way to Sankri, you will cross many picturesque
                        locations like Mussoorie, Mori, Naitwar, etc. You will
                        drive along the Yamuna and Tons River and the pine trees
                        lining the road. The last stretch of around 22
                        kilometers is the most picturesque part of the drive, it
                        is when you enter the Govind National Park. The Park is
                        famous for its exotic flora and fauna. On reaching
                        Sankri we will check in our hotel.
                      </p>
                      <p>
                        After freshening up you can enjoy the evening at the
                        beautiful village Sankri. Sankri village is also popular
                        as the trekker's hub as it is the base camp for many
                        Himalayan treks, including the famous Har Ki Dun,
                        Phulara Ridge trek. You can head out for an evening
                        stroll through the village and get familiar with your
                        fellow trekker. You can also witness a beautiful sunset
                        from the village with a view of the Himalayas.
                      </p>
                      <p>
                        At night, you can have dinner at the hotel and rest. We
                        will stay overnight at Sankri in triple, quad, or penta
                        sharing, with separate arrangements for males and
                        females, and begin our trek the following day.
                      </p>
                      <img
                        title="Kedernath Base Camp Trek Day 1 Itinerary"
                        src="/images/HomePageImages/Desktop/77d2d5eb-4079-4afe-866c-19bf5fb84bf4_EBC-Day-1.webp"
                        alt="Kedernath Base Camp Trek Day 1 Itinerary"
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
                      <h3> Sankri to Juda-ka-Talab</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong> 2800 m / 9100 ft.
                        </li>

                        <li>
                          <strong>Trek Distance:</strong> 4-5 km | 5 hours
                          approximately
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tents
                        </li>
                      </ul>

                      <p>
                        Trekking for the Kedarkantha summit begins from Sankri,
                        the base village for the trek. Today you will trek to
                        Juda ka Talab, a beautiful alpine lake. The lake is
                        situated at an altitude of around 9100 ft and the trek
                        distance is about 4-5 kilometers. It would take around 5
                        hours to reach Juda ka Talab.
                      </p>
                      <p>
                        We will start our day early, have breakfast and head
                        straight to the Juda ka Talab. As you begin your trek
                        from Sankri village, you will walk into the village
                        extension Saur, and then you will walk along a stream
                        then turn towards the forests of pine, Cedar, Oak trees
                        and maple.
                      </p>
                      <p>
                        Today, the trail would be broader and ascend gradually
                        for about 2-3 hours. During the winters, the trail is
                        covered in snow, and depending upon the snow conditions
                        you would require proper winter gear for trekking. As
                        you move forward you might spot wildlife like Himalayan
                        Langurs, these animals are usually shy and move quickly
                        from one branch to another, making it difficult to catch
                        a proper glimpse. You might spot many other animals like
                        wild boars, hares, and martens and many more.
                      </p>
                      <p>
                        After trekking a few more hours you will reach the
                        beautiful campsite for the day Juda ka Talab. It is an
                        extremely scenic lake with cedar, maple and oak forests
                        around. Being near the lake feels surreal, in the lap of
                        mountains and in the middle of cedar and snowy
                        landscapes. During the peak winters, a sheet of ice
                        forms on the lake, and creates a beautiful location for
                        pictures.
                      </p>
                      <p>
                        We will camp here for the night, putting up our tents.
                        You can take a walk and click beautiful pictures around
                        the lake. At night, you can have dinner, enjoy the night
                        sky, it is extremely beautiful with shining stars, and
                        then rest in your tents.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/a95197d9-0e92-4fb0-8ba2-51f431e7a088_EBC-Day-2.webp"
                        alt="Kedernath Base Camp Trek Day 2 Itinerary"
                        title="Kedernath Base Camp Trek Day 2 Itinerary"
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
                      <h3> Juda-ka-Talab to Kedarkantha Base</h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong> 3100 m / 10,100 ft.
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 4 km | 2.5 hours
                          approximately
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tents
                        </li>
                      </ul>
                      <p>
                        Today we will again start our day early in the morning.
                        We will first have a warm breakfast with a sunrise view
                        then start our trekking for the day. Today we will trek
                        to Kedarkantha base camp. The campsite is at an altitude
                        of 10100 ft and the distance from Juda ka Talab to
                        Kedarkantha base camp is around 4 kilometers. Even if
                        you walk moderately, you can cover the distance in
                        around 3 hours. The trail is marked well so it is easy
                        to navigate.
                      </p>
                      <p>
                        Walking through the trail, you will cross cedar, maple
                        and oak forests, the forests will shortly open into
                        expansive meadows. As you move forward, you will witness
                        the valley of the Himalayan region gradually unfolding
                        in front of your eyes. The Kedarkantha trail is beginner
                        friendly and easy to climb, even during the peak winter
                        the trail is not very tough, making it enjoyable for
                        everyone. During winters you can see snow on the trails
                        while during summers it is lush green.
                      </p>
                      <p>
                        When you reach the campsite, you can rest for a while,
                        refresh yourself and take a small walk around the
                        campsite. Then at night enjoy a nice hot dinner and soak
                        in the beauty of the clear night sky with an abundance
                        of twinkling stars. Since the campsite is at a high
                        altitude, the cold waves can be high, so we recommend
                        you layer with proper clothing for protection against
                        the cold. Then you can rest in your tents and get proper
                        sleep for the next day's trek to the summit.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/7b6db2cf-95dd-4622-bfe9-71d4c7f9ee24_EBC-Day-3.webp"
                        alt="Kedernath Base Camp Trek Day 3 Itinerary"
                        title="Kedernath Base Camp Trek Day 3 Itinerary"
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
                      <h3>
                        {" "}
                        Kedarkantha base to Kedarkantha peak, Descend to Hargaon
                        camp
                      </h3>
                      <ul>
                        <li>
                          <strong>Altitude:</strong>
                          <ul>
                            <li>
                              <strong>Kedarkantha Peak: </strong> 3,800 m /
                              12,500 ft.
                            </li>
                            <li>
                              <strong>Hargon: </strong> 2,700 m / 8,900 ft.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 6-7 km | 7 hours
                          approximately
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Tents
                        </li>
                      </ul>
                      <p>
                        Today is the day when you get to see the views from the
                        Kedarkantha summit. The summit is at an altitude of
                        12500 ft. The trekking schedule for today is, trek from
                        the base camp to the Kedarkantha summit, and descend to
                        the Hargaon camp. The journey to the summit and down to
                        Hargaon is about 6 kilometers and it takes around 7
                        hours.
                      </p>
                      <p>
                        Today we will witness sunrise from the Kedarkantha
                        summit, so we will begin early in the morning. You can
                        have a warm breakfast, then we will head towards the
                        summit. For today, the trek is a gradual incline,
                        however it gets steep at the end and might test your
                        skills and fitness. You will begin by crossing a forest
                        of towering Oak and Pine. In winter, the snow is fresh,
                        and you can feel it crunching beneath your feet and
                        while walking you can also hear the gushing sound of
                        streams nearby.
                      </p>
                      <p>
                        After a while, the forest would open, and you would be
                        much closer to the Kedarantha peak. Now from here the
                        path will get comparatively difficult as a sharp incline
                        lies in front of you. But the views from the summit will
                        compensate for the tough climb.
                      </p>
                      <p>
                        You will reach the summit at the time of sunrise, and
                        you can witness the sun rising beautifully. As you reach
                        the summit, you will feel like you are at the top of the
                        world and filled with a sense of accomplishment and
                        inner peace. The views around you will rejuvenate you.
                        At the summit, you can also see small temples of Lord
                        Shiva, Goddess Parvati, and Lord Ganesha.
                      </p>
                      <p>
                        After soaking in the view and taking pictures, we will
                        start descending downhill to the Kedarkantha base camp
                        and have our lunch there. And then after lunch, we will
                        again descend downhill all the way to Hargaon.
                        Descending downhill is comparatively easier and faster,
                        so you will reach Hargaon soon. Reaching Hargaon marks
                        the end of trekking on day four. We will set our camps
                        and rest here for the night.
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
              {activeDay === "Day 5" && (
                <div>
                  {" "}
                  {
                    <div class="">
                      <h3> Hargaon camp to Sankri</h3>
                      <ul>
                        <li>
                          <strong>Altitude (Sankri):</strong>1950 m / 6400 ft
                        </li>
                        <li>
                          <strong>Trek Distance:</strong> 4 km | 3-4 hours
                          approximately
                        </li>
                        <li>
                          <strong>Accommodation:</strong> Hotel
                        </li>
                      </ul>
                      <p>
                        Today is the final day of trekking. We will descend from
                        Hargaon to Sankri, from an altitude of 8900 ft to 6400
                        ft. The trekking distance is about 4 kms and might take
                        up to 3-4 hrs to complete the descent.
                      </p>
                      <p>
                        In the morning, you can rise with the sun and have a
                        delicious breakfast. The sunrise is always beautiful in
                        the Himalayas, especially during the winters. After
                        breakfast we will begin descending towards Sankri. You
                        will trek through the forests. When the forest opens,
                        you can get a good bird's eye view of the Har Ki Dun
                        valley.
                      </p>
                      <p>
                        Descending the valley is simply wonderful. Relishing the
                        view, we will descend further and once again cross a
                        dense forest that would finally open at the Sankri
                        village. After reaching Sankri we will check into the
                        hotel again, and you can rest or head out to explore the
                        village.
                      </p>
                      <p>
                        At Sankri there are few shops, and you can buy souvenirs
                        like wooden handicrafts or decor products. You can
                        interact with the locals and get to know about their
                        livelihoods. While life at Sankri is slow paced, people
                        here have strong religious beliefs. Here, around 120
                        families live in wooden houses to protect themselves
                        from the cold. At Sankri, they also hold fairs
                        regularly, during which entertainment takes place in the
                        form of singing or dancing to native folk songs.
                      </p>
                      <p>
                        At night you can have a good dinner with fellow trekkers
                        and rest overnight at the hotel after a tiring yet
                        wonderful journey.
                      </p>
                      <img
                        src="/images/HomePageImages/Desktop/693c7325-28a7-46e6-9f3b-330bea24d2ee_EBC-Day-4.webp"
                        alt="Everest Base Camp Trek Day 5 Itinerary"
                        title="Everest Base Camp Trek Day 5 Itinerary"
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
