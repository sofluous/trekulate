(() => {
  function create(config) {
    const {
      state,
      ui,
      storageKeys,
      buildJourneyPayload,
      buildJourneyFilePayload,
      normalizeImportedJourneyPayload,
      applyJourneyPayload,
      createNewJourneyWorkspace,
      markJourneyDirty,
      updateRawView,
      toast,
      setStatus,
      confirmAction
    } = config;

    function listJourneyEntries() {
      return Object.values(state.journeys || {}).sort((a, b) => {
        const aTime = Number(a?.updatedAt || a?.createdAt || 0);
        const bTime = Number(b?.updatedAt || b?.createdAt || 0);
        return bTime - aTime;
      });
    }

    function suggestJourneyName() {
      const existing = new Set(listJourneyEntries().map(j => String(j?.name || '').trim().toLowerCase()));
      let i = 1;
      while (existing.has(`journey ${i}`)) i += 1;
      return `Journey ${i}`;
    }

    function persistJourneysToStorage() {
      try {
        localStorage.setItem(storageKeys.journeyStorageKey, JSON.stringify(state.journeys || {}));
        localStorage.setItem(storageKeys.currentJourneyStorageKey, state.currentJourneyId || '');
      } catch (err) {
        console.warn('Failed to persist journeys:', err);
      }
    }

    function loadJourneysFromStorage() {
      try {
        const raw = localStorage.getItem(storageKeys.journeyStorageKey);
        const currentId = localStorage.getItem(storageKeys.currentJourneyStorageKey) || '';
        const parsed = raw ? JSON.parse(raw) : {};
        state.journeys = parsed && typeof parsed === 'object' ? parsed : {};
        state.currentJourneyId = currentId && state.journeys[currentId] ? currentId : '';
      } catch (err) {
        console.warn('Failed to load journeys:', err);
        state.journeys = {};
        state.currentJourneyId = '';
      }
    }

    function renderJourneyList() {
      if (!ui.journeyList) return;
      ui.journeyList.innerHTML = '';
      const current = state.currentJourneyId ? state.journeys[state.currentJourneyId] : null;
      if (!current) {
        const draft = document.createElement('div');
        draft.className = 'panel-status ds-status';
        draft.textContent = state.journeyDirty
          ? 'Working in an unsaved trek.'
          : 'No saved trek is currently active.';
        ui.journeyList.appendChild(draft);
      }
      for (const entry of listJourneyEntries()) {
        const row = document.createElement('div');
        row.className = `journey-row${entry.id === state.currentJourneyId ? ' is-active' : ''}`;
        const meta = [];
        const pinCount = Array.isArray(entry.pins) ? entry.pins.length : 0;
        meta.push(`${pinCount} pin${pinCount === 1 ? '' : 's'}`);
        if (entry.createdAt) {
          const createdLabel = new Date(entry.createdAt).toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          meta.push(
            `Created ${createdLabel}`
          );
        }
        const main = document.createElement('div');
        main.className = 'journey-row-main';
        const selectBtn = document.createElement('button');
        selectBtn.type = 'button';
        selectBtn.className = 'journey-row-select';
        selectBtn.title = `Load ${entry.name || 'journey'}`;
        const title = document.createElement('span');
        title.className = 'journey-row-title';
        title.textContent = entry.name || 'Journey';
        const metaLine = document.createElement('span');
        metaLine.className = 'journey-row-meta';
        metaLine.textContent = meta.join(' | ');
        selectBtn.addEventListener('click', () => loadJourneyFromModal(entry.id));
        selectBtn.append(title, metaLine);
        main.appendChild(selectBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'ds-btn ds-btn-danger ds-btn-icon journey-delete-btn';
        deleteBtn.title = `Delete ${entry.name || 'journey'}`;
        deleteBtn.innerHTML = '<i class="iconoir-trash" aria-hidden="true"></i>';
        deleteBtn.addEventListener('click', () => deleteJourneyById(entry.id));
        const actions = document.createElement('div');
        actions.className = 'journey-row-actions';
        actions.appendChild(deleteBtn);
        row.append(main, actions);
        ui.journeyList.appendChild(row);
      }
    }

    function syncJourneyUI() {
      const current = state.currentJourneyId ? state.journeys[state.currentJourneyId] : null;
      if (ui.headerJourneyName) {
        ui.headerJourneyName.textContent = current
          ? current.name
          : (state.journeyDirty ? 'Unsaved Trek' : 'New Trek');
      }
      const updatedLabel = current?.updatedAt
        ? new Date(current.updatedAt).toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
          })
        : '';
      if (ui.journeyStatusText) {
        ui.journeyStatusText.textContent = current
          ? (state.journeyDirty
              ? `${current.name} has unsaved local changes. Major edits auto-save locally after a short pause.`
              : `${current.name} is saved locally. Major edits auto-save locally.`)
          : 'Choose an existing trek or create a fresh one. New treks auto-save major edits after they are created.';
      } else if (ui.journeyStatus) {
        ui.journeyStatus.textContent = current
          ? `${current.name}${state.journeyDirty ? ' has unsaved local changes.' : ' is saved locally.'}`
          : 'Choose an existing trek or create a fresh one.';
      }
      if (ui.journeyStatusBadge) {
        ui.journeyStatusBadge.textContent = current
          ? (state.journeyDirty
              ? 'Autosave pending'
              : (updatedLabel ? `Saved ${updatedLabel}` : 'Saved locally'))
          : 'Autosaves after creation';
      }
      if (ui.confirmCreateJourney) {
        ui.confirmCreateJourney.disabled = !ui.journeyName?.value.trim();
      }
      if (ui.saveJourneyNow) {
        ui.saveJourneyNow.disabled = !current;
      }
      renderJourneyList();
    }

    function saveCurrentJourney(options = {}) {
      const { silent = false, name: overrideName } = options;
      const current = state.currentJourneyId ? state.journeys[state.currentJourneyId] : null;
      const name = String(overrideName || current?.name || ui.journeyName?.value || suggestJourneyName()).trim() || suggestJourneyName();
      const payload = buildJourneyPayload(name);
      state.journeys[payload.id] = payload;
      state.currentJourneyId = payload.id;
      if (ui.journeyName) ui.journeyName.value = payload.name;
      persistJourneysToStorage();
      markJourneyDirty(false);
      if (!silent) {
        setStatus(`Saved journey ${payload.name}.`, 'Journey', 'success');
        toast(`Saved ${payload.name}`, 'ok');
      }
      updateRawView();
    }

    function deleteJourneyById(journeyId) {
      const current = journeyId ? state.journeys[journeyId] : null;
      if (!current) return;
      confirmAction({
        title: 'Delete Trek?',
        message: `This removes "${current.name}" from local saved treks.`,
        confirmLabel: 'Delete Trek',
        danger: true
      }).then((ok) => {
        if (!ok) return;
        delete state.journeys[journeyId];
        const remaining = listJourneyEntries();
        if (remaining.length) {
          persistJourneysToStorage();
          applyJourneyPayload(remaining[0], { silent: true });
          persistJourneysToStorage();
          toast(`Deleted ${current.name}`, 'warn');
          setStatus(`Deleted journey ${current.name}.`, 'Journey', 'warn');
        } else {
          persistJourneysToStorage();
          createNewJourneyWorkspace();
          persistJourneysToStorage();
          toast(`Deleted ${current.name}`, 'warn');
          setStatus(`Deleted journey ${current.name}.`, 'Journey', 'warn');
        }
      });
    }

    function openJourneyDialog() {
      if (!ui.journeyDialog?.showModal) return;
      if (ui.journeyListPage) ui.journeyListPage.hidden = false;
      if (ui.journeyCreatePage) ui.journeyCreatePage.hidden = true;
      if (ui.journeyName) ui.journeyName.value = suggestJourneyName();
      syncJourneyUI();
      ui.journeyDialog.showModal();
    }

    function closeJourneyDialog() {
      ui.journeyDialog?.close?.();
    }

    function showJourneyCreateComposer() {
      if (ui.journeyListPage) ui.journeyListPage.hidden = true;
      if (ui.journeyCreatePage) ui.journeyCreatePage.hidden = false;
      if (ui.journeyName) {
        ui.journeyName.value = suggestJourneyName();
        ui.journeyName.focus();
        ui.journeyName.select();
      }
      syncJourneyUI();
    }

    function hideJourneyCreateComposer() {
      if (ui.journeyListPage) ui.journeyListPage.hidden = false;
      if (ui.journeyCreatePage) ui.journeyCreatePage.hidden = true;
      if (ui.journeyName) ui.journeyName.value = '';
      syncJourneyUI();
    }

    function loadJourneyFromModal(journeyId) {
      const next = state.journeys[journeyId];
      if (!next) return;
      if (state.journeyDirty && state.currentJourneyId) {
        saveCurrentJourney({ silent: true });
      } else if (state.journeyDirty && !state.currentJourneyId) {
        confirmAction({
          title: 'Discard Unsaved Trek?',
          message: 'Loading another trek will discard the current unsaved workspace.',
          confirmLabel: 'Discard And Load',
          danger: true
        }).then((ok) => {
          if (!ok) return;
          applyJourneyPayload(next);
          persistJourneysToStorage();
          closeJourneyDialog();
        });
        return;
      }
      applyJourneyPayload(next);
      persistJourneysToStorage();
      closeJourneyDialog();
    }

    function confirmCreateJourney() {
      const name = ui.journeyName?.value.trim();
      if (!name) return;
      if (state.journeyDirty && !state.currentJourneyId) {
        confirmAction({
          title: 'Discard Unsaved Trek?',
          message: 'Creating a fresh trek will discard the current unsaved workspace.',
          confirmLabel: 'Discard And Create',
          danger: true
        }).then((ok) => {
          if (!ok) return;
          createNewJourneyWorkspace();
          saveCurrentJourney({ name, silent: true });
          setStatus(`Created trek ${name}.`, 'Journey', 'success');
          toast(`Created ${name}`, 'ok');
          hideJourneyCreateComposer();
          closeJourneyDialog();
        });
        return;
      }
      createNewJourneyWorkspace();
      saveCurrentJourney({ name, silent: true });
      setStatus(`Created trek ${name}.`, 'Journey', 'success');
      toast(`Created ${name}`, 'ok');
      hideJourneyCreateComposer();
      closeJourneyDialog();
    }

    function exportCurrentJourneyToFile() {
      try {
        const name = ui.journeyName?.value.trim() || (state.currentJourneyId && state.journeys[state.currentJourneyId]?.name) || suggestJourneyName();
        const payload = buildJourneyFilePayload(name);
        const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'journey';
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeName}.trekulate.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setStatus(`Exported journey ${name}.`, 'Export', 'success');
        toast(`Exported ${name}`, 'ok');
      } catch (err) {
        console.error(err);
        setStatus('Journey export failed.', 'Export', 'error');
        toast('Journey export failed', 'err');
      }
    }

    async function importJourneyFromFile(file) {
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const journey = normalizeImportedJourneyPayload(parsed);
        const existing = state.journeys[journey.id];
        const finishImport = () => {
          state.journeys[journey.id] = {
            ...journey,
            createdAt: Number(journey.createdAt || Date.now()),
            updatedAt: Date.now()
          };
          persistJourneysToStorage();
          applyJourneyPayload(state.journeys[journey.id], { silent: true });
          persistJourneysToStorage();
          toast(`Imported ${journey.name}`, 'ok');
          setStatus(`Imported journey ${journey.name}.`, 'Journey', 'success');
        };
        if (existing) {
          const ok = await confirmAction({
            title: 'Replace Existing Trek?',
            message: `Importing will replace the local saved trek "${existing.name}".`,
            confirmLabel: 'Replace Trek',
            danger: true
          });
          if (!ok) return;
        }
        finishImport();
      } catch (err) {
        console.error(err);
        const reason = err?.message ? ` ${err.message}` : '';
        setStatus(`Journey import failed.${reason}`, 'Export', 'error');
        toast('Journey import failed', 'err');
      } finally {
        if (ui.importJourneyFile) ui.importJourneyFile.value = '';
      }
    }

    return {
      listJourneyEntries,
      suggestJourneyName,
      persistJourneysToStorage,
      loadJourneysFromStorage,
      renderJourneyList,
      syncJourneyUI,
      saveCurrentJourney,
      deleteJourneyById,
      openJourneyDialog,
      closeJourneyDialog,
      showJourneyCreateComposer,
      hideJourneyCreateComposer,
      loadJourneyFromModal,
      confirmCreateJourney,
      exportCurrentJourneyToFile,
      importJourneyFromFile
    };
  }

  window.TrekulateJourneys = {
    create
  };
})();

