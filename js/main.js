/* ============================================
   Diamond West Civil — Main JS
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(function (openItem) {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Form Validation ---
  var form = document.querySelector('.lead-form');
  if (form) {
    var fields = {
      name: {
        el: form.querySelector('[name="name"]'),
        validate: function (v) { return v.trim().length >= 2; },
        msg: 'Please enter your full name'
      },
      phone: {
        el: form.querySelector('[name="phone"]'),
        validate: function (v) { return /^[\d\s\-\(\)\+]{7,}$/.test(v.trim()); },
        msg: 'Please enter a valid phone number'
      },
      email: {
        el: form.querySelector('[name="email"]'),
        validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
        msg: 'Please enter a valid email address'
      },
      project_type: {
        el: form.querySelector('[name="project_type"]'),
        validate: function (v) { return v.trim() !== ''; },
        msg: 'Please select a project type'
      }
    };

    function showError(field) {
      if (!field.el) return;
      field.el.classList.add('error');
      var errEl = field.el.parentElement.querySelector('.error-message');
      if (errEl) {
        errEl.textContent = field.msg;
        errEl.style.display = 'block';
      }
    }

    function clearError(field) {
      if (!field.el) return;
      field.el.classList.remove('error');
      var errEl = field.el.parentElement.querySelector('.error-message');
      if (errEl) {
        errEl.style.display = 'none';
      }
    }

    // Inline validation on blur
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field.el) return;
      field.el.addEventListener('blur', function () {
        if (field.el.value && !field.validate(field.el.value)) {
          showError(field);
        } else {
          clearError(field);
        }
      });
      field.el.addEventListener('input', function () {
        if (field.el.classList.contains('error') && field.validate(field.el.value)) {
          clearError(field);
        }
      });
    });

    // Submit: validate, then send via AJAX so we can redirect to our own
    // thank-you page (Formspree free tier ignores the _next field and
    // otherwise shows its own hosted confirmation page).
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        if (!field.el) return;
        if (!field.validate(field.el.value)) {
          showError(field);
          valid = false;
        } else {
          clearError(field);
        }
      });
      if (!valid) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            window.location.href = '/thank-you.html';
          } else {
            return response.json().then(function (data) {
              var msg = data && data.errors && data.errors.length
                ? data.errors.map(function (err) { return err.message; }).join(', ')
                : 'Submission failed';
              throw new Error(msg);
            });
          }
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
          alert('Sorry, something went wrong. Please try again or call us at (623) 271-0384.');
        });
    });
  }

  // --- Capture UTM Parameters ---
  function getUTMParams() {
    var params = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    var utm = {};
    utmKeys.forEach(function (key) {
      var val = params.get(key);
      if (val) utm[key] = val;
    });
    return utm;
  }

  function injectUTMFields() {
    var form = document.querySelector('.lead-form');
    if (!form) return;
    var utm = getUTMParams();
    Object.keys(utm).forEach(function (key) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = utm[key];
      form.appendChild(input);
    });
  }

  injectUTMFields();

  // --- Sticky Header Shadow + Mobile CTA visibility ---
  var header = document.querySelector('.header');
  var mobileCta = document.querySelector('.mobile-cta');
  var hero = document.querySelector('.hero');

  if (header) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;

      // Header shadow
      if (scrollY > 10) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = 'none';
      }

      // Show mobile CTA only after scrolling past the hero
      if (mobileCta && hero) {
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        if (scrollY > heroBottom - 200) {
          mobileCta.classList.add('visible');
        } else {
          mobileCta.classList.remove('visible');
        }
      }
    }, { passive: true });
  }

})();
