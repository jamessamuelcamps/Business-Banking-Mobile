import { colors } from '../../styles/colors';

export default function IntegrationsContent() {
  return (
    <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '24px' }}>
      <h3 style={{ fontSize: '16px', color: colors.black, fontWeight: 600, marginBottom: '16px' }}>
        Integrations Content
      </h3>
      <p style={{ color: colors.textSecondary }}>
        This is a placeholder for the Integrations tab content. You can build this out with third-party integrations.
      </p>
    </div>
  );
}