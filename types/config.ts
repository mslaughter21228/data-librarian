import rawConfig from '../config.json';

export namespace DataLibrarian {
    export type ConfigType = {
        PORT: number;
        DEFAULT_TARGET_FOLDER: string;
        MOVE_DUPLICATES: boolean;
        DUPLICATE_HOLDING_DIR: string;
        LOG_NAME_PREFIX: string;
        EXCLUDED_FOLDERS: string[];
        USER_EXCLUDED_FILES: string[];
        PDF_TARGET_CHUNK_MB: number;
        PDF_PAGE_CHUNK_LIMIT: number;
        CLEANER_EXCLUDED_EXTENSIONS: string[];
        CLEANER_EXCLUDED_DIRS: string[];
    };

    export const Config: ConfigType = rawConfig as unknown as ConfigType;
}
