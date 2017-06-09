const icons = {
  image: {
    type: 'FontAwesome',
    name: 'file-image-o'
  },
  video: {
    type: 'FontAwesome',
    name: 'file-video-o'
  },
  word: {
    type: 'FontAwesome',
    name: 'file-word-o'
  },
  excel: {
    type: 'FontAwesome',
    name: 'file-excel-o'
  },
  powerpoint: {
    type: 'FontAwesome',
    name: 'file-powerpoint-o'
  },
  pdf: {
    type: 'FontAwesome',
    name: 'file-pdf-o'
  },
  audio: {
    type: 'FontAwesome',
    name: 'file-audio-o'
  },
  txt: {
    type: 'FontAwesome',
    name: 'file-text-o'
  },
  other: {
    type: 'FontAwesome',
    name: 'file-o'
  }
};

export const fileExtensionIconMapper = {
  'video/3gpp': icons.video,
  'video/x-ms-asf': icons.video,
  'video/x-msvideo': icons.video,
  'video/vnd.mpegurl': icons.video,
  'video/x-m4v': icons.video,
  'video/quicktime': icons.video,
  'video/mp4': icons.video,
  'video/mpeg': icons.video,
  'audio/mpeg': icons.audio,
  'audio/ogg': icons.video,
  'audio/x-mpegurl': icons.image,
  'audio/mp4a-latm': icons.video,
  'audio/x-mpeg': icons.audio,
  'audio/x-pn-realaudio': icons.video,
  'audio/x-wav': icons.audio,
  'audio/x-ms-wma': icons.audio,
  'audio/x-ms-wmv': icons.audio,
  'image/bmp': icons.image,
  'image/png': icons.image,
  'image/gif': icons.image,
  'image/jpeg': icons.image,
  'image/x-ms-bmp': icons.image,
  'application/pdf': icons.pdf,
  'application/vnd.ms-powerpoint': icons.powerpoint,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': icons.powerpoint,
  'application/vnd.openxmlformats-officedocument.presentationml.template': icons.powerpoint,
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow': icons.powerpoint,
  'application/msword': icons.word,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': icons.word,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template': icons.word,
  'application/vnd.ms-excel': icons.excel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': icons.excel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template': icons.excel,
  'application/rtf': icons.txt,
  'application/octet-stream': icons.other,
  'text/xml': icons.txt,
  'text/plain': icons.txt,
  other: icons.other
};

export const fileExtensionMimeMapper = {
  html: 'text/html',
  htm: 'text/html',
  shtml: 'text/html',
  css: 'text/css',
  xml: 'text/xml',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'application/javascript',
  atom: 'application/atom+xml',
  rss: 'application/rss+xml',
  mml: 'text/mathml',
  txt: 'text/plain',
  jad: 'text/vnd.sun.j2me.app-descriptor',
  wml: 'text/vnd.wap.wml',
  htc: 'text/x-component',
  png: 'image/png',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  wbmp: 'image/vnd.wap.wbmp',
  ico: 'image/x-icon',
  jng: 'image/x-jng',
  bmp: 'image/x-ms-bmp',
  svg: 'image/svg+xml',
  svgz: 'image/svg+xml',
  webp: 'image/webp',
  woff: 'application/font-woff',
  jar: 'application/java-archive',
  war: 'application/java-archive',
  ear: 'application/java-archive',
  json: 'application/json',
  hqx: 'application/mac-binhex40',
  doc: 'application/msword',
  pdf: 'application/pdf',
  ps: 'application/postscript',
  eps: 'application/postscript',
  ai: 'application/postscript',
  rtf: 'application/rtf',
  m3u8: 'application/vnd.apple.mpegurl',
  xls: 'application/vnd.ms-excel',
  eot: 'application/vnd.ms-fontobject',
  ppt: 'application/vnd.ms-powerpoint',
  wmlc: 'application/vnd.wap.wmlc',
  kml: 'application/vnd.google-earth.kml+xml',
  kmz: 'application/vnd.google-earth.kmz',
  '7z': 'application/x-7z-compressed',
  cco: 'application/x-cocoa',
  jardiff: 'application/x-java-archive-diff',
  jnlp: 'application/x-java-jnlp-file',
  run: 'application/x-makeself',
  pl: 'application/x-perl',
  pm: 'application/x-perl',
  prc: 'application/x-pilot',
  pdb: 'application/x-pilot',
  rar: 'application/x-rar-compressed',
  rpm: 'application/x-redhat-package-manager',
  sea: 'application/x-sea',
  swf: 'application/x-shockwave-flash',
  sit: 'application/x-stuffit',
  tcl: 'application/x-tcl',
  tk: 'application/x-tcl',
  der: 'application/x-x509-ca-cert',
  pem: 'application/x-x509-ca-cert',
  crt: 'application/x-x509-ca-cert',
  xpi: 'application/x-xpinstall',
  xhtml: 'application/xhtml+xml',
  xspf: 'application/xspf+xml',
  zip: 'application/zip',
  bin: 'application/octet-stream',
  exe: 'application/octet-stream',
  dll: 'application/octet-stream',
  deb: 'application/octet-stream',
  dmg: 'application/octet-stream',
  iso: 'application/octet-stream',
  img: 'application/octet-stream',
  msi: 'application/octet-stream',
  msp: 'application/octet-stream',
  msm: 'application/octet-stream',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  mid: 'audio/midi',
  midi: 'audio/midi',
  kar: 'audio/midi',
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
  m4a: 'audio/x-m4a',
  ra: 'audio/x-realaudio',
  '3gpp': 'video/3gpp',
  '3gp': 'video/3gpp',
  ts: 'video/mp2t',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  mpg: 'video/mpeg',
  mov: 'video/quicktime',
  webm: 'video/webm',
  flv: 'video/x-flv',
  m4v: 'video/x-m4v',
  mng: 'video/x-mng',
  asx: 'video/x-ms-asf',
  asf: 'video/x-ms-asf',
  wmv: 'video/x-ms-wmv',
  avi: 'video/x-msvideo'
};

export const AppNameMimeMapper = {
  'video/3gpp': 'video player',
  'video/x-ms-asf': 'video player',
  'video/x-msvideo': 'video player',
  'video/vnd.mpegurl': 'video player',
  'video/x-m4v': 'video player',
  'video/quicktime': 'video player',
  'video/mp4': 'video player',
  'video/mpeg': 'video player',
  'audio/mpeg': 'audio player',
  'audio/ogg': 'audio player',
  'audio/x-mpegurl': 'audio player',
  'audio/mp4a-latm': 'audio player',
  'audio/x-mpeg': 'audio player',
  'audio/x-pn-realaudio': 'audio player',
  'audio/x-wav': 'audio player',
  'audio/x-ms-wma': 'audio player',
  'audio/x-ms-wmv': 'audio player',
  'image/bmp': 'image viewer',
  'image/png': 'image viewer',
  'image/gif': 'image viewer',
  'image/jpeg': 'image viewer',
  'image/x-ms-bmp': 'image viewer',
  'application/pdf': 'pdf viewer',
  'application/vnd.ms-powerpoint': 'MS power point',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'MS power point',
  'application/vnd.openxmlformats-officedocument.presentationml.template': 'MS power point',
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow':'MS power point',
  'application/msword': 'MS word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':'MS word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template':'MS word',
  'application/vnd.ms-excel': 'MS excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'MS excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template':'MS excel',
  'application/rtf': 'text viewer',
  'text/xml': 'xml viewer',
  'text/plain': 'text viewer'
};

export function getIconByFileType(type) {
  if (fileExtensionIconMapper[type]) {
    return fileExtensionIconMapper[type];
  } else {
    return fileExtensionIconMapper.other;
  }
}

export function getMimeByFileExtension(type) {
  if (fileExtensionMimeMapper[type]) {
    return fileExtensionMimeMapper[type];
  } else {
    return 'application/octet-stream';
  }
}

export function getAppNameByMime(mime) {
  if (AppNameMimeMapper[mime]) {
    return AppNameMimeMapper[mime];
  } else {
    return '';
  }
}
