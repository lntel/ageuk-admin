import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ReactModal from "react-modal";
import Paginator from "../Paginator";
import "./index.scss";

export interface MultiModalPage {
    header: string;
    component: React.ReactNode;
    className?: string;
}

export interface MultiModalProps {
  visible: boolean;
  pages: MultiModalPage[];
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  children?: any;
}

// ? potentially add a required callback for incomplete data fields etc?

const MultiModal: FC<MultiModalProps> = ({
  visible,
  pages,
  onClose,
  className,
  overlayClassName,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {

    if(!pages.length)
      return console.error("Multimodal must have at least one page");

  }, []);
  

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ReactModal
      isOpen={visible}
      className={classNames("multimodal", pages[currentPage - 1].className, overlayClassName)}
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="multimodal__header">
        <h1 className="multimodal__header__text">{ pages.length ? pages[currentPage - 1].header : null }</h1>
        <MdClose
          className="multimodal__header__close"
          onClick={() => onClose()}
        />
      </div>
      <div className={className}>{ pages.length ? pages[currentPage - 1].component : null }</div>
      { pages.length > 1 ? (
        <Paginator
          className="multimodal__paginator"
          currentPage={currentPage}
          totalPages={pages.length}
          onForward={() => nextPage()}
          onBack={() => prevPage()}
        />
      ) : null }

    </ReactModal>
  );
};

export default MultiModal;
