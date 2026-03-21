(() => {
  function applyStatusTone(el, type = 'info') {
    if (!el) return;
    const next = type === 'success' || type === 'warn' || type === 'error' ? type : 'info';
    el.setAttribute('data-status', next);
  }

  function create(ui) {
    let confirmDialogResolve = null;

    function setStatus(text, scope = 'App', type = 'info') {
      if (ui.appStatusScope) ui.appStatusScope.textContent = scope;
      if (ui.appStatusText) ui.appStatusText.textContent = text;
      applyStatusTone(ui.appStatus, type);
    }

    function setPinImportStatus(text, type = 'info') {
      if (ui.pinParseStatus) ui.pinParseStatus.textContent = text;
      applyStatusTone(ui.pinParseStatus, type);
    }

    function setTopoStatus(text, type = 'info') {
      if (ui.topoStatus) ui.topoStatus.textContent = text;
      applyStatusTone(ui.topoStatus, type);
    }

    function setExportStatus(text, type = 'info') {
      if (ui.exportStatus) ui.exportStatus.textContent = text;
      applyStatusTone(ui.exportStatus, type);
    }

    function confirmAction(options = {}) {
      const {
        title = 'Confirm Action',
        message = 'Confirm this action.',
        confirmLabel = 'Confirm',
        danger = false
      } = options;
      if (!ui.confirmDialog?.showModal) return Promise.resolve(false);
      if (confirmDialogResolve) {
        confirmDialogResolve(false);
        confirmDialogResolve = null;
      }
      if (ui.confirmDialogTitle) ui.confirmDialogTitle.textContent = title;
      if (ui.confirmDialogBody) ui.confirmDialogBody.textContent = message;
      if (ui.confirmDialogConfirmBtn) {
        ui.confirmDialogConfirmBtn.textContent = confirmLabel;
        ui.confirmDialogConfirmBtn.classList.toggle('ds-btn-danger', !!danger);
        ui.confirmDialogConfirmBtn.classList.toggle('ds-btn-primary', !danger);
      }
      ui.confirmDialog.showModal();
      return new Promise((resolve) => {
        confirmDialogResolve = resolve;
      });
    }

    function resolveConfirmDialog(result) {
      if (ui.confirmDialog?.open) ui.confirmDialog.close();
      if (confirmDialogResolve) {
        confirmDialogResolve(!!result);
        confirmDialogResolve = null;
      }
    }

    function hasPendingConfirm() {
      return !!confirmDialogResolve;
    }

    return {
      applyStatusTone,
      setStatus,
      setPinImportStatus,
      setTopoStatus,
      setExportStatus,
      confirmAction,
      resolveConfirmDialog,
      hasPendingConfirm
    };
  }

  window.TrekulateFeedback = {
    create
  };
})();
