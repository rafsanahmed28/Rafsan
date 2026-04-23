import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/NavBar.css";
import Icon from "./Icons";
import { gsap } from "gsap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      lastScrollY: window.scrollY,
      atTop: window.scrollY === 0,
      showStars: props.showStars || false,
      mobileMenuOpen: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleStars = this.toggleStars.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.mobileMenuRef = React.createRef();
    this.hamburgerRef = React.createRef();
    this.navbarRef = React.createRef();
    this.navLinksRef = []; 
    this.mobileNavLinksRef = []; 
    this.addToDesktopNavRefs = this.addToDesktopNavRefs.bind(this);
    this.addToMobileNavRefs = this.addToMobileNavRefs.bind(this);
    this.logoRef = React.createRef();
    this.initialRenderComplete = false;
    this.starButtonRef = React.createRef();

  }

  addToDesktopNavRefs(el) {
    if (el && !this.navLinksRef.includes(el)) {
      this.navLinksRef.push(el);
    }
  }

  addToMobileNavRefs(el) {
    if (el && !this.mobileNavLinksRef.includes(el)) {
      this.mobileNavLinksRef.push(el);
    }
  }

  toggleStars() {
    if (typeof this.props.setShowStars === 'function') {
      this.props.setShowStars(prev => !prev);
    } else {
      this.setState(prevState => ({
        showStars: !prevState.showStars
      }));
    }
  }

  toggleMobileMenu() {
    const { mobileMenuOpen } = this.state;
    
    this.setState({ mobileMenuOpen: !mobileMenuOpen });
    
    if (!mobileMenuOpen) {
      gsap.to(this.mobileMenuRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
      gsap.to(this.hamburgerRef.current.querySelector('.line-1'), { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(this.hamburgerRef.current.querySelector('.line-2'), { opacity: 0, duration: 0.3 });
      gsap.to(this.hamburgerRef.current.querySelector('.line-3'), { rotation: -45, y: -8, duration: 0.3 });
      
      gsap.set(this.mobileNavLinksRef, { 
        autoAlpha: 0, 
        y: -15,
        x: -10
      });
      
      gsap.to(this.mobileNavLinksRef, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.2)",
        delay: 0.2
      });
    } else {
      gsap.to(this.mobileMenuRef.current, { x: '100%', duration: 0.4, ease: "power3.in" });
      gsap.to(this.hamburgerRef.current.querySelector('.line-1'), { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(this.hamburgerRef.current.querySelector('.line-2'), { opacity: 1, duration: 0.3 });
      gsap.to(this.hamburgerRef.current.querySelector('.line-3'), { rotation: 0, y: 0, duration: 0.3 });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    if (this.navbarRef.current) {
      this.navbarRef.current.style.visibility = 'hidden';
    }
    
    gsap.set(this.mobileMenuRef.current, { x: '100%' });
    
    gsap.fromTo(
      this.logoRef.current,
      { autoAlpha: 0, y: -10, x: -5 },
      { 
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.2,
        stagger: 0.08,
        ease: "back.out(1.2)",
        delay: 0.6
      }
    );
    
    gsap.fromTo(
      this.navbarRef.current, 
      { opacity: 0, y: -15 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out", 
        onComplete: () => gsap.set(this.navbarRef.current, { clearProps: "all" }),
      }
    );
    
    gsap.set(this.navLinksRef, { 
      autoAlpha: 0, 
      y: -10,
      x: -5
    });
    
    gsap.to(this.navLinksRef, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "back.out(1.2)",
      delay: 0.6
    });

    gsap.fromTo(this.starButtonRef.current,
      { 
        autoAlpha: 0, 
        y: -15,
      },
      { 
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.07, 
        ease: "back.out(1.7)", 
        delay: 0.8
      }
    );

    gsap.fromTo(this.hamburgerRef.current,
      { 
        autoAlpha: 0, 
        y: -15,
      },
      { 
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.07,
        ease: "back.out(1.7)",
        delay: 1.4
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;
    const atTop = currentScrollY === 0;

    if (currentScrollY > lastScrollY && currentScrollY > 60) {
      this.setState({ show: false, lastScrollY: currentScrollY, atTop });
    } else {
      this.setState({ show: true, lastScrollY: currentScrollY, atTop });
    }
  }

  render() {
    const { show, atTop, mobileMenuOpen } = this.state;
    const showStars = this.props.showStars !== undefined ? this.props.showStars : this.state.showStars;

    return (
      <Navbar
        as="nav"
        ref={this.navbarRef}
        fixed="top"
        className={`bg-body-tertiary navbar-animated${show ? " navbar-visible" : " navbar-hidden"}${atTop ? " navbar-at-top" : ""}`}
        style={{ zIndex: 1000 }}
      >
        <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Navbar.Brand href="Home" style={{ marginRight: "auto" }}>
            <div className="logo-container btn-effect" ref={this.logoRef}>
              <img 
                className="logo"
                src="/assets/logo.png"
                alt="Rafsan Ahmed Logo"
                title="Logo"
                style={{ height: "36px", width: "36px" }}
              />
            </div>
          </Navbar.Brand>
          
          <div className="desktop-nav">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#about" ref={this.addToDesktopNavRefs}>About</Nav.Link>
                <Nav.Link href="#projects" ref={this.addToDesktopNavRefs}>Projects</Nav.Link>
                <Nav.Link href="#timeline" ref={this.addToDesktopNavRefs}>Timeline</Nav.Link>
                <Nav.Link href="#experience" ref={this.addToDesktopNavRefs}>Experience</Nav.Link>
                <Nav.Link href="#contact" ref={this.addToDesktopNavRefs}>Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          
          <div className="mobile-controls">
              <button
                className={`star-btn navbar-star-btn${showStars ? " star-active" : ""}`}
                onClick={this.toggleStars}
                ref={this.starButtonRef}
                title={showStars ? "Disable Background" : "Enable Background"}
                type="button"
              >
                <Icon name="Star" />
              </button>
            
            <div className="navbar-mobile-divider"></div>
            
            <button 
              className={`hamburger-menu ${mobileMenuOpen ? "active" : ""}`}
              ref={this.hamburgerRef}
              onClick={this.toggleMobileMenu}
            >
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </button>
          </div>
          
          <div 
            className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}
            ref={this.mobileMenuRef}
          >
            <Nav className="mobile-nav-links">
              <Nav.Link href="#about" onClick={this.toggleMobileMenu} ref={this.addToMobileNavRefs}>About</Nav.Link>
              <Nav.Link href="#projects" onClick={this.toggleMobileMenu} ref={this.addToMobileNavRefs}>Projects</Nav.Link>
              <Nav.Link href="#timeline" onClick={this.toggleMobileMenu} ref={this.addToMobileNavRefs}>Timeline</Nav.Link>
              <Nav.Link href="#experience" onClick={this.toggleMobileMenu} ref={this.addToMobileNavRefs}>Experience</Nav.Link>
              <Nav.Link href="#contact" onClick={this.toggleMobileMenu} ref={this.addToMobileNavRefs}>Contact</Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;