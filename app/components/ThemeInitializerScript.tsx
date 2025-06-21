'use client';

// This component is used to prevent a flash of unstyled content (FOUC)
// when the theme is loaded from localStorage.
export function ThemeInitializerScript() {
  const script = `
    (function() {
      function getInitialColorMode() {
        const persistedColorPreference = window.localStorage.getItem('theme');
        const hasPersistedPreference = typeof persistedColorPreference === 'string';

        if (hasPersistedPreference) {
          return persistedColorPreference;
        }

        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';

        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light';
        }

        return 'light';
      }

      const colorMode = getInitialColorMode();
      const root = document.documentElement;
      root.classList.add(colorMode);
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}
