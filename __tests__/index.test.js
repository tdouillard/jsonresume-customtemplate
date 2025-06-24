const { render } = require('../index');
const fs = require('fs');
const path = require('path');

describe('index.js', () => {
  const resume = require('../resume_example.json');

  test('render returns HTML string containing resume basics', () => {
    const html = render(resume);
    expect(typeof html).toBe('string');
    expect(html).toContain(resume.basics.name);
  });

  test('Handlebars helpers: removeProtocol', () => {
    const { handlebars } = require('handlebars');
    const fn = handlebars.helpers.removeProtocol;
    expect(fn('https://example.com')).toBe('example.com');
  });

  test('Handlebars helpers: concat', () => {
    const { handlebars } = require('handlebars');
    const fn = handlebars.helpers.concat;
    expect(fn('a', 'b', 'c')).toBe('abc');
  });

  test('Handlebars helpers: formatAddress', () => {
    const { handlebars } = require('handlebars');
    const fn = handlebars.helpers.formatAddress;
    const result = fn('123 St', 'City', 'Region', '12345', 'FR');
    expect(result).toContain('123 St');
  });

  test('Handlebars helpers: formatDate', () => {
    const { handlebars } = require('handlebars');
    const fn = handlebars.helpers.formatDate;
    expect(fn('2020-01-01')).toMatch(/Jan|janv/);
  });

  test('Handlebars helpers: splitFirstName/splitLastName', () => {
    const { handlebars } = require('handlebars');
    expect(handlebars.helpers.splitFirstName('John Doe')).toBe('John');
    expect(handlebars.helpers.splitLastName('John Doe')).toBe('Doe');
  });

  test('Handlebars helpers: formatYear', () => {
    const { handlebars } = require('handlebars');
    expect(handlebars.helpers.formatYear('2020-01-01')).toBe(2020);
  });

  test('Handlebars helpers: pre', () => {
    const { handlebars } = require('handlebars');
    expect(handlebars.helpers.pre('Line1\nLine2')).toContain('<br>');
  });

  test('Handlebars helpers: eq', () => {
    const { handlebars } = require('handlebars');
    expect(handlebars.helpers.eq(1, 1)).toBe('1');
    expect(handlebars.helpers.eq(1, 2)).toBeNull();
  });

  test('Handlebars helpers: langFormat', () => {
    const { handlebars } = require('handlebars');
    expect(handlebars.helpers.langFormat(100)).toBe('Native');
    expect(handlebars.helpers.langFormat(90)).toBe('Bilingual');
    expect(handlebars.helpers.langFormat(80)).toBe('B2');
    expect(handlebars.helpers.langFormat(50)).toBe('');
  });
});
