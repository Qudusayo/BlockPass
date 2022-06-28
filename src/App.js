import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import AuthContainer from "./components/AuthContainer/AuthContainer";
import CreateEvent from "./pages/CreateEvent/CreateEvent";

function Wrapper(params) {
  return <AuthContainer>{params.children}</AuthContainer>;
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
          element={
            <Wrapper>
              <CreateEvent />
            </Wrapper>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
