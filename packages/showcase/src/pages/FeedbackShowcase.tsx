import { CodeExample } from '../components/CodeExample';

function FeedbackShowcase() {
  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Feedback & Progress</h1>
        <p className="page-description">
          Progress indicators and loading states for user feedback
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Progress Bar</h2>
        <div className="component-demo">
          <div className="demo-column">
            <div>
              <div className="demo-label">25% Complete</div>
              <ae-progress value="25" max="100"></ae-progress>
            </div>
            <div>
              <div className="demo-label">50% Complete</div>
              <ae-progress value="50" max="100"></ae-progress>
            </div>
            <div>
              <div className="demo-label">75% Complete</div>
              <ae-progress value="75" max="100"></ae-progress>
            </div>
            <div>
              <div className="demo-label">100% Complete</div>
              <ae-progress value="100" max="100"></ae-progress>
            </div>
          </div>
          <CodeExample
            code={`<ae-progress value="25" max="100"></ae-progress>
<ae-progress value="50" max="100"></ae-progress>
<ae-progress value="75" max="100"></ae-progress>
<ae-progress value="100" max="100"></ae-progress>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Spinner</h2>
        <div className="component-demo">
          <div className="demo-label">Loading States</div>
          <div className="demo-row">
            <ae-spinner size="small"></ae-spinner>
            <ae-spinner size="medium"></ae-spinner>
            <ae-spinner size="large"></ae-spinner>
          </div>
          <CodeExample
            code={`<ae-spinner size="small"></ae-spinner>
<ae-spinner size="medium"></ae-spinner>
<ae-spinner size="large"></ae-spinner>`}
          />
        </div>
      </div>
    </div>
  );
}

export default FeedbackShowcase;
