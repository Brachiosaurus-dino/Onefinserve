import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import TopMutual from "./Pages/topMutualFunds";
import ProtectedRoute from "./Pages/protected";
import NFOlist from "./Pages/nfoList";
import Login from "./Pages/loginform";
import ScrollToTop from "./Pages/components/scrollTop";
import Topup from "./Pages/Protected_Routes/topup";
import SheetData from "./Pages/text";
import Kyc from "./Pages/kYc";
import Invest from "./Pages/Protected_Routes/investments";
import OneTimeInvest from "./Pages/Protected_Routes/one-time-invest";
import MandatetRegister from "./Pages/Protected_Routes/mandate-register";
import Mutual_Top from "./Pages/Protected_Routes/Top-up-mutual";
import AdminPanel from "./Pages/Protected_Routes/admin-panel";
import GlobalError from "./Pages/global-error Handler";
import TopInvestProtect from "./Pages/Protected_Routes/Top-up-mutual";
import Otr_startInvsest from "./Pages/Protected_Routes/client-registration";
import Data from "./Pages/Protected_Routes/data_pan_no";
import Profile from "./Pages/Protected_Routes/profile"
import FetchSchemes from "./Pages/testing";
function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/nfo-list" element={<NFOlist />} />

        <Route path="/investment" element={<ProtectedRoute><Invest /></ProtectedRoute>} />
        <Route path="/mutual-funds/one-time-investment" element={<ProtectedRoute><OneTimeInvest /></ProtectedRoute>} />
        <Route path="/mutual-funds/mandate-registration" element={<ProtectedRoute><MandatetRegister /></ProtectedRoute>} />
        <Route path="/mutual-funds/topUp" element={<ProtectedRoute><Topup /></ProtectedRoute>} />
        <Route path="/mutual-funds/mutual-top" element={<ProtectedRoute><Mutual_Top /></ProtectedRoute>} />
        <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/Error" element={<ProtectedRoute><GlobalError /></ProtectedRoute>} />
        <Route path="/mutual/TopYourinvest" element={<ProtectedRoute><TopInvestProtect /></ProtectedRoute>} />

        <Route path="/" element={<Home />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/mutual/data' element={<Data/>}/>
        <Route path="/latest-funds-list" element={<TopMutual />} />
        <Route path="/sheet" element={<SheetData />} />
        <Route path="/check_kyc_status" element={<Kyc />} />
        <Route path="/mutual-funds/client-registration" element={<Otr_startInvsest />} />
        <Route path="/testing" element={<FetchSchemes />} />

      </Routes>
    </div>
  );
}

export default App;