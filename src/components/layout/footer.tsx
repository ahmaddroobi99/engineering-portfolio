import { Link } from "@tanstack/react-router";
import { catalog } from "@/data/catalog";
import { profile } from "@/data/profile";
import { formatDate } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{profile.title}</p>
        </div>
        <div className="text-sm text-muted">
          <p className="text-fg">Index</p>
          <p className="mt-2">
            {catalog.totals.selected} ranked originals from {catalog.totals.public} public
            repositories. Forks excluded from scoring.
          </p>
          <p className="mt-2">Last indexed {formatDate(catalog.generatedAt)}</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-muted" aria-label="Footer">
          <Link to="/top-50" className="hover:text-fg">
            Top 50
          </Link>
          <Link to="/maintenance" className="hover:text-fg">
            Maintenance
          </Link>
          <Link to="/constellation" className="hover:text-fg">
            Constellation
          </Link>
          <Link to="/contact" className="hover:text-fg">
            Contact
          </Link>
          <a href={profile.github} className="hover:text-fg">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
