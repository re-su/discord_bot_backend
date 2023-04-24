export class InteractionResponse {
    private message: string;
    private success: boolean;

    constructor(message: string, success: boolean) {
        this.message = message;
        this.success = success;
    }

    public getMessage(): string {
        return this.message;
    }

    public isSuccess(): boolean {
        return this.success;
    }
}