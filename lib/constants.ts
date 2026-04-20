export namespace DataLibrarian {
    export enum Endpoints {
        STATUS = '/api/status',
        ACTION = '/api/action',
        CONFIG = '/api/config',
        LIBRARY = '/api/library',
        METADATA_GET  = '/api/metadata/get',
        METADATA_SAVE = '/api/metadata/save',
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
