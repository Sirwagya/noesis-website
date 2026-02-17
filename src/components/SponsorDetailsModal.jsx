import { useCallback, useEffect, useState } from "react";
import {
  Crown,
  BarChart3,
  Megaphone,
  Sparkles,
  Instagram,
  Linkedin,
  Youtube,
  Users,
  Globe,
  Coins,
} from "lucide-react";
import {
  sponsorshipTiers,
  sponsorshipMetrics,
  sponsorshipPillars,
  sponsorshipSections,
} from "../data/sponsorshipData";

/**
 * Track analytics event if gtag is available
 * @param {string} eventName - Event name
 * @param {Object} params - Event parameters
 */
function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

const TAB_ORDER = ["tiers", "reach", "influencers", "why"];

export function SponsorDetailsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("tiers");

  const handleClose = useCallback(() => {
    trackEvent("sponsor_modal_close", { last_tab: activeTab });
    onClose();
    setTimeout(() => setActiveTab("tiers"), 300);
  }, [onClose, activeTab]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    trackEvent("sponsor_tab_view", { tab_name: tab });
  }, []);

  const handleKeyNavigation = useCallback(
    (e) => {
      if (!TAB_ORDER.includes(activeTab)) return;

      const currentIndex = TAB_ORDER.indexOf(activeTab);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % TAB_ORDER.length;
        handleTabChange(TAB_ORDER[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex =
          (currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length;
        handleTabChange(TAB_ORDER[prevIndex]);
      }
    },
    [activeTab, handleTabChange],
  );

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    const handleBodyLock = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("keydown", handleKeyNavigation);
    handleBodyLock();

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleKeyNavigation);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, handleKeyNavigation]);

  // Track modal open event
  useEffect(() => {
    if (isOpen) {
      trackEvent("sponsor_modal_open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sponsor-modal" onClick={handleClose}>
      <div
        className="sponsor-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="sponsor-modal__close"
          onClick={handleClose}
          aria-label="Close sponsor details"
        >
          ×
        </button>

        <header className="sponsor-modal__header">
          <h2>Sponsorship Opportunities</h2>
          <p>
            Partner with NOESIS 2026 and reach India's next generation of
            builders
          </p>
        </header>

        <div className="sponsor-modal__layout">
          {/* Vertical Sidebar Navigation */}
          <aside
            className="sponsor-modal__sidebar"
            role="tablist"
            aria-label="Sponsorship information"
          >
            <button
              className={`sponsor-modal__sidebar-tab ${activeTab === "tiers" ? "is-active" : ""}`}
              onClick={() => handleTabChange("tiers")}
              role="tab"
              aria-selected={activeTab === "tiers"}
              aria-controls="tiers-panel"
            >
              <span className="sponsor-modal__sidebar-tab-icon">
                <Crown size={20} />
              </span>
              <span className="sponsor-modal__sidebar-tab-text">
                <strong>Tiers & Benefits</strong>
                <small>Sponsorship packages</small>
              </span>
            </button>
            <button
              className={`sponsor-modal__sidebar-tab ${activeTab === "reach" ? "is-active" : ""}`}
              onClick={() => handleTabChange("reach")}
              role="tab"
              aria-selected={activeTab === "reach"}
              aria-controls="reach-panel"
            >
              <span className="sponsor-modal__sidebar-tab-icon">
                <BarChart3 size={20} />
              </span>
              <span className="sponsor-modal__sidebar-tab-text">
                <strong>Reach & Metrics</strong>
                <small>Our audience data</small>
              </span>
            </button>
            <button
              className={`sponsor-modal__sidebar-tab ${activeTab === "influencers" ? "is-active" : ""}`}
              onClick={() => handleTabChange("influencers")}
              role="tab"
              aria-selected={activeTab === "influencers"}
              aria-controls="influencers-panel"
            >
              <span className="sponsor-modal__sidebar-tab-icon">
                <Megaphone size={20} />
              </span>
              <span className="sponsor-modal__sidebar-tab-text">
                <strong>Influencer Network</strong>
                <small>Amplification partners</small>
              </span>
            </button>
            <button
              className={`sponsor-modal__sidebar-tab ${activeTab === "why" ? "is-active" : ""}`}
              onClick={() => handleTabChange("why")}
              role="tab"
              aria-selected={activeTab === "why"}
              aria-controls="why-panel"
            >
              <span className="sponsor-modal__sidebar-tab-icon">
                <Sparkles size={20} />
              </span>
              <span className="sponsor-modal__sidebar-tab-text">
                <strong>Why Sponsor</strong>
                <small>Value proposition</small>
              </span>
            </button>
          </aside>

          {/* Content Area */}
          <div className="sponsor-modal__main">
            <div className="sponsor-modal__body">
              {activeTab === "tiers" && (
                <div
                  className="sponsor-modal__section"
                  id="tiers-panel"
                  role="tabpanel"
                >
                  <h3>Sponsorship Tiers</h3>
                  <div className="sponsor-tiers-detailed">
                    {sponsorshipTiers.map((tier) => {
                      const IconComponent = tier.icon;
                      return (
                        <details
                          key={tier.id}
                          className="sponsor-tier-detail"
                          open={tier.id === "title"}
                        >
                          <summary className="sponsor-tier-detail__summary">
                            <div className="sponsor-tier-detail__header">
                              <span
                                className="sponsor-tier-detail__icon"
                                aria-label={tier.iconLabel}
                                role="img"
                              >
                                <IconComponent size={24} aria-hidden="true" />
                              </span>
                              <div>
                                <h4>{tier.name}</h4>
                                <p>{tier.tagline}</p>
                              </div>
                              <span className="sponsor-tier-detail__price">
                                {tier.price}
                              </span>
                              <span className="sponsor-tier-detail__benefit-count">
                                {tier.benefits.length} Benefits
                              </span>
                            </div>
                          </summary>
                          <div className="sponsor-tier-detail__content">
                            <ul>
                              {tier.benefits.map((benefit, idx) => (
                                <li key={`${tier.id}-benefit-${idx}`}>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "reach" && (
                <div
                  className="sponsor-modal__section"
                  id="reach-panel"
                  role="tabpanel"
                >
                  <h3>Our Reach & Metrics</h3>

                  {/* ROI Callout */}
                  <div className="sponsor-roi-callout">
                    <div className="sponsor-roi-callout__header">
                      <strong>Your Investment Impact</strong>
                    </div>
                    <div className="sponsor-roi-callout__grid">
                      <div className="sponsor-roi-callout__item">
                        <div className="sponsor-roi-callout__icon-wrapper">
                          <Globe size={20} />
                        </div>
                        <div className="sponsor-roi-callout__content">
                          <span className="sponsor-roi-callout__label">
                            Total Reach
                          </span>
                          <strong className="sponsor-roi-callout__value">
                            9M+
                          </strong>
                          <span className="sponsor-roi-callout__note">
                            Social impressions
                          </span>
                        </div>
                      </div>
                      <div className="sponsor-roi-callout__divider"></div>
                      <div className="sponsor-roi-callout__item">
                        <div className="sponsor-roi-callout__icon-wrapper">
                          <Users size={20} />
                        </div>
                        <div className="sponsor-roi-callout__content">
                          <span className="sponsor-roi-callout__label">
                            Audience
                          </span>
                          <strong className="sponsor-roi-callout__value">
                            800+
                          </strong>
                          <span className="sponsor-roi-callout__note">
                            Engaged builders
                          </span>
                        </div>
                      </div>
                      <div className="sponsor-roi-callout__divider"></div>
                      <div className="sponsor-roi-callout__item">
                        <div className="sponsor-roi-callout__icon-wrapper">
                          <Coins size={20} />
                        </div>
                        <div className="sponsor-roi-callout__content">
                          <span className="sponsor-roi-callout__label">
                            Cost Efficiency
                          </span>
                          <strong className="sponsor-roi-callout__value">
                            ₹0.03
                          </strong>
                          <span className="sponsor-roi-callout__note">
                            Cost per reach
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform Reach Cards */}
                  <div className="sponsor-metrics-bars">
                    <h4 className="sponsor-metrics-bars__title">
                      Platform Reach Breakdown
                    </h4>
                    <div className="sponsor-platform-grid">
                      {sponsorshipMetrics.map((metric) => {
                        let Icon = Users;
                        if (metric.label === "Instagram") Icon = Instagram;
                        if (metric.label === "LinkedIn") Icon = Linkedin;
                        if (metric.label === "YouTube") Icon = Youtube;

                        return (
                          <div
                            key={metric.label}
                            className="sponsor-platform-card"
                          >
                            <div className="sponsor-platform-card__icon">
                              <Icon size={24} />
                            </div>
                            <div className="sponsor-platform-card__content">
                              <span className="sponsor-platform-card__label">
                                {metric.label}
                              </span>
                              <span className="sponsor-platform-card__value">
                                {metric.value}
                              </span>
                              <span className="sponsor-platform-card__note">
                                {metric.note}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <h4 className="sponsor-modal__subsection-title">
                    Value Proposition
                  </h4>
                  <div className="sponsor-pillars-grid">
                    {sponsorshipPillars.map((pillar) => (
                      <article
                        key={pillar.title}
                        className="sponsor-pillar-card"
                      >
                        <h4>{pillar.title}</h4>
                        <p>{pillar.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "influencers" && (
                <div
                  className="sponsor-modal__section"
                  id="influencers-panel"
                  role="tabpanel"
                >
                  <h3>Influencer Amplification</h3>
                  {sponsorshipSections
                    .filter((s) => s.id === "influencers")
                    .map((section) => (
                      <div key={section.id}>
                        <p className="sponsor-modal__intro">
                          {section.summary}
                        </p>
                        <div className="influencer-grid">
                          {section.details.map((influencer, idx) => (
                            <article
                              key={`influencer-${idx}`}
                              className="influencer-card"
                            >
                              <div className="influencer-card__name">
                                {influencer.split("·")[0].trim()}
                              </div>
                              <div className="influencer-card__stats">
                                {influencer.split("·").slice(1).join(" · ")}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {activeTab === "why" && (
                <div
                  className="sponsor-modal__section"
                  id="why-panel"
                  role="tabpanel"
                >
                  <h3>Why Partner with NOESIS</h3>
                  {sponsorshipSections
                    .filter(
                      (s) =>
                        s.id === "why" ||
                        s.id === "audience" ||
                        s.id === "engagement",
                    )
                    .map((section) => (
                      <article key={section.id} className="why-card">
                        <h4>{section.title}</h4>
                        <p>{section.summary}</p>
                        <ul>
                          {section.details.map((detail, idx) => (
                            <li key={`${section.id}-detail-${idx}`}>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                </div>
              )}
            </div>

            <footer className="sponsor-modal__footer">
              <a
                className="btn btn--primary"
                href="mailto:noesisfest@gmail.com?subject=NOESIS%202026%20Sponsorship"
                onClick={() =>
                  trackEvent("sponsor_cta_click", { cta_type: "request_deck" })
                }
              >
                Request Sponsorship Deck
              </a>
              <a
                className="btn btn--ghost"
                href="mailto:noesisfest@gmail.com?subject=NOESIS%202026%20Sponsor%20Call"
                onClick={() =>
                  trackEvent("sponsor_cta_click", { cta_type: "schedule_call" })
                }
              >
                Schedule a Call
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
