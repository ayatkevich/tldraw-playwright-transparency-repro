import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import './App.css'

function App() {
  return (
    <main className="app-shell" data-testid="tldraw-shell">
      <Tldraw />
    </main>
  )
}

export default App
