// Ссылки для кнопок. Вставьте адрес между кавычками — кнопка сразу начнёт вести туда.
// Пока адрес пустой, кнопка ведёт в Telegram к Светлане (или к блоку контактов).
const LINKS = {
  diagnostics: "",   // бот с Аудитором и Аналитиком (BotHelp, GPTs или другой)
  pay_self: "",      // оплата тарифа «Самостоятельный», 9 900 ₽ (ЮKassa / GetCourse / BotHelp)
  pay_feedback: "",  // оплата тарифа «С обратной связью», 19 900 ₽
  consultation: "",  // запись на консультацию для тарифа «Индивидуальное внедрение»
};

// Номер счётчика Яндекс.Метрики — нужен, чтобы клики по кнопкам считались целями.
const METRIKA_ID = 0;

const TELEGRAM = "https://t.me/svechka_v";
const FALLBACK_TEXT = {
  diagnostics: "Здравствуйте! Хочу пройти диагностику задач.",
  pay_self: "Здравствуйте! Хочу участвовать в «ИИ-контуре», тариф «Самостоятельный».",
  pay_feedback: "Здравствуйте! Хочу участвовать в «ИИ-контуре», тариф «С обратной связью».",
  consultation: "Здравствуйте! Хочу записаться на консультацию по тарифу «Индивидуальное внедрение».",
};

document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;
  const url = LINKS[key] || `${TELEGRAM}?text=${encodeURIComponent(FALLBACK_TEXT[key] || "")}`;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-goal]").forEach((link) => {
  link.addEventListener("click", () => {
    if (METRIKA_ID && typeof window.ym === "function") {
      window.ym(METRIKA_ID, "reachGoal", link.dataset.goal);
    }
  });
});

document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll("details[open]").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
