import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselImages = [
    {
      url: "/api/placeholder/1200/600",
      title: "Innovation in Automotive Solutions",
      description: "Leading the industry with cutting-edge automotive technology"
    },
    {
      url: "/api/placeholder/1200/600",
      title: "Global Services Network",
      description: "Providing world-class service and support around the globe"
    },
    {
      url: "/api/placeholder/1200/600",
      title: "Sustainable Business Practices",
      description: "Committed to environmental responsibility and sustainable growth"
    }
  ];

  const services = [
    {
      title: "Contract Management",
      description: "Comprehensive contract lifecycle management with advanced tracking and compliance features",
      icon: "📝"
    },
    {
      title: "Data Analytics",
      description: "Turn your automotive data into actionable insights with our advanced analytics solutions",
      icon: "📊"
    },
    {
      title: "Financial Services",
      description: "Streamline your financial operations with our integrated financial management tools",
      icon: "💰"
    },
    {
      title: "Supply Chain Solutions",
      description: "Optimize your supply chain with our end-to-end visibility and management platform",
      icon: "🔄"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <div className="relative h-96 md:h-screen max-h-[600px] w-full overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h1>
              <p className="text-xl md:text-2xl max-w-3xl">{image.description}</p>
              <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                Learn More
              </Button>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to meet all your automotive business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <Link to={`#`} className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Analytics Spotlight */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Analytics Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced data analytics platform helps automotive businesses transform raw data into actionable insights. 
                Optimize operations, predict maintenance needs, and identify new opportunities for growth and efficiency.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Real-time performance monitoring
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Predictive maintenance analytics
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Supply chain optimization
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Customer behavior insights
                </li>
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Explore Analytics Solutions
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/api/placeholder/600/400" 
                alt="Data Analytics Dashboard" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Financial Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Management Tools</h2>
              <p className="text-lg text-gray-600 mb-6">
                Streamline your financial operations with our comprehensive suite of financial management tools.
                From contract management to invoicing and payment processing, we provide the solutions you need.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Automated contract management
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Integrated invoicing system
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Financial reporting and analytics
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Compliance monitoring
                </li>
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Discover Financial Solutions
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/api/placeholder/600/400" 
                alt="Financial Management Dashboard" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contract Details Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Contract Management</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive contract lifecycle management for automotive businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contract Creation</h3>
              <p className="text-gray-600 mb-4">
                Create standardized contracts with customizable templates. Ensure consistency and compliance across all agreements.
              </p>
              <Link to="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contract Tracking</h3>
              <p className="text-gray-600 mb-4">
                Monitor key dates, milestones, and obligations. Get automated alerts for renewals, expirations, and compliance requirements.
              </p>
              <Link to="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contract Analytics</h3>
              <p className="text-gray-600 mb-4">
                Gain insights from your contract data. Identify optimization opportunities and reduce risks across your contract portfolio.
              </p>
              <Link to="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Yazaki</h3>
              <p className="text-gray-300">
                Yazaki Automotive is a leading global supplier of vehicle power and data solutions to automotive customers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white">Contract Management</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Data Analytics</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Financial Services</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Supply Chain Solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">News & Events</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p>1234 Automotive Drive</p>
                <p>Detroit, MI 48226</p>
                <p className="mt-2">Email: info@yazakiautomotive.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">&copy; {new Date().getFullYear()} Yazaki Automotive. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link to="#" className="text-gray-300 hover:text-white">Terms of Service</Link>
              <Link to="#" className="text-gray-300 hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;