declare namespace Common {
    interface Tree {
        id: number;
        label: string;
        children?: Array<Category>;
    }
    interface TreeOptions {
        label?: string;
        children?: string;
    }
}
