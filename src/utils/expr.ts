
export enum Operation {
    Eq = "eq",
    Neq = "neq",
    Gt = "gt",
    Lt = "lt",
    Lte = "lte",
    Gte = "gte",
}



export interface ConditionExpr {
    left: string;
    opr: Operation;
    right: any;
}

export namespace Parser {
    export namespace Lexer {
        export const parser = (value: string) => {
            value.split(' ').map((token) => {
                return token;
            })
        }
    }
}