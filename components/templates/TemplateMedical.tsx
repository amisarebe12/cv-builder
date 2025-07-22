'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Heart, Award, BookOpen, Stethoscope, Activity, Users, FileText } from 'lucide-react';

// Cấu hình cho template Medical
const medicalConfig: TemplateConfig = {
  id: 'medical',
  name: 'Medical',
  description: 'Thiết kế chuyên nghiệp dành cho ngành y tế và chăm sóc sức khỏe',
  category: 'Healthcare',
  colors: {
    primary: '#0891b2',
    secondary: '#164e63',
    accent: '#e0f2fe'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'two-column'
};

// Template Medical class
class MedicalTemplate extends CVTemplateBase {
  constructor() {
    super(medicalConfig);
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
      <div className={`bg-white shadow-xl overflow-hidden rounded-lg ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-700 to-cyan-900 text-white p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
              <p className="text-cyan-100 mt-1 text-lg">{personalInfo.title}</p>
            </div>
            {personalInfo.avatar && (
              <div className="mt-4 md:mt-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-28 h-28 rounded-full border-4 border-white/20 object-cover shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left Sidebar */}
          <div className="md:col-span-1 bg-cyan-50 p-6">
            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-cyan-900 border-b border-cyan-200 pb-2 mb-4 flex items-center">
                <FileText className="mr-2" size={18} /> Contact Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail size={16} className="mr-3 text-cyan-700" />
                  <span className="text-slate-700">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-3 text-cyan-700" />
                  <span className="text-slate-700">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-3 text-cyan-700" />
                  <span className="text-slate-700">{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe size={16} className="mr-3 text-cyan-700" />
                    <span className="text-slate-700">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin size={16} className="mr-3 text-cyan-700" />
                    <a href={personalInfo.linkedin} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            {education.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-900 border-b border-cyan-200 pb-2 mb-4 flex items-center">
                  <BookOpen className="mr-2" size={18} /> Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-cyan-300 pl-3">
                      <h4 className="font-medium text-slate-800">{edu.degree}</h4>
                      <p className="text-cyan-700 text-sm">{edu.field}</p>
                      <p className="text-slate-600 text-sm">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-slate-600">GPA: <span className="font-medium">{edu.gpa}</span></p>
                      )}
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {this.formatDateRange(edu.startDate, edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-900 border-b border-cyan-200 pb-2 mb-4 flex items-center">
                  <Activity className="mr-2" size={18} /> Clinical Skills
                </h3>
                <div className="space-y-3">
                  {skills
                    .filter(skill => skill.category === 'Technical')
                    .map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700">{skill.name}</span>
                          <span className="text-cyan-700">{skill.level}</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-1.5">
                          <div
                            className="bg-cyan-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: this.getSkillLevelWidth(skill.level) }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {skills.filter(skill => skill.category === 'Soft').length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-900 border-b border-cyan-200 pb-2 mb-4 flex items-center">
                  <Users className="mr-2" size={18} /> Interpersonal Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(skill => skill.category === 'Soft')
                    .map(skill => (
                      <span key={skill.id} className="bg-white text-cyan-700 px-3 py-1 rounded-full text-xs shadow-sm">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-900 border-b border-cyan-200 pb-2 mb-4 flex items-center">
                  <Globe className="mr-2" size={18} /> Languages
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-700">{lang.name}</span>
                      <span className="text-cyan-700 text-xs bg-white px-2 py-1 rounded-full shadow-sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-cyan-900 border-b border-cyan-200 pb-2 mb-4 flex items-center">
                  <Award className="mr-2" size={18} /> Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-cyan-300 pl-3">
                      <h4 className="font-medium text-slate-800">{cert.name}</h4>
                      <p className="text-cyan-700 text-xs">{cert.issuer}</p>
                      <p className="text-slate-500 text-xs">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="md:col-span-2 p-6">
            {/* Summary Section */}
            {cvData.getSummary() && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-cyan-900 border-b-2 border-cyan-200 pb-2 mb-4 flex items-center">
                  <Heart className="mr-2" size={20} /> Professional Summary
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-cyan-900 border-b-2 border-cyan-200 pb-2 mb-6 flex items-center">
                  <Stethoscope className="mr-2" size={20} /> Clinical Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                          <p className="text-cyan-700">{exp.company}</p>
                        </div>
                        <div className="mt-2 md:mt-0 bg-cyan-50 text-cyan-800 text-sm px-3 py-1 rounded-full flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {this.formatDateRange(exp.startDate, exp.endDate)}
                        </div>
                      </div>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 mb-3 ml-2">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-cyan-900 border-b-2 border-cyan-200 pb-2 mb-6 flex items-center">
                  <Activity className="mr-2" size={20} /> Research & Projects
                </h2>
                <div className="grid grid-cols-1 gap-5">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-cyan-800 mb-2">{project.name}</h3>
                      <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center">
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
const medicalTemplateInstance = new MedicalTemplate();

const TemplateMedicalComponent: React.FC<CVTemplateProps> = (props) => {
  return medicalTemplateInstance.render(props);
};

export default withTemplateBase(TemplateMedicalComponent, medicalTemplateInstance);
export { medicalTemplateInstance };