import { resolve } from 'path';
import { Nuxt, Builder } from 'nuxt';
// import { JSDOM } from 'jsdom';
// import test from 'ava';

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null;

// Init Nuxt.js and create a server listening on localhost:4000
beforeAll(async () => {
  const config = {
    dev: false,
    rootDir: resolve(__dirname, '..')
  };

  nuxt = new Nuxt(config);
  console.log('Start Building...');
  await new Builder(nuxt).build();

  console.log('Start Server...');
  await nuxt.server.listen(4000, 'localhost');
}, 100000); // build time take a long time I have set : 100 sec

beforeEach(() => {
  jest.setTimeout(45000); // maximum wait 45 sec for low connections
});

// Example of testing only generated html
test('Route / exits and render HTML', async (t) => {
  const context = {};
  const { html } = await nuxt.server.renderRoute('/', context);
  t.true(html.includes('<div class="page container">'));
  t.true(html.includes('<div>Loading...</div>'));
  t.true(html.includes('<div class="repo-card">'));
});

// Example of testing via dom checking (please to test we need install ava & JSDOM)
// test('Route / exits and render HTML with CSS applied', async (t) => {
//   const context = {};
//   const { html } = await nuxt.server.renderRoute('/', context);
//   const { window } = new JSDOM(html).window;
//   const element = window.document.querySelector('.red');
//   t.not(element, null);
//   t.is(element.textContent, 'Hello world!');
//   t.is(element.className, 'red');
//   t.is(window.getComputedStyle(element).color, 'red');
// });

// Close server and ask nuxt to stop listening to file changes
afterAll((t) => {
  describe("'Closing server and nuxt.js'", () => true);
  nuxt.close();
});
