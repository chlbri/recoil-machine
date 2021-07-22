import { useActor } from '@xstate/react/lib/useActor';
import { RecoilState, useRecoilValue } from 'recoil';
import {
  EventObject,
  Interpreter,
  StateSchema,
  Typestate,
} from 'xstate';

export function useRecoilMachine<
  TContext,
  TStateSchema extends StateSchema,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  atom: RecoilState<
    Interpreter<TContext, TStateSchema, TEvent, TTypestate>
  >
) {
  const [state, send] = useActor(useRecoilValue(atom));

  return { state, send } as const;
}
