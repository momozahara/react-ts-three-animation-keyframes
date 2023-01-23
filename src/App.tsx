import ThreeRenderer from "./renderer";

import "./App.css";

function App() {
  return (
    <main>
      <div
        id="container"
        style={{
          height: "100vh",
        }}
      />
      <ThreeRenderer />
    </main>
  );
}

export default App;
