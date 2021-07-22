import { atom } from 'recoil';
import {
  assign,
  createMachine,
  EventObject,
  interpret,
  MachineConfig,
  MachineOptions,
  Typestate,
} from 'xstate';
import { Model } from 'xstate/lib/model.types';
import { nanoid } from 'nanoid';
import { reset } from './constants';

function isFunction(value:any) : value is Function{
  return (
    value &&
    {}.toString.call(value) === '[object Function]'
  );
}

type MachineAtomProps<TContext, TEvent extends EventObject> = {
  config: TContext extends Model<any, any, any>
    ? never
    : MachineConfig<TContext, any, TEvent>;
  options?: Partial<MachineOptions<TContext, TEvent>>;
  key: string;
};

export function machineAtom<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>({
  config: conf,
  options,
  key,
}: MachineAtomProps<TContext, TEvent>) {
  const id = nanoid();

  const config = {
    ...conf,
    id,
    on: {
      ...conf.on,
      [reset]: {
        target: `##${id}`,
        actions: assign(() => {
          const ctx = conf.context;
          if (isFunction(ctx)) return ctx();
          return ctx;
        }),
      },
    },
  };
  const out = atom({
    key,
    default: interpret(
      createMachine<TContext, TEvent, TTypestate>(
        config,
        options
      )
    ).start(),
  });

  return out;
}
