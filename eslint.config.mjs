import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Global rules
    rules: {
      // Disable standard ESLint unused vars rule
      //!! WARN !!  Remove this once the build errors are fixed - Sunair
      'no-unused-vars': 'off',
      
      // Disable TypeScript-specific unused vars rule 
      //!! WARN !!  Remove this once the build errors are fixed - Sunair
      '@typescript-eslint/no-unused-vars': 'on',
      
      // Or set it to warn instead of error if you prefer
      // '@typescript-eslint/no-unused-vars': 'warn',
      
      // Or configure it to ignore specific patterns
      // '@typescript-eslint/no-unused-vars': ['error', { 
      //   'varsIgnorePattern': '^_', 
      //   'argsIgnorePattern': '^_' 
      // }],
    },
  },
];
export default eslintConfig;

