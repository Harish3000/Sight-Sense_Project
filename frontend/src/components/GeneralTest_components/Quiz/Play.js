import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import { Modal as AntdModal, Alert, message } from "antd";

import "@mdi/font/css/materialdesignicons.min.css";
import questions from "../../../question.json";
import isEmpty from "../../../utils/is-empty";

import correctNotification from "../../../assets/GeneralTest_assets/audio/correct-answer.mp3";
import wrongNotification from "../../../assets/GeneralTest_assets/audio/wrong-answer.mp3";
import buttonSound from "../../../assets/GeneralTest_assets/audio/button-sound.mp3";
import classnames from "classnames";

import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";

class play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      wrongAnswers: 0,
      time: {},
    };
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  //   displayQuestions = (
  //     questions = this.state.questions,
  //     currentQuestion,
  //     nextQuestion,
  //     previousQuestion
  //   ) => {
  //     let { currentQuestionIndex } = this.state;
  //     if (!isEmpty(this.state.questions)) {
  //       questions = this.state.questions;
  //       currentQuestion = questions[currentQuestionIndex];
  //       if (currentQuestion) {
  //         // Check if currentQuestion is defined
  //         nextQuestion = questions[currentQuestionIndex + 1];
  //         previousQuestion = questions[currentQuestionIndex - 1];
  //         const answer = currentQuestion.answer;
  //         this.setState(
  //           {
  //             currentQuestion,
  //             nextQuestion,
  //             previousQuestion,
  //             numberOfQuestions: questions.length,
  //             answer,
  //           },
  //           () => {
  //             this.handleDisabledButton();
  //           }
  //         );
  //       }
  //     }
  //   };
  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        // Check if currentQuestion is defined
        nextQuestion = questions[currentQuestionIndex + 1];
        previousQuestion = questions[currentQuestionIndex - 1];
        const answer = currentQuestion.answer;

        // Check if it's the 7th or 8th question
        if (currentQuestionIndex === 6) {
          this.showAdviceMessage("Close Left Eye and Check");
        } else if (currentQuestionIndex === 7) {
          this.showAdviceMessage("Close Right Eye and Check");
        }

        this.setState(
          {
            currentQuestion,
            nextQuestion,
            previousQuestion,
            numberOfQuestions: questions.length,
            answer,
          },
          () => {
            this.handleDisabledButton();
          }
        );
      }
    }
  };

  showAdviceMessage = (messageText) => {
    // Show a message using Ant Design message component
    message.info(messageText, 5);
  };

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );

    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        this.correctSound.current.play();
      }, 500);
      this.correctAnswers();
    } else {
      this.wrongTimeout = setTimeout(() => {
        this.wrongSound.current.play();
      }, 500);
      //document.getElementById("wrong-sound").play();
      this.wrongAnswers();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();

    AntdModal.confirm({
      title: "Confirm Quit",
      content: "Are you sure you want to quit?",
      onOk: () => {
        window.location.href = "/general-test/QuizHome";
      },
      onCancel: () => {},
    });
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;
      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;
      default:
        break;
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswers = () => {
    message.success("Correct Answer", 0.6);

    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };
  wrongAnswers = () => {
    navigator.vibrate(1000);
    message.error("Wrong Answer", 0.6);
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };
  startTimer = () => {
    const countDownTime = Date.now() + 400000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor(distance / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            window.location.href = "/general-test/QuizHome";
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  handleDisabledButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  generatePDF = () => {
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
    };

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth =
      (pdf.getStringUnitWidth("Sight Sense") * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const xOffset = (pageWidth - textWidth) / 2;

    pdf.setFontSize(18);
    pdf.text("Sight Sense", xOffset, 10);

    pdf.setFontSize(12);
    pdf.text(`Score: ${playerStats.score}`, 10, 30);
    pdf.text(`Number of Questions: ${playerStats.numberOfQuestions}`, 10, 40);
    pdf.text(
      `Number of Answered Questions: ${playerStats.numberOfAnsweredQuestions}`,
      10,
      50
    );
    pdf.text(`Correct Answers: ${playerStats.correctAnswers}`, 10, 60);
    pdf.text(`Wrong Answers: ${playerStats.wrongAnswers}`, 10, 70);

    const footerText = "All Rights Reserved";
    const footerTextWidth =
      (pdf.getStringUnitWidth(footerText) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const footerXOffset = (pageWidth - footerTextWidth) / 2;

    pdf.setFontSize(10);
    pdf.text(footerText, footerXOffset, pdf.internal.pageSize.getHeight() - 10);

    pdf.save("Eye-Test-Score.pdf");
  };

  endGame = () => {
    this.setState({ showAlert: true });
    setTimeout(() => {
      this.setState({ showAlert: false }, () => {
        this.setState({ showModal: true });
      });
    }, 1800); //1.8 seconds

    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
    };
    console.log(playerStats);
  };

  //close modal after display result
  handleClose = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { showModal } = this.state;
    const { showAlert } = this.state;
    const { state } = this;
    const { currentQuestion, currentQuestionIndex, numberOfQuestions, time } =
      this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <Fragment>
          {showAlert && (
            <Alert
              message="This is a Success Alert"
              type="success"
              showIcon
              closable
            />
          )}
        </Fragment>
        <div>
          <Modal
            show={showModal}
            onHide={this.handleClose}
            tyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "700vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Use rgba with an alpha value for transparency
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Player Stats</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Score: {state.score}</p>
              <p>Number of Questions: {state.numberOfQuestions}</p>
              <p>
                Number of Answered Questions: {state.numberOfAnsweredQuestions}
              </p>
              <p>Correct Answers: {state.correctAnswers}</p>
              <p>Wrong Answers: {state.wrongAnswers}</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-outline-danger"
                onClick={this.generatePDF}
              >
                Download PDF
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={this.handleClose}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <Fragment>
          <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </Fragment>

        <div className="questions">
          <h2>Quiz Mode</h2>
          <div className="linfeline-container">
            {currentQuestionIndex < 15 && (
              <p>
                <span>
                  {currentQuestionIndex + 1} of {numberOfQuestions}
                </span>
                <span
                  className="timer"
                  style={{
                    float: "Right",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <i className="mdi mdi-clock" /> {time.minutes}:{time.seconds}
                </span>
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            {currentQuestion.image && (
              <img
                src={currentQuestion.image}
                alt=""
                style={{
                  maxWidth: "150%",
                  maxHeight: "350px",
                }}
              />
            )}
          </div>

          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button
              className={classnames("", {
                disable: this.state.previousButtonDisabled,
              })}
              id="previous-button"
              onClick={this.handleButtonClick}
            >
              Perivous
            </button>
            <button
              className={classnames("", {
                disable: this.state.nextButtonDisabled,
              })}
              id="next-button"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default play;
