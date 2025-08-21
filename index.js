// ===== Fade-in on scroll (generic) =====
const fadeObserver = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
  
  // ===== Education timeline reveal =====
  const eduItems = document.querySelectorAll('#education .tl-item');
  const eduObserver = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); }),
    { threshold: 0.2 }
  );
  eduItems.forEach(i => eduObserver.observe(i));
  
  // ===== Skill bars once visible =====
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillsSection.querySelectorAll('.skill-bar').forEach(bar => bar.classList.add('animate'));
          skillsObserver.unobserve(skillsSection);
        }
      });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
  }
  
  // ===== (Optional) Project modal helpers if you add a modal later =====
  function openProject({ title, desc, mediaType, mediaSrc, links }) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
  
    const img = document.getElementById('proj-img');
    const vid = document.getElementById('proj-video');
    const titleEl = document.getElementById('proj-title');
    const descEl = document.getElementById('proj-desc');
    const linkWrap = document.getElementById('proj-links');
  
    img.classList.add('hidden');
    vid.classList.add('hidden');
    try { vid.pause(); } catch (_) {}
    vid.removeAttribute('src');
  
    if (mediaType === 'video') {
      vid.classList.remove('hidden');
      vid.src = mediaSrc; vid.load(); vid.play().catch(() => {});
    } else {
      img.classList.remove('hidden');
      img.src = mediaSrc;
    }
  
    titleEl.textContent = title;
    descEl.textContent = desc;
  
    linkWrap.innerHTML = '';
    const makeBtn = (href, label) => {
      if (!href) return;
      const a = document.createElement('a');
      a.href = href; a.target = '_blank';
      a.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700';
      a.textContent = label;
      linkWrap.appendChild(a);
    };
    makeBtn(links?.live, 'Live Demo');
    makeBtn(links?.case, 'Case Study');
    makeBtn(links?.code, 'Source Code');
  
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  function closeProject() {
    const modal = document.getElementById('project-modal');
    const vid = document.getElementById('proj-video');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    try { vid.pause(); } catch (_) {}
  }
  
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#skills');
    const bars = section.querySelectorAll('.skill-bar');

    // make sure everything is at 0% initially
    bars.forEach(b => b.style.width = '0%');

    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e.isIntersecting) return;

      // animate each bar to its own --width value (e.g. "60%")
      bars.forEach(bar => {
        const target = bar.style.getPropertyValue('--width').trim()
                     || getComputedStyle(bar).getPropertyValue('--width').trim()
                     || '0%';
        // trigger on next frame to ensure transition runs
        requestAnimationFrame(() => { bar.style.width = target; });
      });

      io.disconnect(); // run once
    }, { threshold: 0.35 });

    io.observe(section);
  });

  
