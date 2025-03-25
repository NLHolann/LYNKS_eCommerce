import Footer from "../Footer";
import HeaderFront from "../HeaderFront";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <HeaderFront />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-6">
          Welcome to <b>LYNKS</b>, your ultimate destination for aesthetic and
          stylish clothing. We are an eCommerce platform dedicated to providing
          high-quality fashion that blends elegance with modern trends.
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At LYNKS, our mission is to connect individuals with unparalleled
            elegance through our carefully curated collections. We aim to
            empower our customers to express their unique style with confidence
            and sophistication.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
          <p className="text-gray-700 mb-4">
            Our eCommerce platform provides a seamless shopping experience,
            offering a wide range of products and services, including:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              A diverse collection of men’s and women’s clothing, featuring
              trendy and artistic designs.
            </li>
            <li>
              Custom-designed clothing for personalized and special orders.
            </li>
            <li>
              Accessories that complement your outfits and enhance your style.
            </li>
            <li>
              Worldwide shipping and reliable customer support to ensure a
              hassle-free shopping experience.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Why Choose LYNKS?</h2>
          <p className="text-gray-700">We stand out by offering:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              High-quality products crafted with attention to detail and
              durability.
            </li>
            <li>
              Exclusive collections that reflect the latest fashion trends.
            </li>
            <li>
              A commitment to sustainability and ethical practices in our
              sourcing and production processes.
            </li>
            <li>
              Exceptional customer service to address your needs and concerns.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-700">
            At LYNKS, we believe in building a community of fashion enthusiasts
            who share a passion for style and creativity. Follow us on social
            media and subscribe to our newsletter to stay updated on our latest
            collections, promotions, and events.
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-8">
          Thank you for choosing LYNKS. We look forward to being your trusted
          partner in fashion.
        </p>
      </main>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
};

export default About;
