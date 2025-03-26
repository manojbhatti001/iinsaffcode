import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: 'What is the process for registering as a news reporter on the iinsaf platform?',
            answer: 'To register as a news reporter on iinsaf, simply visit our website and navigate to the registration page. Fill out the required information, including your credentials, experience, and sample work if applicable.',
        },
        {
            question: 'What are the criteria for becoming a news reporter with iinsaf?',
            answer: 'We welcome individuals with a background in journalism, a passion for storytelling, and a commitment to ethical reporting. Previous experience or relevant qualifications are preferred but not mandatory.',
        },
        {
            question: 'How does iinsaf verify the authenticity and credibility of news reporters?',
            answer: 'We verify the credentials of news reporters through a thorough review process, which may include verifying past work, conducting interviews, and assessing the quality of content produced.',
        },
        {
            question: 'Can freelance news reporters join the iinsaf platform?',
            answer: 'Yes, freelance news reporters are welcome to join iinsaf. We value diversity in our reporting team and encourage individuals from all backgrounds to contribute.',
        },
        {
            question: 'What types of news content are accepted on iinsaf?',
            answer: 'We accept a wide range of news content, including but not limited to current events, investigative reports, human interest stories, news, and opinion pieces.',
        },
        {
            question: 'How can advertisers register and join the iinsaf platform to promote their products or services?',
            answer: 'Advertisers can register on the iinsaf platform by visiting our website and filling out the registration form for advertisers.',
        },
        {
            question: 'What are the criteria for advertisers to partner with iinsaf for advertising purposes?',
            answer: 'We welcome advertisers who offer products or services that align with our audience and values. Advertisers must comply with our advertising guidelines and adhere to ethical standards.',
        },
        {
            question: 'What types of advertising formats are available for advertisers on iinsaf?',
            answer: 'Advertisers can choose from various advertising formats, including display ads, sponsored content, video ads, and native advertising.',
        },
        {
            question: 'Is there a minimum budget requirement for advertising campaigns on iinsaf?',
            answer: 'There is no minimum budget requirement for advertising campaigns on iinsaf. Advertisers can customize their campaigns based on their budget and objectives.',
        },
        {
            question: 'How does iinsaf ensure that advertisements reach the desired audience effectively?',
            answer: 'We utilize advanced targeting tools and algorithms to ensure that advertisements reach the relevant audience based on demographics, interests, and browsing behavior.',
        },
    ];


    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-4/5 mx-auto mt-10 p-4 mt-40 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <ul className='mb-28'>
                {faqData.map((faq, index) => (
                    <li key={index} className="mb-10 mt-10 shadow-lg border">
                        <div
                            className="flex justify-between items-center cursor-pointer p-4 rounded-md shadow-md hover:bg-gray-200 transition duration-200"
                            onClick={() => handleToggle(index)}
                        >
                            <span className="text-xl font-semibold text-gray-700">{faq.question}</span>
                            <span
                                className={`transform transition-transform duration-400 ${activeIndex === index ? 'rotate-180' : 'rotate-0'
                                    }`}
                            >
                                {activeIndex === index ? (
                                    <FontAwesomeIcon icon={faMinus} />
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} />
                                )}
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-1000 ease-in-out ${activeIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-b-md text-2xl">
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default FaqSection;
