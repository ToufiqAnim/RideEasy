const ArticlesSection = () => {
  const articles = [
    {
      date: "August 5, 2024",
      title: "Top Tips For Booking Your Car Rental: What You Need To Know",
      image: "https://i.ibb.co.com/Zgvpbjx/173321.jpg",
      link: "#",
    },
    {
      date: "August 5, 2024",
      title: "Exploring Your Rental Car Options: Sedan, SUV, Or Convertible?",
      image:
        "https://i.ibb.co.com/S3BL5Ln/735304ebcc7ad200dd809e398456b1f4861e1664-8000x5000.webp",
      link: "#",
    },
    {
      date: "August 5, 2024",
      title: "The Pros And Cons Of Renting A Car Vs. Using Rideshare Services",
      image: "https://i.ibb.co.com/Kbb71tx/rent-car.jpg",
      link: "#",
    },
    {
      date: "August 5, 2024",
      title: "Why You Should Consider Renting A Luxury Car For Your Next Trip",
      image: "https://i.ibb.co.com/prL0hTh/rolls-royce-phantom-top-10.webp",
      link: "#",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Stay informed and inspired for your next journey
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <div className="card shadow-xl overflow-hidden">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-[420px] object-cover"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">{articles[0].date}</p>
                <h3 className="text-2xl font-bold my-2">{articles[0].title}</h3>
                <a
                  href={articles[0].link}
                  className="text-orange-500 hover:underline"
                >
                  Read Story →
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Articles */}
          <div className="space-y-6">
            {articles.slice(1).map((article, index) => (
              <div
                key={index}
                className="flex shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-1/3 object-cover"
                />
                <div className="p-4 flex-1">
                  <p className="text-gray-500 text-sm">{article.date}</p>
                  <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                  <a
                    href={article.link}
                    className="text-orange-500 hover:underline"
                  >
                    Read Story →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
