module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"react/function-component-definition": [2, { "namedComponents": "function-declaration" }],
		"react/no-array-index-key": [2],
		"react/no-unstable-nested-components": [2],
		"react/no-unused-prop-types": [2],
		"react/jsx-curly-newline": [
			2,
			{
			  multiline: "consistent",
			  singleline: "consistent"
			}
		],
		"react/jsx-indent": [2, "tab", {checkAttributes: false, indentLogicalExpressions: false}],
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-no-useless-fragment": [1],
		"react/jsx-one-expression-per-line": [2],
		"react/jsx-pascal-case": [1],
		"react/jsx-props-no-multi-spaces": [1],
		"react/jsx-tag-spacing": [1],
		"react/jsx-wrap-multilines": [
			1,
			{
				declaration: "parens-new-line",
				assignment: "parens-new-line",
				return: "parens-new-line",
				arrow: "parens-new-line",
				condition: "parens-new-line",
				logical: "parens-new-line",
				prop: "parens-new-line",
			}
		]
	},
	"settings": {
	  "react": {
	    "createClass": "createReactClass",
	    "pragma": "React",
	    "fragment": "Fragment",
	    "version": "detect",
	    "flowVersion": "0.53"
	  },
	}
}
