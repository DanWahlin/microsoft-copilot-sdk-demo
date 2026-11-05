# Contoso support chat

A local outdoor-store support demo built with the GitHub Copilot SDK for Node.js.
The app streams replies to the browser and uses the `get_order` tool to look up
sample records in `orders.json`. The assistant has no shell or file tools.
Each browser has a separate conversation, which expires after 30 minutes of
inactivity. Messages are sent to GitHub Copilot.

## Requirements

- [Node.js 22.12 or later](https://nodejs.org/en/download)
- A GitHub account with Copilot access and the [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) installed and on your PATH

## Run

1. Sign in to Copilot:

   ```sh
   copilot login
   ```

2. Run these commands in the project directory:

   ```sh
   npm ci
   npm start
   ```

3. Open <http://127.0.0.1:3000>. Ask "Where is my order #1042?", then
   "What did I order?" to try a follow-up question. Orders 1043 and 1044
   show processing and delivered states.

Press Ctrl+C to stop the app. Optionally set `PORT` or `COPILOT_MODEL` before
starting the app.

## Checks

```sh
npm test
npm run typecheck
```

**Demo only:** The app listens only on localhost. Order numbers do not verify
customer identity. Do not use real customer data or expose the app without
authentication, authorization, rate limiting, and HTTPS.
