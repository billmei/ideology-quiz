import React, { useState } from 'react';

// Data structure for quiz questions
const quizData = [
  {
    id: 1,
    question: "When your political party takes a position you disagree with, you most likely:",
    options: [
      { text: "Maintain your original position, even if it means disagreeing with your party", score: 10 },
      { text: "Consider both perspectives and find a middle ground", score: 5 },
      { text: "Reconsider your position to align with your party's stance", score: 0 }
    ]
  },
  {
    id: 2,
    question: "When a respected leader in your community changes their mind on an issue:",
    options: [
      { text: "You evaluate their new position based on its merits, regardless of your relationship with them", score: 10 },
      { text: "You consider their reasoning but also maintain your own analysis", score: 5 },
      { text: "You're inclined to follow their new position because you trust their judgment", score: 0 }
    ]
  },
  {
    id: 3,
    question: "You discover that a historical figure you admire held some beliefs you find objectionable. You:",
    options: [
      { text: "Acknowledge their flaws while separating their good ideas from the bad", score: 10 },
      { text: "Reassess their overall contribution considering both the good and bad", score: 5 },
      { text: "Tend to defend them or downplay these aspects to preserve their overall legacy", score: 0 }
    ]
  },
  {
    id: 4,
    question: "When voting in elections, what matters most to you?",
    options: [
      { text: "The specific policy positions of each candidate", score: 10 },
      { text: "A balance of the candidate's positions and their affiliations", score: 5 },
      { text: "The party or group the candidate represents", score: 0 }
    ]
  },
  {
    id: 5,
    question: "Your close friend makes an argument that contradicts your deeply held beliefs. You:",
    options: [
      { text: "Respectfully disagree and explain why you can't support their position", score: 10 },
      { text: "Listen carefully and consider whether they have valid points", score: 5 },
      { text: "Find ways to see their perspective to maintain your friendship", score: 0 }
    ]
  },
  {
    id: 6,
    question: "If presented with compelling evidence against a belief you hold strongly:",
    options: [
      { text: "You would change your position based on the evidence, regardless of what others think", score: 10 },
      { text: "You would carefully consider it, but also consult with people you respect", score: 5 },
      { text: "You would seek additional opinions from people you trust before changing your view", score: 0 }
    ]
  },
  {
    id: 7,
    question: "If members of your community engaged in behavior you consider unethical, you would:",
    options: [
      { text: "Speak out against it, even if it makes you unpopular", score: 10 },
      { text: "Express concerns privately or in a constructive manner", score: 5 },
      { text: "Consider the context and avoid opposing them unless the acts were egregious", score: 0 }
    ]
  },
  {
    id: 8,
    question: "You're more comfortable with people who:",
    options: [
      { text: "Share your core values, even if they come from different backgrounds", score: 10 },
      { text: "Have a mix of similarities and differences with you", score: 5 },
      { text: "Share your background and identity, even if you disagree on some issues", score: 0 }
    ]
  },
  {
    id: 9,
    question: "When your political allies use tactics you find questionable to achieve goals you support:",
    options: [
      { text: "You criticize the tactics, even if it means undermining the goal", score: 10 },
      { text: "You express concerns while still supporting the broader effort", score: 5 },
      { text: "You focus on the importance of the goal rather than the tactics", score: 0 }
    ]
  },
  {
    id: 10,
    question: "Your approach to compromise is best described as:",
    options: [
      { text: "You're willing to compromise on practical details but not on core principles", score: 10 },
      { text: "You're selective about when to compromise based on the situation", score: 5 },
      { text: "You're willing to compromise on principles if it strengthens your group's position", score: 0 }
    ]
  }
];

// Result interpretations
const getResultInterpretation = (score) => {
  const percentage = (score / 100) * 100;
  
  if (percentage >= 80) {
    return "Strongly Ideological: You prioritize principles and ideas over group loyalty. You're willing to stand alone for what you believe is right, even throwing your close friends and associates under the bus to accomplish your moral goals.";
  } else if (percentage >= 60) {
    return "Moderately Ideological: You generally value principles over group loyalty, but recognize the importance of community and relationships. However, you may struggle to form deep connections with others due to your tendency to prioritize your own moral compass over their feelings and needs.";
  } else if (percentage >= 40) {
    return "Balanced: You strike a balance between ideological principles and group loyalty, adapting your approach based on the situation. However, this flexibility can sometimes lead to inconsistent decision-making and a lack of clear personal values.";
  } else if (percentage >= 20) {
    return "Moderately Tribal: You value group cohesion and loyalty, though you still maintain some independent principles. However, you may find yourself compromising your own values and morals to avoid conflict or maintain social status within your group.";
  } else {
    return "Strongly Tribal: You prioritize group loyalty and cohesion above abstract principles. You have strong and rewarding relationships, however you may sacrifice your own moral compass to avoid conflict within your group.";
  }
};

// Component for individual answer options
const AnswerOption = ({ option, onSelect, isSelected }) => (
  <div 
    className={`p-3 my-2 border rounded cursor-pointer transition-colors ${
      isSelected ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
    }`}
    onClick={() => onSelect(option.score)}
  >
    {option.text}
  </div>
);

// Component for displaying questions
const Question = ({ question, options, onAnswer, selectedAnswer }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{question}</h2>
    <div>
      {options.map((option, index) => (
        <AnswerOption
          key={index}
          option={option}
          onSelect={onAnswer}
          isSelected={selectedAnswer === option.score}
        />
      ))}
    </div>
  </div>
);

// Progress bar component
const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div 
      className="bg-blue-600 h-2.5 rounded-full" 
      style={{ width: `${(current / total) * 100}%` }}
    ></div>
  </div>
);

// Results component
const Results = ({ score }) => {
  const percentage = (score / 100) * 100;
  const interpretation = getResultInterpretation(score);
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Your Result</h2>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div 
          className="bg-gradient-to-r from-red-500 to-blue-500 h-4 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm mb-6">
        <span>Tribal</span>
        <span>Ideological</span>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg mb-4">
        <p className="text-xl font-semibold mb-2">
          Score: {score} out of 100 ({percentage}%)
        </p>
        <p className="mb-2 font-medium">
          {percentage >= 50 ? 
            `You lean ${percentage >= 75 ? 'strongly' : 'somewhat'} toward Ideological` : 
            `You lean ${percentage <= 25 ? 'strongly' : 'somewhat'} toward Tribal`}
        </p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg text-left">
        <h3 className="font-semibold mb-2">What This Means:</h3>
        <p>{interpretation}</p>
      </div>
      
    </div>
  );
};

// Main Quiz component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const calculateScore = () => {
    // Filter out any null answers, sum them up, and get the average on a 0-100 scale
    const validAnswers = answers.filter(answer => answer !== null);
    return validAnswers.reduce((sum, score) => sum + score, 0) / validAnswers.length * 10;
  };
  
  if (showResults) {
    return <Results score={calculateScore()} />;
  }
  
  const currentQuizData = quizData[currentQuestion];
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressBar current={currentQuestion + 1} total={quizData.length} />
      
      <div className="mb-2 text-sm text-gray-500">
        Question {currentQuestion + 1} of {quizData.length}
      </div>
      
      <Question
        question={currentQuizData.question}
        options={currentQuizData.options}
        onAnswer={handleAnswer}
        selectedAnswer={answers[currentQuestion]}
      />
      
      <div className="flex justify-between">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded ${
            currentQuestion === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={goToNextQuestion}
          disabled={answers[currentQuestion] === null}
          className={`px-4 py-2 rounded ${
            answers[currentQuestion] === null
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {currentQuestion === quizData.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
};

// App component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center">
            Are you more ideological or more tribal?
          </h1>
        </div>
        
        <div className="p-6">
          <Quiz />
        </div>
      </div>
    </div>
  );
};

export default App;