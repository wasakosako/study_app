import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./hooks/userContext";
import { BarChart } from "./components/organisms/graphs/BarGrapth";
import { DoughnutChart } from "./components/pages/Report";
import { Temp } from "./components/pages/temppage";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { SidebarLayout } from "./components/templates/Layout";
import { Top } from "./components/pages/Top";
import { Record } from "./components/pages/Record";
import { TimeLine } from "./components/pages/TimeLine";
import { OtherProfile } from "./components/pages/OtherProfile";
import { Page404 } from "./components/pages/Page404";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Bar" element={<BarChart />} />
            <Route path="/Report" element={<DoughnutChart />} />
            <Route path="/test" element={<Temp />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<SidebarLayout />}>
              <Route path="/Top" element={<Top />} />
              <Route path="/Top/Record" element={<Record />} />
              <Route path="/Timeline" element={<TimeLine />} />
              <Route path="/profile/:username" element={<OtherProfile />} />
              <Route path="/*" element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
