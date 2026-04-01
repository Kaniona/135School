// ============================================================
// SHARED SIDEBAR HTML GENERATOR
// Call this to inject the sidebar into any page
// ============================================================

const SIDEBAR_HTML = `
<div id="sidebar-backdrop" class="sidebar-backdrop"></div>
<aside id="sidebar" class="sidebar">
  <div class="sidebar-brand">
    <div class="brand-logo-placeholder">135</div>
    <div class="brand-info">
      <div class="brand-name">135 Мектеп</div>
      <div class="brand-sub">Басқару жүйесі</div>
    </div>
  </div>

  <div class="sidebar-user">
    <div class="avatar avatar-md" id="sidebar-user-avatar">?</div>
    <div class="user-info">
      <div class="user-name" id="sidebar-user-name">...</div>
      <div class="user-role" id="sidebar-user-role">...</div>
    </div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section-label">Негізгі</div>
    <div class="nav-item active" data-page="dashboard.html" onclick="location.href='dashboard.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
      Басты бет
    </div>

    <div class="nav-section-label" data-roles="super_admin,admin">Пайдаланушылар</div>
    <div class="nav-item" data-page="users.html" onclick="location.href='users.html'" data-roles="super_admin,admin">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
      Пайдаланушылар
    </div>

    <div class="nav-section-label">Оқу үдерісі</div>
    <div class="nav-item" data-page="students.html" onclick="location.href='students.html'" data-roles="super_admin,admin,director,deputy_director,class_teacher,teacher">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
      Оқушылар
    </div>
    <div class="nav-item" data-page="teachers.html" onclick="location.href='teachers.html'" data-roles="super_admin,admin,director,deputy_director">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      Мұғалімдер
    </div>
    <div class="nav-item" data-page="schedule.html" onclick="location.href='schedule.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      Сабақ кестесі
    </div>
    <div class="nav-item" data-page="homework.html" onclick="location.href='homework.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
      Үй тапсырмасы
    </div>
    <div class="nav-item" data-page="tests.html" onclick="location.href='tests.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
      Тесттер
    </div>

    <div class="nav-section-label">Мектеп өмірі</div>
    <div class="nav-item" data-page="news.html" onclick="location.href='news.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
      Жаңалықтар
    </div>
    <div class="nav-item" data-page="events.html" onclick="location.href='events.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
      Іс-шаралар
    </div>
    <div class="nav-item" data-page="gallery.html" onclick="location.href='gallery.html'" data-roles="all">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      Галерея
    </div>
    <div class="nav-item" data-page="files.html" onclick="location.href='files.html'" data-roles="super_admin,admin,teacher,class_teacher,director,deputy_director">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
      Файлдар
    </div>
    <div class="nav-item" data-page="ratings.html" onclick="location.href='ratings.html'" data-roles="super_admin,admin,director,deputy_director">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
      Рейтинг
    </div>
  </nav>

  <div class="sidebar-footer">
    <button class="nav-item w-full" onclick="logout()" style="color:var(--error)">
      <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      Шығу
    </button>
  </div>
</aside>`;

function injectSidebar() {
  const app = document.getElementById('app');
  if (!app) return;
  app.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
}

// ============================================================
// PAGE HEADER HTML
// ============================================================
function pageHeader(title, actions = '') {
  return `
  <header class="page-header">
    <button class="hamburger-btn btn-ghost" id="hamburger-btn">
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
    <h1 class="ph-title">${title}</h1>
    <div class="ph-actions">${actions}</div>
  </header>`;
}

// ============================================================
// SESSION & AUTH
// ============================================================
const ROLE_LABELS = {
  super_admin:'Бас Әкімші',admin:'Әкімші',director:'Директор',
  deputy_director:'Директор орынбасары',class_teacher:'Сынып жетекші',
  teacher:'Мұғалім',student:'Оқушы'
};

const ROLE_BADGE_CLASS = {
  super_admin:'badge-purple',admin:'badge-blue',director:'badge-green',
  deputy_director:'badge-teal',class_teacher:'badge-orange',teacher:'badge-yellow',student:'badge-gray'
};

const CLASSES = ['7А','7В','8А','8В','9','10','11'];
const SUBJECTS = ['Математика','Физика','Химия','Биология','Қазақ тілі','Қазақ әдебиеті','Орыс тілі','Орыс әдебиеті','Ағылшын тілі','Тарих','География','Қоғамтану','Информатика','Дене тәрбиесі','Музыка','Бейнелеу өнері','Технология'];
const DAYS = ['Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма'];
const LESSON_TIMES = [
  {n:1,time:'08:00-08:45'},{n:2,time:'08:55-09:40'},{n:3,time:'10:00-10:45'},
  {n:4,time:'10:55-11:40'},{n:5,time:'12:00-12:45'},{n:6,time:'12:55-13:40'},
  {n:7,time:'14:00-14:45'},{n:8,time:'14:55-15:40'}
];

let currentUser = null;

function initApp() {
  currentUser = JSON.parse(localStorage.getItem('demoSession') || 'null');
  if (!currentUser) { window.location.href = 'index.html'; return false; }
  return true;
}

function hasRole(r) { return (currentUser?.roles || []).includes(r); }
function hasAnyRole(arr) { return arr.some(r => hasRole(r)); }
function isAdmin() { return hasAnyRole(['super_admin','admin']); }
function canManageSchedule() { return hasAnyRole(['super_admin','admin','director','deputy_director']); }
function canTeach() { return hasAnyRole(['super_admin','teacher','class_teacher']); }
function canPublishNews() { return hasAnyRole(['super_admin','admin','director']); }
function canRateTeacher() { return hasAnyRole(['super_admin','director','deputy_director']); }
function isStudent() { return hasRole('student'); }

function buildSidebar() {
  if (!currentUser) return;
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  const avatarEl = document.getElementById('sidebar-user-avatar');
  if(nameEl) nameEl.textContent = currentUser.name || 'Пайдаланушы';
  if(roleEl) roleEl.textContent = (currentUser.roles||[]).map(r=>ROLE_LABELS[r]||r).join(', ');
  if(avatarEl) avatarEl.textContent = getInitials(currentUser.name);
  document.querySelectorAll('[data-roles]').forEach(el=>{
    const roles = el.dataset.roles.split(',').map(r=>r.trim());
    el.style.display = (roles.includes('all') || roles.some(r=>hasRole(r))) ? '' : 'none';
  });
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(item=>{
    item.classList.toggle('active', item.dataset.page === page);
  });
}

function initSidebar() {
  const hb = document.getElementById('hamburger-btn');
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebar-backdrop');
  if(!hb||!sb) return;
  hb.onclick = ()=>{ sb.classList.toggle('open'); bd?.classList.toggle('open'); };
  bd?.addEventListener('click',()=>{ sb.classList.remove('open'); bd.classList.remove('open'); });
}

function logout() {
  localStorage.removeItem('demoSession');
  window.location.href = 'index.html';
}

// ============================================================
// DEMO DB
// ============================================================
const demoDB = {
  get(col) { try { return JSON.parse(localStorage.getItem('db_'+col)||'[]'); } catch(e) { return []; } },
  set(col,data) { localStorage.setItem('db_'+col,JSON.stringify(data)); },
  add(col,item) {
    const data = this.get(col);
    item.id = item.id || Date.now().toString(36)+Math.random().toString(36).slice(2);
    item.createdAt = item.createdAt || new Date().toISOString();
    data.unshift(item);
    this.set(col,data);
    return item;
  },
  update(col,id,updates) {
    const data = this.get(col);
    const idx = data.findIndex(i=>String(i.id)===String(id));
    if(idx>=0) { data[idx]={...data[idx],...updates}; this.set(col,data); return data[idx]; }
    return null;
  },
  delete(col,id) { this.set(col,this.get(col).filter(i=>String(i.id)!==String(id))); },
  find(col,id) { return this.get(col).find(i=>String(i.id)===String(id)); }
};

// ============================================================
// UTILITIES
// ============================================================
function getInitials(name) {
  if(!name) return '?';
  return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
}

function formatDate(ts) {
  if(!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('ru-RU',{day:'numeric',month:'short',year:'numeric'});
}
function formatDateTime(ts) {
  if(!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString('ru-RU',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
}
function daysUntil(ts) {
  if(!ts) return 0;
  return Math.ceil((new Date(ts)-Date.now())/86400000);
}

function showToast(msg, type='info') {
  let c = document.getElementById('toast-container');
  if(!c) { c=document.createElement('div'); c.id='toast-container'; document.body.appendChild(c); }
  const icons = {success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{ t.style.animation='toast-out .3s ease forwards'; setTimeout(()=>t.remove(),350); },3500);
}

function showConfirm(title, text, onConfirm) {
  let overlay = document.getElementById('confirm-overlay');
  if(!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `<div class="confirm-box"><div class="confirm-icon">⚠️</div><div class="confirm-title" id="c-title"></div><div class="confirm-text" id="c-text"></div><div class="confirm-actions"><button class="btn btn-secondary" onclick="document.getElementById('confirm-overlay').classList.remove('open')">Бас тарту</button><button class="btn btn-danger" id="c-ok">Иә, жою</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.onclick = e => { if(e.target===overlay) overlay.classList.remove('open'); };
  }
  document.getElementById('c-title').textContent = title;
  document.getElementById('c-text').textContent = text;
  overlay.classList.add('open');
  document.getElementById('c-ok').onclick = ()=>{ overlay.classList.remove('open'); onConfirm(); };
}

function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', e=>{ if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('open'); });

function roleBadge(role) {
  return `<span class="badge ${ROLE_BADGE_CLASS[role]||'badge-gray'}">${ROLE_LABELS[role]||role}</span>`;
}

function avatarDiv(name, photoURL, size='md') {
  if(photoURL) return `<div class="avatar avatar-${size}"><img src="${photoURL}" onerror="this.parentNode.textContent='${getInitials(name)}'"></div>`;
  return `<div class="avatar avatar-${size}">${getInitials(name)}</div>`;
}

function setLoading(btn, loading) {
  if(loading) { btn.disabled=true; btn.dataset.o=btn.innerHTML; btn.innerHTML='<span style="width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;display:inline-block;animation:spin .7s linear infinite"></span>'; }
  else { btn.disabled=false; btn.innerHTML=btn.dataset.o; }
}

async function uploadFileToStorage(file, path) {
  return new Promise((resolve, reject) => {
    if(!file.type.startsWith('image/')) {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = reject;
       reader.readAsDataURL(file);
       return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const max = 400; // Resize for storage efficiency
        if(width > max || height > max) {
            if(width > height) { height = Math.round((height * max) / width); width = max; }
            else { width = Math.round((width * max) / height); height = max; }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ============================================================
// ANIMATIONS & EFFECTS (Premium Stagger)
// ============================================================
function applyStagger(el, index) {
  if(!el.classList.contains('anim-stagger')) {
    el.classList.add('anim-stagger');
    const delay = Math.min(index * 0.05, 0.6);
    el.style.animationDelay = `${delay}s`;
  }
}

const uiObserver = new MutationObserver((mutations) => {
  let newElements = [];
  mutations.forEach(m => {
    m.addedNodes.forEach(n => {
      if(n.nodeType === 1) { // ELEMENT_NODE
        const selector = '.card, .stat-card, .table-wrapper, .dropzone, .news-card, .gallery-item, .question-card, .nav-item';
        if(n.matches && n.matches(selector)) newElements.push(n);
        if(n.querySelectorAll) {
          newElements.push(...Array.from(n.querySelectorAll(selector)));
        }
      }
    });
  });
  
  if(newElements.length > 0) {
    newElements = [...new Set(newElements)]; // deduplicate
    newElements.forEach((el, i) => applyStagger(el, i));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Initial pass
  const selector = '.card, .stat-card, .table-wrapper, .dropzone, .news-card, .gallery-item, .question-card, .nav-item';
  const animateTargets = document.querySelectorAll(selector);
  animateTargets.forEach((el, i) => applyStagger(el, i));
  
  // Observe body for future dynamic additions
  uiObserver.observe(document.body, { childList: true, subtree: true });
});

