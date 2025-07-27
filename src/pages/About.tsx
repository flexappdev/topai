import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const About = () => {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => setReadmeContent(text));
  }, []);

  return (
    <div className="p-4">
      <ReactMarkdown>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default About;
