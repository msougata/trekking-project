import React, { useState } from "react";
import { startRazorpayPayment } from "./utils/razorpayutil";
import TravelerInfoForm from "./components/TravelerInfoForm";
import "./TrekPage.css";

const KanchenjungaTrekPage = () => {
  const [isUSD, setIsUSD] = useState(false);
  const [activeDay, setActiveDay] = useState("Day 1");
  const [activeView, setActiveView] = useState("Quick Itinerary");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTravelerForm, setShowTravelerForm] = useState(false);
  const [openMonthIndex, setOpenMonthIndex] = useState(null);

  // Kanchenjunga-specific data
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

  // Kanchenjunga Trek specific data
  const departures = [
    { month: "March-2025", dates: ["15 Mar - 2 Apr", "25 Mar - 12 Apr"] },
    { month: "April-2025", dates: ["5 Apr - 23 Apr", "15 Apr - 3 May"] },
    { month: "October-2025", dates: ["15 Oct - 2 Nov"] },
    { month: "November-2025", dates: ["5 Nov - 23 Nov"] },
  ];

  const carouselData = [
    {
      image: "https://i.ibb.co/j9dtvr84/pexels-vikashkr50-17845104.jpg",
      title: "Kanchenjunga Base Camp - The Five Treasures of Snow",
      buttonText: "Book now",
    },
    {
      image: "https://i.ibb.co/JwmBk8Vk/pexels-parag-shah-21176646-12174800.jpg",
      title: "Views of World's Third Highest Mountain",
      buttonText: "Explore more",
    },
    {
      image: "https://i.ibb.co/4w6m25Fh/pexels-clickfound-8945703.jpg",
      title: "Remote Himalayan Wilderness Trek",
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
      value: "18 Days",
    },
    {
      src: "https://i.ibb.co/HTgDhLmF/11715345.png",
      label: "Max Altitude",
      value: "16,500 Ft.",
    },
    {
      src: "https://i.ibb.co/bj02W6Mg/istockphoto-1195232230-612x612.jpg",
      label: "Trekking Km",
      value: "110 KM",
    },
    {
      src: "https://i.ibb.co/Gvw9ZFRx/red-mobile-signal-network-tower-icon-free-vector.jpg",
      label: "Grade",
      value: "Difficult",
    },
    
  ];

  return (
    <div className="trek-carousel-container">
      {/* Carousel - Updated for Kanchenjunga */}
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
              <img src={slide.image} className="d-block w-100" alt={`Kanchenjunga Slide ${i + 1}`} />
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

      {/* Icon Section - Updated for Kanchenjunga */}
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
                <a href="mailto:info@kanchenjungaexpedition.com"><i className="fa fa-envelope"></i> info@kanchenjungaexpedition.com</a>
                <br />
                <i className="far fa-clock"></i> Monday - Saturday: 10 AM to 06 PM (GMT +5:30)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section - Updated for Kanchenjunga */}
      <section className="custom-3d-box">
        <div className="container">
          <div className="row">
            <div className="usdButton row align-items-center">
              <div className="col-md-6">
                <h3 className="price">
                  {isUSD ? (
                    <span id="usd-price">$<span id="converted-price">900.00</span><span className="person"> -/Person</span></span>
                  ) : (
                    <span id="inr-price"><i className="fa fa-rupee-sign"></i>₹75,000<span className="person"> -/Person</span></span>
                  )}
                </h3>
              </div>
              <div className="col-md-6 usdButtonDiv">
                <button id="toggle-button" onClick={togglePrice}>
                  {isUSD ? "Convert to INR" : "Convert to USD"}
                </button>
              </div>
            </div>

            {/* Fixed Departures - Kanchenjunga specific months */}
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

            {/* Price Details - Kanchenjunga specific */}
            <div className="col-md-6 dep_detail" id="price_details">
              <div className="price_desc">
                <div>
                  <ul>
                    <div style={{ backgroundColor: "#ee3038", color: "white" }}>
                      <li><strong>USD 1200 +5% GST for Foreign Nationals</strong></li>
                    </div>
                    <li>5% GST on Trek Cost and Add-ons</li>
                    <li>Includes special permits (Restricted Area Permit)</li>
                    <li>All meals during trek (Veg + Eggs)</li>
                    <li>Accommodation in tents and homestays</li>
                    <li>Professional mountaineering guide included</li>
                    <li>Porters for personal luggage (10kg limit)</li>
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

      {/* Overview Section - Kanchenjunga specific */}
      <section className="overview" id="tab1-content">
        <h2>Overview</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4 overview-bg">
              <p><b>Trek Name:</b> Kanchenjunga Base Camp Trek</p>
              <p><b>Days:</b> 18</p>
              <p><b>Adventure Type:</b> High Altitude Expedition</p>
              <p><b>Base Camp:</b> Yuksom</p>
              <p><b>Season:</b> Spring & Autumn</p>
              <p><b>Peak View:</b> Kanchenjunga (8,586m)</p>
            </div>
            <div className="col-md-4 overview-bg">
              <p><b>Country:</b> India (Sikkim)</p>
              <p><b>Altitude:</b> 16,500 Ft.</p>
              <p><b>Grade:</b> Difficult</p>
              <p><b>Airport:</b> Bagdogra (IXB)</p>
              <p><b>Stay:</b> Tents & Homestays</p>
              <p><b>Food:</b> All meals (Veg + Eggs)</p>
            </div>
            <div className="col-md-4 overview-bg">
              <p><b>Location:</b> Kanchenjunga National Park</p>
              <p><b>Distance:</b> 110 Km</p>
              <p><b>Trail Type:</b> Round trip via different routes</p>
              <p><b>Temperature:</b> -5°C to 15°C</p>
              <p><b>Unique Feature:</b> Restricted area trek</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                The Kanchenjunga Base Camp Trek is one of India's most spectacular and challenging treks,
                taking you to the base of the world's third highest mountain (8,586m). This remote wilderness
                trek passes through lush rhododendron forests, high-altitude meadows, and traditional Lepcha
                villages. The trek requires special permits as it's in a restricted border area. You'll experience
                dramatic views of the Kanchenjunga massif and its five treasure peaks (gold, silver, gems, grain,
                and holy scriptures).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate - Updated for Kanchenjunga */}
      <section className="participate" id="tab2-content">
        <h2>Who Can Participate</h2>
        <div className="whocan">
          <ul>
            <li><strong>Age Requirement:</strong> Minimum 18 years (16-17 with guardian)</li>
            <li>Must have prior high-altitude trekking experience (min. 14,000ft)</li>
            <li><strong>Fitness Criteria:</strong>
              <ul>
                <li>Should be able to walk 10 km in 90 minutes with backpack</li>
                <li>Must be comfortable with 6-8 hours of daily trekking</li>
                <li>Preparation Chart <a href="#"><u>view</u></a> <a href="#"><u>download</u></a></li>
              </ul>
            </li>
            <li>Medical certificate of fitness for high-altitude required</li>
            <li>Previous experience with multi-week treks strongly recommended</li>
            <li>Must be prepared for basic accommodation and limited facilities</li>
          </ul>
        </div>
      </section>

      {/* Itinerary Section - Kanchenjunga specific */}
      <section className="itinerary shadow-lg p-3 mb-5 bg-body rounded" id="tab3-content">
        <h2>Kanchenjunga Base Camp Trek Itinerary</h2>
        <button className="btn-quick" onClick={() => toggleView("Quick Itinerary")}>Quick Itinerary</button>
        <button className="btn-detailed" onClick={() => toggleView("Detailed Itinerary")}>Detailed Itinerary</button>
        
        {activeView === "Quick Itinerary" && (
          <div id="quickItinerary">
            <h3>Day-1: Arrival in Bagdogra | Drive to Yuksom (5,670 ft)</h3>
            <ul>
              <li>Drive: 150 km | 6-7 hrs</li>
              <li>Stay: Homestay</li>
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

            <h3>Day-5: Acclimatization at Dzongri</h3>
            <ul>
              <li>Short hikes for acclimatization</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-6: Dzongri to Thangsing (12,900 ft) via Phedang</h3>
            <ul>
              <li>Trek: 10 km | 6-7 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-7: Thangsing to Lamuney (13,700 ft)</h3>
            <ul>
              <li>Trek: 7 km | 4-5 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-8: Lamuney to Kanchenjunga Base Camp (16,500 ft) and back to Kokchurung (12,100 ft)</h3>
            <ul>
              <li>Trek: 16 km | 10-12 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-9: Kokchurung to Tshoka</h3>
            <ul>
              <li>Trek: 14 km | 7-8 hrs</li>
              <li>Stay: Camp</li>
            </ul>

            <h3>Day-10: Tshoka to Yuksom</h3>
            <ul>
              <li>Trek: 15 km | 7-8 hrs</li>
              <li>Stay: Homestay</li>
            </ul>

            <h3>Day-11: Buffer Day (for weather/acclimatization)</h3>

            <h3>Day-12: Drive from Yuksom to Bagdogra</h3>
            <ul>
              <li>Drive: 150 km | 6-7 hrs</li>
            </ul>
          </div>
        )}

        {activeView === "Detailed Itinerary" && (
          <div className="tab" id="detailedItinerary">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12"].map((day) => (
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
                    <li><b>Stay:</b> Homestay</li>
                  </ul>
                  <p>
                    Arrive at Bagdogra Airport (IXB) and drive through tea gardens to Yuksom,
                    the historical first capital of Sikkim. Complete permit formalities for this
                    restricted area trek. Briefing about the expedition. Overnight in a local homestay.
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
                    Pass through small villages and cross several bridges. The trail is well-defined but
                    involves steady climbing. Arrive at Sachen campsite near the river.
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
                    First views of snow-capped peaks on clear days. Camp near the village.
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
                    Kanchenjunga range. Acclimatization hike in the evening.
                  </p>
                </div>
              )}

              {activeDay === "Day 5" && (
                <div>
                  <h3>Acclimatization at Dzongri</h3>
                  <ul>
                    <li><b>Activities:</b> Short hikes for acclimatization</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Rest day for acclimatization with optional hike to Dzongri Top (13,675 ft) for sunrise
                    views of Kanchenjunga, Pandim, and other peaks. Learn about high-altitude trekking
                    techniques. Afternoon free to rest and explore the area.
                  </p>
                </div>
              )}

              {activeDay === "Day 6" && (
                <div>
                  <h3>Dzongri to Thangsing (12,900 ft) via Phedang</h3>
                  <ul>
                    <li><b>Trek:</b> 10 km | 6-7 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Descend to Phedang through rhododendron forests, then climb to the scenic
                    Prek Chu river valley. The trail offers spectacular views of snow peaks.
                    Thangsing campsite sits in a beautiful meadow surrounded by mountains.
                  </p>
                </div>
              )}

              {activeDay === "Day 7" && (
                <div>
                  <h3>Thangsing to Lamuney (13,700 ft)</h3>
                  <ul>
                    <li><b>Trek:</b> 7 km | 4-5 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Short trek along the moraine of the Onglakthang Glacier with views of
                    Pandim and other peaks. Lamuney is the last campsite before base camp.
                    Early dinner and rest for the big summit push tomorrow.
                  </p>
                </div>
              )}

              {activeDay === "Day 8" && (
                <div>
                  <h3>Lamuney to Kanchenjunga Base Camp (16,500 ft) and back to Kokchurung (12,100 ft)</h3>
                  <ul>
                    <li><b>Trek:</b> 16 km | 10-12 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Pre-dawn start to reach View Point 1 for sunrise over Kanchenjunga. Continue to
                    View Point 2 for closest views of the massive north face. The final push to
                    Base Camp crosses the glacier. After spending time at base camp, descend all
                    the way to Kokchurung. Long but rewarding day.
                  </p>
                </div>
              )}

              {activeDay === "Day 9" && (
                <div>
                  <h3>Kokchurung to Tshoka</h3>
                  <ul>
                    <li><b>Trek:</b> 14 km | 7-8 hrs</li>
                    <li><b>Stay:</b> Camp</li>
                  </ul>
                  <p>
                    Retrace your steps down the valley, passing through Thangsing and Phedang.
                    The descent is easier but still long. Celebrate your successful summit
                    attempt with the team at Tshoka.
                  </p>
                </div>
              )}

              {activeDay === "Day 10" && (
                <div>
                  <h3>Tshoka to Yuksom</h3>
                  <ul>
                    <li><b>Trek:</b> 15 km | 7-8 hrs</li>
                    <li><b>Stay:</b> Homestay</li>
                  </ul>
                  <p>
                    Final trekking day descending through lush forests back to Yuksom.
                    Hot shower and comfortable beds await. Celebration dinner with the team.
                    Certificate distribution ceremony.
                  </p>
                </div>
              )}

              {activeDay === "Day 11" && (
                <div>
                  <h3>Buffer Day (for weather/acclimatization)</h3>
                  <p>
                    This extra day is kept as a buffer for any delays due to weather or
                    acclimatization needs. If not used, you can explore Yuksom's historical
                    sites including the Coronation Throne of the first Chogyal of Sikkim.
                  </p>
                </div>
              )}

              {activeDay === "Day 12" && (
                <div>
                  <h3>Drive from Yuksom to Bagdogra</h3>
                  <ul>
                    <li><b>Drive:</b> 150 km | 6-7 hrs</li>
                  </ul>
                  <p>
                    Drive back to Bagdogra through scenic Sikkimese countryside. Transfer to
                    airport for your flight home, carrying unforgettable memories of one of
                    the world's most spectacular mountain vistas.
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

export default KanchenjungaTrekPage;