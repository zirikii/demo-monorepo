export const TRELLO_LISTS = ["Inbox", "Doing", "Review", "Done"] as const;

export type TrelloList = (typeof TRELLO_LISTS)[number];

export interface TrelloCard {
  id: string;
  title: string;
  list: TrelloList;
  labels: string[];
}

export const TRELLO_BOARD = {
  name: "Northline launch",
  workspace: "Northline Payments",
} as const;

export const TRELLO_CARDS: TrelloCard[] = [
  {
    id: "press-kit",
    title: "Draft press kit",
    list: "Inbox",
    labels: ["comms"],
  },
  {
    id: "website-qa",
    title: "Website QA for portal v2",
    list: "Doing",
    labels: ["web"],
  },
  {
    id: "partner-email",
    title: "Partner email for Monday push",
    list: "Review",
    labels: ["comms", "partners"],
  },
  {
    id: "logo-lockup",
    title: "Logo lockup approved",
    list: "Done",
    labels: ["design"],
  },
];

export function cardsInList(list: TrelloList, cards = TRELLO_CARDS): TrelloCard[] {
  return cards.filter((card) => card.list === list);
}
