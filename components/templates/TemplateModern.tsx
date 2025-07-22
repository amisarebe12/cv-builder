'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Award, Briefcase, GraduationCap } from 'lucide-react';

// Cấu hình cho template Modern
const modernConfig: TemplateConfig = {
  id: 'modern',
  name: 'Modern',
  description: 'Thiết kế hiện đại, bắt mắt',
  category: 'Creative',
  colors: {
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#f3e8ff'
  },
  fonts: {
    heading: 'Poppins',
    body: 'Inter'
  },
  layout: 'two-column'
};

// Template Modern class
class ModernTemplate extends CVTemplateBase {
  constructor() {
    super(modernConfig);
  }

  render(props: CVTemplateProps): React.ReactElement {
    const { cvData, className = '', isPreview = false } = props;
    const personalInfo = cvData.getPersonalInfo();
    const experiences = cvData.getExperiences();
    const education = cvData.getEducation();
    const skills = cvData.getSkills();
    const projects = cvData.getProjects();
    const languages = cvData.getLanguages();
    const certifications = cvData.getCertifications();

    return (
      <div className={`bg-white shadow-xl overflow-hidden ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white p-8">
            {/* Profile Section */}
            <div className="text-center mb-8">
              {personalInfo.avatar && (
                <div className="mb-6">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white/20 object-cover shadow-lg"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName}</h1>
              <p className="text-purple-200 text-lg">{personalInfo.title}</p>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="mr-2" size={18} />
                Liên hệ
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-3 text-purple-300" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-3 text-purple-300" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-3 text-purple-300" />
                  <span>{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe size={14} className="mr-3 text-purple-300" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin size={14} className="mr-3 text-purple-300" />
                    <span>LinkedIn Profile</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <Github size={14} className="mr-3 text-purple-300" />
                    <span>GitHub Profile</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Kỹ năng</h3>
                <div className="space-y-4">
                  {['Technical', 'Soft', 'Language'].map((category) => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-purple-200 mb-2">
                          {category === 'Technical' ? 'Kỹ thuật' : 
                           category === 'Soft' ? 'Kỹ năng mềm' : 'Ngôn ngữ'}
                        </h4>
                        <div className="space-y-2">
                          {categorySkills.slice(0, 6).map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{skill.name}</span>
                                <span className="text-purple-300">{skill.level}</span>
                              </div>
                              <div className="w-full bg-white/20 rounded-full h-1.5">
                                <div
                                  className="bg-white h-1.5 rounded-full transition-all duration-500"
                                  style={{ width: this.getSkillLevelWidth(skill.level) }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Ngôn ngữ</h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="text-purple-300">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="mr-2" size={18} />
                  Chứng chỉ
                </h3>
                <div className="space-y-3">
                  {certifications.slice(0, 3).map((cert, index) => (
                    <div key={index} className="text-sm">
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-purple-200 text-xs">{cert.issuer}</p>
                      <p className="text-purple-300 text-xs">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 p-8">
            {/* Summary Section */}
            {cvData.getSummary() && (
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Tóm tắt</h2>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">{cvData.getSummary()}</p>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Briefcase className="text-white" size={16} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Kinh nghiệm làm việc</h2>
                </div>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {/* Timeline line */}
                      {index < experiences.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-full bg-purple-200"></div>
                      )}
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 relative z-10">
                          <span className="text-white font-bold text-xs">{index + 1}</span>
                        </div>
                        <div className="flex-1 bg-white border border-purple-100 rounded-lg p-6 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                              <p className="text-purple-600 font-medium text-lg">{exp.company}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              <Calendar size={14} className="mr-1" />
                              {this.formatDateRange(exp.startDate, exp.endDate)}
                            </div>
                          </div>
                          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                            {exp.description.map((desc, descIndex) => (
                              <li key={descIndex}>{desc}</li>
                            ))}
                          </ul>
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <GraduationCap className="text-white" size={16} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Học vấn</h2>
                </div>
                <div className="grid gap-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{edu.degree} - {edu.field}</h3>
                          <p className="text-purple-600 font-medium">{edu.institution}</p>
                          {edu.gpa && (
                            <p className="text-sm text-gray-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
                          )}
                          {edu.description && (
                            <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          <Calendar size={14} className="mr-1" />
                          {this.formatDateRange(edu.startDate, edu.endDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Dự án nổi bật</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white border border-purple-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {this.formatDateRange(project.startDate, project.endDate || 'Present')}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Tạo instance và export component
const modernTemplateInstance = new ModernTemplate();

const TemplateModernComponent: React.FC<CVTemplateProps> = (props) => {
  return modernTemplateInstance.render(props);
};

export default withTemplateBase(TemplateModernComponent, modernTemplateInstance);
export { modernTemplateInstance };