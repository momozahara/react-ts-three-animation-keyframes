import ThreeRenderer from "./renderer";

import "./App.css";
import { MouseEvent } from "react";

function toggleStats(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  let stats = document.getElementById("stats");
  if (stats?.hidden === true) {
    stats.hidden = false;
  } else if (stats?.hidden === false) {
    stats.hidden = true;
  }
}

function App() {
  return (
    <main>
      <div id="container">
        <ThreeRenderer />
      </div>
      <div className="flex min-w-full justify-center items-center">
        <div className="p-4 w-full sm:w-3/4 bg-white rounded-md">
          <div>
            <section className="w-full border-b border-black mb-4">
              <h1 className="font-bold text-xl mx-2">Three.JS</h1>
            </section>
            <section>
              <button
                className="border border-black p-1 rounded-md hover:cursor-pointer"
                onClick={toggleStats}
              >
                Toggle Stats
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
