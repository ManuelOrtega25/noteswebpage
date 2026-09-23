/**
 * Minimalist UI & Interaction Script
 * Handles subtle micro-interactions, phone mockup tab filtering, and download toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Phone mockup interactive folder switching
  const folderPills = document.querySelectorAll('.folder-pill');
  const mockupNotes = [
    {
      category: 'Todas',
      title: 'Revisión de entrega de proyecto',
      snippet: 'Validar persistencia de imágenes en almacenamiento interno y disparadores de AlarmManager.',
      reminder: '25 sep, 10:00',
      date: 'Hoy',
      hasImage: false
    },
    {
      category: 'Universidad',
      title: 'Esquema de base de datos',
      snippet: 'Estructura con llave foránea y borrado en cascada configurado entre carpetas y notas.',
      reminder: null,
      date: 'Ayer',
      hasImage: true,
      imageName: 'diagrama_room.jpg'
    },
    {
      category: 'Finanzas',
      title: 'Cálculo de presupuesto mensual',
      snippet: 'Resumen de balance en cuenta corriente y desglose de gastos variables sin conexión.',
      reminder: '30 sep, 09:00',
      date: 'Hace 3 días',
      hasImage: false
    },
    {
      category: 'Lecturas',
      title: 'Notas sobre arquitectura limpia',
      snippet: 'Patrón Repository separando la capa Room SQLite del ViewModel en Jetpack Compose.',
      reminder: null,
      date: 'Hace 5 días',
      hasImage: false
    }
  ];

  const notesFeed = document.querySelector('.phone-notes-feed');

  function renderMockupNotes(category) {
    if (!notesFeed) return;

    const filtered = category === 'Todas' 
      ? mockupNotes.slice(0, 2) 
      : mockupNotes.filter(n => n.category === category);

    if (filtered.length === 0) {
      notesFeed.innerHTML = `
        <div style="padding: 24px 12px; text-align: center; color: var(--text-tertiary); font-size: 0.76rem;">
          No hay notas en esta carpeta
        </div>
      `;
      return;
    }

    notesFeed.innerHTML = filtered.map(note => `
      <div class="mockup-note-card">
        <div class="mockup-note-title">${note.title}</div>
        ${note.hasImage ? `
          <div class="mockup-note-image">
            <img src="${note.imageSrc || 'diagrama_room.png'}" alt="Adjunto">
          </div>
        ` : ''}
        <div class="mockup-note-snippet">${note.snippet}</div>
        <div class="mockup-note-meta">
          ${note.reminder ? `
            <span class="reminder-chip">
              <svg class="icon" style="width:12px; height:12px;" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              ${note.reminder}
            </span>
          ` : '<span></span>'}
          <span class="date-stamp">${note.date}</span>
        </div>
      </div>
    `).join('');
  }

  folderPills.forEach(pill => {
    pill.addEventListener('click', () => {
      folderPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderMockupNotes(pill.textContent.trim());
    });
  });

  // 2. Download Feedback Toast
  const downloadButtons = document.querySelectorAll('a[download]');
  let activeToast = null;

  function showDownloadToast() {
    if (activeToast) {
      activeToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
      <svg class="icon" style="color: var(--pastel-sage-text);" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Descarga iniciada: <strong>notes-app.apk</strong> (12.0 MB)</span>
    `;

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#FFFFFF',
      color: '#1C1C1A',
      padding: '12px 18px',
      borderRadius: '8px',
      border: '1px solid rgba(28, 28, 26, 0.15)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.84rem',
      fontFamily: 'var(--font-sans)',
      zIndex: '1000',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      opacity: '0',
      transform: 'translateY(8px)'
    });

    document.body.appendChild(toast);
    activeToast = toast;

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 4000);
  }

  downloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showDownloadToast();
    });
  });
});
