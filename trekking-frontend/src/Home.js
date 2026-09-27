import React, { useState } from "react"; // add useState
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const navigate = useNavigate();

  // Replace this with your real video IDs and titles
  const videos = [
    { id: "ReJM3C2j-ZU", title: "Trek Review 1" },
    { id: "IXrRxiSL1VA", title: "Trek Review 2" },
    { id: "zf4bAMq4hz8", title: "Trek Review 3" },
    { id: "JhXRNts2guc", title: "Trek Review 4" },
    { id: "TocBvNk3qqo", title: "Trek Review 5" },
    { id: "sFMRqxCexDk", title: "Trek Review 6" },
    { id: "7ze3QO6EbsM", title: "Trek Review 7" },
  ];

  const scrollContainer = (scrollOffset) => {
    const container = document.getElementById("scrollableDiv");
    container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const closePlayer = () => setPlayingVideoId(null);

  const certificates = [
    {
      id: 1,
      image: "https://i.ibb.co/nqj8H57p/award7.webp",
    },
    {
      id: 2,
      image: "https://i.ibb.co/8g6F14Qx/award1.webp",
    },
    {
      id: 3,
      image: "https://i.ibb.co/C39RZF8S/award2.webp",
    },
    {
      id: 4,
      image: "https://i.ibb.co/PZT0kMLv/award3.webp",
    },
    {
      id: 5,
      image: "https://i.ibb.co/tTCCJ4Mw/award5.webp",
    },
    {
      id: 6,
      image: "https://i.ibb.co/gZ3jNhNv/award6.webp",
    },

    // Add more certificate images as needed
  ];

  const faqs = [
    {
      question: "What is the best time to go trekking in the Himalayas?",
      answer:
        "The best time is during the pre-monsoon (April to June) and post-monsoon (September to November) seasons.",
    },
    {
      question: "Do I need prior trekking experience?",
      answer:
        "Not always! Many beginner-friendly treks are available. However, some high-altitude treks may require experience.",
    },
    {
      question: "What should I pack for a Himalayan trek?",
      answer:
        "Essential items include warm clothes, trekking shoes, water bottle, first-aid kit, and personal hygiene items.",
    },
    {
      question: "Is it safe to trek alone?",
      answer:
        "It's recommended to trek in groups or with certified guides for safety, especially on high-altitude or remote routes.",
    },
    {
      question: "What fitness level is required for a Himalayan trek?",
      answer:
        "Most Himalayan treks require a moderate level of fitness. You should be able to jog 4–5 km in 30 minutes and climb stairs without getting breathless. Some high-altitude treks require prior experience or extra preparation.",
    },
    {
      question: " What are the most beginner-friendly treks in India?",
      answer:
        "Popular beginner-friendly treks include: Kedarkantha (Uttarakhand)  Triund (Himachal Pradesh)  Tungnath–Chandrashila (Uttarakhand)  Nag Tibba (Uttarakhand)  These have shorter durations, gradual ascents, and scenic views.",
    },
    {
      question: "Are there any age restrictions for trekking?",
      answer:
        "Generally, trekking is allowed for ages 8 to 60+, depending on health. However, children and older adults must undergo a basic fitness check. Certain high-altitude treks may require a doctor's certificate.",
    },
    {
      question: " Is it safe to trek during the monsoon?",
      answer:
        "Some trails become risky due to landslides and slippery paths during monsoon. Avoid high-altitude treks during July–August. Instead, choose safer monsoon treks like:Valley of Flowers (Uttarakhand)Rajmachi Fort (Maharashtra)",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null); // For tracking which FAQ is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://i.ibb.co/N2mW9kbk/IMG-20250609-235436.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Experience Breathtaking Treks</h5>
              <p>Book Now.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/zjT7VRJ/pexels-imadclicks-27496409.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Mountains and Valleys Explored</h5>
              <p>Enjoy the Moments.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ibb.co/j9dtvr84/pexels-vikashkr50-17845104.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Make Memories</h5>
              <p>Trek & Fun.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Card Group */}
      <h1 className="upcoming-heading">Popular Treks</h1>
      <br />
      <div className="card-group">
        <div className="card">
          <img
            src="https://i.postimg.cc/7LbvpsvH/62f4e8f9-0a09-4a32-bb1f-938ca9065ef9-1.webp"
            className="card-img-top"
            alt="Everest"
          />
          <div className="card-body">
            <h5 className="card-title">Everest</h5>
            <p className="card-text">Everest Base Camp Trek</p>
            <Link to="/trek/everest" className="btn btn-primary mt-2">
              Explore
            </Link>
          </div>
        </div>

        <div className="card">
          <img
            src="https://i.ibb.co/xqWpPVvn/7a3c7d5c-3158-4fb6-8631-552461841871-Kedakantha-5.webp"
            className="card-img-top"
            alt="Kedernath"
          />
          <div className="card-body">
            <h5 className="card-title">Kedernath</h5>
            <p className="card-text">A scenic trek through the valley</p>
            <Link to="/trek/kedernath" className="btn btn-primary mt-2">
              Explore
            </Link>
          </div>
        </div>

        <div className="card">
          <img
            src="https://i.ibb.co/wZY2sGKj/image-2025-06-04-172332099.png"
            className="card-img-top"
            alt="Sandakphu"
          />
          <div className="card-body">
            <h5 className="card-title">Sandakphu</h5>
            <p className="card-text">Popular winter snow trek</p>
            <Link to="/trek/sandakphu" className="btn btn-primary mt-2">
              Explore
            </Link>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="card suggest">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">Suggest Me a Trek</h5>
          <p className="card-text">
            1. Personalized trek suggestions made just for you, based on your
            experience. <br /> 2. Quick and easy, answer a few questions, that's
            it! <br /> 3. Talk to trek experts for tips and recommendations.{" "}
            <br />
            4. Discover popular, offbeat, lesser-known and more treks. <br />
            5. Perfect for first timers.
          </p>

          <Link
            to="/trek/TrekPreferenceSelector"
            className="btn btn-primary mt-2"
          >
            Go somewhere
          </Link>
        </div>
      </div>

      {/* Learning */}
      <br />
      <br />
      <br />
      <br />
      <div className="learning">
        <div className="l-text">
          <div className="l-heading">
            Looking for the Perfect Time Out with Family & <br />
            Kids?
          </div>
          <div className="l-heading2">
            Discover Trails Made for Every Generation
          </div>
          <div className="l-para">
            Browse our Family & Kids Trekking section and pick trails that
            promise <br />
            adventure and memories in the safest way.
          </div>
          <Link to="/trek/TrekPreferenceSelector" className="l-button">
            Click here to know more
          </Link>
        </div>
      </div>

      {/*Essential Trekking Gear Section*/}
      <u>
        <h1 className="upcoming-heading">
          Essential Trekking Gear for Himalayan Adventures
        </h1>
      </u>
      <div className="trekking-gear-container">
        {/* BUY Section */}
        <div className="trekking-gear-card buy-card">
          <div className="gear-image-container">
            <img
              src="https://i.ibb.co/3yQL1TFX/p20.png"
              alt="Buy Trekking Gear"
              className="gear-image"
            />
          </div>
          <div className="gear-content">
            <h3 className="gear-title">Buy Premium Trekking Equipment</h3>
            <p className="gear-description">
              Purchase high-quality trekking gear from top brands. Our
              collection includes backpacks, trekking poles, sleeping bags,
              tents, and more to ensure your adventure is comfortable and safe.
            </p>
            <Link to="/buy-panel" className="gear-button buy-button">
              Shop Now
            </Link>
          </div>
        </div>

        {/* RENT Section */}
        <div className="trekking-gear-card rent-card">
          <div className="gear-image-container">
            <img
              src="https://i.ibb.co/xqVsGpDT/fdfe02c8-662d-4018-8ca9-ec4264d91265.jpg"
              alt="Rent Trekking Gear"
              className="gear-image"
            />
          </div>
          <div className="gear-content">
            <h3 className="gear-title">Rent Trekking Equipment</h3>
            <p className="gear-description">
              Save money and pack light by renting premium trekking gear for
              your expedition. We offer flexible rental periods with
              well-maintained equipment for all your needs.
            </p>
            <Link to="/trek/panel" className="gear-button rent-button">
              Explore Rentals
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />

      {/* YouTube Links Section */}
      <>
        <u>
          <h1 className="upcoming-heading">
            Trekkers' Video Reviews - Real Himalayan Experiences
          </h1>
        </u>

        <div className="home-wrapper">
          <div className="scroll-container" id="scrollableDiv">
            {videos.map(({ id, title }) => (
              <div key={id} className="card-wrapper">
                <div
                  className="card scroll-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPlayingVideoId(id)} // entire card clickable
                >
                  <div className="thumbnail-container">
                    <img
                      src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                      alt={title}
                      className="card-img-top"
                    />
                    <div className="play-icon-overlay">
                      <div className="play-triangle"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />

        {/* Video Modal */}
        {playingVideoId && (
          <div
            className="video-modal"
            onClick={closePlayer} // close on clicking outside
          >
            <div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()} // prevent close on clicking inside
            >
              <button className="close-btn" onClick={closePlayer}>
                &times;
              </button>
              <iframe
                width="800"
                height="450"
                src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </>
      {/* certificates */}
      <div>
        <h2 className="upcoming-heading">🎓 Awards & Certificates</h2>
        <div className="cert-scroll-wrapper">
          {certificates.map(({ id, image }) => (
            <div key={id} className="cert-card">
              <img src={image} alt={`Certificate ${id}`} className="cert-img" />
            </div>
          ))}
        </div>
      </div>

      {/* faqs */}
      <div className="faq-section">
        <h2 className="upcoming-heading">📌 Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${openIndex === index ? "open" : ""}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
