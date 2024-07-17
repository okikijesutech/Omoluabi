import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { LearnLayout, MainLayout } from "./layout";
import {
  HomePage,
  NotFoundPage,
  LanguageLanding,
  Login,
  LanguagePage,
  HistoryLanding,
  HistoryPage,
  Signup,
  SlangLanding,
  SlangPage,
  Register,
} from "./pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/' element={<LearnLayout />}>
          <Route path='/learnlanguage' element={<LanguageLanding />} />
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='/learnmordernslang' element={<SlangLanding />} />
          <Route path='/learnmordernslang:id' element={<SlangPage />} />
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='/learnhistory' element={<HistoryLanding />} />
          <Route path='/learnhistory:id' element={<HistoryPage />} />
        </Route>
        <Route path='/lesson' element={<LanguagePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
