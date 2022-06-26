import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
