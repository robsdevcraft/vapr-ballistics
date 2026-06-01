# Security Policy

## 🔐 Reporting Security Vulnerabilities

**DO NOT** report security vulnerabilities through public GitHub issues.

Instead, please report them responsibly via email:

**📧 Email:** [contact@robsdevcraft.com](mailto:contact@robsdevcraft.com)

**Subject:** `[SECURITY] Brief description of vulnerability`

---

## 📋 What to Include in Your Report

Please include the following information:

### Required:

- **Description** - Clear explanation of the vulnerability
- **Steps to reproduce** - Detailed reproduction steps
- **Potential impact** - What an attacker could achieve
- **Affected versions** - Which versions are vulnerable

### Optional but helpful:

- **Proof of concept** - Example exploit code (if safe to share)
- **Suggested fix** - If you have ideas for remediation
- **Your contact info** - For follow-up questions
- **CVE request** - If you want us to request a CVE ID

---

## 🚨 What We Consider a Security Issue

### ✅ **Security Vulnerabilities** (Please Report):

- **Code Execution** - Arbitrary code execution on client or server
- **Injection Attacks** - SQL injection, command injection, XSS
- **Authentication Bypass** - Circumventing access controls
- **Data Exposure** - Unauthorized access to sensitive data
- **Cryptographic Weaknesses** - Weak encryption or hashing
- **Dependency Vulnerabilities** - Known CVEs in dependencies (high/critical severity)
- **API Abuse** - Endpoints that allow rate limit bypass or resource exhaustion
- **Supply Chain** - Compromised dependencies or build pipeline

### ⚠️ **Not Security Issues** (Please Open Normal Issue):

- **Bugs without security impact** - Non-security functional bugs
- **Missing best practices** - Code quality issues without exploitability
- **Outdated dependencies** - Low/medium severity without known exploits
- **Performance issues** - Unless leading to DoS
- **UI/UX issues** - Visual bugs or usability problems
- **Documentation errors** - Typos or unclear documentation

---

## 🕐 Our Response Timeline

We take security seriously and aim for the following response times:

| Stage                        | Timeline                             |
| ---------------------------- | ------------------------------------ |
| **Initial Response**         | Within 48 hours                      |
| **Vulnerability Assessment** | Within 1 week                        |
| **Fix Development**          | Depends on severity (see below)      |
| **Patch Release**            | After fix is ready                   |
| **Public Disclosure**        | 90 days after patch (or coordinated) |

### Severity-Based Fix Timelines:

- **Critical** (CVSS 9.0-10.0) - Immediate priority, patch within 7 days
- **High** (CVSS 7.0-8.9) - High priority, patch within 14 days
- **Medium** (CVSS 4.0-6.9) - Normal priority, patch within 30 days
- **Low** (CVSS 0.1-3.9) - Low priority, patch in next release

---

## 🛡️ Supported Versions

We provide security updates for the following versions:

| Version        | Supported |
| -------------- | --------- |
| `main` branch  | ✅ Yes    |
| Latest release | ✅ Yes    |
| Older releases | ❌ No     |

**Recommendation:** Always use the latest release for security patches.

---

## 🔄 Security Update Process

### When We Discover a Vulnerability:

1. **Private Fix** - Develop patch in private fork
2. **Security Advisory** - Create GitHub Security Advisory
3. **Patch Release** - Release patch version (e.g., 1.2.3 → 1.2.4)
4. **Update CHANGELOG** - Document fix (without exploit details)
5. **Public Disclosure** - After 90 days or coordinated disclosure

### When You Report a Vulnerability:

1. **Acknowledgment** - We confirm receipt within 48 hours
2. **Validation** - We verify the vulnerability
3. **Coordination** - We work with you on disclosure timeline
4. **Credit** - We acknowledge your contribution (if desired)
5. **Patch** - We release a fix
6. **Disclosure** - We publish details after patch is available

---

## 🏆 Recognition

We believe in giving credit where it's due!

### Hall of Fame

Security researchers who responsibly disclose vulnerabilities will be:

- ✅ Listed in our [Security Hall of Fame](https://github.com/robsdevcraft/vapr-ballistics/security/advisories)
- ✅ Credited in release notes (if desired)
- ✅ Mentioned in CHANGELOG.md
- ✅ Linked to your profile or website (if provided)

**Anonymous reporting:** If you prefer to remain anonymous, we respect that.

---

## 🔒 Security Best Practices

### For Contributors

If you're contributing code, please follow these security practices:

- ✅ **Validate input** - Never trust user input
- ✅ **Sanitize output** - Prevent XSS attacks
- ✅ **Use prepared statements** - Prevent SQL injection (if applicable)
- ✅ **Avoid secrets in code** - Use environment variables
- ✅ **Update dependencies** - Keep packages up to date
- ✅ **Review PRs carefully** - Check for security implications
- ✅ **Run security tools** - Use linters and vulnerability scanners

### For Users

If you're using VAPR Ballistics, protect yourself:

- ✅ **Keep updated** - Use the latest version
- ✅ **Check dependencies** - Run `pnpm audit` regularly
- ✅ **Use HTTPS** - When deploying (especially for fastapi-fullstack)
- ✅ **Review configs** - Don't expose sensitive settings
- ✅ **Monitor logs** - Watch for suspicious activity
- ✅ **Follow deployment guides** - Use recommended configurations

---

## 🧰 Security Tools We Use

### Automated Scanning

- **Dependabot** - Automated dependency updates
- **npm audit / pnpm audit** - Dependency vulnerability scanning
- **GitHub Code Scanning** - Static analysis (if enabled)
- **ESLint security plugin** - Code pattern detection

### Manual Review

- **Code review** - All PRs reviewed before merge
- **Security checklist** - For high-risk changes
- **Penetration testing** - Periodic manual testing

---

## 📦 Dependency Security

### How We Handle Dependencies

1. **Regular audits** - Run `pnpm audit` before releases
2. **Automated updates** - Dependabot PRs for security patches
3. **Review updates** - Manual review of all dependency changes
4. **Pin versions** - Lock file committed to repository
5. **Minimize dependencies** - Only essential packages

### When We Update Dependencies

- **Critical vulnerabilities** - Immediate patch release
- **High vulnerabilities** - Within 2 weeks
- **Medium/Low vulnerabilities** - Next regular release

---

## 🌐 Deployment Security

### js-client (Static Site)

**Minimal attack surface** - Pure client-side application

- ✅ No backend = no server-side vulnerabilities
- ✅ Static hosting recommended (Vercel, Netlify, GitHub Pages)
- ⚠️ Use HTTPS to prevent MITM attacks
- ⚠️ Set proper CSP headers

### fastapi-fullstack (Full Stack)

**More attack surface** - Requires secure deployment

- ✅ Use environment variables for secrets
- ✅ Enable HTTPS/TLS
- ✅ Set secure CORS policies
- ✅ Use strong authentication (if added)
- ✅ Rate limit API endpoints
- ✅ Validate all inputs on backend
- ✅ Keep Docker images updated

See deployment guides in app READMEs for details.

---

## 🚨 Known Security Considerations

### Current Security Status

- ✅ **No authentication** - Applications are public by design
- ✅ **No sensitive data** - Ballistics calculations are not sensitive
- ✅ **Client-side only** (js-client) - Minimal attack surface
- ⚠️ **XSS potential** - If user input is not properly sanitized
- ⚠️ **Dependency risks** - Like all npm projects

### Not Vulnerabilities

These are **intentional design decisions**, not security issues:

- ❌ No authentication - Calculators are meant to be public
- ❌ No rate limiting (js-client) - No backend to rate limit
- ❌ Public API (fastapi) - Designed for public use

---

## 📞 Security Contact

For security concerns **only**:

**📧 Email:** [contact@robsdevcraft.com](mailto:contact@robsdevcraft.com)

**PGP Key:** (Coming soon)

For non-security issues:

- 🐛 [GitHub Issues](https://github.com/robsdevcraft/vapr-ballistics/issues)
- 💬 [GitHub Discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions)

---

## 📜 Disclosure Policy

We follow **coordinated disclosure**:

1. You report vulnerability privately
2. We confirm and develop patch
3. We release patch
4. After 90 days (or sooner if agreed), we publish advisory

**No legal action:** We will not pursue legal action against security researchers
who follow this policy and act in good faith.

---

## 🙏 Thank You

Security research makes open source safer for everyone. Thank you for:

- 🔍 Finding vulnerabilities
- 💬 Reporting responsibly
- 🤝 Working with us on fixes
- ⏰ Giving us time to patch before disclosure

**Your efforts make VAPR Ballistics more secure!**

---

_Last updated: January 2025_
