/* Route map: xDev AI umbrella landing at /, product sheets at /ai-sdlc and /trace-ledger, Docs and Policy Registry share the portal visual system.
   Routes are lazy-loaded (code-split per page) so the initial JS bundle stays small. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";

const SPA_RESTORE_KEY = "xdev-ai:restore";
const AiSdlc = lazy(() => import("./pages/AiSdlc"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Docs = lazy(() => import("./pages/Docs"));
const Legal = lazy(() => import("./pages/Legal"));
const PolicyRegistry = lazy(() => import("./pages/PolicyRegistry"));
const PolicyDetail = lazy(() => import("./pages/PolicyDetail"));
const Quickstart = lazy(() => import("./pages/Quickstart"));
const Releases = lazy(() => import("./pages/Releases"));
const TraceLedger = lazy(() => import("./pages/TraceLedger"));
const Umbrella = lazy(() => import("./pages/Umbrella"));

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

function PageLoader() { return <div className="mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center px-4"><span className="h-8 w-8 animate-spin rounded-full border-2 border-[#102440] border-t-transparent" aria-label="Loading" /></div>; }
function LazyPage({ cmp, extraProps }: { cmp: React.LazyExoticComponent<any>; extraProps?: Record<string, any> }) { const Component = cmp; return <Suspense fallback={<PageLoader />}><Component {...(extraProps ?? {})} /></Suspense>; }

function Router() {
  useSpaRestore();
  return <Switch>
    <Route path="/">{() => <LazyPage cmp={Umbrella} />}</Route>
    <Route path="/ai-sdlc">{() => <LazyPage cmp={AiSdlc} />}</Route>
    <Route path="/trace-ledger">{() => <LazyPage cmp={TraceLedger} />}</Route>
    <Route path="/blog">{() => <LazyPage cmp={Blog} />}</Route>
    <Route path="/blog/:slug">{() => <LazyPage cmp={BlogPost} />}</Route>
    <Route path="/privacy">{() => <LazyPage cmp={Legal} extraProps={{ page: "privacy" }} />}</Route>
    <Route path="/terms">{() => <LazyPage cmp={Legal} extraProps={{ page: "terms" }} />}</Route>
    <Route path="/docs">{() => <LazyPage cmp={Docs} />}</Route>
    <Route path="/quickstart">{() => <LazyPage cmp={Quickstart} />}</Route>
    <Route path="/releases">{() => <LazyPage cmp={Releases} />}</Route>
    <Route path="/policies/:slug">{() => <LazyPage cmp={PolicyDetail} />}</Route>
    <Route path="/policies">{() => <LazyPage cmp={PolicyRegistry} />}</Route>
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><LanguageProvider><TooltipProvider><Toaster /><Router /></TooltipProvider></LanguageProvider></ThemeProvider></ErrorBoundary>; }
export default App;
