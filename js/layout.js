const iconCap = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m3 12 13-7 13 7-13 7-13-7Z"/><path d="M8 15v7c4.5 3.5 11.5 3.5 16 0v-7M29 12v8"/></svg>';
const iconUser = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>';
const iconMenu = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const iconChevron = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>';

const navLinks = [
  ['الرئيسية', 'index.html'],
  ['الجامعات', 'universities.html'],
  ['التخصصات', 'majors.html'],
  ['المواد الدراسية', 'courses.html']
];

function headerMarkup() {
  const links = navLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  const moreLinks = [['قارن', 'compare.html'], ['المساعد الذكي', 'assistant.html']].map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="index.html" aria-label="منصة ذكاء الطالب، الرئيسية"><span class="brand__mark">${iconCap}</span><span class="brand__copy"><span class="brand__name">منصة ذكاء الطالب</span><span class="brand__tagline">من البحث عن المعلومة … إلى اتخاذ القرار</span></span></a>
    <nav class="main-nav" aria-label="التنقل الرئيسي">${links}<div class="more-menu"><button class="more-toggle" type="button" aria-expanded="false">المزيد ${iconChevron}</button><div class="more-options">${moreLinks}</div></div></nav>
    <div class="header-actions"><a class="button button--primary" href="register.html">إنشاء حساب</a><a class="button button--outline" href="login.html">تسجيل الدخول</a><a class="user-button" href="login.html" aria-label="حساب المستخدم">${iconUser}</a></div>
    <button class="menu-toggle" type="button" aria-label="فتح القائمة" aria-expanded="false" aria-controls="mobile-navigation">${iconMenu}</button>
  </div><nav class="mobile-panel" id="mobile-navigation" aria-label="التنقل للجوال" data-open="false">${links}${moreLinks}<div class="mobile-panel__actions"><a class="button button--primary" href="register.html">إنشاء حساب</a><a class="button button--outline" href="login.html">تسجيل الدخول</a></div></nav></header>`;
}

function footerMarkup() {
  return `<footer class="site-footer"><div class="container footer-inner"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand__mark">${iconCap}</span><span class="brand__copy"><span class="brand__name">منصة ذكاء الطالب</span><span class="brand__tagline">من البحث عن المعلومة … إلى اتخاذ القرار</span></span></a><p>منصتك لاكتشاف الجامعات والتخصصات والمواد الدراسية في سلطنة عُمان.</p></div><nav class="footer-links" aria-label="روابط تذييل الصفحة"><a href="universities.html">الجامعات</a><a href="majors.html">التخصصات</a><a href="courses.html">المواد الدراسية</a><a href="compare.html">قارن الخيارات</a><a href="assistant.html">المساعد الذكي</a></nav></div><div class="container footer-bottom"><p>© <span data-year></span> منصة ذكاء الطالب</p><p>صُنع للطالب العُماني</p></div></footer>`;
}

document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin', headerMarkup());
document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin', footerMarkup());
document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a, .mobile-panel a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
});

const menuButton = document.querySelector('.menu-toggle');
const mobilePanel = document.querySelector('.mobile-panel');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'فتح القائمة' : 'إغلاق القائمة');
  mobilePanel?.setAttribute('data-open', String(!expanded));
});

const moreMenu = document.querySelector('.more-menu');
const moreToggle = document.querySelector('.more-toggle');
moreToggle?.addEventListener('click', () => {
  const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
  moreToggle.setAttribute('aria-expanded', String(!expanded));
  moreMenu?.setAttribute('aria-expanded', String(!expanded));
});
document.addEventListener('click', (event) => {
  if (moreMenu && !moreMenu.contains(event.target)) {
    moreMenu.setAttribute('aria-expanded', 'false');
    moreToggle?.setAttribute('aria-expanded', 'false');
  }
});
