// THEME_BASE lets the same document be built against a local checkout of
// theme-base, e.g. THEME_BASE=../vivliostyle-themes/packages/@vivliostyle/theme-base
const themeBase = process.env.THEME_BASE ?? '@vivliostyle/theme-base@3.0.0';

module.exports = {
  title: 'theme-base pre font repro',
  language: 'en',
  size: 'A5',
  theme: themeBase,
  entry: ['repro.md'],
  output: 'out/repro.pdf',
  workspaceDir: '.vivliostyle',
};
