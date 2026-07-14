import { createBrowserRouter } from "react-router";
import PublicLayout from "./components/layouts/PublicLayout";
import MembersLayout from "./components/layouts/MembersLayout";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import Dashboard from "./pages/members/Dashboard";
import DocumentLibrary from "./pages/members/DocumentLibrary";
import DocumentViewer from "./pages/members/DocumentViewer";
import Training from "./pages/members/Training";
import TrainingDetail from "./pages/members/TrainingDetail";
import WebinarPlayer from "./pages/members/WebinarPlayer";
import AskATrainer from "./pages/members/AskATrainer";
import SubmitQuestion from "./pages/members/SubmitQuestion";
import Hotline from "./pages/members/Hotline";
import Benefits from "./pages/members/Benefits";
import BenefitCategory from "./pages/members/BenefitCategory";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/public/AboutPage";
import JoinPage from "./pages/public/JoinPage";
import ConventionPage from "./pages/public/ConventionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "about", Component: AboutPage },
      { path: "join", Component: JoinPage },
      { path: "convention", Component: ConventionPage },
    ],
  },
  {
    path: "/members",
    Component: MembersLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "documents", Component: DocumentLibrary },
      { path: "documents/:id", Component: DocumentViewer },
      { path: "webinars/:id", Component: WebinarPlayer },
      { path: "training", Component: Training },
      { path: "training/:sessionId", Component: TrainingDetail },
      { path: "ask-a-trainer", Component: AskATrainer },
      { path: "ask-a-trainer/submit", Component: SubmitQuestion },
      { path: "hotline", Component: Hotline },
      { path: "benefits", Component: Benefits },
      { path: "benefits/:slug", Component: BenefitCategory },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
], {
  // Match the Vite `base` so routing works under the GitHub Pages sub-path.
  basename: import.meta.env.BASE_URL,
});
