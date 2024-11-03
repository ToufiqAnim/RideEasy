import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Extensive Fleet Options",
      description:
        "Choose from a wide range of vehicles to suit your needs and preferences.",
      icon: "🚗",
    },
    {
      title: "Exceptional Customer Service",
      description:
        "Our team is here to ensure you have a seamless experience, 24/7.",
      icon: "👨‍💼",
    },
    {
      title: "Convenient Locations",
      description:
        "Find our rental stations in multiple locations for easy access.",
      icon: "📍",
    },
    {
      title: "Reliability and Safety",
      description:
        "Drive with confidence knowing our cars are well-maintained and secure.",
      icon: "🔒",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-xl font-semibold text-orange-500 mb-2">
        Why Choose Us
      </h2>
      <h1 className="text-3xl font-bold mb-8">
        Unmatched Quality and Service for Your Needs
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="mb-8 md:mb-0">
          <img
            src="https://i.ibb.co.com/fr9rxX4/hyundai-creta.jpg" // Replace with actual car image
            alt="Car"
            className="w-full h-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <span className="text-4xl mr-4">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
