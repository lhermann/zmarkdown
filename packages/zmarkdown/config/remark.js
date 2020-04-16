const textrApostrophes = require('typographic-apostrophes')
const textrApostrophesForPlurals = require('typographic-apostrophes-for-possessive-plurals')
const textrCopyright = require('typographic-copyright')
const textrEllipses = require('typographic-ellipses')
const textrEmDashes = require('typographic-em-dashes')
const textrEnDashes = require('typographic-en-dashes')
const textrRegisteredTrademark = require('typographic-registered-trademark')
const textrSingleSpaces = require('typographic-single-spaces')
const textrTrademark = require('typographic-trademark')

const textrColon = require('typographic-colon/src')
const textrEmDash = require('typographic-em-dash/src')
const textrExclamationMark = require('typographic-exclamation-mark/src')
const textrGuillemets = require('typographic-guillemets/src')
const textrPercent = require('typographic-percent/src')
const textrPermille = require('typographic-permille/src')
const textrQuestionMark = require('typographic-question-mark/src')
const textrSemicolon = require('typographic-semicolon/src')

const gh = require('hast-util-sanitize/lib/github')
const katex = require('./sanitize-katex')
const merge = require('deepmerge')

const sanitizeConfig = merge.all([gh, katex, {
  tagNames: ['span', 'abbr', 'figure', 'figcaption', 'iframe'],
  attributes: {
    a: ['ariaHidden', 'class', 'className'],
    div: ['id', 'class', 'className'],
    span: ['id'],
    h1: ['ariaHidden'],
    h2: ['ariaHidden'],
    h3: ['ariaHidden'],
    abbr: ['title'],
    img: ['class'],
    code: ['className'],
    th: ['colspan', 'colSpan', 'rowSpan', 'rowspan'],
    td: ['colspan', 'colSpan', 'rowSpan', 'rowspan'],
    iframe: ['allowfullscreen', 'frameborder', 'height', 'src', 'width'],
  },
  protocols: {
    href: ['ftp', 'dav', 'sftp', 'magnet', 'tftp', 'view-source'],
    src: ['ftp', 'dav', 'sftp', 'tftp'],
  },
  clobberPrefix: '',
  clobber: [],
}])

const remarkConfig = {
  maxNesting: 100,
  reParse: {
    gfm: true,
    commonmark: false,
    footnotes: true,
    pedantic: false,
    /* sets list of known blocks to nothing, otherwise <h3>hey</h3> would become
    &#x3C;h3>hey&#x3C;/h3> instead of <p>&#x3C;h3>hey&#x3C;/h3></p> */
    blocks: [],
  },

  enableTextr: true,
  textr: {
    plugins: [
      textrApostrophes,
      textrApostrophesForPlurals,
      textrEllipses,
      textrEmDashes,
      textrEnDashes,
      textrCopyright,
      textrRegisteredTrademark,
      textrSingleSpaces,
      textrTrademark,

      textrColon,
      textrEmDash,
      textrExclamationMark,
      textrGuillemets,
      textrPercent,
      textrPermille,
      textrQuestionMark,
      textrSemicolon,
    ],
    options: {
      locale: 'fr',
    },
  },

  autolinkHeadings: {
    behaviour: 'append',
  },

  headingShifter: 0,

  remark2rehype: {
    allowDangerousHTML: true,
  },

  rehypeHighlight: {
    ignoreMissing: true,
    plainText: ['console'],
    aliases: {tex: ['latex']},
  },

  footnotesTitles: 'Retourner au texte de la note $id',

  alignBlocks: {
    center: 'align-center',
    right: 'align-right',
  },

  customBlocks: {
    secret: {
      classes: 'custom-block-spoiler',
      title: 'optional',
    },
    s: {
      classes: 'custom-block-spoiler',
      title: 'optional',
    },
    information: {
      classes: 'custom-block-information',
      title: 'optional',
    },
    i: {
      classes: 'custom-block-information',
      title: 'optional',
    },
    question: {
      classes: 'custom-block-question',
      title: 'optional',
    },
    q: {
      classes: 'custom-block-question',
      title: 'optional',
    },
    attention: {
      classes: 'custom-block-warning',
      title: 'optional',
    },
    a: {
      classes: 'custom-block-warning',
      title: 'optional',
    },
    erreur: {
      classes: 'custom-block-error',
      title: 'optional',
    },
    e: {
      classes: 'custom-block-error',
      title: 'optional',
    },
    neutre: {
      classes: 'custom-block-neutral',
      title: 'required',
    },
    n: {
      classes: 'custom-block-neutral',
      title: 'required',
    },
  },

  escapeEscaped: ['&'],

  emoticons: {
    emoticons: {
      ':ange:': '/static/smileys/svg/ange.svg',
      ':colere:': '/static/smileys/svg/angry.svg',
      'o_O': '/static/smileys/svg/blink.svg',
      ';)': '/static/smileys/svg/clin.svg',
      ':B': '/static/smileys/svg/b.svg',
      ':diable:': '/static/smileys/svg/diable.svg',
      ':D': '/static/smileys/svg/heureux.svg',
      '^^': '/static/smileys/svg/hihi.svg',
      ':o': '/static/smileys/svg/huh.svg',
      ':p': '/static/smileys/svg/langue.svg',
      ':magicien:': '/static/smileys/svg/magicien.svg',
      ':colere2:': '/static/smileys/svg/mechant.svg',
      ':ninja:': '/static/smileys/svg/ninja.svg',
      '>_<': '/static/smileys/svg/pinch.svg',
      'X/': '/static/smileys/svg/pinch.svg',
      ':pirate:': '/static/smileys/svg/pirate.svg',
      ":'(": '/static/smileys/svg/pleure.svg',
      ':lol:': '/static/smileys/svg/rire.svg',
      ':honte:': '/static/smileys/svg/rouge.svg',
      ':-°': '/static/smileys/svg/siffle.svg',
      ':)': '/static/smileys/svg/smile.svg',
      ':soleil:': '/static/smileys/svg/soleil.svg',
      ':(': '/static/smileys/svg/triste.svg',
      ':euh:': '/static/smileys/svg/unsure.svg',
      ':waw:': '/static/smileys/svg/waw.svg',
      ':zorro:': '/static/smileys/svg/zorro.svg',
      '^(;,;)^': '/static/smileys/svg/cthulhu.svg',
      ':bounce:': '/static/smileys/svg/bounce.svg',
      ':popcorn:': '/static/smileys/svg/popcorn.svg',
      ':démon:': '/static/smileys/svg/1f47f.svg',
      ':demon:': '/static/smileys/svg/1f47f.svg',
      ':content:': '/static/smileys/svg/1f600.svg',
      ':joyeux:': '/static/smileys/svg/1f601.svg',
      ':mortderire:': '/static/smileys/svg/1f602.svg',
      ':daccord:': '/static/smileys/svg/1f603.svg',
      ':eneffet:': '/static/smileys/svg/1f604.svg',
      ':eneffetgené:': '/static/smileys/svg/1f605.svg',
      ':eneffetgene:': '/static/smileys/svg/1f605.svg',
      'x)': '/static/smileys/svg/1f606.svg',
      ':innocent:': '/static/smileys/svg/1f607.svg',
      ':démonjoyeux:': '/static/smileys/svg/1f608.svg',
      ':demonjoyeux:': '/static/smileys/svg/1f608.svg',
      ':clindoeil:': '/static/smileys/svg/1f609.svg',
      ':rejouis:': '/static/smileys/svg/1f60a.svg',
      ':yum:': '/static/smileys/svg/1f60b.svg',
      ':soulagé:': '/static/smileys/svg/1f60c.svg',
      ':soulage:': '/static/smileys/svg/1f60c.svg',
      '<3': '/static/smileys/svg/1f60d.svg',
      ':confiant:': '/static/smileys/svg/1f60e.svg',
      ':malicieux:': '/static/smileys/svg/1f60f.svg',
      ':indifférent:': '/static/smileys/svg/1f610.svg',
      ':indifferent:': '/static/smileys/svg/1f610.svg',
      ':détaché:': '/static/smileys/svg/1f611.svg',
      ':detache:': '/static/smileys/svg/1f611.svg',
      ':lassé:': '/static/smileys/svg/1f612.svg',
      ':lasse:': '/static/smileys/svg/1f612.svg',
      ':sueurfroide:': '/static/smileys/svg/1f613.svg',
      ':insatisfait:': '/static/smileys/svg/1f614.svg',
      ':-/': '/static/smileys/svg/1f615.svg',
      ':contrarié:': '/static/smileys/svg/1f616.svg',
      ':contrarie:': '/static/smileys/svg/1f616.svg',
      ':bisou:': '/static/smileys/svg/1f617.svg',
      ':bisoucoeur:': '/static/smileys/svg/1f618.svg',
      ':bisousourire:': '/static/smileys/svg/1f619.svg',
      ':bisourougir:': '/static/smileys/svg/1f61a.svg',
      ':-P': '/static/smileys/svg/1f61b.svg',
      ';-P': '/static/smileys/svg/1f61c.svg',
      'x-P': '/static/smileys/svg/1f61d.svg',
      ':déçuinquiet:': '/static/smileys/svg/1f61e.svg',
      ':decuinquiet:': '/static/smileys/svg/1f61e.svg',
      ':inquiet:': '/static/smileys/svg/1f61f.svg',
      ':fâché:': '/static/smileys/svg/1f620.svg',
      ':fache:': '/static/smileys/svg/1f620.svg',
      ':fâchérouge:': '/static/smileys/svg/1f621.svg',
      ':facherouge:': '/static/smileys/svg/1f621.svg',
      ':tristelarme:': '/static/smileys/svg/1f622.svg',
      'x(': '/static/smileys/svg/1f623.svg',
      ':fulminant:': '/static/smileys/svg/1f624.svg',
      ':deçularme:': '/static/smileys/svg/1f625.svg',
      ':decularme:': '/static/smileys/svg/1f625.svg',
      ':déçu:': '/static/smileys/svg/1f626.svg',
      ':decu:': '/static/smileys/svg/1f626.svg',
      ':déçutriste:': '/static/smileys/svg/1f627.svg',
      ':decutriste:': '/static/smileys/svg/1f627.svg',
      ':déçuangoissé:': '/static/smileys/svg/1f628.svg',
      ':decuangoisse:': '/static/smileys/svg/1f628.svg',
      ':éreinté:': '/static/smileys/svg/1f629.svg',
      ':ereinte:': '/static/smileys/svg/1f629.svg',
      ':somnole:': '/static/smileys/svg/1f62a.svg',
      ':fatigué:': '/static/smileys/svg/1f62b.svg',
      ':fatigue:': '/static/smileys/svg/1f62b.svg',
      ':grimace:': '/static/smileys/svg/1f62c.svg',
      ':pleure:': '/static/smileys/svg/1f62d.svg',
      ':ébahi:': '/static/smileys/svg/1f62e.svg',
      ':ebahi:': '/static/smileys/svg/1f62e.svg',
      ':étonné:': '/static/smileys/svg/1f62f.svg',
      ':etonne:': '/static/smileys/svg/1f62f.svg',
      ':angoissé:': '/static/smileys/svg/1f630.svg',
      ':angoisse:': '/static/smileys/svg/1f630.svg',
      ':hurlantdepeur:': '/static/smileys/svg/1f631.svg',
      ':abasourdi:': '/static/smileys/svg/1f632.svg',
      ':surprisrougi:': '/static/smileys/svg/1f633.svg',
      ':dort:': '/static/smileys/svg/1f634.svg',
      ':vertige:': '/static/smileys/svg/1f635.svg',
      ':muet:': '/static/smileys/svg/1f636.svg',
      ':masquetissu:': '/static/smileys/svg/1f637.svg',
      ':nonsatisfait:': '/static/smileys/svg/1f641.svg',
      ':satisfait:': '/static/smileys/svg/1f642.svg',
      ':inversé:': '/static/smileys/svg/1f643.svg',
      ':inverse:': '/static/smileys/svg/1f643.svg',
      ':regardauciel:': '/static/smileys/svg/1f644.svg',
      ':bouchezipper:': '/static/smileys/svg/1f910.svg',
      ':appâtdugain:': '/static/smileys/svg/1f911.svg',
      ':appatdugain:': '/static/smileys/svg/1f911.svg',
      ':thermomètre:': '/static/smileys/svg/1f912.svg',
      ':intello4yeux:': '/static/smileys/svg/1f913.svg',
      ':pensif:': '/static/smileys/svg/1f914.svg',
      ':blessé:': '/static/smileys/svg/1f915.svg',
      ':blesse:': '/static/smileys/svg/1f915.svg',
      ':bienveillant:': '/static/smileys/svg/1f917.svg',
      ':nausée:': '/static/smileys/svg/1f922.svg',
      ':nausee:': '/static/smileys/svg/1f922.svg',
      ':pliéderire:': '/static/smileys/svg/1f923.svg',
      ':pliederire:': '/static/smileys/svg/1f923.svg',
      ':baver:': '/static/smileys/svg/1f924.svg',
      ':pinocchio:': '/static/smileys/svg/1f925.svg',
      ':eternuer:': '/static/smileys/svg/1f927.svg',
      ':quésaco:': '/static/smileys/svg/1f928.svg',
      ':quesaco:': '/static/smileys/svg/1f928.svg',
      ':regardfan:': '/static/smileys/svg/1f929.svg',
      ':hébété:': '/static/smileys/svg/1f92a.svg',
      ':hebete:': '/static/smileys/svg/1f92a.svg',
      ':chut:': '/static/smileys/svg/1f92b.svg',
      ':fureur:': '/static/smileys/svg/1f92c.svg',
      ':bailler:': '/static/smileys/svg/1f92d.svg',
      ':vomir:': '/static/smileys/svg/1f92e.svg',
      ':tropcogiter:': '/static/smileys/svg/1f92f.svg',
      ':amoureux:': '/static/smileys/svg/1f970.svg',
      ':fêter:': '/static/smileys/svg/1f973.svg',
      ':feter:': '/static/smileys/svg/1f973.svg',
      ':maldecoeur:': '/static/smileys/svg/1f974.svg',
      ':avoirchaud:': '/static/smileys/svg/1f975.svg',
      ':avoirfroid:': '/static/smileys/svg/1f976.svg',
      ':désolé:': '/static/smileys/svg/1f97a.svg',
      ':desole:': '/static/smileys/svg/1f97a.svg',
      ':triste:': '/static/smileys/svg/2639.svg',
      ':rougir:': '/static/smileys/svg/263a.svg',
    },
    classes: 'smiley',
  },

  math: {
    inlineMathDouble: true,
  },

  iframes: {
    'www.dailymotion.com': {
      width: 480,
      height: 270,
      disabled: false,
      oembed: 'https://www.dailymotion.com/services/oembed',
    },
    'www.vimeo.com': {
      width: 500,
      height: 281,
      disabled: false,
      oembed: 'https://vimeo.com/api/oembed.json',
    },
    'vimeo.com': {
      width: 500,
      height: 281,
      disabled: false,
      oembed: 'https://vimeo.com/api/oembed.json',
    },
    'www.youtube.com': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed',
    },
    'youtube.com': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed',
    },
    'youtu.be': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed',
    },
    'soundcloud.com': {
      width: 500,
      height: 305,
      disabled: false,
      oembed: 'https://soundcloud.com/oembed',
    },
    'www.ina.fr': {
      tag: 'iframe',
      width: 620,
      height: 349,
      disabled: false,
      replace: [
        ['www.', 'player.'],
        ['/video/', '/player/embed/'],
      ],
      append: '/1/1b0bd203fbcd702f9bc9b10ac3d0fc21/560/315/1/148db8',
      removeFileName: true,
    },
    'www.jsfiddle.net': {
      tag: 'iframe',
      width: 560,
      height: 560,
      disabled: false,
      replace: [
        ['http://', 'https://'],
      ],
      append: 'embedded/result,js,html,css/',
      match: /https?:\/\/(www\.)?jsfiddle\.net\/([\w\d]+\/[\w\d]+\/\d+\/?|[\w\d]+\/\d+\/?|[\w\d]+\/?)$/,
      thumbnail: {
        format: 'http://www.unixstickers.com/image/data/stickers' +
        '/jsfiddle/JSfiddle-blue-w-type.sh.png',
      },
    },
    'jsfiddle.net': {
      tag: 'iframe',
      width: 560,
      height: 560,
      disabled: false,
      replace: [
        ['http://', 'https://'],
      ],
      append: 'embedded/result,js,html,css/',
      match: /https?:\/\/(www\.)?jsfiddle\.net\/([\w\d]+\/[\w\d]+\/\d+\/?|[\w\d]+\/\d+\/?|[\w\d]+\/?)$/,
      thumbnail: {
        format: 'http://www.unixstickers.com/image/data/stickers' +
        '/jsfiddle/JSfiddle-blue-w-type.sh.png',
      },
    },
  },

  captions: {
    external: {
      table: 'Table:',
      gridTable: 'Table:',
      code: 'Code:',
      math: 'Equation:',
      iframe: 'Video:',
    },
    internal: {
      math: 'Equation:',
      inlineMath: 'Equation:',
      image: 'Figure:',
    },
  },

  ping: {
    pingUsername: (_username) => true,
    userURL: (username) => `/membres/voir/${username}/`,
    usernameRegex: /\B@(?:\*\*([^*]+)\*\*|(\w+))/,
  },

  disableTokenizers: {},

  imagesDownload: {
    disabled: true,
    defaultImagePath: 'black.png',
    defaultOn: {
      statusCode: true,
      mimeType: false,
      fileTooBig: false,
    },
    downloadDestination: './img/',
    maxlength: 1000000,
    dirSizeLimit: 10000000,
  },
  sanitize: sanitizeConfig,
}

module.exports = remarkConfig
