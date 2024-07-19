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
  Login,
  LanguagePage,
  HistoryLanding,
  HistoryPage,
  Signup,
  SlangLanding,
  SlangPage,
  Register,
  LanguageLanding,
  LearnLanguageChar,
  LeaderBoard,
  Quests,
  Shop,
  Profile,
} from "./pages";
import { QuizProvider } from "./context/QuizContext";
import { LifelineProvider } from "./context/LifelineContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/'>
          <Route path='/learnlanguage' element={<LearnLayout />}>
            <Route index element={<LanguageLanding />} />
            <Route
              path='/learnlanguage/literacy'
              element={<LearnLanguageChar />}
            />
            <Route
              path='/learnlanguage/leaderboard'
              element={<LeaderBoard />}
            />
            <Route path='/learnlanguage/quests' element={<Quests />} />
            <Route path='/learnlanguage/shop' element={<Shop />} />
            <Route path='/learnlanguage/profile' element={<Profile />} />
          </Route>
          <Route
            path='/lesson/:unitId/:questionId'
            element={<LanguagePage />}
          />
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='/learnmordernslang' element={<SlangLanding />} />
          <Route path='/learnmordernslang:id' element={<SlangPage />} />
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='/learnhistory' element={<HistoryLanding />} />
          <Route path='/learnhistory:id' element={<HistoryPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </>
    )
  );
  return (
    <QuizProvider>
      <LifelineProvider>
        <RouterProvider router={router} />
      </LifelineProvider>
    </QuizProvider>
  );
}

export default App;
