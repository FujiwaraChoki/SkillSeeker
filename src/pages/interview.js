import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Interview = () => {
    const router = useRouter();
    const jobTitle = router.query.jobTitle || '';
    const qualities = router.query.qualities?.split(',') || [];
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [apiKey, setApiKey] = useState();

    let {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        if (localStorage.getItem('apiKey')) {
            setApiKey(localStorage.getItem('apiKey'));
        } else {
            alert('API Key not found. Please provide an API Key.');
        }

        if (!apiKey) {
            // If apiKey is not available, handle it accordingly (e.g., show a message)
            toast.error('API Key not found. Please provide an API Key.');
            setIsLoading(false); // Set loading to false
            return;
        }

        // Fetch questions when apiKey is available
        if (questions.length === 0) {
            const generateQuestions = async () => {
                try {
                    const response = await fetch('/api/genQuestions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            jobTitle,
                            qualities,
                            apiKey: atob(apiKey),
                        }),
                    });

                    const generatedQuestions = await response.json();
                    setQuestions(generatedQuestions);
                    setIsLoading(false); // Set loading to false when questions are loaded
                } catch (error) {
                    console.error(error);
                    setIsLoading(false); // Set loading to false in case of an error
                }
            };

            generateQuestions();
        }
    }, [apiKey, jobTitle, qualities, questions]);

    const handleSaveAnswer = () => {
        const answer = transcript;
        setUserAnswers((prevUserAnswers) => [
            ...prevUserAnswers,
            { question: currentQuestion, answer: answer },
        ]);

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

        console.log('User Answers', userAnswers);
    };

    const handleNextQuestion = () => {
        if (transcript !== '') {
            handleSaveAnswer();
            resetTranscript(); // Reset transcript after saving answer
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (isLoading) {
        // Display a loading animation while questions are being generated
        return (
            <div className="text-center">
                <motion.div
                    className="spinner" // You can style this spinner as needed
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Loading...
                </motion.div>
            </div>
        );
    }

    if (!browserSupportsSpeechRecognition) {
        // return centered image
        return (
            <>
                <img src="/not-supported.png" className="mx-auto m-10" />
                <h1 className="text-3xl text-center font-bold mb-4">
                    Your browser does not support Speech Recognition{' '}
                    <span role="img" aria-label="Sad Emoji">
                        😢
                    </span>
                </h1>
            </>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 5000,
                }}
            />
            <h1 className="text-3xl text-center font-bold mb-4">
                A.I. Recruiter Interview{' '}
                <span role="img" aria-label="AI Emoji">
                    🎙️
                </span>
            </h1>
            <h2 className="text-2xl text-center mb-4">
                Answer the following questions:{' '}
                <span role="img" aria-label="Question Emoji">
                    ❓
                </span>
            </h2>

            <div className="flex justify-between items-center mb-4">
                {currentQuestionIndex > 0 && (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handlePreviousQuestion}
                    >
                        Previous
                    </button>
                )}

                <div className="flex items-center">
                    <div
                        className={`h-4 w-4 rounded-full mr-2 ${listening ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                            }`}
                    ></div>
                    <p className="text-sm font-bold">Microphone: {listening ? 'On' : 'Off'}</p>
                </div>

                {currentQuestionIndex < questions.length - 1 && (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleNextQuestion}
                    >
                        Next
                    </button>
                )}
            </div>

            {currentQuestion && (
                <motion.div
                    className="flex items-center mb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <label className="font-bold text-lg mr-2" htmlFor="questionInput">
                        {currentQuestion}
                    </label>
                    {!userAnswers[currentQuestionIndex] ? (
                        <button
                            className="text-blue-500 hover:text-blue-600 cursor-pointer"
                            onClick={SpeechRecognition.startListening}
                        >
                            🎤
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                            onClick={handleSaveAnswer}
                        >
                            Save Answer
                        </button>
                    )}
                </motion.div>
            )}

            <input
                type="text"
                className="mb-6 w-full p-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="questionInput"
                placeholder="Start speaking to see your answer here..."
                value={transcript}
                readOnly
            />

            <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.3 } }}
                disabled={currentQuestionIndex < questions.length - 1 || userAnswers.length === 0}
            >
                Submit{' '}
                <span role="img" aria-label="Submit Emoji">
                    🚀
                </span>
            </motion.button>

            <div className="flex justify-between items-center mt-4 w-min space-x-3">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={SpeechRecognition.startListening}
                >
                    ▶️
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={SpeechRecognition.stopListening}
                >
                    ⏸️
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={resetTranscript}
                >
                    🔄
                </button>
            </div>
        </div>
    );
};

export default Interview;
