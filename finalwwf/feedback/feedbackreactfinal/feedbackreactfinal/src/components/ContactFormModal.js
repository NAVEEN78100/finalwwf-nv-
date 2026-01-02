import React, { useState, useEffect } from 'react';
// switched to server-side endpoints for OTP and submit

const ContactFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    category: 'Feedback',
    message: '',
    acceptTerms: false,
    attachment: null
  });

  const [errors, setErrors] = useState([]);
  const [otpState, setOtpState] = useState({
    generatedOtp: '',
    otpVerified: false,
    otpSent: false,
    otpInput: '',
    otpTimer: null,
    otpExpiryTime: null,
    remainingTime: 120
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showTermsDrawer, setShowTermsDrawer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // will use server endpoints: POST /api/feedback/otp and POST /api/feedback/submit

  // OTP Timer
  useEffect(() => {
    let interval;
    if (otpState.otpSent && otpState.remainingTime > 0) {
      interval = setInterval(() => {
        setOtpState(prev => ({
          ...prev,
          remainingTime: prev.remainingTime - 1
        }));
      }, 1000);
    } else if (otpState.remainingTime === 0) {
      setOtpState(prev => ({
        ...prev,
        generatedOtp: '',
        otpSent: false
      }));
    }
    return () => clearInterval(interval);
  }, [otpState.otpSent, otpState.remainingTime]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      setErrors(['Please enter your email address first.']);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrors(['Please enter a valid email address.']);
      return;
    }

    // request server to generate & (optionally) send OTP
    try {
      const res = await fetch('/api/feedback/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      console.log('OTP Response:', { status: res.status, ok: res.ok, data });
      if (!res.ok || !data.ok) {
        setErrors(['Failed to send OTP. Please try again.']);
        return;
      }
      if (!data.otp) {
        setErrors(['OTP not received. Please try again.']);
        return;
      }
      setOtpState(prev => ({
        ...prev,
        generatedOtp: data.otp,
        otpSent: true,
        remainingTime: 120,
        otpExpiryTime: Date.now() + 120000
      }));
      console.log('OTP Set in state:', data.otp);
      alert('OTP: ' + data.otp + '\n\n(Check console for details)');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrors(['Failed to send OTP. Please try again.']);
    }
  };

  const handleVerifyOTP = () => {
    // For server-backed OTP verification we'll optimistically check local value
    if (otpState.otpInput === otpState.generatedOtp && otpState.generatedOtp) {
      setOtpState(prev => ({ ...prev, otpVerified: true }));
      setShowAdditionalFields(true);
      alert('Email verified successfully!');
    } else {
      // Fallback: tell user to submit and server will validate final OTP
      setErrors(['Invalid OTP locally. If you received OTP by email, please re-check or proceed to Submit (server will validate).']);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.acceptTerms) {
      newErrors.push('You must accept the terms and conditions.');
    }

    if (!formData.fullName.trim()) {
      newErrors.push('Full name is required.');
    }

    if (!formData.email.trim()) {
      newErrors.push('Email address is required.');
    } else if (!isValidEmail(formData.email)) {
      newErrors.push('Please enter a valid email address.');
    }

    if (!otpState.otpVerified) {
      newErrors.push('Please verify your email with OTP.');
    }

    if (!formData.phone.trim()) {
      newErrors.push('Phone number is required.');
    } else if (formData.phone.length > 10) {
      newErrors.push('Phone number should not exceed 10 characters.');
    }

    if (!formData.message.trim()) {
      newErrors.push('Message is required.');
    }

    // File validation for Bug Bounty
    if (formData.category === 'BugBounty') {
      if (!formData.attachment) {
        newErrors.push('Attachment is required for Bug Bounty reports.');
      } else {
        if (formData.attachment.size > 2 * 1024 * 1024) {
          newErrors.push('File size should not exceed 2MB.');
        }
        
        const allowedExtensions = ['.jpg', '.jpeg'];
        const fileName = formData.attachment.name.toLowerCase();
        const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
        
        if (!allowedExtensions.includes(fileExtension)) {
          newErrors.push('Only JPG/JPEG files are allowed for Bug Bounty.');
        }
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // submit to server endpoint; include otpInput if present for server validation
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        category: formData.category,
        message: formData.message,
        otp: otpState.otpInput || null
      };

      const res = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok && !data.success) {
        setErrors([data.error || data.message || 'Submission failed on server.']);
        return;
      }

      alert('Thank you! Your enquiry has been submitted successfully.');

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        category: 'Feedback',
        message: '',
        acceptTerms: false,
        attachment: null
      });

      setOtpState({
        generatedOtp: '',
        otpVerified: false,
        otpSent: false,
        otpInput: '',
        otpTimer: null,
        otpExpiryTime: null,
        remainingTime: 120
      });

      setShowAdditionalFields(false);
      setErrors([]);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(['An error occurred while processing your submission. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className={`modal ${isOpen ? 'show' : ''}`} id="feedbackForm">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h3>Reach Out to Us</h3>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="error-messages" style={{ 
                background: '#fee', 
                color: '#c00', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                marginBottom: '1rem' 
              }}>
                {errors.map((error, index) => (
                  <div key={index}>• {error}</div>
                ))}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* OTP Verification */}
            <div className="otp-verification">
              {!otpState.otpVerified && !otpState.otpSent && (
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleSendOTP}
                  style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
                >
                  Send OTP
                </button>
              )}

              {otpState.otpSent && !otpState.otpVerified && (
                <div className="otp-input-group" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="otpInput">Enter OTP *</label>
                    <input
                      type="text"
                      id="otpInput"
                      value={otpState.otpInput}
                      onChange={(e) => setOtpState(prev => ({ ...prev, otpInput: e.target.value }))}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleVerifyOTP}
                  >
                    Verify OTP
                  </button>
                  <div className="otp-status" style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Time remaining: {formatTime(otpState.remainingTime)}
                  </div>
                </div>
              )}

              {otpState.otpVerified && (
                <div className="otp-status" style={{ 
                  color: '#0a0', 
                  fontWeight: '600', 
                  marginBottom: '1rem' 
                }}>
                  ✓ Email verified
                </div>
              )}
            </div>

            {/* Additional Fields (shown after OTP verification) */}
            {showAdditionalFields && (
              <div id="additionalFields">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="phone-input-wrapper">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                    >
                      <option value="+1">+1 (US)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+81">+81 (JP)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Feedback">Feedback/Improvements</option>
                    <option value="EarlyAccess">Request Early Access</option>
                    <option value="BugBounty">Bug Bounty/Report Issue</option>
                  </select>
                </div>

                {formData.category === 'BugBounty' && (
                  <div className="form-group" id="fileUploadSection">
                    <label htmlFor="attachment">Attach Screenshot/Evidence *</label>
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      onChange={handleInputChange}
                      accept=".jpg,.jpeg"
                    />
                    <span className="file-tip">Only JPG/JPEG files, max 2MB</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="acceptTerms">
                    I accept the{' '}
                    <span 
                      className="terms-link" 
                      onClick={() => setShowTermsDrawer(true)}
                    >
                      terms and conditions
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary jeton-send-btn" 
                  id="submitEnquiryBtn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Terms Drawer */}
      {showTermsDrawer && (
        <div 
          className="drawer terms-drawer open" 
          id="termsDrawer"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
            zIndex: 200000,
            padding: '2rem',
            overflowY: 'auto'
          }}
        >
          <button 
            className="back-link" 
            onClick={() => setShowTermsDrawer(false)}
          >
            Back
          </button>
          <div style={{ maxWidth: '800px', margin: '5rem auto', padding: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Terms & Conditions</h2>
            <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
              By using this service, you agree to our terms and conditions. We collect and process 
              your personal information in accordance with privacy regulations.
            </p>
            <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
              Your data will be used only for the purpose of responding to your inquiry and will 
              not be shared with third parties without your consent.
            </p>
            <p style={{ lineHeight: '1.7' }}>
              By accepting, you agree to all terms and conditions.
            </p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="backdrop" 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99999
          }}
        />
      )}
    </>
  );
};

export default ContactFormModal;
