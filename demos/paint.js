function drawTopLeft(path, width, height, type, radius, inset) {
  switch (type) {
    case 'square':
      path.lineTo(inset, inset);
      break;
    case 'round':
      path.lineTo(inset, radius);
      path.arcTo(inset, inset, radius, inset, Math.max(0, radius - inset));
      break;
    case 'triangle':
      const delta = Math.ceil((Math.SQRT2 - 1) * inset * 2) / 2;
      path.lineTo(inset, radius + delta);
      path.lineTo(radius + delta, inset);
      break;
  }
}

function drawTopRight(path, width, height, type, radius, inset) {
  switch (type) {
    case 'square':
      path.lineTo(width - inset, inset);
      break;
    case 'round':
      path.lineTo(width - radius, inset);
      path.arcTo(width - inset, inset, width - inset, radius, Math.max(0, radius - inset));
      break;
    case 'triangle':
      const delta = Math.ceil((Math.SQRT2 - 1) * inset * 2) / 2;
      path.lineTo(width - radius - delta, inset);
      path.lineTo(width - inset, radius + delta);
      break;
  }
}

function drawBottomRight(path, width, height, type, radius, inset) {
  switch (type) {
    case 'square':
      path.lineTo(width - inset, height - inset);
      break;
    case 'round':
      path.lineTo(width - inset, height - radius);
      path.arcTo(width - inset, height - inset, width - radius, height - inset, Math.max(0, radius - inset));
      break;
    case 'triangle':
      const delta = Math.ceil((Math.SQRT2 - 1) * inset * 2) / 2;
      path.lineTo(width - inset, height - radius - delta);
      path.lineTo(width - radius - delta, height - inset);
      break;
  }
}

function drawBottomLeft(path, width, height, type, radius, inset) {
  switch (type) {
    case 'square':
      path.lineTo(inset, height - inset);
      break;
    case 'round':
      path.lineTo(radius, height - inset);
      path.arcTo(inset, height - inset, inset, height - radius, Math.max(0, radius - inset));
      break;
    case 'triangle':
      const delta = Math.ceil((Math.SQRT2 - 1) * inset * 2) / 2;
      path.lineTo(radius + delta, height - inset);
      path.lineTo(inset, height - radius - delta);
      break;
  }
}

function getPath(paths, width, height, inset, corners, radius) {
  const key = [width, height, inset].join(' ');
  if (!paths[key])  {
  // TODO add a path cache?
  const path = new Path2D();
  path.moveTo(width / 2, inset);
  drawTopRight(path, width, height, corners[0], radius, inset);
  drawBottomRight(path, width, height, corners[1], radius, inset);
  drawBottomLeft(path, width, height, corners[2], radius, inset);
  drawTopLeft(path, width, height, corners[3], radius, inset);
  path.closePath();
    paths[key] = path;
  }
  // return path;
  return paths[key];
}

const MDC_ELEVATION_UMBRA_MAP = [
  { offset: 0, blur: 0, inset: 0},
  { offset: 2, blur: 1, inset: -1},
  { offset: 3, blur: 1, inset: -2},
  { offset: 3, blur: 3, inset: -2},
  { offset: 2, blur: 4, inset: -1},
  { offset: 3, blur: 5, inset: -1},
  { offset: 3, blur: 5, inset: -1},
  { offset: 4, blur: 5, inset: -2},
  { offset: 5, blur: 5, inset: -3 },
  { offset: 5, blur: 6, inset: -3},
  { offset: 6, blur: 6, inset: -3 },
  { offset: 6, blur: 7, inset: -4 },
  { offset: 7, blur: 8, inset: -4 },
  { offset: 7, blur: 8, inset: -4 },
  { offset: 7, blur: 9, inset: -4 },
  { offset: 8, blur: 9, inset: -5},
  { offset: 8, blur: 10, inset: -5 },
  { offset: 8, blur: 11, inset: -5 },
  { offset: 9, blur: 11, inset: -5 },
  { offset: 9, blur: 12, inset: -6},
  { offset: 10, blur: 13, inset: -6 },
  { offset: 10, blur: 13, inset: -6 },
  { offset: 10, blur: 14, inset: -6 },
  { offset: 11, blur: 14, inset: -7 },
  { offset: 11, blur: 15, inset: -7 },
];
 
const MDC_ELEVATION_PENUMBRA_MAP = [
  { offset: 0, blur: 0, inset: 0 },
  { offset: 1, blur: 1, inset: 0 },
  { offset: 2, blur: 2, inset: 0 },
  { offset: 3, blur: 4, inset: 0 },
  { offset: 4, blur: 5, inset: 0 },
  { offset: 5, blur: 8, inset: 0},
  { offset: 6, blur: 10, inset: 0 },
  { offset: 7, blur: 10, inset: 1 },
  { offset: 8, blur: 10, inset: 1 },
  { offset: 9, blur: 12, inset: 1},
  { offset: 10, blur: 14, inset: 1 },
  { offset: 11, blur: 15, inset: 1 },
  { offset: 12, blur: 17, inset: 2 },
  { offset: 13, blur: 19, inset: 2 },
  { offset: 14, blur: 21, inset: 2 },
  { offset: 15, blur: 22, inset: 2 },
  { offset: 16, blur: 24, inset: 2 },
  { offset: 17, blur: 26, inset: 2 },
  { offset: 18, blur: 28, inset: 2 },
  { offset: 19, blur: 29, inset: 2 },
  { offset: 20, blur: 31, inset: 3 },
  { offset: 21, blur: 33, inset: 3 },
  { offset: 22, blur: 35, inset: 3 },
  { offset: 23, blur: 36, inset: 3 },
  { offset: 24, blur: 38, inset: 3 },
];

const MDC_ELEVATION_AMBIENT_MAP = [
  { offset: 0, blur: 0, inset: 0 },
  { offset: 1, blur: 3, inset: 0 },
  { offset: 1, blur: 5, inset: 0 },
  { offset: 1, blur: 8, inset: 0},
  { offset: 1, blur: 10, inset: 0 },
  { offset: 1, blur: 14, inset: 0 },
  { offset: 1, blur: 18, inset: 0 },
  { offset: 2, blur: 16, inset: 1 },
  { offset: 3, blur: 14, inset: 2 },
  { offset: 3, blur: 16, inset: 2},
  { offset: 4, blur: 18, inset: 3 },
  { offset: 4, blur: 20, inset: 3 },
  { offset: 5, blur: 22, inset: 4 },
  { offset: 5, blur: 24, inset: 4 },
  { offset: 5, blur: 26, inset: 4 },
  { offset: 6, blur: 28, inset: 5 },
  { offset: 6, blur: 30, inset: 5 },
  { offset: 6, blur: 32, inset: 5 },
  { offset: 7, blur: 34, inset: 6 },
  { offset: 7, blur: 36, inset: 6 },
  { offset: 8, blur: 38, inset: 7 },
  { offset: 8, blur: 40, inset: 7 },
  { offset: 8, blur: 42, inset: 7 },
  { offset: 9, blur: 44, inset: 8 },
  { offset: 9, blur: 46, inset: 8 },
];

function interpolateShadows( from, to, progress) {
  return {
    offset: from.offset * (1 - progress) + to.offset * progress,
    blur: from.blur * (1 - progress) + to.blur * progress,
    inset: from.inset * (1 - progress) + to.inset * progress,
  };
}

function drawBoxShadow(paths, ctx, width, height, {offset, blur, inset}, color, corners, radius) {
  ctx.save();
  const shift = 1000;
  ctx.translate(-shift, -shift);

  // TODO FIX CHROME.
  const dpr = devicePixelRatio;
  ctx.shadowOffsetX = shift * dpr + 12;
  ctx.shadowOffsetY = (offset + shift) * dpr ;
  ctx.shadowBlur = blur * dpr;
  ctx.shadowColor = color;
  ctx.fillStyle = '#fff';

  const p = getPath(paths, width, height, -inset, corners, radius);
  ctx.fill(p);
  ctx.restore();
}

registerPaint('mdc-button', class {
  static get inputProperties() {
    return [
      '--mdc-background-color',
      '--mdc-ripple-fg-size',
      '--mdc-ripple-fg-translate',
      '--mdc-ripple-fg-scale',
      // '--mdc-ripple-fg-opacity', not being set yet, should vary from 0.32 to 0.16.
      'background-position-x', // ripple size progress.
      'background-position-y', // ripple opacity progress.
      'background-size', // box-shadow progress. 
    ];
  }

  constructor() {
    this.paths = {};
  }

  paint(ctx, geom, style) {
    const borderInset = 30;
    ctx.translate(borderInset, borderInset);
    const width = geom.width - 2 * borderInset;
    const height = geom.height - 2 * borderInset;

    const corners = ['triangle', 'triangle', 'triangle', 'triangle'];
    const radius = 8;

    let hoverProgress = 0;

    // 1. Draw shadows.
    const shadowProgress = style.get('background-size').value;
    if (shadowProgress && shadowProgress != 'auto') {
      const fromIdx = Math.floor(shadowProgress);
      const toIdx = Math.ceil(shadowProgress);
      hoverProgress = Math.min(1, Math.max(shadowProgress - 2, 0));
      drawBoxShadow(this.paths, ctx, width, height, interpolateShadows(MDC_ELEVATION_UMBRA_MAP[fromIdx], MDC_ELEVATION_UMBRA_MAP[toIdx], shadowProgress % 1), 'rgba(0, 0, 0, .2)', corners, radius);
      drawBoxShadow(this.paths, ctx, width, height, interpolateShadows(MDC_ELEVATION_PENUMBRA_MAP[fromIdx], MDC_ELEVATION_PENUMBRA_MAP[toIdx], shadowProgress % 1), 'rgba(0, 0, 0, .14)', corners, radius);
      drawBoxShadow(this.paths, ctx, width, height, interpolateShadows(MDC_ELEVATION_AMBIENT_MAP[fromIdx], MDC_ELEVATION_AMBIENT_MAP[toIdx], shadowProgress % 1), 'rgba(0, 0, 0, .12)', corners, radius);
    }

    // 2. Set up the clip for the background area.
    const p = getPath(this.paths, width, height, 0, corners, radius);
    ctx.clip(p);

    // 3. Draw background.
    ctx.fillStyle = style.get('--mdc-background-color');
    ctx.fillRect(0, 0, width, height);

    // 4. Draw hover state.
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.16 * hoverProgress; // TODO make config.
    if (hoverProgress) {
      ctx.fillRect(0, 0, width, height);
    }

    // 4. Draw ripples!
    const rippleScaleProgress = parseFloat(style.get('background-position-x')) || 0; // TODO use .value
    const rippleOpacityProgress = parseFloat(style.get('background-position-y')) || 0; // TODO use .value

    if (rippleOpacityProgress) {
      ctx.globalAlpha = 0.32 * rippleOpacityProgress;
      ctx.fillStyle = '#fff';

      // Center point of the ripple.
      const [x, y] = style.get('--mdc-ripple-fg-translate').toString().trim().split(' ').map(s => parseFloat(s.trim()));
      const r = (parseFloat(style.get('--mdc-ripple-fg-size')) || 0) * (0.5 * (1 - rippleScaleProgress) + (parseFloat(style.get('--mdc-ripple-fg-scale')) || 0) * rippleScaleProgress);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
});
