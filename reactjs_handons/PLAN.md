# React Learning Plan (Based on react.dev/learn)

This plan follows the official React documentation learning path:
[https://react.dev/learn](https://react.dev/learn)

Goal: Learn modern React step-by-step by reading the official documentation and building small exercises.

Estimated time: 4–6 weeks (part-time learning)

---

# 0. Prerequisites

Before learning React, make sure you understand:

* Basic HTML
* Basic CSS
* JavaScript ES6+

  * let / const
  * arrow functions
  * destructuring
  * modules (import/export)
  * array methods (map, filter)
  * async / await

---

# 1. Environment Setup

Learn how to create and run a React project.

Read:

* [https://react.dev/learn/creating-a-react-app](https://react.dev/learn/creating-a-react-app)

Tasks:

* Install Node.js
* Create project with Vite
* Run development server
* Understand project structure

Exercise:
Create a simple page that renders "Hello React".

---

# 2. Describing the UI

React apps are built using components.

Read:

* [https://react.dev/learn/describing-the-ui](https://react.dev/learn/describing-the-ui)

Topics:

### Your First Component

Learn:

* What a component is
* How components work
* Functional components

Exercise:
Create components:

* Header
* Sidebar
* ProductCard

---

### Importing and Exporting Components

Learn:

* default export
* named export
* component organization

Exercise:
Split your UI into multiple files.

---

### Writing Markup with JSX

Learn:

* JSX syntax
* JSX vs HTML
* className vs class
* fragments

Exercise:
Create a UI layout using JSX.

---

### JavaScript in JSX

Learn:

* {} syntax
* using variables
* expressions inside JSX

Exercise:
Display a user profile using props.

---

### Passing Props to Components

Learn:

* props
* reusable components

Exercise:
Create reusable ProductCard component.

---

### Conditional Rendering

Learn:

* if
* ternary operator
* logical &&

Exercise:
Show "Login / Logout" button based on user state.

---

### Rendering Lists

Learn:

* array.map()
* key property

Exercise:
Render a list of products.

---

### Keeping Components Pure

Learn:

* pure functions
* why components must not mutate data

---

# 3. Adding Interactivity

Learn how React handles user interaction.

Read:

* [https://react.dev/learn/adding-interactivity](https://react.dev/learn/adding-interactivity)

Topics:

### Responding to Events

Learn:

* onClick
* onChange
* event handlers

Exercise:
Create a counter button.

---

### State: A Component’s Memory

Learn:

* useState
* re-rendering
* updating UI

Exercise:
Build:

* Counter
* Toggle button
* Like button

---

### Updating Objects in State

Learn:

* immutability
* spreading objects

Exercise:
Update a form object.

---

### Updating Arrays in State

Learn:

* add item
* remove item
* update item

Exercise:
Create a todo list.

---

# 4. Managing State

Read:

* [https://react.dev/learn/managing-state](https://react.dev/learn/managing-state)

Topics:

### Reacting to Input with State

Exercise:
Create a search filter.

---

### Choosing the State Structure

Learn:

* avoid duplicated state
* organize state correctly

Exercise:
Refactor messy state.

---

### Sharing State Between Components

Learn:

* lifting state up
* controlled components

Exercise:
Two components sharing same state.

---

# 5. Escape Hatches (Advanced)

Read:

* [https://react.dev/learn/escape-hatches](https://react.dev/learn/escape-hatches)

Topics:

### useEffect

Learn:

* side effects
* API calls
* lifecycle behavior

Exercise:
Fetch data from API.

---

### Refs

Learn:

* useRef
* accessing DOM nodes

Exercise:
Focus input automatically.

---

### Synchronizing with external systems

Examples:

* video player
* websocket
* timers

---

# 6. Thinking in React

Read:

* [https://react.dev/learn/thinking-in-react](https://react.dev/learn/thinking-in-react)

Learn how to design React apps.

Steps:

1. Break UI into components
2. Build static version
3. Identify minimal state
4. Decide where state lives
5. Add interactions

Exercise:
Build a Product Filter UI.

---

# 7. Official React Tutorial Project

Read:

* [https://react.dev/learn/tutorial-tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe)

Build:

Tic Tac Toe Game

Concepts learned:

* components
* props
* state
* lifting state up
* immutability

---

# 8. Tools

React Developer Tools

Read:

* [https://react.dev/learn/react-developer-tools](https://react.dev/learn/react-developer-tools)

Learn:

* inspect components
* inspect state
* debug rendering

---

# 9. Practice Projects

Build small projects:

1. Todo App
2. Weather App
3. Notes App
4. Blog UI
5. Shopping Cart

---

# 10. Next Topics After This Plan

After finishing this plan, learn:

* React Router
* Data Fetching
* React Query
* Context API
* Next.js
* Performance optimization
* Testing (Vitest / React Testing Library)

---

# Final Goal

Be able to:

* build React components
* manage state
* handle user interactions
* structure React apps correctly
* build a complete frontend application
