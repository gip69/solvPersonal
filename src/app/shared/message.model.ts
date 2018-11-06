export interface Message {
    id?: number;
    receiver?: string;
    sender?: string;
    command?: string;
    value: string;
}
