import { useState } from "react"

export default function LastFlyTicketDemo() {
  const [departure, setDeparture] = useState("")
  const [emotion, setEmotion] = useState("")
  const [results, setResults] = useState(null)

  const emotionToDestination = (emotion) => {
    switch (emotion.toLowerCase()) {
      case "לברוח":
        return "LCA" // לרנקה
      case "הרפתקה":
        return "BCN" // ברצלונה
      case "שקט":
        return "ATH" // אתונה
      case "אהבה":
        return "ROM" // רומא
      default:
        return "LIS" // ליסבון
    }
  }

  const searchFlights = async () => {
    const destination = emotionToDestination(emotion)

    const todayPlusTwo = new Date()
    todayPlusTwo.setDate(todayPlusTwo.getDate() + 2)
    const formattedDate = todayPlusTwo.toISOString().split("T")[0]

    const url = `https://kiwi-com-cheap-flights.p.rapidapi.com/v2/search?fly_from=${departure}&fly_to=${destination}&date_from=${formattedDate}&date_to=${formattedDate}&flight_type=oneway&adults=1&curr=USD&locale=en`

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9f645d5a25msh33ec48fcf2dae40p1f6607jsn54f870fdd02a',
        'X-RapidAPI-Host': 'kiwi-com-cheap-flights.p.rapidapi.com'
      }
    }

    try {
      const res = await fetch(url, options)
      const data = await res.json()

      const flight = data?.data && data.data.length > 0 ? data.data[0] : null

      if (flight) {
        setResults({
          destination: flight.cityTo,
          price: `$${flight.price}`,
          description: emotion,
          flightTime: flight.route[0]?.local_departure?.split("T")[1]?.slice(0,5) || "--"
        })
      } else {
        setResults({
          destination: "לא נמצאו טיסות כרגע",
          price: "-",
          description: "נסה שוב מאוחר יותר",
          flightTime: "-"
        })
      }
    } catch (error) {
      console.error("שגיאה בחיפוש טיסות:", error)
      setResults({
        destination: "שגיאה בשרת",
        price: "-",
        description: "אנא נסה שוב",
        flightTime: "-"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-1">Last Fly Ticket <span className="text-sm text-gray-500">by Noah</span></h1>
      <p className="mb-6 text-gray-600">בחר שדה תעופה ומצב רגשי – ואנחנו נמצא לך טיסה של הרגע האחרון</p>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="מאיפה אתה ממריא? (למשל: TLV)"
          value={departure}
          onChange={e => setDeparture(e.target.value)}
        />
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="איך אתה מרגיש? (לברוח / הרפתקה / שקט / אהבה)"
          value={emotion}
          onChange={e => setEmotion(e.target.value)}
        />
        <button
          onClick={searchFlights}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          מצא לי טיסה
        </button>
      </div>

      {results && (
        <div className="mt-8 w-full max-w-md bg-white shadow-md rounded p-6 space-y-2 border">
          <h2 className="text-xl font-semibold">הטיסה שלך:</h2>
          <p><strong>יעד:</strong> {results.destination}</p>
          <p><strong>מחיר:</strong> {results.price}</p>
          <p><strong>יציאה:</strong> {results.flightTime}</p>
          <p><strong>חוויה:</strong> {results.description}</p>
          <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded">אני לוקח את זה ✈️</button>
        </div>
      )}
    </div>
  )
}
