import { useEffect, useState } from "react";
import "./App.css";

type SystemInfo = {
  platform: string;
  architecture: string;
  hostname: string;
  uptime: number;
  cpu: {
    model: string;
    cores: number;
    speed: number;
  };
  memory: {
    total: number;
    free: number;
  };
};

function App() {
  const [system, setSystem] = useState<SystemInfo | null>(null);

  useEffect(() => {
    fetch("/api/system")
      .then((res) => res.json())
      .then((data) => setSystem(data))
      .catch((err) => console.error(err));
  }, []);

  if (!system) {
    return (
      <div className="loading">
        <div className="loader" />
        <p>Connecting to Android server...</p>
      </div>
    );
  }

  const totalGB = system.memory.total / 1024 ** 3;
  const freeGB = system.memory.free / 1024 ** 3;
  const usedGB = totalGB - freeGB;
  const memoryPercent = (usedGB / totalGB) * 100;

  const uptimeHours = Math.floor(system.uptime / 3600);
  const uptimeMinutes = Math.floor((system.uptime % 3600) / 60);

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="eyebrow">SYSTEM MONITOR</div>
          <h1>Android Dashboard</h1>
          <p className="subtitle">
            Real-time information from your Termux server
          </p>
        </div>

        <div className="status">
          <span className="status-dot" />
          Server Online
        </div>
      </header>

      <main className="dashboard">

        {/* Device */}
        <section className="card device-card">
          <div className="card-title">
            <span className="icon">📱</span>
            <div>
              <h2>Device</h2>
              <p>System information</p>
            </div>
          </div>

          <div className="device-info">
            <div>
              <span>Platform</span>
              <strong>{system.platform}</strong>
            </div>

            <div>
              <span>Architecture</span>
              <strong>{system.architecture}</strong>
            </div>

            <div>
              <span>Hostname</span>
              <strong>{system.hostname}</strong>
            </div>
          </div>
        </section>

        {/* CPU */}
        <section className="card">
          <div className="card-title">
            <span className="icon">⚡</span>
            <div>
              <h2>CPU</h2>
              <p>Processor information</p>
            </div>
          </div>

          <div className="metric">
            <span>Cores</span>
            <strong>{system.cpu.cores}</strong>
          </div>

          <div className="metric">
            <span>Speed</span>
            <strong>{system.cpu.speed} MHz</strong>
          </div>

          <div className="cpu-model">
            {system.cpu.model}
          </div>
        </section>

        {/* Memory */}
        <section className="card">
          <div className="card-title">
            <span className="icon">🧠</span>
            <div>
              <h2>Memory</h2>
              <p>RAM usage</p>
            </div>
          </div>

          <div className="memory-value">
            <strong>{usedGB.toFixed(2)} GB</strong>
            <span>used</span>
          </div>

          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${memoryPercent}%` }}
            />
          </div>

          <div className="memory-footer">
            <span>{memoryPercent.toFixed(0)}% used</span>
            <span>{totalGB.toFixed(2)} GB total</span>
          </div>
        </section>

        {/* Uptime */}
        <section className="card uptime-card">
          <div className="card-title">
            <span className="icon">⏱️</span>
            <div>
              <h2>Uptime</h2>
              <p>Server running time</p>
            </div>
          </div>

          <div className="uptime">
            <strong>{uptimeHours}</strong>
            <span>hours</span>

            <strong>{uptimeMinutes}</strong>
            <span>minutes</span>
          </div>
        </section>

      </main>

      <footer>
        <span>Node.js + Express</span>
        <span>•</span>
        <span>React + TypeScript</span>
        <span>•</span>
        <span>Termux</span>
      </footer>
    </div>
  );
}

export default App;