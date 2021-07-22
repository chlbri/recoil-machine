import {
  act,
  renderRecoilHook,
} from 'react-recoil-hooks-testing-library';
import { useRecoilValue } from 'recoil';
import { reset } from '../src/constants';
import { useRecoilMachine } from '../src/useRecoilMachine';
import { machineAtom } from '../src/machineAtom';
import { lightMachine } from '../src/test.helpers';

const at = machineAtom(lightMachine);

describe('Tests of the new useRecoilMachine', () => {
  function renderTest() {
    const { result } = renderRecoilHook(useRecoilMachine, {
      initialProps: at,
    });
    return result;
  }

  it('shoulds render the state at start', () => {
    const result = renderTest();

    expect(result.current.state.matches('idle')).toBeTruthy();
  });

  it('shoulds render the state after one event', () => {
    const result = renderTest();

    act(() => {
      result.current.send('TIMER');
    });

    expect(result.current.state.matches('green')).toBeTruthy();
  });

  it('shoulds change the light at  red', () => {
    const result = renderTest();
    expect(result.current.state.matches('green')).toBeTruthy();

    act(() => {
      result.current.send(reset);
    });

    expect(result.current.state.matches('idle')).toBeTruthy();

    act(() => {
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send('TIMER');
    });

    expect(
      result.current.state.matches('red.walk')
    ).toBeTruthy();
  });

  it('shoulds store the atom', () => {
    const { result } = renderRecoilHook(useRecoilValue, {
      initialProps: at,
    });
    expect(
      result.current.state.matches('red.walk')
    ).toBeTruthy();
  });

  it('shoulds rinit the state', () => {
    const result = renderTest();

    act(() => {
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send(reset);
    });

    expect(result.current.state.value).toBe('idle');
  });
});
