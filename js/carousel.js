(function(){
  const track = document.getElementById('carouselTrack');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const viewport = track.parentElement; // .carousel-viewport
  let items = Array.from(track.querySelectorAll('.carousel-item'));

  function getVisibleCount(){
    const w = window.innerWidth;
    if(w >= 1024) return 3;
    if(w >= 768) return 2;
    return 1;
  }

  let visible = getVisibleCount();
  let itemWidth = 0;
  let gap = 0;
  let currentIndex = 0;
  let isMoving = false;
  let autoplayTimer = null;

  function refreshItems(){
    items = Array.from(track.querySelectorAll('.carousel-item'));
  }

  function applyWidths(instant = true){
    visible = getVisibleCount();
    // read gap (fallback 0)
    const cs = window.getComputedStyle(track);
    gap = parseFloat(cs.gap) || 0;

    const vpWidth = viewport.clientWidth;
    // reserve space for inner gaps between visible items
    const totalVisibleGaps = Math.max(0, visible - 1) * gap;
    itemWidth = Math.floor((vpWidth - totalVisibleGaps) / visible);

    // set each item width in px so it is always relative to the viewport
    items.forEach(it => {
      it.style.width = itemWidth + 'px';
    });

    // total track width = sum of item widths + gaps between all items
    const trackWidth = (items.length * itemWidth) + (Math.max(0, items.length - 1) * gap);
    track.style.width = trackWidth + 'px';

    // reposition to the same index (no animation if instant)
    goTo(currentIndex, instant);
  }

  // move to slide i; if instant=true, no transition
  function goTo(i, instant = false){
    if(isMoving) return;
    isMoving = true;

    const maxIndex = Math.max(0, items.length - visible);

    // loop: if beyond last -> back to 0, if before 0 -> last
    if(i > maxIndex) i = 0;
    if(i < 0) i = maxIndex;

    currentIndex = i;
    const step = itemWidth + gap;
    const translateX = -(currentIndex * step);

    track.style.transition = instant ? 'none' : 'transform .6s cubic-bezier(.22,.9,.36,1)';
    track.style.transform = `translateX(${translateX}px)`;

    if(instant){
      // allow layout to settle
      requestAnimationFrame(()=> requestAnimationFrame(()=> isMoving = false));
    } else {
      setTimeout(()=> isMoving = false, 620);
    }
  }

  // controls
  next.addEventListener('click', ()=> goTo(currentIndex + 1));
  prev.addEventListener('click', ()=> goTo(currentIndex - 1));

  // autoplay with pause on hover
  function startAuto(){ autoplayTimer = setInterval(()=> goTo(currentIndex + 1), 3500); }
  function stopAuto(){ if(autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; }

  [track, prev, next].forEach(el=>{
    el.addEventListener('mouseenter', stopAuto);
    el.addEventListener('mouseleave', startAuto);
  });

  // accessibility: make items focusable
  document.querySelectorAll('.carousel-item').forEach((it)=> it.setAttribute('tabindex','0'));

  // handle resize
  let resizeTimer = null;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=> applyWidths(true), 120);
  });

  // init
  refreshItems();
  applyWidths(true);
  startAuto();

  // expose helper if you add/remove images dynamically
  window.rebuildCarousel = function(){
    stopAuto();
    refreshItems();
    applyWidths(true);
    startAuto();
  };
})();