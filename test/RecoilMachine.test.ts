import { lightMachine } from '../src/test.helpers';
import { reset } from '../src/constants';
import { generateSyncMachineTest } from 'test-machine';


describe('Construction of atoms', () => {
  generateSyncMachineTest({
    machine: lightMachine,
    events: ['TIMER', 'TIMER', 'TIMER'],
    values: ['idle', 'green', 'yellow', 'red'],
  });

  generateSyncMachineTest({
    machine: lightMachine,
    events: ['TIMER', 'TIMER', reset],
    values: ['idle', 'green', 'yellow', 'idle'],
  });
});
