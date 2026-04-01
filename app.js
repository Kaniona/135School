// ============================================================
// FIREBASE CONFIG - Replace with your actual Firebase config
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDEMO_REPLACE_WITH_YOUR_KEY",
  authDomain: "school-135.firebaseapp.com",
  projectId: "school-135",
  storageBucket: "school-135.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567890"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// ============================================================
// ROLE CONSTANTS
// ============================================================
const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  DIRECTOR: "director",
  DEPUTY_DIRECTOR: "deputy_director",
  CLASS_TEACHER: "class_teacher",
  TEACHER: "teacher",
  STUDENT: "student"
};

const ROLE_LABELS = {
  super_admin: "Бас Әкімші",
  admin: "Әкімші",
  director: "Директор",
  deputy_director: "Директор орынбасары",
  class_teacher: "Сынып жетекші",
  teacher: "Мұғалім",
  student: "Оқушы"
};

const ROLE_BADGE_CLASS = {
  super_admin: "badge-purple",
  admin: "badge-blue",
  director: "badge-green",
  deputy_director: "badge-teal",
  class_teacher: "badge-orange",
  teacher: "badge-yellow",
  student: "badge-gray"
};

const CLASSES = ['7А', '7В', '8А', '8В', '9', '10', '11'];
const SUBJECTS = ['Математика', 'Физика', 'Химия', 'Биология', 'Қазақ тілі', 'Қазақ әдебиеті', 'Орыс тілі', 'Орыс әдебиеті', 'Ағылшын тілі', 'Тарих', 'География', 'Қоғамтану', 'Информатика', 'Дене тәрбиесі', 'Музыка', 'Бейнелеу өнері', 'Технология'];

const LESSON_TIMES = [
  { n: 1, time: '08:00 - 08:45' },
  { n: 2, time: '08:55 - 09:40' },
  { n: 3, time: '10:00 - 10:45' },
  { n: 4, time: '10:55 - 11:40' },
  { n: 5, time: '12:00 - 12:45' },
  { n: 6, time: '12:55 - 13:40' },
  { n: 7, time: '14:00 - 14:45' },
  { n: 8, time: '14:55 - 15:40' }
];

const DAYS = ['Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма'];

// ============================================================
// GLOBAL STATE
// ============================================================
let currentUser = null;
let currentUserData = null;

// ============================================================
// AUTH HELPERS
// ============================================================
function hasRole(role) {
  if (!currentUserData) return false;
  return (currentUserData.roles || []).includes(role);
}

function hasAnyRole(roles) {
  if (!currentUserData) return false;
  return roles.some(r => hasRole(r));
}

function isAdmin() {
  return hasAnyRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]);
}

function canManageSchedule() {
  return hasAnyRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DIRECTOR, ROLES.DEPUTY_DIRECTOR]);
}

function canTeach() {
  return hasAnyRole([ROLES.SUPER_ADMIN, ROLES.TEACHER, ROLES.CLASS_TEACHER]);
}

function canPublishNews() {
  return hasAnyRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DIRECTOR]);
}

function canRateTeacher() {
  return hasAnyRole([ROLES.SUPER_ADMIN, ROLES.DIRECTOR, ROLES.DEPUTY_DIRECTOR]);
}

// ============================================================
// TOAST UTILITY
// ============================================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hidden');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ============================================================
// CONFIRM DIALOG
// ============================================================
function showConfirm(title, text, onConfirm) {
  let overlay = document.getElementById('confirm-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-box">
        <div class="confirm-icon">⚠️</div>
        <div class="confirm-title" id="confirm-title"></div>
        <div class="confirm-text" id="confirm-text"></div>
        <div class="confirm-actions">
          <button class="btn btn-secondary" id="confirm-cancel">Бас тарту</button>
          <button class="btn btn-danger" id="confirm-ok">Иә, жою</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-text').textContent = text;
  overlay.classList.add('open');
  document.getElementById('confirm-cancel').onclick = () => overlay.classList.remove('open');
  document.getElementById('confirm-ok').onclick = () => { overlay.classList.remove('open'); onConfirm(); };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('open'); };
}

// ============================================================
// UPLOAD FILE TO FIREBASE STORAGE
// ============================================================
async function uploadFile(file, path) {
  const ref = storage.ref(path);
  const snap = await ref.put(file);
  return await snap.ref.getDownloadURL();
}

// ============================================================
// FORMAT DATE
// ============================================================
function formatDate(ts) {
  if (!ts) return '';
  let d;
  if (ts.toDate) d = ts.toDate();
  else if (ts instanceof Date) d = ts;
  else d = new Date(ts);
  return d.toLocaleDateString('kk-KZ', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(ts) {
  if (!ts) return '';
  let d;
  if (ts.toDate) d = ts.toDate();
  else if (ts instanceof Date) d = ts;
  else d = new Date(ts);
  return d.toLocaleString('kk-KZ', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function daysUntil(ts) {
  if (!ts) return 0;
  let d;
  if (ts.toDate) d = ts.toDate();
  else if (ts instanceof Date) d = ts;
  else d = new Date(ts);
  const diff = Math.ceil((d - Date.now()) / 86400000);
  return diff;
}

// ============================================================
// AVATAR INITIALS
// ============================================================
function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function avatarHTML(user, size = 'md') {
  if (user && user.photoURL) {
    return `<div class="avatar avatar-${size}"><img src="${user.photoURL}" alt="${user.name || ''}" onerror="this.parentNode.innerHTML='${getInitials(user.name)}'"></div>`;
  }
  return `<div class="avatar avatar-${size}">${getInitials(user ? user.name : '')}</div>`;
}

// ============================================================
// ROLE BADGE
// ============================================================
function roleBadge(role) {
  return `<span class="badge ${ROLE_BADGE_CLASS[role] || 'badge-gray'}">${ROLE_LABELS[role] || role}</span>`;
}

// ============================================================
// MODAL HELPERS
// ============================================================
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
}

// Initialize modal close on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeAllModals();
});

// ============================================================
// LOADING STATE
// ============================================================
function setLoading(el, loading) {
  if (loading) {
    el.disabled = true;
    el.dataset.origText = el.innerHTML;
    el.innerHTML = '<span class="loader loader-sm"></span>';
  } else {
    el.disabled = false;
    el.innerHTML = el.dataset.origText || el.innerHTML;
  }
}

// ============================================================
// PASSWORD TOGGLE
// ============================================================
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-pw-toggle]');
  if (!t) return;
  const input = document.getElementById(t.dataset.pwToggle);
  if (!input) return;
  if (input.type === 'password') { input.type = 'text'; t.textContent = '🙈'; }
  else { input.type = 'password'; t.textContent = '👁️'; }
});

// ============================================================
// SIDEBAR TOGGLE (mobile)
// ============================================================
function initSidebar() {
  const hamburger = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!hamburger || !sidebar) return;
  hamburger.onclick = () => {
    sidebar.classList.toggle('open');
    backdrop?.classList.toggle('open');
  };
  backdrop?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
  });
  // Close sidebar on nav item click (mobile)
  sidebar.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        sidebar.classList.remove('open');
        backdrop?.classList.remove('open');
      }
    });
  });
}

// ============================================================
// LOAD USER DATA & BUILD SIDEBAR
// ============================================================
async function loadCurrentUser() {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;
  const doc = await db.collection('users').doc(uid).get();
  if (doc.exists) {
    currentUserData = { id: uid, ...doc.data() };
  }
  return currentUserData;
}

function buildSidebar() {
  if (!currentUserData) return;
  // User info
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  const avatarEl = document.getElementById('sidebar-user-avatar');
  if (nameEl) nameEl.textContent = currentUserData.name || 'Пайдаланушы';
  if (roleEl) roleEl.textContent = (currentUserData.roles || []).map(r => ROLE_LABELS[r] || r).join(', ');
  if (avatarEl) {
    if (currentUserData.photoURL) {
      avatarEl.innerHTML = `<img src="${currentUserData.photoURL}" onerror="this.parentNode.textContent='${getInitials(currentUserData.name)}'">`;
    } else {
      avatarEl.textContent = getInitials(currentUserData.name);
    }
  }
  // Nav items visibility
  document.querySelectorAll('[data-roles]').forEach(el => {
    const roles = el.dataset.roles.split(',').map(r => r.trim());
    if (roles.includes('all') || roles.some(r => hasRole(r))) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
  // Active nav
  const path = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    if (item.dataset.page === path) item.classList.add('active');
    else item.classList.remove('active');
  });
}

// ============================================================
// LOGOUT
// ============================================================
async function logout() {
  await auth.signOut();
  window.location.href = 'index.html';
}

// ============================================================
// AUTH GUARD (call at top of each protected page)
// ============================================================
function authGuard(callback) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    currentUser = user;
    await loadCurrentUser();
    buildSidebar();
    initSidebar();
    if (callback) callback();
  });
}

// ============================================================
// DEMO MODE (localStorage fallback when Firebase not configured)
// ============================================================
const DEMO_MODE = true; // Set to false when real Firebase is configured

const DEMO_USERS = {
  "admin001": {
    id: "admin001", name: "Бейбіт Жақсыбеков", phone: "+77001234567",
    roles: ["super_admin"], isActive: true, createdAt: new Date('2024-01-01'),
    password: "admin123"
  },
  "admin002": {
    id: "admin002", name: "Айгүл Нұрмағамбетова", phone: "+77001234568",
    roles: ["admin"], isActive: true, createdAt: new Date('2024-01-15')
  },
  "dir001": {
    id: "dir001", name: "Серік Байжанов", phone: "+77001234569",
    roles: ["director"], isActive: true, createdAt: new Date('2024-01-01')
  },
  "dep001": {
    id: "dep001", name: "Гүлнара Сейткали", phone: "+77001234570",
    roles: ["deputy_director"], isActive: true, createdAt: new Date('2024-01-01')
  },
  "teach001": {
    id: "teach001", name: "Асқар Жұмабаев", phone: "+77001234571",
    roles: ["teacher", "class_teacher"], isActive: true,
    subjects: ["Математика"], classId: "10", stars: 4, starCount: 12
  },
  "teach002": {
    id: "teach002", name: "Лейла Серікова", phone: "+77001234572",
    roles: ["teacher"], isActive: true,
    subjects: ["Физика", "Информатика"], stars: 3, starCount: 8
  },
  "student001": {
    id: "student001", name: "Алия Нұрланова", phone: "+77001234573",
    roles: ["student"], isActive: true,
    classId: "10", firstName: "Алия", lastName: "Нұрланова"
  }
};

let demoSession = JSON.parse(localStorage.getItem('demoSession') || 'null');

// Override auth functions in demo mode
if (DEMO_MODE) {
  // Patch authGuard for demo
  window.authGuard = function(callback) {
    demoSession = JSON.parse(localStorage.getItem('demoSession') || 'null');
    if (!demoSession) {
      window.location.href = 'index.html';
      return;
    }
    currentUserData = demoSession;
    buildSidebar();
    initSidebar();
    if (callback) callback();
  };

  window.logout = function() {
    localStorage.removeItem('demoSession');
    window.location.href = 'index.html';
  };

  // Demo DB (localStorage)
  window.demoDB = {
    get(col) {
      return JSON.parse(localStorage.getItem('db_' + col) || '[]');
    },
    set(col, data) {
      localStorage.setItem('db_' + col, JSON.stringify(data));
    },
    add(col, item) {
      const data = this.get(col);
      item.id = item.id || Date.now().toString();
      item.createdAt = item.createdAt || new Date().toISOString();
      data.push(item);
      this.set(col, data);
      return item;
    },
    update(col, id, updates) {
      const data = this.get(col);
      const idx = data.findIndex(i => i.id == id);
      if (idx >= 0) { data[idx] = { ...data[idx], ...updates }; this.set(col, data); }
    },
    delete(col, id) {
      const data = this.get(col).filter(i => i.id != id);
      this.set(col, data);
    },
    find(col, id) {
      return this.get(col).find(i => i.id == id);
    }
  };

  // Seed demo data if first time
  if (!localStorage.getItem('db_seeded')) {
    const users = Object.values(DEMO_USERS);
    localStorage.setItem('db_users', JSON.stringify(users));

    const students = [
      { id: 's1', firstName: 'Алия', lastName: 'Нұрланова', classId: '10', birthDate: '2008-03-15', parentName: 'Нұрлан Байжанов', contactPhone: '+77001111111', createdAt: '2024-09-01', achievements: ['🥇', '📚'] },
      { id: 's2', firstName: 'Ерлан', lastName: 'Жақсыбеков', classId: '10', birthDate: '2008-07-22', parentName: 'Жақсыбек Ерланов', contactPhone: '+77002222222', createdAt: '2024-09-01', achievements: ['⚽'] },
      { id: 's3', firstName: 'Сәуле', lastName: 'Мың', classId: '11', birthDate: '2007-11-05', parentName: 'Мың Сәуле', contactPhone: '+77003333333', createdAt: '2024-09-01', achievements: [] },
      { id: 's4', firstName: 'Дамир', lastName: 'Серіков', classId: '9', birthDate: '2009-01-12', parentName: 'Серіков Дамир', contactPhone: '+77004444444', createdAt: '2024-09-01', achievements: ['🏆'] },
      { id: 's5', firstName: 'Айдана', lastName: 'Болатова', classId: '8А', birthDate: '2010-05-20', parentName: 'Болат Айдана', contactPhone: '+77005555555', createdAt: '2024-09-01', achievements: [] },
      { id: 's6', firstName: 'Нұрас', lastName: 'Қасымов', classId: '7А', birthDate: '2011-09-08', parentName: 'Қасым Нұрас', contactPhone: '+77006666666', createdAt: '2024-09-01', achievements: ['📖'] },
    ];
    localStorage.setItem('db_students', JSON.stringify(students));

    const teachers = [
      { id: 'teach001', userId: 'teach001', name: 'Асқар Жұмабаев', subjects: ['Математика'], classId: '10', roles: ['teacher','class_teacher'], stars: 4, starCount: 12, totalStars: 48 },
      { id: 'teach002', userId: 'teach002', name: 'Лейла Серікова', subjects: ['Физика', 'Информатика'], roles: ['teacher'], stars: 3, starCount: 8, totalStars: 24 },
      { id: 'teach003', userId: 'teach003', name: 'Зарина Ахметова', subjects: ['Қазақ тілі', 'Қазақ әдебиеті'], classId: '8А', roles: ['teacher','class_teacher'], stars: 5, starCount: 20, totalStars: 100 },
    ];
    localStorage.setItem('db_teachers', JSON.stringify(teachers));

    const news = [
      { id: 'n1', title: 'Мектебімізде олимпиада өтті!', content: 'Биылғы жылы мектебімізде республикалық олимпиаданың мектеп кезеңі сәтті өтті. Барлық қатысушыларға алғыс!', coverURL: '', authorId: 'admin001', authorName: 'Бейбіт Жақсыбеков', status: 'published', likes: [], comments: [], createdAt: new Date('2024-11-20').toISOString() },
      { id: 'n2', title: 'Жаңа оқу жылы басталды', content: 'Қадірлі оқушылар мен ата-аналар! Жаңа оқу жылын ыстық жүрекпен құттықтаймыз!', coverURL: '', authorId: 'dir001', authorName: 'Серік Байжанов', status: 'published', likes: [], comments: [], createdAt: new Date('2024-09-02').toISOString() },
    ];
    localStorage.setItem('db_news', JSON.stringify(news));

    const events = [
      { id: 'e1', title: 'Наурыз мейрамы', description: 'Ұлттық мерекені бірге атап өтейік!', date: '2025-03-22', coverURL: '', category: 'Мереке', createdBy: 'admin001', createdAt: new Date().toISOString() },
    ];
    localStorage.setItem('db_events', JSON.stringify(events));

    const homework = [
      { id: 'hw1', subject: 'Математика', title: '§15 есептер', description: '1-10 есептерді шешіңіздер', teacherId: 'teach001', classIds: ['10'], deadline: new Date(Date.now() + 86400000 * 3).toISOString(), createdAt: new Date().toISOString() },
      { id: 'hw2', subject: 'Физика', title: 'Лабораториялық жұмыс', description: 'Есеп беру дайындаңыз', teacherId: 'teach002', classIds: ['10', '11'], deadline: new Date(Date.now() + 86400000).toISOString(), createdAt: new Date().toISOString() },
    ];
    localStorage.setItem('db_homework', JSON.stringify(homework));

    const tests = [
      { id: 't1', title: 'Алгебра тест №1', subject: 'Математика', classIds: ['10'], teacherId: 'teach001', timeLimit: 30, isActive: true, createdAt: new Date().toISOString(),
        questions: [
          { id: 'q1', text: '2 + 2 = ?', options: ['3', '4', '5', '6'], correct: 1, score: 1 },
          { id: 'q2', text: 'x² = 9, x = ?', options: ['2', '3', '4', '5'], correct: 1, score: 1 },
        ]
      },
    ];
    localStorage.setItem('db_tests', JSON.stringify(tests));

    const schedule = [];
    const sampleSubjects = ['Математика', 'Физика', 'Қазақ тілі', 'Ағылшын тілі', 'Тарих'];
    CLASSES.forEach(cls => {
      for (let day = 1; day <= 5; day++) {
        for (let lesson = 1; lesson <= 5; lesson++) {
          schedule.push({
            id: `sch_${cls}_${day}_${lesson}`,
            classId: cls, dayOfWeek: day, lessonNumber: lesson,
            subject: sampleSubjects[(day + lesson) % sampleSubjects.length],
            teacherId: 'teach001', teacherName: 'Асқар Жұмабаев',
            room: String(100 + day * 10 + lesson)
          });
        }
      }
    });
    localStorage.setItem('db_schedule', JSON.stringify(schedule));

    localStorage.setItem('db_gallery', JSON.stringify([]));
    localStorage.setItem('db_files', JSON.stringify([]));
    localStorage.setItem('db_seeded', '1');
  }
}
