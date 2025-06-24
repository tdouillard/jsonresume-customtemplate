const
  fs = require('fs'),
  handlebars = require('handlebars'),
  handlebarsWax = require('handlebars-wax'),
  addressFormat = require('address-format'),
  moment = require('moment'),
  Swag = require('swag');

Swag.registerHelpers(handlebars);

handlebars.registerHelper({
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
    return moment(date).format('MMM YYYY');
  }
});

handlebars.registerHelper('splitFirstName', function (name) {
  if (!name) return '';
  var n = name.split(' ');
  return n.slice(0, 1).join(' ');
});
handlebars.registerHelper('splitLastName', function (name) {
  if (!name) return '';
  var n = name.split(' ');
  return n.length > 1 ? n.slice(1).join(' ') : '';
});
handlebars.registerHelper('formatDate', function (dateString) {
  if (!dateString) return '';
  var options = { year: 'numeric', month: 'short' };
  var d = new Date(dateString);
  return d.toLocaleDateString('fr-FR', options);
});
handlebars.registerHelper('formatYear', function (dateString) {
  if (!dateString) return '';
  var d = new Date(dateString);
  return d.getFullYear();
});

const Handlebars = require('handlebars');

const parseBullets = (context) => {
  // Split at each bullet (•), keep content, filter any empty lines
  if (!context || typeof context !== "string") return context;
  const formatedText = context
    .split('•')
    .filter(line => line.trim() !== '')
    .map((line, index) => { let formatedLine = line.trim(); formatedLine = index > 0 ? '• ' + formatedLine : formatedLine; return formatedLine })
    .join('<br>');
  return new handlebars.SafeString(formatedText);
}

handlebars.registerHelper('pre', function (text) {
  var escaped = handlebars.Utils.escapeExpression(text || "");
  const safeStringObj = new handlebars.SafeString(escaped.replace(/\n/g, '<br>'));
  const formated = parseBullets(safeStringObj.string);
  return formated;
});

Handlebars.registerHelper('eq', function (a, b) {
  return a === b ? '1' : null;
});
handlebars.registerHelper('langFormat', function (value) {
  if (value == 100) {
    return 'Maternelle';
  } else if (value >= 90) {
    return 'Bilingue';
  } else if (value >= 75) {
    return 'B2';
  } else {
    return ''; // or 'basique', etc.
  }
});





function render(resume) {
  let dir = __dirname,
    css = fs.readFileSync(dir + '/style.css', 'utf-8'),
    resumeTemplate = fs.readFileSync(dir + '/resume.hbs', 'utf-8');

  let Handlebars = handlebarsWax(handlebars);

  Handlebars.partials(dir + '/views/**/*.{hbs,js}');
  Handlebars.partials(dir + '/partials/**/*.{hbs,js}');

  return Handlebars.compile(resumeTemplate)({
    css: css,
    resume: resume
  });
}

module.exports = {
  render: render
};
