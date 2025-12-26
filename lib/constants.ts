export namespace DataLibrarian {
    export enum Endpoints {
        STATUS = '/api/status',
        ACTION = '/api/action',
        CONFIG = '/api/config',
        LIBRARY = '/api/library'
    }

    export enum RequestType {
        GET = 'GET',
        POST = 'POST'
    }

    export enum ModuleNames {
        SERVER = 'server',
        WEEDING = 'weeding',
        SEGMENTING = 'segmenting'
    }
}
