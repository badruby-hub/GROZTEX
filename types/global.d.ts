// global.d.ts
interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  // здесь можно добавить другие методы и свойства из Telegram WebApp API
}

interface Telegram {
  WebApp: TelegramWebApp;
}

interface Window {
  Telegram?: Telegram;
}
