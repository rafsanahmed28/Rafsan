import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/TechStack.css";
import { RiFileExcel2Fill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import {
  SiMysql, SiPostgresql, SiTableau, SiPython,
  SiPandas, SiNumpy, SiJupyter, SiGit, SiFigma,
  SiAdobeillustrator, SiAdobephotoshop, SiJavascript,
  SiReact, SiHtml5, SiCss3, SiDocker, SiN8N, SiClaude
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const techStackData = [
  { name: "MySQL", icon: <SiMysql />, color: "#00758F" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "Pandas", icon: <SiPandas />, color: "#150458" },
  { name: "NumPy", icon: <SiNumpy />, color: "#013243" },
  { name: "Excel", icon: <RiFileExcel2Fill />, color: "#217346" },
  { name: "Tableau", icon: <SiTableau />, color: "#E97627" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "React", icon: <SiReact />, color: "#61DAFB" },
  { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
  { name: "CSS", icon: <SiCss3 />, color: "#1572B6" },
  { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
  { name: "Git", icon: <SiGit />, color: "#F05032" },
  { name: "Jupyter", icon: <SiJupyter />, color: "#F37626" },
  { name: "n8n", icon: <SiN8N />, color: "#EF6537" },
  { name: "Claude", icon: <SiClaude />, color: "#EF6537" },
  { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900" },
  { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
  { name: "Illustrator", icon: <SiAdobeillustrator />, color: "#FF9A00" },
  { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF" },
];

export default function TechStack() {
  const techStackRef = useRef(null);
  
  useEffect(() => {
    console.log("TechStack component mounted");
    
    const totalItems = techStackData.length;
    const cols = 2; 
    const rows = Math.ceil(totalItems / cols);
    const grid = [rows, cols];
    
    console.log("TechStack grid dimensions:", grid);
    
    gsap.set(".tech-icon-container", { opacity: 1, scale: 1 });
    
    gsap.fromTo(".tech-title",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#tech-stack",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".tech-icon-container",
      {
        scale: 0.1,
        y: -250,
        opacity: 0
      },
      {
        y: 0,
        scale: 1,
        duration: 0.5,
        opacity: 1,
        stagger: {
        grid: [7,15],
        from: "center",
        amount: 1 ,
      },
        ease: "power1.inOut", 
        scrollTrigger: {
          trigger: "#tech-stack",
          start: "top 70%",
          toggleActions: "play none none reverse" 
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleIconHover = (e, enter) => {
    const target = e.currentTarget;
    
    if (enter) {
      gsap.to(target, {
        y: -5,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(target.querySelector('.tech-icon'), {
        color: "var(--green-bright)",
        duration: 0.3
      });
    } else {
      gsap.to(target, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(target.querySelector('.tech-icon'), {
        color: target.dataset.color,
        duration: 0.3
      });
    }
  };

  return (
    <section id="tech-stack" ref={techStackRef}>
      <div className="section-header">
        <span className="section-title tech-title">Tech Stack</span>
      </div>
      
      <div className="tech-grid-container">
        {techStackData.map((tool, index) => (
          <div
            key={tool.name}
            className="tech-icon-container"
            data-color={tool.color}
            title={tool.name} 
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          >
            <div className="tech-icon" style={{ color: tool.color }}>
              {tool.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}