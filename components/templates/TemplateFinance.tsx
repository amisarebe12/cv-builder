'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Award, DollarSign, GraduationCap, BarChart2, TrendingUp, FileText, PieChart } from 'lucide-react';

// Cấu hình cho template Finance
const financeConfig: TemplateConfig = {
  id: 'finance',
  name: 'Finance',
  description: 'Thiết kế chuyên nghiệp dành cho ngành tài chính và ngân hàng',
  category: 'Finance',
  colors: {
    primary: '#047857',
    secondary: '#064e3b',
    accent: '#ecfdf5'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'single-column'
};

// Template Finance class
class FinanceTemplate extends CVTemplateBase {
  constructor() {
    super(financeConfig);
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
        <div className="bg-emerald-800 text-white p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
                <p className="text-emerald-200 mt-1 text-lg">{personalInfo.title}</p>
              </div>
              {personalInfo.avatar && (
                <div className="mt-4 md:mt-0">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-28 h-28 rounded-full border-4 border-emerald-700 object-cover shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="bg-emerald-700 text-white py-3 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center md:justify-start">
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
                  <a href={personalInfo.linkedin} className="hover:text-emerald-200 transition-colors">
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
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-4 flex items-center">
                <FileText className="inline mr-2" size={22} /> Professional Summary
              </h2>
              <div className="bg-emerald-50 rounded-lg p-5 shadow-sm border border-emerald-100">
                <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-6 flex items-center">
                <DollarSign className="inline mr-2" size={22} /> Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-emerald-200 pl-4 hover:border-emerald-500 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                        <p className="text-emerald-700 font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-1 md:mt-0 bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full flex items-center">
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
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
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
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-6 flex items-center">
                <BarChart2 className="inline mr-2" size={22} /> Financial Expertise & Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technical Skills */}
                {skills.filter(skill => skill.category === 'Technical').length > 0 && (
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-4">Technical Skills</h3>
                    <div className="space-y-3">
                      {skills
                        .filter(skill => skill.category === 'Technical')
                        .map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-emerald-700">{skill.level}</span>
                            </div>
                            <div className="w-full bg-emerald-100 rounded-full h-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
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
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-4">Professional Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills
                        .filter(skill => skill.category === 'Soft')
                        .map(skill => (
                          <span key={skill.id} className="bg-emerald-100 text-emerald-700 px-3 py-2 rounded-full text-sm">
                            {skill.name}
                          </span>
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
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-6 flex items-center">
                <GraduationCap className="inline mr-2" size={22} /> Education & Qualifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-700">{edu.degree}</h3>
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
                <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-4 flex items-center">
                  <Award className="inline mr-2" size={22} /> Certifications & Licenses
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100">
                      <h4 className="font-medium text-emerald-700">{cert.name}</h4>
                      <p className="text-slate-700 text-sm">{cert.issuer}</p>
                      <p className="text-slate-500 text-sm mt-1">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-4 flex items-center">
                  <Globe className="inline mr-2" size={22} /> Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm border border-emerald-100">
                      <span className="text-slate-700 font-medium">{lang.name}</span>
                      <span className="text-emerald-700 text-sm bg-emerald-100 px-3 py-1 rounded-full">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 pb-2 mb-6 flex items-center">
                <TrendingUp className="inline mr-2" size={22} /> Financial Projects & Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-2">{project.name}</h3>
                    <p className="text-slate-700 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
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
    );
  }
}

// Tạo instance và export component
const financeTemplateInstance = new FinanceTemplate();

const TemplateFinanceComponent: React.FC<CVTemplateProps> = (props) => {
  return financeTemplateInstance.render(props);
};

export default withTemplateBase(TemplateFinanceComponent, financeTemplateInstance);
export { financeTemplateInstance };