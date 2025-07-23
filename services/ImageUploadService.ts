'use client';

import { ImageCleanupService } from './ImageCleanupService';

export interface UploadResult {
  success: boolean;
  url?: string;
  imageId?: string;
  error?: string;
}

export interface UploadOptions {
  maxSize?: number; // MB
  allowedTypes?: string[];
  quality?: number;
}

export class ImageUploadService {
  private static instance: ImageUploadService;
  private readonly MAX_SIZE_MB = 5;
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  public static getInstance(): ImageUploadService {
    if (!ImageUploadService.instance) {
      ImageUploadService.instance = new ImageUploadService();
    }
    return ImageUploadService.instance;
  }

  /**
   * Validate file before upload
   */
  public validateFile(file: File, options?: UploadOptions): { valid: boolean; error?: string } {
    const maxSize = options?.maxSize || this.MAX_SIZE_MB;
    const allowedTypes = options?.allowedTypes || this.ALLOWED_TYPES;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return {
        valid: false,
        error: `Kích thước file không được vượt quá ${maxSize}MB`
      };
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Chỉ hỗ trợ file ảnh định dạng JPG, PNG, WEBP'
      };
    }

    return { valid: true };
  }

  /**
   * Compress image if needed
   */
  public compressImage(file: File, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 800x800)
        const maxSize = 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Không thể nén ảnh'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Không thể đọc file ảnh'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Convert file to base64 data URL
   */
  public fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Không thể đọc file'));
        }
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Upload avatar image (for demo, stores as base64)
   * In production, this should upload to a cloud service
   */
  public async uploadAvatar(file: File, options?: UploadOptions): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file, options);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error
        };
      }

      // Compress image if it's too large
      let processedFile = file;
      if (file.size > 1024 * 1024) { // > 1MB
        processedFile = await this.compressImage(file, options?.quality || 0.8);
      }

      // Convert to data URL (in production, upload to cloud storage)
      const dataURL = await this.fileToDataURL(processedFile);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Track image for cleanup
      const cleanupService = ImageCleanupService.getInstance();
      const imageId = cleanupService.trackImage(
        dataURL,
        processedFile.size,
        processedFile.type
      );

      return {
        success: true,
        url: dataURL,
        imageId
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Lỗi không xác định'
      };
    }
  }

  /**
   * Delete uploaded image (cleanup)
   */
  public async deleteImage(url: string): Promise<boolean> {
    try {
      // In production, this would delete from cloud storage
      // For demo, we just return success
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  }

  /**
   * Get image info from data URL
   */
  public getImageInfo(dataURL: string): { size: number; type: string } | null {
    try {
      const base64 = dataURL.split(',')[1];
      if (!base64) return null;
      
      const binary = atob(base64);
      const size = binary.length;
      const type = dataURL.split(';')[0].split(':')[1];
      
      return { size, type };
    } catch (error) {
      return null;
    }
  }
}