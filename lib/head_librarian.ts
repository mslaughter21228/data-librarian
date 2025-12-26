import { DataLibrarian as DLApiTypes } from '@/types/api';
import { DataLibrarian as Types } from '@/types/library';
import { DataLibrarian as Client } from './api_client';

export namespace DataLibrarian {
    export class HeadLibrarian {

        private static CACHE_PREFIX = 'catalog_';

        /**
         * The Main Interface.
         * UI calls this. Logic flows: Cache -> API -> Update Cache.
         * Guaranteed to return an ApiResponse (success: true/false). Never throws.
         */
        static async getCatalog(path: string, forceRefresh = false): Promise<DLApiTypes.ApiResponse<Types.CatalogCard[]>> {
            const cacheKey = `${this.CACHE_PREFIX}${path}`;

            // 1. Check Cache
            if (!forceRefresh) {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    try {
                        // Validate and Parse
                        const data = JSON.parse(cached);
                        // TODO: Add TTL check here if needed in future
                        return { success: true, data };
                    } catch (e) {
                        console.warn('[HeadLibrarian] Cache corrupt, purging:', cacheKey);
                        localStorage.removeItem(cacheKey);
                    }
                }
            }

            // 2. Cache Miss or Force Refresh? -> Ask Jr Librarian
            const response = await Client.ApiClient.getLibraryFiles(path);

            // 3. Update Cache on Success
            if (response.success && response.data) {
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(response.data));
                } catch (e) {
                    console.error('[HeadLibrarian] Storage Quota Exceeded or Error:', e);
                    // We still return the data, even if caching failed
                }
                return response;
            }

            // 4. Return Failure (pass through error)
            return response || { success: false, error: "Unknown error retrieving catalog" };
        }

        /**
         * Clear the entire card catalog cache.
         * Useful for a "Hard Reload" button.
         */
        static flushCatalog() {
            // Clear only keys starting with catalog_
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.CACHE_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
        }
    }
}
