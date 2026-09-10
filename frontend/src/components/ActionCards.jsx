import { Link } from 'react-router-dom'

function ActionCards() {
  const cards = [
    {
      title: "Submit Waste",
      icon: "♻️",
      color: "bg-green-500",
      path: "/submit-waste"
    },
    {
      title: "Track Pickups",
      icon: "🚚",
      color: "bg-blue-500",
      path: "/mypickups"
    },
    {
      title: "View Rewards",
      icon: "💰",
      color: "bg-purple-500",
      path: "/rewards"
    },
    {
      title: "Find Centers",
      icon: "📍",
      color: "bg-orange-500",
      path: "/find-centers"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <Link key={index} to={card.path}>
          <div
            className={`${card.color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300 cursor-pointer`}
          >
            <div className="text-4xl">{card.icon}</div>

            <h2 className="text-xl font-bold mt-4">
              {card.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ActionCards