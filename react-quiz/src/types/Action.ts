import type { Questions } from "./Questions";

export type Action = { type: "dataReceived"; payload: Questions[]; } |
{ type: "ready"; } |
{ type: "start_quiz"; } |
{ type: "error"; } |
{ type: "newAnswer"; payload: number; } |
{ type: "nextQuestion"} |
{ type: "finishTest"} ;
