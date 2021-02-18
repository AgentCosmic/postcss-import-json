const path = require('path')

module.exports = (opts = {}) => {
	return {
		postcssPlugin: 'postcss-import-json',
		Once(root, api) {
			root.walkAtRules(atRule => {
				if (atRule.name === 'import-json') {
					plugin(opts, atRule, atRule.params.slice(1, -1), api)
				}
			})
		},
		// cssnano will delete it if we use AtRule
		// AtRule: {
		// 	'import-json': (atRule, api) => {
		// 		plugin(opts, atRule, atRule.params, api)
		// 	}
		// }
	}
}
module.exports.postcss = true

function plugin(opts, placeholder, src, { Declaration }) {
	src = path.join(path.dirname(placeholder.source.input.file), src)
	const vars = require(src)
	for (const decl of walk(vars, [], Declaration, opts.map)) {
		placeholder.after(decl)
	}
	placeholder.remove()
}

function walk(tree, selectors, Declaration, map) {
	let output = []
	for (const key in tree) {
		const s = [...selectors, key]
		const name = '--' + s.join('-')
		let v = tree[key]
		if (map) {
			v = map(s, v)
		}
		if (typeof v === 'object') {
			output.push(...walk(v, s, Declaration, map))
		} else {
			output.push(new Declaration({
				prop: name,
				value: v,
			}))
		}
	}
	return output
}
