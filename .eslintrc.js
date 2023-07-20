module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {}, // placed above other resolver configs
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    //@NOTE: enum 키워드에서 에러발생
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    //@NOTE: 좀더 의논이 필요
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    //@NOTE: NestJS module을 상속받아 생성한 함수에 의해 예외사항 발생
    'class-methods-use-this': 'off',
    //@NOTE: AppModule의 constructor에의한 예외
    'no-useless-constructor': 'off',
    'no-use-before-define': ['error', { 'classes': false }],
    //@NOTE: 진료과, 질환, 계정 상태
    'no-bitwise': ['error', {'allow': ['<<', '|', '&', '|=']}],
    //@NOTE: Dependency가 설치하는 modules 허용
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true,
        'optionalDependencies': true,
        'peerDependencies': true,
        'packageDir': './'
      }
    ],
    //@NOTE: 통일성 위해서 Extension 없이 import 허용
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ]
  },
};
