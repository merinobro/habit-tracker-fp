import './styles/App.css';
import WelcomeScreen from "./screens/WelcomeScreen"
import SignupForm from './screens/SignUpScreen';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      
      
      <Header/>
      <SignupForm/>
     
      
    </div>
  );
}

export default App;
