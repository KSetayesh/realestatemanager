export abstract class DatabaseManager {

    private _commit: boolean;

    constructor(commit: boolean) {
        this._commit = commit;
    }

    get commit(): boolean {
        return this._commit;
    }

    get commitMessage(): string {
        return 'Commit flag set to false';
    }

}