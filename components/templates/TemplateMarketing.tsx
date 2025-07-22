'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Award, Briefcase, GraduationCap, BarChart2, Target, FileText, TrendingUp, Users, Zap } from 'lucide-react';

// Cấu hình cho template Marketing
const marketingConfig: TemplateConfig = {
  id: 'marketing',
  name: 'Marketing',
  description: 'Thiết kế hiện đại và sáng tạo dành cho ngành marketing và truyền thông',
  category: 'Marketing',
  colors: {
    primary: '#7c3aed',
    secondary: '#5b21b6',
    accent: '#f5f3ff'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'two-column'
};

// Template Marketing class
class MarketingTemplate extends CVTemplateBase {
  constructor() {
    super(marketingConfig);
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
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-violet-700 to-purple-500 text-white p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
              <p className="text-violet-200 mt-1 text-lg">{personalInfo.title}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm justify-center md:justify-start">
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
              </div>
            </div>
            {personalInfo.avatar && (
              <div className="mt-6 md:mt-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 bg-violet-50 p-6">
            {/* Social & Website */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                <Users className="inline mr-2" size={20} /> Connect
              </h2>
              <div className="space-y-3">
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe size={16} className="text-violet-700 mr-3" />
                    <a href={personalInfo.website} className="text-slate-700 hover:text-violet-700 transition-colors">
                      {personalInfo.website}
                    </a>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin size={16} className="text-violet-700 mr-3" />
                    <a href={personalInfo.linkedin} className="text-slate-700 hover:text-violet-700 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Marketing Skills Section */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <Target className="inline mr-2" size={20} /> Marketing Skills
                </h2>
                <div className="space-y-3">
                  {skills
                    .filter(skill => skill.category === 'Technical')
                    .map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-700">{skill.name}</span>
                          <span className="text-violet-700">{skill.level}</span>
                        </div>
                        <div className="w-full bg-violet-100 rounded-full h-2">
                          <div
                            className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: this.getSkillLevelWidth(skill.level) }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Soft Skills */}
            {skills.filter(skill => skill.category === 'Soft').length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <Zap className="inline mr-2" size={20} /> Creative Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(skill => skill.category === 'Soft')
                    .map(skill => (
                      <span key={skill.id} className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <Globe className="inline mr-2" size={20} /> Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">{lang.name}</span>
                      <span className="text-violet-700 text-sm bg-violet-100 px-3 py-1 rounded-full">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <Award className="inline mr-2" size={20} /> Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-violet-700">{cert.name}</h4>
                      <p className="text-slate-700 text-sm">{cert.issuer}</p>
                      <p className="text-slate-500 text-sm">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-6">
            {/* Summary Section */}
            {cvData.getSummary() && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <FileText className="inline mr-2" size={20} /> Professional Summary
                </h2>
                <div className="bg-violet-50 rounded-lg p-4 shadow-sm border border-violet-100">
                  <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <Briefcase className="inline mr-2" size={20} /> Marketing Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-violet-200 pl-4 hover:border-violet-500 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{exp.position}</h3>
                          <p className="text-violet-700 font-medium">{exp.company}</p>
                        </div>
                        <div className="mt-1 md:mt-0 bg-violet-100 text-violet-800 text-sm px-3 py-1 rounded-full flex items-center">
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
                              className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full"
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

            {/* Education Section */}
            {education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <GraduationCap className="inline mr-2" size={20} /> Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-lg p-4 shadow-sm border border-violet-100">
                      <h3 className="text-lg font-semibold text-violet-700">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.field}</p>
                      <p className="text-slate-600 font-medium">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-slate-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
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

            {/* Projects Section */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-violet-800 border-b-2 border-violet-300 pb-2 mb-4 flex items-center">
                  <TrendingUp className="inline mr-2" size={20} /> Marketing Campaigns & Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg p-4 shadow-sm border border-violet-100 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-violet-700 mb-2">{project.name}</h3>
                      <p className="text-slate-700 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full"
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
const marketingTemplateInstance = new MarketingTemplate();

const TemplateMarketingComponent: React.FC<CVTemplateProps> = (props) => {
  return marketingTemplateInstance.render(props);
};

export default withTemplateBase(TemplateMarketingComponent, marketingTemplateInstance);
export { marketingTemplateInstance };