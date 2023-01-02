import messages from "./messages/messages.en.json";
import { FormattedMessage } from "react-intl";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof FormattedMessage> & { id: keyof typeof messages };

export const translate = (props: Props) => {
  return <FormattedMessage {...props} />;
};
