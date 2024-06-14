import NestedComponent from './components/NestedComponent'
import './App.css'

export default function App() {
  return (
    <div
      style={{
        margin: 0,
        display: 'flex',
        height: '100vh',
        background: 'rgb(229 231 235)',
      }}
    >
      <NestedComponent />
    </div>
  )
}
