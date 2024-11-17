module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { 
      'cssnano': {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          convertValues: true,
          reduceIdents: false
        }]
      }
    } : {})
  }
}
