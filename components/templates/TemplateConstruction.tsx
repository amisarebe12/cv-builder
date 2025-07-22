'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Award, Briefcase, GraduationCap, HardHat, FileText, Ruler, Compass } from 'lucide-react';

// Cấu hình cho template Construction
const constructionConfig: TemplateConfig = {
  id: 'construction',
  name: 'Construction',
  description: 'Thiết kế chuyên nghiệp dành cho ngành xây dựng và kiến trúc',
  category: 'Construction',
  colors: {
    primary: '#b45309',
    secondary: '#92400e',
    accent: '#fef3c7'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'two-column'
};

// Template Construction class
class ConstructionTemplate extends CVTemplateBase {
  constructor() {
    super(constructionConfig);
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
        <div className="bg-amber-700 text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
              <p className="text-amber-200 mt-1 text-lg">{personalInfo.title}</p>
            </div>
            {personalInfo.avatar && (
              <div className="mt-4 md:mt-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-28 h-28 rounded-full border-4 border-amber-600 object-cover shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 bg-amber-50 p-6">
            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                <HardHat className="inline mr-2" size={20} /> Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail size={16} className="text-amber-700 mr-3" />
                  <span className="text-slate-700">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-amber-700 mr-3" />
                  <span className="text-slate-700">{personalInfo.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin size={16} className="text-amber-700 mr-3 mt-1" />
                  <span className="text-slate-700">{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe size={16} className="text-amber-700 mr-3" />
                    <span className="text-slate-700">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin size={16} className="text-amber-700 mr-3" />
                    <a href={personalInfo.linkedin} className="text-slate-700 hover:text-amber-700 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Skills Section */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <Ruler className="inline mr-2" size={20} /> Technical Skills
                </h2>
                <div className="space-y-3">
                  {skills
                    .filter(skill => skill.category === 'Technical')
                    .map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-700">{skill.name}</span>
                          <span className="text-amber-700">{skill.level}</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-2">
                          <div
                            className="bg-amber-600 h-2 rounded-full transition-all duration-500"
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
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <Compass className="inline mr-2" size={20} /> Professional Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(skill => skill.category === 'Soft')
                    .map(skill => (
                      <span key={skill.id} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <GraduationCap className="inline mr-2" size={20} /> Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-base font-semibold text-amber-700">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.field}</p>
                      <p className="text-slate-600 font-medium">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-slate-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
                      )}
                      <div className="text-sm text-slate-500 mt-1 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {this.formatDateRange(edu.startDate, edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <Award className="inline mr-2" size={20} /> Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-amber-700">{cert.name}</h4>
                      <p className="text-slate-700 text-sm">{cert.issuer}</p>
                      <p className="text-slate-500 text-sm">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <Globe className="inline mr-2" size={20} /> Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">{lang.name}</span>
                      <span className="text-amber-700 text-sm bg-amber-100 px-3 py-1 rounded-full">{lang.level}</span>
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
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <FileText className="inline mr-2" size={20} /> Professional Summary
                </h2>
                <div className="bg-amber-50 rounded-lg p-4 shadow-sm border border-amber-100">
                  <p className="text-slate-700 leading-relaxed">{cvData.getSummary()}</p>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <Briefcase className="inline mr-2" size={20} /> Professional Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-amber-200 pl-4 hover:border-amber-500 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{exp.position}</h3>
                          <p className="text-amber-700 font-medium">{exp.company}</p>
                        </div>
                        <div className="mt-1 md:mt-0 bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full flex items-center">
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
                              className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
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
                <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4 flex items-center">
                  <Ruler className="inline mr-2" size={20} /> Construction Projects
                </h2>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg p-5 shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-amber-700 mb-2">{project.name}</h3>
                      <p className="text-slate-700 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
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
const constructionTemplateInstance = new ConstructionTemplate();

const TemplateConstructionComponent: React.FC<CVTemplateProps> = (props) => {
  return constructionTemplateInstance.render(props);
};

export default withTemplateBase(TemplateConstructionComponent, constructionTemplateInstance);
export { constructionTemplateInstance };