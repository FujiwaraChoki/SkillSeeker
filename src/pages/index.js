import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [qualities, setQualities] = useState(['']);
  const [openAIKey, setOpenAIKey] = useState('');

  const router = useRouter();

  const handleQualityChange = (index, value) => {
    const updatedQualities = [...qualities];
    updatedQualities[index] = value;
    setQualities(updatedQualities);
  };

  const handleAddQuality = () => {
    setQualities([...qualities, '']);
  };

  const handleRemoveQuality = (index) => {
    const updatedQualities = [...qualities];
    updatedQualities.splice(index, 1);
    setQualities(updatedQualities);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const startInterview = () => {
    const qualitiesString = qualities.join(',');
    const encodedJobTitle = encodeURIComponent(jobTitle);
    // Base64 encode api key
    const encodedOpenAIKey = btoa(openAIKey);
    router.push(`/interview?jobTitle=${encodedJobTitle}&qualities=${qualitiesString}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('apiKey', encodedOpenAIKey);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl text-center font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }}
      >
        SkillSeeker.ai{' '}
        <span role="img" aria-label="AI Emoji">
          🤖
        </span>
      </motion.h1>

      <motion.p
        className="text-xl text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
      >
        SkillSeeker.ai is a tool that helps you find the best candidates for your job openings.
      </motion.p>

      <motion.h2
        className="text-2xl text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
      >
        What is the job-title{' '}
        <span role="img" aria-label="Quality Emoji">
          ❓
        </span>
      </motion.h2>

      <input
        type="text"
        className="mb-6 w-full p-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter a job-title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <motion.h2
        className="text-2xl text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
      >
        What is your OpenAI API key (dont worry, it's encoded){' '}
        <span role="img" aria-label="Quality Emoji">
          ❓
        </span>
      </motion.h2>

      <input
        type="password"
        className="mb-6 w-full p-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your OpenAI API key..."
        value={openAIKey}
        onChange={(e) => setOpenAIKey(e.target.value)}
      />

      <motion.h2
        className="text-2xl text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
      >
        What qualities would you like to have in your employee{' '}
        <span role="img" aria-label="Quality Emoji">
          ❓
        </span>
      </motion.h2>

      {qualities.map((quality, index) => (
        <motion.div
          key={index}
          className="flex items-center mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            type="text"
            className="w-full p-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a quality"
            value={quality}
            onChange={(e) => handleQualityChange(index, e.target.value)}
          />
          {index === qualities.length - 1 ? (
            <motion.span
              className="text-2xl cursor-pointer"
              onClick={handleAddQuality}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <span role="img" aria-label="Plus Sign Emoji">
                ➕
              </span>
            </motion.span>
          ) : (
            <motion.span
              className="text-2xl cursor-pointer"
              onClick={() => handleRemoveQuality(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <span role="img" aria-label="Minus Sign Emoji">
                ➖
              </span>
            </motion.span>
          )}
        </motion.div>
      ))}

      <motion.button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.3 } }}
        onClick={startInterview}
      >
        Start Interview{' '}
        <span role="img" aria-label="Submit Emoji">
          🚀
        </span>
      </motion.button>
    </div>
  );
};

export default HomePage;
