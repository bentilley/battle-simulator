# Battle Simulator Tech Test

A simple RPG Battle simulator written in Typescript.

![Battle Simulator Demo](docs/battle-simulator-demo.gif "Fight on noble
warrior")

## Running the app

To run the repo after cloning, simply:

```bash
npm start
```

## Design

Before working on the code for the application, I made a few rough designs
using Figma. These can be viewed
[here](https://www.figma.com/file/l0bGvUkBBAsXkUP7Xly6b2/Byhiras-Tech-Task?node-id=0%3A1).

The CSS is done using [SCSS](https://sass-lang.com/) +
[BEM](http://getbem.com/).

## App Data Management

I have used a React Reducer (from `useReducer`) hosted in a React Context
(`createContext`) to supply the data for the app.

A Redux style flow of actions, middleware, and a reducer are built up in the
[model](src/model/Battle) directory. The `BattleContext` wraps the apps UI
components, which can then access state and actions through the two custom
hooks `useBattle` and `useBattleActions` provided (see
[context.tsx](src/model/Battle/context.tsx)).
