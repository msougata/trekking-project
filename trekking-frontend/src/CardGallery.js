import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CardGallery.css"; // Custom styles if needed

const CardGallery = () => {
  const cards = [
    {
      id: 1,
      title: "Everest",
      text: "Explore the majestic Everest, the world's highest peak.",
      link: "/trek/everest",
      // Add image URL for Everest
      imageUrl: "https://i.postimg.cc/T3v2rXWz/2ddd325e-e2c9-4483-86bb-133e4f342d63-3.webp",
      // You should replace this with a real image of Everest
    },
    {
      id: 2,
      title: "Kedarnath",
      text: "Embark on the spiritual Kedarnath trek to a sacred Hindu shrine.",
      link: "/trek/kedernath",
      // Add image URL for Kedarnath
      imageUrl: "https://i.ibb.co/whkrHgYS/12cfc10f-ba24-49c8-ad6a-9e938107424d-Kedakantha-3.webp",
      // You should replace this with a real image of Kedarnath
    },
    {
      id: 3,
      title: "Sandakphu",
      text: "Witness panoramic views of Kanchenjunga and Everest from Sandakphu.",
      link: "/trek/sandakphu",
      // Add image URL for Sandakphu
      imageUrl: "https://i.ibb.co/wZY2sGKj/image-2025-06-04-172332099.png",
      // You should replace this with a real image of Sandakphu
    },
    {
      id: 4,
      title: "Ladakh",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Ladakh.",
      link: "/trek/ladakh",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/fzVBqJVy/35d55b0a-b5df-408e-8aa1-c597473ad87b-3.webp",
      // You should replace this with a real image of Ladakh
    },
    {
      id: 5,
      title: "Valley of Flowers",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Valley of Flowers.",
      link: "/trek/TrekPage4",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/zjT7VRJ/pexels-imadclicks-27496409.jpg",
      // You should replace this with a real image of Ladakh
    },
    {
      id: 6,
      title: "HamptaPass Trek",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Hampta Pass.",
      link: "/trek/TrekPage5",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/LDjc6y77/pexels-joegun-13886803.jpg",
      // You should replace this with a real image of Ladakh
    },
    {
      id: 7,
      title: "Roopkund",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Roopkund Trek.",
      link: "/trek/TrekPage6",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/20tLMTw1/pexels-brett-sayles-1922631.jpg",
      // You should replace this with a real image of Ladakh
    },
    {
      id: 8,
      title: "Chadar",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Chadar.",
      link: "/trek/TrekPage7",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/zHXP8g8M/pexels-adrien-stachowiak-170983955-32447965.jpg",
      // You should replace this with a real image of Ladakh
    },
    {
      id: 9,
      title: "Kanchenjunga",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Kanchenjunga.",
      link: "/trek/TrekPage8",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/JwmBk8Vk/pexels-parag-shah-21176646-12174800.jpg",
      // You should replace this with a real image of Ladakh
    },
    {
      id: 10,
      title: "Dzongri",
      text: "Experience a thrilling trek through the high-altitude desert landscapes of Dzongri.",
      link: "/trek/TrekPage9",
      // Add image URL for Ladakh
      imageUrl: "https://i.ibb.co/60QhzssN/pexels-yogendras31-3337153.jpg",
      // You should replace this with a real image of Ladakh
    },
    
  ];

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          {cards.map((card) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={card.id}>
              <div className="card h-100 shadow-sm">
                {/* Replaced <svg> with <img> */}
                <img
                  src={card.imageUrl} // Use the imageUrl from your card data
                  className="card-img-top" // Bootstrap class for top image in card
                  alt={card.title} // Alt text for accessibility
                  style={{ height: "180px", objectFit: "cover" }} // Maintain consistent height and cover area
                />
                <div className="card-body d-flex flex-column">
                  <p className="card-text flex-grow-1">{card.text}</p>
                  <Link to={card.link} className="btn btn-outline-primary btn-sm mt-2">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardGallery;