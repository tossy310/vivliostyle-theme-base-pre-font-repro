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

To build against another theme-base, such as the 2.x release or a local
checkout with a fix applied, set `THEME_BASE` and remove the cached themes
first:

```sh
rm -rf .vivliostyle
THEME_BASE=@vivliostyle/theme-base@2.1.1 npm run build
THEME_BASE=../vivliostyle-themes/packages/@vivliostyle/theme-base npm run build
```

## Expected

The plain `<pre>` uses the monospace font, like inline `code` and the fenced
block, and follows `--vs--monospace-*` customizations.

## Actual

The plain `<pre>` uses the body font. With `custom.css`, inline `code` and the
fenced block switch to the custom font and line height, but the plain `<pre>`
keeps the body font and line height. theme-base 2.1.1 renders all three
consistently, so this is a regression in 3.0.0.

Fonts and line pitch as embedded in the PDFs (12pt text, Linux, fontconfig
defaults; `monospace` resolves to DejaVu Sans Mono, `sans-serif` to Arimo and
`serif` to Tinos):

| Build | inline / fenced | plain `pre` | line pitch (fenced / plain) |
|---|---|---|---|
| 2.1.1, defaults | DejaVu Sans Mono | DejaVu Sans Mono | 18pt / 18pt |
| 2.1.1, `custom.css` | Tinos | Tinos | 12pt / 12pt |
| 3.0.0, defaults | DejaVu Sans Mono | **Arimo** | 18pt / 18pt |
| 3.0.0, `custom.css` | Tinos | **Arimo** | 18pt / 18pt |
| with fix, defaults | DejaVu Sans Mono | DejaVu Sans Mono | 18pt / 18pt |
| with fix, `custom.css` | Tinos | Tinos | 12pt / 12pt |

`--vs--monospace-font-size` is a separate, older inconsistency: with
`--vs--monospace-font-size: 0.6em`, inline `code` and the fenced block are
7.2pt but the plain `pre` stays 12pt, in 2.1.1, 3.0.0 and with the fix alike.
