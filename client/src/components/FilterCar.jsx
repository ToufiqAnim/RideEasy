/* import React from "react";

const CarCard = ({ title, imageUrl }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 000 2h3v3a1 1 0 102 0v-3h3a1 1 0 000-2h-3V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CarGallery = () => {
  const cars = [
    { title: "Sport Car", imageUrl: "path/to/sport-car.jpg" },
    { title: "Convertible Car", imageUrl: "path/to/convertible-car.jpg" },
    { title: "Sedan Car", imageUrl: "path/to/sedan-car.jpg" },
    { title: "Luxury Car", imageUrl: "path/to/luxury-car.jpg" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {cars.map((car, index) => (
        <CarCard key={index} title={car.title} imageUrl={car.imageUrl} />
      ))}
    </div>
  );
};

export default CarGallery;
 */
