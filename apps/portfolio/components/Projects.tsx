import Image from "next/future/image";

import snake from "public/static/snake.webp";
import minesweeper from "public/static/minesweeper.webp";
import loldata from "public/static/loldata.webp";
import taskout from "public/static/taskout.webp";

type Props = {
  setSelectedProject: (project: Project) => void;
};

const Projects = (props: Props): JSX.Element => {
  const projects: Array<Project> = [
    {
      name: "Minesweeper",
      image: minesweeper,
      shortDesc: "Minesweeper clone built with Vue, Express, and MongoDB.",
      longDesc:
        "The board is an array of objects with mines randomly assigned. On left click, the cell opens and displays the number of nearby mines or, if there aren’t any, the nearby cells will be recursively opened. If the cell is mined it is game over. On right click, a flag is either placed or removed from the cell. On every action the victory conditions are checked and, if met, the game ends and the score is submitted to the database. Redux allows the leaderboard to be updated when a new game is added. The backend uses Passport with Local and JWT strategies to register and log in the user, Mongoose to interact with the database and Bcrypt to hash and compare passwords. The database is hosted on MongoDB Atlas and it’s made up of two collections: 'users' and 'games'.",
      links: {
        demo: process.env.NEXT_PUBLIC_MINESWEEPER_UI_URL,
        source: process.env.NEXT_PUBLIC_MINESWEEPER_SOURCE_URL,
      },
    },
    {
      name: "Loldata",
      image: loldata,
      shortDesc:
        "Stats and analytics app built using React, Express, and the Riot API.",
      longDesc:
        "Routing is handled with react-router and state management with react-redux. The 'champions' page lists all champions and their details, such as skins, lore, and abilities with a modal. This information is taken from the API on load time and by default is in English, but there’s a language selector that triggers another request to the server. The 'players' page displays information from a player, such as level, most played champions, current leagues, and recent match history. Besides fetching the data from the APIs, it also sanitizes and structures it. It uses Riot’s APIs, CommunityDragon and DataDragon, and static assets.",
      links: {
        demo: process.env.NEXT_PUBLIC_LOLDATA_UI_URL,
        source: process.env.NEXT_PUBLIC_LOLDATA_SOURCE_URL,
      },
    },
    {
      name: "Taskout",
      image: taskout,
      shortDesc: "Task app built with Vue, Express, and MySQL.",
      longDesc:
        "On the frontend, routing is handled with vue-router and state management with vuex. The backend uses Passport with Local and JWT strategies to handle user authentication and route authorization, Nodemailer for email sending, Sequelize to interact with the database, and Bcrypt to hash and compare passwords. Signing up creates an unconfirmed user on the database and sends an email to the user with a confirmation link. This link has a JWT token set to expire in 10 minutes on its URL and upon clicking on it they are sent to a route that checks the token, updates the user on the database to appear confirmed, creates a cookie with another permanent token, and redirects the user to the dashboard. The user can also try out the app without registering, which creates a dummy account and logs the user in immediately.",

      links: {
        demo: process.env.NEXT_PUBLIC_TASKOUT_UI_URL,
        source: process.env.NEXT_PUBLIC_TASKOUT_SOURCE_URL,
      },
    },
    {
      name: "Snake",
      image: snake,
      shortDesc: "Snake clone built React, Express, and Firebase.",
      longDesc:
        "When the user clicks 'start', an array of 1000 objects is generated, each one representing a 'pixel' on the board, and a function is called every 150ms that moves the snake and checks if it has crashed or eaten. The Leaderboard component can be filtered via date and it is connected to the Game component with Redux so it can be updated when the player submits their score. The database consists of a Firebase Firestore collection.",
      links: {
        demo: process.env.NEXT_PUBLIC_SNAKE_UI_URL,
        source: process.env.NEXT_PUBLIC_SNAKE_SOURCE_URL,
      },
    },
  ];

  return (
    <div className="projects">
      <div className="projects__header">
        <h1 className="projects__header__title">Some of my projects</h1>

        <p className="projects__header__description">
          The frontends are stored on S3 buckets and delivered by CloudFront to
          custom subdomains and the backends run on different ports of an EC2
          instance managed with EBS. They use Docker for local development,
          which creates containers for the frontend and backend and a database
          when necessary.
        </p>
      </div>

      <div className="projects__cards">
        {projects.map(
          (project: Project, index: number): JSX.Element => (
            <div
              className="projects__cards__card"
              onClick={() => props.setSelectedProject(project)}
              onKeyDown={() => props.setSelectedProject(project)}
              role="button"
              tabIndex={0}
              key={index}
            >
              <Image
                className="projects__cards__card__preview"
                src={project.image}
                alt="Picture"
              />
              <h2 className="projects__cards__card__name">{project.name}</h2>
              <p className="projects__cards__card__description">
                {project.shortDesc}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Projects;
