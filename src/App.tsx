import {
  createBrowserRouter,
  RouterProvider,
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
import { ProtectedRoute } from "./components";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: "/",
      children: [
        {
          path: "learnlanguage",
          element: <ProtectedRoute />,
          children: [
            {
              element: <LearnLayout />,
              children: [
                { index: true, element: <LanguageLanding /> },
                {
                  path: "literacy",
                  element: <LiteracyLayout />,
                  children: [
                    { index: true, element: <Navigate to='alphabets' replace /> },
                    { path: "alphabets", element: <LearnLanguageChar /> },
                    { path: "numbers", element: <LearnLanguageNum /> },
                  ],
                },
                { path: "leaderboard", element: <LeaderBoard /> },
                { path: "quests", element: <Quests /> },
                { path: "shop", element: <Shop /> },
                { path: "profile", element: <Profile /> },
              ],
            },
          ],
        },
        {
          path: "lesson/:unitId/:questionId",
          element: <LanguagePage />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFoundPage /> },
  ]);

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
