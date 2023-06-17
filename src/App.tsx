import ThreeRenderer from "./renderer";

import "./App.css";
import { useState } from "react";

function App() {
  const [statsHidden, setStatsHidden] = useState(false);
  const [controlsZoom, setControlsZoom] = useState(false);

  function toggleStats(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setStatsHidden(!statsHidden);
  }

  function toggleZoom(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setControlsZoom(!controlsZoom);
  }

  return (
    <main>
      <div id="container">
        <ThreeRenderer
          statsHidden={statsHidden}
          controlsZoom={controlsZoom}
        />
      </div>
      <div className="flex min-w-full justify-center items-center">
        <div className="p-4 w-full sm:w-3/4 bg-white rounded-md">
          <div className="space-y-2">
            <section className="w-full border-b border-black mb-4">
              <h1 className="font-bold text-xl mx-2 inline">Three.JS</h1>
              <h2 className="inline">
                <a
                  href="https://github.com/momozahara/react-ts-three-animation-keyframes"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </h2>
            </section>
            <section>
              <p>
                I am surprised that someone actually found this site via search
                engine, so I decided to add this paragraph. You can access the
                source by going to the root domain of this site, but I will add
                a link to github repository to cut corner
              </p>
            </section>
            <section className="space-x-2">
              <button
                className="border border-black p-1 rounded-md hover:cursor-pointer"
                onClick={toggleStats}
              >
                Toggle Stats
              </button>
              <button
                className="border border-black p-1 rounded-md hover:cursor-pointer"
                onClick={toggleZoom}
              >
                Toggle Zoom {controlsZoom ? "On" : "Off"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
