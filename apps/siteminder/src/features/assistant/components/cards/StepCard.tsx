import type { FlowCard, TemplateValues } from "../../flows";
import { FormCard } from "./FormCard";
import { ContactCard, HandoffCard, InfoCard, RecommendationsCard, StepsCard, SuccessCard } from "./GeneralCards";
import { EventDayCard, MobileTicketCard, OrderCard, RefundCard, RescheduleCard } from "./OrderCards";

export function StepCard({ card, values, live }: { card: FlowCard; values: TemplateValues; live: boolean }) {
  switch (card.kind) {
    case "steps":
      return <StepsCard card={card} />;
    case "order":
      return <OrderCard values={values} />;
    case "mobile-ticket":
      return <MobileTicketCard values={values} />;
    case "refund":
      return <RefundCard values={values} mode={card.mode} />;
    case "reschedule":
      return <RescheduleCard values={values} />;
    case "event-day":
      return <EventDayCard values={values} />;
    case "recommendations":
      return <RecommendationsCard />;
    case "contact":
      return <ContactCard card={card} />;
    case "form":
      return <FormCard form={card.form} next={card.next} values={values} live={live} />;
    case "handoff":
      return <HandoffCard values={values} live={live} />;
    case "info":
      return <InfoCard card={card} />;
    case "success":
      return <SuccessCard card={card} />;
    default: {
      const exhaustive: never = card;
      return exhaustive;
    }
  }
}
