class CacheManager {
    constructor() {
        this.cache = new Map();
        this.imageCache = new Map();
    }
    
    async get(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < cached.ttl) {
            return cached.data;
        }
        return null;
    }
    
    set(key, data, ttl = 5 * 60 * 1000) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        });
    }
    
    async preloadImage(url) {
        if (this.imageCache.has(url)) return;
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.imageCache.set(url, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    }
    
    async preloadImages(urls) {
        return Promise.all(urls.map(url => this.preloadImage(url)));
    }
    
    clearOldCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > value.ttl) {
                this.cache.delete(key);
            }
        }
    }
}

export const cacheManager = new CacheManager();

// Limpa cache antigo periodicamente
setInterval(() => cacheManager.clearOldCache(), 60 * 1000); 