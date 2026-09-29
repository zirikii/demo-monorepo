import { getNode, type FlowCard } from "../../flows";
import { templateValues } from "../../engine/conversation";
import { useAssistant } from "../../AssistantProvider";
import {
  BillCard,
  BpayCard,
  ExtensionCard,
  InstalmentCard,
  PaymentConfirmCard,
  PlanCompareCard,
  RefundCard,
  UsageCompareCard,
} from "./BillingCards";
import { FormCard } from "./FormCard";
import { ContactCard, EmergencyCard, HandoffCard, InfoCard, StepsCard, SuccessCard } from "./GeneralCards";
import { OutageCard, SpeedTestCard } from "./ServiceCards";

export function StepCard({ card, live }: { card: FlowCard; live: boolean }) {
  const { conversation } = useAssistant();

  switch (card.kind) {
    case "steps":
      return <StepsCard title={card.title} steps={card.steps} />;
    case "bill":
      return <BillCard />;
    case "payment-confirm":
      return <PaymentConfirmCard />;
    case "bpay":
      return <BpayCard />;
    case "usage-compare":
      return <UsageCompareCard />;
    case "outage-status":
      return <OutageCard service={card.service} />;
    case "speed-test":
      return <SpeedTestCard />;
    case "contact":
      return <ContactCard title={card.title} entries={card.entries} />;
    case "emergency":
      return <EmergencyCard />;
    case "form":
      return <FormCard form={card.form} next={card.next} live={live} />;
    case "plan-compare":
      return <PlanCompareCard />;
    case "extension":
      return <ExtensionCard extendedDue={templateValues(conversation).extendedDue ?? ""} />;
    case "instalment":
      return <InstalmentCard />;
    case "refund":
      return <RefundCard />;
    case "handoff": {
      const summary = conversation.trail
        .map((id) => getNode(id))
        .filter((n) => n && n.topic !== "common")
        .map((n) => n!.title);
      return <HandoffCard summary={summary} />;
    }
    case "info":
      return <InfoCard title={card.title} body={card.body} link={card.link} />;
    case "success":
      return <SuccessCard title={card.title} detail={card.detail} />;
    default: {
      const exhaustive: never = card;
      return exhaustive;
    }
  }
}
