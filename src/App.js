import Navbar from "./Layout/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Footer from "./Layout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import AuthContainer from "./Layout/AuthContainer/AuthContainer";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Events from "./pages/Events/Events";
import BasicInfo from "./pages/BasicInfo/BasicInfo";
import EventManager from "./Layout/EventManager/EventManager";

function Wrapper(params) {
  return <AuthContainer>
    <BasicInfo>{params}</BasicInfo>
  </AuthContainer>;
}

function EventMg(params) {
  return (
    <AuthContainer>
      <EventManager>{params}</EventManager>
    </AuthContainer>
  );
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
          element={Wrapper(<CreateEvent />)}
        />
        <Route path="/organisation/events" element={Wrapper(<Events />)} />
        <Route path="/basicinfo" element={EventMg(<CreateEvent />)} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
