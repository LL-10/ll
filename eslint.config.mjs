import stylistic from '@stylistic/eslint-plugin';

const globals = {
	CanvasRenderingContext2D: 'readonly',
	console: 'readonly',
};
const linterOptions = {
	reportUnusedDisableDirectives: 'error',
};
const plugins = {
	'@stylistic': stylistic,
};
const rules = {
	'@stylistic/comma-dangle': ['error', 'always-multiline'],
	'@stylistic/comma-spacing': 'error',
	'@stylistic/comma-style': 'error',
	'@stylistic/indent': ['error', 'tab', {
		SwitchCase: 1,
	}],
	'@stylistic/indent-binary-ops': ['error', 'tab'],
	'@stylistic/max-len': ['error', {
		code: 100,
		tabWidth: 1,
	}],
	'@stylistic/max-statements-per-line': ['error', {
		max: 1,
	}],
	'@stylistic/multiline-comment-style': 'error',
	'@stylistic/no-confusing-arrow': 'error',
	'@stylistic/no-extra-parens': ['error', 'all', {
		nestedBinaryExpressions: true,
	}],
	'@stylistic/no-extra-semi': 'error',
	'@stylistic/no-floating-decimal': 'error',
	'@stylistic/no-mixed-operators': 'error',
	'@stylistic/no-multi-spaces': 'error',
	'@stylistic/no-multiple-empty-lines': ['error', {
		max: 1,
	}],
	'@stylistic/no-tabs': ['error', {
		allowIndentationTabs: true,
	}],
	'@stylistic/no-trailing-spaces': 'error',
	'@stylistic/no-whitespace-before-property': 'error',
	'@stylistic/nonblock-statement-body-position': ['error', 'below'],
	'@stylistic/one-var-declaration-per-line': ['error', 'initializations'],
	'@stylistic/padded-blocks': ['error', 'never'],
	'@stylistic/quotes': ['error', 'single'],
	'@stylistic/quote-props': ['error', 'as-needed'],
	'@stylistic/semi': 'error',
	'@stylistic/semi-spacing': 'error',
	'@stylistic/semi-style': 'error',
	'@stylistic/space-in-parens': 'error',
	'array-callback-return': 'error',
	'constructor-super': 'error',
	curly: ['error', 'multi'],
	'for-direction': 'error',
	'getter-return': 'error',
	'no-async-promise-executor': 'error',
	'no-await-in-loop': 'error',
	'no-case-declarations': 'error',
	'no-class-assign': 'error',
	'no-compare-neg-zero': 'error',
	'no-cond-assign': 'error',
	'no-const-assign': 'error',
	'no-constant-binary-expression': 'error',
	'no-constant-condition': 'error',
	'no-constructor-return': 'error',
	'no-control-regex': 'error',
	'no-debugger': 'error',
	'no-delete-var': 'error',
	'no-dupe-args': 'error',
	'no-dupe-class-members': 'error',
	'no-dupe-else-if': 'error',
	'no-dupe-keys': 'error',
	'no-duplicate-case': 'error',
	'no-duplicate-imports': 'error',
	'no-empty': 'error',
	'no-empty-character-class': 'error',
	'no-empty-pattern': 'error',
	'no-empty-static-block': 'error',
	'no-ex-assign': 'error',
	'no-extra-boolean-cast': 'error',
	'no-fallthrough': 'error',
	'no-func-assign': 'error',
	'no-global-assign': 'error',
	'no-import-assign': 'error',
	'no-inner-declarations': 'error',
	'no-invalid-regexp': 'error',
	'no-irregular-whitespace': 'error',
	'no-loss-of-precision': 'error',
	'no-misleading-character-class': 'error',
	'no-new-native-nonconstructor': 'error',
	'no-nonoctal-decimal-escape': 'error',
	'no-obj-calls': 'error',
	'no-octal': 'error',
	'no-promise-executor-return': 'error',
	'no-prototype-builtins': 'error',
	'no-redeclare': 'error',
	'no-regex-spaces': 'error',
	'no-self-assign': 'error',
	'no-self-compare': 'error',
	'no-setter-return': 'error',
	'no-shadow-restricted-names': 'error',
	'no-sparse-arrays': 'error',
	'no-template-curly-in-string': 'error',
	'no-this-before-super': 'error',
	'no-undef': 'error',
	'no-unexpected-multiline': 'error',
	'no-unmodified-loop-condition': 'error',
	'no-unreachable': 'error',
	'no-unreachable-loop': 'error',
	'no-unsafe-finally': 'error',
	'no-unsafe-negation': 'error',
	'no-unsafe-optional-chaining': 'error',
	'no-unused-labels': 'error',
	'no-unused-private-class-members': 'error',
	'no-unused-vars': 'error',
	'no-use-before-define': 'error',
	'no-useless-backreference': 'error',
	'no-useless-catch': 'error',
	'no-useless-escape': 'error',
	'no-with': 'error',
	'require-atomic-updates': 'error',
	'require-yield': 'error',
	'use-isnan': 'error',
	'valid-typeof': 'error',
};

export default [
	{
		ignores: [
			'docs/',
			'node_modules/',
		],
	},
	{
		files: [
			'**/*.js',
		],
		languageOptions: {
			globals: globals,
			sourceType: 'commonjs',
		},
		linterOptions: linterOptions,
		plugins: plugins,
		rules: rules,
	},
	{
		files: [
			'**/*.mjs',
		],
		languageOptions: {
			globals: globals,
			sourceType: 'module',
		},
		linterOptions: linterOptions,
		plugins: plugins,
		rules: rules,
	},
];
