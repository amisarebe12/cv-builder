import { CVData, CVModel } from '../models/CVModel';
import { sampleCVData } from '../data/cvData';
import { getTemplateInfo } from '../utils/CVFactory';

// CV Service class để xử lý các thao tác với dữ liệu CV
export class CVService {
  private static instance: CVService;
  private cvDatabase: CVData[];

  private constructor() {
    // Khởi tạo với dữ liệu mẫu
    this.cvDatabase = [sampleCVData];
  }

  // Singleton pattern
  public static getInstance(): CVService {
    if (!CVService.instance) {
      CVService.instance = new CVService();
    }
    return CVService.instance;
  }

  // Lấy tất cả CV
  public getAllCVs(): Promise<CVModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cvModels = this.cvDatabase.map(data => CVModel.fromJSON(data));
        resolve(cvModels);
      }, 100); // Mô phỏng độ trễ API
    });
  }

  // Lấy CV theo ID
  public getCVById(id: string): Promise<CVModel | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cvData = this.cvDatabase.find(cv => cv.id === id);
        if (cvData) {
          resolve(CVModel.fromJSON(cvData));
        } else {
          resolve(null);
        }
      }, 100);
    });
  }

  // Tạo CV mới
  public createCV(cvData: CVData): Promise<CVModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Kiểm tra ID đã tồn tại
          const existingCV = this.cvDatabase.find(cv => cv.id === cvData.id);
          if (existingCV) {
            reject(new Error('CV với ID này đã tồn tại'));
            return;
          }

          // Thêm thời gian cập nhật nếu chưa có
          if (!cvData.lastModified) {
            cvData.lastModified = new Date().toISOString();
          }

          // Thêm CV mới
          this.cvDatabase.push(cvData);
          const newCV = CVModel.fromJSON(cvData);
          
          // Validate CV
          if (!newCV.isValid()) {
            reject(new Error('Dữ liệu CV không hợp lệ'));
            return;
          }

          resolve(newCV);
        } catch (error) {
          reject(error);
        }
      }, 200);
    });
  }

  // Cập nhật CV
  public updateCV(id: string, updatedData: Partial<CVData>): Promise<CVModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.cvDatabase.findIndex(cv => cv.id === id);
          if (index === -1) {
            reject(new Error('Không tìm thấy CV'));
            return;
          }

          // Thêm thời gian cập nhật
          updatedData.lastModified = new Date().toISOString();

          // Cập nhật dữ liệu
          this.cvDatabase[index] = { ...this.cvDatabase[index], ...updatedData };
          const updatedCV = CVModel.fromJSON(this.cvDatabase[index]);
          
          if (!updatedCV.isValid()) {
            reject(new Error('Dữ liệu CV không hợp lệ sau khi cập nhật'));
            return;
          }

          resolve(updatedCV);
        } catch (error) {
          reject(error);
        }
      }, 200);
    });
  }

  // Xóa CV
  public deleteCV(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.cvDatabase.findIndex(cv => cv.id === id);
        if (index !== -1) {
          this.cvDatabase.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 100);
    });
  }

  // Tìm kiếm CV theo từ khóa
  public searchCVs(keyword: string): Promise<CVModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredCVs = this.cvDatabase.filter(cv => {
          const searchText = `${cv.personalInfo.fullName} ${cv.personalInfo.title} ${cv.summary}`.toLowerCase();
          return searchText.includes(keyword.toLowerCase());
        });
        
        const cvModels = filteredCVs.map(data => CVModel.fromJSON(data));
        resolve(cvModels);
      }, 150);
    });
  }

  // Lấy thống kê
  public getStatistics(): Promise<{
    totalCVs: number;
    averageExperience: number;
    topSkills: string[];
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalCVs = this.cvDatabase.length;
        
        // Tính trung bình kinh nghiệm
        const totalExperience = this.cvDatabase.reduce((sum, cv) => {
          const cvModel = CVModel.fromJSON(cv);
          return sum + cvModel.getTotalExperienceYears();
        }, 0);
        const averageExperience = totalCVs > 0 ? totalExperience / totalCVs : 0;

        // Tìm top skills
        const skillCounts: { [key: string]: number } = {};
        this.cvDatabase.forEach(cv => {
          cv.skills.forEach(skill => {
            skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1;
          });
        });
        
        const topSkills = Object.entries(skillCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([skill]) => skill);

        resolve({
          totalCVs,
          averageExperience: Math.round(averageExperience * 10) / 10,
          topSkills
        });
      }, 100);
    });
  }

  // In CV
  public printCV(cvId: string, templateId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const cvData = this.cvDatabase.find(cv => cv.id === cvId);
          if (!cvData) {
            reject(new Error('Không tìm thấy CV'));
            return;
          }

          // Mở cửa sổ in
          const printWindow = window.open('', '_blank');
          if (!printWindow) {
            reject(new Error('Không thể mở cửa sổ in. Vui lòng kiểm tra popup blocker.'));
            return;
          }

          // Tạo HTML cho việc in với template được chọn
          const printContent = this.generatePrintHTML(cvData, templateId);
          printWindow.document.write(printContent);
          printWindow.document.close();
          
          // Đợi tải fonts và styles xong rồi in
          printWindow.onload = () => {
            // Đợi thêm một chút để đảm bảo CSS đã được áp dụng
            setTimeout(() => {
              printWindow.print();
              printWindow.close();
              resolve(true);
            }, 500);
          };
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  // Tải xuống CV dưới dạng PDF
  public downloadCV(cvId: string, templateId: string, format: 'pdf' | 'html' = 'pdf'): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const cvData = this.cvDatabase.find(cv => cv.id === cvId);
          if (!cvData) {
            reject(new Error('Không tìm thấy CV'));
            return;
          }

          if (format === 'html') {
            // Tải xuống HTML với template được chọn
            const htmlContent = this.generatePrintHTML(cvData, templateId);
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${cvData.personalInfo.fullName}_CV.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            resolve(true);
          } else {
            // Tải xuống PDF (sử dụng browser print to PDF)
            this.generatePDFDownload(cvData, templateId)
              .then(() => resolve(true))
              .catch(reject);
          }
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  // Tạo HTML cho việc in
  private generatePrintHTML(cvData: CVData, templateId: string): string {
    // Import các styles cần thiết cho template
    const tailwindCSS = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    const interFont = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    
    // Lấy thông tin template từ CVFactory
    const templateInfo = getTemplateInfo(templateId);
    
    // Tạo model từ data
    const cvModel = CVModel.fromJSON(cvData);
    
    // Tạo HTML với styles đầy đủ để đảm bảo template hiển thị đúng
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>CV - ${cvData.personalInfo.fullName}</title>
        <link href="${tailwindCSS}" rel="stylesheet">
        <link href="${interFont}" rel="stylesheet">
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none; }
            @page { size: A4; margin: 0; }
          }
          
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: white;
          }
          
          .cv-container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          /* Styles cụ thể cho template ${templateInfo?.name || templateId} */
          .bg-blue-600 { background-color: #2563eb; }
          .text-white { color: white; }
          .text-blue-100 { color: #dbeafe; }
          .text-gray-800 { color: #1f2937; }
          .text-gray-600 { color: #4b5563; }
          .border-blue-600 { border-color: #2563eb; }
          .font-bold { font-weight: 700; }
          .font-semibold { font-weight: 600; }
          .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mb-8 { margin-bottom: 2rem; }
          .p-8 { padding: 2rem; }
          .pb-2 { padding-bottom: 0.5rem; }
          .border-b-2 { border-bottom-width: 2px; }
          .gap-2 { gap: 0.5rem; }
          .gap-6 { gap: 1.5rem; }
          .flex { display: flex; }
          .items-center { align-items: center; }
          .items-start { align-items: flex-start; }
          .grid { display: grid; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          
          /* Responsive styles */
          @media (min-width: 768px) {
            .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
        </style>
      </head>
      <body>
        <div class="cv-container">
          <div id="cv-content">
            <!-- Header Section -->
            <div class="bg-blue-600 text-white p-8">
              <div class="flex items-start gap-6">
                ${cvData.personalInfo.avatar ? `
                  <div class="flex-shrink-0">
                    <img
                      src="${cvData.personalInfo.avatar}"
                      alt="${cvData.personalInfo.fullName}"
                      class="w-24 h-24 rounded-full border-4 border-white object-cover"
                    />
                  </div>
                ` : ''}
                <div class="flex-1">
                  <h1 class="text-3xl font-bold mb-2">${cvData.personalInfo.fullName}</h1>
                  <h2 class="text-xl text-blue-100 mb-4">${cvData.personalInfo.title}</h2>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div class="flex items-center gap-2">
                      <span>✉️</span>
                      <span>${cvData.personalInfo.email}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span>📱</span>
                      <span>${cvData.personalInfo.phone}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span>📍</span>
                      <span>${cvData.personalInfo.address}</span>
                    </div>
                    ${cvData.personalInfo.website ? `
                      <div class="flex items-center gap-2">
                        <span>🌐</span>
                        <span>${cvData.personalInfo.website}</span>
                      </div>
                    ` : ''}
                    ${cvData.personalInfo.linkedin ? `
                      <div class="flex items-center gap-2">
                        <span>🔗</span>
                        <span>LinkedIn</span>
                      </div>
                    ` : ''}
                    ${cvData.personalInfo.github ? `
                      <div class="flex items-center gap-2">
                        <span>💻</span>
                        <span>GitHub</span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8">
              <!-- Summary Section -->
              ${cvData.summary ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Tóm tắt
                  </h3>
                  <p class="text-gray-600">${cvData.summary}</p>
                </section>
              ` : ''}
              
              <!-- Experience Section -->
              ${cvData.experiences.length > 0 ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Kinh nghiệm làm việc
                  </h3>
                  ${cvData.experiences.map(exp => `
                    <div class="mb-6">
                      <div class="flex justify-between items-start mb-1">
                        <h4 class="text-lg font-semibold text-gray-800">${exp.position}</h4>
                        <span class="text-sm text-gray-500">${exp.startDate} - ${exp.endDate || 'Hiện tại'}</span>
                      </div>
                      <div class="text-base font-medium text-gray-700 mb-2">${exp.company}</div>
                      <ul class="list-disc pl-5 text-gray-600">
                        ${exp.description?.map(desc => `<li>${desc}</li>`).join('') || ''}
                      </ul>
                      ${exp.technologies?.length ? `
                        <div class="mt-2 flex flex-wrap gap-1">
                          ${exp.technologies.map(tech => `
                            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${tech}</span>
                          `).join('')}
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </section>
              ` : ''}
              
              <!-- Education Section -->
              ${cvData.education.length > 0 ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Học vấn
                  </h3>
                  ${cvData.education.map(edu => `
                    <div class="mb-4">
                      <div class="flex justify-between items-start">
                        <h4 class="text-lg font-semibold text-gray-800">${edu.degree} - ${edu.field}</h4>
                        <span class="text-sm text-gray-500">${edu.startDate} - ${edu.endDate}</span>
                      </div>
                      <div class="text-base font-medium text-gray-700">${edu.institution}</div>
                      ${edu.description ? `<p class="text-gray-600 mt-1">${edu.description}</p>` : ''}
                      ${edu.gpa ? `<p class="text-gray-600">GPA: ${edu.gpa}</p>` : ''}
                    </div>
                  `).join('')}
                </section>
              ` : ''}
              
              <!-- Skills Section -->
              ${cvData.skills.length > 0 ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Kỹ năng
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${cvData.skills.map(skill => `
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">${skill.name}</span>
                        <span class="text-sm text-gray-500">${skill.level}</span>
                      </div>
                    `).join('')}
                  </div>
                </section>
              ` : ''}
              
              <!-- Projects Section -->
              ${cvData.projects.length > 0 ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Dự án
                  </h3>
                  ${cvData.projects.map(project => `
                    <div class="mb-6">
                      <div class="flex justify-between items-start mb-1">
                        <h4 class="text-lg font-semibold text-gray-800">${project.name}</h4>
                        <span class="text-sm text-gray-500">${project.startDate}${project.endDate ? ` - ${project.endDate}` : ''}</span>
                      </div>
                      <p class="text-gray-600 mb-2">${project.description}</p>
                      ${project.technologies?.length ? `
                        <div class="mt-2 flex flex-wrap gap-1">
                          ${project.technologies.map(tech => `
                            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${tech}</span>
                          `).join('')}
                        </div>
                      ` : ''}
                      ${project.url || project.github ? `
                        <div class="mt-2">
                          ${project.url ? `<a href="${project.url}" class="text-blue-600 mr-4">Demo</a>` : ''}
                          ${project.github ? `<a href="${project.github}" class="text-blue-600">GitHub</a>` : ''}
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </section>
              ` : ''}
              
              <!-- Languages Section -->
              ${cvData.languages?.length > 0 ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Ngôn ngữ
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${cvData.languages.map(lang => `
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">${lang.name}</span>
                        <span class="text-sm text-gray-500">${lang.level}</span>
                      </div>
                    `).join('')}
                  </div>
                </section>
              ` : ''}
              
              <!-- Certifications Section -->
              ${cvData.certifications?.length > 0 ? `
                <section class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Chứng chỉ
                  </h3>
                  ${cvData.certifications.map(cert => `
                    <div class="mb-4">
                      <div class="flex justify-between items-start">
                        <h4 class="text-lg font-semibold text-gray-800">${cert.name}</h4>
                        <span class="text-sm text-gray-500">${cert.date}</span>
                      </div>
                      <div class="text-base text-gray-700">${cert.issuer}</div>
                    </div>
                  `).join('')}
                </section>
              ` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Tạo PDF download
  private generatePDFDownload(cvData: CVData, templateId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Tạo một iframe ẩn để render CV
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        iframe.style.width = '210mm';
        iframe.style.height = '297mm';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          reject(new Error('Không thể tạo iframe'));
          return;
        }

        // Viết HTML vào iframe với template được chọn
        const htmlContent = this.generatePrintHTML(cvData, templateId);
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        // Đợi tải fonts và styles xong rồi in
        iframe.onload = () => {
          try {
            // Đợi thêm một chút để đảm bảo CSS đã được áp dụng
            setTimeout(() => {
              iframe.contentWindow?.print();
              setTimeout(() => {
                document.body.removeChild(iframe);
                resolve();
              }, 1000);
            }, 500);
          } catch (error) {
            document.body.removeChild(iframe);
            reject(error);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }
}