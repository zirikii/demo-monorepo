import { useState, type DragEvent } from "react";
import { ProductLayout } from "@/components/product/ProductLayout";
import { getProductApp } from "@/data/apps";
import { TRELLO_BOARD, TRELLO_LISTS, type TrelloList } from "@/data/trello";
import { moveCard, readCards } from "@/lib/trello";

const APP = getProductApp("trello");
const NAV = [{ label: "Board", to: "/trello", end: true }];

export default function TrelloBoardPage() {
  const [cards, setCards] = useState(readCards);

  function onDrop(list: TrelloList, event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (!id) return;
    setCards(moveCard(id, list));
  }

  return (
    <ProductLayout app={APP} title={`${TRELLO_BOARD.name} · Trello`} nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">{TRELLO_BOARD.name}</h1>
      <p className="mt-1 text-sm text-ink-soft">{TRELLO_BOARD.workspace}</p>
      <div className="mt-5 flex items-start gap-3 overflow-x-auto pb-4">
        {TRELLO_LISTS.map((list) => {
          const columnCards = cards.filter((card) => card.list === list);
          return (
            <section
              key={list}
              aria-label={list}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => onDrop(list, event)}
              className="w-64 shrink-0 rounded-atl-lg bg-surface-deep p-2"
            >
              <h2 className="px-2 py-1.5 text-sm font-extrabold text-ink-strong">{list}</h2>
              <ul className="flex flex-col gap-2">
                {columnCards.map((card) => (
                  <li key={card.id}>
                    <article
                      aria-label={card.title}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", card.id);
                        event.dataTransfer.effectAllowed = "move";
                      }}
                      className="rounded-atl-lg border border-line-soft bg-white px-3 py-2.5 shadow-atl"
                    >
                      <p className="text-sm font-semibold text-ink-strong">{card.title}</p>
                      {card.labels.length > 0 ? (
                        <p className="mt-2 flex flex-wrap gap-1">
                          {card.labels.map((label) => (
                            <span
                              key={label}
                              className="rounded-atl bg-atl-tint px-1.5 py-0.5 text-[0.65rem] font-bold text-atl-blue uppercase"
                            >
                              {label}
                            </span>
                          ))}
                        </p>
                      ) : null}
                      <label className="mt-3 block text-xs font-semibold text-ink-faint" htmlFor={`move-${card.id}`}>
                        Move to
                      </label>
                      <select
                        id={`move-${card.id}`}
                        aria-label={`Move ${card.title}`}
                        value={card.list}
                        onChange={(event) => setCards(moveCard(card.id, event.target.value as TrelloList))}
                        className="focus-atl mt-1 h-8 w-full rounded-atl border border-line bg-white px-2 text-sm"
                      >
                        {TRELLO_LISTS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </ProductLayout>
  );
}
