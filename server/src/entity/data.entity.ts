export class DataFrame {
    private data: number[][];
    private columns: string[];

    constructor(data: number[][], columns: string[]) {
        this.data = data;
        this.columns = columns;
    }

    public print(): void {
        console.log(this.data);
    }
}
