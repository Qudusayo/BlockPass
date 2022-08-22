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
import Details from "./pages/Details/Details";
import Ticket from "./pages/Ticket/Ticket";
import Publish from "./pages/Publish/Publish";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Dashboard from "./pages/Dashboard/Dashboard";

function Wrapper(params) {
  return (
    <AuthContainer>
      <BasicInfo>{params}</BasicInfo>
    </AuthContainer>
  );
}

function EventMg(params) {
  return (
    <AuthContainer>
      <EventManager>{params}</EventManager>
    </AuthContainer>
  );
}

function App() {
  const { Moralis } = useMoralis();
  useEffect(() => {
    window.Moralis = Moralis;
  }, [Moralis]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/event/:eid" element={<Event />} />
        <Route
          path="/manage/events/create"
          element={Wrapper(<CreateEvent />)}
        />
        <Route path="/organisation/events" element={Wrapper(<Events />)} />
        <Route
          path="/manage/events/:eid/basicinfo"
          element={EventMg(<CreateEvent />)}
        />
        <Route
          path="/manage/events/:eid/details"
          element={EventMg(<Details />)}
        />
        <Route
          path="/manage/events/:eid/tickets"
          element={EventMg(<Ticket />)}
        />
        <Route
          path="/manage/events/:eid/publish"
          element={EventMg(<Publish />)}
        />
        <Route
          path="/myevent/:eid"
          element={EventMg(<Dashboard />)}
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
