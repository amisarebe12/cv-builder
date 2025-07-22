'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Code, Server, Database, Cpu, Layers, Terminal } from 'lucide-react';

// Cấu hình cho template Tech
const techConfig: TemplateConfig = {
  id: 'tech',
  name: 'Tech',
  description: 'Thiết kế hiện đại dành cho ngành IT và công nghệ',
  category: 'Technology',
  colors: {
    primary: '#0ea5e9',
    secondary: '#0f172a',
    accent: '#f0f9ff'
  },
  fonts: {
    heading: 'monospace',
    body: 'sans-serif'
  },
  layout: 'two-column'
};

// Template Tech class
class TechTemplate extends CVTemplateBase {
  constructor() {
    super(techConfig);
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
      <div className={`bg-slate-50 shadow-xl overflow-hidden rounded-lg ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 bg-slate-900 text-white p-8">
            {/* Profile Section */}
            <div className="text-center mb-8">
              {personalInfo.avatar && (
                <div className="mb-6">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-sky-500/20 object-cover shadow-lg"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold font-mono mb-2">{personalInfo.fullName}</h1>
              <div className="bg-sky-500 text-white text-sm py-1 px-3 rounded-full inline-block mb-4">
                {personalInfo.title}
              </div>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="text-lg font-mono font-semibold mb-4 border-b border-sky-500/30 pb-2">
                <Terminal className="inline mr-2" size={18} /> Contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-3 text-sky-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-3 text-sky-400" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-3 text-sky-400" />
                  <span>{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe size={14} className="mr-3 text-sky-400" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin size={14} className="mr-3 text-sky-400" />
                    <a href={personalInfo.linkedin} className="hover:text-sky-400 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <Github size={14} className="mr-3 text-sky-400" />
                    <a href={personalInfo.github} className="hover:text-sky-400 transition-colors">
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-mono font-semibold mb-4 border-b border-sky-500/30 pb-2">
                  <Code className="inline mr-2" size={18} /> Tech Skills
                </h3>
                <div className="space-y-4">
                  {['Technical'].map((category) => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <div className="space-y-2">
                          {categorySkills.map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-mono">{skill.name}</span>
                                <span className="text-sky-400">{skill.level}</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-1.5">
                                <div
                                  className="bg-sky-500 h-1.5 rounded-full transition-all duration-500"
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

            {/* Soft Skills */}
            {skills.filter(skill => skill.category === 'Soft').length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-mono font-semibold mb-4 border-b border-sky-500/30 pb-2">
                  <Layers className="inline mr-2" size={18} /> Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(skill => skill.category === 'Soft')
                    .map(skill => (
                      <span key={skill.id} className="bg-slate-800 text-sky-400 px-3 py-1 rounded-full text-xs">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-mono font-semibold mb-4 border-b border-sky-500/30 pb-2">
                  <Globe className="inline mr-2" size={18} /> Languages
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="text-sky-400 text-xs bg-slate-800 px-2 py-0.5 rounded">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-mono font-semibold mb-4 border-b border-sky-500/30 pb-2">
                  <Server className="inline mr-2" size={18} /> Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="text-sm bg-slate-800 p-3 rounded">
                      <h4 className="font-medium text-sky-400">{cert.name}</h4>
                      <p className="text-slate-300 text-xs">{cert.issuer}</p>
                      <p className="text-slate-400 text-xs mt-1">{this.formatDate(cert.date)}</p>
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
                  <h2 className="text-2xl font-bold text-slate-800 font-mono border-b-2 border-sky-500 pb-1">
                    <span className="text-sky-500">&gt;</span> About Me
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
                  <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 font-mono border-b-2 border-sky-500 pb-1">
                    <span className="text-sky-500">&gt;</span> Work Experience
                  </h2>
                </div>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                          <p className="text-sky-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="mt-2 md:mt-0 bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {this.formatDateRange(exp.startDate, exp.endDate)}
                        </div>
                      </div>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 mb-4 ml-2">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-sky-100 text-sky-800 text-xs rounded-full font-mono"
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
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 font-mono border-b-2 border-sky-500 pb-1">
                    <span className="text-sky-500">&gt;</span> Education
                  </h2>
                </div>
                <div className="grid gap-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
                      <div className="flex flex-col md:flex-row justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{edu.degree} - {edu.field}</h3>
                          <p className="text-sky-600 font-medium">{edu.institution}</p>
                          {edu.gpa && (
                            <p className="text-sm text-slate-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
                          )}
                          {edu.description && (
                            <p className="text-sm text-slate-600 mt-2">{edu.description}</p>
                          )}
                        </div>
                        <div className="mt-2 md:mt-0 bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full flex items-center">
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
                  <h2 className="text-2xl font-bold text-slate-800 font-mono border-b-2 border-sky-500 pb-1">
                    <span className="text-sky-500">&gt;</span> Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 font-mono">{project.name}</h3>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-slate-500 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {this.formatDateRange(project.startDate, project.endDate || 'Present')}
                        </div>
                        <div className="flex space-x-2">
                          {project.github && (
                            <a href={project.github} className="text-sky-600 hover:text-sky-800 transition-colors">
                              <Github size={16} />
                            </a>
                          )}
                          {project.url && (
                            <a href={project.url} className="text-sky-600 hover:text-sky-800 transition-colors">
                              <Globe size={16} />
                            </a>
                          )}
                        </div>
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
const techTemplateInstance = new TechTemplate();

const TemplateTechComponent: React.FC<CVTemplateProps> = (props) => {
  return techTemplateInstance.render(props);
};

export default withTemplateBase(TemplateTechComponent, techTemplateInstance);
export { techTemplateInstance };