import { Link } from '@tanstack/react-router';
import type { PageConfig } from '@flarewatch/shared';
import { ThemeToggle } from '@/components/theme-toggle';
import type { ThemePreference } from '@/lib/theme-server';
import { PAGE_CONTAINER_CLASSES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FooterProps {
  config?: PageConfig;
  theme?: ThemePreference;
  showSignIn: boolean;
}

export function Footer({ config, theme = 'system', showSignIn }: FooterProps) {
  const linkClass = 'text-muted-foreground hover:text-foreground';

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className={PAGE_CONTAINER_CLASSES}>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm">
          <span className="text-muted-foreground">© {new Date().getFullYear()} The Storm SMP</span>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {config?.links?.map((link) => (
              <a
                key={`${link.label}:${link.link}`}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(linkClass, link.highlight && 'font-medium text-foreground')}
              >
                {link.label}
              </a>
            ))}
            {showSignIn && (
              <Link to="/login" className={linkClass}>
                Sign in
              </Link>
            )}
            <ThemeToggle initialTheme={theme} />
          </div>
        </div>
      </div>
    </footer>
  );
}
