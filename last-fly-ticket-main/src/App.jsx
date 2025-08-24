import { useState } from "react";

export default function App() {
  const [departure, setDeparture] = useState("");
  const [emotion, setEmotion] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emotionToDestination = (emotion) => {
    switch (emotion.toLowerCase()) {
      case "לברוח":
        return "LCA"; // לרנקה
      case "הרפתקה":
        return "BCN"; // ברצלונה
      case "שקט":
        return "ATH"; // אתונה
      case "אהבה":
        return "ROM"; // רומא
      default:
        return "LIS"; // ליסבון
    }
  };

  const searchFlights = async () => {
    setLoading(true);
    setResults(null);
    setError(null);

    const destination = emotionToDestination(emotion);

    const todayPlusTwo = new Date();
    todayPlusTwo.setDate(todayPlusTwo.getDate() + 2);
    const formattedDate = todayPlusTwo.toISOString().split("T")[0];

    const url = `https://kiwi-com-cheap-flights.p.rapidapi.com/v2/search?fly_from=${departure}&fly_to=${destination}&date_from=${formattedDate}&date_to=${formattedDate}&flight_type=oneway&adults=1&curr=USD&locale=en`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9f645d5a25msh33ec48fcf2dae40p1f6607jsn54f870fdd02a',
        'X-RapidAPI-Host': 'kiwi-com-cheap-flights.p.rapidapi.com'
      }
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      const flight = data?.data && data.data.length > 0 ? data.data[0] : null;

      if (flight) {
        setResults({
          destination: flight.cityTo,
          price: `$${flight.price}`,
          description: emotion,
          flightTime: flight.route[0]?.local_departure?.split("T")[1]?.slice(0, 5) || "--"
        });
      } else {
        setError("לא נמצאו טיסות בתאריך הזה. נסה מיקום אחר או רגש אחר.");
      }
    } catch (error) {
      console.error("שגיאה בחיפוש טיסות:", error);
      setError("שגיאה בשרת – אנא נסה שוב בעוד כמה דקות.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>Last Fly Ticket</h1>
      <p>בחר שדה תעופה ומצב רגשי – ואנחנו נמצא לך טיסה</p>

      <input
        type="text"
        placeholder="מאיפה אתה ממריא? (למשל TLV)"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        style={{ display: "block", margin: "1rem 0", padding: "0.5rem", width: "100%" }}
      />

      <input
        type="text"
        placeholder="איך אתה מרגיש? (לברוח / הרפתקה / שקט / אהבה)"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        style={{ display: "block", margin: "1rem 0", padding: "0.5rem", width: "100%" }}
      />

      <button
        onClick={searchFlights}
        disabled={loading || !departure || !emotion}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
      >
        {loading ? "מחפש טיסה..." : "מצא לי טיסה"}
      </button>

      {error && (
        <div style={{ marginTop: "2rem", color: "red", border: "1px solid red", padding: "1rem", background: "#ffe6e6" }}>
          <strong>⚠️ שגיאה:</strong> {error}
        </div>
      )}

      {results && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", background: "#f9f9f9" }}>
          <h2>הטיסה שלך:</h2>
          <p><strong>יעד:</strong> {results.destination}</p>
          <p><strong>מחיר:</strong> {results.price}</p>
          <p><strong>יציאה:</strong> {results.flightTime}</p>
          <p><strong>חוויה:</strong> {results.description}</p>
        </div>
      )}
    </div>
  );
}
