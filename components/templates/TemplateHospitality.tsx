'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Award, Briefcase, GraduationCap, Star, FileText, Users, Coffee, Utensils, Plane } from 'lucide-react';

// Cấu hình cho template Hospitality
const hospitalityConfig: TemplateConfig = {
  id: 'hospitality',
  name: 'Hospitality',
  description: 'Thiết kế chuyên nghiệp dành cho ngành khách sạn và du lịch',
  category: 'Hospitality',
  colors: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#e0f2fe'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'single-column'
};

// Template Hospitality class
class HospitalityTemplate extends CVTemplateBase {
  constructor() {
    super(hospitalityConfig);
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
        <div className="bg-gradient-to-r from-sky-600 to-blue-500 text-white p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
                <p className="text-sky-200 mt-1 text-lg">{personalInfo.title}</p>
              </div>
              {personalInfo.avatar && (
                <div className="mt-4 md:mt-0">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="bg-sky-100 py-3 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center md:justify-start">
              <div className="flex items-center">
                <Mail size={14} className="text-sky-600 mr-2" />
                <span className="text-slate-700">{personalInfo.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={14} className="text-sky-600 mr-2" />
                <span className="text-slate-700">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="text-sky-600 mr-2" />
                <span className="text-slate-700">{personalInfo.address}</span>
              </div>
              {personalInfo.website && (
                <div className="flex items-center">
                  <Globe size={14} className="text-sky-600 mr-2" />
                  <span className="text-slate-700">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin size={14} className="text-sky-600 mr-2" />
                  <a href={personalInfo.linkedin} className="text-slate-700 hover:text-sky-600 transition-colors">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 max-w-5xl mx-auto">
          {/* Summary Section */}
          {cvData.getSummary() && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-4 flex items-center">
                <FileText className="inline mr-2" size={22} /> Professional Summary
              </h2>
              <div className="bg-sky-50 rounded-lg p-5 shadow-sm border border-sky-100">
                <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-6 flex items-center">
                <Briefcase className="inline mr-2" size={22} /> Hospitality Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-sky-200 pl-4 hover:border-sky-500 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                        <p className="text-sky-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-1 md:mt-0 bg-sky-100 text-sky-700 text-sm px-3 py-1 rounded-full flex items-center">
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
                            className="px-3 py-1 bg-sky-100 text-sky-600 text-xs rounded-full"
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

          {/* Skills Section - Three Column Layout */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-6 flex items-center">
                <Star className="inline mr-2" size={22} /> Hospitality Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Technical Skills */}
                {skills.filter(skill => skill.category === 'Technical').length > 0 && (
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-sky-100">
                    <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center">
                      <Utensils className="inline mr-2" size={18} /> Technical Skills
                    </h3>
                    <div className="space-y-3">
                      {skills
                        .filter(skill => skill.category === 'Technical')
                        .map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sky-600">{skill.level}</span>
                            </div>
                            <div className="w-full bg-sky-100 rounded-full h-2">
                              <div
                                className="bg-sky-500 h-2 rounded-full transition-all duration-500"
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
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-sky-100">
                    <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center">
                      <Users className="inline mr-2" size={18} /> Customer Service Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills
                        .filter(skill => skill.category === 'Soft')
                        .map(skill => (
                          <span key={skill.id} className="bg-sky-100 text-sky-600 px-3 py-2 rounded-full text-sm">
                            {skill.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-sky-100">
                    <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center">
                      <Globe className="inline mr-2" size={18} /> Languages
                    </h3>
                    <div className="space-y-3">
                      {languages.map((lang, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-slate-700 font-medium">{lang.name}</span>
                          <span className="text-sky-600 text-sm bg-sky-100 px-3 py-1 rounded-full">{lang.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-6 flex items-center">
                <GraduationCap className="inline mr-2" size={22} /> Education & Training
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white rounded-lg p-5 shadow-sm border border-sky-100">
                    <h3 className="text-lg font-semibold text-sky-700">{edu.degree}</h3>
                    <p className="text-slate-700">{edu.field}</p>
                    <p className="text-slate-600 font-medium">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-slate-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-slate-600 mt-2">{edu.description}</p>
                    )}
                    <div className="text-sm text-slate-500 mt-2 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {this.formatDateRange(edu.startDate, edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-4 flex items-center">
                  <Award className="inline mr-2" size={22} /> Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-sky-100">
                      <h4 className="font-medium text-sky-700">{cert.name}</h4>
                      <p className="text-slate-700 text-sm">{cert.issuer}</p>
                      <p className="text-slate-500 text-sm mt-1">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-4 flex items-center">
                  <Plane className="inline mr-2" size={22} /> Special Projects & Events
                </h2>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg p-4 shadow-sm border border-sky-100 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-sky-700">{project.name}</h3>
                      <p className="text-slate-700 text-sm mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2 mb-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-sky-100 text-sky-600 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
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
const hospitalityTemplateInstance = new HospitalityTemplate();

const TemplateHospitalityComponent: React.FC<CVTemplateProps> = (props) => {
  return hospitalityTemplateInstance.render(props);
};

export default withTemplateBase(TemplateHospitalityComponent, hospitalityTemplateInstance);
export { hospitalityTemplateInstance };