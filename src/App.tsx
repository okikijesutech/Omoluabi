import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { LearnLayout, LiteracyLayout, MainLayout } from "./layout";
import {
  HomePage,
  NotFoundPage,
  Login,
  LanguagePage,
  Signup,
  Register,
  LanguageLanding,
  LearnLanguageChar,
  LeaderBoard,
  Quests,
  Shop,
  Profile,
  LearnLanguageNum,
} from "./pages";
import { QuizProvider } from "./context/QuizContext";
import { LifelineProvider } from "./context/LifelineContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/'>
          <Route path='/learnlanguage' element={<ProtectedRoute />}>
            <Route element={<LearnLayout />}>
              <Route index element={<LanguageLanding />} />
              <Route path='literacy' element={<LiteracyLayout />}>
                <Route index element={<Navigate to='alphabets' replace />} />
                <Route path='alphabets' element={<LearnLanguageChar />} />
                <Route path='numbers' element={<LearnLanguageNum />} />
              </Route>
              <Route path='leaderboard' element={<LeaderBoard />} />
              <Route path='quests' element={<Quests />} />
              <Route path='shop' element={<Shop />} />
              <Route path='profile' element={<Profile />} />
            </Route>
          </Route>
          <Route
            path='/lesson/:unitId/:questionId'
            element={<LanguagePage />}
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </>
    )
  );

  return (
    <AuthProvider>
      <QuizProvider>
        <LifelineProvider>
          <RouterProvider router={router} />
        </LifelineProvider>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
