import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Overview from './page/Overview'
import OverviewAd from './page/OverviewAd';
import OverviewSimple from './page/OverviewSimple'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/overview_simple" element={<OverviewSimple />} />
          <Route path="/overview_ad" element={<OverviewAd />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
