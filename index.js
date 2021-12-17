const path = require('path')

module.exports = (opts = {}) => {
	return {
		postcssPlugin: 'postcss-import-json',
		AtRule: {
			'import-json': (atRule, api) => {
				plugin(opts, atRule, atRule.params.slice(1, -1), api)
			}
		}
	}
}
module.exports.postcss = true

function plugin(opts, placeholder, src, { Declaration }) {
	src = path.join(path.dirname(placeholder.source.input.file), src)
	const vars = require(src)
	for (const decl of walk(vars, [], Declaration, opts)) {
		placeholder.after(decl)
	}
	placeholder.remove()
}

function walk(tree, selectors, Declaration, { prefix = '--', map }) {
	let output = []
	for (const key in tree) {
		const s = [...selectors, key]
		const name = prefix + s.join('-')
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
