import classNames from "classnames";
import React, { FC } from "react";
import "./index.scss"

export interface ItemListProps {
  children: any;
  items: string[];
  listTitle?: string;
  itemName?: string;
  selectedItem: string;
  onItemAdded: () => void;
  onItemRemoved: () => void;
  onItemSelected: (item: string) => void;
  className?: string;
}

const ItemList: FC<ItemListProps> = ({
  children,
  listTitle,
  itemName,
  onItemAdded,
  onItemRemoved,
  onItemSelected,
  items,
  selectedItem,
  className
}) => {

  return (
    <div className={classNames("item-list", className)}>
      <h2 className="item-list__header">
        { listTitle }
      </h2>
      <div className="item-list__inputs">
        {children}
        <button
          className="item-list__button item-list__button--success"
          onClick={() => onItemAdded()}
        >
          Add { itemName ?? "Item" }
        </button>
        <button
          className="item-list__button item-list__button--error"
          onClick={() => onItemRemoved()}
        >
          Remove { itemName ?? "Item" }
        </button>
      </div>
      <ul className="item-list__list">
        {items && items.length
          ? items.map((item: string) => (
              <li
                onClick={() => onItemSelected(item)}
                key={item}
                className={classNames(
                  "item-list__item",
                  item == selectedItem
                    ? "item-list__item--selected"
                    : null
                )}
              >
                {item}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ItemList;
