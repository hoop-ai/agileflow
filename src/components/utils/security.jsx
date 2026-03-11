/**
 * Security utilities for data protection and validation
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Rate limiter for API calls
 */
export class RateLimiter {
  constructor(maxRequests = 10, timeWindow = 1000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    // Remove old requests outside time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    return false;
  }

  getWaitTime() {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    const waitTime = this.timeWindow - (Date.now() - oldestRequest);
    return Math.max(0, waitTime);
  }
}

/**
 * Data encryption helper (client-side)
 */
export function encodeData(data) {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error('Encoding error:', error);
    return null;
  }
}

export function decodeData(encodedData) {
  try {
    return JSON.parse(atob(encodedData));
  } catch (error) {
    console.error('Decoding error:', error);
    return null;
  }
}

/**
 * Secure data comparison (timing-attack resistant)
 */
export function secureCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Content Security Policy validator
 */
export function validateCSP(content) {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /on\w+\s*=/gi,
    /javascript:/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(content));
}

/**
 * Input length validator
 */
export function validateLength(input, min = 0, max = 10000) {
  if (typeof input !== 'string') return false;
  return input.length >= min && input.length <= max;
}

/**
 * SQL injection prevention (for search queries)
 */
export function sanitizeSearchQuery(query) {
  if (typeof query !== 'string') return '';
  
  return query
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .trim();
}

/**
 * Session timeout manager
 */
export class SessionManager {
  constructor(timeoutMinutes = 30) {
    this.timeout = timeoutMinutes * 60 * 1000;
    this.lastActivity = Date.now();
    this.checkInterval = null;
  }

  updateActivity() {
    this.lastActivity = Date.now();
  }

  startMonitoring(onTimeout) {
    this.checkInterval = setInterval(() => {
      if (Date.now() - this.lastActivity > this.timeout) {
        onTimeout();
        this.stopMonitoring();
      }
    }, 60000); // Check every minute
  }

  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  getRemainingTime() {
    const elapsed = Date.now() - this.lastActivity;
    return Math.max(0, this.timeout - elapsed);
  }
}

/**
 * Audit log helper
 */
export function createAuditLog(action, details, userId) {
  return {
    action,
    details,
    userId,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    ip: 'client-side' // Server should add actual IP
  };
}