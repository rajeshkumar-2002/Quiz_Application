function About() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card border-0 bg-transparent col-xxl-7 col-xl-8 col-lg-9 col-md-12 col-12">
          <h1 className="fs-2 text-center">About</h1>
          <div className="mt-4">
            <p style={{ textAlign: "justify" }}>
              Welcome to our quiz application! Our platform allows you to create
              custom quizzes, edit them, and even take quizzes created by
              others. You can also view detailed reports of your quiz results to
              see how you performed.
            </p>
            <p style={{ textAlign: "justify" }}>
              With our user-friendly interface, creating quizzes is simple and
              straightforward. You can add a variety of question types,
              including multiple choice, true/false, and open-ended questions.
              You can also set time limits, shuffle questions, and more to
              create a truly customized quiz experience.
            </p>
            <p style={{ textAlign: "justify" }}>
              Editing quizzes is just as easy. You can add or remove questions,
              change the order of questions, and adjust quiz settings as needed.
              And when you're ready to take a quiz, simply select it from our
              extensive library of user-created quizzes or take one of your own.
            </p>
            <p style={{ textAlign: "justify" }}>
              After you complete a quiz, you'll receive a detailed report of
              your results, including your score and any questions you missed.
              You can also view the correct answers and explanations for each
              question to help you improve your knowledge in the future.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our quiz application is perfect for students, educators, and
              anyone else who wants to test their knowledge in a fun and
              engaging way. So why not sign up today and start creating and
              taking quizzes?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
