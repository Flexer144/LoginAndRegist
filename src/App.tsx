import FormLogin from './Components/FormLogin'
import FormRegister from './Components/FormRegister'
import BG from './assets/BG.png'
import './style/App.css'

function App() {

  return (
    <>
      <main>
        <img src={BG} alt="BackGround" />
        <div className="main-content">
          <FormRegister />
          <FormLogin />
        </div>
      </main>
    </>
  )
}

export default App
