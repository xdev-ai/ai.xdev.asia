/* Route map: xDev AI umbrella landing at /, product sheets at /ai-sdlc and /trace-ledger, Docs and Policy Registry share the portal visual system. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AiSdlc from "./pages/AiSdlc";
import Docs from "./pages/Docs";
import PolicyRegistry from "./pages/PolicyRegistry";
import PolicyDetail from "./pages/PolicyDetail";
import TraceLedger from "./pages/TraceLedger";
import Umbrella from "./pages/Umbrella";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Umbrella} />
      <Route path={"/ai-sdlc"} component={AiSdlc} />
      <Route path={"/trace-ledger"} component={TraceLedger} />
      <Route path={"/docs"} component={Docs} />
      <Route path={"/policies/:slug"} component={PolicyDetail} />
      <Route path={"/policies"} component={PolicyRegistry} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
