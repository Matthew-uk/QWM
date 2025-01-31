import { FaPills, FaChartLine, FaShieldAlt } from 'react-icons/fa';

export default function InvestmentOpportunity() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Why Invest in Health Drug Stores?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FaPills,
              title: 'Growing Industry',
              description:
                'The pharmaceutical industry is constantly expanding, offering stable investment opportunities.',
              color: 'blue',
            },
            {
              icon: FaChartLine,
              title: 'Potential Returns',
              description:
                'Health drug stores can offer attractive returns on investment over time.',
              color: 'green',
            },
            {
              icon: FaShieldAlt,
              title: 'Regulated Market',
              description:
                'Invest in a well-regulated market with established standards and practices.',
              color: 'purple',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`bg-${item.color}-100 rounded-full p-3 inline-block mb-4`}
              >
                <item.icon className={`text-4xl text-${item.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
