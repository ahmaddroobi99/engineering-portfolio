import { useState } from "react";
import { CompareBar } from "@/components/layout/compare-bar";
import { CommandPalette } from "@/components/layout/command-palette";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState(false);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Navbar onSearch={() => setPalette(true)} />
      <div id="content">{children}</div>
      <Footer />
      <CompareBar />
      <CommandPalette open={palette} onOpenChange={setPalette} />
    </div>
  );
}
