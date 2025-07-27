import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icons";
import "../styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const contactSectionRef = useRef(null);
  const yourEmail = "rafsanahmed2828@gmail.com";

  useEffect(() => {
      gsap.set(".contact-container", {
      width: "100%",
      maxWidth: "600px",
      height: "auto", 
      margin: "0 auto"
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      "#contact .section-title",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    tl.fromTo(
      ".contact-intro",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.3"
    );
    
    tl.fromTo(
      ".contact-container",
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.3"
    );
    
    tl.fromTo(
      ".form-group",
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out"
      },
      "-=0.4"
    );
    
    tl.fromTo(
      [".contact-actions", ".contact-info"],
      {
        y: 15,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      },
      "-=0.2"
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        formRef.current.style.display = 'none';
        successRef.current.style.display = 'flex';
        
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      const mailtoUrl = `mailto:${yourEmail}?subject=Contact from ${name}&body=${encodeURIComponent(message)}`;
      const newWindow = window.open(mailtoUrl, '_blank');
      
      // Handle popup blockers
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        const successEl = successRef.current;
        if (successEl) {
          const messageEl = successEl.querySelector('p');
          if (messageEl) {
            messageEl.innerHTML = 'Your email client could not be opened automatically. Please click <a href="' + 
              mailtoUrl + '" target="_blank">here</a> to open it manually.';
          }
        }
      }
    }, 1000);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    
    gsap.to(successRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        successRef.current.style.display = 'none';
        formRef.current.style.display = 'block';
        
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
        
        setIsSubmitted(false);
      }
    });
  };

  return (
    <section id="contact" ref={contactSectionRef}>
      <div className="section-header">
        <span className="section-title">Get In Touch</span>
      </div>
      <div className="contact-intro">
      <p>
        I'm currently exploring opportunities in AI Automation and workflow orchestration, and I'm always open to connecting with like-minded professionals. If you have a role, project, or collaboration in mind, I’d love to hear from you!
      </p>  
      </div>
      <div className="contact-container">
        <div className="contact-bg-elements">
          <div className="contact-circle"></div>
          <div className="contact-square"></div>
        </div>
        
        
        <form className="contact-form" onSubmit={handleSend} ref={formRef}>
          <div className="form-group">
            <input
              type="text"
              className="contact-input"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Icon name="User" className="input-icon" />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              className="contact-input"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Icon name="Mail" className="input-icon" />
          </div>
          
          <div className="form-group">
            <textarea
              className="contact-textarea"
              placeholder="Your Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={6}
              required
            />
            <Icon name="MessageSquare" className="input-icon textarea-icon" />
          </div>
          
          <div className="contact-actions">
            <button 
              className="contact-send-btn btn-effect" 
              type="submit"
            >
              Send Message
              <Icon name="Send" className="btn-icon" />
            </button>
          </div>
          
          <div className="contact-info">
            <div className="contact-info-item">
              <Icon name="Mail" className="contact-info-icon" />
              <a href={`mailto:${yourEmail}`} className="contact-email" target="_blank" rel="noopener noreferrer">
                {yourEmail}
              </a>
            </div>
          </div>
        </form>
        
        <div className="success-message" ref={successRef} style={{ display: 'none' }}>
          <Icon name="CheckCircle" className="success-icon" />
          <h3>Thank you for reaching out.</h3>
          <p>I'll get back to you soon.</p>
          <button 
            className="reset-btn"
            onClick={handleReset}
          >
            Send Another Message
          </button>
        </div>
      </div>
    </section>
  );
}