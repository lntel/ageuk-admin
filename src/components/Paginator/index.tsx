import classNames from "classnames";
import React, { FC } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export interface PaginatorProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onBack?: () => void;
  onForward?: () => void;
}

const Paginator: FC<PaginatorProps> = ({ className, currentPage, totalPages, onBack, onForward }) => {
  return (
    <div className={classNames("paginator-component", className)}>
        <PaginatorButton type="back" disabled={currentPage == 1} onClick={() => onBack ? onBack() : null} />
        <p className="paginator-component__pages">
            { currentPage } of { totalPages }
        </p>
        <PaginatorButton type="forward" disabled={currentPage == totalPages} onClick={() => onForward ? onForward() : null} />
    </div>
  );
};

export type PaginatorButtonType = "back" | "forward";
export interface PaginatorButtonProps {
  type: PaginatorButtonType;
  disabled?: boolean;
  onClick?: () => void;
}

export const PaginatorButton: FC<PaginatorButtonProps> = ({
  type,
  disabled,
  onClick,
}) => {
  return (
    <button
      className="paginator-component__button"
      disabled={disabled}
      onClick={() => onClick ? onClick() : null}
    >
      {type == "back" ? <MdChevronLeft /> : <MdChevronRight />}
      <p className="paginator-component__button__text">{type == "back" ? "Prev" : "Next"}</p>
    </button>
  );
};

export default Paginator;
