import { useState, useEffect } from 'react'
import './App.css'

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Events', id: 'events' },
  { label: 'Schedule', id: 'schedule' },
  { label: 'Sponsors', id: 'sponsors' },
  { label: 'Contact', id: 'contact' },
]

function App() {
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#hero" className="nav__logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>
            NEOSIS 2.0
          </a>
          <nav className="nav__links">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                className="nav__link"
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="section section--hero">
          <div className="hero__bg" />
          <div className="hero__content">
            <span className="hero__badge">Tech Fest 2025</span>
            <h1 className="hero__title">NEOSIS 2.0</h1>
            <p className="hero__tagline">Code • Create • Conquer</p>
            <p className="hero__desc">
              A celebration of technology, innovation, and creativity. Workshops, hackathons, and talks.
            </p>
            <div className="hero__cta">
              <button type="button" className="btn btn--primary" onClick={() => scrollToSection('events')}>
                Explore Events
              </button>
              <button type="button" className="btn btn--outline" onClick={() => scrollToSection('schedule')}>
                View Schedule
              </button>
            </div>
          </div>
          <div className="hero__scroll" onClick={() => scrollToSection('about')}>
            <span>Scroll</span>
            <div className="hero__scroll-icon" />
          </div>
        </section>

        <section id="about" className="section section--about">
          <div className="section__inner">
            <h2 className="section__title">About Neosis</h2>
            <p className="section__lead">
              Neosis is an annual tech fest that brings together students, developers, and industry experts for a weekend of learning and building.
            </p>
            <div className="about__stats">
              <div className="stat">
                <span className="stat__value">48+</span>
                <span className="stat__label">Hours</span>
              </div>
              <div className="stat">
                <span className="stat__value">20+</span>
                <span className="stat__label">Events</span>
              </div>
              <div className="stat">
                <span className="stat__value">500+</span>
                <span className="stat__label">Participants</span>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="section section--events">
          <div className="section__inner section__inner--events">
            <div className="events__sticky-header">
              <h2 className="section__title">Events</h2>
              <p className="section__lead">Workshops, hackathons, talks &amp; more. Scroll through the list.</p>
            </div>
            <ul className="events__list">
              {[
                { name: 'Hackathon', desc: '24-hour build sprint with prizes', icon: '⚡' },
                { name: 'Workshops', desc: 'Hands-on sessions on latest tech', icon: '🛠️' },
                { name: 'Tech Talks', desc: 'Talks from industry leaders', icon: '🎤' },
                { name: 'CTF', desc: 'Capture The Flag cybersecurity', icon: '🔐' },
                { name: 'Design Sprint', desc: 'UI/UX and product design', icon: '🎨' },
                { name: 'Robotics', desc: 'Build and compete with bots', icon: '🤖' },
                { name: 'DevOps & Cloud', desc: 'CI/CD, Docker, Kubernetes workshops', icon: '☁️' },
                { name: 'AI/ML', desc: 'Hands-on with models and datasets', icon: '🧠' },
                { name: 'Gaming', desc: 'Esports and game dev challenges', icon: '🎮' },
                { name: 'Open Source', desc: 'Contribute to real projects', icon: '📂' },
              ].map((event) => (
                <li key={event.name} className="events__list-item">
                  <span className="events__list-icon">{event.icon}</span>
                  <div className="events__list-body">
                    <h3 className="events__list-title">{event.name}</h3>
                    <p className="events__list-desc">{event.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="schedule" className="section section--schedule">
          <div className="section__inner">
            <h2 className="section__title">Schedule</h2>
            <div className="schedule__list">
              {[
                { day: 'Day 1', time: '09:00', title: 'Inauguration & Keynote' },
                { day: 'Day 1', time: '11:00', title: 'Workshop Track A' },
                { day: 'Day 1', time: '14:00', title: 'Hackathon Kickoff' },
                { day: 'Day 2', time: '10:00', title: 'Tech Talks' },
                { day: 'Day 2', time: '15:00', title: 'Hackathon Judging' },
                { day: 'Day 2', time: '18:00', title: 'Prize Ceremony & Closing' },
              ].map((item, i) => (
                <div key={i} className="schedule__item">
                  <span className="schedule__day">{item.day}</span>
                  <span className="schedule__time">{item.time}</span>
                  <span className="schedule__title">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sponsors" className="section section--sponsors">
          <div className="section__inner">
            <h2 className="section__title">Sponsors</h2>
            <p className="section__lead">Powered by our amazing partners.</p>
            <div className="sponsors__row">
              {['Partner A', 'Partner B', 'Partner C'].map((name) => (
                <div key={name} className="sponsor__slot">{name}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section--contact">
          <div className="section__inner">
            <h2 className="section__title">Get in Touch</h2>
            <p className="section__lead">Ready to be part of Neosis 2.0?</p>
            <div className="contact__links">
              <a href="mailto:hello@neosis.in" className="contact__link">hello@neosis.in</a>
              <a href="#" className="contact__link">Register Now</a>
            </div>
            <footer className="footer">
              <p>© 2025 Neosis Tech Fest. Code • Create • Conquer.</p>
            </footer>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
