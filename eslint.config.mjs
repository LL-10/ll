import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: [
			"docs/"
		]
	},
	{
		files: [
			"**/*.js"
		],
		languageOptions: {
			sourceType: "commonjs"
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			"array-callback-return": "error",
			"no-await-in-loop": "error",
			"no-constructor-return": "error",
			"no-duplicate-imports": "error",
			"no-inner-declarations": "error",
			"no-promise-executor-return": "error",
			"no-self-compare": "error",
			"no-template-curly-in-string": "error",
			"no-unmodified-loop-condition": "error",
			"no-unreachable-loop": "error",
			"no-use-before-define": "error",
			"no-useless-assignment": "error",
			"require-atomic-updates": "error"
		},
		linterOptions: {
			reportUnusedDisableDirectives: "error"
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended
];
