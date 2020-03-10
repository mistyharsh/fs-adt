module.exports = (api) => {

  // Making your Babel config jest-aware
  // Jest will set process.env.NODE_ENV to 'test' if it's not set to something else.
  const _isTest = api.env('test');

  return {
    plugins: [],
    presets: [
      ['@babel/preset-typescript'],
      ['@babel/preset-env', {
        targets: { 'node': true }
      }]
    ]
  }
}
