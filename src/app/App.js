import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Overview from './page/Overview'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
