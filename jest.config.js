module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    // Jest has issues with 'd3' package. This is not a perfect solution because
    // I'm not sure what version of `d3-shape` do we ship with our bundle.
    '^d3-shape$': '<rootDir>/node_modules/d3-shape/dist/d3-shape.min.js',
    '^d3-path$': '<rootDir>/node_modules/d3-path/dist/d3-path.min.js',
  },
};
