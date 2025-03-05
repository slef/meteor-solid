Package.describe({
  name: 'slef:solid-meteor',
  version: '0.1.0',
  summary: 'Compiler plugin for SolidJS including SSR, compatible with Meteor 3',
  documentation: 'README.md',
  git: 'https://github.com/slef/meteor-solid.git',
});

Package.registerBuildPlugin({
  name: 'compile-solid',
  use: [
    'babel-compiler',
    'caching-compiler@2.0.1',  // Updated from 1.2.1 to be compatible with Meteor 3
    'coffeescript-compiler@2.4.1',
  ],
  sources: ['plugin.js'],
  npmDependencies: {
    micromatch: '4.0.4',
  },
});

Package.onUse(function(api) {
  api.versionsFrom('3.0');  // Updated from 2.5.3 to 3.0
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('babel-compiler');
  api.use('coffeescript-compiler@2.4.1', {weak: true});
  api.use('react-fast-refresh', {weak: true});

  // The following api.imply calls should match those in
  // https://github.com/meteor/meteor/blob/devel/packages/ecmascript/package.js
  api.imply('modules');
  api.imply('ecmascript-runtime');
  api.imply('babel-runtime');
  // Using promise@1.0.0 instead of older versions for Meteor 3 compatibility
  api.imply('promise@1.0.0');

  // Runtime support for Meteor 1.5 dynamic import(...) syntax.
  api.imply('dynamic-import');
});
