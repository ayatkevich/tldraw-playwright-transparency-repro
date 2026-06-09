import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import './App.css'

function App() {
  return (
    <main className="app-shell" data-testid="tldraw-shell">
      <Tldraw />
      <div className="app-marker" aria-hidden="true">
        tldraw playwright repro
      </div>
    </main>
  )
}

export default App
