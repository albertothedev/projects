import type { NextPage } from "next";
import { useState } from "react";

import About from "components/About";
import Projects from "components/Projects";
import Contact from "components/Contact";
import Modal from "components/Modal";

const Home: NextPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="app">
      <About />
      <Projects setSelectedProject={setSelectedProject} />
      <Contact />
      {selectedProject && (
        <Modal
          longDesc={selectedProject.longDesc}
          image={selectedProject.image}
          links={selectedProject.links}
          onClick={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Home;
