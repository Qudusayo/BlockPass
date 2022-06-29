import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import AuthContainer from "./components/AuthContainer/AuthContainer";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Events from "./pages/Events/Events";

function Wrapper(params) {
  return <AuthContainer>{params}</AuthContainer>;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
        <Route
          path="/manage/events/create"
          element={Wrapper(<CreateEvent />) }
        />
        <Route
          path="/organisation/events"
          element={Wrapper(<Events />)}
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
