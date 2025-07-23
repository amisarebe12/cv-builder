'use client';

export interface ImageCleanupOptions {
  maxAge?: number; // milliseconds
  maxSize?: number; // total size in bytes
}

export interface StoredImage {
  id: string;
  url: string;
  timestamp: number;
  size: number;
  type: string;
}

export class ImageCleanupService {
  private static instance: ImageCleanupService;
  private readonly STORAGE_KEY = 'cv_uploaded_images';
  private readonly MAX_IMAGES = 10; // Maximum number of images to keep
  private readonly MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

  public static getInstance(): ImageCleanupService {
    if (!ImageCleanupService.instance) {
      ImageCleanupService.instance = new ImageCleanupService();
    }
    return ImageCleanupService.instance;
  }

  /**
   * Get stored images from localStorage
   */
  private getStoredImages(): StoredImage[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading stored images:', error);
      return [];
    }
  }

  /**
   * Save images to localStorage
   */
  private saveStoredImages(images: StoredImage[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));
    } catch (error) {
      console.error('Error saving stored images:', error);
    }
  }

  /**
   * Add new image to storage tracking
   */
  public trackImage(url: string, size: number, type: string): string {
    const images = this.getStoredImages();
    const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newImage: StoredImage = {
      id,
      url,
      timestamp: Date.now(),
      size,
      type
    };

    images.push(newImage);
    this.saveStoredImages(images);
    
    // Trigger cleanup
    this.cleanup();
    
    return id;
  }

  /**
   * Remove image from tracking
   */
  public untrackImage(id: string): void {
    const images = this.getStoredImages();
    const filtered = images.filter(img => img.id !== id);
    this.saveStoredImages(filtered);
  }

  /**
   * Clean up old or excess images
   */
  public cleanup(options?: ImageCleanupOptions): void {
    const images = this.getStoredImages();
    const maxAge = options?.maxAge || this.MAX_AGE_MS;
    const now = Date.now();
    
    // Remove old images
    let filteredImages = images.filter(img => {
      const age = now - img.timestamp;
      return age < maxAge;
    });

    // Keep only the most recent images if we have too many
    if (filteredImages.length > this.MAX_IMAGES) {
      filteredImages = filteredImages
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, this.MAX_IMAGES);
    }

    // Save cleaned up list
    this.saveStoredImages(filteredImages);
    
    // Log cleanup results
    const removedCount = images.length - filteredImages.length;
    if (removedCount > 0) {
      console.log(`Cleaned up ${removedCount} old images`);
    }
  }

  /**
   * Get total storage usage
   */
  public getStorageUsage(): { count: number; totalSize: number; images: StoredImage[] } {
    const images = this.getStoredImages();
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    
    return {
      count: images.length,
      totalSize,
      images
    };
  }

  /**
   * Clear all tracked images
   */
  public clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('Cleared all tracked images');
  }

  /**
   * Get storage usage in human readable format
   */
  public getStorageUsageFormatted(): string {
    const usage = this.getStorageUsage();
    const sizeMB = (usage.totalSize / (1024 * 1024)).toFixed(2);
    return `${usage.count} ảnh, ${sizeMB} MB`;
  }

  /**
   * Auto cleanup on page load/unload
   */
  public initAutoCleanup(): void {
    // Cleanup on page load
    this.cleanup();
    
    // Cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.cleanup();
      });
      
      // Periodic cleanup every 5 minutes
      setInterval(() => {
        this.cleanup();
      }, 5 * 60 * 1000);
    }
  }
}