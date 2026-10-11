# theme-base 3.0.0: `pre` loses the monospace font

Minimal reproduction for `@vivliostyle/theme-base` 3.0.0, built with
`@vivliostyle/cli` 11.3.3 and theme-base alone (no other theme).

`repro.md` contains inline `code`, a fenced code block (`pre > code`) and a
plain `<pre>` without `code`.

## Reproduce

```sh
npm install
npm run build          # out/repro.pdf: theme-base defaults
npm run build:custom   # out/repro-custom.pdf: with custom.css
```

`custom.css` sets `--vs--monospace-font-family` and
`--vs--monospace-line-height`, the way a theme customizes its monospace text.

To build against a local checkout of theme-base instead (e.g. with a fix
applied), set `THEME_BASE` and remove the cached themes first:

```sh
rm -rf .vivliostyle
THEME_BASE=../vivliostyle-themes/packages/@vivliostyle/theme-base npm run build
```

## Expected

The plain `<pre>` uses the monospace font, like inline `code` and the fenced
block, and follows `--vs--monospace-*` customizations.

## Actual

The plain `<pre>` uses the body font. With `custom.css`, inline `code` and the
fenced block switch to the custom font and line height, but the plain `<pre>`
keeps the body font and line height.

Fonts and line pitch as embedded in the PDFs (12pt text, Linux, fontconfig
defaults; `monospace` resolves to DejaVu Sans Mono, `sans-serif` to Arimo and
`serif` to Tinos):

| Build | inline / fenced | plain `pre` | line pitch (fenced / plain) |
|---|---|---|---|
| 3.0.0, defaults | DejaVu Sans Mono | **Arimo** | 18pt / 18pt |
| 3.0.0, `custom.css` | Tinos | **Arimo** | 18pt / 18pt |
| with fix, defaults | DejaVu Sans Mono | DejaVu Sans Mono | 18pt / 18pt |
| with fix, `custom.css` | Tinos | Tinos | 12pt / 12pt |
