import { TRELLO_CARDS, type TrelloCard, type TrelloList } from "@/data/trello";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-trello";

export function readCards(): TrelloCard[] {
  return readCollection(KEY, TRELLO_CARDS);
}

export function writeCards(cards: TrelloCard[]): void {
  writeCollection(KEY, cards);
}

export function moveCard(id: string, list: TrelloList): TrelloCard[] {
  const next = readCards().map((card) => (card.id === id ? { ...card, list } : card));
  writeCards(next);
  return next;
}
