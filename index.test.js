import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull()
  })
})