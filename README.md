# PostCSS Import JSON

Imports a JSON file and generates [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

## Usage

Install plugin.

```sh
npm i -D @daltontan/postcss-import-json
```

Add to you PostCSS config:

```javascript
module.exports = {
  plugins: [require("@daltontan/postcss-import-json")],
};
```

Add to your CSS file:

```css
:root {
  @import-json './path/to.json';
}
```

The path is relative to the CSS file.

## Options

### map

A function to convert the variable values. For example:

```javascript
@param {string[]} selector - The keys that form the current value e.g. {parent: {child: 'value'}} will have the child
selector as ['parent', 'child'].
@param value - The value for the current node.
(selector, value) => selector[0] === 'color' ? '#' + value : value
```

### prefix

The CSS Custom properties prefix, default is `--`.

JSON input:

```json
{
  "my-color": "red"
}
```

```javascript
module.exports = {
  plugins: [
    require("@daltontan/postcss-import-json"), // :root { --my-color: red; } (default)
  ],
};

module.exports = {
  plugins: [
    require("@daltontan/postcss-import-json")({
      prefix: "", // :root { my-color: red; }
    }),
  ],
};
```

# Example

JSON input:

```json
{
  "pageWidth": 800,
  "color": {
    "primary": "#00f",
    "secondary": "#0aa"
  },
  "border-radius": "1rem"
}
```

Generated CSS:

```css
--pageWidth: 800;
--color-primary: #00f;
--color-secondary: #0aa;
--border-radius: 1rem;
```
