/* Route map: xDev AI umbrella landing at /, product sheets at /ai-sdlc and /trace-ledger, Docs and Policy Registry share the portal visual system. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import AiSdlc from "./pages/AiSdlc";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Docs from "./pages/Docs";
import Legal from "./pages/Legal";
import PolicyRegistry from "./pages/PolicyRegistry";
import PolicyDetail from "./pages/PolicyDetail";
import TraceLedger from "./pages/TraceLedger";
import Umbrella from "./pages/Umbrella";

const SPA_RESTORE_KEY = "xdev-ai:restore";

function useSpaRestore() {
  useEffect(() => {
    const restore = sessionStorage.getItem(SPA_RESTORE_KEY);
    if (restore && restore !== location.pathname + location.search + location.hash) {
      sessionStorage.removeItem(SPA_RESTORE_KEY);
      const url = new URL(restore, location.origin);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, []);
}

function Router() {
  useSpaRestore();
  return (
    <Switch>
      <Route path={"/"} component={Umbrella} />
      <Route path={"/ai-sdlc"} component={AiSdlc} />
      <Route path={"/trace-ledger"} component={TraceLedger} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/privacy"}>{() => <Legal page="privacy" />}</Route>
      <Route path={"/terms"}>{() => <Legal page="terms" />}</Route>
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
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
