import { EventObject, MachineConfig, MachineOptions, Typestate } from 'xstate';
import { Model } from 'xstate/lib/model.types';
declare type MachineAtomProps<TContext, TEvent extends EventObject> = {
    config: TContext extends Model<any, any, any> ? never : MachineConfig<TContext, any, TEvent>;
    options?: Partial<MachineOptions<TContext, TEvent>>;
    key: string;
};
export declare function machineAtom<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>({ config: conf, options, key, }: MachineAtomProps<TContext, TEvent>): import("recoil").RecoilState<import("xstate").Interpreter<TContext, any, TEvent, TTypestate>>;
export {};
