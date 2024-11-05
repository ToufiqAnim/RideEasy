const Testimonials = () => {
  return (
    <div className="bg-white py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-orange-400 font-semibold">* Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What our customers are <br className="hidden md:block" /> saying about
          us
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            name: "Alis White",
            title: "Project Manager",
            image: "https://via.placeholder.com/40",
            rating: 4,
            review:
              "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
          },
          {
            name: "Floyd Miles",
            title: "Project Manager",
            image: "https://via.placeholder.com/40",
            rating: 5,
            review:
              "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
          },
          {
            name: "Annette Black",
            title: "Project Manager",
            image: "https://via.placeholder.com/40",
            rating: 5,
            review:
              "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < testimonial.rating ? "text-orange-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">{testimonial.review}</p>
            <hr className="my-2" />
            <div className="flex items-center mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
