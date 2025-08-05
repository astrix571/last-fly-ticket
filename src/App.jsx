import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <h1 className="text-2xl font-bold">Last Fly Ticket</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <p className="text-lg">Welcome to your emotional travel planner ✈️</p>
        {/* Future: Emotion Detection Chat UI goes here */}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Last Fly Ticket. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
