/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const dataAnalyticsRef = useRef(null);
  const dataAnalyticsInView = useInView(dataAnalyticsRef, { once: true, amount: 0.2 });
  
  const financialServicesRef = useRef(null);
  const financialServicesInView = useInView(financialServicesRef, { once: true, amount: 0.2 });
  
  const contractManagementRef = useRef(null);
  const contractManagementInView = useInView(contractManagementRef, { once: true, amount: 0.2 });
  
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  
  const carouselItems = [
    {
      type: "video",
      url: "/Welcome_To_Yazaki.mp4",
      title: "",
      description: ""
    },
    {
      type: "image",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8c0eTA3Kg0vALHni-Ao4I9Pa4dlpgKqYbUQ&s",
      title: "Innovation in Automotive Solutions",
      description: "Leading the industry with cutting-edge automotive technology"
    },
    {
      type: "image",
      url: "https://www.yazaki-group.com/image/overseas.jpg",
      title: "Global Services Network",
      description: "Providing world-class service and support around the globe"
    },
    {
      type: "image",
      url: "https://www.yazaki-group.com/image/policy.jpg",
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

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    
    if (isAutoplay && (carouselItems[currentSlide].type !== "video" || 
        (videoRef.current && videoRef.current.paused))) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [carouselItems.length, isAutoplay, currentSlide]);

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handlePlay = () => {
        setIsAutoplay(false);
      };
      
      const handlePause = () => {
        setIsAutoplay(true);
      };
      
      const handleEnded = () => {
        setIsAutoplay(true);
        nextSlide();
      };
      
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("ended", handleEnded);
      
      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSlide]);

  const pauseAutoplay = () => {
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    pauseAutoplay();
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    pauseAutoplay();
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const [[page, direction], setPage] = useState([0, 0]);
  useEffect(() => {
    const dir = page < currentSlide ? 1 : -1;
    setPage([currentSlide, dir]);
  }, [currentSlide]);

  //@ts-ignore
  const renderSlideContent = (slide, index) => {
    if (slide.type === "video") {
      return (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <video 
            ref={videoRef}
            src={slide.url}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            autoPlay={index === currentSlide}
            muted={true}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {slide.description}
            </motion.p>
          </div>
        </div>
      );
    } else {
      return (
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url(${slide.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {slide.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link to={'https://www.yazaki-group.com/global/'} target="_blank">
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Carousel */}
      <div className="relative h-96 md:h-screen max-h-[600px] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full"
          >
            {renderSlideContent(carouselItems[currentSlide], currentSlide)}
          </motion.div>
        </AnimatePresence>
        
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10"
          aria-label="Next slide"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} />
        </motion.button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {carouselItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                pauseAutoplay();
                setCurrentSlide(index);
              }}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={index === currentSlide ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={index === currentSlide ? { duration: 0.5 } : { duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <motion.section 
        className="py-16 bg-white"
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900"
              variants={fadeInUp}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Comprehensive solutions to meet all your automotive business needs
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Data Analytics Spotlight */}
      <motion.section 
        className="py-16 bg-gray-100"
        ref={dataAnalyticsRef}
        initial="hidden"
        animate={dataAnalyticsInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-12 mb-8 md:mb-0"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-4"
                variants={fadeInUp}
              >
                Data Analytics Solutions
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 mb-6"
                variants={fadeInUp}
              >
                Our advanced data analytics platform helps automotive businesses transform raw data into actionable insights. 
                Optimize operations, predict maintenance needs, and identify new opportunities for growth and efficiency.
              </motion.p>
              <motion.ul 
                className="space-y-2 mb-6"
                variants={staggerChildren}
              >
                {[
                  "Real-time performance monitoring",
                  "Predictive maintenance analytics",
                  "Supply chain optimization",
                  "Customer behavior insights"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={fadeInUp}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span className="text-blue-600 mr-2">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={'https://www.yazaki-group.com/global/'} target="_blank">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Explore Analytics Solutions
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              variants={fadeInUp}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src="/13333499_7332.svg" 
                alt="Data Analytics Dashboard" 
                className="rounded-lg shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Financial Services Section */}
      <motion.section 
        className="py-16 bg-white"
        ref={financialServicesRef}
        initial="hidden"
        animate={financialServicesInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <motion.div 
              className="md:w-1/2 md:pl-12 mb-8 md:mb-0"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-4"
                variants={fadeInUp}
              >
                Financial Management Tools
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 mb-6"
                variants={fadeInUp}
              >
                Streamline your financial operations with our comprehensive suite of financial management tools.
                From contract management to invoicing and payment processing, we provide the solutions you need.
              </motion.p>
              <motion.ul 
                className="space-y-2 mb-6"
                variants={staggerChildren}
              >
                {[
                  "Automated contract management",
                  "Integrated invoicing system",
                  "Financial reporting and analytics",
                  "Compliance monitoring"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={fadeInUp}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span className="text-blue-600 mr-2">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={'https://careers.yazaki.com/go/Finance-&-Legal/8550000/'} target="_blank">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Discover Financial Solutions
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              variants={fadeInUp}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src="/10601794_42061.svg" 
                alt="Financial Management Dashboard" 
                className="rounded-lg shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contract Details Section */}
      <motion.section 
        className="py-16 bg-gray-100"
        ref={contractManagementRef}
        initial="hidden"
        animate={contractManagementInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900"
              variants={fadeInUp}
            >
              Contract Management
            </motion.h2>
            <motion.p 
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Comprehensive contract lifecycle management for automotive businesses
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                title: "Contract Creation",
                description: "Create standardized contracts with customizable templates. Ensure consistency and compliance across all agreements."
              },
              {
                title: "Contract Tracking",
                description: "Monitor key dates, milestones, and obligations. Get automated alerts for renewals, expirations, and compliance requirements."
              },
              {
                title: "Contract Analytics",
                description: "Gain insights from your contract data. Identify optimization opportunities and reduce risks across your contract portfolio."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeInUp}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-blue-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Automotive Business?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of automotive businesses that trust our solutions to drive growth, 
            efficiency, and innovation in their operations.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
          >
            <Link to={'https://www.yazaki-group.com/global/'} target="_blank">
              <Button className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6">
                Schedule a Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
          
          <motion.div 
            className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 ml-[35%]">&copy; {new Date().getFullYear()} Yazaki Automotive. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;