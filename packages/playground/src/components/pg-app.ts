import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { componentConfigs, type ComponentConfig } from '../data/component-configs';
import { generateCode, type GeneratedCode } from '../utils/code-generator';
import type { DeviceSize } from './pg-device-frame';
import type { CodeTab } from './pg-code-panel';
import './pg-header';
import './pg-sidebar';
import './pg-preview';
import './pg-code-panel';
import './pg-controls';
import './pg-resize-handle';

@customElement('pg-app')
export class PgApp extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-areas:
        'header  header   header'
        'sidebar preview  controls';
      grid-template-columns: var(--sidebar-w) 1fr var(--controls-w);
      grid-template-rows: 60px 1fr;
      height: 100vh;
      overflow: hidden;
    }

    pg-header {
      grid-area: header;
    }

    .sidebar-container {
      grid-area: sidebar;
      position: relative;
      overflow: hidden;
    }

    pg-sidebar {
      width: 100%;
      height: 100%;
    }

    .preview-container {
      grid-area: preview;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    pg-preview {
      flex: 1;
      overflow: hidden;
    }

    pg-code-panel {
      height: var(--code-h);
      min-height: 80px;
      max-height: 500px;
      flex-shrink: 0;
    }

    .controls-container {
      grid-area: controls;
      position: relative;
      overflow: hidden;
    }

    pg-controls {
      width: 100%;
      height: 100%;
    }

    pg-resize-handle {
      position: absolute;
    }
  `;

  @state() private _selectedComponent: ComponentConfig = componentConfigs[0];
  @state() private _selectedVariant?: string;
  @state() private _cssValues: Record<string, string> = {};
  @state() private _generatedCode!: GeneratedCode;
  @state() private _isDarkMode = true;
  @state() private _searchQuery = '';
  @state() private _deviceSize: DeviceSize = 'full';
  @state() private _activeCodeTab: CodeTab = 'css';
  @state() private _sidebarWidth = 240;
  @state() private _controlsWidth = 320;
  @state() private _codePanelHeight = 220;

  private _sidebarStartWidth = 0;
  private _controlsStartWidth = 0;
  private _codeStartHeight = 0;

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._initCSSValues();
    this._updateCode();
  }

  private _loadPersistedState() {
    try {
      const saved = localStorage.getItem('pg-state');
      if (saved) {
        const s = JSON.parse(saved);
        if (s.sidebarWidth) this._sidebarWidth = s.sidebarWidth;
        if (s.controlsWidth) this._controlsWidth = s.controlsWidth;
        if (s.codePanelHeight) this._codePanelHeight = s.codePanelHeight;
        if (s.isDarkMode !== undefined) this._isDarkMode = s.isDarkMode;
      }
    } catch {
      /* ignore */
    }
    this._applyTheme();
  }

  private _persistState() {
    try {
      localStorage.setItem(
        'pg-state',
        JSON.stringify({
          sidebarWidth: this._sidebarWidth,
          controlsWidth: this._controlsWidth,
          codePanelHeight: this._codePanelHeight,
          isDarkMode: this._isDarkMode,
        }),
      );
    } catch {
      /* ignore */
    }
  }

  private _applyTheme() {
    document.documentElement.setAttribute('data-theme', this._isDarkMode ? 'dark' : 'light');
  }

  private _initCSSValues() {
    this._cssValues = {};
    this._selectedComponent.cssVariables.forEach((v) => {
      this._cssValues[v.name] = v.default;
    });
  }

  private _updateCode() {
    this._generatedCode = generateCode(
      this._selectedComponent,
      this._cssValues,
      this._selectedVariant,
    );
  }

  private _showToast(message: string) {
    const existing = document.querySelector('.pg-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'pg-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  // ── Event handlers ──

  private _onComponentSelect(e: CustomEvent<{ name: string }>) {
    const comp = componentConfigs.find((c) => c.name === e.detail.name);
    if (comp) {
      this._selectedComponent = comp;
      this._selectedVariant = undefined;
      this._initCSSValues();
      this._updateCode();
    }
  }

  private _onControlChange(e: CustomEvent<{ name: string; value: string }>) {
    this._cssValues = { ...this._cssValues, [e.detail.name]: e.detail.value };
    this._updateCode();
  }

  private _onVariantSelect(e: CustomEvent<{ name?: string }>) {
    this._selectedVariant = e.detail.name;
    this._updateCode();
  }

  private _onSearch(e: CustomEvent<{ query: string }>) {
    this._searchQuery = e.detail.query;
  }

  private _onDeviceChange(e: CustomEvent<{ size: DeviceSize }>) {
    this._deviceSize = e.detail.size;
  }

  private _onThemeToggle() {
    this._isDarkMode = !this._isDarkMode;
    this._applyTheme();
    this._persistState();
    this._showToast(this._isDarkMode ? 'Dark mode' : 'Light mode');
  }

  private _onReset() {
    this._initCSSValues();
    this._updateCode();
    this._showToast('Reset to defaults');
  }

  private _onCopyCSS() {
    navigator.clipboard.writeText(this._generatedCode.css).then(
      () => this._showToast('CSS copied!'),
      () => this._showToast('Failed to copy'),
    );
  }

  private _onExport() {
    const blob = new Blob([this._generatedCode.fullExample], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this._selectedComponent.name.toLowerCase()}-example.html`;
    a.click();
    URL.revokeObjectURL(url);
    this._showToast('File downloaded!');
  }

  private _onToastShow(e: CustomEvent<{ message: string }>) {
    this._showToast(e.detail.message);
  }

  // ── Resize handlers ──

  private _onSidebarResizeStart() {
    this._sidebarStartWidth = this._sidebarWidth;
  }

  private _onSidebarResize(e: CustomEvent<{ delta: number }>) {
    this._sidebarWidth = Math.min(400, Math.max(180, this._sidebarStartWidth + e.detail.delta));
  }

  private _onSidebarResizeEnd() {
    this._persistState();
  }

  private _onControlsResizeStart() {
    this._controlsStartWidth = this._controlsWidth;
  }

  private _onControlsResize(e: CustomEvent<{ delta: number }>) {
    this._controlsWidth = Math.min(500, Math.max(250, this._controlsStartWidth - e.detail.delta));
  }

  private _onControlsResizeEnd() {
    this._persistState();
  }

  private _onCodeResizeStart() {
    this._codeStartHeight = this._codePanelHeight;
  }

  private _onCodeResize(e: CustomEvent<{ delta: number }>) {
    this._codePanelHeight = Math.min(500, Math.max(80, this._codeStartHeight - e.detail.delta));
  }

  private _onCodeResizeEnd() {
    this._persistState();
  }

  protected updated() {
    this.style.setProperty('--sidebar-w', `${this._sidebarWidth}px`);
    this.style.setProperty('--controls-w', `${this._controlsWidth}px`);
    this.style.setProperty('--code-h', `${this._codePanelHeight}px`);
  }

  render() {
    return html`
      <pg-header
        .searchQuery=${this._searchQuery}
        .deviceSize=${this._deviceSize}
        .isDarkMode=${this._isDarkMode}
        @pg-search=${this._onSearch}
        @pg-device-change=${this._onDeviceChange}
        @pg-theme-toggle=${this._onThemeToggle}
        @pg-reset=${this._onReset}
        @pg-copy-css=${this._onCopyCSS}
        @pg-export=${this._onExport}
      ></pg-header>

      <div class="sidebar-container">
        <pg-sidebar
          .selected=${this._selectedComponent.name}
          .searchQuery=${this._searchQuery}
          @pg-component-select=${this._onComponentSelect}
        ></pg-sidebar>
        <pg-resize-handle
          direction="horizontal"
          side="right"
          @pg-resize-start=${this._onSidebarResizeStart}
          @pg-resize=${this._onSidebarResize}
          @pg-resize-end=${this._onSidebarResizeEnd}
        ></pg-resize-handle>
      </div>

      <div class="preview-container">
        <pg-preview
          .config=${this._selectedComponent}
          .selectedVariant=${this._selectedVariant}
          .cssValues=${this._cssValues}
          .deviceSize=${this._deviceSize}
        ></pg-preview>
        <pg-code-panel
          .activeTab=${this._activeCodeTab}
          .code=${this._generatedCode}
          @pg-code-tab-change=${(e: CustomEvent<{ tab: CodeTab }>) => {
            this._activeCodeTab = e.detail.tab;
          }}
          @pg-toast-show=${this._onToastShow}
        ></pg-code-panel>
        <pg-resize-handle
          direction="vertical"
          side="top"
          style="bottom: auto; top: auto; position: relative; margin-top: -2px;"
          @pg-resize-start=${this._onCodeResizeStart}
          @pg-resize=${this._onCodeResize}
          @pg-resize-end=${this._onCodeResizeEnd}
        ></pg-resize-handle>
      </div>

      <div class="controls-container">
        <pg-resize-handle
          direction="horizontal"
          side="left"
          @pg-resize-start=${this._onControlsResizeStart}
          @pg-resize=${this._onControlsResize}
          @pg-resize-end=${this._onControlsResizeEnd}
        ></pg-resize-handle>
        <pg-controls
          .config=${this._selectedComponent}
          .cssValues=${this._cssValues}
          .selectedVariant=${this._selectedVariant}
          @pg-control-change=${this._onControlChange}
          @pg-variant-select=${this._onVariantSelect}
        ></pg-controls>
      </div>
    `;
  }
}
