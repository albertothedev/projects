import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Image, { type StaticImageData } from "next/future/image";

type props = {
  image: StaticImageData;
  links: {
    demo: string;
    source: string;
  };
  longDesc: string;
  onClick: () => void;
};

const Modal = (props: props) => (
  <div
    className="modal"
    onClick={props.onClick}
    onKeyDown={props.onClick}
    role="button"
    tabIndex={0}
  >
    <div
      className="modal__content"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="button"
      tabIndex={0}
    >
      <div className="modal__content__howItWorks">
        <h1 className="modal__content__howItWorks__title">How it works</h1>

        <div className="modal__content__howItWorks__preview">
          <Image
            src={props.image}
            alt="Picture"
            className="modal__content__howItWorks__preview__image"
          />

          <div className="modal__content__howItWorks__preview__links">
            <a
              className="modal__content__howItWorks__preview__links__link"
              href={props.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Go to demo
            </a>
            <a
              className="modal__content__howItWorks__preview__links__link"
              href={props.links.source}
              target="_blank"
              rel="noreferrer"
            >
              View source
            </a>
          </div>
        </div>

        <p className="modal__content__howItWorks__description">
          {props.longDesc}
        </p>
      </div>

      <button className="modal__content__close" onClick={props.onClick}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  </div>
);

export default Modal;
