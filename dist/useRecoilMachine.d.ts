import { RecoilState } from 'recoil';
import { EventObject, Interpreter, StateSchema, Typestate } from 'xstate';
export declare function useRecoilMachine<TContext, TStateSchema extends StateSchema, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(atom: RecoilState<Interpreter<TContext, TStateSchema, TEvent, TTypestate>>): {
    readonly state: import("xstate").State<TContext, TEvent, TStateSchema, TTypestate>;
    readonly send: (event: TEvent | TEvent["type"] | import("xstate").Event<TEvent>[] | import("xstate").SCXML.Event<TEvent>, payload?: import("xstate").EventData | undefined) => import("xstate").State<TContext, TEvent, TStateSchema, TTypestate>;
};
