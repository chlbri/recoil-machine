import { reset } from './constants';
import {
  assign,
  createMachine,
  forwardTo,
  send,
  spawn,
} from 'xstate';
import { nanoid } from 'nanoid';

const remoteMachine = createMachine({
  id: 'remote',
  initial: 'offline',
  states: {
    offline: {
      // entry: sendParent("TIMER"),
      on: {
        WAKE: 'online',
      },
    },
    online: {
      on: {
        WAKE: 'offline',
      },
    },
  },
});

export const context = {
  elapsed: 0,
  canWalk: false,
  spawn: spawn(remoteMachine),
};

const id = nanoid();

export type LightEvent =
  | { type: 'TIMER' }
  | { type: typeof reset };

export const lightMachine = createMachine<
  typeof context,
  LightEvent
>(
  {
    id,
    initial: 'idle',
    context,
    states: {
      idle: {
        on: {
          TIMER: {
            target: 'green',
            actions: 'inc',
          },
        },
      },
      green: {
        on: {
          TIMER: {
            target: 'yellow',
            actions: 'inc',
          },
        },
      },
      yellow: {
        on: {
          TIMER: { target: 'red', actions: 'inc' },
        },
      },
      red: {
        initial: 'walk',
        states: {
          walk: {
            entry: 'setCanSearch',

            on: {
              TIMER: {
                target: 'stop',
                cond: 'searchValid',
                actions: ['inc', 'spawn'],
              },
            },
          },

          stop: {
            id: 'red_stop',
          },
        },
        on: {
          TIMER: {
            target: 'green',
            in: '#red_stop',
            actions: ['inc', 'sendTo', 'setCannotSearch'],
          },
        },
      },
    },
    on: {
      [reset]: {
        target: `#${id}`,
        actions: assign(() => context),
      },
    },
  },
  {
    guards: {
      searchValid: ({ canWalk }) => canWalk,
    },
    actions: {
      setCanSearch: assign({
        canWalk: _ => true,
      }),
      setCannotSearch: assign({
        canWalk: _ => false,
      }),
      inc: assign({
        elapsed: ({ elapsed }) => {
          return ++elapsed;
        },
      }),
      spawn: assign({
        spawn: _ => spawn(remoteMachine),
      }),
      forwardTo: forwardTo(ctx => ctx.spawn!),
      sendTo: send('WAKE', { to: ctx => ctx.spawn! }),
    },
  }
);
