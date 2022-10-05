const path = require('path');

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json', '.vue'],
        root: ['.'],
        alias: {
          '@ttlab-packages/ttlab-sorademic-common': path.join(
            '..',
            'ttlab-sorademic-common',
            'src',
          ),
        },
      },
    ],
  ],
}
