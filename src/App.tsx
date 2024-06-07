import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Gym } from "./pages/tables/Gym";
import { Programs } from "./pages/tables/Programs";
import { Layout } from "./components/Layout";
import { Batches } from "./pages/tables/Batches";
import { GymProfile } from "./pages/GymProfile";
import { SignIn } from "./components/forms/SignIn";
import { FeeCategories } from "./pages/tables/FeeCategories";
import { Members } from "./pages/tables/Members";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gym" element={<Layout children={<Gym />} />} />

          <Route
            path="/gym/:gymId/menu"
            element={<Layout children={<GymProfile />} />}
          />

          <Route
            path="/gym/:gymId/programs"
            element={<Layout children={<Programs />} />}
          />

          {/* This will come later */}
          <Route
            path="/gym/programs"
            element={<Layout children={<Programs />} />}
          />

          <Route
            path="/gym/:gymId/batches/:id"
            element={<Layout children={<Batches />} />}
          />
          <Route
            path="/gym/:gymId/feeCategories"
            element={<Layout children={<FeeCategories />} />}
          />
          <Route
            path="/gym/:gymId/members"
            element={<Layout children={<Members />} />}
          />

          <Route path="/signin" element={<SignIn />} />

          <Route path="/payment" element={<Batches />} />

          <Route path="/test" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
