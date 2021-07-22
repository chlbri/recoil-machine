import { createMachine, interpret } from 'xstate';

const teste = interpret(
  createMachine({
    initial: 'dashboard',
    states: {
      splash: {},
      dashboard: {
        type: 'parallel',
        states: {
          do1: {},
          do23: {},
        },
      },
      selected: {},
      parmas: {},
    },
  })
).start();

it.only('', () => {
  console.log(teste.initialState.value);

  expect(teste.initialState.value).toBeDefined();
});
