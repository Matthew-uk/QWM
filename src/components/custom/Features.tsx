import { FaLock, FaChartBar, FaUserShield } from 'react-icons/fa';

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Why Choose Quick Wealth Market
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FaLock,
              title: 'Secure Investments',
              description:
                'Your investments are protected by state-of-the-art security measures and insurance.',
              color: 'blue',
            },
            {
              icon: FaChartBar,
              title: 'Data-Driven Insights',
              description:
                'Make informed decisions with our advanced analytics and market insights.',
              color: 'green',
            },
            {
              icon: FaUserShield,
              title: 'Expert Support',
              description:
                'Our team of financial experts is always ready to assist you with your investment strategy.',
              color: 'purple',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`bg-${feature.color}-100 rounded-full p-3 inline-block mb-4`}
              >
                <feature.icon
                  className={`text-4xl text-${feature.color}-600`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
