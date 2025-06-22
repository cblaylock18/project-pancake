export type User = {
    id: string;
    email: string;
    username: string;
    createdAt?: string;
    googleId?: string;
    githubId?: string;
};

export type Room = {
    id: string;
    roomCode: string;
    isActive?: boolean;
    createdAt?: string;
    p1: User;
    p2: User;
};

export type Game = {
    id: string;
    roomId: string;
    isActive?: boolean;
    createdAt?: string;
    winner?: User;
    loser?: User;
    turnState?: TurnState;
    turns?: Turn[];
};

export type TurnState = {
    roundScore: number;
    turnPlayer: User;
    isRolling?: boolean;
    isBanking?: boolean;
};

export type Turn = {
    id: string;
    gameId: string;
    player: User;
    round: number;
    action: "bank" | "farkle" | "endTurn";
    score: number;
};
