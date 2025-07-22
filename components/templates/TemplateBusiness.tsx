'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Award, Briefcase, GraduationCap, BarChart2, Target, Users, TrendingUp } from 'lucide-react';

// Cấu hình cho template Business
const businessConfig: TemplateConfig = {
  id: 'business',
  name: 'Business',
  description: 'Thiết kế chuyên nghiệp dành cho ngành kinh doanh và quản lý',
  category: 'Business',
  colors: {
    primary: '#0f766e',
    secondary: '#1e293b',
    accent: '#f0fdfa'
  },
  fonts: {
    heading: 'serif',
    body: 'sans-serif'
  },
  layout: 'single-column'
};

// Template Business class
class BusinessTemplate extends CVTemplateBase {
  constructor() {
    super(businessConfig);
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
        <div className="bg-teal-800 text-white p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold">{personalInfo.fullName}</h1>
              <p className="text-teal-200 mt-1 text-lg">{personalInfo.title}</p>
            </div>
            {personalInfo.avatar && (
              <div className="mt-4 md:mt-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-24 h-24 rounded-full border-4 border-teal-700 object-cover shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="bg-teal-700 text-white py-3 px-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center">
              <Mail size={14} className="mr-2" />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone size={14} className="mr-2" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-2" />
              <span>{personalInfo.address}</span>
            </div>
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe size={14} className="mr-2" />
                <span>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin size={14} className="mr-2" />
                <a href={personalInfo.linkedin} className="hover:text-teal-200 transition-colors">
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Summary Section */}
          {cvData.getSummary() && (
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-4">
                <Target className="inline mr-2" size={22} /> Professional Summary
              </h2>
              <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
            </section>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-6">
                <Briefcase className="inline mr-2" size={22} /> Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-teal-700 pl-4 pb-2">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                        <p className="text-teal-700 font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-1 md:mt-0 bg-teal-50 text-teal-800 text-sm px-3 py-1 rounded flex items-center">
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
                            className="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded"
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

          {/* Skills Section - Two Column Layout */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-6">
                <BarChart2 className="inline mr-2" size={22} /> Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technical Skills */}
                {skills.filter(skill => skill.category === 'Technical').length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-teal-700 mb-3">Technical Skills</h3>
                    <div className="space-y-3">
                      {skills
                        .filter(skill => skill.category === 'Technical')
                        .map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-teal-700">{skill.level}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-teal-600 h-2 rounded-full transition-all duration-500"
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
                  <div>
                    <h3 className="text-lg font-semibold text-teal-700 mb-3">Leadership & Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills
                        .filter(skill => skill.category === 'Soft')
                        .map(skill => (
                          <span key={skill.id} className="bg-teal-50 text-teal-700 px-3 py-2 rounded text-sm">
                            {skill.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Section */}
            {education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-4">
                  <GraduationCap className="inline mr-2" size={22} /> Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-4 border-teal-100 pl-4">
                      <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                      <p className="text-teal-700">{edu.field}</p>
                      <p className="text-slate-600">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-slate-600">GPA: <span className="font-medium">{edu.gpa}</span></p>
                      )}
                      <div className="text-sm text-slate-500 mt-1 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {this.formatDateRange(edu.startDate, edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications & Languages */}
            <div>
              {/* Certifications */}
              {certifications.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-4">
                    <Award className="inline mr-2" size={22} /> Certifications
                  </h2>
                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="border-l-4 border-teal-100 pl-4">
                        <h4 className="font-medium text-slate-800">{cert.name}</h4>
                        <p className="text-teal-700 text-sm">{cert.issuer}</p>
                        <p className="text-slate-500 text-sm">{this.formatDate(cert.date)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-4">
                    <Globe className="inline mr-2" size={22} /> Languages
                  </h2>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-slate-700">{lang.name}</span>
                        <span className="text-teal-700 text-sm bg-teal-50 px-2 py-1 rounded">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-teal-800 border-b-2 border-teal-800 pb-2 mb-6">
                <TrendingUp className="inline mr-2" size={22} /> Key Projects & Initiatives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-teal-100 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">{project.name}</h3>
                    <p className="text-slate-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded"
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
    );
  }
}

// Tạo instance và export component
const businessTemplateInstance = new BusinessTemplate();

const TemplateBusinessComponent: React.FC<CVTemplateProps> = (props) => {
  return businessTemplateInstance.render(props);
};

export default withTemplateBase(TemplateBusinessComponent, businessTemplateInstance);
export { businessTemplateInstance };