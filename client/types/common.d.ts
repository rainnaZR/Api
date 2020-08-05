declare namespace Common {
    interface Tree {
        id: number;
        name: string;
        children?: Array<Category>;
    }
    interface TreeOptions {
        name?: string;
        children?: string;
    }
}
