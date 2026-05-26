const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const productPanel = document.querySelector("[data-product-panel]");
const productButtons = document.querySelectorAll("[data-product]");

const products = {
  entry: {
    image: "assets/door-entry.svg",
    alt: "入户门产品示意",
    label: "当前推荐",
    title: "入户安全门",
    text: "适合住宅、门店与公寓入口，兼顾安全、防护和外观统一。可按洞口尺寸、颜色、锁具与门套要求定制。",
    points: ["支持常规尺寸与非标尺寸", "可选木纹、金属灰、深色系饰面", "适配指纹锁、机械锁等常见方案"]
  },
  interior: {
    image: "assets/door-interior.svg",
    alt: "室内门产品示意",
    label: "家装常用",
    title: "室内静音门",
    text: "适合卧室、书房、办公室和隔断空间，强调整体装修协调、开合手感和日常耐用性。",
    points: ["可搭配多种门套线", "适合现代、简约、木纹等风格", "支持批量颜色统一"]
  },
  fire: {
    image: "assets/door-fire.svg",
    alt: "防火门产品示意",
    label: "工程配套",
    title: "防火门系列",
    text: "面向楼道、机房、仓库、公共区域等场景，便于项目批量采购、分区配送和安装对接。",
    points: ["适合工程清单式交付", "可按楼层和区域整理批次", "支持五金与标识配套"]
  },
  project: {
    image: "assets/scene-project.svg",
    alt: "工程门产品示意",
    label: "批量供应",
    title: "工程门配套",
    text: "适合公寓、酒店、办公楼、学校等项目，重点解决规格统一、批次管理和现场协调。",
    points: ["按项目清单核对型号", "支持统一包装与编号", "便于施工进度衔接"]
  }
};

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function renderProduct(key) {
  const item = products[key];
  if (!item || !productPanel) return;

  productPanel.innerHTML = `
    <img src="${item.image}" alt="${item.alt}">
    <div>
      <p class="panel-label">${item.label}</p>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>
    </div>
  `;
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    productButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    renderProduct(button.dataset.product);
  });
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
