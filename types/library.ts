export namespace DataLibrarian {
    export interface CatalogCard {
        name: string;
        path: string;
        type: "file" | "directory";
        size?: string;
        created: string;
        modified: string;
    }
}
