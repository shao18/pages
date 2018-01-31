import Conversation from "Conversation";
import ConversationList from "ConversationList";
import React from "react";
import ReactDOM from "react-dom";
import UniversalRouter from "universal-router";
import registerServiceWorker from "./registerServiceWorker";
import "index.css";
/**
 * Routes
 */
const routes = [
  {
    path: "/",
    async action({ params, next }) {
      return await next();
    },
    children: [
      {
        path: "/events",
        action: context => <ConversationList />
      },
      {
        path: "/events/:id",
        action: (context, id) => <Conversation />
      },
      {
        path: "(.*)",
        action: context => <ConversationList />
      }
    ]
  }
];
/**
 * @const router Universal router
 */
const router = new UniversalRouter(routes);

router.resolve({ pathname: window.location.pathname }).then(rootComponent => {
  ReactDOM.render(rootComponent, document.getElementById("root"));
  registerServiceWorker();
});
