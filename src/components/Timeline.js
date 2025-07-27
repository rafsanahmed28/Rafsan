import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FcGraduationCap, FcIdea, FcBriefcase, FcGoogle, FcStatistics, FcGlobe } from "react-icons/fc";
import { SiOpenai } from "react-icons/si";
import "../styles/Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "Masters at TMU",
    description: "Enrolled in an Innovation and Entrepreneurship degree in an attempt to explore new fields and gain a broader perspective on business and technology.",
    year: "Sep 2022 - Dec 2023",
    type: "education" 
  },
  {
    title: "Exposure to Data in Startup Environments",
    description: "During my time at TMU, I worked at 3 different startups where I gained initial exposure to huge amounts of data during market research, which introduced me to the power of data analytics in decision making.",
    year: "Sep 2022 - Jan 2024",
    type: "startup",
    learnMoreLink: "#experience", 
    learnMoreText: "View Experience"
  },
  {
    title: "Decision to Pivot to Data Analytics",
    description: "Realized my passion for data analytics and decided to pivot my career towards becoming a Data Analyst, focusing on data-driven decision making.",
    year: "Jan 2024 - Feb 2024",
    type: "career",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    description: "Completed Google's Data Analytics Professional Certificate, establishing core competencies in data preparation, analysis, and visualization.",
    certificateUrl: "https://www.coursera.org/account/accomplishments/professional-cert/23OIJ3BGH8FJ",
    year: "Mar 2024 - Sep 2024",
    type: "google",

  },
  {
    title: "Advanced Data Analysis Projects",
    description: "Built my first portfolio projects (Covid-19 and Cyclistic), analyzing real-world datasets using Excel, MySQL and creating visualizations with Tableau. Deepened my skills in advanced data analysis techniques, delving deeper into advanced SQL queries,  and diving into Python to unlock even more powerful ways to explore, manipulate, and tell stories with data.",
    year: "Sep 2024 - May 2025",
    type: "project",
    learnMoreLink: "#projects",
    learnMoreText: "View Projects"
  },
  {
    title: "Building My Portfolio Website",
    description: "Developed a personal website using React, HTML/CSS, and JavaScript. While building it, I used AI tools like ChatGPT, Claude Code and GitHub Copilot - this sparked my fascination with AI's potential in accelerating tech development.",
    year: "May 2025 - Jun 2025",
    type: "website",
  },
  {
    title: "Shift to AI focused Data Automation",
    description: "Inspired by the power of AI during web development, I started exploring local LLMs, OpenAI and Anthropic models, n8n AI Automation workflows, Lovable.dev - focusing on automating repetitive tasks, integrating systems - building intelligent workflows and executive friendly user interfaces.",
    year: "May 2025 - Present",
    type: "ai",
  }
];

export default function Timeline() {
  const timelineWrapRef = useRef(null);
  const timelineItemsRef = useRef([]);
  
  useEffect(() => {
    timelineItemsRef.current = timelineItemsRef.current.filter(Boolean);
    
    const ctx = gsap.context(() => {
      gsap.fromTo("#timeline .section-title", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#timeline .section-title",
            start: "top 90%",
            toggleActions: "restart none none reverse" 
          }
        }
      );
      
      gsap.fromTo("#timeline-progress-line", 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrapRef.current,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
      
      timelineItemsRef.current.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        const date = item.querySelector('.timeline-date');
        
        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%", 
            toggleActions: "restart none none reverse"
          }
        });
        
        itemTl.fromTo(content,
          { x: direction * 100, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power2.out" 
          }
        ).fromTo(dot,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3,
            ease: "back.out(1.7)" 
          },
          "-=0.3" 
        ).fromTo(date,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.3,
            ease: "power2.out" 
          },
          "-=0.2"
        );
      });
    });
    
    return () => ctx.revert();
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'education': return <FcGraduationCap className="timeline-icon" />;
      case 'startup': return <FcIdea className="timeline-icon" />;
      case 'career': return <FcBriefcase className="timeline-icon" />;
      case 'google': return <FcGoogle className="timeline-icon" />;
      case 'project': return <FcStatistics className="timeline-icon" />;
      case 'website': return <FcGlobe className="timeline-icon" />;
      case 'ai': return <SiOpenai className="timeline-icon" />;
      default: return null;
    }
  };

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">My Journey to Data & AI Automation</span>
      </div>
      
      <div className="timeline-wrapper" ref={timelineWrapRef}>
        <div className="timeline-progress">
          <div id="timeline-progress-line"></div>
        </div>
        
        <div className="timeline-items">
          {milestones.map((item, idx) => (
            <div 
              key={idx} 
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              ref={el => timelineItemsRef.current[idx] = el}
            >
              <div className="timeline-dot">
                {renderIcon(item.type)}
              </div>
              
              <div className="timeline-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                
                <div className="timeline-actions">
                  {item.certificateUrl && (
                    <a href={item.certificateUrl} className="timeline-link" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  )}
                  
                  {item.learnMoreLink && (
                    <a href={item.learnMoreLink} className="timeline-link">
                      {item.learnMoreText}
                    </a>
                  )}
                </div>
              </div>
              <span className="timeline-date">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}