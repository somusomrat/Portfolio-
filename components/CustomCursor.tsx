import React, { useEffect } from 'react';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      (follower as HTMLElement).style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      (cursor as HTMLElement).style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onMouseEnter = () => {
        (follower as HTMLElement).classList.add('hover');
    };
    const onMouseLeave = () => {
        (follower as HTMLElement).classList.remove('hover');
    };

    window.addEventListener('mousemove', onMouseMove);
    
    document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return null;
};

export default CustomCursor;
