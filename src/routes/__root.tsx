import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MOVONE" },
      {
        name: "description",
        content:
          "MOVONE — Tactical command deck tracking cybersecurity, academics, and AIML objectives. One day or Day One. You decide.",
      },
      { name: "author", content: "MOVONE" },
      { property: "og:title", content: "MOVONE" },
      {
        property: "og:description",
        content:
          "MOVONE — Tactical command deck tracking cybersecurity, academics, and AIML objectives. One day or Day One. You decide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@MovoneOps" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Global Persistent Background Layer (Chess + Tactical Cyber) */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#06080e]">
        {/* Tactical Lighting & Ambience: Diffused radial glow gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,229,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_35%,rgba(14,165,233,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_85%_25%,rgba(212,175,55,0.09),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_100%,rgba(2,132,199,0.10),transparent_70%)]" />

        {/* Subtle 3D Perspective Chessboard Grid Plane anchored towards horizon (8-12% opacity) */}
        <div
          className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[240vw] h-[170vh] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(0, 229, 255, 0.10) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(0, 229, 255, 0.10) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(0, 229, 255, 0.10) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(0, 229, 255, 0.10) 75%),
              linear-gradient(to right, rgba(0, 229, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 229, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px, 64px 64px, 64px 64px, 64px 64px, 64px 64px, 64px 64px",
            backgroundPosition: "0 0, 0 32px, 32px -32px, -32px 0px, 0 0, 0 0",
            transform: "perspective(650px) rotateX(54deg) translateY(-8%) scale(1.15)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.2) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Tactical Horizon Depth Lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(0, 229, 255, 0.10) 90%, rgba(0, 229, 255, 0.20) 100%)`,
          }}
        />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-0 bg-transparent min-h-screen">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
