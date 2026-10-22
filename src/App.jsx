import { useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./index.css";

const CATEGORIES = ["Учёба", "Работа", "Программирование", "Личное", "Отдых", "Путешествия"];
const PRIORITIES = ["Высокий", "Средний", "Низкий"];
const NAV = [
  ["/", "dashboard", "▦"],
  ["/tasks", "tasks", "✓"],
  ["/day", "day", "◷"],
  ["/calendar", "calendar", "▦"],
  ["/focus", "focus", "◉"],
  ["/habits", "habits", "✳"],
  ["/analytics", "analytics", "▥"],
  ["/notes", "notes", "▤"],
  ["/settings", "settings", "⚙"],
];

const STRINGS = {
  ru: {
    workspace: "РАБОЧЕЕ ПРОСТРАНСТВО",
    dashboard: "Главная",
    tasks: "Задачи",
    day: "Мой день",
    calendar: "Календарь",
    focus: "Фокус",
    habits: "Привычки",
    analytics: "Аналитика",
    notes: "Заметки",
    settings: "Настройки",
    addTask: "Новая задача",
    today: "Сегодня",
    total: "Всего задач",
    active: "Активные",
    done: "Выполнено",
    overdue: "Просроченные",
    progress: "Прогресс",
    todayTasks: "Задачи на сегодня",
    upcoming: "Ближайшие дела",
    seeAll: "Все задачи",
    noTasks: "Задач пока нет",
    noTasksHint: "Добавьте первую задачу, чтобы спланировать свой день.",
    search: "Поиск задач...",
    all: "Все задачи",
    filterActive: "Активные",
    filterDone: "Выполненные",
    filterOverdue: "Просроченные",
    filterToday: "На сегодня",
    allCategories: "Все категории",
    allPriorities: "Все приоритеты",
    sortDate: "По дате",
    sortPriority: "По приоритету",
    sortNewest: "Сначала новые",
    title: "Название",
    description: "Описание",
    date: "Дата",
    time: "Время",
    category: "Категория",
    priority: "Приоритет",
    save: "Сохранить",
    cancel: "Отмена",
    edit: "Редактировать",
    delete: "Удалить",
    createTask: "Создать задачу",
    editTask: "Редактировать задачу",
    chooseDate: "Выберите дату",
    noDayTasks: "На этот день задач нет",
    complete: "Выполнено",
    remaining: "Осталось",
    start: "Запустить",
    pause: "Пауза",
    resume: "Продолжить",
    reset: "Сбросить",
    work: "Работа",
    break: "Отдых",
    sessions: "Завершённые сессии",
    focusTask: "Задача для фокуса",
    noFocusTask: "Без выбранной задачи",
    newHabit: "Название привычки",
    addHabit: "Добавить привычку",
    habitHistory: "История за 7 дней",
    streak: "дней подряд",
    noHabits: "Пока нет привычек",
    weekly: "Выполненные задачи за неделю",
    byCategory: "Задачи по категориям",
    newNote: "Новая заметка",
    noteTitle: "Заголовок",
    noteBody: "Текст заметки",
    noNotes: "Заметок пока нет",
    theme: "Тема оформления",
    light: "Светлая",
    dark: "Тёмная",
    language: "Язык",
    russian: "Русский",
    english: "Английский",
    german: "Немецкий",
    kazakh: "Казахский",
    focusLength: "Рабочий интервал (минуты)",
    breakLength: "Перерыв (минуты)",
    profile: "Профиль",
    profileName: "Ваше имя",
    saved: "Настройки сохраняются автоматически",
    notFound: "Страница не найдена",
    notFoundHint: "Кажется, такой страницы не существует.",
    home: "На главную",
    greeting: "Добро пожаловать",
    greetingText: "Спланируйте день и двигайтесь к своим целям.",
    emptySearch: "Ничего не найдено",
    create: "Создать",
    month: "Месяц",
    completedToday: "Сегодня выполнено",
    priorityHigh: "Высокий",
    priorityMedium: "Средний",
    priorityLow: "Низкий",
    categoryStudy: "Учёба",
    categoryWork: "Работа",
    categoryCode: "Программирование",
    categoryPersonal: "Личное",
    categoryRest: "Отдых",
    categoryTravel: "Путешествия",
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    todayLabel: "Сегодня",
    alarm: "Будильник",
    alarmAlert: "Время выполнить задачу",
    dismissAlarm: "Остановить будильник",
    enableNotifications: "Разрешить уведомления",
    notificationsEnabled: "Уведомления разрешены",
    notificationsBlocked: "Уведомления заблокированы в браузере",
    alarmHelp: "Напоминание сработает в указанное время, пока TaskFlow открыт.",
    goals: "Мои цели",
    challenges: "Челленджи",
    study: "Учёба",
    inspirationBoard: "Доска вдохновения",
    yourInspiration: "Твоя мысль на сегодня",
    inspirationPlaceholder: "Напиши свою мотивирующую фразу...",
    saveInspiration: "Добавить фразу",
    editInspiration: "Изменить",
    saveChanges: "Сохранить",
    cancelEdit: "Отмена",
    noInspiration: "Запиши мысль, которая будет поддерживать тебя сегодня.",
    addGoal: "Добавить цель",
    addChallenge: "Создать челлендж",
    addStudy: "Добавить тему",
    goalPlaceholder: "Например: прочитать 12 книг",
    challengePlaceholder: "Например: гулять каждый день",
    studyPlaceholder: "Например: выучить английский",
    descriptionPlaceholder: "Описание (необязательно)",
    challengeTarget: "Цель челленджа",
    progressLabel: "Прогресс",
    increaseProgress: "Увеличить прогресс",
    decreaseProgress: "Уменьшить прогресс",
    emptyGoals: "Добавьте личную цель, к которой хотите прийти.",
    emptyChallenges: "Создайте свой челлендж и отмечайте каждый шаг.",
    emptyStudy: "Добавьте тему или навык, который хотите изучить.",
    focusSprint: "Фокус-сессии",
    keepGoing: "Двигайся дальше",
  },
  en: {
    workspace: "WORKSPACE",
    dashboard: "Dashboard",
    tasks: "Tasks",
    day: "My Day",
    calendar: "Calendar",
    focus: "Focus",
    habits: "Habits",
    analytics: "Analytics",
    notes: "Notes",
    settings: "Settings",
    addTask: "New task",
    today: "Today",
    total: "Total tasks",
    active: "Active",
    done: "Completed",
    overdue: "Overdue",
    progress: "Progress",
    todayTasks: "Today's tasks",
    upcoming: "Coming up",
    seeAll: "All tasks",
    noTasks: "No tasks yet",
    noTasksHint: "Add your first task to plan your day.",
    search: "Search tasks...",
    all: "All tasks",
    filterActive: "Active",
    filterDone: "Completed",
    filterOverdue: "Overdue",
    filterToday: "Today",
    allCategories: "All categories",
    allPriorities: "All priorities",
    sortDate: "By date",
    sortPriority: "By priority",
    sortNewest: "Newest first",
    title: "Title",
    description: "Description",
    date: "Date",
    time: "Time",
    category: "Category",
    priority: "Priority",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    createTask: "Create task",
    editTask: "Edit task",
    chooseDate: "Choose date",
    noDayTasks: "No tasks for this day",
    complete: "Completed",
    remaining: "Remaining",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    work: "Focus",
    break: "Break",
    sessions: "Completed sessions",
    focusTask: "Focus task",
    noFocusTask: "No task selected",
    newHabit: "Habit name",
    addHabit: "Add habit",
    habitHistory: "7-day history",
    streak: "day streak",
    noHabits: "No habits yet",
    weekly: "Completed tasks this week",
    byCategory: "Tasks by category",
    newNote: "New note",
    noteTitle: "Title",
    noteBody: "Note text",
    noNotes: "No notes yet",
    theme: "Appearance",
    light: "Light",
    dark: "Dark",
    language: "Language",
    russian: "Russian",
    english: "English",
    german: "German",
    kazakh: "Kazakh",
    focusLength: "Focus interval (minutes)",
    breakLength: "Break length (minutes)",
    profile: "Profile",
    profileName: "Your name",
    saved: "Settings save automatically",
    notFound: "Page not found",
    notFoundHint: "This page doesn't seem to exist.",
    home: "Go to dashboard",
    greeting: "Welcome",
    greetingText: "Plan your day and move closer to your goals.",
    emptySearch: "No results found",
    create: "Create",
    month: "Month",
    completedToday: "Completed today",
    priorityHigh: "High",
    priorityMedium: "Medium",
    priorityLow: "Low",
    categoryStudy: "Study",
    categoryWork: "Work",
    categoryCode: "Programming",
    categoryPersonal: "Personal",
    categoryRest: "Rest",
    categoryTravel: "Travel",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    todayLabel: "Today",
    alarm: "Alarm",
    alarmAlert: "It's time for this task",
    dismissAlarm: "Stop alarm",
    enableNotifications: "Enable notifications",
    notificationsEnabled: "Notifications are enabled",
    notificationsBlocked: "Notifications are blocked by the browser",
    alarmHelp: "The reminder will ring at the scheduled time while TaskFlow is open.",
    goals: "My goals",
    challenges: "Challenges",
    study: "Study",
    inspirationBoard: "Inspiration board",
    yourInspiration: "Your thought for today",
    inspirationPlaceholder: "Write your own motivational note...",
    saveInspiration: "Add note",
    editInspiration: "Edit",
    saveChanges: "Save changes",
    cancelEdit: "Cancel",
    noInspiration: "Write a thought that will encourage you today.",
    addGoal: "Add a goal",
    addChallenge: "Create a challenge",
    addStudy: "Add a study topic",
    goalPlaceholder: "For example: read 12 books",
    challengePlaceholder: "For example: walk every day",
    studyPlaceholder: "For example: learn English",
    descriptionPlaceholder: "Description (optional)",
    challengeTarget: "Challenge target",
    progressLabel: "Progress",
    increaseProgress: "Increase progress",
    decreaseProgress: "Decrease progress",
    emptyGoals: "Add a personal goal you want to achieve.",
    emptyChallenges: "Create your own challenge and track each step.",
    emptyStudy: "Add a topic or skill you want to learn.",
    focusSprint: "Focus sprint",
    keepGoing: "Keep going",
  },
  de: {
    workspace: "ARBEITSBEREICH",
    dashboard: "Übersicht",
    tasks: "Aufgaben",
    day: "Mein Tag",
    calendar: "Kalender",
    focus: "Fokus",
    habits: "Gewohnheiten",
    analytics: "Analysen",
    notes: "Notizen",
    settings: "Einstellungen",
    addTask: "Neue Aufgabe",
    today: "Heute",
    total: "Aufgaben insgesamt",
    active: "Aktiv",
    done: "Erledigt",
    overdue: "Überfällig",
    progress: "Fortschritt",
    todayTasks: "Aufgaben für heute",
    upcoming: "Demnächst",
    seeAll: "Alle Aufgaben",
    noTasks: "Noch keine Aufgaben",
    noTasksHint: "Fügen Sie Ihre erste Aufgabe hinzu, um den Tag zu planen.",
    search: "Aufgaben suchen...",
    all: "Alle Aufgaben",
    filterActive: "Aktiv",
    filterDone: "Erledigt",
    filterOverdue: "Überfällig",
    filterToday: "Heute",
    allCategories: "Alle Kategorien",
    allPriorities: "Alle Prioritäten",
    sortDate: "Nach Datum",
    sortPriority: "Nach Priorität",
    sortNewest: "Neueste zuerst",
    title: "Titel",
    description: "Beschreibung",
    date: "Datum",
    time: "Uhrzeit",
    category: "Kategorie",
    priority: "Priorität",
    save: "Speichern",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    delete: "Löschen",
    createTask: "Aufgabe erstellen",
    editTask: "Aufgabe bearbeiten",
    chooseDate: "Datum auswählen",
    noDayTasks: "Keine Aufgaben für diesen Tag",
    complete: "Erledigt",
    remaining: "Verbleibend",
    start: "Starten",
    pause: "Pausieren",
    resume: "Fortsetzen",
    reset: "Zurücksetzen",
    work: "Fokus",
    break: "Pause",
    sessions: "Abgeschlossene Sitzungen",
    focusTask: "Fokusaufgabe",
    noFocusTask: "Keine Aufgabe ausgewählt",
    newHabit: "Name der Gewohnheit",
    addHabit: "Gewohnheit hinzufügen",
    habitHistory: "Verlauf der letzten 7 Tage",
    streak: "Tage in Folge",
    noHabits: "Noch keine Gewohnheiten",
    weekly: "Diese Woche erledigte Aufgaben",
    byCategory: "Aufgaben nach Kategorie",
    newNote: "Neue Notiz",
    noteTitle: "Titel",
    noteBody: "Notiztext",
    noNotes: "Noch keine Notizen",
    theme: "Darstellung",
    light: "Hell",
    dark: "Dunkel",
    language: "Sprache",
    russian: "Russisch",
    english: "Englisch",
    german: "Deutsch",
    kazakh: "Kasachisch",
    focusLength: "Fokusdauer (Minuten)",
    breakLength: "Pausendauer (Minuten)",
    profile: "Profil",
    profileName: "Ihr Name",
    saved: "Einstellungen werden automatisch gespeichert",
    notFound: "Seite nicht gefunden",
    notFoundHint: "Diese Seite scheint nicht zu existieren.",
    home: "Zur Übersicht",
    greeting: "Willkommen",
    greetingText: "Planen Sie Ihren Tag und kommen Sie Ihren Zielen näher.",
    emptySearch: "Keine Ergebnisse gefunden",
    create: "Erstellen",
    month: "Monat",
    completedToday: "Heute erledigt",
    priorityHigh: "Hoch",
    priorityMedium: "Mittel",
    priorityLow: "Niedrig",
    categoryStudy: "Lernen",
    categoryWork: "Arbeit",
    categoryCode: "Programmierung",
    categoryPersonal: "Persönlich",
    categoryRest: "Erholung",
    categoryTravel: "Reisen",
    weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    todayLabel: "Heute",
    alarm: "Erinnerung",
    alarmAlert: "Zeit, diese Aufgabe zu erledigen",
    dismissAlarm: "Erinnerung stoppen",
    enableNotifications: "Benachrichtigungen aktivieren",
    notificationsEnabled: "Benachrichtigungen aktiviert",
    notificationsBlocked: "Benachrichtigungen sind im Browser blockiert",
    alarmHelp: "Die Erinnerung wird zur eingestellten Zeit ausgelöst, solange TaskFlow geöffnet ist.",
    goals: "Meine Ziele",
    challenges: "Herausforderungen",
    study: "Lernen",
    inspirationBoard: "Inspirationswand",
    yourInspiration: "Dein Gedanke für heute",
    inspirationPlaceholder: "Schreibe deinen eigenen Motivationssatz...",
    saveInspiration: "Hinzufügen",
    editInspiration: "Ändern",
    saveChanges: "Änderungen speichern",
    cancelEdit: "Abbrechen",
    noInspiration: "Schreibe einen Gedanken auf, der dich heute stärkt.",
    addGoal: "Ziel hinzufügen",
    addChallenge: "Herausforderung erstellen",
    addStudy: "Lernthema hinzufügen",
    goalPlaceholder: "Zum Beispiel: 12 Bücher lesen",
    challengePlaceholder: "Zum Beispiel: jeden Tag spazieren",
    studyPlaceholder: "Zum Beispiel: Englisch lernen",
    descriptionPlaceholder: "Beschreibung (optional)",
    challengeTarget: "Ziel der Herausforderung",
    progressLabel: "Fortschritt",
    increaseProgress: "Fortschritt erhöhen",
    decreaseProgress: "Fortschritt verringern",
    emptyGoals: "Fügen Sie ein persönliches Ziel hinzu.",
    emptyChallenges: "Erstellen Sie eine eigene Herausforderung und verfolgen Sie Ihre Schritte.",
    emptyStudy: "Fügen Sie ein Thema oder eine Fähigkeit hinzu, die Sie lernen möchten.",
    focusSprint: "Fokus-Sprints",
    keepGoing: "Weiter so",
  },
  kk: {
    workspace: "ЖҰМЫС КЕҢІСТІГІ",
    dashboard: "Басты бет",
    tasks: "Тапсырмалар",
    day: "Менің күнім",
    calendar: "Күнтізбе",
    focus: "Зейін",
    habits: "Әдеттер",
    analytics: "Талдау",
    notes: "Жазбалар",
    settings: "Баптаулар",
    addTask: "Жаңа тапсырма",
    today: "Бүгін",
    total: "Барлық тапсырма",
    active: "Белсенді",
    done: "Орындалды",
    overdue: "Мерзімі өткен",
    progress: "Прогресс",
    todayTasks: "Бүгінгі тапсырмалар",
    upcoming: "Алдағы істер",
    seeAll: "Барлық тапсырма",
    noTasks: "Әзірге тапсырмалар жоқ",
    noTasksHint: "Күніңізді жоспарлау үшін алғашқы тапсырмаңызды қосыңыз.",
    search: "Тапсырмаларды іздеу...",
    all: "Барлық тапсырма",
    filterActive: "Белсенді",
    filterDone: "Орындалған",
    filterOverdue: "Мерзімі өткен",
    filterToday: "Бүгін",
    allCategories: "Барлық санат",
    allPriorities: "Барлық басымдық",
    sortDate: "Күні бойынша",
    sortPriority: "Басымдығы бойынша",
    sortNewest: "Алдымен жаңалары",
    title: "Атауы",
    description: "Сипаттамасы",
    date: "Күні",
    time: "Уақыты",
    category: "Санат",
    priority: "Басымдық",
    save: "Сақтау",
    cancel: "Болдырмау",
    edit: "Өңдеу",
    delete: "Жою",
    createTask: "Тапсырма құру",
    editTask: "Тапсырманы өңдеу",
    chooseDate: "Күнді таңдаңыз",
    noDayTasks: "Бұл күнге тапсырма жоқ",
    complete: "Орындалды",
    remaining: "Қалды",
    start: "Бастау",
    pause: "Үзіліс",
    resume: "Жалғастыру",
    reset: "Қалпына келтіру",
    work: "Зейін",
    break: "Демалыс",
    sessions: "Аяқталған сессиялар",
    focusTask: "Зейін қою тапсырмасы",
    noFocusTask: "Тапсырма таңдалмаған",
    newHabit: "Әдет атауы",
    addHabit: "Әдет қосу",
    habitHistory: "7 күндік тарих",
    streak: "күн қатарынан",
    noHabits: "Әзірге әдеттер жоқ",
    weekly: "Осы аптада орындалған тапсырмалар",
    byCategory: "Санаттар бойынша тапсырмалар",
    newNote: "Жаңа жазба",
    noteTitle: "Тақырып",
    noteBody: "Жазба мәтіні",
    noNotes: "Әзірге жазбалар жоқ",
    theme: "Безендіру",
    light: "Ашық",
    dark: "Қараңғы",
    language: "Тіл",
    russian: "Орыс тілі",
    english: "Ағылшын тілі",
    german: "Неміс тілі",
    kazakh: "Қазақ тілі",
    focusLength: "Жұмыс уақыты (минут)",
    breakLength: "Үзіліс уақыты (минут)",
    profile: "Профиль",
    profileName: "Атыңыз",
    saved: "Баптаулар автоматты түрде сақталады",
    notFound: "Бет табылмады",
    notFoundHint: "Мұндай бет жоқ сияқты.",
    home: "Басты бетке",
    greeting: "Қош келдіңіз",
    greetingText: "Күніңізді жоспарлап, мақсаттарыңызға жақындай түсіңіз.",
    emptySearch: "Ештеңе табылмады",
    create: "Құру",
    month: "Ай",
    completedToday: "Бүгін орындалды",
    priorityHigh: "Жоғары",
    priorityMedium: "Орташа",
    priorityLow: "Төмен",
    categoryStudy: "Оқу",
    categoryWork: "Жұмыс",
    categoryCode: "Бағдарламалау",
    categoryPersonal: "Жеке",
    categoryRest: "Демалыс",
    categoryTravel: "Саяхат",
    weekdays: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"],
    todayLabel: "Бүгін",
    alarm: "Еске салғыш",
    alarmAlert: "Тапсырманы орындау уақыты келді",
    dismissAlarm: "Еске салғышты тоқтату",
    enableNotifications: "Хабарландыруларға рұқсат беру",
    notificationsEnabled: "Хабарландыруларға рұқсат берілген",
    notificationsBlocked: "Браузерде хабарландыруларға тыйым салынған",
    alarmHelp: "TaskFlow ашық тұрғанда еске салғыш белгіленген уақытта іске қосылады.",
    goals: "Мақсаттарым",
    challenges: "Міндеттер",
    study: "Оқу",
    inspirationBoard: "Шабыт тақтасы",
    yourInspiration: "Бүгінгі ойың",
    inspirationPlaceholder: "Өзіңе жігер беретін сөз жаз...",
    saveInspiration: "Қосу",
    editInspiration: "Өзгерту",
    saveChanges: "Сақтау",
    cancelEdit: "Болдырмау",
    noInspiration: "Бүгін саған күш беретін ойыңды жаз.",
    addGoal: "Мақсат қосу",
    addChallenge: "Челлендж құру",
    addStudy: "Оқу тақырыбын қосу",
    goalPlaceholder: "Мысалы: 12 кітап оқу",
    challengePlaceholder: "Мысалы: күн сайын серуендеу",
    studyPlaceholder: "Мысалы: ағылшын тілін үйрену",
    descriptionPlaceholder: "Сипаттамасы (міндетті емес)",
    challengeTarget: "Челлендж мақсаты",
    progressLabel: "Прогресс",
    increaseProgress: "Прогресті арттыру",
    decreaseProgress: "Прогресті азайту",
    emptyGoals: "Қол жеткізгіңіз келетін жеке мақсатыңызды қосыңыз.",
    emptyChallenges: "Өз челленджіңізді құрып, әр қадамыңызды белгілеп отырыңыз.",
    emptyStudy: "Үйренгіңіз келетін тақырыпты немесе дағдыны қосыңыз.",
    focusSprint: "Зейін сессиялары",
    keepGoing: "Жалғастырыңыз",
  },
};

const DATE_LOCALES = { ru: "ru-RU", en: "en-US", de: "de-DE", kk: "kk-KZ" };

const categoryKeys = {
  Учёба: "categoryStudy",
  Работа: "categoryWork",
  Программирование: "categoryCode",
  Личное: "categoryPersonal",
  Отдых: "categoryRest",
  Путешествия: "categoryTravel",
};
const priorityKeys = { Высокий: "priorityHigh", Средний: "priorityMedium", Низкий: "priorityLow" };

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage`, error);
    return fallback;
  }
}

function useStoredState(key, fallback, normalize = (saved) => saved) {
  const [value, setValue] = useState(() => normalize(readStorage(key, fallback)));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to save ${key} to localStorage`, error);
    }
  }, [key, value]);
  return [value, setValue];
}

function dateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDate(date, offset) {
  const result = new Date(`${date}T12:00:00`);
  result.setDate(result.getDate() + offset);
  return dateString(result);
}

function displayDate(date, language = "ru", options = { day: "numeric", month: "short" }) {
  if (!date) return "";
  return new Date(`${date}T12:00:00`).toLocaleDateString(DATE_LOCALES[language] || DATE_LOCALES.ru, options);
}

function translateCategory(value, t) {
  return t[categoryKeys[value]] || value;
}

function translatePriority(value, t) {
  return t[priorityKeys[value]] || value;
}

function normalizePersonalEntries(saved) {
  return Array.isArray(saved)
    ? saved.filter((entry) => entry && typeof entry === "object" && entry.id !== undefined && typeof entry.title === "string")
      .map((entry) => ({
        ...entry,
        description: typeof entry.description === "string" ? entry.description : "",
        progress: Math.min(100, Math.max(0, Number(entry.progress) || 0)),
        done: Math.max(0, Number(entry.done) || 0),
        total: Math.max(1, Number(entry.total) || 1),
      }))
    : [];
}

function normalizeInspirationNotes(saved) {
  if (!Array.isArray(saved)) return [];
  const notesByDate = new Map();
  saved.forEach((note) => {
    if (!note || typeof note !== "object" || note.id === undefined || typeof note.text !== "string") return;
    const timestamp = Number(String(note.id).split("-")[0]);
    const inferredDate = Number.isFinite(timestamp) && timestamp > 0 ? dateString(new Date(timestamp)) : "";
    const date = typeof note.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(note.date) ? note.date : inferredDate;
    const normalized = { id: note.id, date, text: note.text.slice(0, 240) };
    if (date && !notesByDate.has(date)) notesByDate.set(date, normalized);
    else if (!date) notesByDate.set(`${note.id}`, normalized);
  });
  return [...notesByDate.values()];
}

function App() {
  const [tasks, setTasks] = useStoredState("taskflow-tasks", [], (savedTasks) => (
    Array.isArray(savedTasks)
      ? savedTasks.filter((task) => task && typeof task === "object").map((task) => ({
        ...task,
        description: task.description || "",
        date: task.date || "",
        time: task.time || "",
        category: CATEGORIES.includes(task.category) ? task.category : CATEGORIES[0],
        priority: PRIORITIES.includes(task.priority) ? task.priority : PRIORITIES[1],
      }))
      : []
  ));
  const [habits, setHabits] = useStoredState("taskflow-habits", []);
  const [notes, setNotes] = useStoredState("taskflow-notes", []);
  const [goals, setGoals] = useStoredState("taskflow-goals", [], normalizePersonalEntries);
  const [challenges, setChallenges] = useStoredState("taskflow-challenges", [], normalizePersonalEntries);
  const [studyTracks, setStudyTracks] = useStoredState("taskflow-study-tracks", [], normalizePersonalEntries);
  const [inspirationNotes, setInspirationNotes] = useStoredState("taskflow-inspiration-notes", [], normalizeInspirationNotes);
  const [settings, setSettings] = useStoredState("taskflow-settings", {
    theme: "light",
    language: "ru",
    workMinutes: 25,
    breakMinutes: 5,
    name: readStorage("taskflow-profile", { name: "" })?.name || "",
  });
  const [timer, setTimer] = useStoredState("taskflow-focus-timer", {
    secondsLeft: 25 * 60,
    isRunning: false,
    isBreak: false,
    sessions: readStorage("taskflow-focus-sessions", 0),
  });
  const [firedAlarms, setFiredAlarms] = useStoredState("taskflow-fired-alarms", [], (saved) => (
    Array.isArray(saved) ? saved.filter((key) => typeof key === "string") : []
  ));
  const t = STRINGS[settings.language] || STRINGS.ru;
  const [taskEditor, setTaskEditor] = useState(null);
  const [noteEditor, setNoteEditor] = useState(null);
  const [calendarDate, setCalendarDate] = useState(dateString(new Date()));
  const [dayDate, setDayDate] = useState(dateString(new Date()));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [noteSearch, setNoteSearch] = useState("");
  const [habitName, setHabitName] = useState("");
  const [focusTaskId, setFocusTaskId] = useState("");
  const [activeAlarms, setActiveAlarms] = useState([]);
  const audioContextRef = useRef(null);
  const alarmSoundRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const today = dateString(new Date());
  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const overdueCount = tasks.filter((task) => !task.completed && task.date && task.date < today).length;
  const progress = tasks.length ? Math.round(completedCount / tasks.length * 100) : 0;

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.lang = settings.language;
  }, [settings.theme, settings.language]);

  useEffect(() => {
    const checkAlarms = () => {
      const now = Date.now();
      const dueTasks = tasks.filter((task) => {
        if (task.completed || !task.date || !task.time) return false;
        const alarmAt = new Date(`${task.date}T${task.time}:00`).getTime();
        return Number.isFinite(alarmAt) && alarmAt <= now && now - alarmAt <= 10 * 60 * 1000;
      });
      if (!dueTasks.length) return;

      const newlyDue = dueTasks.filter((task) => !firedAlarms.includes(`${task.id}-${task.date}-${task.time}`));
      if (!newlyDue.length) return;
      const newKeys = newlyDue.map((task) => `${task.id}-${task.date}-${task.time}`);
      setFiredAlarms((previous) => [...new Set([...previous, ...newKeys])]);
      setActiveAlarms((previous) => {
        const known = new Set(previous.map((task) => `${task.id}-${task.date}-${task.time}`));
        return [...previous, ...newlyDue.filter((task) => !known.has(`${task.id}-${task.date}-${task.time}`))];
      });

      if ("Notification" in window && Notification.permission === "granted") {
        newlyDue.forEach((task) => {
          try {
            const notification = new Notification(t.alarm, {
              body: `${t.alarmAlert}: ${task.title}`,
              tag: `taskflow-${task.id}-${task.date}-${task.time}`,
            });
            notification.onclick = () => {
              window.focus();
              navigate("/tasks");
              notification.close();
            };
          } catch (error) {
            console.error("Unable to display the task alarm notification.", error);
          }
        });
      }
    };
    checkAlarms();
    const intervalId = window.setInterval(checkAlarms, 1000);
    return () => window.clearInterval(intervalId);
  }, [tasks, firedAlarms, setFiredAlarms, t, navigate]);

  useEffect(() => {
    if (activeAlarms.length === 0) {
      window.clearInterval(alarmSoundRef.current);
      alarmSoundRef.current = null;
      return undefined;
    }

    const playChime = () => {
      try {
        const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextConstructor) {
          console.warn("Alarm sound is not supported by this browser.");
          return;
        }
        const audioContext = audioContextRef.current || new AudioContextConstructor();
        audioContextRef.current = audioContext;
        if (audioContext.state === "suspended") {
          audioContext.resume().catch((error) => console.error("Unable to resume alarm audio.", error));
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.22);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.48);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.error("Unable to play the task alarm sound.", error);
      }
    };
    playChime();
    alarmSoundRef.current = window.setInterval(playChime, 1400);
    return () => {
      window.clearInterval(alarmSoundRef.current);
      alarmSoundRef.current = null;
    };
  }, [activeAlarms.length]);

  useEffect(() => {
    if (!timer.isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setTimer((previous) => {
        if (!previous.isRunning) return previous;
        if (previous.secondsLeft > 1) return { ...previous, secondsLeft: previous.secondsLeft - 1 };
        const nextIsBreak = !previous.isBreak;
        return {
          ...previous,
          isRunning: false,
          isBreak: nextIsBreak,
          secondsLeft: Number(nextIsBreak ? settings.breakMinutes : settings.workMinutes) * 60,
          sessions: previous.sessions + (previous.isBreak ? 0 : 1),
        };
      });
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [timer.isRunning, timer.isBreak, settings.workMinutes, settings.breakMinutes, setTimer]);

  function unlockAlarmAudio() {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return;
    try {
      const audioContext = audioContextRef.current || new AudioContextConstructor();
      audioContextRef.current = audioContext;
      if (audioContext.state === "suspended") {
        audioContext.resume().catch((error) => console.error("Unable to enable alarm audio.", error));
      }
    } catch (error) {
      console.error("Unable to initialize alarm audio.", error);
    }
  }

  function saveTask(taskData) {
    if (taskData.time) unlockAlarmAudio();
    if (taskEditor?.id) {
      const previousTask = tasks.find((task) => task.id === taskEditor.id);
      if (previousTask && (previousTask.date !== taskData.date || previousTask.time !== taskData.time)) {
        const previousKey = `${previousTask.id}-${previousTask.date}-${previousTask.time}`;
        setFiredAlarms((previous) => previous.filter((key) => key !== previousKey));
        setActiveAlarms((previous) => previous.filter((task) => task.id !== previousTask.id));
      }
      setTasks((previous) => previous.map((task) => task.id === taskEditor.id ? { ...task, ...taskData } : task));
    } else {
      setTasks((previous) => [{ ...taskData, id: Date.now(), completed: false }, ...previous]);
    }
    setTaskEditor(null);
  }

  function toggleTask(id) {
    setTasks((previous) => previous.map((task) => task.id === id
      ? { ...task, completed: !task.completed, completedAt: task.completed ? "" : dateString(new Date()) }
      : task));
  }

  function deleteTask(id) {
    setFiredAlarms((previous) => previous.filter((key) => !key.startsWith(`${id}-`)));
    setActiveAlarms((previous) => previous.filter((task) => task.id !== id));
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  async function enableNotifications() {
    unlockAlarmAudio();
    if (!("Notification" in window)) {
      console.warn("Browser notifications are not supported.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const context = audioContextRef.current;
      if (context?.state === "suspended") await context.resume();
    }
  }

  function toggleHabit(habitId, date) {
    setHabits((previous) => previous.map((habit) => habit.id === habitId ? {
      ...habit,
      completedDates: habit.completedDates.includes(date)
        ? habit.completedDates.filter((item) => item !== date)
        : [...habit.completedDates, date],
    } : habit));
  }

  function addHabit(event) {
    event.preventDefault();
    if (!habitName.trim()) return;
    setHabits((previous) => [{ id: Date.now(), name: habitName.trim(), completedDates: [] }, ...previous]);
    setHabitName("");
  }

  function saveNote(event) {
    event.preventDefault();
    const data = { title: noteEditor.title.trim(), body: noteEditor.body.trim(), updatedAt: Date.now() };
    if (!data.title && !data.body) return;
    if (noteEditor.id) setNotes((previous) => previous.map((note) => note.id === noteEditor.id ? { ...note, ...data } : note));
    else setNotes((previous) => [{ ...data, id: Date.now() }, ...previous]);
    setNoteEditor(null);
  }

  function addGoal(entry) {
    setGoals((previous) => [{ ...entry, id: Date.now(), progress: 0 }, ...previous]);
  }

  function addChallenge(entry) {
    setChallenges((previous) => [{ ...entry, id: Date.now(), done: 0 }, ...previous]);
  }

  function addStudyTrack(entry) {
    setStudyTracks((previous) => [{ ...entry, id: Date.now(), progress: 0 }, ...previous]);
  }

  function saveInspirationNote(text, date) {
    setInspirationNotes((previous) => previous.some((note) => note.date === date)
      ? previous
      : [{ id: date, date, text }, ...previous]);
  }

  function updateInspirationNote(text, date) {
    setInspirationNotes((previous) => previous.map((note) => note.date === date ? { ...note, text } : note));
  }

  function deleteInspirationNote(date) {
    setInspirationNotes((previous) => previous.filter((note) => note.date !== date));
  }

  function updatePersonalEntry(setter, id, updates) {
    setter((previous) => previous.map((entry) => entry.id === id ? { ...entry, ...updates } : entry));
  }

  function deletePersonalEntry(setter, id) {
    setter((previous) => previous.filter((entry) => entry.id !== id));
  }

  const pageTitle = NAV.find(([path]) => path === location.pathname);
  const titleText = pageTitle ? t[pageTitle[1]] : t.notFound;
  const sortedTaskList = useMemo(() => {
    const priorityOrder = { Высокий: 0, Средний: 1, Низкий: 2 };
    return tasks.filter((task) => {
      const query = `${task.title} ${task.description}`.toLocaleLowerCase();
      if (!query.includes(search.toLocaleLowerCase())) return false;
      if (filter === "active" && task.completed) return false;
      if (filter === "done" && !task.completed) return false;
      if (filter === "today" && (task.date !== today || task.completed)) return false;
      if (filter === "overdue" && (task.completed || !task.date || task.date >= today)) return false;
      if (categoryFilter && task.category !== categoryFilter) return false;
      if (priorityFilter && task.priority !== priorityFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sort === "date") return (a.date || "9999-12-31").localeCompare(b.date || "9999-12-31") || (a.time || "").localeCompare(b.time || "");
      if (sort === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
      return b.id - a.id;
    });
  }, [tasks, search, filter, today, categoryFilter, priorityFilter, sort]);

  const weekData = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const date = shiftDate(today, index - 6);
    return {
      date: displayDate(date, settings.language, { weekday: "short" }),
      tasks: tasks.filter((task) => task.completed && task.completedAt === date).length,
    };
  }), [tasks, today, settings.language]);

  const categoryData = useMemo(() => CATEGORIES.map((category) => ({
    name: translateCategory(category, t),
    tasks: tasks.filter((task) => task.category === category).length,
  })), [tasks, t]);

  function addTaskForDate(date) {
    setTaskEditor({ date });
  }

  function newTask() {
    setTaskEditor({});
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="TaskFlow">
          <span className="brand-mark">✓</span><span>TaskFlow</span>
        </Link>
        <p className="menu-label">{t.workspace}</p>
        <nav className="navigation" aria-label={t.workspace}>
          {NAV.map(([path, key, icon]) => (
            <NavLink key={path} to={path} end={path === "/"} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
              <span className="nav-icon">{icon}</span><span>{t[key]}</span>
              {path === "/tasks" && <span className="nav-count">{activeCount}</span>}
            </NavLink>
          ))}
        </nav>
        <NavLink className="sidebar-profile" to="/settings">
          <span className="profile-avatar">{settings.name?.trim()?.slice(0, 1)?.toUpperCase() || "T"}</span>
          <span className="profile-copy"><strong>{settings.name || "TaskFlow"}</strong><small>{t.settings}</small></span>
          <span className="profile-arrow">›</span>
        </NavLink>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">{t.workspace}</p><h1>{titleText}</h1></div>
          <button className="primary-button" onClick={newTask}><span>＋</span>{t.addTask}</button>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} t={t} name={settings.name} today={today} language={settings.language} progress={progress} activeCount={activeCount} completedCount={completedCount} overdueCount={overdueCount} goals={goals} challenges={challenges} studyTracks={studyTracks} inspirationNotes={inspirationNotes} onSaveInspiration={saveInspirationNote} onUpdateInspiration={updateInspirationNote} onDeleteInspiration={deleteInspirationNote} onAddGoal={addGoal} onAddChallenge={addChallenge} onAddStudyTrack={addStudyTrack} onUpdateGoal={(id, updates) => updatePersonalEntry(setGoals, id, updates)} onUpdateChallenge={(id, updates) => updatePersonalEntry(setChallenges, id, updates)} onUpdateStudyTrack={(id, updates) => updatePersonalEntry(setStudyTracks, id, updates)} onDeleteGoal={(id) => deletePersonalEntry(setGoals, id)} onDeleteChallenge={(id) => deletePersonalEntry(setChallenges, id)} onDeleteStudyTrack={(id) => deletePersonalEntry(setStudyTracks, id)} onToggle={toggleTask} onAdd={newTask} onAll={() => navigate("/tasks")} />} />
          <Route path="/tasks" element={<TasksPage tasks={sortedTaskList} allTasks={tasks} t={t} today={today} language={settings.language} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} sort={sort} setSort={setSort} onToggle={toggleTask} onDelete={deleteTask} onEdit={(task) => setTaskEditor(task)} onAdd={newTask} />} />
          <Route path="/day" element={<DayPage tasks={tasks} t={t} language={settings.language} date={dayDate} setDate={setDayDate} onToggle={toggleTask} onAdd={addTaskForDate} />} />
          <Route path="/calendar" element={<CalendarPage tasks={tasks} t={t} language={settings.language} selected={calendarDate} setSelected={setCalendarDate} onAdd={addTaskForDate} onToggle={toggleTask} onEdit={(task) => setTaskEditor(task)} />} />
          <Route path="/focus" element={<FocusPage tasks={tasks} t={t} focusTaskId={focusTaskId} setFocusTaskId={setFocusTaskId} timer={timer} setTimer={setTimer} settings={settings} />} />
          <Route path="/habits" element={<HabitsPage habits={habits} t={t} today={today} language={settings.language} habitName={habitName} setHabitName={setHabitName} onAdd={addHabit} onToggle={toggleHabit} onDelete={(id) => setHabits((previous) => previous.filter((habit) => habit.id !== id))} />} />
          <Route path="/analytics" element={<AnalyticsPage t={t} weekData={weekData} categoryData={categoryData} tasks={tasks} completedCount={completedCount} activeCount={activeCount} overdueCount={overdueCount} />} />
          <Route path="/notes" element={<NotesPage notes={notes} t={t} search={noteSearch} setSearch={setNoteSearch} onAdd={() => setNoteEditor({ title: "", body: "" })} onEdit={(note) => setNoteEditor(note)} onDelete={(id) => setNotes((previous) => previous.filter((note) => note.id !== id))} language={settings.language} />} />
          <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} setTimer={setTimer} t={t} onEnableNotifications={enableNotifications} />} />
          <Route path="*" element={<NotFound t={t} />} />
        </Routes>
      </main>
      {taskEditor && <TaskModal key={taskEditor.id || `new-${taskEditor.date || "task"}`} task={taskEditor} t={t} onClose={() => setTaskEditor(null)} onSave={saveTask} />}
      {noteEditor && <NoteModal note={noteEditor} t={t} onClose={() => setNoteEditor(null)} onSave={saveNote} setNote={setNoteEditor} />}
      {activeAlarms.length > 0 && <AlarmDialog tasks={activeAlarms} t={t} language={settings.language} onDismiss={() => setActiveAlarms([])} />}
    </div>
  );
}

function SectionHeading({ title, detail, action }) {
  return <div className="section-heading"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{action}</div>;
}

function TaskRow({ task, t, language, today, onToggle, onEdit, onDelete, compact = false }) {
  const overdue = !task.completed && task.date && task.date < today;
  return (
    <article className={`task-row${task.completed ? " task-completed" : ""}${compact ? " compact" : ""}`}>
      <button className={`task-checkbox${task.completed ? " checked" : ""}`} type="button" onClick={() => onToggle(task.id)} aria-label={task.completed ? t.active : t.done}>{task.completed ? "✓" : ""}</button>
      <div className="task-info">
        <h3>{task.title}</h3>
        {!compact && task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span className="category-pill">{translateCategory(task.category, t)}</span>
          <span className={`priority-pill priority-${task.priority}`}>{translatePriority(task.priority, t)}</span>
          {task.date && <span className={`task-date${overdue ? " overdue" : ""}`}>{overdue ? `${t.overdue} · ` : ""}{displayDate(task.date, language)}{task.time ? ` · ${task.time}` : ""}</span>}
        </div>
      </div>
      {onEdit && <button className="icon-button" type="button" onClick={() => onEdit(task)} aria-label={`${t.edit}: ${task.title}`}>✎</button>}
      {onDelete && <button className="icon-button delete-icon" type="button" onClick={() => onDelete(task.id)} aria-label={`${t.delete}: ${task.title}`}>×</button>}
    </article>
  );
}

function EmptyState({ t, onAdd, search = false }) {
  return <div className="empty-state"><span className="empty-mark">✦</span><h3>{search ? t.emptySearch : t.noTasks}</h3><p>{search ? t.search : t.noTasksHint}</p>{onAdd && <button className="primary-button" onClick={onAdd}>＋ {t.addTask}</button>}</div>;
}

function Dashboard({
  tasks, t, name, today, language, progress, activeCount, completedCount, overdueCount,
  goals, challenges, studyTracks, onAddGoal, onAddChallenge, onAddStudyTrack,
  onUpdateGoal, onUpdateChallenge, onUpdateStudyTrack, onDeleteGoal, onDeleteChallenge, onDeleteStudyTrack,
  inspirationNotes, onSaveInspiration, onUpdateInspiration, onDeleteInspiration, onToggle, onAdd, onAll,
}) {
  const todayTasks = tasks.filter((task) => task.date === today).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const upcoming = tasks.filter((task) => !task.completed && task.date > today).sort((a, b) => a.date.localeCompare(b.date) || (a.time || "").localeCompare(b.time || "")).slice(0, 4);
  const dateText = new Date().toLocaleDateString(DATE_LOCALES[language] || DATE_LOCALES.ru, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayInspiration = inspirationNotes.find((note) => note.date === today);
  const [inspirationDraft, setInspirationDraft] = useState("");
  const [isEditingInspiration, setIsEditingInspiration] = useState(false);

  function submitInspiration(event) {
    event.preventDefault();
    const text = inspirationDraft.trim();
    if (!text) return;
    if (todayInspiration) onUpdateInspiration(text.slice(0, 240), today);
    else onSaveInspiration(text.slice(0, 240), today);
    setInspirationDraft("");
    setIsEditingInspiration(false);
  }

  function editInspiration() {
    setInspirationDraft(todayInspiration.text);
    setIsEditingInspiration(true);
  }

  function deleteInspiration() {
    onDeleteInspiration(today);
    setInspirationDraft("");
    setIsEditingInspiration(false);
  }

  return <>
    <section className="welcome-banner">
      <div><p className="banner-label">{dateText}</p><h2>{t.greeting}{name ? `, ${name}` : ""}! ✨</h2><p>{t.greetingText}</p></div>
      <div className="progress-circle"><span>{progress}%</span><small>{t.progress}</small></div>
    </section>
    <section className="inspiration-banner" aria-label={t.inspirationBoard}>
      <span className="inspiration-symbol" aria-hidden="true">✦</span>
      <div className="inspiration-content">
        <p className="inspiration-kicker">{t.inspirationBoard}</p>
        <h2 className="inspiration-title">{t.yourInspiration}</h2>
        {todayInspiration && !isEditingInspiration
          ? <div className="inspiration-note">
            <p>{todayInspiration.text}</p>
            <div className="inspiration-actions">
              <button type="button" onClick={editInspiration}>✎ {t.editInspiration}</button>
              <button type="button" onClick={deleteInspiration}>× {t.delete}</button>
            </div>
          </div>
          : <form className="inspiration-form" onSubmit={submitInspiration}>
            <textarea value={inspirationDraft} onChange={(event) => setInspirationDraft(event.target.value)} placeholder={t.inspirationPlaceholder} aria-label={t.inspirationPlaceholder} maxLength={240} rows={3} required />
            <div className="inspiration-form-footer">
              <span>{todayInspiration ? t.editInspiration : t.noInspiration}</span>
              <div className="inspiration-form-actions">
                {isEditingInspiration && <button className="inspiration-cancel" type="button" onClick={() => { setIsEditingInspiration(false); setInspirationDraft(""); }}>{t.cancelEdit}</button>}
                <button className="inspiration-submit" type="submit">{todayInspiration ? t.saveChanges : `＋ ${t.saveInspiration}`}</button>
              </div>
            </div>
          </form>}
      </div>
    </section>
    <section className="stats-grid">
      <StatCard icon="▦" label={t.total} value={tasks.length} tone="purple" />
      <StatCard icon="◷" label={t.active} value={activeCount} tone="orange" />
      <StatCard icon="✓" label={t.done} value={completedCount} tone="green" />
      <StatCard icon="!" label={t.overdue} value={overdueCount} tone="red" />
    </section>

    <section className="personal-grid">
      <div className="panel">
        <SectionHeading title={t.goals} detail={t.keepGoing} />
        <PersonalEntryForm kind="goal" t={t} onAdd={onAddGoal} />
        {goals.length ? <div className="goal-list">{goals.map((goal) => (
          <div key={goal.id} className="goal-item">
            <div className="goal-head"><div className="goal-label-wrap"><span className="goal-icon">✦</span><strong>{goal.title}</strong></div>
              <div className="personal-item-actions"><span>{goal.progress}%</span><button className="icon-button delete-icon" type="button" onClick={() => onDeleteGoal(goal.id)} aria-label={`${t.delete}: ${goal.title}`}>×</button></div>
            </div>
            {goal.description && <p>{goal.description}</p>}
            <div className="mini-progress"><span style={{ width: `${goal.progress}%` }} /></div>
            <div className="progress-controls"><button type="button" onClick={() => onUpdateGoal(goal.id, { progress: Math.max(0, goal.progress - 10) })} disabled={goal.progress <= 0} aria-label={t.decreaseProgress}>−</button><span>{t.progressLabel}</span><button type="button" onClick={() => onUpdateGoal(goal.id, { progress: Math.min(100, goal.progress + 10) })} disabled={goal.progress >= 100} aria-label={t.increaseProgress}>+</button></div>
          </div>
        ))}</div> : <p className="personal-empty">{t.emptyGoals}</p>}
      </div>

      <div className="panel">
        <SectionHeading title={t.challenges} detail={t.focusSprint} />
        <PersonalEntryForm kind="challenge" t={t} onAdd={onAddChallenge} />
        {challenges.length ? <div className="challenge-list">{challenges.map((challenge) => {
          const challengeProgress = Math.round(challenge.done / challenge.total * 100);
          return <div key={challenge.id} className="challenge-item">
            <div className="challenge-head"><div className="goal-label-wrap"><span className="goal-icon">◔</span><strong>{challenge.title}</strong></div>
              <div className="personal-item-actions"><span>{challenge.done}/{challenge.total}</span><button className="icon-button delete-icon" type="button" onClick={() => onDeleteChallenge(challenge.id)} aria-label={`${t.delete}: ${challenge.title}`}>×</button></div>
            </div>
            {challenge.description && <p>{challenge.description}</p>}
            <div className="mini-progress"><span style={{ width: `${challengeProgress}%` }} /></div>
            <div className="progress-controls"><button type="button" onClick={() => onUpdateChallenge(challenge.id, { done: Math.max(0, challenge.done - 1) })} disabled={challenge.done <= 0} aria-label={t.decreaseProgress}>−</button><span>{t.progressLabel}</span><button type="button" onClick={() => onUpdateChallenge(challenge.id, { done: Math.min(challenge.total, challenge.done + 1) })} disabled={challenge.done >= challenge.total} aria-label={t.increaseProgress}>+</button></div>
          </div>;
        })}</div> : <p className="personal-empty">{t.emptyChallenges}</p>}
      </div>
    </section>

    <section className="panel study-panel">
      <SectionHeading title={t.study} detail={t.keepGoing} />
      <PersonalEntryForm kind="study" t={t} onAdd={onAddStudyTrack} />
      {studyTracks.length ? <div className="study-list">{studyTracks.map((item) => (
        <div key={item.id} className="study-item">
          <div className="study-head"><div className="goal-label-wrap"><span className="goal-icon">⌁</span><strong>{item.title}</strong></div>
            <div className="personal-item-actions"><span>{item.progress}%</span><button className="icon-button delete-icon" type="button" onClick={() => onDeleteStudyTrack(item.id)} aria-label={`${t.delete}: ${item.title}`}>×</button></div>
          </div>
          {item.description && <p>{item.description}</p>}
          <div className="mini-progress"><span style={{ width: `${item.progress}%` }} /></div>
          <div className="progress-controls"><button type="button" onClick={() => onUpdateStudyTrack(item.id, { progress: Math.max(0, item.progress - 10) })} disabled={item.progress <= 0} aria-label={t.decreaseProgress}>−</button><span>{t.progressLabel}</span><button type="button" onClick={() => onUpdateStudyTrack(item.id, { progress: Math.min(100, item.progress + 10) })} disabled={item.progress >= 100} aria-label={t.increaseProgress}>+</button></div>
        </div>
      ))}</div> : <p className="personal-empty">{t.emptyStudy}</p>}
    </section>

    <div className="dashboard-columns">
      <section className="panel">
        <SectionHeading title={t.todayTasks} detail={`${todayTasks.filter((task) => task.completed).length}/${todayTasks.length} ${t.complete.toLocaleLowerCase()}`} action={<button className="text-button" onClick={onAll}>{t.seeAll} →</button>} />
        {todayTasks.length ? <div className="task-list">{todayTasks.map((task) => <TaskRow key={task.id} task={task} t={t} language={language} today={today} onToggle={onToggle} compact />)}</div> : <EmptyState t={t} onAdd={onAdd} />}
      </section>
      <section className="panel">
        <SectionHeading title={t.upcoming} detail={t.greetingText} action={<button className="text-button" onClick={onAll}>{t.seeAll} →</button>} />
        {upcoming.length ? <div className="task-list">{upcoming.map((task) => <TaskRow key={task.id} task={task} t={t} language={language} today={today} onToggle={onToggle} compact />)}</div> : <EmptyState t={t} onAdd={onAdd} />}
      </section>
    </div>
  </>;
}

function StatCard({ icon, label, value, tone }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div><p>{label}</p><strong>{value}</strong></div></article>;
}

function PersonalEntryForm({ kind, t, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("7");
  const titlePlaceholder = kind === "goal" ? t.goalPlaceholder : kind === "challenge" ? t.challengePlaceholder : t.studyPlaceholder;
  const submitLabel = kind === "goal" ? t.addGoal : kind === "challenge" ? t.addChallenge : t.addStudy;

  function submit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onAdd({
      title: cleanTitle,
      description: description.trim(),
      ...(kind === "challenge" ? { total: Math.min(365, Math.max(1, Number(target) || 1)) } : {}),
    });
    setTitle("");
    setDescription("");
    setTarget("7");
  }

  return <form className={`personal-entry-form personal-entry-form-${kind}`} onSubmit={submit}>
    <input className="field-control" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={titlePlaceholder} aria-label={titlePlaceholder} maxLength={100} required />
    {kind === "challenge" && <input className="field-control challenge-target" type="number" min="1" max="365" value={target} onChange={(event) => setTarget(event.target.value)} aria-label={t.challengeTarget} title={t.challengeTarget} />}
    <input className="field-control" value={description} onChange={(event) => setDescription(event.target.value)} placeholder={t.descriptionPlaceholder} aria-label={t.descriptionPlaceholder} maxLength={180} />
    <button className="primary-button" type="submit">＋ {submitLabel}</button>
  </form>;
}

function TasksPage({ tasks, allTasks, t, today, language, search, setSearch, filter, setFilter, categoryFilter, setCategoryFilter, priorityFilter, setPriorityFilter, sort, setSort, onToggle, onDelete, onEdit, onAdd }) {
  const filterOptions = [["all", t.all], ["active", t.filterActive], ["done", t.filterDone], ["today", t.filterToday], ["overdue", t.filterOverdue]];
  return <section className="panel task-page">
    <SectionHeading title={t.tasks} detail={`${tasks.length} / ${allTasks.length}`} action={<button className="primary-button" onClick={onAdd}>＋ {t.addTask}</button>} />
    <div className="filter-tabs">{filterOptions.map(([key, label]) => <button key={key} className={filter === key ? "selected" : ""} onClick={() => setFilter(key)}>{label}<span>{key === "all" ? allTasks.length : key === "active" ? allTasks.filter((x) => !x.completed).length : key === "done" ? allTasks.filter((x) => x.completed).length : key === "today" ? allTasks.filter((x) => !x.completed && x.date === today).length : allTasks.filter((x) => !x.completed && x.date && x.date < today).length}</span></button>)}</div>
    <div className="filter-controls"><input className="field-control search-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`⌕ ${t.search}`} aria-label={t.search} />
      <select className="field-control" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label={t.category}><option value="">{t.allCategories}</option>{CATEGORIES.map((category) => <option key={category} value={category}>{translateCategory(category, t)}</option>)}</select>
      <select className="field-control" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} aria-label={t.priority}><option value="">{t.allPriorities}</option>{PRIORITIES.map((priority) => <option key={priority} value={priority}>{translatePriority(priority, t)}</option>)}</select>
      <select className="field-control" value={sort} onChange={(event) => setSort(event.target.value)} aria-label={t.sortDate}><option value="newest">{t.sortNewest}</option><option value="date">{t.sortDate}</option><option value="priority">{t.sortPriority}</option></select>
    </div>
    {tasks.length ? <div className="task-list">{tasks.map((task) => <TaskRow key={task.id} task={task} t={t} language={language} today={today} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}</div> : <EmptyState t={t} search={Boolean(search)} onAdd={search ? undefined : onAdd} />}
  </section>;
}

function DayPage({ tasks, t, language, date, setDate, onToggle, onAdd }) {
  const selectedTasks = tasks.filter((task) => task.date === date).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
  const completed = selectedTasks.filter((task) => task.completed).length;
  return <section className="panel">
    <SectionHeading title={t.day} detail={displayDate(date, language, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} action={<button className="primary-button" onClick={() => onAdd(date)}>＋ {t.addTask}</button>} />
    <div className="day-toolbar"><label>{t.chooseDate}<input className="field-control" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><div className="day-progress"><span>{t.progress}</span><strong>{completed}/{selectedTasks.length}</strong><div className="progress-track"><span style={{ width: `${selectedTasks.length ? completed / selectedTasks.length * 100 : 0}%` }} /></div></div></div>
    {selectedTasks.length ? <div className="timeline">{selectedTasks.map((task) => <div className="timeline-item" key={task.id}><time>{task.time || "—"}</time><span className={`timeline-dot${task.completed ? " done" : ""}`} /><TaskRow task={task} t={t} language={language} today={dateString(new Date())} onToggle={onToggle} compact /></div>)}</div> : <EmptyState t={{ ...t, noTasks: t.noDayTasks }} onAdd={() => onAdd(date)} />}
  </section>;
}

function CalendarPage({ tasks, t, language, selected, setSelected, onAdd, onToggle, onEdit }) {
  const selectedDate = new Date(`${selected}T12:00:00`);
  const [shownMonth, setShownMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  const monthStart = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
  const offset = (monthStart.getDay() + 6) % 7;
  const days = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, index) => {
    const day = index - offset + 1;
    if (day < 1 || day > days) return null;
    return dateString(new Date(shownMonth.getFullYear(), shownMonth.getMonth(), day, 12));
  });
  const selectedTasks = tasks.filter((task) => task.date === selected).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  function shiftMonth(amount) {
    setShownMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }
  return <div className="calendar-layout"><section className="panel calendar-panel">
    <div className="calendar-heading"><button className="icon-button" onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button><h2>{shownMonth.toLocaleDateString(DATE_LOCALES[language] || DATE_LOCALES.ru, { month: "long", year: "numeric" })}</h2><button className="icon-button" onClick={() => shiftMonth(1)} aria-label="Next month">›</button><button className="text-button today-button" onClick={() => { setShownMonth(new Date()); setSelected(dateString(new Date())); }}>{t.today}</button></div>
    <div className="calendar-grid weekday-row">{t.weekdays.map((day) => <span key={day}>{day}</span>)}</div>
    <div className="calendar-grid">{cells.map((date, index) => {
      const dayTasks = tasks.filter((task) => task.date === date);
      return date ? <button type="button" key={date} className={`calendar-day${date === selected ? " selected" : ""}${date === dateString(new Date()) ? " current-day" : ""}`} onClick={() => setSelected(date)}><span>{Number(date.slice(-2))}</span>{dayTasks.length > 0 && <div className="day-dots"><i />{dayTasks.length > 1 && <small>{dayTasks.length}</small>}</div>}</button> : <div className="calendar-day blank" key={`blank-${index}`} />;
    })}</div>
  </section><section className="panel selected-date-panel"><SectionHeading title={displayDate(selected, language, { weekday: "long", day: "numeric", month: "long" })} action={<button className="primary-button" onClick={() => onAdd(selected)}>＋ {t.create}</button>} />
    {selectedTasks.length ? <div className="task-list">{selectedTasks.map((task) => <TaskRow key={task.id} task={task} t={t} language={language} today={dateString(new Date())} onToggle={onToggle} onEdit={onEdit} compact />)}</div> : <EmptyState t={{ ...t, noTasks: t.noDayTasks }} />}
  </section></div>;
}

function FocusPage({ tasks, t, focusTaskId, setFocusTaskId, timer, setTimer, settings }) {
  const { isRunning, isBreak, secondsLeft, sessions } = timer;
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const total = Number(isBreak ? settings.breakMinutes : settings.workMinutes) * 60;
  const percent = total ? (total - secondsLeft) / total * 100 : 0;
  function resetTimer() {
    setTimer((previous) => ({ ...previous, isRunning: false, isBreak: false, secondsLeft: Number(settings.workMinutes || 25) * 60 }));
  }
  return <div className="focus-layout"><section className="panel focus-panel">
    <p className="eyebrow">{isBreak ? t.break : t.work}</p><div className="timer-ring" style={{ "--timer-progress": `${percent}%` }}><div><strong>{minutes}:{seconds}</strong><span>{isBreak ? t.break : t.focus}</span></div></div>
    <div className="timer-actions"><button className="primary-button" onClick={() => setTimer((previous) => ({ ...previous, isRunning: !previous.isRunning }))}>{isRunning ? `Ⅱ ${t.pause}` : `▶ ${secondsLeft === total ? t.start : t.resume}`}</button><button className="secondary-button" onClick={resetTimer}>{t.reset}</button></div>
    <label className="focus-select-label">{t.focusTask}<select className="field-control" value={focusTaskId} onChange={(event) => setFocusTaskId(event.target.value)}><option value="">{t.noFocusTask}</option>{tasks.filter((task) => !task.completed).map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></label>
    <div className="session-count"><span>✦</span><div><strong>{sessions}</strong><small>{t.sessions}</small></div></div>
  </section><aside className="panel focus-tip"><div className="stat-icon purple">◉</div><h2>{t.focus}</h2><p>{t.greetingText}</p><div className="focus-cycle"><span>{Number(settings.workMinutes)} {t.work}</span><i>→</i><span>{Number(settings.breakMinutes)} {t.break}</span><i>↻</i></div></aside></div>;
}

function streakLength(completedDates, today) {
  const dates = new Set(completedDates);
  let cursor = dates.has(today) ? today : shiftDate(today, -1);
  let count = 0;
  while (dates.has(cursor)) {
    count += 1;
    cursor = shiftDate(cursor, -1);
  }
  return count;
}

function HabitsPage({ habits, t, today, language, habitName, setHabitName, onAdd, onToggle, onDelete }) {
  const history = Array.from({ length: 7 }, (_, index) => shiftDate(today, index - 6));
  return <section className="panel">
    <SectionHeading title={t.habits} detail={t.habitHistory} />
    <form className="inline-form" onSubmit={onAdd}><input className="field-control" value={habitName} onChange={(event) => setHabitName(event.target.value)} placeholder={t.newHabit} aria-label={t.newHabit} required /><button className="primary-button" type="submit">＋ {t.addHabit}</button></form>
    {habits.length ? <div className="habit-list">{habits.map((habit) => <article className="habit-card" key={habit.id}><div className="habit-top"><div><h3>{habit.name}</h3><p>🔥 {streakLength(habit.completedDates, today)} {t.streak}</p></div><button className="icon-button delete-icon" onClick={() => onDelete(habit.id)} aria-label={`${t.delete}: ${habit.name}`}>×</button></div><div className="habit-history"><span className="history-title">{t.habitHistory}</span><div className="history-days">{history.map((date) => <button type="button" key={date} className={`history-day${habit.completedDates.includes(date) ? " checked" : ""}${date === today ? " today" : ""}`} onClick={() => onToggle(habit.id, date)} title={displayDate(date, language, { weekday: "long", day: "numeric", month: "long" })}><span>{displayDate(date, language, { weekday: "narrow" })}</span><i>{habit.completedDates.includes(date) ? "✓" : ""}</i></button>)}</div></div></article>)}</div> : <div className="empty-state"><span className="empty-mark">✳</span><h3>{t.noHabits}</h3></div>}
  </section>;
}

function AnalyticsPage({ t, weekData, categoryData, tasks, completedCount, activeCount, overdueCount }) {
  const maxWeekly = Math.max(1, ...weekData.map((item) => item.tasks));
  const chartPoints = weekData.map((item, index) => `${30 + index * 86},${220 - item.tasks / maxWeekly * 180}`).join(" ");
  return <>
    <section className="stats-grid analytics-stats"><StatCard icon="✓" label={t.done} value={completedCount} tone="green" /><StatCard icon="◷" label={t.active} value={activeCount} tone="orange" /><StatCard icon="!" label={t.overdue} value={overdueCount} tone="red" /><StatCard icon="▦" label={t.total} value={tasks.length} tone="purple" /></section>
    <div className="analytics-grid"><section className="panel chart-panel"><SectionHeading title={t.weekly} /><div className="chart chart-line">
      <svg viewBox="0 0 600 260" role="img" aria-label={t.weekly} preserveAspectRatio="none">
        {[40, 85, 130, 175, 220].map((y) => <line key={y} x1="28" x2="575" y1={y} y2={y} className="chart-gridline" />)}
        <polygon points={`30,220 ${chartPoints} 546,220`} className="chart-area" />
        <polyline points={chartPoints} className="chart-line-path" />
        {weekData.map((item, index) => {
          const x = 30 + index * 86;
          const y = 220 - item.tasks / maxWeekly * 180;
          return <g key={`${item.date}-${index}`}><circle cx={x} cy={y} r="4" className="chart-dot" /><text x={x} y="248" textAnchor="middle" className="chart-label">{item.date}</text><text x={x} y={Math.max(26, y - 11)} textAnchor="middle" className="chart-value">{item.tasks}</text></g>;
        })}
      </svg>
    </div></section>
    <section className="panel chart-panel"><SectionHeading title={t.byCategory} /><div className="category-chart">{categoryData.map((item) => <div className="category-bar-row" key={item.name}><span>{item.name}</span><div className="bar-track"><i style={{ width: `${tasks.length ? item.tasks / Math.max(1, ...categoryData.map((entry) => entry.tasks)) * 100 : 0}%` }} /></div><strong>{item.tasks}</strong></div>)}</div></section></div>
  </>;
}

function NotesPage({ notes, t, search, setSearch, onAdd, onEdit, onDelete, language }) {
  const filteredNotes = notes.filter((note) => `${note.title} ${note.body}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  return <section className="panel"><SectionHeading title={t.notes} action={<button className="primary-button" onClick={onAdd}>＋ {t.newNote}</button>} /><div className="filter-controls notes-search"><input className="field-control search-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`⌕ ${t.search}`} aria-label={t.search} /></div>{filteredNotes.length ? <div className="notes-grid">{filteredNotes.map((note) => <article className="note-card" key={note.id}><div className="note-card-top"><h3>{note.title || t.noteBody}</h3><div><button className="icon-button" onClick={() => onEdit(note)} aria-label={`${t.edit}: ${note.title}`}>✎</button><button className="icon-button delete-icon" onClick={() => onDelete(note.id)} aria-label={`${t.delete}: ${note.title}`}>×</button></div></div><p>{note.body}</p><small>{new Date(note.updatedAt || note.id).toLocaleDateString(DATE_LOCALES[language] || DATE_LOCALES.ru)}</small></article>)}</div> : <div className="empty-state"><span className="empty-mark">▤</span><h3>{search ? t.emptySearch : t.noNotes}</h3></div>}</section>;
}

function SettingsPage({ settings, setSettings, setTimer, t, onEnableNotifications }) {
  const [notificationPermission, setNotificationPermission] = useState(
    "Notification" in window ? Notification.permission : "unsupported",
  );

  function changeSetting(key, value) {
    setSettings((previous) => ({ ...previous, [key]: value }));
    if ((key === "workMinutes" || key === "breakMinutes") && !Number.isNaN(Number(value))) {
      setTimer((previous) => {
        const settingForCurrentPhase = previous.isBreak ? "breakMinutes" : "workMinutes";
        return key === settingForCurrentPhase && !previous.isRunning
          ? { ...previous, secondsLeft: Number(value) * 60 }
          : previous;
      });
    }
  }

  async function requestNotifications() {
    await onEnableNotifications();
    if ("Notification" in window) setNotificationPermission(Notification.permission);
  }

  return <section className="panel settings-panel"><SectionHeading title={t.settings} detail={t.saved} />
    <div className="settings-group"><h3>{t.profile}</h3><label className="settings-field"><span>{t.profileName}</span><input className="field-control" value={settings.name || ""} maxLength={40} onChange={(event) => changeSetting("name", event.target.value)} /></label></div>
    <div className="settings-group"><h3>{t.theme}</h3><div className="choice-row"><button className={settings.theme === "light" ? "choice active" : "choice"} onClick={() => changeSetting("theme", "light")}>☼ {t.light}</button><button className={settings.theme === "dark" ? "choice active" : "choice"} onClick={() => changeSetting("theme", "dark")}>◐ {t.dark}</button></div></div>
    <div className="settings-group"><h3>{t.language}</h3><div className="choice-row">{[["ru", "Русский"], ["en", "English"], ["de", "Deutsch"], ["kk", "Қазақша"]].map(([language, label]) => <button key={language} className={settings.language === language ? "choice active" : "choice"} onClick={() => changeSetting("language", language)}>{label}</button>)}</div></div>
    <div className="settings-group"><h3>Pomodoro</h3><div className="settings-numbers"><label className="settings-field"><span>{t.focusLength}</span><input className="field-control" type="number" min="1" max="180" value={settings.workMinutes} onChange={(event) => changeSetting("workMinutes", Math.min(180, Math.max(1, Number(event.target.value) || 1)))} /></label><label className="settings-field"><span>{t.breakLength}</span><input className="field-control" type="number" min="1" max="60" value={settings.breakMinutes} onChange={(event) => changeSetting("breakMinutes", Math.min(60, Math.max(1, Number(event.target.value) || 1)))} /></label></div></div>
    <div className="settings-group"><h3>{t.alarm}</h3><p className="settings-hint">{t.alarmHelp}</p>{notificationPermission === "granted" ? <span className="permission-state enabled">✓ {t.notificationsEnabled}</span> : <><button className="secondary-button" type="button" onClick={requestNotifications} disabled={notificationPermission === "unsupported"}>{t.enableNotifications}</button>{notificationPermission === "denied" && <p className="settings-warning">{t.notificationsBlocked}</p>}</>}</div>
  </section>;
}

function NotFound({ t }) {
  return <section className="panel not-found"><span>404</span><h2>{t.notFound}</h2><p>{t.notFoundHint}</p><Link className="primary-button" to="/">{t.home}</Link></section>;
}

function AlarmDialog({ tasks, t, language, onDismiss }) {
  return <div className="alarm-backdrop" role="alertdialog" aria-modal="true" aria-labelledby="alarm-title">
    <section className="alarm-card">
      <span className="alarm-bell" aria-hidden="true">♢</span>
      <p className="eyebrow">{t.alarm}</p>
      <h2 id="alarm-title">{t.alarmAlert}</h2>
      <div className="alarm-task-list">{tasks.map((task) => <div className="alarm-task" key={`${task.id}-${task.date}-${task.time}`}><strong>{task.title}</strong><span>{displayDate(task.date, language, { day: "numeric", month: "long" })} · {task.time}</span></div>)}</div>
      <button className="primary-button alarm-dismiss" onClick={onDismiss}>■ {t.dismissAlarm}</button>
    </section>
  </div>;
}

function TaskModal({ task, t, onClose, onSave }) {
  const [form, setForm] = useState({
    title: task.title || "",
    description: task.description || "",
    date: task.date || dateString(new Date()),
    time: task.time || "",
    category: task.category || CATEGORIES[0],
    priority: task.priority || PRIORITIES[1],
  });
  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  }
  const change = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="form-modal" onSubmit={submit}>
    <div className="modal-heading"><div><p className="eyebrow">{t.tasks}</p><h2>{task.id ? t.editTask : t.createTask}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label={t.cancel}>×</button></div>
    <label>{t.title}<input autoFocus className="field-control" value={form.title} onChange={(event) => change("title", event.target.value)} required maxLength={120} /></label>
    <label>{t.description}<textarea className="field-control" value={form.description} onChange={(event) => change("description", event.target.value)} rows={3} /></label>
    <div className="form-grid">
      <label>{t.date}<input className="field-control" type="date" value={form.date} onChange={(event) => change("date", event.target.value)} /></label>
    <label>{t.time}<input className="field-control" type="time" value={form.time} onChange={(event) => change("time", event.target.value)} />{form.time && <small className="alarm-form-hint">◷ {t.alarmHelp}</small>}</label>
      <label>{t.category}<select className="field-control" value={form.category} onChange={(event) => change("category", event.target.value)}>{CATEGORIES.map((category) => <option key={category} value={category}>{translateCategory(category, t)}</option>)}</select></label>
      <label>{t.priority}<select className="field-control" value={form.priority} onChange={(event) => change("priority", event.target.value)}>{PRIORITIES.map((priority) => <option key={priority} value={priority}>{translatePriority(priority, t)}</option>)}</select></label>
    </div>
    <div className="form-actions"><button type="button" className="secondary-button" onClick={onClose}>{t.cancel}</button><button type="submit" className="primary-button">{t.save}</button></div>
  </form></div>;
}

function NoteModal({ note, t, onClose, onSave, setNote }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="form-modal" onSubmit={onSave}>
    <div className="modal-heading"><h2>{note.id ? t.edit : t.newNote}</h2><button className="icon-button" type="button" onClick={onClose} aria-label={t.cancel}>×</button></div>
    <label>{t.noteTitle}<input autoFocus className="field-control" value={note.title} onChange={(event) => setNote((previous) => ({ ...previous, title: event.target.value }))} maxLength={120} /></label>
    <label>{t.noteBody}<textarea className="field-control note-editor" rows={10} value={note.body} onChange={(event) => setNote((previous) => ({ ...previous, body: event.target.value }))} /></label>
    <div className="form-actions"><button type="button" className="secondary-button" onClick={onClose}>{t.cancel}</button><button type="submit" className="primary-button">{t.save}</button></div>
  </form></div>;
}

export default function Root() {
  return <BrowserRouter><App /></BrowserRouter>;
}
