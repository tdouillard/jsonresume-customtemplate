const
  fs = require('fs'),
  handlebars = require('handlebars'),
  handlebarsWax = require('handlebars-wax'),
  addressFormat = require('address-format'),
  moment = require('moment'),
  Swag = require('swag');

Swag.registerHelpers(handlebars);

const Handlebars = require('handlebars');

// Helper: parse bullets (•) and format lines with <br>
const parseBullets = (context) => {
  if (!context || typeof context !== "string") return context;
  const formatedText = context
    .split('•')
    .filter(line => line.trim() !== '')
    .map((line, index) => { 
      let formatedLine = line.trim(); 
      formatedLine = index > 0 ? '• ' + formatedLine : formatedLine; 
      return formatedLine 
    })
    .join('<br>');
  return new Handlebars.SafeString(formatedText);
};

// Register helpers
Handlebars.registerHelper({
  removeProtocol: function (url) {
    return url.replace(/.*?:\/\//g, '');
  },

  concat: function () {
    let res = '';
    for (let arg in arguments) {
      if (typeof arguments[arg] !== 'object') {
        res += arguments[arg];
      }
    }
    return res;
  },

  formatAddress: function (address, city, region, postalCode, countryCode) {
    let addressList = addressFormat({
      address: address,
      city: city,
      subdivision: region,
      postalCode: postalCode,
      countryCode: countryCode
    });
    return addressList.join('<br/>');
  },

  formatDate: function (date) {
    // Using moment if available, fallback to Date
    if (typeof moment !== 'undefined' && moment(date).isValid()) {
      return moment(date).format('MMM YYYY');
    }
    if (!date) return '';
    var options = { year: 'numeric', month: 'short' };
    var d = new Date(date);
    return d.toLocaleDateString('fr-FR', options);
  },

  splitFirstName: function (name) {
    if (!name) return '';
    var n = name.split(' ');
    return n.slice(0, 1).join(' ');
  },

  splitLastName: function (name) {
    if (!name) return '';
    var n = name.split(' ');
    return n.length > 1 ? n.slice(1).join(' ') : '';
  },

  formatYear: function (dateString) {
    if (!dateString) return '';
    var d = new Date(dateString);
    return d.getFullYear();
  },

  pre: function (text) {
    var escaped = Handlebars.Utils.escapeExpression(text || "");
    const safeStringObj = new Handlebars.SafeString(escaped.replace(/\n/g, '<br>'));
    const formated = parseBullets(safeStringObj.string);
    return formated;
  },

  eq: function (a, b) {
    return a === b ? '1' : null;
  },

  langFormat: function (value) {
    if (value == 100) {
      return 'Native';
    } else if (value >= 90) {
      return 'Bilingual';
    } else if (value >= 75) {
      return 'B2';
    } else {
      return '';
    }
  }
});


function render(resume) {
  const dir = __dirname;
  const css = fs.readFileSync(`${dir}/style.css`, 'utf-8'),
    resumeTemplate = fs.readFileSync(`${dir}/resume.hbs`, 'utf-8'),
    HandlebarsInstance = handlebarsWax(handlebars);
  HandlebarsInstance.partials(`${dir}/views/**/*.{hbs,js}`);
  HandlebarsInstance.partials(`${dir}/partials/**/*.{hbs,js}`);
  return HandlebarsInstance.compile(resumeTemplate)({ css, resume });
}

module.exports = {
  render: render
};
