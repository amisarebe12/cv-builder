'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Palette, Feather, Image, Layers, Aperture, Compass, Zap } from 'lucide-react';

// Cấu hình cho template Creative2
const creative2Config: TemplateConfig = {
  id: 'creative2',
  name: 'Creative Pro',
  description: 'Thiết kế hiện đại và sáng tạo dành cho ngành thiết kế và nghệ thuật',
  category: 'Creative',
  colors: {
    primary: '#ec4899',
    secondary: '#6d28d9',
    accent: '#fdf2f8'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'two-column'
};

// Template Creative2 class
class Creative2Template extends CVTemplateBase {
  constructor() {
    super(creative2Config);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 bg-gradient-to-b from-purple-700 via-fuchsia-600 to-pink-600 text-white p-8">
            {/* Profile Section */}
            <div className="text-center mb-10">
              {personalInfo.avatar && (
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName}</h1>
              <div className="bg-white/20 backdrop-blur-sm text-white text-sm py-1 px-4 rounded-full inline-block mb-4">
                {personalInfo.title}
              </div>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 flex items-center">
                <Compass className="mr-2" size={18} /> Contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-3 opacity-70" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-3 opacity-70" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-3 opacity-70" />
                  <span>{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe size={14} className="mr-3 opacity-70" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin size={14} className="mr-3 opacity-70" />
                    <a href={personalInfo.linkedin} className="hover:text-pink-200 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <Github size={14} className="mr-3 opacity-70" />
                    <a href={personalInfo.github} className="hover:text-pink-200 transition-colors">
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 flex items-center">
                  <Palette className="mr-2" size={18} /> Design Skills
                </h3>
                <div className="space-y-4">
                  {['Technical'].map((category) => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <div className="space-y-3">
                          {categorySkills.map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{skill.name}</span>
                                <span className="opacity-80">{skill.level}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
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

            {/* Soft Skills */}
            {skills.filter(skill => skill.category === 'Soft').length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 flex items-center">
                  <Feather className="mr-2" size={18} /> Creative Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(skill => skill.category === 'Soft')
                    .map(skill => (
                      <span key={skill.id} className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 flex items-center">
                  <Globe className="mr-2" size={18} /> Languages
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="text-xs bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 flex items-center">
                  <Aperture className="mr-2" size={18} /> Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="text-sm bg-white/10 backdrop-blur-sm p-3 rounded">
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-white/80 text-xs">{cert.issuer}</p>
                      <p className="text-white/60 text-xs mt-1">{this.formatDate(cert.date)}</p>
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
              <section className="mb-10">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-800 relative">
                    <span className="relative z-10">About Me</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-pink-200 -z-0"></span>
                  </h2>
                </div>
                <div className="text-slate-700 leading-relaxed">{cvData.getSummary()}</div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-800 relative">
                    <span className="relative z-10">Creative Experience</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-pink-200 -z-0"></span>
                  </h2>
                </div>
                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-8 border-l-2 border-pink-200">
                      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-pink-500"></div>
                      <div className="mb-4">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-purple-800">{exp.position}</h3>
                            <p className="text-pink-600">{exp.company}</p>
                          </div>
                          <div className="mt-2 md:mt-0 bg-pink-50 text-pink-700 text-sm px-3 py-1 rounded-full flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {this.formatDateRange(exp.startDate, exp.endDate)}
                          </div>
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
                              className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
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
              <section className="mb-10">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-800 relative">
                    <span className="relative z-10">Education</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-pink-200 -z-0"></span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 shadow-sm">
                      <h3 className="text-lg font-semibold text-purple-800">{edu.degree}</h3>
                      <p className="text-pink-600">{edu.field}</p>
                      <p className="text-slate-700">{edu.institution}</p>
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
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-800 relative">
                    <span className="relative z-10">Portfolio Projects</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-pink-200 -z-0"></span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-pink-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      <div className="bg-white p-6 relative z-20">
                        <h3 className="text-lg font-semibold text-purple-800 group-hover:text-white transition-colors duration-300 mb-2">
                          {project.name}
                        </h3>
                        <p className="text-slate-600 group-hover:text-white/90 transition-colors duration-300 text-sm mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded group-hover:bg-white/20 group-hover:text-white transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-500 group-hover:text-white/70 transition-colors duration-300 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {this.formatDateRange(project.startDate, project.endDate || 'Present')}
                          </div>
                          <div className="flex space-x-2">
                            {project.github && (
                              <a href={project.github} className="text-purple-600 hover:text-purple-800 group-hover:text-white transition-colors duration-300">
                                <Github size={16} />
                              </a>
                            )}
                            {project.url && (
                              <a href={project.url} className="text-purple-600 hover:text-purple-800 group-hover:text-white transition-colors duration-300">
                                <Globe size={16} />
                              </a>
                            )}
                          </div>
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
const creative2TemplateInstance = new Creative2Template();

const TemplateCreative2Component: React.FC<CVTemplateProps> = (props) => {
  return creative2TemplateInstance.render(props);
};

export default withTemplateBase(TemplateCreative2Component, creative2TemplateInstance);
export { creative2TemplateInstance };