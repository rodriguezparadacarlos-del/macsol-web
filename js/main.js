/* ===================== NAVBAR TOGGLE ===================== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });
}

/* Mark active nav link */
(function markActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ===================== FAQ ACCORDION ===================== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const inner  = item.querySelector('.faq-answer-inner');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.faq-answer').style.maxHeight = '0';
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = inner.offsetHeight + 'px';
    }
  });
});

/* ===================== PRODUCT TABS ===================== */
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.product-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ===================== FORM HANDLING ===================== */
document.querySelectorAll('form[data-ajax]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const success = form.querySelector('.form-success');
    const orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = orig;
      form.reset();
      if (success) { success.style.display = 'block'; }
      setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
    }, 1200);
  });
});

/* ===================== COOKIE CONSENT ===================== */
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');

if (cookieBanner) {
  if (!localStorage.getItem('macsol_cookie_consent')) {
    setTimeout(() => cookieBanner.classList.add('show'), 800);
  }
  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('macsol_cookie_consent', 'accepted');
      cookieBanner.classList.remove('show');
    });
  }
  if (cookieReject) {
    cookieReject.addEventListener('click', () => {
      localStorage.setItem('macsol_cookie_consent', 'rejected');
      cookieBanner.classList.remove('show');
    });
  }
}

/* ===================== PRODUCT DETAIL PAGE ===================== */
const products = [
  /* ESCRITORIO */
  { id: 1,  name: 'Resma Papel A4 75gr', cat: 'escritorio', icon: '📄', sku: 'ESC-001',
    desc: 'Resma de 500 hojas de papel bond de 75 gramos, formato A4 (210×297 mm). Ideal para impresoras láser e inkjet. Blancura superior, excelente opacidad.',
    specs: [['Formato','A4 (210×297 mm)'],['Gramaje','75 g/m²'],['Hojas','500'],['Blancura','CIE 146']] },
  { id: 2,  name: 'Carpeta Archivadora 8cm', cat: 'escritorio', icon: '📁', sku: 'ESC-002',
    desc: 'Carpeta de palanca lomo ancho 8 cm. Tapa dura plastificada, con ventana y mecanismo de palanca resistente. Disponible en varios colores.',
    specs: [['Lomo','8 cm'],['Mecanismo','Palanca doble'],['Material','Cartón plastificado'],['Formato','Oficio/Letter']] },
  { id: 3,  name: 'Bolígrafos Pack x10', cat: 'escritorio', icon: '🖊️', sku: 'ESC-003',
    desc: 'Pack de 10 bolígrafos de punta fina 0.7 mm con tinta de secado rápido. Grip antideslizante, capuchón snap. Escritura suave y fluida.',
    specs: [['Punta','0.7 mm'],['Tinta','Base agua'],['Unidades','10'],['Colores','Azul / Negro / Rojo']] },
  { id: 4,  name: 'Notas Adhesivas 75×75mm', cat: 'escritorio', icon: '🟨', sku: 'ESC-004',
    desc: 'Block de 100 notas adhesivas repositionables de 75×75 mm. Adhesivo que no daña superficies, colores neon surtidos.',
    specs: [['Tamaño','75×75 mm'],['Hojas','100 por block'],['Adhesivo','Repositionable'],['Colores','Surtidos neon']] },
  { id: 5,  name: 'Engrapadora Metálica 26/6', cat: 'escritorio', icon: '📎', sku: 'ESC-005',
    desc: 'Engrapadora de escritorio con cuerpo metálico, capacidad 20 hojas. Compatible con grapas 26/6 y 24/6. Base antideslizante.',
    specs: [['Capacidad','20 hojas'],['Grapas','26/6 / 24/6'],['Material','Metal y ABS'],['Carga','Lateral']] },
  { id: 6,  name: 'Tijeras de Oficina 20cm', cat: 'escritorio', icon: '✂️', sku: 'ESC-006',
    desc: 'Tijeras de acero inoxidable con mango ergonómico bicolor. Hoja de 20 cm, filo duradero. Aptas para diestros y zurdos.',
    specs: [['Longitud','20 cm'],['Hoja','Acero inoxidable'],['Mango','ABS ergonómico'],['Uso','Ambidiestro']] },
  /* ASEO */
  { id: 7,  name: 'Escoba Industrial 30cm', cat: 'aseo', icon: '🧹', sku: 'ASE-001',
    desc: 'Escoba de cerdas sintéticas 30 cm con mango telescópico de aluminio extensible de 90 a 140 cm. Ideal para superficies duras, alta resistencia.',
    specs: [['Ancho','30 cm'],['Mango','Aluminio telescópico'],['Cerdas','Sintéticas PET'],['Largo mango','90–140 cm']] },
  { id: 8,  name: 'Trapeador Microfibra Industrial', cat: 'aseo', icon: '🫧', sku: 'ASE-002',
    desc: 'Trapeador de microfibra de alta absorbencia con mango de acero inoxidable. Cubre 60 cm. Lavable hasta 200 veces. Elimina 99% de bacterias en seco.',
    specs: [['Ancho','60 cm'],['Material','Microfibra 300 g/m²'],['Mango','Acero inoxidable'],['Lavados','200']] },
  { id: 9,  name: 'Desinfectante Multiusos 5L', cat: 'aseo', icon: '🧴', sku: 'ASE-003',
    desc: 'Desinfectante de amplio espectro concentrado. Elimina bacterias, hongos y virus. Fragancia limón. Rendimiento: 1 litro rinde 50 litros en uso doméstico.',
    specs: [['Volumen','5 litros'],['Concentración','Concentrado 1:50'],['Acción','Bactericida / Fungicida'],['Fragancia','Limón']] },
  { id: 10, name: 'Bolsas de Basura 200L x25', cat: 'aseo', icon: '🗑️', sku: 'ASE-004',
    desc: 'Bolsas resistentes de alta densidad 200 litros, galga 80. Pack de 25 unidades. Alta resistencia a desgarros, aptas para residuos industriales y domésticos.',
    specs: [['Capacidad','200 litros'],['Galga','80'],['Unidades','25 por pack'],['Material','HDPE']] },
  { id: 11, name: 'Jabón Líquido Antibacterial 5L', cat: 'aseo', icon: '🧼', sku: 'ASE-005',
    desc: 'Jabón líquido antibacterial con triclosán para uso en dispensadores de empuje o sensor. Fórmula enriquecida con aloe vera, sin resecar las manos.',
    specs: [['Volumen','5 litros'],['Fórmula','Antibacterial + Aloe'],['pH','5.5–7'],['Compatible','Dispensadores push/sensor']] },
  { id: 12, name: 'Papel Higiénico Industrial x48', cat: 'aseo', icon: '🧻', sku: 'ASE-006',
    desc: 'Papel higiénico doble hoja, 250 metros por rollo. Pack de 48 rollos. Papel blanco ecológico sin blanqueador óptico. Compatible con dispensadores jumbo.',
    specs: [['Metros','250 m/rollo'],['Rollos','48'],['Hojas','Doble hoja'],['Tipo','Jumbo dispensador']] },
  /* CONSTRUCCIÓN */
  { id: 13, name: 'Pintura Látex Blanca 20L', cat: 'construccion', icon: '🪣', sku: 'CON-001',
    desc: 'Pintura látex de interior y exterior, alto poder cubriente. Acabado mate lavable, resistente a la intemperie. Rendimiento: 8–10 m² por litro por mano.',
    specs: [['Volumen','20 litros'],['Acabado','Mate lavable'],['Rendimiento','8–10 m²/L/mano'],['Secado','30 min']] },
  { id: 14, name: 'Rodillo Pintura 23cm c/Bandeja', cat: 'construccion', icon: '🎨', sku: 'CON-002',
    desc: 'Set de rodillo de pintura 23 cm pelo 12 mm con bandeja de acero galvanizado. Mango ergonómico con rosca para extensión. Apto para pinturas látex y esmaltes.',
    specs: [['Ancho','23 cm'],['Pelo','12 mm'],['Bandeja','Acero galvanizado'],['Mango','Rosca para extensión']] },
  { id: 15, name: 'Cinta de Embalaje 48mm x100m x6', cat: 'construccion', icon: '📦', sku: 'CON-003',
    desc: 'Pack de 6 rollos de cinta de embalaje transparente 48 mm × 100 m. Alta resistencia a la tracción, adhesivo acrílico de larga duración. Apta para superficies irregulares.',
    specs: [['Ancho','48 mm'],['Largo','100 m/rollo'],['Rollos','6'],['Adhesivo','Acrílico']] },
  { id: 16, name: 'Guantes Nitrilo Negro x100', cat: 'construccion', icon: '🧤', sku: 'CON-004',
    desc: 'Guantes desechables de nitrilo negro, libres de látex y polvo. Alta resistencia química. Tallas S, M, L, XL. Caja de 100 unidades.',
    specs: [['Material','Nitrilo'],['Unidades','100/caja'],['Tallas','S / M / L / XL'],['Uso','Mecánica / Química']] },
  { id: 17, name: 'Casco Seguridad HDPE Blanco', cat: 'construccion', icon: '⛑️', sku: 'CON-005',
    desc: 'Casco de seguridad clase B en HDPE, certificado bajo norma EN 397. Suspensión de 4 puntos ajustable, ranuras para accesorios. Protección dieléctrica.',
    specs: [['Material','HDPE'],['Clase','Clase B / EN 397'],['Suspensión','4 puntos ajustable'],['Color','Blanco']] },
  { id: 18, name: 'Huincha Métrica 5m Stanley', cat: 'construccion', icon: '📏', sku: 'CON-006',
    desc: 'Huincha métrica de acero templado 5 m × 19 mm. Bloqueo automático, gancho magnético, cuerpo ABS reforzado con goma. Lectura dual métrico/imperial.',
    specs: [['Longitud','5 metros'],['Ancho cinta','19 mm'],['Cuerpo','ABS + goma'],['Lectura','Métrico / Imperial']] },
];

window.macsolProducts = products;

function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = products.find(p => p.id === id) || products[0];

  const specsHTML = product.specs.map(([k,v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');

  container.innerHTML = `
    <div class="product-detail-img">${product.icon}</div>
    <div class="product-detail-info">
      <div class="product-meta">
        <span class="badge badge-yellow">${product.cat.charAt(0).toUpperCase()+product.cat.slice(1)}</span>
        <span class="product-sku">SKU: ${product.sku}</span>
      </div>
      <h1>${product.name}</h1>
      <p class="desc">${product.desc}</p>
      <table class="specs-table">
        <tbody>${specsHTML}</tbody>
      </table>
      <div class="product-actions-bar">
        <a href="empresas.html?producto=${encodeURIComponent(product.name)}" class="btn btn-yellow btn-lg">Solicitar cotización</a>
        <a href="productos.html" class="btn btn-outline">← Volver a productos</a>
      </div>
    </div>
  `;
}

function renderProductsGrid() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <a href="producto-detalle.html?id=${p.id}" class="card product-card" data-cat="${p.cat}" style="display:flex;flex-direction:column;">
      <div class="product-img">${p.icon}</div>
      <div class="card-body" style="flex:1;display:flex;flex-direction:column;">
        <p class="product-cat">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</p>
        <h3>${p.name}</h3>
        <div style="flex:1;"></div>
        <div class="product-actions" style="margin-top:12px;">
          <span class="badge badge-yellow">${p.sku}</span>
          <span class="btn btn-sm btn-yellow" style="pointer-events:none;">Ver detalle</span>
        </div>
      </div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductDetail();
  renderProductsGrid();
});

/* Pre-fill quote form from URL */
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const prod = params.get('producto');
  const prodField = document.getElementById('quoteProduct');
  if (prod && prodField) prodField.value = prod;
});
