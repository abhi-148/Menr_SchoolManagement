import {
  useEffect,
  useRef,
  useState
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  askAI
} from "../../services/aiService";

import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  User,
  Trash2,
  Database,
  RefreshCw
} from "lucide-react";


function AIAssistant() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        id: 1,
        type: "ai",
        text:
          "Hello 👋 I am your SchoolMS AI Assistant. I can help you with students, staff, attendance, fees, marks, subjects, announcements and school management."
      }
    ]);

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);


  // =========================================================
  // AUTO SCROLL
  // =========================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);


  // =========================================================
  // SEND MESSAGE
  // =========================================================

  const handleSend = async () => {

    const currentMessage =
      message.trim();


    if (
      !currentMessage ||
      loading
    ) {
      return;
    }


    const userMessage = {
      id:
        Date.now(),

      type:
        "user",

      text:
        currentMessage
    };


    setMessages(
      (prev) => [
        ...prev,
        userMessage
      ]
    );


    setMessage("");
    setLoading(true);


    try {

      const response =
        await askAI(
          currentMessage
        );


      const aiMessage = {
        id:
          Date.now() + 1,

        type:
          "ai",

        text:
          response?.answer ||
          "No response received.",

        tool:
          response?.tool ||
          null,

        model:
          response?.model ||
          null
      };


      setMessages(
        (prev) => [
          ...prev,
          aiMessage
        ]
      );


    } catch (error) {

      console.error(
        "AI REQUEST ERROR:",
        error
      );


      const errorMessage = {
        id:
          Date.now() + 1,

        type:
          "ai",

        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to connect to AI service."
      };


      setMessages(
        (prev) => [
          ...prev,
          errorMessage
        ]
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // ENTER KEY
  // =========================================================

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();

    }

  };


  // =========================================================
  // CLEAR CHAT
  // =========================================================

  const clearChat = () => {

    setMessages([
      {
        id:
          Date.now(),

        type:
          "ai",

        text:
          "Chat cleared. How can I help you?"
      }
    ]);

  };


  // =========================================================
  // QUICK QUESTIONS
  // =========================================================

  const quickQuestions = [
    "How many students are there?",
    "How many staff members are there?",
    "Who is absent today?",
    "Show pending fees",
    "Show recent results",
    "What subjects do we have?",
    "Show recent announcements"
  ];


  const handleQuickQuestion = (
    question
  ) => {

    setMessage(question);

  };


  // =========================================================
  // FORMAT ANSWER
  // =========================================================

  const formatAnswer = (
    text
  ) => {

    if (!text) {
      return null;
    }


    const lines =
      String(text).split("\n");


    return lines.map(
      (line, index) => (

        <span key={index}>

          {line}

          {index <
            lines.length - 1 && (
              <br />
            )}

        </span>

      )
    );

  };


  return (

    <AdminLayout>

      <div className="
        min-h-screen
        bg-slate-100
        p-4
        md:p-6
        lg:p-8
      ">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="
          max-w-6xl
          mx-auto
          mb-6
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          ">

            <div>

              <div className="
                inline-flex
                items-center
                gap-2
                text-blue-600
                text-sm
                font-semibold
                mb-2
              ">

                <Sparkles size={16} />

                Smart School Tools

              </div>


              <h1 className="
                text-3xl
                font-bold
                text-slate-900
              ">
                AI Assistant
              </h1>


              <p className="
                text-slate-500
                mt-1
              ">
                Ask questions about your school data and workflows.
              </p>

            </div>


            <button
              onClick={clearChat}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-white
                border
                border-slate-200
                text-slate-700
                px-4
                py-2.5
                rounded-xl
                hover:bg-slate-50
                transition
              "
            >

              <Trash2 size={17} />

              Clear Chat

            </button>

          </div>

        </div>


        {/* ===================================================
            CHAT CARD
        =================================================== */}

        <div className="
          max-w-6xl
          mx-auto
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          overflow-hidden
        ">


          {/* =================================================
              CHAT HEADER
          ================================================= */}

          <div className="
            px-5
            md:px-6
            py-4
            border-b
            border-slate-100
            flex
            items-center
            justify-between
            bg-white
          ">

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-blue-600
                flex
                items-center
                justify-center
                shadow-sm
              ">

                <Bot
                  size={22}
                  className="text-white"
                />

              </div>


              <div>

                <h2 className="
                  font-semibold
                  text-slate-800
                ">
                  SchoolMS AI
                </h2>


                <p className="
                  text-xs
                  text-green-600
                  font-medium
                  mt-0.5
                ">
                  AI Assistant Online
                </p>

              </div>

            </div>


            <div className="
              hidden
              sm:flex
              items-center
              gap-2
              text-xs
              text-slate-500
            ">

              <Database size={15} />

              School Data Tools Enabled

            </div>

          </div>


          {/* =================================================
              QUICK QUESTIONS
          ================================================= */}

          <div className="
            px-5
            md:px-6
            py-4
            border-b
            border-slate-100
            bg-slate-50
          ">

            <p className="
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wide
              mb-3
            ">
              Suggested Questions
            </p>


            <div className="
              flex
              flex-wrap
              gap-2
            ">

              {quickQuestions.map(
                (question) => (

                  <button
                    key={question}
                    onClick={() =>
                      handleQuickQuestion(
                        question
                      )
                    }
                    className="
                      text-sm
                      bg-white
                      border
                      border-slate-200
                      text-slate-700
                      px-3
                      py-2
                      rounded-lg
                      hover:border-blue-300
                      hover:text-blue-600
                      transition
                    "
                  >
                    {question}
                  </button>

                )
              )}

            </div>

          </div>


          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="
            h-[58vh]
            min-h-[420px]
            overflow-y-auto
            p-5
            md:p-6
            bg-slate-50/60
          ">


            {messages.map(
              (msg) => (

                <div
                  key={msg.id}
                  className={`
                    flex
                    mb-5
                    ${
                      msg.type === "user"
                        ? "justify-end"
                        : "justify-start"
                    }
                  `}
                >


                  <div className={`
                    flex
                    items-start
                    gap-3
                    max-w-[90%]
                    md:max-w-[75%]
                    ${
                      msg.type === "user"
                        ? "flex-row-reverse"
                        : ""
                    }
                  `}>


                    {/* Avatar */}

                    <div className={`
                      flex-shrink-0
                      w-9
                      h-9
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      ${
                        msg.type === "user"
                          ? "bg-slate-800"
                          : "bg-blue-600"
                      }
                    `}>

                      {msg.type === "user" ? (

                        <User
                          size={17}
                          className="text-white"
                        />

                      ) : (

                        <Bot
                          size={17}
                          className="text-white"
                        />

                      )}

                    </div>


                    {/* Message */}

                    <div>

                      <div className={`
                        px-4
                        py-3
                        rounded-2xl
                        shadow-sm
                        text-sm
                        leading-6
                        ${
                          msg.type === "user"
                            ? "bg-blue-600 text-white rounded-tr-md"
                            : "bg-white text-slate-700 border border-slate-200 rounded-tl-md"
                        }
                      `}>

                        {formatAnswer(
                          msg.text
                        )}

                      </div>


                      {/* Database tool indicator */}

                      {msg.type === "ai" &&
                        msg.tool && (

                          <div className="
                            mt-2
                            flex
                            items-center
                            gap-1.5
                            text-[11px]
                            text-slate-400
                          ">

                            <Database
                              size={12}
                            />

                            School data used

                          </div>

                        )}

                    </div>

                  </div>

                </div>

              )
            )}


            {/* =================================================
                TYPING
            ================================================= */}

            {loading && (

              <div className="
                flex
                justify-start
                mb-5
              ">

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <div className="
                    w-9
                    h-9
                    rounded-xl
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                  ">

                    <Bot
                      size={17}
                      className="text-white"
                    />

                  </div>


                  <div className="
                    bg-white
                    border
                    border-slate-200
                    px-4
                    py-3
                    rounded-2xl
                    rounded-tl-md
                    flex
                    items-center
                    gap-2
                  ">

                    <Loader2
                      size={16}
                      className="
                        animate-spin
                        text-blue-600
                      "
                    />

                    <span className="
                      text-sm
                      text-slate-500
                    ">
                      AI is thinking...
                    </span>

                  </div>

                </div>

              </div>

            )}


            <div
              ref={messagesEndRef}
            />

          </div>


          {/* =================================================
              INPUT
          ================================================= */}

          <div className="
            border-t
            border-slate-100
            bg-white
            p-4
            md:p-5
          ">

            <div className="
              flex
              items-end
              gap-3
            ">


              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Ask about students, attendance, fees, marks, subjects..."
                rows={2}
                disabled={loading}
                className="
                  flex-1
                  resize-none
                  border
                  border-slate-200
                  bg-slate-50
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-slate-800
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  disabled:opacity-60
                "
              />


              <button
                onClick={
                  handleSend
                }
                disabled={
                  loading ||
                  !message.trim()
                }
                className="
                  h-[52px]
                  px-5
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-slate-300
                  disabled:cursor-not-allowed
                  text-white
                  font-semibold
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                {loading ? (

                  <RefreshCw
                    size={18}
                    className="animate-spin"
                  />

                ) : (

                  <Send size={18} />

                )}

                <span className="
                  hidden
                  sm:inline
                ">
                  Send
                </span>

              </button>

            </div>


            <div className="
              mt-2
              flex
              items-center
              justify-between
              text-[11px]
              text-slate-400
            ">

              <span>
                Press Enter to send • Shift + Enter for new line
              </span>

              <span>
                SchoolMS AI
              </span>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}


export default AIAssistant;