import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots]         = useState('');

  // Animate progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(timer); return p; }
        return p + Math.random() * 12;
      });
    }, 180);
    return () => clearInterval(timer);
  }, []);

  // Animate dots
  useEffect(() => {
    const t = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 450);
    return () => clearInterval(t);
  }, []);

  const styles = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,.18) 0%, transparent 70%), linear-gradient(180deg,#0F172A 0%,#0d1b3e 60%,#0F172A 100%)',
      fontFamily: "'Cairo','Inter','Tajawal',sans-serif",
      overflow: 'hidden',
    },
    /* background orbs */
    orb1: {
      position:'absolute', width:500, height:500, borderRadius:'50%',
      background:'rgba(59,130,246,.12)', filter:'blur(80px)',
      top:'-15%', left:'-10%', pointerEvents:'none',
      animation:'orbFloat 8s ease-in-out infinite',
    },
    orb2: {
      position:'absolute', width:400, height:400, borderRadius:'50%',
      background:'rgba(6,182,212,.08)', filter:'blur(80px)',
      bottom:'-15%', right:'-10%', pointerEvents:'none',
      animation:'orbFloat 10s ease-in-out infinite reverse',
    },
    orb3: {
      position:'absolute', width:250, height:250, borderRadius:'50%',
      background:'rgba(167,139,250,.08)', filter:'blur(60px)',
      top:'40%', right:'5%', pointerEvents:'none',
      animation:'orbFloat 12s ease-in-out infinite',
    },
    /* grid pattern */
    grid: {
      position:'absolute', inset:0, pointerEvents:'none',
      backgroundImage:'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
      backgroundSize:'50px 50px',
    },
    /* center card */
    card: {
      position:'relative', zIndex:1,
      display:'flex', flexDirection:'column', alignItems:'center', gap:28,
      padding:'48px 56px',
      background:'rgba(255,255,255,.04)',
      backdropFilter:'blur(20px)',
      border:'1px solid rgba(255,255,255,.1)',
      borderRadius:28,
      boxShadow:'0 32px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)',
      minWidth:300, textAlign:'center',
      animation:'cardIn .5s cubic-bezier(.34,1.56,.64,1) both',
    },
    /* logo circle */
    logoRing: {
      position:'relative',
      width:88, height:88,
    },
    logoInner: {
      position:'absolute', inset:0,
      display:'flex', alignItems:'center', justifyContent:'center',
      background:'linear-gradient(135deg,#3B82F6,#06B6D4)',
      borderRadius:'50%',
      boxShadow:'0 0 0 0 rgba(59,130,246,.4)',
      animation:'logoPulse 2s ease-in-out infinite',
      fontSize:38,
    },
    spinRing: {
      position:'absolute', inset:-5,
      borderRadius:'50%',
      border:'2.5px solid transparent',
      borderTopColor:'#3B82F6',
      borderRightColor:'#06B6D4',
      animation:'spin 1.2s linear infinite',
    },
    spinRing2: {
      position:'absolute', inset:-12,
      borderRadius:'50%',
      border:'1.5px solid transparent',
      borderTopColor:'rgba(167,139,250,.4)',
      borderLeftColor:'rgba(6,182,212,.3)',
      animation:'spin 2s linear infinite reverse',
    },
    /* title */
    title: {
      fontSize:'1.45rem', fontWeight:900, letterSpacing:'-0.5px',
      background:'linear-gradient(135deg,#fff 0%,rgba(255,255,255,.7) 100%)',
      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
      backgroundClip:'text', lineHeight:1.3,
    },
    subtitle: {
      fontSize:'.82rem', color:'rgba(255,255,255,.35)', marginTop:4,
      letterSpacing:'1.5px', textTransform:'uppercase',
    },
    /* progress */
    progressWrap: {
      width:'100%', maxWidth:220,
      background:'rgba(255,255,255,.07)',
      borderRadius:100, height:4, overflow:'hidden',
    },
    progressBar: {
      height:'100%',
      background:'linear-gradient(90deg,#3B82F6,#06B6D4)',
      borderRadius:100,
      boxShadow:'0 0 10px rgba(59,130,246,.6)',
      transition:'width .25s ease',
    },
    /* status text */
    statusText: {
      fontSize:'.82rem', color:'rgba(255,255,255,.35)',
      letterSpacing:'.5px',
    },
    /* dots row */
    dotsRow: {
      display:'flex', gap:8,
    },
    dot: (delay) => ({
      width:6, height:6, borderRadius:'50%',
      background:'linear-gradient(135deg,#3B82F6,#06B6D4)',
      animation:`dotBounce 1.2s ease-in-out ${delay}s infinite`,
    }),
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap');
    @keyframes orbFloat {
      0%,100%{transform:translateY(0) scale(1);}
      50%{transform:translateY(-30px) scale(1.08);}
    }
    @keyframes cardIn {
      from{opacity:0;transform:translateY(30px) scale(.95);}
      to{opacity:1;transform:translateY(0) scale(1);}
    }
    @keyframes logoPulse {
      0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.5),0 12px 40px rgba(59,130,246,.4);}
      50%{box-shadow:0 0 0 14px rgba(59,130,246,0),0 12px 60px rgba(6,182,212,.6);}
    }
    @keyframes spin {
      to{transform:rotate(360deg);}
    }
    @keyframes dotBounce {
      0%,80%,100%{transform:translateY(0);opacity:.4;}
      40%{transform:translateY(-8px);opacity:1;}
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={styles.overlay}>
        {/* Orbs */}
        <div style={styles.orb1} />
        <div style={styles.orb2} />
        <div style={styles.orb3} />
        {/* Grid */}
        <div style={styles.grid} />

        {/* Card */}
        <div style={styles.card}>
          {/* Animated Logo */}
          <div style={styles.logoRing}>
            <div style={styles.spinRing2} />
            <div style={styles.spinRing} />
            <div style={styles.logoInner}>☕</div>
          </div>

          {/* Title */}
          <div>
            <div style={styles.title}>Café & Restaurant</div>
            <div style={styles.title}>Management</div>
            <div style={styles.subtitle}>by K4 IT</div>
          </div>

          {/* Progress Bar */}
          <div style={styles.progressWrap}>
            <div style={{ ...styles.progressBar, width: `${Math.min(progress, 95)}%` }} />
          </div>

          {/* Status */}
          <div style={styles.statusText}>
            جاري التحميل{dots}
          </div>

          {/* Bouncing dots */}
          <div style={styles.dotsRow}>
            <div style={styles.dot(0)} />
            <div style={styles.dot(0.15)} />
            <div style={styles.dot(0.3)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
