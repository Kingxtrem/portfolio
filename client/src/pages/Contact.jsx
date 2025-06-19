import React from 'react';

const Contact = () => {
  return (
    <main className="max-w-xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Contact</h1>
      <p className="mb-6 text-gray-700">
        Feel free to reach out for collaborations, project inquiries, or just to say hello!
      </p>
      <div className="space-y-3 text-gray-800">
        <div>
          <span className="font-semibold">Email:</span>{' '}
          <a
            href="mailto:tantubaykingshuk@gmail.com"
            className="text-blue-600 hover:underline"
          >
            tantubaykingshuk@gmail.com
          </a>
        </div>
        <div>
          <span className="font-semibold">LinkedIn:</span>{' '}
          <a
            href="https://www.linkedin.com/in/kingshuk-tantubay/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.linkedin.com/in/kingshuk-tantubay/
          </a>
        </div>
        <div>
          <span className="font-semibold">GitHub:</span>{' '}
          <a
            href="https://github.com/Kingxtrem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/Kingxtrem
          </a>
        </div>
      </div>
    </main>
  );
};

export default Contact