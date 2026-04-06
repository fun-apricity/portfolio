const ParticleBackground = () => {
  return (
    <div aria-hidden="true" className="ambient-background">
      <div className="ambient-gradient ambient-gradient-primary" />
      <div className="ambient-gradient ambient-gradient-secondary" />
      <div className="ambient-gradient ambient-gradient-tertiary" />
      <div className="ambient-mesh" />
      <div className="ambient-grid" />
      <div className="ambient-vignette" />
    </div>
  );
};

export default ParticleBackground;
