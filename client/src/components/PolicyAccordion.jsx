import React from "react";

const PoliciesAccordion = () => {
  const policies = [
    {
      title: "Driver's License Requirements",
      content: "Details about driver's license requirements.",
    },
    {
      title: "Insurance and Coverage Policy",
      content: "Information about insurance and coverage.",
    },
    {
      title: "Available Payment Methods",
      content: "Accepted payment methods for rentals.",
    },
    {
      title: "Cancellation and Modification Policy",
      content: "Policy details for cancellations and modifications.",
    },
    {
      title: "Smoking and Pet Policies",
      content: "Guidelines for smoking and pets in rental cars.",
    },
    {
      title: "Minimum Age Requirements",
      content: "Age requirements to rent a vehicle.",
    },
  ];

  return (
    <div>
      <div>
        <h5 className="text-red-500 font-semibold text-sm mb-3">
          Rental Conditions
        </h5>
        <h2 className="text-2xl font-bold mb-6">Policies and Agreement</h2>
      </div>

      {policies.map((policy, index) => (
        <div
          key={index}
          className="collapse collapse-arrow border border-base-300 rounded-box"
        >
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            {policy.title}
          </div>
          <div className="collapse-content">
            <p>{policy.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoliciesAccordion;
