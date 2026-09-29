// Ссылки для кнопок. Вставьте адрес между кавычками — кнопка сразу начнёт вести туда.
// Пока адрес пустой, кнопка ведёт в Telegram к Светлане (или к блоку контактов).
const LINKS = {
  diagnostics: "",   // бот с Аудитором и Аналитиком (BotHelp, GPTs или другой)
  pay_self: "https://t.me/neiroproducer_bot?start=c1790701602145-ds",      // тариф «Самостоятельный», 9 900 ₽ — диплинк BotHelp
  pay_feedback: "https://t.me/neiroproducer_bot?start=c1790703715446-ds",  // тариф «С личной встречей», 14 900 ₽ — диплинк BotHelp
  consultation: "https://forms.gle/NLoVNi8C1op6Gs5W8",  // Google Форма — запись на консультацию для тарифа «Индивидуальное внедрение»
};

// Номер счётчика Яндекс.Метрики — нужен, чтобы клики по кнопкам считались целями.
const METRIKA_ID = 0;

const TELEGRAM = "https://t.me/svechka_v";
const FALLBACK_TEXT = {
  diagnostics: "Здравствуйте! Хочу пройти диагностику задач.",
  pay_self: "Здравствуйте! Хочу участвовать в «ИИ-контуре», тариф «Самостоятельный».",
  pay_feedback: "Здравствуйте! Хочу участвовать в «ИИ-контуре», тариф «С личной встречей».",
  consultation: "Здравствуйте! Хочу записаться на консультацию по тарифу «Индивидуальное внедрение».",
};

document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;
  const url = LINKS[key] || `${TELEGRAM}?text=${encodeURIComponent(FALLBACK_TEXT[key] || "")}`;
  link.href = url;
  // Пока нет ссылки на оплату, кнопка честно говорит, что ведёт в Telegram
  if (!LINKS[key] && link.dataset.fallbackLabel) link.textContent = link.dataset.fallbackLabel;
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
    const group = item.closest(".faq-list, .module-list") || document;
    group.querySelectorAll("details[open]").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Карусель примеров: кнопки листают на одну карточку
const track = document.querySelector(".case-track");
if (track) {
  const btns = document.querySelectorAll(".carousel-btn");
  const step = () => {
    const card = track.querySelector(".case-card");
    return card ? card.getBoundingClientRect().width + 18 : 300;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    btns.forEach((b) => {
      b.disabled = b.dataset.dir === "-1" ? track.scrollLeft <= 2 : track.scrollLeft >= max;
    });
  };
  btns.forEach((b) => b.addEventListener("click", () => {
    track.scrollBy({ left: step() * Number(b.dataset.dir), behavior: "smooth" });
  }));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
