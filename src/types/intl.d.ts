import { Locales } from "../locales/locales";
import messages from "../locales/messages/messages.en.json";

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof messages;
    }

    interface IntlConfig {
      locale: Locales;
    }
  }
}
