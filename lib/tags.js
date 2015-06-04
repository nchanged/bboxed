var validator = require('validator');

module.exports = {
	// Bold
	'b': {
		open: '<strong>',
		close: '</strong>'
	},

	// Italic
	'i': {
		open: '<em>',
		close: '</em>'
	},

	// Underline
	'u': {
		open: '<span style="text-decoration: underline;">',
		close: '</span>'
	},

	// Strike
	's': {
		open: '<span style="text-decoration: line-through;">',
		close: '</span>'
	},
	//Superscript
	'sup': {
		open: '<sup>',
		close: '</sup>'
	},
	//Subscript
	'sub': {
		open: '<sub>',
		close: '</sub>'
	},
	// Font size
	'size': {
		open: function(token, options) {
			var argument = token.arguments.tag;

			// No size passed, or invalid argument. Return unsuccessful.
			if (!argument || isNaN(argument)) {
				return false;
			}

			// Grab the size, constrain if required
			size = +argument;
			if (options.constrainSize) {
				size = Math.min(options.max, Math.max(options.min, size));
			}

			// Output
			var sizeValue = size.toString(10) + options.unit;
			return '<span style="font-size: ' + sizeValue + ';">';
		},
		close: '</span>',
		options: {
			constrainSize: true,
			min: 1,
			max: 72,
			unit: 'px'
		}
	},

	// Font colour
	'color': {
		open: function(token) {
			var argument = token.arguments.tag;
			if (!argument) {
				return false;
			}

			return '<span style="color: ' + validator.sanitize(argument).escape() + ';">'
		},
		close: '</span>'
	},

	// Quote
	'quote': {
		open: function(token) {
			var argument = token.arguments.tag,
				out = '<blockquote>';

			if (argument) {
				out += validator.sanitize(argument).escape() + ' said: ';
			}
			return out;
		},
		close: '</blockquote>'
	},
	// Link
	'url': {
		open: function(token, options) {
			var argument = token.arguments.tag,
				target = '';

			if (options.target && typeof options.target == 'string') {
				target = ' target="' + options.target + '"'
			}

			if (argument) {
				try {
					validator.check(argument).isUrl();
				} catch (e) {
					return false;
				}
				return '<a' + target + ' href="' + argument + '">';
			}

			try {
				validator.check(token.interior).isUrl();
			} catch (e) {
				return false;
			}
			return '<a' + target + ' href="';
		},
		close: function(token) {
			if (token.arguments.tag) {
				return '</a>';
			}

			return '">' + token.interior + '</a>';
		},
		options: {
			target: false
		}
	},

	// Code
	'code': {
		allowInnerTags: false,
		open: '<pre><code>',
		close: '</code></pre>'
	},

	// List
	'ulist': {
		open: '<ul>',
		close: '</ul>'
	},

	'olist': {
		open: '<ol>',
		close: '</ol>'
	},
	'*': {
		open: '<li>',
		close: '</li>'
	},

	'#': {
		open: '<li>',
		close: '</li>'
	}
}
