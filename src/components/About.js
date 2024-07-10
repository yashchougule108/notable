import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaCode } from 'react-icons/fa';
import './about.css';

const socialLinks = [
  {
    icon: <FaLinkedin />,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/yash-chougule-70741423b',
  },
  {
    icon: <FaGithub />,
    name: 'GitHub',
    url: 'https://github.com/yashchougule108',
  },
];

const About = () => {
  return (
    <div className="futuristic-template">
      <h2>About Me</h2>
      <p>Hii I am Yash Chougule following are my profile links</p>

      <div className="links-container">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item"
          >
            <div className="link-icon">{link.icon}</div>
            <div className="link-name">{link.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default About;

/*
  const a = useContext(noteContext)
  // now we will use it here to update 
  useEffect (()=>{
    a.update();
  } , [])

  {a.state.name} and he is in {a.state.class}
*/