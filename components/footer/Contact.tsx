import Footer from "../Footer";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Contact LYNKS</h1>
        <p className="text-gray-700 mb-6">
          We’re here to help! If you have any questions, concerns, or feedback
          about our products, services, or the Terms of Service, please don’t
          hesitate to reach out to us. Our team is happy to assist you.
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
          <p className="text-gray-700 mb-4">
            For questions related to your orders, shipping, returns, or any
            other inquiries, please contact our customer support team. We aim to
            respond as quickly as possible to ensure your LYNKS experience is
            smooth and enjoyable.
          </p>
          <p className="text-gray-700 mb-4">You can reach us by:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Email:{" "}
              <a href="mailto:support@lynks.com" className="text-purple-600">
                support@lynks.com
              </a>
            </li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Mailing Address: 123 Fashion Street, City, Country</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Business Inquiries</h2>
          <p className="text-gray-700 mb-4">
            For any business or partnership inquiries, please reach out to our
            business development team. We are always open to collaboration and
            exploring new opportunities with other brands, influencers, and
            artists.
          </p>
          <p className="text-gray-700 mb-4">You can contact us at:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Email:{" "}
              <a href="mailto:business@lynks.com" className="text-purple-600">
                business@lynks.com
              </a>
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our{" "}
            <a href="/terms" className="text-purple-600">
              Terms of Service
            </a>
            , including our return policies, intellectual property, or privacy
            practices, please don't hesitate to reach out. We're committed to
            maintaining transparency and clear communication with our customers.
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-8">
          We appreciate your feedback and are here to make your shopping
          experience as seamless as possible.
        </p>
      </main>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
};

export default Contact;
