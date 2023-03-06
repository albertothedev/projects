import Image from "next/future/image";

import react from "public/static/react.svg";
import vue from "public/static/vue.svg";
import nodejs from "public/static/nodejs.svg";
import mongodb from "public/static/mongodb.svg";
import mysql from "public/static/mysql.svg";
import firebase from "public/static/firebase.svg";
import sass from "public/static/sass.svg";
import docker from "public/static/docker.svg";
import aws from "public/static/aws.svg";
import express from "public/static/express.svg";
import typescript from "public/static/typescript.svg";

const About = (): JSX.Element => (
  <div className="about">
    <h1 className="about__title">Nice to meet you!</h1>

    <p className="about__description">
      I&apos;m a full-stack developer with a passion for learning new things. I
      build web applications using popular frameworks such as React and Vue for
      the frontend and Express for the backend, with TypeScript across the
      board. When a database is required, I use MySQL for relational data and
      MongoDB or Firebase as non-relational alternatives. I containerize all of
      my apps with Docker to simplify the development process and deploy
      everything on AWS.
    </p>

    <div className="about__skills">
      <Image
        className="about__skills__skill"
        src={sass}
        alt="Sass logo"
        title="Sass"
      />

      <Image
        className="about__skills__skill"
        src={react}
        alt="React logo"
        title="React"
      />

      <Image
        className="about__skills__skill"
        src={vue}
        alt="Vue logo"
        title="Vue"
      />

      <Image
        className="about__skills__skill"
        src={typescript}
        alt="TypeScript logo"
        title="TypeScript"
      />

      <Image
        className="about__skills__skill"
        src={nodejs}
        alt="NodeJS logo"
        title="NodeJS"
      />

      <Image
        className="about__skills__skill"
        src={express}
        alt="Express logo"
        title="Express"
      />

      <Image
        className="about__skills__skill"
        src={mysql}
        alt="MySQL logo"
        title="MySQL"
      />

      <Image
        className="about__skills__skill"
        src={mongodb}
        alt="MongoDB logo"
        title="MongoDB"
      />

      <Image
        className="about__skills__skill"
        src={firebase}
        alt="Firebase logo"
        title="Firebase"
      />

      <Image
        className="about__skills__skill"
        src={docker}
        alt="Docker logo"
        title="Docker"
      />

      <Image
        className="about__skills__skill"
        src={aws}
        alt="AWS logo"
        title="AWS"
      />
    </div>
  </div>
);

export default About;
