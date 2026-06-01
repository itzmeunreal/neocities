const svg_w = 612.002, svg_h = 251.924;
const btns = {
	'btn-b': {
		type: 'circle',
		cx: 430.15,
		cy: 178.63,
		r: 28.40
	},
	'btn-a': {
		type: 'circle',
		cx: 508.84,
		cy: 178.63,
		r: 28.40
	},
	'btn-select': {
		type: 'pill',
		cx: 240.38,
		cy: 179.94,
		w: 48.52,
		h: 19.12
	},
	'btn-start': {
		type: 'pill',
		cx: 324.37,
		cy: 179.94,
		w: 48.52,
		h: 19.12
	},
	'dpad-up': {
		type: 'rect',
		cx: 101.21,
		cy: 112.00,
		w: 36.76,
		h: 36.00
	},
	'dpad-down': {
		type: 'rect',
		cx: 101.21,
		cy: 186.80,
		w: 36.76,
		h: 38.46
	},
	'dpad-left': {
		type: 'rect',
		cx: 63.50,
		cy: 149.09,
		w: 38.65,
		h: 36.95
	},
	'dpad-right': {
		type: 'rect',
		cx: 138.92,
		cy: 149.09,
		w: 38.65,
		h: 36.95
	},
};

for (const [id, b] of Object.entries(btns))
	b.el = document.getElementById(id);

const img = document.getElementById('nes');
const wrap = document.getElementById('wrap');

function positionAll() {
	const renderedW = img.offsetWidth;
	const renderedH = renderedW * (svg_h / svg_w);
	const sx = renderedW / svg_w;
	const sy = renderedH / svg_h;
	wrap.style.height = renderedH + 'px';
	for (const b of Object.values(btns)) {
		const el = b.el;
		if (b.type === 'circle') {
			const s = Math.min(sx, sy);
			const r = b.r * s;
			el.style.cssText = `width:${r*2}px;height:${r*2}px;left:${b.cx*sx - r}px;top:${b.cy*sy - r}px`;
		} else {
			const w = b.w * sx;
			const h = b.h * sy;
			el.style.cssText = `width:${w}px;height:${h}px;left:${b.cx*sx - w/2}px;top:${b.cy*sy - h/2}px`;
			if (b.type === 'pill')
				el.style.borderRadius = h / 2 + 'px';
		}
	}
}

img.addEventListener('load', positionAll);
window.addEventListener('resize', positionAll);
if (img.complete) positionAll();

const code_map = {
	'ArrowLeft': 'btn-b',
	'ArrowDown': 'btn-a',
	'Backspace': 'btn-select',
	'Enter': 'btn-start',
	'KeyW': 'dpad-up',
	'KeyS': 'dpad-down',
	'KeyA': 'dpad-left',
	'KeyD': 'dpad-right',
};

const held = new Set();

function sync() {
	for (const [id, b] of Object.entries(btns))
		b.el.classList.toggle('pressed', held.has(id));
}

document.addEventListener('keydown', e => {
	if (e.repeat) return;
	const id = code_map[e.code];
	if (!id) return;
	held.add(id);
	sync();
	e.preventDefault();
});

document.addEventListener('keyup', e => {
	const id = code_map[e.code];
	if (!id) return;
	held.delete(id);
	sync();
});

window.addEventListener('blur', () => { held.clear(); sync(); });
document.addEventListener('visibilitychange', () => {
	if (document.hidden) { held.clear(); sync(); }
});
