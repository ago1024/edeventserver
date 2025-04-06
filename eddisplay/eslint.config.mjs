import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    plugins: {
        "@stylistic": stylistic,
    },
}, {
    files: ["**/*.ts"],
    extends: compat.extends("plugin:@angular-eslint/recommended"),

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.*?.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "@stylistic/indent": ["warn", "tab", {
            SwitchCase: 1,
        }],

        "@stylistic/no-trailing-spaces": "error",

        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
        }],

        "@angular-eslint/component-selector": ["error", {
            type: "element",
            prefix: "app",
            style: "kebab-case",
        }],

        "@stylistic/quotes": ["error", "single", {
            allowTemplateLiterals: true,
        }],
    },
}, {
    files: ["**/*.component.html"],
    extends: compat.extends("plugin:@angular-eslint/template/recommended"),

    rules: {
        "max-len": ["error", {
            code: 200,
        }],
    },
}, {
    files: ["**/*.component.ts"],
    extends: compat.extends("plugin:@angular-eslint/template/process-inline-templates"),
}]);
