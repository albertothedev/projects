type Props = {
  message: string;
};

export default function Modal(props: Props) {
  return (
    <div className="modal">
      <span className="modal__message">{props.message}</span>
    </div>
  );
}
