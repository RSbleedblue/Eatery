import './App.css';
import ExploreSection from './components/exploreSection';
import PopularRestaurants from './components/popularRestaurants';
import Landing from './pages/landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} >
          <Route path = "" element={<PopularRestaurants/>}/>
          <Route path='explore' element={<ExploreSection/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
