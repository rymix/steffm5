require('@testing-library/jest-dom');
const { cleanup } = require("@testing-library/react");

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
