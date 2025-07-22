'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ScreenshotOptions {
  format?: 'png' | 'pdf';
  quality?: number;
  scale?: number;
  filename?: string;
  backgroundColor?: string;
}

export class ScreenshotService {
  private static instance: ScreenshotService;

  public static getInstance(): ScreenshotService {
    if (!ScreenshotService.instance) {
      ScreenshotService.instance = new ScreenshotService();
    }
    return ScreenshotService.instance;
  }

  /**
   * Chụp ảnh màn hình của một element DOM
   * @param element - Element DOM cần chụp
   * @param options - Tùy chọn cho việc chụp ảnh
   * @returns Promise<string> - Data URL của ảnh đã chụp
   */
  public async captureElement(
    element: HTMLElement,
    options: ScreenshotOptions = {}
  ): Promise<string> {
    const {
      quality = 1,
      scale = 2,
      backgroundColor = '#ffffff'
    } = options;

    try {
      // Cấu hình html2canvas
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        background: backgroundColor,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      // Chuyển đổi canvas thành data URL
      const dataURL = canvas.toDataURL('image/png', quality);
      return dataURL;
    } catch (error) {
      console.error('Lỗi khi chụp ảnh màn hình:', error);
      throw new Error('Không thể chụp ảnh màn hình CV');
    }
  }

  /**
   * Tải xuống ảnh dưới dạng PNG
   * @param element - Element DOM cần chụp
   * @param filename - Tên file (không bao gồm extension)
   * @param options - Tùy chọn cho việc chụp ảnh
   */
  public async downloadAsPNG(
    element: HTMLElement,
    filename: string = 'cv-screenshot',
    options: ScreenshotOptions = {}
  ): Promise<void> {
    try {
      const dataURL = await this.captureElement(element, options);
      
      // Tạo link download
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataURL;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Lỗi khi tải xuống PNG:', error);
      throw error;
    }
  }

  /**
   * Tải xuống ảnh dưới dạng PDF
   * @param element - Element DOM cần chụp
   * @param filename - Tên file (không bao gồm extension)
   * @param options - Tùy chọn cho việc chụp ảnh
   */
  public async downloadAsPDF(
    element: HTMLElement,
    filename: string = 'cv-screenshot',
    options: ScreenshotOptions = {}
  ): Promise<void> {
    try {
      const dataURL = await this.captureElement(element, options);
      
      // Tạo PDF từ ảnh
      const img = new Image();
      img.onload = () => {
        // Tính toán kích thước PDF (A4)
        const pdfWidth = 210; // mm
        const pdfHeight = 297; // mm
        
        // Tính toán tỷ lệ để fit vào A4
        const imgAspectRatio = img.width / img.height;
        const pdfAspectRatio = pdfWidth / pdfHeight;
        
        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;
        
        if (imgAspectRatio > pdfAspectRatio) {
          // Ảnh rộng hơn, fit theo chiều rộng
          finalHeight = pdfWidth / imgAspectRatio;
        } else {
          // Ảnh cao hơn, fit theo chiều cao
          finalWidth = pdfHeight * imgAspectRatio;
        }
        
        // Tạo PDF
        const pdf = new jsPDF({
          orientation: finalWidth > finalHeight ? 'landscape' : 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Thêm ảnh vào PDF
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;
        
        pdf.addImage(dataURL, 'PNG', x, y, finalWidth, finalHeight);
        
        // Tải xuống PDF
        pdf.save(`${filename}.pdf`);
      };
      
      img.src = dataURL;
    } catch (error) {
      console.error('Lỗi khi tải xuống PDF:', error);
      throw error;
    }
  }

  /**
   * In ảnh trực tiếp
   * @param element - Element DOM cần chụp
   * @param options - Tùy chọn cho việc chụp ảnh
   */
  public async printScreenshot(
    element: HTMLElement,
    options: ScreenshotOptions = {}
  ): Promise<void> {
    try {
      const dataURL = await this.captureElement(element, options);
      
      // Tạo cửa sổ mới để in
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Không thể mở cửa sổ in. Vui lòng kiểm tra popup blocker.');
      }
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>In CV</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: white;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              img {
                width: 100%;
                height: auto;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <img src="${dataURL}" alt="CV Screenshot" />
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Đợi ảnh load xong rồi in
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };
    } catch (error) {
      console.error('Lỗi khi in ảnh:', error);
      throw error;
    }
  }

  /**
   * Lấy preview ảnh dưới dạng data URL
   * @param element - Element DOM cần chụp
   * @param options - Tùy chọn cho việc chụp ảnh
   * @returns Promise<string> - Data URL của ảnh
   */
  public async getPreviewDataURL(
    element: HTMLElement,
    options: ScreenshotOptions = {}
  ): Promise<string> {
    return await this.captureElement(element, options);
  }
}

export default ScreenshotService;