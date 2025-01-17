module.exports = {
  roots: ["<rootDir>/test"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
