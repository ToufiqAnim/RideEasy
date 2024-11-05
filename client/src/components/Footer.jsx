const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-bold text-[#ff3600]">RIDEEASY</h2>
            <p className="mt-2 text-sm">
              Experience the ease and convenience of renting a car with
              RIDEEASY.
            </p>
          </div>

          {/* Legal Policy */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold">Legal Policy</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Term & Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Car Type
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold">
              Subscribe To The Newsletters
            </h3>
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="email"
                placeholder="Email..."
                className="w-full p-2 rounded-md text-black focus:outline-none"
              />
              <button className="p-2 bg-customBackground rounded-md text-white hover:bg-orange-600">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-700 text-sm space-y-4 md:space-y-0">
          <p>© 2024 RIDEEASY. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500">
              YouTube
            </a>
            <a href="#" className="hover:text-orange-500">
              Facebook
            </a>
            <a href="#" className="hover:text-orange-500">
              Twitter
            </a>
            <a href="#" className="hover:text-orange-500">
              Instagram
            </a>
            <a href="#" className="hover:text-orange-500">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
