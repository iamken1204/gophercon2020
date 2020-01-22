import { ActionTree, GetterTree, MutationTree, Module } from 'vuex';

import { AppState, ThemeType, DeviceType, AppMode } from '../types/app';
import { RootState } from '../types/root';
import * as mutationTypes from '../mutation-types';

const namespaced: boolean = true;

const state: AppState = {
  mode: AppMode.WEB,
  device: DeviceType.DESKTOP,
  sight: {
    offset: 0,
    containerWidth: 0,
    containerHeight: 0,
    width: 0,
    height: 0,
    cols: 0,
    rows: 0,
    gap: 0
  },
  theme: ThemeType.LIGHT,
  isPopup: false,
  popupContent: '',
  validPopupTypes: ['SUBMIT_INFO', 'OPEN_SUBMIT', 'LOUDLY']
};

const getters: GetterTree<AppState, RootState> = {
  mode (state): AppState['mode'] {
    return state.mode;
  },

  device (state): AppState['device'] {
    return state.device;
  },

  sight (state): AppState['sight'] {
    return state.sight;
  },

  theme (state): AppState['theme'] {
    return state.theme;
  },

  isPopup (state): AppState['isPopup'] {
    return state.isPopup;
  },

  popupContent (state): AppState['popupContent'] {
    return state.popupContent;
  },

  validPopupTypes (state): AppState['validPopupTypes'] {
    return state.validPopupTypes;
  }
};

const actions: ActionTree<AppState, RootState> = {
  toggleMode ({ commit }, mode: AppState['mode']): void {
    commit(mutationTypes.APP_MODE, mode);
  },

  toggleDevice ({ commit }, device: AppState['device']): void {
    commit(mutationTypes.APP_DEVICE, device);
  },

  toggleTheme ({ commit }, theme: AppState['theme']): void {
    commit(mutationTypes.APP_THEME, theme);
  },

  togglePopup ({ commit }, status: AppState['isPopup']): void {
    commit(mutationTypes.APP_POPUP, status);
  },

  togglePopupContent ({ commit }, data: AppState['popupContent']): void {
    commit(mutationTypes.APP_POPUP_CONTENT, data);
  },

  setSightMeasure ({ commit }, sight: AppState['sight']): void {
    commit(mutationTypes.APP_SIGHT, sight);
  }
};

const mutations: MutationTree<AppState> = {
  [mutationTypes.APP_MODE] (state, mode: AppState['mode']) {
    state.mode = mode;
  },

  [mutationTypes.APP_DEVICE] (state, device: AppState['device']) {
    state.device = device;
  },

  [mutationTypes.APP_THEME] (state, theme: AppState['theme']) {
    state.theme = theme;
  },

  [mutationTypes.APP_POPUP] (state, status: AppState['isPopup']) {
    state.isPopup = status;
  },

  [mutationTypes.APP_POPUP_CONTENT] (state, data: AppState['popupContent']) {
    state.popupContent = data;
  },

  [mutationTypes.APP_SIGHT] (state, sight: AppState['sight']) {
    state.sight = sight;
  }
};

export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
