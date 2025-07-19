import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function LastFlyTicketDemo() {
  const [departure, setDeparture] = useState("")
  const [emotion, setEmotion] = useState("")
  const [results, setResults] = useState(null)

  const emotionToDestination = (emotion) => {
    switch (emotion.toLowerCase()) {
      case "לברוח":
        return "LCA"
      case "הרפתקה":
        return "BCN"
      case "שקט":
        return "ATH"
      case "אהבה":
        return "ROM"
      default:
        return "LIS"
    }
  }

  const searchFlights = async () => {
    const destination = emotionToDestination(emotion)
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9f645d5a25msh33ec48fcf2dae40p1f6607jsn54f870fdd02a',
        'X-RapidAPI-Host': 'kiwi-com-cheap-flights.p.rapidapi.com'
      }
    }

    try {
      const res = await fetch(`https://kiwi-com-cheap-flights.p.rapidapi.com/one-way?source=TLV&destination=${destination}&date=2025-07-20`, options)
      const data = await res.json()
      const flight = data?.data?.[0]

      if (flight) {
        setResults({
          destination: flight.destinationCity,
          price: `$${flight.price}`,
          description: emotion,
          flightTime: flight.departureTime
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
      <h1 className="text-3xl font-bold mb-4">Last Fly Ticket</h1>
      <p className="mb-6 text-gray-600">בחר שדה תעופה ומצב רגשי – ואנחנו נמצא לך טיסה של הרגע האחרון</p>

      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="מאיפה אתה ממריא? (למשל: תל אביב)"
          value={departure}
          onChange={e => setDeparture(e.target.value)}
        />
        <Input
          placeholder="איך אתה מרגיש? (לברוח / הרפתקה / שקט / אהבה)"
          value={emotion}
          onChange={e => setEmotion(e.target.value)}
        />
        <Button onClick={searchFlights}>מצא לי טיסה</Button>
      </div>

      {results && (
        <Card className="mt-8 w-full max-w-md">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">הטיסה שלך:</h2>
            <p><strong>יעד:</strong> {results.destination}</p>
            <p><strong>מחיר:</strong> {results.price}</p>
            <p><strong>יציאה:</strong> {results.flightTime}</p>
            <p><strong>חוויה:</strong> {results.description}</p>
            <Button className="w-full mt-4">אני לוקח את זה ✈️</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
