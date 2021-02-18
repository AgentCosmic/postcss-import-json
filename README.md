# PostCSS Import JSON

Imports a JSON file and generates CSS custom properties (variables).

## Usage

Install plugin.

```
npm i -D @daltontan/postcss-import-json
```

Add to you PostCSS config:

```
module.exports = {
	plugins: [
		require('@daltontan/postcss-import-json'),
	]
}
```

Add to your CSS file:

```
:root {
	@import-json './path/to.json';
}
```

The path is relative to the CSS file.

## Options

### map

A function to convert the variable values. For example:

```
@param {string[]} selector - The keys that form the current value e.g. {parent: {child: 'value'}} will have the child
selector as ['parent', 'child'].
@param value - The value for the current node.
(selector, value) => selector[0] === 'color' ? '#' + value : value

```

# Example

JSON input:

```
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

```
--pageWidth: 800;
--color-primary: #00f;
--color-secondary: #0aa;
--border-radius: 1rem;
```
