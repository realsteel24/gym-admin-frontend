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
import { MemberFees } from "./pages/tables/MemberFees";
import { Dashboard } from "./pages/Dashboard";
import { GymNameProvider } from "./context/Gym";
import { TransactionHistory } from "./pages/tables/TransactionHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gym" element={<Layout children={<Gym />} />} />
          <Route
            path="/gym/:gymId/*"
            element={
              <GymNameProvider>
                <Routes>
                  <Route
                    path="menu"
                    element={<Layout children={<GymProfile />} />}
                  />
                  <Route
                    path="programs"
                    element={<Layout children={<Programs />} />}
                  />
                  <Route
                    path="dashboard"
                    element={<Layout children={<Dashboard />} />}
                  />
                  <Route
                    path="batches/:id"
                    element={<Layout children={<Batches />} />}
                  />
                  <Route
                    path="feeCategories"
                    element={<Layout children={<FeeCategories />} />}
                  />
                  <Route
                    path="members/:id"
                    element={<Layout children={<Members />} />}
                  />
                  <Route
                    path="memberFees/:memberId"
                    element={<Layout children={<MemberFees />} />}
                  />
                  <Route
                    path="transactionHistory/:memberId"
                    element={<Layout children={<TransactionHistory />} />}
                  />
                </Routes>
              </GymNameProvider>
            }
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
