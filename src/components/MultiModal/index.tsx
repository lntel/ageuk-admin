import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ReactModal from "react-modal";
import Paginator from "../Paginator";
import "./index.scss";

export interface MultiModalPage {
    header: string;
    component: React.ReactNode;
}

export interface MultiModalProps {
  visible: boolean;
  pages: MultiModalPage[];
  onClose: () => void;
  className?: string;
}

const MultiModal: FC<MultiModalProps> = ({
  visible,
  pages,
  onClose,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [page, setPage] = useState<MultiModalPage>();

  useEffect(() => {
    setPage(pages[currentPage - 1]);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ReactModal
      isOpen={visible}
      className="multimodal"
      overlayClassName="modal-overlay"
    >
      <div className="multimodal__header">
        <h1 className="multimodal__header__text">{ page?.header }</h1>
        <MdClose
          className="multimodal__header__close"
          onClick={() => onClose()}
        />
      </div>
      <div className={className}>{ page?.component }</div>
      <Paginator
        currentPage={currentPage}
        totalPages={pages.length}
        onForward={() => nextPage()}
        onBack={() => prevPage()}
      />
    </ReactModal>
  );
};

export default MultiModal;
