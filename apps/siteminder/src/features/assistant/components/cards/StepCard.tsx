import { renderCard } from "../../engine/conversation";
import type { FlowCard, TemplateValues } from "../../flows";
import {
  BankTransferCard,
  CreditRefundCard,
  ExtensionCard,
  InstalmentCard,
  InvoiceCard,
  InvoiceCompareCard,
  PaymentConfirmCard,
} from "./BillingCards";
import { EventInsightsCard, EventPlaybookCard, EventReviewCard } from "./EventCards";
import { FormCard } from "./FormCard";
import {
  ContactCard,
  HandoffCard,
  InfoCard,
  PlatformStatusCard,
  StepsCard,
  SuccessCard,
  UrgentCard,
} from "./GeneralCards";
import {
  BookingCard,
  ChannelCard,
  ParityCard,
  PlanCompareCard,
  SyncTestCard,
} from "./PropertyCards";

export function StepCard({
  card: raw,
  values,
  live,
}: {
  card: FlowCard;
  values: TemplateValues;
  live: boolean;
}) {
  const card = renderCard(raw, values) ?? raw;
  switch (card.kind) {
    case "steps":
      return <StepsCard card={card} />;
    case "urgent":
      return <UrgentCard card={card} />;
    case "channel":
      return <ChannelCard values={values} />;
    case "sync-test":
      return <SyncTestCard values={values} live={live} />;
    case "platform-status":
      return <PlatformStatusCard values={values} />;
    case "booking":
      return <BookingCard values={values} />;
    case "invoice":
      return <InvoiceCard values={values} />;
    case "payment-confirm":
      return <PaymentConfirmCard values={values} />;
    case "bank-transfer":
      return <BankTransferCard values={values} />;
    case "invoice-compare":
      return <InvoiceCompareCard values={values} />;
    case "credit-refund":
      return <CreditRefundCard values={values} />;
    case "extension":
      return <ExtensionCard values={values} />;
    case "instalment":
      return <InstalmentCard values={values} />;
    case "plan-compare":
      return <PlanCompareCard />;
    case "parity":
      return <ParityCard />;
    case "event-playbook":
      return <EventPlaybookCard values={values} />;
    case "event-review":
      return <EventReviewCard values={values} />;
    case "event-insights":
      return <EventInsightsCard />;
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
