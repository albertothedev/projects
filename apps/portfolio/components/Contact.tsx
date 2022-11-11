import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";

const Contact = (): JSX.Element => {
  const [value, setValue] = useState<string | null>("Send");

  function submit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    setValue(null);

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      subject: { value: string };
      message: { value: string };
    };

    const data: Contact = {
      name: target.name.value,
      email: target.name.value,
      subject: target.subject.value,
      message: target.message.value,
    };

    axios
      .post(`/api/contact`, { data })
      .then(() => setValue("Email sent!"))
      .catch((error: AxiosError) => console.error(error));
  }

  return (
    <form onSubmit={submit} className="contact">
      <h1 className="contact__title">Get in touch</h1>

      <div className="contact__links">
        <a
          href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
          className="contact__links__link"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          <span className="sr-only">LinkedIn profile</span>
        </a>
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_URL}
          className="contact__links__link"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
          <span className="sr-only">GitHub Profile</span>
        </a>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ACCOUNT}`}
          className="contact__links__link"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelopeSquare} />
          <span className="sr-only">Open email</span>
        </a>
      </div>

      <span className="contact__separator">OR</span>

      <div className="contact__info">
        <div className="contact__info__name">
          <label htmlFor="name" className="contact__info__name__label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact__info__name__input"
            required
          />
        </div>

        <div className="contact__info__subject">
          <label htmlFor="subject" className="contact__info__subject__label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="contact__info__subject__input"
            required
          />
        </div>

        <div className="contact__info__email">
          <label htmlFor="email" className="contact__info__email__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="contact__info__email__input"
            required
          />
        </div>
      </div>

      <div className="contact__message">
        <label htmlFor="message" className="contact__message__label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={10}
          cols={50}
          className="contact__message__input"
          required
        ></textarea>
      </div>

      {value ? (
        <button className="contact__submit">{value}</button>
      ) : (
        <div className="contact__loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Contact;
