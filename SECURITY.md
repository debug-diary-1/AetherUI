# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of AetherUI seriously. If you believe you have found a security vulnerability in AetherUI, we encourage you to let us know right away.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

**security@pallavl01.dev**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the following information (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English.

## Security Update Process

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported releases
4. Release new security patch versions as soon as possible

## Security Best Practices for Users

When using AetherUI components:

1. **Keep dependencies updated** - Always use the latest version of AetherUI and its dependencies
2. **Sanitize user input** - Always sanitize and validate user-provided content before passing it to components
3. **Content Security Policy** - Implement a strong Content Security Policy (CSP) in your application
4. **HTTPS only** - Always serve your application over HTTPS in production
5. **Review custom styles** - When using CSS custom properties or `::part()` selectors, ensure styles don't introduce security issues

## Known Security Considerations

### Cross-Site Scripting (XSS)

AetherUI components use Lit's HTML templating which provides automatic XSS protection for most cases. However:

- Always sanitize user-generated HTML content before rendering
- Be cautious when using `.innerHTML` or unsafeHTML directive
- Validate URLs before using them in href attributes

### Dependency Security

We regularly audit our dependencies for known vulnerabilities:

- Automated Dependabot security updates enabled
- Regular manual security audits
- Minimal dependency footprint (only `lit` and `@floating-ui/dom`)

## Security Hall of Fame

We appreciate the security research community. Security researchers who responsibly disclose vulnerabilities will be acknowledged here (with their permission):

_No reports yet_

## Additional Resources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Web Component Security Best Practices](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#security_considerations)
- [Lit Security Considerations](https://lit.dev/docs/templates/expressions/#expressions-and-security)

## Disclosure Policy

We follow a coordinated disclosure process:

1. Security report received and acknowledged within 48 hours
2. Issue confirmed and assessed (typically within 7 days)
3. Fix developed and tested
4. Fix released to all supported versions
5. Public disclosure 7 days after release (or as agreed with reporter)

Thank you for helping keep AetherUI and its users safe!
