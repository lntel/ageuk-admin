import classNames from "classnames";
import React, { FC } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export interface PaginatorProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onBack?: () => void;
  onForward?: () => void;
  onComplete?: () => void;
  finishBtnName?: string;
  finishBtnIcon?: React.ReactElement;
}

const Paginator: FC<PaginatorProps> = ({
  className,
  currentPage,
  totalPages,
  onBack,
  onForward,
  onComplete,
  finishBtnName,
}) => {
  const handleForward = () => {

    console.log(currentPage)

    if(currentPage === totalPages && onComplete)
      return onComplete();

    if (!onForward || !totalPages) return;

    if (currentPage === totalPages) return;

    onForward();
  };

  const handleBackward = () => {
    if (!onBack || !totalPages) return;

    if (currentPage === 1) return;

    onBack();
  };

  return (
    <div className={classNames("paginator-component", className)}>
      <PaginatorButton
        type="back"
        disabled={currentPage == 1}
        onClick={() => handleBackward()}
        iconDisabled={false}
      />
      <p className="paginator-component__pages">
        {currentPage} of {totalPages >= 1 ? totalPages : 1}
      </p>
      <PaginatorButton
        type="forward"
        disabled={currentPage === totalPages && !onComplete}
        onClick={() => handleForward()}
        value={currentPage === totalPages ? finishBtnName : "Next"}
        iconDisabled={currentPage === totalPages}
      />
    </div>
  );
};

export type PaginatorButtonType = "back" | "forward";
export interface PaginatorButtonProps {
  type: PaginatorButtonType;
  disabled?: boolean;
  onClick?: () => void;
  value?: string;
  iconDisabled: boolean;
}

export const PaginatorButton: FC<PaginatorButtonProps> = ({
  type,
  disabled,
  onClick,
  value,
  iconDisabled,
}) => {
  return (
    <button
      className="paginator-component__button"
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
    >
      {type == "back" ? <MdChevronLeft /> : null}
      <p className="paginator-component__button__text">
        {type == "back" ? "Prev" : value ? value : "Next"}
      </p>
      {type == "forward" && !iconDisabled ? <MdChevronRight /> : null}
    </button>
  );
};

export default Paginator;
