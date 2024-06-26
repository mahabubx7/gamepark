module.exports = {
  types: [
    { value: 'feat', name: '✨ feat:\tAdding a new feature' },
    { value: 'fix', name: '🐛 fix:\tFixing a bug' },
    { value: 'docs', name: '📝 docs:\tAdd or update documentation' },
    {
      value: 'style',
      name: '💄 style:\tAdd or update styles, ui or ux',
    },
    {
      value: 'refactor',
      name: '♻️  refactor:\tCode change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: '⚡️ perf:\tCode change that improves performance',
    },
    {
      value: 'test',
      name: '✅ test:\tAdding tests cases',
    },
    {
      value: 'chore',
      name: '🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation',
    },
    { value: 'revert', name: '⏪️ revert:\tRevert to a commit' },
    { value: 'wip', name: '🚧 wip:\tWork in progress' },
    {
      value: 'build',
      name: '👷 build:\tAdd or update regards to build process',
    },
    {
      value: 'ci',
      name: '💚 ci:\tAdd or update regards to build process',
    },
  ],

  scopes: [],

  scopeOverrides: {
    feat: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'hotfix' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'hotfix' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    docs: [
      { name: 'readme' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    style: [{ name: 'client' }],
    refactor: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    perf: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    test: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'server' },
      { name: 'client' },
    ],
    chore: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    revert: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    build: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
    ci: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'test' },
      { name: 'workspace' },
      { name: 'server' },
      { name: 'client' },
      { name: 'common' },
    ],
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['footer', 'breaking'],
  subjectLimit: 100,
}
