import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ScrollToTop } from "./component/ScrollToTop";
import SelectSubject from "./component/SelectSubject";
import SolvedBarChart from "./component/Chart";
import GeminiStream from "./component/geminiResponse";
import Todo from "./component/Todo";
import DashBoard from "./layouts/DashBoard";
import Bookmarks from "./component/Bookmark";
import PracticeQuestion from "./component/PracticeQuestion";
import LandingPage from "./pages/LandingPage";
import Story from "./pages/Story";
import WhyLumina from "./pages/WhyLumina";
import Features from "./pages/Features";
import SignUp from "./auth/UserSignup";
import Signin from "./auth/UserSignin";
import Questions from "./pages/Question";
import UserLayout from "./layout/AppLayout";
import DashboardOverview from "./layouts/DashBoard";


function App() {
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/story" element={<Story/>}></Route>
        <Route path="/why-lumina" element={<WhyLumina/>}></Route>
        <Route path="/features" element={<Features/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="maths" element={<PracticeQuestion mode='practice' subj='MATHS'/>}></Route>
        <Route path="physics" element={<PracticeQuestion mode='practice' subj='PHYSICS'/>}></Route>
        <Route path="chemistry" element={<PracticeQuestion mode='practice' subj='CHEMISTRY'/>}></Route>
        <Route path="test" element={<Questions />}></Route>
<Route path="/dashboards" element={<DashBoard />}>
<Route index element={
  <div className="absolute left-[16vw] space-y-6">
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
      <p className="text-slate-500 mt-1">Here is what's happening with your progress today.</p>
    </section>

    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
       <div className="xl:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-1 hover:shadow-md transition-shadow">
          <SelectSubject />
       </div>
    </div>
  </div>
} />
</Route>
 <Route 
          path="/dashboard" 
          element={
            <UserLayout>
              <DashboardOverview/>
            </UserLayout>
          } 
        />
        <Route 
          path="/dashboard/bookmarks" 
          element={
            <UserLayout>
              <Bookmarks/>
            </UserLayout>
          } 
        />
        <Route 
          path="/dashboard/ai" 
          element={
            <UserLayout>
              <GeminiStream />
            </UserLayout>
          } 
        />
        <Route 
          path="/dashboard/settings" 
          element={
            <UserLayout>
              <div className="flex items-center justify-center h-full text-zinc-400">Settings Page Placeholder</div>
            </UserLayout>
          } 
        />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

