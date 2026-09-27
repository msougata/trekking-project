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
    { month: "May-2025", dates: ["15 May - 22 May", "25 May - 1 Jun"] },
    { month: "June-2025", dates: ["5 Jun - 12 Jun", "15 Jun - 22 Jun"] },
    { month: "September-2025", dates: ["5 Sep - 12 Sep", "15 Sep - 22 Sep"] },
    { month: "October-2025", dates: ["5 Oct - 12 Oct"] },
  ];

  const carouselData = [
    {
      image: "https://i.ibb.co/0R4LtpYF/pexels-karolina-2031292-3669288.jpg",
      title: "Roopkund Trek - The Mystery Lake",
      buttonText: "Book now",
    },
    {
      image: "https://i.ibb.co/20tLMTw1/pexels-brett-sayles-1922631.jpg",
      title: "Himalayan Meadows & Snow Peaks",
      buttonText: "Explore more",
    },
    {
      image: "https://i.ibb.co/7J5nv9yz/pexels-marek-piwnicki-3907296-15924758.jpg",
      title: "Skeleton Lake Adventure",
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
                    value: "8 Days",
                  },
                  {
                    src: "https://i.ibb.co/HTgDhLmF/11715345.png",
                    label: "Max Altitude",
                    value: "16,499 Ft.",
                  },
                  {
                    src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
                    label: "Trekking Km",
                    value: "53 KM",
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
                <a href="mailto:info@roopkundtrek.com">
                  <i className="fa fa-envelope"></i> info@roopkundtrek.com
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
                      $<span id="converted-price">375.53</span>
                      <span className="person"> -/Person </span>
                    </span>
                  ) : (
                    <span id="inr-price">
                      <i className="fa fa-rupee-sign"></i>₹31,500
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
                        <strong>USD 700 +5% GST for Foreign Nationals</strong>
                      </li>
                    </div>
                    <li>5% GST will be applicable on Trek Cost and Add-ons</li>
                    <li>Services from Lohajung to Lohajung</li>
                    <li>Accommodation in guesthouses and tents included</li>
                    <li>All meals during the trek included (Veg)</li>
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
                <b>Trek Name:</b> Roopkund Trek
              </p>
              <p>
                <b>Days:</b> 8
              </p>
              <p>
                <b>Adventure Type:</b> High Altitude Trekking
              </p>
              <p>
                <b>Base Camp:</b> Lohajung
              </p>
              <p>
                <b>Season:</b> Summer <span>|</span> Autumn
              </p>
              <p>
                <b>Month:</b> May <span>|</span> June <span>|</span> September <span>|</span> October
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Country:</b> India
              </p>
              <p>
                <b>Altitude:</b> 16,499 Ft.
              </p>
              <p>
                <b>Grade:</b> Moderate to Difficult
              </p>
              <p>
                <b>Rail Head:</b> Kathgodam
              </p>
              <p>
                <b>Stay:</b> Guesthouses and tents
              </p>
              <p>
                <b>Food:</b> All meals during trek (Veg)
              </p>
            </div>

            <div className="col-md-4 overview-bg">
              <p>
                <b>Location:</b> Chamoli District, Uttarakhand
              </p>
              <p>
                <b>Distance:</b> 53 Km
              </p>
              <p>
                <b>Trail Type:</b> Round trip via same route
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
                <li>Minimum 16 years</li>
              </ul>
            </li>
            <li>
              First-timers with excellent fitness level can attempt this trek.
            </li>
            <li>
              <strong>Fitness Criteria:</strong>
              <ul>
                <li>
                  Should be able to walk 6 km in 45 minutes on plain terrain
                </li>
                <li>
                  Should be able to climb 100 stairs in one stretch
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
        <h2>Roopkund Trek Itinerary</h2>
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
            <h3>Day-1: Drive from Kathgodam to Lohajung (7,600 ft)</h3>
            <ul>
              <li>Drive Distance: 220 km | 10-11 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-2: Trek from Lohajung to Didna Village (8,000 ft)</h3>
            <ul>
              <li>Trek Distance: 10 km | 5-6 hrs</li>
              <li>Stay: Homestay</li>
            </ul>

            <h3>Day-3: Trek from Didna to Ali Bugyal (11,000 ft)</h3>
            <ul>
              <li>Trek Distance: 8 km | 5-6 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-4: Trek from Ali Bugyal to Bedni Bugyal (11,800 ft) via Ghora Lotani</h3>
            <ul>
              <li>Trek Distance: 7 km | 4-5 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-5: Trek from Bedni Bugyal to Bhagwabasa (14,100 ft) via Patar Nachauni</h3>
            <ul>
              <li>Trek Distance: 8 km | 6-7 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-6: Summit Day - Bhagwabasa to Roopkund (16,499 ft) and back to Bedni Bugyal</h3>
            <ul>
              <li>Trek Distance: 12 km | 10-12 hrs</li>
              <li>Stay: Tents</li>
            </ul>

            <h3>Day-7: Trek from Bedni Bugyal to Lohajung via Wan</h3>
            <ul>
              <li>Trek Distance: 8 km | 5-6 hrs</li>
              <li>Stay: Guesthouse</li>
            </ul>

            <h3>Day-8: Drive from Lohajung to Kathgodam</h3>
            <ul>
              <li>Drive Distance: 220 km | 10-11 hrs</li>
            </ul>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8"].map((day) => (
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
                  <h3>Drive from Kathgodam to Lohajung (7,600 ft)</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 220 km | 10-11 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    The journey begins with a scenic drive from Kathgodam through 
                    the Kumaon region. You'll pass through Almora and Gwaldam before 
                    reaching Lohajung, the base camp for Roopkund trek. Lohajung offers 
                    stunning views of Nanda Ghunti and Trishul peaks. The name Lohajung 
                    translates to "war of iron" from a mythological battle between gods.
                  </p>
                </div>
              )}

              {activeDay === "Day 2" && (
                <div>
                  <h3>Trek from Lohajung to Didna Village (8,000 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 10 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Homestay</li>
                  </ul>
                  <p>
                    The trek starts with a descent to the Neel Ganga river, followed 
                    by a steep climb through dense oak and rhododendron forests to 
                    Kuling village. After a short break, continue to Didna village, 
                    a traditional mountain settlement. The homestay here offers a 
                    glimpse into local culture and lifestyle.
                  </p>
                </div>
              )}

              {activeDay === "Day 3" && (
                <div>
                  <h3>Trek from Didna to Ali Bugyal (11,000 ft)</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 8 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    Today's trail takes you through Tolpani and then climbs steeply 
                    to the magnificent Ali Bugyal, one of Asia's highest alpine meadows. 
                    The vast green meadow offers panoramic views of the Himalayan peaks. 
                    Camp here surrounded by breathtaking landscapes.
                  </p>
                </div>
              )}

              {activeDay === "Day 4" && (
                <div>
                  <h3>Trek from Ali Bugyal to Bedni Bugyal (11,800 ft) via Ghora Lotani</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 7 km | 4-5 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    A relatively easy day trekking through stunning meadows to reach 
                    Bedni Bugyal, another spectacular high-altitude meadow. En route, 
                    visit the Bedni Kund lake. The campsite offers magnificent views 
                    of Trishul and Nanda Ghunti peaks. Visit the ancient Bedni Mata 
                    temple in the evening.
                  </p>
                </div>
              )}

              {activeDay === "Day 5" && (
                <div>
                  <h3>Trek from Bedni Bugyal to Bhagwabasa (14,100 ft) via Patar Nachauni</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 8 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    The trail climbs steeply to Patar Nachauni (12,900 ft), then 
                    through Junargali to reach Kalu Vinayak temple at 14,100 ft. 
                    After the temple, descend slightly to Bhagwabasa, the last 
                    campsite before the summit. The landscape becomes more rugged 
                    and rocky as you gain altitude.
                  </p>
                </div>
              )}

              {activeDay === "Day 6" && (
                <div>
                  <h3>Summit Day - Bhagwabasa to Roopkund (16,499 ft) and back to Bedni Bugyal</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 12 km | 10-12 hrs</li>
                    <li><b>Stay:</b> Tents</li>
                  </ul>
                  <p>
                    Start early (around 4 AM) for the summit attempt. The steep climb 
                    to Roopkund takes about 4-5 hours. At the lake, see the famous 
                    skeletal remains and enjoy panoramic views. Descend back to 
                    Bhagwabasa for lunch, then continue down to Bedni Bugyal for 
                    the night. This is the most challenging but rewarding day of the trek.
                  </p>
                </div>
              )}

              {activeDay === "Day 7" && (
                <div>
                  <h3>Trek from Bedni Bugyal to Lohajung via Wan</h3>
                  <ul>
                    <li><b>Trek Distance:</b> 8 km | 5-6 hrs</li>
                    <li><b>Stay:</b> Guesthouse</li>
                  </ul>
                  <p>
                    Descend through dense forests to reach Wan village, then drive 
                    back to Lohajung. The trail offers beautiful views of the valley 
                    and a chance to reflect on your achievement. Celebrate your 
                    successful summit with the team in the evening.
                  </p>
                </div>
              )}

              {activeDay === "Day 8" && (
                <div>
                  <h3>Drive from Lohajung to Kathgodam</h3>
                  <ul>
                    <li><b>Drive Distance:</b> 220 km | 10-11 hrs</li>
                  </ul>
                  <p>
                    The return drive takes you back to Kathgodam, marking the end 
                    of your Roopkund adventure. You'll arrive in Kathgodam by evening, 
                    with memories of the mysterious skeleton lake and breathtaking 
                    Himalayan landscapes.
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