const CarRentalProcess = () => {
  const steps = [
    {
      title: "Choose A Car",
      description:
        "View our range of cars, find your perfect car for the coming days.",
      number: "01",
    },
    {
      title: "Come In Contact",
      description:
        "Our advisor team is ready to help you with the booking process or any questions.",
      number: "02",
    },
    {
      title: "Enjoy Driving",
      description:
        "Receive the key and enjoy your car. We treat all our cars with respect.",
      number: "03",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h3 className="text-sm font-semibold text-orange-500 mb-2">STEPS</h3>
      <h2 className="text-3xl font-bold mb-8">
        Car Rental <span className="text-orange-500">Process</span>
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 flex flex-col items-center w-full md:w-1/3 shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 mb-4">{step.description}</p>
            <div className="text-white text-lg font-bold bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full">
              {step.number}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarRentalProcess;
