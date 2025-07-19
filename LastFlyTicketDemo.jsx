import { useState } from "react";

export default function LastFlyTicketDemo() {
  const [departure, setDeparture] = useState("TLV");
  const [emotion, setEmotion] = useState("לברוח");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const emotionToDestination = (emotion) => {
    switch (emotion) {
      case "לברוח":
        return "LCA";
      case "הרפתקה":
        return "BCN";
      case "שקט":
        return "ATH";
      case "אהבה":
        return "ROM";
      default:
        return "LIS";
    }
  };

  const searchFlights = async () => {
    const destination = emotionToDestination(emotion);
    const url = `https://kiwi-com-cheap-flights.p.rapidapi.com/v2/search?fly_from=${departure}&fly_to=${destination}&date_from=2025-07-21&date_to=2025-07-21&flight_type=oneway&adults=1&curr=USD&locale=en`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9f645d5a25msh33ec48fcf2dae40p1f6607jsn54f870fdd02a",
        "X-RapidAPI-Host": "kiwi-com-cheap-flights.p.rapidapi.com",
      },
    };

    setLoading(true);
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      const flight = data?.data?.[0];

      if (flight) {
        setResults({
          destination: flight.cityTo,
          price: `$${flight.price}`,
          departureTime: new Date(flight.dTimeUTC * 1000).toLocaleString(),
          description: emotion,
        });
      } else {
        setResults({
          destination: "לא נמצאו טיסות כרגע",
          price: "-",
          departureTime: "-",
          description: "נסה שוב מאוחר יותר",
        });
      }
    } catch (err) {
      setResults({
        destination: "שגיאת שרת",
        price: "-",
        departureTime: "-",
        description: "נסה שוב",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-center p-8 font-sans">
      <h1 className="text-4xl font-bold mb-4">Last Fly Ticket by Noah ✈️</h1>
      <p className="mb-6">בחר שדה תעופה ומצב רגשי – נמצא לך טיסה של הרגע האחרון</p>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <select value={departure} onChange={(e) => setDeparture(e.target.value)} className="p-2 border rounded">
          <option value="TLV">תל אביב (TLV)</option>
          <option value="JFK">ניו יורק (JFK)</option>
          <option value="LHR">לונדון (LHR)</option>
        </select>

        <select value={emotion} onChange={(e) => setEmotion(e.target.value)} className="p-2 border rounded">
          <option value="לברוח">לברוח</option>
          <option value="הרפתקה">הרפתקה</option>
          <option value="שקט">שקט</option>
          <option value="אהבה">אהבה</option>
        </select>

        <button onClick={searchFlights} className="px-4 py-2 bg-black text-white rounded">
          {loading ? "מחפש..." : "מצא לי טיסה"}
        </button>
      </div>

      {results && (
        <div className="max-w-md mx-auto bg-gray-100 p-6 rounded shadow text-right">
          <h2 className="text-xl font-bold mb-2">הטיסה שלך:</h2>
          <p><strong>יעד:</strong> {results.destination}</p>
          <p><strong>מחיר:</strong> {results.price}</p>
          <p><strong>זמן יציאה:</strong> {results.departureTime}</p>
          <p><strong>חוויה:</strong> {results.description}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">אני לוקח את זה</button>
        </div>
      )}
    </div>
  );
}

