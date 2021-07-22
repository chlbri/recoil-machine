import { reset } from './constants';
export declare const context: {
    elapsed: number;
    canWalk: boolean;
    spawn: import("xstate").ActorRef<import("xstate").AnyEventObject, import("xstate").State<unknown, import("xstate").AnyEventObject, any, {
        value: any;
        context: unknown;
    }>> & {
        state: import("xstate").State<unknown, import("xstate").AnyEventObject, any, {
            value: any;
            context: unknown;
        }>;
    };
};
export declare type LightEvent = {
    type: 'TIMER';
} | {
    type: typeof reset;
};
export declare const lightMachine: import("xstate").StateMachine<{
    elapsed: number;
    canWalk: boolean;
    spawn: import("xstate").ActorRef<import("xstate").AnyEventObject, import("xstate").State<unknown, import("xstate").AnyEventObject, any, {
        value: any;
        context: unknown;
    }>> & {
        state: import("xstate").State<unknown, import("xstate").AnyEventObject, any, {
            value: any;
            context: unknown;
        }>;
    };
}, any, LightEvent, {
    value: any;
    context: {
        elapsed: number;
        canWalk: boolean;
        spawn: import("xstate").ActorRef<import("xstate").AnyEventObject, import("xstate").State<unknown, import("xstate").AnyEventObject, any, {
            value: any;
            context: unknown;
        }>> & {
            state: import("xstate").State<unknown, import("xstate").AnyEventObject, any, {
                value: any;
                context: unknown;
            }>;
        };
    };
}>;
