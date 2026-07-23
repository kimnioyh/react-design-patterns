import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { patterns } from './patterns'
import './App.css'

const App = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <h1>Design Patterns</h1>
        <ul>
          {patterns.map((p) => (
            <li key={p.path}>
              <NavLink to={p.path}>
                <span className="day">Day {p.day}</span>
                {p.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to={patterns[0].path} replace />} />
          {patterns.map((p) => (
            <Route key={p.path} path={p.path} element={<p.Component />} />
          ))}
          <Route path="*" element={<p>404 — 패턴 없음</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
